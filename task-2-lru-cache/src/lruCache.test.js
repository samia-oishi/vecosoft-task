import test from 'node:test';
import assert from 'node:assert/strict';
import { LRUCache } from './lruCache.js';

test('follows the company example sequence', () => {
  const cache = new LRUCache(2);
  cache.put('A', 10);
  cache.put('B', 20);
  assert.equal(cache.get('A'), 10);
  cache.put('C', 30);
  assert.equal(cache.get('B'), -1);
  cache.put('D', 40);
  assert.equal(cache.get('C'), 30);
  assert.equal(cache.get('A'), -1);
});

test('get refreshes recency before eviction', () => {
  const cache = new LRUCache(2);
  cache.put('A', 1);
  cache.put('B', 2);
  assert.equal(cache.get('A'), 1);
  cache.put('C', 3);
  assert.deepEqual(cache.entries(), [['C', 3], ['A', 1]]);
});

test('put updates a key without increasing size', () => {
  const cache = new LRUCache(2);
  cache.put('A', 1);
  cache.put('B', 2);
  cache.put('A', 10);
  assert.equal(cache.size, 2);
  assert.equal(cache.get('A'), 10);
  assert.equal(cache.get('B'), 2);
});

test('capacity one always keeps the newest value', () => {
  const cache = new LRUCache(1);
  cache.put('A', 1);
  cache.put('B', 2);
  assert.equal(cache.get('A'), -1);
  assert.equal(cache.get('B'), 2);
});

test('put reports the key evicted by capacity overflow', () => {
  const cache = new LRUCache(2);
  cache.put('A', 1);
  cache.put('B', 2);
  assert.equal(cache.get('A'), 1);
  assert.equal(cache.put('C', 3), 'B');
});

test('invalid capacities throw a useful error', () => {
  assert.throws(() => new LRUCache(0), /positive integer/);
  assert.throws(() => new LRUCache(1.5), /positive integer/);
});
