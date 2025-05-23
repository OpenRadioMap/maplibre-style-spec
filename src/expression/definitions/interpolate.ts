import UnitBezier from '@mapbox/unitbezier';

import {array, ArrayType, ColorType, ColorTypeT, NumberType, NumberTypeT, PaddingType, PaddingTypeT, NumberArrayTypeT, ColorArrayTypeT, VariableAnchorOffsetCollectionType, VariableAnchorOffsetCollectionTypeT, typeToString, verifyType, ProjectionDefinitionType, ColorArrayType, NumberArrayType} from '../types';
import {findStopLessThanOrEqualTo} from '../stops';
import {Color} from '../types/color';
import {interpolateArray, interpolateNumber} from '../../util/interpolate-primitives';
import {Padding} from '../types/padding';
import {ColorArray} from '../types/color_array';
import {NumberArray} from '../types/number_array';
import {VariableAnchorOffsetCollection} from '../types/variable_anchor_offset_collection';
import {ProjectionDefinition} from '../types/projection_definition';

import type {Stops} from '../stops';
import type {Expression} from '../expression';
import type {ParsingContext} from '../parsing_context';
import type {EvaluationContext} from '../evaluation_context';
import type {ProjectionDefinitionTypeT, Type} from '../types';

export type InterpolationType = {
    name: 'linear';
} | {
    name: 'exponential';
    base: number;
} | {
    name: 'cubic-bezier';
    controlPoints: [number, number, number, number];
};
type InterpolatedValueType = NumberTypeT | ColorTypeT | ProjectionDefinitionTypeT | PaddingTypeT | NumberArrayTypeT | ColorArrayTypeT | VariableAnchorOffsetCollectionTypeT | ArrayType<NumberTypeT>;
export class Interpolate implements Expression {
    type: InterpolatedValueType;

    operator: 'interpolate' | 'interpolate-hcl' | 'interpolate-lab';
    interpolation: InterpolationType;
    input: Expression;
    labels: Array<number>;
    outputs: Array<Expression>;

    constructor(type: InterpolatedValueType, operator: 'interpolate' | 'interpolate-hcl' | 'interpolate-lab', interpolation: InterpolationType, input: Expression, stops: Stops) {
        this.type = type;
        this.operator = operator;
        this.interpolation = interpolation;
        this.input = input;

        this.labels = [];
        this.outputs = [];
        for (const [label, expression] of stops) {
            this.labels.push(label);
            this.outputs.push(expression);
        }
    }

    static interpolationFactor(interpolation: InterpolationType, input: number, lower: number, upper: number) {
        let t = 0;
        if (interpolation.name === 'exponential') {
            t = exponentialInterpolation(input, interpolation.base, lower, upper);
        } else if (interpolation.name === 'linear') {
            t = exponentialInterpolation(input, 1, lower, upper);
        } else if (interpolation.name === 'cubic-bezier') {
            const c = interpolation.controlPoints;
            const ub = new UnitBezier(c[0], c[1], c[2], c[3]);
            t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
        }
        return t;
    }

    static parse(args: ReadonlyArray<unknown>, context: ParsingContext): Expression {
        let [operator, interpolation, input, ...rest] = args;

        if (!Array.isArray(interpolation) || interpolation.length === 0) {
            return context.error('Expected an interpolation type expression.', 1) as null;
        }

        if (interpolation[0] === 'linear') {
            interpolation = {name: 'linear'};
        } else if (interpolation[0] === 'exponential') {
            const base = interpolation[1];
            if (typeof base !== 'number')
                return context.error('Exponential interpolation requires a numeric base.', 1, 1) as null;
            interpolation = {
                name: 'exponential',
                base
            };
        } else if (interpolation[0] === 'cubic-bezier') {
            const controlPoints = interpolation.slice(1);
            if (
                controlPoints.length !== 4 ||
                controlPoints.some(t => typeof t !== 'number' || t < 0 || t > 1)
            ) {
                return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1) as null;
            }

            interpolation = {
                name: 'cubic-bezier',
                controlPoints: (controlPoints as any)
            };
        } else {
            return context.error(`Unknown interpolation type ${String(interpolation[0])}`, 1, 0) as null;
        }

        if (args.length - 1 < 4) {
            return context.error(`Expected at least 4 arguments, but found only ${args.length - 1}.`) as null;
        }

        if ((args.length - 1) % 2 !== 0) {
            return context.error('Expected an even number of arguments.') as null;
        }

        input = context.parse(input, 2, NumberType);
        if (!input) return null;

        const stops: Stops = [];

