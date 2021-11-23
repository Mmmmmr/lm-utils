function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing, resultCallback } = options;
  let lastTime = 0;
  let timer = null;

  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();
      if (!leading && !lastTime) lastTime = nowTime;
      const remainTime = interval - (nowTime - lastTime);

      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        const result = fn.apply(this, args);
        if (resultCallback) resultCallback(result);
        resolve(result);
        lastTime = nowTime;
        return;
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
          timer = null;
          lastTime = !leading ? 0 : new Date().getTime();
        }, remainTime);
      }
    });
  };

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}
