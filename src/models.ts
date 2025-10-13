export type CustomObjectKey<K extends string | number | symbol, V> = Record<K, V>;
export type CustomObject<V> = CustomObjectKey<string, V>;
export type SimpleObject = CustomObject<string>;

export type MultiArray<T> = T[] | MultiArray<T>[];
export type MultiObject<V> = { [key: string]: V | MultiObject<V> };

export type Delta = -1 | 0 | 1;