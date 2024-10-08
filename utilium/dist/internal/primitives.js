import { capitalize } from '../string.js';
export const types = ['int8', 'uint8', 'int16', 'uint16', 'int32', 'uint32', 'int64', 'uint64', 'float32', 'float64'];
export const valids = [...types, ...types.map(t => capitalize(t)), 'char'];
export const regex = /^(u?int)(8|16|32|64)|(float)(32|64)$/i;
export function normalize(type) {
    return (type == 'char' ? 'uint8' : type.toLowerCase());
}
export function isType(type) {
    return regex.test(type.toString());
}
export function isValid(type) {
    return type == 'char' || regex.test(type.toString().toLowerCase());
}
