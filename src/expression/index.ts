
import {extendBy} from '../util/extend';
import {ExpressionParsingError} from './parsing_error';
import {ParsingContext} from './parsing_context';
import {EvaluationContext} from './evaluation_context';

import {CompoundExpression, isFeatureConstant,
    isGlobalPropertyConstant,
    isStateConstant,
    isExpressionConstant
} from './compound_expression';

import {Step} from './definitions/step';
import {Interpolate} from './definitions/interpolate';
import {Coalesce} from './definitions/coalesce';
import {Let} from './definitions/let';
import {expressions} from './definitions';

import {RuntimeError} from './runtime_error';
import {success, error} from '../util/result';
import {supportsPropertyExpression, supportsZoomExpression, supportsInterpolation} from '../util/properties';

import {ColorType, StringType, NumberType, BooleanType, ValueType, FormattedType, PaddingType, ResolvedImageType, VariableAnchorOffsetCollectionType, array, type Type, type EvaluationKind, ProjectionDefinitionType, NumberArrayType, ColorArrayType} from './types';
import type {Value} from './values';
import type {Expression} from './expression';
import {type StylePropertySpecification} from '..';
import type {Result} from '../util/result';
import type {InterpolationType} from './definitions/interpolate';
import type {PaddingSpecification, NumberArraySpecification, ColorArraySpecification, PropertyValueSpecification, VariableAnchorOffsetCollectionSpecification} from '../types.g';
import type {FormattedSection} from './types/formatted';
import type {Point2D} from '../point2d';

import {ICanonicalTileID} from '../tiles_and_coordinates';
import {isFunction, createFunction} from '../function';
import {Color} from './types/color';
import {Padding} from './types/padding';
import {NumberArray} from './types/number_array';
import {ColorArray} from './types/color_array';
import {VariableAnchorOffsetCollection} from './types/variable_anchor_offset_collection';
import {ProjectionDefinition} from './types/projection_definition';
import {GlobalState} from './definitions/global_state';

export type Feature = {
    readonly type: 0 | 1 | 2 | 3 | 'Unknown' | 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon';
    readonly id?: any;
    readonly properties: {[_: string]: any};
    readonly patterns?: {
        [_: string]: {
            'min': string;
            'mid': string;
            'max': string;
        };
    };
    readonly geometry?: Array<Array<Point2D>>;
};

export type FeatureState = {[_: string]: any};

export type GlobalProperties = Readonly<{
    zoom: number;
    heatmapDensity?: number;
    elevation?: number;
    lineProgress?: number;
    isSupportedScript?: (_: string) => boolean;
    accumulated?: Value;
    globalState?: Record<string, any>;
}>;

export class StyleExpression {
    expression: Expression;

    _evaluator: EvaluationContext;
    _defaultValue: Value;
    _warningHistory: {[key: string]: boolean};
    _enumValues: {[_: string]: any};

    constructor(expression: Expression, propertySpec?: StylePropertySpecification | null) {
        this.expression = expression;
        this._warningHistory = {};
        this._evaluator = new EvaluationContext();
        this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
        this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
    }

    evaluateWithoutErrorHandling(
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ): any {
        this._evaluator.globals = globals;
        this._evaluator.feature = feature;
        this._evaluator.featureState = featureState;
        this._evaluator.canonical = canonical;
        this._evaluator.availableImages = availableImages || null;
        this._evaluator.formattedSection = formattedSection;

        return this.expression.evaluate(this._evaluator);
    }

    evaluate(
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ): any {
        this._evaluator.globals = globals;
        this._evaluator.feature = feature || null;
        this._evaluator.featureState = featureState || null;
        this._evaluator.canonical = canonical;
        this._evaluator.availableImages = availableImages || null;
        this._evaluator.formattedSection = formattedSection || null;

        try {
            const val = this.expression.evaluate(this._evaluator);
            if (val === null || val === undefined || (typeof val === 'number' && val !== val)) {
                return this._defaultValue;
            }
            if (this._enumValues && !(val in this._enumValues)) {
                throw new RuntimeError(`Expected value to be one of ${Object.keys(this._enumValues).map(v => JSON.stringify(v)).join(', ')}, but found ${JSON.stringify(val)} instead.`);
            }
            return val;
        } catch (e) {
            if (!this._warningHistory[e.message]) {
                this._warningHistory[e.message] = true;
                if (typeof console !== 'undefined') {
                    console.warn(e.message);
                }
            }
            return this._defaultValue;
        }
    }
}

