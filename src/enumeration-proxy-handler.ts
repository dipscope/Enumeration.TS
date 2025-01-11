import { Enumeration } from './enumeration';
import { EnumerationProxy } from './enumeration-proxy';
import { ENUMERATION_SYMBOL } from './enumeration-symbol';
import { Key } from './key';

/**
 * Enumeration proxy handler. Used for polymorphic enumerations with 
 * defer initialization.
 * 
 * @type {EnumerationProxyHandler<TEnumeration>}
 */
export class EnumerationProxyHandler<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key> 
    implements ProxyHandler<EnumerationProxy<TEnumeration, TKey>>
{
    /**
     * Gets the value of a certain property.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {any} Any value.
     */
    public get(enumerationProxy: EnumerationProxy<TEnumeration, TKey>, propertyKey: PropertyKey): any
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;
        const value = propertyKey === ENUMERATION_SYMBOL ? enumeration : enumeration[propertyKey];

        return value;
    }

    /**
     * A trap for get own property descriptor method.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {PropertyDescriptor|undefined} Property descriptor or undefined.
     */
    public getOwnPropertyDescriptor(enumerationProxy: EnumerationProxy<TEnumeration, TKey>, propertyKey: PropertyKey): PropertyDescriptor | undefined
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;
        const ownPropertyDescriptor = Object.getOwnPropertyDescriptor(enumeration, propertyKey);

        return ownPropertyDescriptor;
    }

    /**
     * A trap for get prototype of method.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * 
     * @returns {any} Any value.
     */
    public getPrototypeOf(enumerationProxy: EnumerationProxy<TEnumeration, TKey>): any
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;
        const prototype = Object.getPrototypeOf(enumeration);

        return prototype;
    }

    /**
     * A trap for the in operator.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * @param {PropertyKey} propertyKey Property key.
     * 
     * @returns {boolean} True when property key in object. False otherwise.
     */
    public has(enumerationProxy: EnumerationProxy<TEnumeration, TKey>, propertyKey: PropertyKey): boolean
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;
        const has = propertyKey in enumeration;

        return has;
    }

    /**
     * A trap for own keys.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * 
     * @returns {ArrayLike<string|symbol>} Own keys.
     */
    public ownKeys(enumerationProxy: EnumerationProxy<TEnumeration, TKey>): ArrayLike<string | symbol>
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;
        const ownKeys = Object.keys(enumeration);

        return ownKeys;
    }

    /**
     * Sets the value of a certain property.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * @param {PropertyKey} propertyKey Property key.
     * @param {any} value Anu value.
     * 
     * @returns {boolean} Result whether or not the property was set.
     */
    public set(enumerationProxy: EnumerationProxy<TEnumeration, TKey>, propertyKey: PropertyKey, value: any): boolean
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;

        enumeration[propertyKey] = value;
        
        return true;
    }

    /**
     * A trap for set prototype of.
     * 
     * @param {EnumerationProxy<TEnumeration, TKey>} enumerationProxy Enumeration proxy.
     * @param {any} newPrototype The new prototype.
     * 
     * @returns {boolean} True if prototype is set. False otherwise.
     */
    public setPrototypeOf(enumerationProxy: EnumerationProxy<TEnumeration, TKey>, newPrototype: any): boolean
    {
        const enumeration = enumerationProxy.resolveEnumeration() as any;
        const result = Object.setPrototypeOf(enumeration, newPrototype);

        return result;
    }
}
