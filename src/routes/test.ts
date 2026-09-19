import { createUrlFromPaths, normalizeUrl } from ".";
import { argsString, resultString } from "../test-tools";

describe(
  "normalizeUrl",
  () => {
    const testData: Array<[string, string]> = [
      // input, expectedResult
      ["abc", "abc"],
      ["a/b/c", "a/b/c"],
      ["a//b///c", "a/b/c"],
      ["a\\b\\c", "a/b/c"],
      ["a\\\\b\\\\c", "a/b/c"],
      ["http://example.com", "http://example.com"],
      ["http:///example.com", "http://example.com"],
      ["https://example.com", "https://example.com"],
      ["https:\\/\\/example.com", "https://example.com"],
    ];

    testData.forEach(([input, expected]) => it(
      `normalizeUrl(${argsString(input)}) is ${resultString(expected)}`,
      () => expect(normalizeUrl(input)).toEqual(expected)
    ));
  }
);

describe('createUrlFromPaths', () => {
  const testData: [string[], string][] = [
    // joiner, subStrings, expected
    [['//', 'a', 'b', 'c', '//'], '/a/b/c'],
    [['path', '/to/', 'file'], '/path/to/file'],
    [['//path', '/to/', 'new-file/'], '/path/to/new-file'],
    [['//path', '/to/sub-path/', 'file/'], '/path/to/sub-path/file'],
    [['http://', 'example.com', 'path', 'to', 'file'], 'http://example.com/path/to/file'],
    [['https://', 'example.com', 'path/to', 'file'], 'https://example.com/path/to/file'],
    [['https://example.com', '/path/to/file'], 'https://example.com/path/to/file'],
    [['ftp://', 'example.com', 'path', 'to', 'file'], 'ftp://example.com/path/to/file'],
    [['ws://', 'example.com', 'path', 'to', 'file'], 'ws://example.com/path/to/file'],
  ];

  testData.forEach(([paths, expected]) => {
    // - Test with array of paths
    it(`createUrlFromPaths(${argsString(paths)}) is ${resultString(expected)}`, () => expect(createUrlFromPaths(paths)).toBe(expected));
    // - Test with spread operator
    it(`createUrlFromPaths(${argsString(...paths)}) is ${resultString(expected)}`, () =>
      expect(createUrlFromPaths(...paths)).toBe(expected));
  });
});