export function isExpression(expression: unknown) {
    return Array.isArray(expression) && expression.length > 0 &&
        typeof expression[0] === 'string' && expression[0] in expressions;
}

/**
 * Parse and typecheck the given style spec JSON expression.  If
 * options.defaultValue is provided, then the resulting StyleExpression's
 * `evaluate()` method will handle errors by logging a warning (once per
 * message) and returning the default value.  Otherwise, it will throw
 * evaluation errors.
 *
 * @private
 */
export function createExpression(expression: unknown, propertySpec?: StylePropertySpecification | null): Result<StyleExpression, Array<ExpressionParsingError>> {
    const parser = new ParsingContext(expressions, isExpressionConstant, [], propertySpec ? getExpectedType(propertySpec) : undefined);

    // For string-valued properties, coerce to string at the top level rather than asserting.
    const parsed = parser.parse(expression, undefined, undefined, undefined,
        propertySpec && propertySpec.type === 'string' ? {typeAnnotation: 'coerce'} : undefined);

    if (!parsed) {
        return error(parser.errors);
    }

    return success(new StyleExpression(parsed, propertySpec));
}

export class ZoomConstantExpression<Kind extends EvaluationKind> {
    kind: Kind;
    isStateDependent: boolean;
    globalStateRefs: Set<string>;
    _styleExpression: StyleExpression;

    constructor(kind: Kind, expression: StyleExpression) {
        this.kind = kind;
        this._styleExpression = expression;
        this.isStateDependent = kind !== ('constant' as EvaluationKind) && !isStateConstant(expression.expression);
        this.globalStateRefs = findGlobalStateRefs(expression.expression);
    }

    evaluateWithoutErrorHandling(
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ): any {
        return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
    }

    evaluate(
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ): any {
        return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
}

export class ZoomDependentExpression<Kind extends EvaluationKind> {
    kind: Kind;
    zoomStops: Array<number>;
    isStateDependent: boolean;
    globalStateRefs: Set<string>;
    _styleExpression: StyleExpression;
    interpolationType: InterpolationType;

    constructor(kind: Kind, expression: StyleExpression, zoomStops: Array<number>, interpolationType?: InterpolationType) {
        this.kind = kind;
        this.zoomStops = zoomStops;
        this._styleExpression = expression;
        this.isStateDependent = kind !== ('camera' as EvaluationKind) && !isStateConstant(expression.expression);
        this.globalStateRefs = findGlobalStateRefs(expression.expression);
        this.interpolationType = interpolationType;
    }

    evaluateWithoutErrorHandling(
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ): any {
        return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
    }

    evaluate(
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ): any {
        return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
    }

