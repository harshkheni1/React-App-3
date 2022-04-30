type stnb = string | number;
export type ArrayToType<T extends readonly stnb[]> = T[number];
