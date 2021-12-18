function currying(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...otherArgs) {
        return curried.apply(this, args.concat(otherArgs));
      };
    }
  };
}

