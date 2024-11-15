export abstract class Type<T = any> {
    protected checkList: ((value: T) => boolean)[] = [];

    protected constructor() {}
    abstract copy(): Type<T>;
    abstract test(value: any): value is T;
    abstract parse(value: string): T;

    safeParse(value: string): { success: true, value: T } | { success: false, error: Error } {
        try {
            return { success: true, value: this.parse(value) };
        } catch (err) {
            if (!(err instanceof Error)) throw err;
            return { success: false, error: err };
        }
    }

    check(value: T) {
        return this.checkList.every(c => c(value));
    }
}

export class StringType extends Type<string> {
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;

    constructor() {
        super();
    }

    copy(): StringType {
        const instance = new StringType();
        instance.maxLength = this.maxLength;
        instance.minLength = this.minLength;
        instance.pattern = this.pattern;
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): string {
        if (this.check(value)) return value;
        throw new TypeError(`Value ${value} is not match constraints`);
    }
    
    override test(value: any): value is string {
        return this.check(value) && typeof value === 'string';
    }

    max(length: number) {
        const instance = this.copy();
        instance.maxLength = length;
        instance.checkList.push(v => v.length <= length);
        return instance;
    }

    min(length: number) {
        const instance = this.copy();
        instance.minLength = length;
        instance.checkList.push(v => v.length >= length);
        return instance;
    }

    length(length: number) {
        return this.min(length).max(length);
    }

    regex(pattern: RegExp) {
        const instance = this.copy();
        instance.pattern = pattern;
        instance.checkList.push(v => pattern.test(v));
        return instance;
    }

    includes(searchString: string, position: number = 0): StringType {
        const instance = this.copy();
        instance.checkList.push(v => v.includes(searchString, position));
        return instance;
    }

    startsWith(searchString: string, position: number = 0): StringType {
        const instance = this.copy();
        instance.checkList.push(v => v.startsWith(searchString, position));
        return instance;
    }

    endsWith(searchString: string, position: number = 0): StringType {
        const instance = this.copy();
        instance.checkList.push(v => v.endsWith(searchString, position));
        return instance;
    }
}

export class NumberType extends Type<number> {
    maxValue?: number;
    minValue?: number;
    isInteger?: boolean;
    isFinite?: boolean;

    constructor() {
        super();
    }

    copy() {
        const instance = new NumberType();
        instance.maxValue = this.maxValue;
        instance.minValue = this.minValue;
        instance.isInteger = this.isInteger;
        instance.isFinite = this.isFinite;
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): number {
        const f = +value;
        if (isNaN(f))
            throw new TypeError(`Value ${value} is not a number`);
        else if (!this.check(f))
            throw new TypeError(`Value ${value} is not match constraints`);
        return f;
    }
    
    override test(value: any): value is number {
        return this.check(value) && typeof value === 'number';
    }

    ge(value: number) {
        const instance = this.copy();
        instance.maxValue = value;
        instance.checkList.push(v => v >= value);
        return instance;
    }

    gt(value: number) {
        const instance = this.copy();
        instance.minValue = value;
        instance.checkList.push(v => v > value);
        return instance
    }

    le(value: number) {
        const instance = this.copy();
        instance.maxValue = value;
        instance.checkList.push(v => v <= value);
        return instance;
    }

    lt(value: number) {
        const instance = this.copy();
        instance.minValue = value;
        instance.checkList.push(v => v < value);
        return instance;
    }

    max(value: number) {
        return this.le(value);
    }

    min(value: number) {
        return this.ge(value);
    }

    positive() {
        return this.gt(0);
    }

    negative() {
        return this.lt(0);
    }

    nonPositive() {
        return this.le(0);
    }

    nonNegative() {
        return this.ge(0);
    }

    multipleOf(base: number) {
        const instance = this.copy();
        instance.checkList.push(v => v % base === 0);
        return instance;
    }

    int() {
        const instance = this.copy();
        instance.isInteger = true;
        instance.checkList.push(Number.isInteger);
        return instance;
    }

    finite() {
        const instance = this.copy();
        instance.isFinite = true;
        instance.checkList.push(Number.isFinite);
        return instance;
    }
}

