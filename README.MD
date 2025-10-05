# @akb2/types-tools

A lightweight TypeScript utility library providing common type helpers and data conversion functions.
Designed for consistent and predictable handling of primitive types, arrays, and objects.

## Installation

```bash
npm install @akb2/types-tools
```

## Overview

This package provides a set of strongly typed utility functions and generic type definitions for working with various data types. It’s intended for use in TypeScript projects that require safe type conversions, validation, and lightweight functional helpers.

## Functions

### `isDefined(value)`

Determines whether a value is neither `null` nor `undefined`.

```ts
isDefined(123);        // true
isDefined(undefined);  // false
isDefined(null);       // false
```

### `anyToFloat(value, defaultValue = 0, afterDotNum = -1)`

Converts any value to a floating-point number, with optional rounding.

* `afterDotNum = -1` → preserves the number of decimals from the input.

```ts
anyToFloat("12.3456", 0, 2);  // 12.35
anyToFloat("12.3");           // 12.3
anyToFloat("abc", 5);         // 5
```

### `anyToInt(value, defaultValue = 0)`

Converts any value to an integer. Falls back to `defaultValue` if conversion fails.

```ts
anyToInt("42.9");     // 43
anyToInt("abc", 10);  // 10
```

### `anyToString(value, defaultTitle = "")`

Converts any value to a string. Returns `defaultTitle` if value is `null` or `undefined`.

```ts
anyToString(123);        // "123"
anyToString(null, "N/A") // "N/A"
```

### `anyToArray(value)`

Ensures the input is an array.
If the value is already an array, it’s returned as-is.
If it’s a single value — it’s wrapped in an array.
If it’s `null` or `undefined` — returns an empty array.

```ts
anyToArray(5);         // [5]
anyToArray([1, 2, 3]); // [1, 2, 3]
anyToArray(null);      // []
```

### `anyToBoolean(value)`

Converts a value to boolean based on predefined truthy values:
`"true"`, `"on"`, `"enabled"`, `"1"`, `1`, and `true`.

```ts
anyToBoolean("true");     // true
anyToBoolean("enabled");  // true
anyToBoolean("false");    // false
```

### `createArray(length, getItem?)`

Creates an array of the specified length.
Optionally fills it using a callback function.

```ts
createArray(5);                  // [0, 1, 2, 3, 4]
createArray(3, i => i * 2);      // [0, 2, 4]
createArray(4, () => "item");    // ["item", "item", "item", "item"]
```

## Types

### `CustomObjectKey<K, V>`

Generic object with string, number, or symbol keys.

```ts
type CustomObjectKey<K, V> = Record<string | number | symbol, V>;
```

### `CustomObject<V>`

Generic string-keyed object.

```ts
type CustomObject<V> = Record<string, V>;
```

### `SimpleObject`

A simple string-object mapping.

```ts
type SimpleObject = Record<string, string>;
```

### `MultiArray<T>`

Recursive array type allowing nested arrays of any depth.

```ts
type MultiArray<T> = T[] | MultiArray<T>[];
```

### `MultiObject<V>`

Recursive object type allowing deeply nested key-value pairs.

```ts
type MultiObject<V> = { [key: string]: V | MultiObject<V> };
```

### `Delta`

A numeric delta value: `-1`, `0`, or `1`.

```ts
type Delta = -1 | 0 | 1;
```

## Example Usage

```ts
import { anyToFloat, anyToArray, anyToBoolean, createArray } from "@akb2/types-tools";

const num = anyToFloat("3.14159", 0, 2); // 3.14
const arr = anyToArray("a");             // ["a"]
const flag = anyToBoolean("on");         // true
const seq = createArray(3, i => i + 1);  // [1, 2, 3]
```

## 🧾 License

MIT © 2025 [Andrei Kobelev (@akb2)](https://github.com/akb2)

[Github repository](https://github.com/akb2/types-tools)
