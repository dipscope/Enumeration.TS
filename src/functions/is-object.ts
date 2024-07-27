/**
 * Checks if value is an object.
 * 
 * @param {any} x Input value.
 * 
 * @returns {boolean} True when value is an object. False otherwise.
 */
export function isObject(x: any): x is Record<PropertyKey, any>
{
    return typeof x === 'object' && x !== null;
}
