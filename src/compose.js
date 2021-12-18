function compose(...fns) {
  const length = fns.length;
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] !== "function") {
      throw TypeError("类型错误");
    }
  }

  return function (...args) {
    let i = 0;
    let result = length ? fns[0].apply(this, args) : args;
    for (let i = 1; i < length; i++) {
      result = fns[i].call(this, result);
    }
    return result;
  };
}

function add(a) {
  return a + a;
}

function mul(a) {
  return a * a;
}

const makeCompose = compose(add, mul);
console.log(makeCompose(5));
