// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

import buffer from 'buffer'


function debug(x) {
  console.debug(`DEBUG: ${x}\n`);
}

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === "[object Array]";
}

function isBoolean(arg) {
    return typeof arg === "boolean";
}

function isNull(arg) {
    return arg === null;
}

function isNullOrUndefined(arg) {
    return arg == null;
}

function isNumber(arg) {
    return typeof arg === "number";
}

function isString(arg) {
    return typeof arg === "string";
}

function isSymbol(arg) {
  return typeof arg === "symbol";
}

function isUndefined(arg) {
    return arg === void 0;
}

function isRegExp(re) {
    return objectToString(re) === "[object RegExp]";
}

function isObject(arg) {
    return typeof arg === "object" && arg !== null;
}

function isDate(d) {
    return objectToString(d) === "[object Date]";
}

function isError(e) {
    return objectToString(e) === "[object Error]" || e instanceof Error;
}

function isFunction(arg) {
  return typeof arg === "function";
}

function isPrimitive(arg) {
  return (
    arg === null ||
    typeof arg === "boolean" ||
    typeof arg === "number" ||
    typeof arg === "string" ||
    typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined"
  );
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
const isBuffer = buffer.Buffer.isBuffer;


const exports = {
    isArray,
    isBoolean,
    isDate,
    isString,
    isNull,
    isNullOrUndefined,
    isNumber,
    isSymbol,
    isUndefined,
    isRegExp,
    isObject,
    isBuffer,
    isFunction,
    isError,
  isPrimitive,
    debug
}
export default exports