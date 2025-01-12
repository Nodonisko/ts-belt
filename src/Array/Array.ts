import { ExtractNested, Array } from '../types'

export declare function groupBy<A, B extends PropertyKey>(
  xs: Array<A>,
  groupFn: (item: A) => B,
): Partial<Record<B, readonly [A, ...A[]]>>
export declare function flat<A>(
  xs: Array<A>,
): Array<A extends Array<infer B> ? B : A>
export declare function deepFlat<A>(xs: Array<A>): Array<ExtractNested<A>>
export declare function toTuple<T extends Array<any>>(
  xs: readonly [...T],
): readonly [...T]
export declare function filter<A, B extends A>(
  xs: Array<A>,
  predicateFn: (value: A) => value is B,
): Array<B>
export declare function filter<A>(
  xs: Array<A>,
  predicateFn: (value: A) => boolean,
): Array<A>
export declare function filterWithIndex<A, B extends A>(
  xs: Array<A>,
  predicateFn: (index: number, value: A) => value is B,
): Array<B>
export declare function filterWithIndex<A>(
  xs: Array<A>,
  predicateFn: (index: number, value: A) => boolean,
): Array<A>
export declare function keep<A, B extends A>(
  xs: Array<A>,
  predicateFn: (value: A) => value is B,
): Array<B>
export declare function keep<A>(
  xs: Array<A>,
  predicateFn: (value: A) => boolean,
): Array<A>
export declare function keepWithIndex<A, B extends A>(
  xs: Array<A>,
  predicateFn: (index: number, value: A) => value is B,
): Array<B>
export declare function keepWithIndex<A>(
  xs: Array<A>,
  predicateFn: (index: number, value: A) => boolean,
): Array<A>
export declare function partition<A, B extends A>(
  xs: Array<A>,
  predicateFn: (value: A) => value is B,
): readonly [Array<B>, Array<Exclude<A, B>>]
export declare function partition<A>(
  xs: Array<A>,
  predicateFn: (value: A) => boolean,
): readonly [Array<A>, Array<A>]
