Function.prototype.myapply = function (thisArg, argArray) {
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : globalThis;
  const fn = Symbol("fn");
  thisArg[fn] = this;
  Object.defineProperty(thisArg, fn, {
    enumerable: false,
    configurable: true,
  });
  const result = argArray ? thisArg[fn](...argArray) : thisArg.fn();
  delete thisArg[fn];
  return result;
};

