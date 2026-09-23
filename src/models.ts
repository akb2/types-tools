export type CustomObjectKey<K extends string | number | symbol, V> = Record<K, V>;
export type CustomObject<V> = CustomObjectKey<string, V>;
export type SimpleObject = CustomObject<string>;

export type MultiArray<T> = T[] | MultiArray<T>[];
export type MultiObject<V> = { [key: string]: V | MultiObject<V> };

export type Delta = -1 | 0 | 1;

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type NotDefinable<T> = T | null | undefined;

export type Enum = Readonly<Record<string, string | number>>;
export type EnumValue<E extends Enum> = E[keyof E];
export type EnumValues<E> =
  E extends Record<string, string | number>
    ? EnumValue<E> | (EnumValue<E> extends infer V extends string | number ? `${V}` : never)
    : E extends string | number
      ? E | `${E}`
      : never;