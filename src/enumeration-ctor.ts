import { Key } from './key';
import { Enumeration } from './enumeration';

/**
 * Enumeration constructor function.
 * 
 * @type {EnumerationCtor<TEnumeration, TKey>}
 */
export type EnumerationCtor<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>
    = abstract new (key: TKey, ...args: Array<any>) => TEnumeration;
