import { Comparer } from '../comparer';

/**
 * Represents a number based comparer.
 * 
 * @type {NumberComparer}
 */
export class NumberComparer implements Comparer<number>
{
    /**
     * Checks if left key equals right key.
     * 
     * @param {number} x Left key. 
     * @param {number} y Right key.
     * 
     * @returns {boolean} True when left key equals right key. False otherwise. 
     */
    public eq(x: number, y: number): boolean
    {
        return x === y;
    }

    /**
     * Checks if left key not equals right key.
     * 
     * @param {number} x Left key. 
     * @param {number} y Right key.
     * 
     * @returns {boolean} True when left key not equals right key. False otherwise. 
     */
    public neq(x: number, y: number): boolean
    {
        return x !== y;
    }

    /**
     * Checks if left key greater than right key.
     * 
     * @param {number} x Left key. 
     * @param {number} y Right key.
     * 
     * @returns {boolean} True when left key greater than right key. False otherwise. 
     */
    public gt(x: number, y: number): boolean
    {
        return x > y;
    }

    /**
     * Checks if left key greater than or equals right key.
     * 
     * @param {number} x Left key. 
     * @param {number} y Right key.
     * 
     * @returns {boolean} True when left key greater than or equals right key. False otherwise. 
     */
    public gte(x: number, y: number): boolean 
    {
        return x >= y;
    }

    /**
     * Checks if left key lower than right key.
     * 
     * @param {number} x Left key. 
     * @param {number} y Right key.
     * 
     * @returns {boolean} True when left key lower than right key. False otherwise. 
     */
    public lt(x: number, y: number): boolean
    {
        return x < y;
    }
    
    /**
     * Checks if left key lower than or equals right key.
     * 
     * @param {number} x Left key. 
     * @param {number} y Right key.
     * 
     * @returns {boolean} True when left key lower than or equals right key. False otherwise. 
     */
    public lte(x: number, y: number): boolean
    {
        return x <= y;
    }
}
