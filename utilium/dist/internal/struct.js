export const init = Symbol('struct_init');
export const metadata = Symbol('struct');
export function isValidMetadata(arg) {
    return arg != null && typeof arg == 'object' && metadata in arg;
}
/**
 * Gets a reference to Symbol.metadata, even on platforms that do not expose it globally (like Node)
 */
export function symbol_metadata(arg) {
    const symbol_metadata = Symbol.metadata || Object.getOwnPropertySymbols(arg).find(s => s.description == 'Symbol.metadata');
    if (!symbol_metadata) {
        throw new ReferenceError('Could not get a reference to Symbol.metadata');
    }
    return symbol_metadata;
}
export function isStatic(arg) {
    return typeof arg == 'function' && symbol_metadata(arg) in arg && isValidMetadata(arg[symbol_metadata(arg)]);
}
export function isInstance(arg) {
    return arg != null && typeof arg == 'object' && isStatic(arg.constructor);
}
export function isStruct(arg) {
    return isInstance(arg) || isStatic(arg);
}
