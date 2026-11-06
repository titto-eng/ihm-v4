'use strict'

// Derived from deepmerge 4.3.1 (MIT). See LICENSE and README.md.
const reactElementType = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('react.element') : 0xeac7

function isMergeableObject(value) {
  if (!value || typeof value !== 'object') return false
  const type = Object.prototype.toString.call(value)
  return type !== '[object RegExp]' && type !== '[object Date]' &&
    value.$$typeof !== reactElementType
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value)
    ? deepmerge(Array.isArray(value) ? [] : {}, value, options) : value
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(element => cloneUnlessOtherwiseSpecified(element, options))
}

function getMergeFunction(key, options) {
  if (!options.customMerge) return deepmerge
  const customMerge = options.customMerge(key)
  return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getKeys(target) {
  return Object.keys(target).concat(Object.getOwnPropertySymbols(target)
    .filter(symbol => Object.prototype.propertyIsEnumerable.call(target, symbol)))
}

function propertyIsOnObject(object, key) {
  try {
    return key in object
  } catch {
    return false
  }
}

function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) &&
    !(Object.prototype.hasOwnProperty.call(target, key) &&
      Object.prototype.propertyIsEnumerable.call(target, key))
}

function setOwn(destination, key, value) {
  // Assignment invokes Object.prototype.__proto__'s setter. Defining an own
  // data property cannot change the destination's prototype, even for
  // null-prototype inputs or own enumerable __proto__ keys in either input.
  Object.defineProperty(destination, key, {
    value, enumerable: true, writable: true, configurable: true,
  })
}

function mergeObject(target, source, options) {
  const destination = {}
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(key => {
      setOwn(destination, key, cloneUnlessOtherwiseSpecified(target[key], options))
    })
  }
  getKeys(source).forEach(key => {
    if (propertyIsUnsafe(target, key)) return
    const value = propertyIsOnObject(target, key) && options.isMergeableObject(source[key])
      ? getMergeFunction(key, options)(target[key], source[key], options)
      : cloneUnlessOtherwiseSpecified(source[key], options)
    setOwn(destination, key, value)
  })
  return destination
}

function deepmerge(target, source, options) {
  options = options || {}
  options.arrayMerge = options.arrayMerge || defaultArrayMerge
  options.isMergeableObject = options.isMergeableObject || isMergeableObject
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified
  const sourceIsArray = Array.isArray(source)
  if (sourceIsArray !== Array.isArray(target)) {
    return cloneUnlessOtherwiseSpecified(source, options)
  }
  return sourceIsArray
    ? options.arrayMerge(target, source, options) : mergeObject(target, source, options)
}

deepmerge.all = function (array, options) {
  if (!Array.isArray(array)) throw new Error('first argument should be an array')
  return array.reduce((previous, next) => deepmerge(previous, next, options), {})
}

module.exports = deepmerge
