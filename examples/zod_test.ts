import { z } from 'zod';

const add = z.function().args(z.number(), z.number()).returns(z.number());
console.log(add.parse((a: number, b: number) => a + b)(3, 5));
// console.log(add.safeParse(function (a: number, b: number) {
//     return a + b;
// }));
// console.log(add.safeParse((a: number, b: string) => a + b));
// console.log(add.safeParse((a: number, b: string) => a + b.length));
// console.log(add.safeParse((a: number, b: string, c: bigint) => a + b + c));