export class BigIntType extends Type<bigint> {
    maxValue?: bigint;
    minValue?: bigint;
    isFinite?: boolean;

    constructor() {
        super();
    }

    copy() {
        const instance = new BigIntType();
        instance.maxValue = this.maxValue;
        instance.minValue = this.minValue;
        instance.isFinite = this.isFinite;
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): bigint {
        const b = BigInt(value);
        if (!this.check(b))
            throw new TypeError(`Value ${value} is not match constraints`);
        return b;
    }

    override test(value: any): value is bigint {
        return this.check(value) && typeof value === 'bigint';
    }

    ge(value: bigint) {
        const instance = this.copy();
        instance.maxValue = value;
        instance.checkList.push(v => v >= value);
        return instance;
    }

    gt(value: bigint) {
        const instance = this.copy();
        instance.minValue = value;
        instance.checkList.push(v => v > value);
        return instance
    }

    le(value: bigint) {
        const instance = this.copy();
        instance.maxValue = value;
        instance.checkList.push(v => v <= value);
        return instance;
    }

    lt(value: bigint) {
        const instance = this.copy();
        instance.minValue = value;
        instance.checkList.push(v => v < value);
        return instance;
    }

    max(value: bigint) {
        return this.le(value);
    }

    min(value: bigint) {
        return this.ge(value);
    }

    positive() {
        return this.gt(0n);
    }

    negative() {
        return this.lt(0n);
    }

    nonPositive() {
        return this.le(0n);
    }

    nonNegative() {
        return this.ge(0n);
    }

    multipleOf(base: bigint) {
        const instance = this.copy();
        instance.checkList.push(v => v % base === 0n);
        return instance;
    }
}

export class BooleanType extends Type<boolean> {
    constructor() {
        super();
    }

    copy(): BooleanType {
        const instance = new BooleanType();
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): boolean {
        if (!(value === 'true' || value === 'false'))
            throw new TypeError(`Value ${value} is not a boolean`);

        const b = value === 'true';
        if (!this.check(b))
            throw new TypeError(`Value ${value} is not match constraints`);
        return b;
    }

    override test(value: any): value is boolean {
        return this.check(value) && typeof value === 'boolean';
    }
}

export class NullType extends Type<null> {
    constructor() {
        super();
    }

    copy(): NullType {
        const instance = new NullType();
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): null {
        if (value.length > 0)
            throw new TypeError(`Value ${value} is not a null`);
        else if (!this.check(null))
            throw new TypeError(`Value ${value} is not match constraints`);
        return null;
    }

    override test(value: any): value is null {
        return this.check(value) && value === null;
    }
}

export class UndefinedType extends Type<undefined> {
    constructor() {
        super();
    }

    copy(): UndefinedType {
        const instance = new UndefinedType();
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): undefined {
        if (value.length > 0)
            throw new TypeError(`Value ${value} is not a undefined`);
        else if (!this.check(undefined))
            throw new TypeError(`Value ${value} is not match constraints`);
        return undefined;
    }

    override test(value: any): value is undefined {
        return this.check(value) && value === undefined;
    }
}

export class VoidType extends Type<void> {
    constructor() {
        super();
    }

    copy(): VoidType {
        const instance = new VoidType();
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): void {
        if (value.length > 0)
            throw new TypeError(`Value ${value} is not a void`);
        else if (!this.check(undefined))
            throw new TypeError(`Value ${value} is not match constraints`);
        return void 0;
    }

    override test(value: any): value is void {
        return this.check(value) && value === undefined;
    }
}

export class AnyType extends Type<any> {
    constructor() {
        super();
    }

    copy(): AnyType {
        const instance = new AnyType();
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string) {
        if (!this.check(value))
            throw new TypeError(`Value ${value} is not match constraints`);
        
        let parsed;
        if ((parsed = booleanType.safeParse(value)).success)
            return parsed.value;
        else if ((parsed = nullType.safeParse(value)).success)
            return parsed.value;
        else if ((parsed = undefinedType.safeParse(value)).success)
            return parsed.value;
        else if ((parsed = bigIntType.safeParse(value)).success)
            return parsed.value;
        else if ((parsed = numberType.safeParse(value)).success)
            return parsed.value;
        else if ((parsed = stringType.safeParse(value)).success)
            return parsed.value;
        else
            throw new TypeError(`Value ${value} is not a any`);
    }

