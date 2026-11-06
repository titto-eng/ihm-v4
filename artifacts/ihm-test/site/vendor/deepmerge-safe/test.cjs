/* eslint-disable @typescript-eslint/no-require-imports -- Tests the vendored CommonJS API. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const merge = require('./index.cjs')
const { createRequire } = require('node:module')

test('Payload resolves the security fork through the installed override', () => {
  const payloadRequire = createRequire(require.resolve('payload'))
  assert.equal(payloadRequire('deepmerge'), merge)
  assert.equal(require('deepmerge'), merge)
})

test('source cannot poison a null-prototype target', () => {
  const source = JSON.parse('{"__proto__":{"polluted":true},"safe":1}')
  const result = merge(Object.create(null), source)
  assert.equal(Object.getPrototypeOf(result), Object.prototype)
  assert.equal(result.polluted, undefined)
  assert.equal(result.safe, 1)
  assert.equal(Object.hasOwn(result, '__proto__'), true)
})

test('target copy cannot poison the result', () => {
  const target = JSON.parse('{"__proto__":{"polluted":true}}')
  const result = merge(target, {})
  assert.equal(Object.getPrototypeOf(result), Object.prototype)
  assert.equal(result.polluted, undefined)
  assert.equal({}.polluted, undefined)
})

test('nested and array clones cannot poison prototypes', () => {
  const malicious = JSON.parse('{"__proto__":{"polluted":true}}')
  const result = merge({}, { nested: malicious, array: [malicious] })
  for (const object of [result, result.nested, result.array[0]]) {
    assert.equal(Object.getPrototypeOf(object), Object.prototype)
    assert.equal(object.polluted, undefined)
  }
})

test('inherited properties remain protected', () => {
  const result = merge({}, JSON.parse('{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}}}'))
  assert.equal(Object.hasOwn(result, '__proto__'), false)
  assert.equal(Object.hasOwn(result, 'constructor'), false)
  assert.equal({}.polluted, undefined)
})

test('nested objects and arrays merge without mutating inputs', () => {
  const target = { nested: { a: 1 }, list: [{ a: 1 }] }
  const source = { nested: { b: 2 }, list: [{ b: 2 }] }
  const result = merge(target, source)
  assert.deepEqual(result, { nested: { a: 1, b: 2 }, list: [{ a: 1 }, { b: 2 }] })
  assert.notEqual(result.nested, target.nested)
  assert.notEqual(result.list[0], target.list[0])
})

test('supports custom merges, array merges, clone false, and all', () => {
  assert.deepEqual(merge({ list: [1] }, { list: [2] }, { arrayMerge: (_, source) => source }), { list: [2] })
  assert.deepEqual(merge({ a: { value: 2 } }, { a: { value: 3 } }, {
    customMerge: key => key === 'a' ? (a, b) => ({ value: a.value + b.value }) : undefined,
  }), { a: { value: 5 } })
  const value = { a: 1 }
  assert.equal(merge({}, { value }, { clone: false }).value, value)
  assert.deepEqual(merge.all([{ a: 1 }, { b: 2 }]), { a: 1, b: 2 })
  assert.throws(() => merge.all({}), /first argument/)
})

test('preserves symbols and special objects', () => {
  const key = Symbol('key')
  const date = new Date()
  const expression = /test/
  const result = merge({}, { [key]: { a: 1 }, date, expression })
  assert.deepEqual(result[key], { a: 1 })
  assert.equal(result.date, date)
  assert.equal(result.expression, expression)
})