        let outputType: Type = null;
        if ((operator === 'interpolate-hcl' || operator === 'interpolate-lab') && context.expectedType != ColorArrayType) {
            outputType = ColorType;
        } else if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }

        for (let i = 0; i < rest.length; i += 2) {
            const label = rest[i];
            const value = rest[i + 1];

            const labelKey = i + 3;
            const valueKey = i + 4;

            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey) as null;
            }

            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey) as null;
            }
            const parsed = context.parse(value, valueKey, outputType);
            if (!parsed) return null;
            outputType = outputType || parsed.type;
            stops.push([label, parsed]);
        }

        if (!verifyType(outputType, NumberType) &&
            !verifyType(outputType, ProjectionDefinitionType) &&
            !verifyType(outputType, ColorType) &&
            !verifyType(outputType, PaddingType) &&
            !verifyType(outputType, NumberArrayType) &&
            !verifyType(outputType, ColorArrayType) &&
            !verifyType(outputType, VariableAnchorOffsetCollectionType) &&
            !verifyType(outputType, array(NumberType))
        ) {
            return context.error(`Type ${typeToString(outputType)} is not interpolatable.`) as null;
        }

        return new Interpolate(outputType, (operator as any), interpolation as InterpolationType, input as Expression, stops);
    }

    evaluate(ctx: EvaluationContext) {
        const labels = this.labels;
        const outputs = this.outputs;

        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }

        const value: number = this.input.evaluate(ctx);
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }

        const stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }

        const index = findStopLessThanOrEqualTo(labels, value);
        const lower = labels[index];
        const upper = labels[index + 1];
        const t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);

        const outputLower = outputs[index].evaluate(ctx);
        const outputUpper = outputs[index + 1].evaluate(ctx);

        switch (this.operator) {
            case 'interpolate':
                switch (this.type.kind) {
                    case 'number':
                        return interpolateNumber(outputLower, outputUpper, t)
                    case 'color':
                        return Color.interpolate(outputLower, outputUpper, t);
                    case 'padding':
                        return Padding.interpolate(outputLower, outputUpper, t);
                    case 'colorArray':
                        return ColorArray.interpolate(outputLower, outputUpper, t);
                    case 'numberArray':
                        return NumberArray.interpolate(outputLower, outputUpper, t);
                    case 'variableAnchorOffsetCollection':
                        return VariableAnchorOffsetCollection.interpolate(outputLower, outputUpper, t);
                    case 'array':
                        return interpolateArray(outputLower, outputUpper, t);
                    case 'projectionDefinition':
                        return ProjectionDefinition.interpolate(outputLower, outputUpper, t);
                }
            case 'interpolate-hcl':
                switch (this.type.kind) {
                    case 'color':
                        return Color.interpolate(outputLower, outputUpper, t, 'hcl');
                    case 'colorArray':
                        return ColorArray.interpolate(outputLower, outputUpper, t, 'hcl');
                }
            case 'interpolate-lab':
                switch (this.type.kind) {
                    case 'color':
                        return Color.interpolate(outputLower, outputUpper, t, 'lab');
                    case 'colorArray':
                        return ColorArray.interpolate(outputLower, outputUpper, t, 'lab');
                }
        }
    }

    eachChild(fn: (_: Expression) => void) {
        fn(this.input);
        for (const expression of this.outputs) {
            fn(expression);
        }
    }

    outputDefined(): boolean {
        return this.outputs.every(out => out.outputDefined());
    }
}

/**
 * Returns a ratio that can be used to interpolate between exponential function
 * stops.
 * How it works: Two consecutive stop values define a (scaled and shifted) exponential function `f(x) = a * base^x + b`, where `base` is the user-specified base,
 * and `a` and `b` are constants affording sufficient degrees of freedom to fit
 * the function to the given stops.
 *
 * Here's a bit of algebra that lets us compute `f(x)` directly from the stop
 * values without explicitly solving for `a` and `b`:
 *
 * First stop value: `f(x0) = y0 = a * base^x0 + b`
 * Second stop value: `f(x1) = y1 = a * base^x1 + b`
 * => `y1 - y0 = a(base^x1 - base^x0)`
 * => `a = (y1 - y0)/(base^x1 - base^x0)`
 *
 * Desired value: `f(x) = y = a * base^x + b`
 * => `f(x) = y0 + a * (base^x - base^x0)`
 *
 * From the above, we can replace the `a` in `a * (base^x - base^x0)` and do a
 * little algebra:
 * ```
 * a * (base^x - base^x0) = (y1 - y0)/(base^x1 - base^x0) * (base^x - base^x0)
 *                     = (y1 - y0) * (base^x - base^x0) / (base^x1 - base^x0)
 * ```
 *
 * If we let `(base^x - base^x0) / (base^x1 base^x0)`, then we have
 * `f(x) = y0 + (y1 - y0) * ratio`.  In other words, `ratio` may be treated as
 * an interpolation factor between the two stops' output values.
 *
 * (Note: a slightly different form for `ratio`,
 * `(base^(x-x0) - 1) / (base^(x1-x0) - 1) `, is equivalent, but requires fewer
 * expensive `Math.pow()` operations.)
 *
 * @private
*/
function exponentialInterpolation(input, base, lowerValue, upperValue) {
    const difference = upperValue - lowerValue;
    const progress = input - lowerValue;

    if (difference === 0) {
        return 0;
    } else if (base === 1) {
        return progress / difference;
    } else {
        return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }
}

export const interpolateFactory = {
    color: Color.interpolate,
    number: interpolateNumber,
    padding: Padding.interpolate,
    numberArray: NumberArray.interpolate,
    colorArray: ColorArray.interpolate,
    variableAnchorOffsetCollection: VariableAnchorOffsetCollection.interpolate,
    array: interpolateArray
}
