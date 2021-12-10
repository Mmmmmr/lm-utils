Function.prototype.mycall = function (thisArg, ...args) {
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : globalThis;
  const fn = Symbol("fn");
  thisArg[fn] = this;
  Object.defineProperty(thisArg, fn, {
    enumerable: false,
    configurable: true,
  });
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
};

