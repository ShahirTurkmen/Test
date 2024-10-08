export function filterObject(object, predicate) {
    const entries = Object.entries(object);
    return Object.fromEntries(entries.filter(([key, value]) => predicate(key, value)));
}
export function pick(object, ...keys) {
    const picked = {};
    for (const key of keys.flat()) {
        picked[key] = object[key];
    }
    return picked;
}
export function omit(object, ...keys) {
    return filterObject(object, key => !keys.flat().includes(key));
}
export function assignWithDefaults(to, from, defaults = to) {
    const keys = new Set([...Object.keys(to), ...Object.keys(from)]);
    for (const key of keys) {
        try {
            to[key] = from[key] ?? defaults[key] ?? to[key];
        }
        catch (e) {
            // Do nothing
        }
    }
}
export function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
}
export function resolveConstructors(object) {
    const constructors = [];
    let prototype = object;
    while (prototype && !['Function', 'Object'].includes(prototype.constructor.name)) {
        prototype = Object.getPrototypeOf(prototype);
        constructors.push(prototype.constructor.name);
    }
    return constructors;
}
export function map(items) {
    return new Map(Object.entries(items));
}
