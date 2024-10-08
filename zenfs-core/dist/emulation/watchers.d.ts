/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { EventEmitter } from 'eventemitter3';
import type { EventEmitter as NodeEventEmitter } from 'node:events';
import type * as fs from 'node:fs';
import { type Stats } from '../stats.js';
/**
 * Base class for file system watchers.
 * Provides event handling capabilities for watching file system changes.
 *
 * @template TEvents The type of events emitted by the watcher.
 */
declare class Watcher<TEvents extends Record<string, unknown[]> = Record<string, unknown[]>> extends EventEmitter<TEvents> implements NodeEventEmitter {
    readonly path: string;
    off<T extends EventEmitter.EventNames<TEvents>>(event: T, fn?: (...args: any[]) => void, context?: any, once?: boolean): this;
    removeListener<T extends EventEmitter.EventNames<TEvents>>(event: T, fn?: (...args: any[]) => void, context?: any, once?: boolean): this;
    constructor(path: string);
    setMaxListeners(): never;
    getMaxListeners(): never;
    prependListener(): never;
    prependOnceListener(): never;
    rawListeners(): never;
    ref(): this;
    unref(): this;
}
/**
 * Watches for changes on the file system.
 *
 * @template T The type of the filename, either `string` or `Buffer`.
 */
export declare class FSWatcher<T extends string | Buffer = string | Buffer> extends Watcher<{
    change: [eventType: fs.WatchEventType, filename: T];
    close: [];
    error: [error: Error];
}> implements fs.FSWatcher {
    readonly options: fs.WatchOptions;
    constructor(path: string, options: fs.WatchOptions);
    close(): void;
    [Symbol.dispose](): void;
}
/**
 * Watches for changes to a file's stats.
 *
 * Instances of `StatWatcher` are used by `fs.watchFile()` to monitor changes to a file's statistics.
 */
export declare class StatWatcher extends Watcher<{
    change: [current: Stats, previous: Stats];
    close: [];
    error: [error: Error];
}> implements fs.StatWatcher {
    private options;
    private intervalId?;
    private previous?;
    constructor(path: string, options: {
        persistent?: boolean;
        interval?: number;
    });
    protected onInterval(): void;
    protected start(): void;
    /**
     * @internal
     */
    stop(): void;
}
export declare function addWatcher(path: string, watcher: FSWatcher): void;
export declare function removeWatcher(path: string, watcher: FSWatcher): void;
export declare function emitChange(eventType: fs.WatchEventType, filename: string): void;
export {};
