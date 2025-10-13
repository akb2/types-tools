
type ArgTypes = string | number | boolean | undefined | Function | null;
export type ArgType = ArgTypes[] | ArgTypes;

export type CreateArrayTestData<T extends any> = [
  number,
  ((index: number) => T) | undefined,
  T[]
];

export type AnyToArrayTestData<T extends any> = [
  null | undefined | T | T[],
  T[]
];