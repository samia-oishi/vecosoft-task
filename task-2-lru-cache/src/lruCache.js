export class LRUCache {
  constructor(capacity, entries = []) { if (!Number.isInteger(capacity) || capacity < 1) throw new Error('Capacity must be a positive integer.'); this.capacity = capacity; this.map = new Map(entries); }
  get(key) { if (!this.map.has(key)) return -1; const value = this.map.get(key); this.map.delete(key); this.map.set(key, value); return value; }
  put(key, value) { if (this.map.has(key)) this.map.delete(key); this.map.set(key, value); if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value); }
  entries() { return [...this.map.entries()].reverse(); }
  get size() { return this.map.size; }
}
