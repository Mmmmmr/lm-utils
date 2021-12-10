function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

module.export = function deepClone(originValue, map = new WeakMap()) {
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }

  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }

  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }

  if (!isObject(originValue)) {
    return originValue;
  }

  if (typeof originValue === "function") {
    return originValue;
  }

  if (map.has(originValue)) return map.get(originValue);

  const newObject = Array.isArray(originValue) ? [] : {};

  map.set(originValue, newObject);
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map);
  }

  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey in symbolKeys) {
    newObject[sKey] = deepClone(sKey, map);
  }

  return newObject;
};
