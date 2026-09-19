import { escapeRegExp, smartJoin } from ".";
import { argsString, resultString } from "../test-tools";

describe(
  "escapeRegExp",
  () => {
    const testData: Array<[string, string]> = [
      // data, expectedResult
      ["abc", "abc"],
      ["a.c", "a\\.c"],
      ["a*c", "a\\*c"],
      ["a+c", "a\\+c"],
      ["a?c", "a\\?c"],
      ["a^c", "a\\^c"],
      ["a$c", "a\\$c"],
      ["a(c", "a\\(c"],
      ["a)c", "a\\)c"],
      ["a|c", "a\\|c"],
      ["a[c", "a\\[c"],
      ["a]c", "a\\]c"],
      ["a\\c", "a\\\\c"],
    ];

    testData.forEach(([data, expected]) => it(
      `escapeRegExp(${argsString(data)}) is ${resultString(expected)}`,
      () => expect(escapeRegExp(data)).toEqual(expected)
    ));
  }
);

describe('smartJoin', () => {
  const testData: [string, string[], string][] = [
    // joiner, subStrings, expected
    ['/', ['//', 'a', 'b', 'c', '//'], 'a/b/c'],
    ['.', ['.', '.a.b', '', '', 'c', '.'], 'a.b.c'],
    ['-', ['--', 'a', 'b', 'c', '--'], 'a-b-c'],
    ['__', ['parent', '__children', '__sub-children__'], 'parent__children__sub-children'],
    ['--', ['parent', '--children', '--sub-children--'], 'parent--children--sub-children'],
  ];

  testData.forEach(([joiner, subStrings, expected]) => {
    // - Test with array of paths
    it(`smartJoin(${argsString(joiner, subStrings)}) is ${resultString(expected)}`, () =>
      expect(smartJoin(joiner, subStrings)).toBe(expected));
    // - Test with spread operator
    it(`smartJoin(${argsString(joiner, ...subStrings)}) is ${resultString(expected)}`, () =>
      expect(smartJoin(joiner, ...subStrings)).toBe(expected));
  });
});