    interpolationFactor(input: number, lower: number, upper: number): number {
        if (this.interpolationType) {
            return Interpolate.interpolationFactor(this.interpolationType, input, lower, upper);
        } else {
            return 0;
        }
    }
}

export function isZoomExpression(expression: any): expression is ZoomConstantExpression<'source'> | ZoomDependentExpression<'source'> {
    return (expression as ZoomConstantExpression<'source'>)._styleExpression !== undefined;
}

export type ConstantExpression = {
    kind: 'constant';
    globalStateRefs: Set<string>;
    readonly evaluate: (
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>
    ) => any;
};

export type SourceExpression = {
    kind: 'source';
    isStateDependent: boolean;
    globalStateRefs: Set<string>;
    readonly evaluate: (
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ) => any;
};

export type CameraExpression = {
    kind: 'camera';
    globalStateRefs: Set<string>;
    readonly evaluate: (
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>
    ) => any;
    readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
    zoomStops: Array<number>;
    interpolationType: InterpolationType;
};

export type CompositeExpression = {
    kind: 'composite';
    isStateDependent: boolean;
    globalStateRefs: Set<string>;
    readonly evaluate: (
        globals: GlobalProperties,
        feature?: Feature,
        featureState?: FeatureState,
        canonical?: ICanonicalTileID,
        availableImages?: Array<string>,
        formattedSection?: FormattedSection
    ) => any;
    readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
    zoomStops: Array<number>;
    interpolationType: InterpolationType;
};

export type StylePropertyExpression = ConstantExpression | SourceExpression | CameraExpression | CompositeExpression;

export function createPropertyExpression(expressionInput: unknown, propertySpec: StylePropertySpecification): Result<StylePropertyExpression, Array<ExpressionParsingError>> {
    const expression = createExpression(expressionInput, propertySpec);
    if (expression.result === 'error') {
        return expression;
    }

    const parsed = expression.value.expression;

    const isFeatureConstantResult = isFeatureConstant(parsed);
    if (!isFeatureConstantResult && !supportsPropertyExpression(propertySpec)) {
        return error([new ExpressionParsingError('', 'data expressions not supported')]);
    }

    const isZoomConstant = isGlobalPropertyConstant(parsed, ['zoom']);
    if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
        return error([new ExpressionParsingError('', 'zoom expressions not supported')]);
    }

