/**
 * Creates an array of the specified length. If the getItem function is provided, fills the array
 * with the values ​​returned by that function.
 * @param {number} length - The length of the array to create.
 * @param {(index: number) => T} [getItem] - A function that takes an index
 * and returns an element of an array of type T. Optional parameter.
 * @returns {T[]} An array of type T of the specified length.
 */
export const createArray = <T = number>(length: number, getItem?: ((index: number) => T) | null): Array<T> => {
  const newArray = Array.from(Array(length).keys());

  return !!getItem
    ? newArray.map(getItem)
    : newArray as T[];
};

/**
 * Determines whether a value is neither `null` nor `undefined`.
 *
 * @typeParam T - The type of the value to check.
 * @param value - The value to test for definition.
 * @returns `true` if the value is defined (not `null` or `undefined`), otherwise `false`.
 */
export const isDefined = <T>(value?: T): boolean => value !== null && value !== undefined;