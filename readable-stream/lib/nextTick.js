const process = {
  _exiting: false,
  nextTick(callback) {
    if (typeof callback !== "function")
      throw new TypeError(`[ERR_INVALID_CALLBACK] The "callback" argument must be of type function. Received ${callback}`);

    if (process._exiting) return;

    var args;
    switch (arguments.length) {
      case 1:
        break;
      case 2:
        args = [arguments[1]];
        break;
      case 3:
        args = [arguments[1], arguments[2]];
        break;
      case 4:
        args = [arguments[1], arguments[2], arguments[3]];
        break;
      default:
        args = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
    }
  },
};
function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== "function") {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
    case 0:
    case 1:
      return process.nextTick(fn);
    case 2:
      return process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      });
    case 3:
      return process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      });
    case 4:
      return process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      });
    default:
      args = new Array(len - 1);
      i = 0;
      while (i < args.length) {
        args[i++] = arguments[i];
      }
      return process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
  }
}

export default {
    nextTick,
    process
}