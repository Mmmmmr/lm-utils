// 保存当前需要收集的响应式函数
let activeReactiveFn = null;

class Depend {
  constructor() {
    this.reactiveFns = new Set();
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }
}

// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 封装一个获取depend函数
const targetMap = new WeakMap();
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }

  // 根据key获取depend对象
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

function reactive(obj) {
  // es5
  //  Object.keys(obj).forEach((key) => {
  //    let value = obj[key];
  //    Object.defineProperty(obj, key, {
  //      get: function () {
  //        const depend = getDepend(obj, key);
  //        depend.depend();
  //        return value;
  //      },
  //      set: function (newValue) {
  //        value = newValue;
  //        const depend = getDepend(obj, key);
  //        depend.notify();
  //      },
  //    });
  //  });
  //  return obj;
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      // 根据target.key获取对应的depend
      const depend = getDepend(target, key);
      // 给depend对象中添加响应函数
      // depend.addDepend(activeReactiveFn)
      depend.depend();

      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      // depend.notify()
      const depend = getDepend(target, key);
      depend.notify();
    },
  });
}
