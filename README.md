# HashMap Implementation (JavaScript)

This project is a from-scratch implementation of a **HashMap** (also known as a dictionary or map) in JavaScript. It supports string keys, handles collisions using **separate chaining**, dynamically resizes based on a configurable **load factor**, and provides a full API similar to native map/dictionary structures.

This was built as a learning exercise to understand how hash maps work internally.

---

## Features

* String-only keys (enforced)
* Separate chaining for collision handling
* Automatic resizing when load factor is exceeded
* Defensive index bounds checking
* Full CRUD API
* Utility methods for keys, values, and entries

---

## Constructor

```js
new HashMap(loadFactor = 0.75, capacity = 16)
```

### Parameters

| Name         | Type   | Description                                        |
| ------------ | ------ | -------------------------------------------------- |
| `loadFactor` | number | Threshold at which resizing occurs (default: 0.75) |
| `capacity`   | number | Initial number of buckets (default: 16)            |

---

## Public Methods

### `set(key, value)`

Adds a new key-value pair to the map. If the key already exists, its value is overwritten.

* Automatically resizes when the load factor is exceeded
* Keys must be strings

---

### `get(key)`

Returns the value associated with the given key.

* Returns `null` if the key does not exist

---

### `has(key)`

Returns `true` if the key exists in the map, otherwise `false`.

---

### `remove(key)`

Removes the key-value pair from the map.

* Returns `true` if the key was removed
* Returns `false` if the key was not found

---

### `length()`

Returns the number of stored key-value pairs.

---

### `clear()`

Removes all entries from the map while preserving the current capacity.

---

### `keys()`

Returns an array of all stored keys.

---

### `values()`

Returns an array of all stored values.

---

### `entries()`

Returns an array of `[key, value]` pairs.

Example:

```js
[["apple", "red"], ["banana", "yellow"]]
```

---

## Collision Handling

This implementation uses **separate chaining** to resolve collisions.

Each bucket stores an array of `[key, value]` pairs. When multiple keys hash to the same index, they are stored together in the same bucket.

---

## Resizing Strategy

When the following condition is met:

```
(entries + 1) / capacity >= loadFactor
```

The hash map:

1. Doubles its capacity
2. Recreates the bucket array
3. Rehashes all existing entries
4. Reinserts them into the new buckets

This ensures even distribution and maintains average O(1) lookup time.

---

## Example Usage

```js
const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("grape", "purple");

console.log(map.get("apple")); // "red"
console.log(map.has("banana")); // true
console.log(map.remove("banana")); // true
console.log(map.length()); // 2
console.log(map.keys()); // ["apple", "grape"]
console.log(map.values()); // ["red", "purple"]
console.log(map.entries()); // [["apple", "red"], ["grape", "purple"]]
```

---

## Time Complexity (Average Case)

| Operation | Complexity |
| --------- | ---------- |
| set       | O(1)       |
| get       | O(1)       |
| has       | O(1)       |
| remove    | O(1)       |
| keys      | O(n)       |
| values    | O(n)       |
| entries   | O(n)       |

> Worst-case complexity can degrade to O(n) if many keys collide into the same bucket, but this is rare with a good hash function and resizing strategy.

---

## Design Decisions

* Keys are restricted to strings to simplify hashing
* Buckets are implemented as arrays for clarity
* Index bounds are defensively checked
* Resizing rehashes all entries
* Order of insertion is NOT preserved (as expected for hash maps)

---

## Notes

This implementation is designed for learning purposes and clarity rather than production use. Native JavaScript `Map` objects should be used in real-world applications.

---

## Author

Built as a learning exercise in data structures and algorithms.

---
