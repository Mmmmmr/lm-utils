class LMEventBus {
  constructor() {
    this.eventbus = {};
  }

  on(eventName, eventCallback, thisArg) {
    const handlers = this.eventbus[eventName];
    if (!handlers) {
      this.eventbus[eventName] = [];
    }
    this.eventbus[eventName].push({
      eventCallback,
      thisArg,
    });
  }

  off(eventName, eventCallback) {
    const handlers = this.eventbus[eventName];
    if (!handlers) return;
    const newHandlers = handlers.filter(
      (handle) => handle.eventCallback !== eventCallback
    );
    this.eventbus[eventName] = newHandlers;
  }

  emit(eventName, ...payload) {
    const handlers = this.eventbus[eventName];
    if (!handlers) return;
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, payload);
    });
  }
}

module.export = LMEventBus;