    override test(value: any): value is any {
        return this.check(value) && true;
    }
}

export class NeverType extends Type<never> {
    constructor() {
        super();
    }

    copy(): NeverType {
        const instance = new NeverType();
        instance.checkList = this.checkList.slice();
        return instance;
    }

    parse(value: string): never {
        throw new TypeError(`Value ${value} is not a never`);
    }

    override test(value: any): value is never {
        return this.check(value) && false;
    }
}

export class FunctionType<Inputs extends unknown[] = [], Output = void> extends Type<(...args: Inputs) => Output> {
    accessor parameterTypes: { [K in keyof Inputs]: Type<Inputs[K]> } = [] as any;
    accessor returnType: Type<Output> = new VoidType() as any;
    accessor executor: (...args: Inputs) => Output = (() => {}) as any;

    constructor() {
        super();
    }

    copy<I extends unknown[], O>() {
        const instance = new FunctionType<I, O>();
        instance.parameterTypes = this.parameterTypes as any;
        instance.returnType = this.returnType as any;
        instance.executor = this.executor as any;
        return instance;
    }

    parse(value: string): (...args: Inputs) => Output {
        // function parse 는 전혀 의미 없음
        throw new TypeError(`Value ${value} is not a function`);
    }

    override test(value: any): value is (...args: Inputs) => Output {
        return this.check(value) && typeof value === 'function' && value.length === this.parameterTypes.length;
    }

    args<Args extends unknown[]> (...args: { [K in keyof Args]: Type<Args[K]> }) {
        const instance = this.copy<Args, Output>();
        instance.parameterTypes = args;
        return instance;
    }

    returns<Return> (type: Type<Return>) {
        const instance = this.copy<Inputs, Return>();
        instance.returnType = type;
        return instance;
    }

    implement(fn: (...args: Inputs) => Output) {
        const instance = this.copy<Inputs, Output>();
        instance.executor = (...args: Parameters<typeof fn>): ReturnType<typeof fn> => {
            this.parameterTypes.forEach((input, idx) => input.test(args[idx]));
            const result = fn(...args);
            this.returnType?.test(result);
            return result;
        };
        return instance;
    }

    execute(...args: Inputs) {
        return this.executor(...args);
    }
}

// const stringType = (...args: ConstructorParameters<typeof StringType>) => new StringType(...args);
const stringType = new StringType();
// const numberType = (...args: ConstructorParameters<typeof NumberType>) => new NumberType(...args);
const numberType = new NumberType();
// const bigIntType = (...args: ConstructorParameters<typeof BigIntType>) => new BigIntType(...args);
const bigIntType = new BigIntType();
// const booleanType = (...args: ConstructorParameters<typeof BooleanType>) => new BooleanType(...args);
const booleanType = new BooleanType();
// const nullType = (...args: ConstructorParameters<typeof NullType>) => new NullType(...args);
const nullType = new NullType();
// const undefinedType = (...args: ConstructorParameters<typeof UndefinedType>) => new UndefinedType(...args);
const undefinedType = new UndefinedType();
// const voidType = (...args: ConstructorParameters<typeof VoidType>) => new VoidType(...args);
const voidType = new VoidType();
// const anyType = (...args: ConstructorParameters<typeof AnyType>) => new AnyType(...args);
const anyType = new AnyType();
// const neverType = (...args: ConstructorParameters<typeof NeverType>) => new NeverType(...args);
const neverType = new NeverType();
// const functionType = <I extends unknown[] = [], O = void>(...args: ConstructorParameters<typeof FunctionType>) => new FunctionType<I, O>(...args);
const functionType = new FunctionType();

export type typeOf<T> = T extends Type<infer U> ? U : never;

export {
    stringType as string,
    numberType as number,
    bigIntType as bigint,
    booleanType as boolean,
    nullType as null,
    undefinedType as undefined,
    voidType as void,
    anyType as any,
    neverType as never,
    functionType as function,
}
