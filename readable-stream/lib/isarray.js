var toString = {}.toString;


const isArray = Array.isArray ||
    function (arr) {
    return toString.call(arr) == "[object Array]";
  };

export default isArray

