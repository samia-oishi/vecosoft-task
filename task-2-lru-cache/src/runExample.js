import { LRUCache } from './lruCache.js';

export function runCompanyExample() {
  const cache = new LRUCache(2);
  const output = [];
  const put = (key, value) => { cache.put(key, value); output.push(`put("${key}", ${value})`); };
  const get = key => { const value = cache.get(key); output.push(`get("${key}") → ${value}`); return value; };
  put('A', 10);
  put('B', 20);
  get('A');
  put('C', 30);
  get('B');
  put('D', 40);
  get('C');
  get('A');
  return output;
}
