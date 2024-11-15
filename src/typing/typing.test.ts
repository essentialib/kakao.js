import { describe, test, expect, expectTypeOf } from 'vitest';
import * as T from './typing';

describe('generic function', () => {
    function inferSchema<T>(schema: T.Type<T>) {
        return schema;
    }
    
    function inferSchema2<T extends T.Type>(schema: T) {
        return schema;
    }

    test('inferSchema', () => {
        const r = inferSchema(T.number);
        expectTypeOf(r).toEqualTypeOf<T.Type<number>>();
    });

    test('inferSchema2', () => {
        const r = inferSchema2(T.number);
        expectTypeOf(r).toEqualTypeOf<T.NumberType>();
    });
});

describe('infer type', () => {
    test('string', () => {
        const str = T.string;
        type t = T.typeOf<typeof str>;
    });
})