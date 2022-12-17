/**
 * Checks if value is undefined or null.
 * 
 * @param {any} x Input value.
 * 
 * @returns {boolean} True when value is undefined or null. False otherwise.
 */
export function isNil(x: any): x is undefined | null
{
    return x === undefined || x === null;
}
