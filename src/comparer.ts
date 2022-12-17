import { Key } from './key';

/**
 * Key comparer interface used for enumerations. User might implement
 * custom key comparer if he wants to.
 * 
 * @type {Comparer<TKey>}
 */
export interface Comparer<TKey extends Key>
{
    /**
     * Checks if left key equals right key.
     * 
     * @param {TKey} x Left key. 
     * @param {TKey} y Right key.
     * 
     * @returns {boolean} True when left key equals right key. False otherwise. 
     */
    eq(x: TKey, y: TKey): boolean;

    /**
     * Checks if left key not equals right key.
     * 
     * @param {TKey} x Left key. 
     * @param {TKey} y Right key.
     * 
     * @returns {boolean} True when left key not equals right key. False otherwise. 
     */
    neq(x: TKey, y: TKey): boolean;

    /**
     * Checks if left key greater than right key.
     * 
     * @param {TKey} x Left key. 
     * @param {TKey} y Right key.
     * 
     * @returns {boolean} True when left key greater than right key. False otherwise. 
     */
    gt(x: TKey, y: TKey): boolean;

    /**
     * Checks if left key greater than or equals right key.
     * 
     * @param {TKey} x Left key. 
     * @param {TKey} y Right key.
     * 
     * @returns {boolean} True when left key greater than or equals right key. False otherwise. 
     */
    gte(x: TKey, y: TKey): boolean;

    /**
     * Checks if left key lower than right key.
     * 
     * @param {TKey} x Left key. 
     * @param {TKey} y Right key.
     * 
     * @returns {boolean} True when left key lower than right key. False otherwise. 
     */
    lt(x: TKey, y: TKey): boolean;

    /**
     * Checks if left key lower than or equals right key.
     * 
     * @param {TKey} x Left key. 
     * @param {TKey} y Right key.
     * 
     * @returns {boolean} True when left key lower than or equals right key. False otherwise. 
     */
    lte(x: TKey, y: TKey): boolean;
}
