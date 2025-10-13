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
isDefined(null);        // false
isDefined(undefined);   // false
isDefined(0);           // true
isDefined("");          // true
isDefined(false);       // true
isDefined(NaN);         // true
```

### `anyToFloat(value, defaultValue = 0, precision = -1)`

Converts any value to a floating-point number, with optional rounding.

* `precision = -1` → preserves the number of decimals from the input.

```ts
anyToFloat(null);                       // 0
anyToFloat(undefined);                  // 0
anyToFloat("", 56);                     // 56
anyToFloat("42");                       // 42
anyToFloat("3.141592653589793", 0, 5);  // 3.14159
```

### `anyToInt(value, defaultValue = 0)`

Converts any value to an integer. Falls back to `defaultValue` if conversion fails.

```ts
anyToInt(null);                    // 0
anyToInt(undefined);               // 0
anyToInt("", 56);                  // 56
anyToInt("42");                    // 42
anyToInt("3.141592653589793", 0);  // 3
```

### `anyToString(value, defaultTitle = "")`

Converts any value to a string. Returns `defaultTitle` if value is `null` or `undefined`.

```ts
anyToString(null);                        // ""
anyToString(undefined, "Default title");  // "Default title"
anyToString(NaN);                         // "NaN"
anyToString(false, "not true");           // "false"
anyToString(3.141592653589793);           // "3.141592653589793"
```

### `anyToArray(value)`

Ensures the input is an array.
If the value is already an array, it’s returned as-is.
If it’s a single value — it’s wrapped in an array.
If it’s `null` or `undefined` — returns an empty array.

```ts
anyToArray(null);            // []
anyToArray(undefined);       // []
anyToArray([]);              // []
anyToArray(["a", "b"]);      // ["a", "b"]
anyToArray("String value");  // ["String value"]
```

### `anyToBoolean(value)`

Converts a value to boolean based on predefined truthy values:
`"true"`, `"on"`, `"enabled"`, `"1"`, `1`, and `true`.

```ts
anyToBoolean("true");        // true
anyToBoolean("on");          // true
anyToBoolean("enabled");     // true
anyToBoolean("1");           // true
anyToBoolean(1);             // true
anyToBoolean(true);          // true
anyToBoolean(null);          // false
anyToBoolean("false");       // false
anyToBoolean(false);         // false
anyToBoolean("Any string");  // false
```

### `createArray(length, getItem?)`

Creates an array of the specified length.
Optionally fills it using a callback function.

```ts
createArray(5);                       // [0, 1, 2, 3, 4]
createArray(6, i => i * 2);           // [0, 2, 4, 6, 8, 10]
createArray(0);                       // []
createArray(4, i => "Item " + i);     // [Item 0, Item 1, Item 2, Item 3]
createArray(4, () => "item");         // [item, item, item, item]
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
