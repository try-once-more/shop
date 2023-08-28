export type DeepKeyOf<T> = T extends string ? never : {
    [K in keyof T & string]: T[K] extends object
    ? `${string & K}.${DeepKeyOf<T[K]>}`
    : K;
}[keyof T & string];