    const zoomCurve = findZoomCurve(parsed);
    if (!zoomCurve && !isZoomConstant) {
        return error([new ExpressionParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
    } else if (zoomCurve instanceof ExpressionParsingError) {
        return error([zoomCurve]);
    } else if (zoomCurve instanceof Interpolate && !supportsInterpolation(propertySpec)) {
        return error([new ExpressionParsingError('', '"interpolate" expressions cannot be used with this property')]);
    }

    if (!zoomCurve) {
        return success(isFeatureConstantResult ?
            (new ZoomConstantExpression('constant', expression.value) as ConstantExpression) :
            (new ZoomConstantExpression('source', expression.value) as SourceExpression));
    }

    const interpolationType = zoomCurve instanceof Interpolate ? zoomCurve.interpolation : undefined;

    return success(isFeatureConstantResult ?
        (new ZoomDependentExpression('camera', expression.value, zoomCurve.labels, interpolationType) as CameraExpression) :
        (new ZoomDependentExpression('composite', expression.value, zoomCurve.labels, interpolationType) as CompositeExpression));
}

// serialization wrapper for old-style stop functions normalized to the
// expression interface
export class StylePropertyFunction<T> {
    _parameters: PropertyValueSpecification<T>;
    _specification: StylePropertySpecification;

    kind: EvaluationKind;
    evaluate: (globals: GlobalProperties, feature?: Feature) => any;
    interpolationFactor: ((input: number, lower: number, upper: number) => number);
    zoomStops: Array<number>;

    constructor(parameters: PropertyValueSpecification<T>, specification: StylePropertySpecification) {
        this._parameters = parameters;
        this._specification = specification;
        extendBy(this, createFunction(this._parameters, this._specification));
    }

    static deserialize<T>(serialized: {
        _parameters: PropertyValueSpecification<T>;
        _specification: StylePropertySpecification;
    }) {
        return new StylePropertyFunction(serialized._parameters, serialized._specification) as StylePropertyFunction<T>;
    }

    static serialize<T>(input: StylePropertyFunction<T>) {
        return {
            _parameters: input._parameters,
            _specification: input._specification
        };
    }
}

export function normalizePropertyExpression<T>(
    value: PropertyValueSpecification<T>,
    specification: StylePropertySpecification
): StylePropertyExpression {
    if (isFunction(value)) {
        return new StylePropertyFunction(value, specification) as any;

    } else if (isExpression(value)) {
        const expression = createPropertyExpression(value, specification);
        if (expression.result === 'error') {
            // this should have been caught in validation
            throw new Error(expression.value.map(err => `${err.key}: ${err.message}`).join(', '));
        }
        return expression.value;

    } else {
        let constant: any = value;
        if (specification.type === 'color' && typeof value === 'string') {
            constant = Color.parse(value);
        } else if (specification.type === 'padding' && (typeof value === 'number' || Array.isArray(value))) {
            constant = Padding.parse(value as PaddingSpecification);
        } else if (specification.type === 'numberArray' && (typeof value === 'number' || Array.isArray(value))) {
            constant = NumberArray.parse(value as NumberArraySpecification);
        } else if (specification.type === 'colorArray' && (typeof value === 'string' || Array.isArray(value))) {
            constant = ColorArray.parse(value as ColorArraySpecification);
        } else if (specification.type === 'variableAnchorOffsetCollection' && Array.isArray(value)) {
            constant = VariableAnchorOffsetCollection.parse(value as VariableAnchorOffsetCollectionSpecification);
        } else if (specification.type === 'projectionDefinition' && typeof value === 'string') {
            constant = ProjectionDefinition.parse(value);
        }
        return {
            globalStateRefs: new Set<string>(),
            kind: 'constant',
            evaluate: () => constant
        };
    }
}

// Zoom-dependent expressions may only use ["zoom"] as the input to a top-level "step" or "interpolate"
// expression (collectively referred to as a "curve"). The curve may be wrapped in one or more "let" or
// "coalesce" expressions.
function findZoomCurve(expression: Expression): Step | Interpolate | ExpressionParsingError | null {
    let result = null;
    if (expression instanceof Let) {
        result = findZoomCurve(expression.result);

    } else if (expression instanceof Coalesce) {
        for (const arg of expression.args) {
            result = findZoomCurve(arg);
            if (result) {
                break;
            }
        }

    } else if ((expression instanceof Step || expression instanceof Interpolate) &&
        expression.input instanceof CompoundExpression &&
        expression.input.name === 'zoom') {

        result = expression;
    }

    if (result instanceof ExpressionParsingError) {
        return result;
    }

    expression.eachChild((child) => {
        const childResult = findZoomCurve(child);
        if (childResult instanceof ExpressionParsingError) {
            result = childResult;
        } else if (!result && childResult) {
            result = new ExpressionParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
        } else if (result && childResult && result !== childResult) {
            result = new ExpressionParsingError('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
        }
    });

    return result;
}

export function findGlobalStateRefs(expression: Expression, results = new Set<string>()): Set<string> {
    if (expression instanceof GlobalState) {
        results.add(expression.key);
    }

    expression.eachChild(childExpression => {
        findGlobalStateRefs(childExpression, results);
    });
    return results;
}

function getExpectedType(spec: StylePropertySpecification): Type {
    const types = {
        color: ColorType,
        string: StringType,
        number: NumberType,
        enum: StringType,
        boolean: BooleanType,
        formatted: FormattedType,
        padding: PaddingType,
        numberArray: NumberArrayType,
        colorArray: ColorArrayType,
        projectionDefinition: ProjectionDefinitionType,
        resolvedImage: ResolvedImageType,
        variableAnchorOffsetCollection: VariableAnchorOffsetCollectionType
    };

    if (spec.type === 'array') {
        return array(types[spec.value] || ValueType, spec.length);
    }

    return types[spec.type];
}

function getDefaultValue(spec: StylePropertySpecification): Value {
    if (spec.type === 'color' && isFunction(spec.default)) {
        // Special case for heatmap-color: it uses the 'default:' to define a
        // default color ramp, but createExpression expects a simple value to fall
        // back to in case of runtime errors
        return new Color(0, 0, 0, 0);
    }
    switch (spec.type) {
        case 'color':
            return Color.parse(spec.default) || null;
        case 'padding':
            return Padding.parse(spec.default) || null;
        case 'numberArray':
            return NumberArray.parse(spec.default) || null;
        case 'colorArray':
            return ColorArray.parse(spec.default) || null;
        case 'variableAnchorOffsetCollection':
            return VariableAnchorOffsetCollection.parse(spec.default) || null;
        case 'projectionDefinition':
            return ProjectionDefinition.parse(spec.default) || null;
        default:
            return (spec.default === undefined ? null : spec.default);
    }
}
