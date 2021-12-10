Function.prototype.mybind = function (thisArg, ...args) {
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : globalThis;
  const fn = Symbol("fn");
  thisArg[fn] = this;
  Object.defineProperty(thisArg, fn, {
    enumerable: false,
    configurable: true,
  });
  return function (...otherArgs) {
    args = args ? args : [];
    otherArgs = otherArgs ? otherArgs : [];
    const result = thisArg[fn](...args, ...otherArgs);
    delete thisArg[fn];
    return result;
  };
};

function foo(a, b, c, d) {
  console.log(this);
  return a + b + c + d;
}

foo.bind("hllo")();
console.log(foo.mybind("hello", 10)(20, 30, 40));
