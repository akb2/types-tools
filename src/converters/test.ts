import { anyToArray, anyToBoolean, anyToDate, anyToFloat, anyToInt, anyToString, flatObject, mergeAndFlatObjects } from ".";
import { allArgsString, firstArgString, resultString } from "../test-tools";
import { AnyToArrayTestData } from "../test-tools/models";

describe(
  "anyToFloat",
  () => {
    const testData: [any, number | undefined, number | undefined, number][] = [
      [null, undefined, undefined, 0],
      [undefined, undefined, undefined, 0],
      ["", 56, undefined, 56],
      ["42", undefined, undefined, 42],
      [`${Math.PI}`, 0, 5, 3.14159],
    ];

    testData.forEach(([input, defaultValue, precision, expected]) => it(
      `anyToFloat(${firstArgString(input, defaultValue, precision)}) is ${resultString(expected)}`,
      () => expect(anyToFloat(input, defaultValue, precision)).toBe(expected)
    ));
  }
);

describe(
  "anyToInt",
  () => {
    const testData: [any, number | undefined, number][] = [
      [null, undefined, 0],
      [undefined, undefined, 0],
      ["", 56, 56],
      ["42", undefined, 42],
      [`${Math.PI}`, 0, 3],
    ];

    testData.forEach(([input, defaultValue, expected]) => it(
      `anyToInt(${firstArgString(input, defaultValue)}) is ${resultString(expected)}`,
      () => expect(anyToInt(input, defaultValue)).toBe(expected)
    ));
  }
);

describe(
  "anyToString",
  () => {
    const testData: [any, string | undefined, string][] = [
      [null, undefined, ""],
      [undefined, "Default title", "Default title"],
      [NaN, undefined, "NaN"],
      [false, "not true", "false"],
      [Math.PI, undefined, Math.PI.toString()],
    ];

    testData.forEach(([input, defaultValue, expected]) => it(
      `anyToString(${firstArgString(input, defaultValue)}) is ${resultString(expected)}`,
      () => expect(anyToString(input, defaultValue)).toBe(expected)
    ));
  }
);

describe(
  "anyToArray",
  () => {
    const testData: AnyToArrayTestData<number | string>[] = [
      [null, []],
      [undefined, []],
      [[], []],
      [["a", "b"], ["a", "b"]],
      ["String value", ["String value"]]
    ];

    testData.forEach(([input, expected]) => it(
      `anyToArray(${allArgsString(input)}) is ${resultString(expected)}`,
      () => expect(anyToArray(input)).toEqual(expected)
    ));
  }
);

describe(
  "anyToBoolean",
  () => {
    const testData = [
      ["true", true],
      ["on", true],
      ["enabled", true],
      ["1", true],
      [1, true],
      [true, true],
      [null, false],
      ["false", false],
      [false, false],
      ["Any string", false],
    ];

    testData.forEach(([input, expected]) => it(
      `anyToBoolean(${allArgsString(input)}) is ${resultString(expected)}`,
      () => expect(anyToBoolean(input)).toEqual(expected)
    ));
  }
);

describe(
  "anyToDate",
  () => {
    const testData = [
      // input, defaultValue, expected
      ["2025-05-01", undefined, "2025-05-01T00:00:00.000Z"],
      [1700000000000, undefined, "2023-11-14T22:13:20.000Z"],
      [new Date("2024-01-01"), undefined, "2024-01-01T00:00:00.000Z"],
      ["invalid", undefined, true],
      [null, undefined, true],
      [{}, new Date("2000-01-01"), "2000-01-01T00:00:00.000Z"],
    ];

    testData.forEach(([input, defaultValue, expected]) => it(
      `anyToDate(${firstArgString(input, defaultValue)}) is ${resultString(expected === true || expected === undefined
        ? new Date().toISOString()
        : <string>expected
      )}`,
      () => {
        const checkDate = defaultValue
          ? anyToDate(input, <Date>defaultValue)
          : anyToDate(input);

        // If expected is true or undefined, we expect the current date's ISO string. Otherwise, we expect the provided expected string.
        return expect(checkDate.toISOString()).toEqual(expected === true || expected === undefined
          ? new Date().toISOString()
          : expected
        );
      }
    ));
  }
);

describe(
  "flatObject",
  () => {
    const testData: [Record<string, unknown>, Record<string, unknown>][] = [
      [{ a: 1, b: { c: 2 } }, { "a": 1, "b.c": 2 }],
      [{}, {}],
      [{ a: { b: { c: { d: 4 } } } }, { "a.b.c.d": 4 }],
    ];

    testData.forEach(([input, expected]) => it(
      `flatObject(${allArgsString(input)}) is ${resultString(expected)}`,
      () => expect(flatObject(input)).toEqual(expected)
    ));
  }
);

describe(
  "mergeAndFlatObjects",
  () => {
    const testData: [Record<string, unknown>[], Record<string, unknown>][] = [
      [[{ a: 1 }, { b: 2 }], { "a": 1, "b": 2 }],
      [[{ a: { b: 1 } }, { a: { c: 2 } }], { "a.b": 1, "a.c": 2 }],
      [[{}, {}], {}],
    ];

    testData.forEach(([input, expected]) => it(
      `mergeAndFlatObjects(${allArgsString(input)}) is ${resultString(expected)}`,
      () => expect(mergeAndFlatObjects(...input)).toEqual(expected)
    ));
  }
);