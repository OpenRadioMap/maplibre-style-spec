import {StringType, NumberType} from '../types';

import type {Expression} from '../expression';
import type {EvaluationContext} from '../evaluation_context';
import type {ParsingContext} from '../parsing_context';
import type {Type} from '../types';

export class NumberFormat implements Expression {
    type: Type;
    number: Expression;
    locale: Expression | null;   // BCP 47 language tag
    currency: Expression | null; // ISO 4217 currency code, required if style=currency
    minFractionDigits: Expression | null; // Default 0
    maxFractionDigits: Expression | null; // Default 3

    constructor(number: Expression,
        locale: Expression | null,
        currency: Expression | null,
        minFractionDigits: Expression | null,
        maxFractionDigits: Expression | null) {
        this.type = StringType;
        this.number = number;
        this.locale = locale;
        this.currency = currency;
        this.minFractionDigits = minFractionDigits;
        this.maxFractionDigits = maxFractionDigits;
    }

    static parse(args: ReadonlyArray<unknown>, context: ParsingContext): Expression {
        if (args.length !== 3)
            return context.error('Expected two arguments.') as null;

        const number = context.parse(args[1], 1, NumberType);
        if (!number) return null;

        const options = (args[2] as any);
        if (typeof options !== 'object' || Array.isArray(options))
            return context.error('NumberFormat options argument must be an object.') as null;

        let locale = null;
        if (options['locale']) {
            locale = context.parse(options['locale'], 1, StringType);
            if (!locale) return null;
        }

        let currency = null;
        if (options['currency']) {
            currency = context.parse(options['currency'], 1, StringType);
            if (!currency) return null;
        }

        let minFractionDigits = null;
        if (options['min-fraction-digits']) {
            minFractionDigits = context.parse(options['min-fraction-digits'], 1, NumberType);
            if (!minFractionDigits) return null;
        }

        let maxFractionDigits = null;
        if (options['max-fraction-digits']) {
            maxFractionDigits = context.parse(options['max-fraction-digits'], 1, NumberType);
            if (!maxFractionDigits) return null;
        }

        return new NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits);
    }

    evaluate(ctx: EvaluationContext) {
        return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [],
            {
                style: this.currency ? 'currency' : 'decimal',
                currency: this.currency ? this.currency.evaluate(ctx) : undefined,
                minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : undefined,
                maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : undefined,
            }).format(this.number.evaluate(ctx));
    }

    eachChild(fn: (_: Expression) => void) {
        fn(this.number);
        if (this.locale) {
            fn(this.locale);
        }
        if (this.currency) {
            fn(this.currency);
        }
        if (this.minFractionDigits) {
            fn(this.minFractionDigits);
        }
        if (this.maxFractionDigits) {
            fn(this.maxFractionDigits);
        }
    }

    outputDefined() {
        return false;
    }
}
