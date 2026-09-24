# LRU Cache — Algorithm Explanation

## 1. Data structures and why

The implementation uses a JavaScript `Map` to store cache keys and values. A `Map` provides average O(1) lookup, insertion, and deletion, and it preserves insertion order. The first map entry represents the least recently used item, while the last entry represents the most recently used item.

When `get(key)` finds a value, the implementation removes and re-inserts that key so it becomes the most recently used entry. When `put(key, value)` receives an existing key, it removes the old entry before inserting the updated value, which also refreshes its recency. If the cache grows beyond capacity, it removes the first map entry.

For a general-purpose production implementation in a language without ordered maps, I would use a hash map plus a doubly linked list. The hash map gives direct key lookup and the linked list gives constant-time movement and eviction.

## 2. Time and space complexity

Both `get` and `put` are average **O(1)**. A map lookup, deletion, and insertion are constant-time operations, and the oldest key can be removed with the map iterator without scanning the cache.

The cache uses **O(capacity)** space because it stores at most the configured number of key/value pairs. The operation history shown in the demo is separate presentation state and is not part of the cache algorithm.

## 3. A realistic limitation

An LRU cache performs poorly when the access pattern has little locality. For example, with a capacity of two, reading one hundred unique records sequentially means each new record evicts an older record before it is reused. This produces an almost 100% miss rate, so the cache adds memory and management overhead without improving response time.

The cache can also be a poor fit when all entries are equally likely to be requested or when stale values are more dangerous than repeated reads. In those cases, a different eviction policy or a short time-to-live may be more appropriate.

## 4. AI-assisted changes

AI helped me check duplicate-key behavior, eviction order, and edge cases such as a capacity of one. I kept the recommendation that an updated key should become most recently used because that matches standard LRU semantics.

I rejected adding a second data structure to this browser demonstration because JavaScript `Map` already provides ordered entries and keeps the implementation compact. For a high-throughput production cache, I would use the conventional map-plus-doubly-linked-list design and add memory-boundary, concurrency, and expiry tests.
