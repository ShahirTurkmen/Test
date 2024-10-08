import * as primitive from './internal/primitives.js';
import { symbol_metadata, init, isInstance, isStatic, isStruct, metadata, } from './internal/struct.js';
import { capitalize } from './string.js';
export * as Struct from './internal/struct.js';
/**
 * Gets the size in bytes of a type
 */
export function sizeof(type) {
    // primitive
    if (typeof type == 'string') {
        if (!primitive.isValid(type)) {
            throw new TypeError('Invalid primitive type: ' + type);
        }
        return (+primitive.normalize(type).match(primitive.regex)[2] / 8);
    }
    if (!isStruct(type)) {
        throw new TypeError('Not a struct');
    }
    const struct = isStatic(type) ? type : type.constructor;
    return struct[symbol_metadata(struct)][metadata].size;
}
/**
 * Aligns a number
 */
export function align(value, alignment) {
    return Math.ceil(value / alignment) * alignment;
}
/**
 * Decorates a class as a struct
 */
export function struct(options = {}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function __decorateStruct(target, context) {
        context.metadata ??= {};
        context.metadata[init] ||= [];
        let size = 0;
        const members = new Map();
        for (const _ of context.metadata[init]) {
            const { name, type, length } = _;
            if (!primitive.isValid(type) && !isStatic(type)) {
                throw new TypeError('Not a valid type: ' + type);
            }
            members.set(name, {
                offset: size,
                type: primitive.isValid(type) ? primitive.normalize(type) : type,
                length,
            });
            size += sizeof(type) * (length || 1);
            size = align(size, options.align || 1);
        }
        context.metadata[metadata] = { options, members, size };
        return target;
    };
}
/**
 * Decorates a class member to be serialized
 */
export function member(type, length) {
    return function (value, context) {
        let name = context.name;
        if (typeof name == 'symbol') {
            console.warn('Symbol used for struct member name will be coerced to string: ' + name.toString());
            name = name.toString();
        }
        if (!name) {
            throw new ReferenceError('Invalid name for struct member');
        }
        context.metadata ??= {};
        context.metadata[init] ||= [];
        context.metadata[init].push({ name, type, length });
        return value;
    };
}
/**
 * Serializes a struct into a Uint8Array
 */
export function serialize(instance) {
    if (!isInstance(instance)) {
        throw new TypeError('Can not serialize, not a struct instance');
    }
    const { options, members } = instance.constructor[symbol_metadata(instance.constructor)][metadata];
    const buffer = new Uint8Array(sizeof(instance));
    const view = new DataView(buffer.buffer);
    for (const [name, { type, length, offset }] of members) {
        for (let i = 0; i < (length || 1); i++) {
            const iOff = offset + sizeof(type) * i;
            // @ts-expect-error 7053
            let value = length > 0 ? instance[name][i] : instance[name];
            if (typeof value == 'string') {
                value = value.charCodeAt(0);
            }
            if (!primitive.isType(type)) {
                buffer.set(value ? serialize(value) : new Uint8Array(sizeof(type)), iOff);
                continue;
            }
            const Type = capitalize(type);
            const fn = ('set' + Type);
            if (fn == 'setInt64') {
                view.setBigInt64(iOff, BigInt(value), !options.bigEndian);
                continue;
            }
            if (fn == 'setUint64') {
                view.setBigUint64(iOff, BigInt(value), !options.bigEndian);
                continue;
            }
            view[fn](iOff, Number(value), !options.bigEndian);
        }
    }
    return buffer;
}
/**
 * Deserializes a struct from a Uint8Array
 */
export function deserialize(instance, _buffer) {
    if (!isInstance(instance)) {
        throw new TypeError('Can not deserialize, not a struct instance');
    }
    const { options, members } = instance.constructor[symbol_metadata(instance.constructor)][metadata];
    const buffer = new Uint8Array('buffer' in _buffer ? _buffer.buffer : _buffer);
    const view = new DataView(buffer.buffer);
    for (const [name, { type, offset, length }] of members) {
        for (let i = 0; i < (length || 1); i++) {
            // @ts-expect-error 7053
            let object = length > 0 ? instance[name] : instance;
            const key = length > 0 ? i : name, iOff = offset + sizeof(type) * i;
            // @ts-expect-error 7053
            if (typeof instance[name] == 'string') {
                // @ts-expect-error 7053
                instance[name] = instance[name].slice(0, i) + String.fromCharCode(view.getUint8(iOff)) + instance[name].slice(i + 1);
                continue;
            }
            if (!primitive.isType(type)) {
                if (object[key] === null || object[key] === undefined) {
                    continue;
                }
                deserialize(object[key], new Uint8Array(buffer.slice(iOff, iOff + sizeof(type))));
                continue;
            }
            if (length > 0) {
                object ||= [];
            }
            const Type = capitalize(type);
            const fn = ('get' + Type);
            if (fn == 'getInt64') {
                object[key] = view.getBigInt64(iOff, !options.bigEndian);
                continue;
            }
            if (fn == 'getUint64') {
                object[key] = view.getBigUint64(iOff, !options.bigEndian);
                continue;
            }
            object[key] = view[fn](iOff, !options.bigEndian);
        }
    }
}
function _member(type) {
    function _structMemberDecorator(valueOrLength, context) {
        if (typeof valueOrLength == 'number') {
            return member(type, valueOrLength);
        }
        return member(type)(valueOrLength, context);
    }
    return _structMemberDecorator;
}
/**
 * Shortcut types
 *
 * Instead of writing `@member(type)` you can write `@types.type`, or `@types.type(length)` for arrays
 */
export const types = Object.fromEntries(primitive.valids.map(t => [t, _member(t)]));
