import * as primitive from './internal/primitives.js';
import { DecoratorContext, InstanceLike, Options, Size, StaticLike, type MemberContext } from './internal/struct.js';
import { ClassLike } from './types.js';
export * as Struct from './internal/struct.js';
/**
 * Gets the size in bytes of a type
 */
export declare function sizeof<T extends primitive.Valid | StaticLike | InstanceLike>(type: T): Size<T>;
/**
 * Aligns a number
 */
export declare function align(value: number, alignment: number): number;
/**
 * Decorates a class as a struct
 */
export declare function struct(options?: Partial<Options>): <const T extends StaticLike>(target: T, context: ClassDecoratorContext & DecoratorContext) => T;
/**
 * Decorates a class member to be serialized
 */
export declare function member(type: primitive.Valid | ClassLike, length?: number): <V>(value: V, context: MemberContext) => V;
/**
 * Serializes a struct into a Uint8Array
 */
export declare function serialize(instance: unknown): Uint8Array;
/**
 * Deserializes a struct from a Uint8Array
 */
export declare function deserialize(instance: unknown, _buffer: ArrayBuffer | ArrayBufferView): void;
declare function _member<T extends primitive.Valid>(type: T): {
    <const V>(length: number): (value: V, context: MemberContext) => V;
    <const V>(value: V, context: MemberContext): V;
};
/**
 * Shortcut types
 *
 * Instead of writing `@member(type)` you can write `@types.type`, or `@types.type(length)` for arrays
 */
export declare const types: { [K in primitive.Valid]: ReturnType<typeof _member<K>>; };
