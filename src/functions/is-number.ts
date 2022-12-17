/**
 * Checks if value is a number.
 * 
 * @param {any} x Input value.
 * 
 * @returns {boolean} True when value is a number. False otherwise.
 */
export function isNumber(x: any): x is number
{
    return typeof x === 'number';
}
