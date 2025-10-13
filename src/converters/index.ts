import { round } from "@akb2/math";
import { isDefined } from "../methods";

/**
 * Converts any value to a floating-point number, with optional rounding.
 *
 * @param value - The value to convert to a float.
 * @param defaultValue - The value to return if conversion fails (default is 0).
 * @param precision - The number of decimal places to round to. If set to -1, rounds to the number of decimals present in the converted value.
 * @returns The converted and rounded floating-point number.
 */
export const anyToFloat = (value: any, defaultValue: number = 0, precision: number = -1): number => {
  let num: number = parseFloat(value);

  num = isNaN(num)
    ? defaultValue
    : num;

  if (precision === -1) {
    const [, decimals] = num.toString().split(".");

    precision = decimals?.length ?? 0;
  }

  return round(num, precision);
};

/**
 * Converts any value to an integer.
 * If the conversion fails (result is NaN), returns the provided default value.
 *
 * @param value - The value to convert to an integer.
 * @param defaultValue - The value to return if conversion fails. Defaults to 0.
 * @returns The converted integer, or the default value if conversion fails.
 */
export const anyToInt = (value: any, defaultValue: number = 0): number => anyToFloat(value, defaultValue, 0);

/**
 * Converts any value to its string representation using the `toString` method if available.
 * If the value is `null` or `undefined`, returns the provided `defaultTitle`.
 *
 * @param value - The value to convert to a string.
 * @param defaultTitle - The string to return if `value` is `null` or `undefined`. Defaults to an empty string.
 * @returns The string representation of `value`, or `defaultTitle` if `value` is `null` or `undefined`.
 */
export const anyToString = (value: any, defaultTitle = ""): string => value?.toString() ?? defaultTitle;

/**
 * Converts a value or array of values into an array.
 *
 * If the input is already an array, it is returned as-is.
 * If the input is a single value, it is wrapped in an array.
 * If the input is undefined or null, an empty array is returned.
 *
 * @typeParam T - The type of the value(s).
 * @param value - The value or array of values to convert.
 * @returns An array containing the input value(s), or an empty array if the input is undefined or null.
 */
export const anyToArray = <T>(value: T | T[]): T[] => {
  if (isDefined(value)) {
    return Array.isArray(value)
      ? value
      : [value];
  }

  return <T[]>[];
};

/**
 * Converts a given value to a boolean based on a predefined set of "true" values.
 *
 * Recognized "true" values are: `"true"`, `"on"`, `"enabled"`, `"1"`, `1`, and `true`.
 * Returns `true` if the input matches any of these values, otherwise returns `false`.
 *
 * @param value - The value to convert to boolean.
 * @returns `true` if the value is considered "true", otherwise `false`.
 */
export const anyToBoolean = (value: any): boolean => {
  const trueValues = ["true", "on", "enabled", "1", 1, true];

  // Проверка
  return !!value && trueValues.includes(value);
};