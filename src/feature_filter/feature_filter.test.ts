import {featureFilter, isExpressionFilter} from '.';

import {convertFilter} from './convert';
import {ICanonicalTileID} from '../tiles_and_coordinates';
import {FilterSpecification} from '../types.g';
import {Feature} from '../expression';
import {getGeometry} from '../../test/lib/geometry';
import {describe, test, expect, vi, beforeEach} from 'vitest';

describe('filter', () => {
    test('expression, zoom', () => {
        const f = featureFilter(['>=', ['number', ['get', 'x']], ['zoom']]).filter;
        expect(f({zoom: 1}, {properties: {x: 0}} as any as Feature)).toBe(false);
        expect(f({zoom: 1}, {properties: {x: 1.5}} as any as Feature)).toBe(true);
        expect(f({zoom: 1}, {properties: {x: 2.5}} as any as Feature)).toBe(true);
        expect(f({zoom: 2}, {properties: {x: 0}} as any as Feature)).toBe(false);
        expect(f({zoom: 2}, {properties: {x: 1.5}} as any as Feature)).toBe(false);
        expect(f({zoom: 2}, {properties: {x: 2.5}} as any as Feature)).toBe(true);
    });

    test('expression, compare two properties', () => {
        vi.spyOn(console, 'warn').mockImplementation(() => { });
        const f = featureFilter(['==', ['string', ['get', 'x']], ['string', ['get', 'y']]]).filter;
        expect(f({zoom: 0}, {properties: {x: 1, y: 1}} as any as Feature)).toBe(false);
        expect(f({zoom: 0}, {properties: {x: '1', y: '1'}} as any as Feature)).toBe(true);
        expect(f({zoom: 0}, {properties: {x: 'same', y: 'same'}} as any as Feature)).toBe(true);
        expect(f({zoom: 0}, {properties: {x: null}} as any as Feature)).toBe(false);
        expect(f({zoom: 0}, {properties: {x: undefined}} as any as Feature)).toBe(false);
    });

    test('expression, collator comparison', () => {
        const caseSensitive = featureFilter(['==', ['string', ['get', 'x']], ['string', ['get', 'y']], ['collator', {'case-sensitive': true}]]).filter;
        expect(caseSensitive({zoom: 0}, {properties: {x: 'a', y: 'b'}} as any as Feature)).toBe(false);
        expect(caseSensitive({zoom: 0}, {properties: {x: 'a', y: 'A'}} as any as Feature)).toBe(false);
        expect(caseSensitive({zoom: 0}, {properties: {x: 'a', y: 'a'}} as any as Feature)).toBe(true);

        const caseInsensitive = featureFilter(['==', ['string', ['get', 'x']], ['string', ['get', 'y']], ['collator', {'case-sensitive': false}]]).filter;
        expect(caseInsensitive({zoom: 0}, {properties: {x: 'a', y: 'b'}} as any as Feature)).toBe(false);
        expect(caseInsensitive({zoom: 0}, {properties: {x: 'a', y: 'A'}} as any as Feature)).toBe(true);
        expect(caseInsensitive({zoom: 0}, {properties: {x: 'a', y: 'a'}} as any as Feature)).toBe(true);
    });

    test('expression, any/all', () => {
        expect(featureFilter(['all']).filter(undefined, undefined)).toBe(true);
        expect(featureFilter(['all', true]).filter(undefined, undefined)).toBe(true);
        expect(featureFilter(['all', true, false]).filter(undefined, undefined)).toBe(false);
        expect(featureFilter(['all', true, true]).filter(undefined, undefined)).toBe(true);
        expect(featureFilter(['any']).filter(undefined, undefined)).toBe(false);
        expect(featureFilter(['any', true]).filter(undefined, undefined)).toBe(true);
        expect(featureFilter(['any', true, false]).filter(undefined, undefined)).toBe(true);
        expect(featureFilter(['any', false, false]).filter(undefined, undefined)).toBe(false);
    });

    test('expression, literal', () => {
        expect(featureFilter(['literal', true]).filter(undefined, undefined)).toBe(true);
        expect(featureFilter(['literal', false]).filter(undefined, undefined)).toBe(false);
    });

    test('expression, match', () => {
        const match = featureFilter(['match', ['get', 'x'], ['a', 'b', 'c'], true, false]).filter;
        expect(match(undefined, {properties: {x: 'a'}} as any as Feature)).toBe(true);
        expect(match(undefined, {properties: {x: 'c'}} as any as Feature)).toBe(true);
        expect(match(undefined, {properties: {x: 'd'}} as any as Feature)).toBe(false);
    });

    test('expression, type error', () => {
        expect(() => {
            featureFilter(['==', ['number', ['get', 'x']], ['string', ['get', 'y']]]);
        }).toThrow();

        expect(() => {
            featureFilter(['number', ['get', 'x']]);
        }).toThrow();

        expect(() => {
            featureFilter(['boolean', ['get', 'x']]);
        }).not.toThrow();

    });

    test('expression, within', () => {
        const withinFilter = featureFilter(['within', {'type': 'Polygon', 'coordinates': [[[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]]}]);
        expect(withinFilter.needGeometry).toBe(true);
        const canonical = {z: 3, x: 3, y: 3} as ICanonicalTileID;
        const featureInTile = {} as Feature;
        getGeometry(featureInTile, {type: 'Point', coordinates: [2, 2]}, canonical);
        expect(withinFilter.filter({zoom: 3}, featureInTile, canonical)).toBe(true);
        getGeometry(featureInTile, {type: 'Point', coordinates: [6, 6]}, canonical);
        expect(withinFilter.filter({zoom: 3}, featureInTile, canonical)).toBe(false);
        getGeometry(featureInTile, {type: 'Point', coordinates: [5, 5]}, canonical);
        expect(withinFilter.filter({zoom: 3}, featureInTile, canonical)).toBe(false);
        getGeometry(featureInTile, {type: 'LineString', coordinates: [[2, 2], [3, 3]]}, canonical);
        expect(withinFilter.filter({zoom: 3}, featureInTile, canonical)).toBe(true);
        getGeometry(featureInTile, {type: 'LineString', coordinates: [[6, 6], [2, 2]]}, canonical);
        expect(withinFilter.filter({zoom: 3}, featureInTile, canonical)).toBe(false);
        getGeometry(featureInTile, {type: 'LineString', coordinates: [[5, 5], [2, 2]]}, canonical);
        expect(withinFilter.filter({zoom: 3}, featureInTile, canonical)).toBe(false);
    });

    legacyFilterTests(featureFilter);

});

describe('getGlobalStateRefs', () => {
    test('returns global-state keys', () => {
        const filter = featureFilter(['==', ['global-state', 'x'], ['zoom']]);
        expect(filter.getGlobalStateRefs()).toEqual(new Set(['x']));
    });
});

describe('legacy filter detection', () => {
    test('definitely legacy filters', () => {
        // Expressions with more than two arguments.
        expect(isExpressionFilter(['in', 'color', 'red', 'blue'])).toBeFalsy();

        // Expressions where the second argument is not a string or array.
        expect(isExpressionFilter(['in', 'value', 42])).toBeFalsy();
        expect(isExpressionFilter(['in', 'value', true])).toBeFalsy();
    });

    test('ambiguous value', () => {
        // Should err on the side of reporting as a legacy filter. Style authors can force filters
        // by using a literal expression as the first argument.
        expect(isExpressionFilter(['in', 'color', 'red'])).toBeFalsy();
    });

    test('definitely expressions', () => {
        expect(isExpressionFilter(['in', ['get', 'color'], 'reddish'])).toBeTruthy();
        expect(isExpressionFilter(['in', ['get', 'color'], ['red', 'blue']])).toBeTruthy();
        expect(isExpressionFilter(['in', 42, 42])).toBeTruthy();
        expect(isExpressionFilter(['in', true, true])).toBeTruthy();
        expect(isExpressionFilter(['in', 'red', ['get', 'colors']])).toBeTruthy();
    });

});

describe('convert legacy filters to expressions', () => {
    beforeEach(() => {
        vi.spyOn(console, 'warn').mockImplementation(() => { });
    });

    legacyFilterTests(f => {
        const converted = convertFilter(f);
        return featureFilter(converted);
    });

    test('mimic legacy type mismatch semantics', () => {
        const filter = ['any',
            ['all', ['>', 'y', 0], ['>', 'y', 0]],
            ['>', 'x', 0]
        ] as FilterSpecification;

        const converted = convertFilter(filter);
        const f = featureFilter(converted).filter;

        expect(f({zoom: 0}, {properties: {x: 0, y: 1, z: 1}} as any as Feature)).toBe(true);
        expect(f({zoom: 0}, {properties: {x: 1, y: 0, z: 1}} as any as Feature)).toBe(true);
        expect(f({zoom: 0}, {properties: {x: 0, y: 0, z: 1}} as any as Feature)).toBe(false);
        expect(f({zoom: 0}, {properties: {x: null, y: 1, z: 1}} as any as Feature)).toBe(true);
        expect(f({zoom: 0}, {properties: {x: 1, y: null, z: 1}} as any as Feature)).toBe(true);
        expect(f({zoom: 0}, {properties: {x: null, y: null, z: 1}} as any as Feature)).toBe(false);
    });

    test('flattens nested, single child all expressions', () => {
        const filter: FilterSpecification = [
            'all',
            [
                'in',
                '$type',
                'Polygon',
                'LineString',
                'Point'
            ],
            [
                'all',
                ['in', 'type', 'island']
            ]
        ];

        const expected: FilterSpecification = [
            'all',
            [
                'match',
                ['geometry-type'],
                ['LineString', 'Point', 'Polygon'],
                true,
                false
            ],
            [
                'match',
                ['get', 'type'],
                ['island'],
                true,
                false
            ]
        ];

        const converted = convertFilter(filter);
        expect(converted).toEqual(expected);
    });

    test('removes duplicates when outputting match expressions', () => {
        const filter = [
            'in',
            '$id',
            1,
            2,
            3,
            2,
            1
        ] as FilterSpecification;

        const expected = [
            'match',
            ['id'],
            [1, 2, 3],
            true,
            false
        ];

        const converted = convertFilter(filter);
        expect(converted).toEqual(expected);
    });

});

function legacyFilterTests(createFilterExpr) {
    test('degenerate', () => {
        expect(createFilterExpr().filter()).toBe(true);
        expect(createFilterExpr(undefined).filter()).toBe(true);
        expect(createFilterExpr(null).filter()).toBe(true);
    });

    test('==, string', () => {
        const f = createFilterExpr(['==', 'foo', 'bar']).filter;
        expect(f({zoom: 0}, {properties: {foo: 'bar'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 'baz'}})).toBe(false);
    });

    test('==, number', () => {
        const f = createFilterExpr(['==', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('==, null', () => {
        const f = createFilterExpr(['==', 'foo', null]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(true);
        // t.equal(f({zoom: 0}, {properties: {foo: undefined}}), false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('==, $type', () => {
        const f = createFilterExpr(['==', '$type', 'LineString']).filter;
        expect(f({zoom: 0}, {type: 1})).toBe(false);
        expect(f({zoom: 0}, {type: 2})).toBe(true);
    });

    test('==, $id', () => {
        const f = createFilterExpr(['==', '$id', 1234]).filter;

        expect(f({zoom: 0}, {id: 1234})).toBe(true);
        expect(f({zoom: 0}, {id: '1234'})).toBe(false);
        expect(f({zoom: 0}, {properties: {id: 1234}})).toBe(false);

    });

    test('!=, string', () => {
        const f = createFilterExpr(['!=', 'foo', 'bar']).filter;
        expect(f({zoom: 0}, {properties: {foo: 'bar'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 'baz'}})).toBe(true);
    });

    test('!=, number', () => {
        const f = createFilterExpr(['!=', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(true);
        expect(f({zoom: 0}, {properties: {}})).toBe(true);
    });

    test('!=, null', () => {
        const f = createFilterExpr(['!=', 'foo', null]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        // t.equal(f({zoom: 0}, {properties: {foo: undefined}}), true);
        expect(f({zoom: 0}, {properties: {}})).toBe(true);
    });

    test('!=, $type', () => {
        const f = createFilterExpr(['!=', '$type', 'LineString']).filter;
        expect(f({zoom: 0}, {type: 1})).toBe(true);
        expect(f({zoom: 0}, {type: 2})).toBe(false);
    });

    test('<, number', () => {
        const f = createFilterExpr(['<', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('<, string', () => {
        const f = createFilterExpr(['<', 'foo', '0']).filter;
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
    });

    test('<=, number', () => {
        const f = createFilterExpr(['<=', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('<=, string', () => {
        const f = createFilterExpr(['<=', 'foo', '0']).filter;
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
    });

    test('>, number', () => {
        const f = createFilterExpr(['>', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('>, string', () => {
        const f = createFilterExpr(['>', 'foo', '0']).filter;
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
    });

    test('>=, number', () => {
        const f = createFilterExpr(['>=', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('>=, string', () => {
        const f = createFilterExpr(['>=', 'foo', '0']).filter;
        expect(f({zoom: 0}, {properties: {foo: -1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '1'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '-1'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
    });

    test('in, degenerate', () => {
        const f = createFilterExpr(['in', 'foo']).filter;
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
    });

    test('in, string', () => {
        const f = createFilterExpr(['in', 'foo', '0']).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('in, number', () => {
        const f = createFilterExpr(['in', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
    });

    test('in, null', () => {
        const f = createFilterExpr(['in', 'foo', null]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(true);
        // t.equal(f({zoom: 0}, {properties: {foo: undefined}}), false);
    });

    test('in, multiple', () => {
        const f = createFilterExpr(['in', 'foo', 0, 1]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 3}})).toBe(false);
    });

    test('in, large_multiple', () => {
        const values = Array.from({length: 2000}).map(Number.call, Number);
        values.reverse();
        const f = createFilterExpr(['in', 'foo'].concat(values)).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1999}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 2000}})).toBe(false);
    });

    test('in, large_multiple, heterogeneous', () => {
        const values = Array.from({length: 2000}).map(Number.call, Number);
        values.push('a');
        values.unshift('b');
        const f = createFilterExpr(['in', 'foo'].concat(values)).filter;
        expect(f({zoom: 0}, {properties: {foo: 'b'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 'a'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1999}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 2000}})).toBe(false);
    });

    test('in, $type', () => {
        const f = createFilterExpr(['in', '$type', 'LineString', 'Polygon']).filter;
        expect(f({zoom: 0}, {type: 1})).toBe(false);
        expect(f({zoom: 0}, {type: 2})).toBe(true);
        expect(f({zoom: 0}, {type: 3})).toBe(true);

        const f1 = createFilterExpr(['in', '$type', 'Polygon', 'LineString', 'Point']).filter;
        expect(f1({zoom: 0}, {type: 1})).toBe(true);
        expect(f1({zoom: 0}, {type: 2})).toBe(true);
        expect(f1({zoom: 0}, {type: 3})).toBe(true);

    });

    test('!in, degenerate', () => {
        const f = createFilterExpr(['!in', 'foo']).filter;
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
    });

    test('!in, string', () => {
        const f = createFilterExpr(['!in', 'foo', '0']).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(true);
        expect(f({zoom: 0}, {properties: {}})).toBe(true);
    });

    test('!in, number', () => {
        const f = createFilterExpr(['!in', 'foo', 0]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(true);
    });

    test('!in, null', () => {
        const f = createFilterExpr(['!in', 'foo', null]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        // t.equal(f({zoom: 0}, {properties: {foo: undefined}}), true);
    });

    test('!in, multiple', () => {
        const f = createFilterExpr(['!in', 'foo', 0, 1]).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 3}})).toBe(true);
    });

    test('!in, large_multiple', () => {
        const f = createFilterExpr(['!in', 'foo'].concat(Array.from({length: 2000}).map(Number.call, Number))).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1999}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 2000}})).toBe(true);
    });

    test('!in, $type', () => {
        const f = createFilterExpr(['!in', '$type', 'LineString', 'Polygon']).filter;
        expect(f({zoom: 0}, {type: 1})).toBe(true);
        expect(f({zoom: 0}, {type: 2})).toBe(false);
        expect(f({zoom: 0}, {type: 3})).toBe(false);
    });

    test('any', () => {
        const f1 = createFilterExpr(['any']).filter;
        expect(f1({zoom: 0}, {properties: {foo: 1}})).toBe(false);

        const f2 = createFilterExpr(['any', ['==', 'foo', 1]]).filter;
        expect(f2({zoom: 0}, {properties: {foo: 1}})).toBe(true);

        const f3 = createFilterExpr(['any', ['==', 'foo', 0]]).filter;
        expect(f3({zoom: 0}, {properties: {foo: 1}})).toBe(false);

        const f4 = createFilterExpr(['any', ['==', 'foo', 0], ['==', 'foo', 1]]).filter;
        expect(f4({zoom: 0}, {properties: {foo: 1}})).toBe(true);

    });

    test('all', () => {
        const f1 = createFilterExpr(['all']).filter;
        expect(f1({zoom: 0}, {properties: {foo: 1}})).toBe(true);

        const f2 = createFilterExpr(['all', ['==', 'foo', 1]]).filter;
        expect(f2({zoom: 0}, {properties: {foo: 1}})).toBe(true);

        const f3 = createFilterExpr(['all', ['==', 'foo', 0]]).filter;
        expect(f3({zoom: 0}, {properties: {foo: 1}})).toBe(false);

        const f4 = createFilterExpr(['all', ['==', 'foo', 0], ['==', 'foo', 1]]).filter;
        expect(f4({zoom: 0}, {properties: {foo: 1}})).toBe(false);

    });

    test('none', () => {
        const f1 = createFilterExpr(['none']).filter;
        expect(f1({zoom: 0}, {properties: {foo: 1}})).toBe(true);

        const f2 = createFilterExpr(['none', ['==', 'foo', 1]]).filter;
        expect(f2({zoom: 0}, {properties: {foo: 1}})).toBe(false);

        const f3 = createFilterExpr(['none', ['==', 'foo', 0]]).filter;
        expect(f3({zoom: 0}, {properties: {foo: 1}})).toBe(true);

        const f4 = createFilterExpr(['none', ['==', 'foo', 0], ['==', 'foo', 1]]).filter;
        expect(f4({zoom: 0}, {properties: {foo: 1}})).toBe(false);

    });

    test('has', () => {
        const f = createFilterExpr(['has', 'foo']).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: true}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(true);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(true);
        expect(f({zoom: 0}, {properties: {}})).toBe(false);
    });

    test('!has', () => {
        const f = createFilterExpr(['!has', 'foo']).filter;
        expect(f({zoom: 0}, {properties: {foo: 0}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: 1}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: '0'}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: false}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: null}})).toBe(false);
        expect(f({zoom: 0}, {properties: {foo: undefined}})).toBe(false);
        expect(f({zoom: 0}, {properties: {}})).toBe(true);
    });
}
