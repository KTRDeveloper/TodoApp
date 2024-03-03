export const objectToArray = <T>(obj: { [s: string]: T }): T[] => Object.entries(obj).map(([k, v]) => v);
