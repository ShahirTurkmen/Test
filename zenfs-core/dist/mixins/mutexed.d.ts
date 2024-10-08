import type { File } from '../file.js';
import type { FileSystem, FileSystemMetadata } from '../filesystem.js';
import '../polyfills.js';
import type { Stats } from '../stats.js';
import type { Concrete } from '../utils.js';
export declare class MutexLock {
    protected readonly previous?: MutexLock | undefined;
    protected current: PromiseWithResolvers<void>;
    protected _isLocked: boolean;
    get isLocked(): boolean;
    constructor(previous?: MutexLock | undefined);
    done(): Promise<void>;
    unlock(): void;
    [Symbol.dispose](): void;
}
/**
 * @hidden
 */
export declare class __MutexedFS<T extends FileSystem> implements FileSystem {
    /**
     * @internal
     */
    _fs: T;
    ready(): Promise<void>;
    metadata(): FileSystemMetadata;
    /**
     * The current locks
     */
    private currentLock?;
    /**
     * Adds a lock for a path
     */
    protected addLock(): MutexLock;
    /**
     * Locks `path` asynchronously.
     * If the path is currently locked, waits for it to be unlocked.
     * @internal
     */
    lock(path: string, syscall: string): Promise<MutexLock>;
    /**
     * Locks `path` asynchronously.
     * If the path is currently locked, an error will be thrown
     * @internal
     */
    lockSync(path: string, syscall: string): MutexLock;
    /**
     * Whether `path` is locked
     * @internal
     */
    get isLocked(): boolean;
    rename(oldPath: string, newPath: string): Promise<void>;
    renameSync(oldPath: string, newPath: string): void;
    stat(path: string): Promise<Stats>;
    statSync(path: string): Stats;
    openFile(path: string, flag: string): Promise<File>;
    openFileSync(path: string, flag: string): File;
    createFile(path: string, flag: string, mode: number): Promise<File>;
    createFileSync(path: string, flag: string, mode: number): File;
    unlink(path: string): Promise<void>;
    unlinkSync(path: string): void;
    rmdir(path: string): Promise<void>;
    rmdirSync(path: string): void;
    mkdir(path: string, mode: number): Promise<void>;
    mkdirSync(path: string, mode: number): void;
    readdir(path: string): Promise<string[]>;
    readdirSync(path: string): string[];
    exists(path: string): Promise<boolean>;
    existsSync(path: string): boolean;
    link(srcpath: string, dstpath: string): Promise<void>;
    linkSync(srcpath: string, dstpath: string): void;
    sync(path: string, data: Uint8Array, stats: Readonly<Stats>): Promise<void>;
    syncSync(path: string, data: Uint8Array, stats: Readonly<Stats>): void;
}
/**
 * This serializes access to an underlying async filesystem.
 * For example, on an OverlayFS instance with an async lower
 * directory operations like rename and rmdir may involve multiple
 * requests involving both the upper and lower filesystems -- they
 * are not executed in a single atomic step. OverlayFS uses this
 * to avoid having to reason about the correctness of
 * multiple requests interleaving.
 *
 * Note:
 * Instead of extending the passed class, `MutexedFS` stores it internally.
 * This is to avoid a deadlock caused when a mathod calls another one
 * The problem is discussed extensivly in [#78](https://github.com/zen-fs/core/issues/78)
 * Instead of extending `FileSystem`,
 * `MutexedFS` implements it in order to make sure all of the methods are passed through
 *
 * @todo Change `using _` to `using void` pending https://github.com/tc39/proposal-discard-binding
 * @internal
 */
export declare function Mutexed<const T extends Concrete<typeof FileSystem>>(FS: T): typeof __MutexedFS<InstanceType<T>> & {
    new (...args: ConstructorParameters<T>): __MutexedFS<InstanceType<T>>;
};
