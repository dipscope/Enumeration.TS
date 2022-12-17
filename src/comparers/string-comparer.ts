import { Comparer } from '../comparer';

/**
 * Represents a string based comparer.
 * 
 * @type {StringComparer}
 */
export class StringComparer implements Comparer<string>
{
    /**
     * Checks if left key equals right key.
     * 
     * @param {string} x Left key. 
     * @param {string} y Right key.
     * 
     * @returns {boolean} True when left key equals right key. False otherwise. 
     */
    public eq(x: string, y: string): boolean
    {
        return x.toLowerCase() === y.toLowerCase();
    }

    /**
     * Checks if left key not equals right key.
     * 
     * @param {string} x Left key. 
     * @param {string} y Right key.
     * 
     * @returns {boolean} True when left key not equals right key. False otherwise. 
     */
    public neq(x: string, y: string): boolean
    {
        return x.toLowerCase() !== y.toLowerCase();
    }

    /**
     * Checks if left key greater than right key.
     * 
     * @param {string} x Left key. 
     * @param {string} y Right key.
     * 
     * @returns {boolean} True when left key greater than right key. False otherwise. 
     */
    public gt(x: string, y: string): boolean
    {
        return x.toLowerCase() > y.toLowerCase();
    }

    /**
     * Checks if left key greater than or equals right key.
     * 
     * @param {string} x Left key. 
     * @param {string} y Right key.
     * 
     * @returns {boolean} True when left key greater than or equals right key. False otherwise. 
     */
    public gte(x: string, y: string): boolean 
    {
        return x.toLowerCase() >= y.toLowerCase();
    }

    /**
     * Checks if left key lower than right key.
     * 
     * @param {string} x Left key. 
     * @param {string} y Right key.
     * 
     * @returns {boolean} True when left key lower than right key. False otherwise. 
     */
    public lt(x: string, y: string): boolean
    {
        return x.toLowerCase() < y.toLowerCase();
    }
    
    /**
     * Checks if left key lower than or equals right key.
     * 
     * @param {string} x Left key. 
     * @param {string} y Right key.
     * 
     * @returns {boolean} True when left key lower than or equals right key. False otherwise. 
     */
    public lte(x: string, y: string): boolean
    {
        return x.toLowerCase() <= y.toLowerCase();
    }
}
