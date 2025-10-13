import { anyToArray, anyToBoolean, anyToFloat, anyToInt, anyToString } from ".";
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