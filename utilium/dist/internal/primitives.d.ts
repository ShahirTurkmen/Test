type BitsToBytes = {
    '8': 1;
    '16': 2;
    '32': 4;
    '64': 8;
};
export type Size<T extends string> = T extends `${'int' | 'uint' | 'float'}${infer bits}` ? (bits extends keyof BitsToBytes ? BitsToBytes[bits] : never) : never;
export type Type = `${'int' | 'uint'}${8 | 16 | 32 | 64}` | `float${32 | 64}`;
export type Valid = Type | Capitalize<Type> | 'char';
export declare const types: ("int8" | "int16" | "int32" | "int64" | "uint8" | "uint16" | "uint32" | "uint64" | "float32" | "float64")[];
export declare const valids: ("int8" | "int16" | "int32" | "int64" | "uint8" | "uint16" | "uint32" | "uint64" | "float32" | "float64" | "Int8" | "Int16" | "Int32" | "Int64" | "Uint8" | "Uint16" | "Uint32" | "Uint64" | "Float32" | "Float64" | "char")[];
export declare const regex: RegExp;
export type Normalize<T extends Valid> = T extends 'char' ? 'uint8' : Uncapitalize<T>;
export declare function normalize<T extends Valid>(type: T): Normalize<T>;
export declare function isType(type: {
    toString(): string;
}): type is Type;
export declare function isValid(type: {
    toString(): string;
}): type is Valid;
export {};
