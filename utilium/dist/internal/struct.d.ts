import { ClassLike } from '../types.js';
import * as primitive from './primitives.js';
export interface MemberInit {
    name: string;
    type: string | ClassLike;
    length?: number;
}
export declare const init: unique symbol;
/**
 * Options for struct initialization
 */
export interface Options {
    align: number;
    bigEndian: boolean;
}
export interface Member {
    type: primitive.Type | Static;
    offset: number;
    length?: number;
}
export interface Metadata {
    options: Partial<Options>;
    members: Map<string, Member>;
    size: number;
}
export declare const metadata: unique symbol;
export interface _DecoratorMetadata<T extends Metadata = Metadata> extends DecoratorMetadata {
    [metadata]?: T;
    [init]?: MemberInit[];
}
export interface DecoratorContext<T extends Metadata = Metadata> {
    metadata: _DecoratorMetadata<T>;
}
export type MemberContext = ClassMemberDecoratorContext & DecoratorContext;
export interface Static<T extends Metadata = Metadata> {
    [Symbol.metadata]: DecoratorMetadata & {
        [metadata]: T;
    };
    new (): Instance<T>;
    prototype: Instance<T>;
}
export interface StaticLike<T extends Metadata = Metadata> extends ClassLike {
    [Symbol.metadata]?: _DecoratorMetadata<T> | null;
}
export declare function isValidMetadata<T extends Metadata = Metadata>(arg: unknown): arg is DecoratorMetadata & {
    [metadata]: T;
};
/**
 * Gets a reference to Symbol.metadata, even on platforms that do not expose it globally (like Node)
 */
export declare function symbol_metadata(arg: ClassLike): typeof Symbol.metadata;
export declare function isStatic<T extends Metadata = Metadata>(arg: unknown): arg is Static<T>;
export interface Instance<T extends Metadata = Metadata> {
    constructor: Static<T>;
}
export interface InstanceLike<T extends Metadata = Metadata> {
    constructor: StaticLike<T>;
}
export declare function isInstance<T extends Metadata = Metadata>(arg: unknown): arg is Instance<T>;
export declare function isStruct<T extends Metadata = Metadata>(arg: unknown): arg is Instance<T> | Static<T>;
export type Like<T extends Metadata = Metadata> = InstanceLike<T> | StaticLike<T>;
export type Size<T extends primitive.Valid | StaticLike | InstanceLike> = T extends primitive.Valid ? primitive.Size<T> : T extends Like<infer M> ? M['size'] : number;
