/// <reference types="node" resolution-mode="require"/>
import type { ParsedPath } from 'node:path';
/**
 * An absolute path
 */
export type AbsolutePath = `/${string}`;
export declare let cwd: string;
export declare function cd(path: string): void;
export declare const sep = "/";
export declare function normalizeString(path: string, allowAboveRoot: boolean): string;
export declare function formatExt(ext: string): string;
export declare function resolve(...parts: string[]): AbsolutePath;
export declare function normalize(path: string): string;
export declare function isAbsolute(path: string): path is AbsolutePath;
export declare function join(...parts: string[]): string;
export declare function relative(from: string, to: string): string;
export declare function dirname(path: string): string;
export declare function basename(path: string, suffix?: string): string;
export declare function extname(path: string): string;
export declare function format(pathObject: ParsedPath): string;
export declare function parse(path: string): ParsedPath;
