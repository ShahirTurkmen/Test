import { UnionToTuple } from './types.js';
export declare function filterObject<O extends object, R extends object>(object: O, predicate: (key: keyof O, value: O[keyof O]) => boolean): R;
export declare function pick<T extends object, K extends keyof T>(object: T, ...keys: readonly K[]): Pick<T, K>;
export declare function pick<T extends object, K extends keyof T>(object: T, ...keys: readonly (readonly K[])[]): Pick<T, K>;
export declare function omit<T extends object, K extends keyof T>(object: T, ...keys: readonly K[]): Omit<T, K>;
export declare function omit<T extends object, K extends keyof T>(object: T, ...keys: readonly (readonly K[])[]): Omit<T, K>;
export declare function assignWithDefaults<To extends Record<keyof any, any>, From extends Partial<To>>(to: To, from: From, defaults?: Partial<To>): void;
/**
 * Entries of T
 */
export type Entries<T extends object> = UnionToTuple<{
    [K in keyof T]: [K, T[K]];
}[keyof T]>;
export declare function isJSON(str: string): boolean;
export declare function resolveConstructors(object: object): string[];
export declare function map<const T extends Partial<Record<any, any>>>(items: T): Map<keyof T, T[keyof T]>;
