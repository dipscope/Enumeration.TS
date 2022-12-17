import { Enumeration } from './enumeration';
import { Key } from './key';

/**
 * Represents an enumeration resolver.
 * 
 * @type {EnumerationResolver<TEnumeration>}
 */
export type EnumerationResolver<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>
    = () => TEnumeration;
