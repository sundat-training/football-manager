
 export function updateObject<T extends object, K extends keyof T, V>(obj: T, key: K, fn: (v:V) => V): T {
    return { ...obj, [key]: fn (obj[key] as V ) };
}