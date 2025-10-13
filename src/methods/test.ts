import { createArray, isDefined } from ".";
import { allArgsString, argsString, resultString } from "../test-tools";
import { ArgType, CreateArrayTestData } from "../test-tools/models";

describe(
  "createArray",
  () => {
    const testData: CreateArrayTestData<number | string>[] = [
      // length, getItem, expectedResult
      [5, undefined, [0, 1, 2, 3, 4]],
      [6, i => i * 2, [0, 2, 4, 6, 8, 10]],
      [0, undefined, []],
      [4, i => "Item " + i, ["Item 0", "Item 1", "Item 2", "Item 3"]],
      [4, () => "item", ["item", "item", "item", "item"]],
    ];

    testData.forEach(([length, getItem, expected]) => it(
      `createArray(${argsString(length, getItem)}) is ${resultString(expected)}`,
      () => expect(createArray(length, getItem)).toEqual(expected)
    ));
  }
);

describe(
  "isDefined",
  () => {
    const testData: [ArgType, boolean][] = [
      [null, false],
      [undefined, false],
      [0, true],
      ["", true],
      [false, true],
      [NaN, true],
    ];

    testData.forEach(([value, expected]) => it(
      `isDefined(${allArgsString(value)}) is ${resultString(expected)}`,
      () => expect(isDefined(value)).toEqual(expected)
    ));
  }
);