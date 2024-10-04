import { EventEmitter } from 'eventemitter3';
export class List extends EventEmitter {
    [Symbol.toStringTag] = 'List';
    constructor(values) {
        super();
        if (values) {
            this.push(...values);
        }
    }
    data = new Set();
    array() {
        return [...this.data];
    }
    json() {
        return JSON.stringify([...this.data]);
    }
    toString() {
        return this.join(',');
    }
    set(index, value) {
        if (Math.abs(index) > this.data.size) {
            throw new ReferenceError('Can not set an element outside the bounds of the list');
        }
        const data = [...this.data];
        data.splice(index, 1, value);
        this.data = new Set(data);
        this.emit('update');
    }
    deleteAt(index) {
        if (Math.abs(index) > this.data.size) {
            throw new ReferenceError('Can not delete an element outside the bounds of the list');
        }
        this.delete([...this.data].at(index));
    }
    // Array methods
    at(index) {
        if (Math.abs(index) > this.data.size) {
            throw new ReferenceError('Can not access an element outside the bounds of the list');
        }
        return [...this.data].at(index);
    }
    pop() {
        const item = [...this.data].pop();
        if (item !== undefined) {
            this.delete(item);
        }
        return item;
    }
    push(...items) {
        for (const item of items) {
            this.add(item);
        }
        return this.data.size;
    }
    join(separator) {
        return [...this.data].join(separator);
    }
    splice(start, deleteCount, ...items) {
        if (Math.abs(start) > this.data.size) {
            throw new ReferenceError('Can not splice elements outside the bounds of the list');
        }
        const data = [...this.data];
        const deleted = data.splice(start, deleteCount, ...items);
        this.data = new Set(data);
        this.emit('update');
        return deleted;
    }
    // Set methods
    add(value) {
        this.data.add(value);
        this.emit('update');
        return this;
    }
    clear() {
        this.data.clear();
        this.emit('update');
    }
    delete(value) {
        const success = this.data.delete(value);
        this.emit('update');
        return success;
    }
    union(other) {
        return new List(this.data.union(other));
    }
    intersection(other) {
        return new List(this.data.intersection(other));
    }
    difference(other) {
        return new List(this.data.difference(other));
    }
    symmetricDifference(other) {
        return new List(this.data.symmetricDifference(other));
    }
    isSubsetOf(other) {
        return this.data.isSubsetOf(other);
    }
    isSupersetOf(other) {
        return this.data.isSupersetOf(other);
    }
    isDisjointFrom(other) {
        return this.data.isDisjointFrom(other);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forEach(callbackfn, thisArg) {
        this.data.forEach((v1, v2) => callbackfn.call(thisArg, v1, v2, this));
    }
    has(value) {
        return this.data.has(value);
    }
    get size() {
        return this.data.size;
    }
    entries() {
        return this.data.entries();
    }
    keys() {
        return this.data.keys();
    }
    values() {
        return this.data.values();
    }
    [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
    }
}
