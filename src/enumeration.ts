import { Comparer } from './comparer';
import { NumberComparer } from './comparers/number-comparer';
import { StringComparer } from './comparers/string-comparer';
import { EnumerationCtor } from './enumeration-ctor';
import { ENUMERATION_SYMBOL } from './enumeration-symbol';
import { Key } from './key';

/**
 * Class representing an implementation of enumeration pattern.
 * 
 * @type {Enumeration<TEnumeration, TKey>}
 */
export abstract class Enumeration<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>
{
    /**
     * Static number comparer.
     * 
     * @type {NumberComparer}
     */
    private static readonly numberComparer: NumberComparer = new NumberComparer();

    /**
     * Static string comparer.
     * 
     * @type {StringComparer}
     */
    private static readonly stringComparer: StringComparer = new StringComparer();
    
    /**
     * Iterator of enumeration items.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * 
     * @returns {IterableIterator<TEnumeration>} Iterator of enumeration items.
     */
    public static [Symbol.iterator]<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>
    ): IterableIterator<TEnumeration>
    {
        const enumeration = Enumeration.enumerate(this);
        const values = enumeration.values();

        return values;
    }

    /**
     * Gets enumeration item by key.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * @param {any} key Any enumeration key.
     * 
     * @returns {TEnumeration|undefined} Enumeration item or undefined if it is not found.
     */
    public static get<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>,
        key: any
    ): TEnumeration | undefined
    {
        const enumeration = Enumeration.enumerate(this);
        const value = enumeration.get(key);

        return value;
    }

    /**
     * Checks if enumeration has item with specified key.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * @param {any} key Any enumeration key.
     * 
     * @returns {boolean} True when enumeration has item with specified key. False otherwise.
     */
    public static has<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>,
        key: any
    ): boolean
    {
        const enumeration = Enumeration.enumerate(this);
        const has = enumeration.has(key);

        return has;
    }

    /**
     * Gets all available keys of this enumeration.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * 
     * @returns {IterableIterator<TKey>} Iterator of enumeration keys.
     */
    public static keys<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>
    ): IterableIterator<TKey>
    {
        const enumeration = Enumeration.enumerate(this);
        const keys = enumeration.keys();

        return keys;
    }

    /**
     * Gets all available values of this enumeration.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * 
     * @returns {IterableIterator<TEnumeration>} Iterator of enumeration items.
     */
    public static values<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>
    ): IterableIterator<TEnumeration>
    {
        const enumeration = Enumeration.enumerate(this);
        const values = enumeration.values();

        return values;
    }

    /**
     * Gets all entries within current enumeration.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * 
     * @returns {IterableIterator<[TKey, TEnumeration]>} Iterator of enumeration entries.
     */
    public static entries<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>
    ): IterableIterator<[TKey, TEnumeration]>
    {
        const enumeration = Enumeration.enumerate(this);
        const entries = enumeration.entries();

        return entries;
    }

    /**
     * Gets a map for current enumeration.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} this Enumeration constructor of a certain type.
     * 
     * @returns {Map<TKey, TEnumeration>} Map of enumeration entries.
     */
    public static map<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        this: EnumerationCtor<TEnumeration, TKey>
    ): Map<TKey, TEnumeration>
    {
        const enumeration = Enumeration.enumerate(this);

        return enumeration;
    }
    
    /**
     * Enumerates items.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} enumerationCtor Enumeration constructor to enumerate items for.
     * 
     * @returns {Map<TKey, TEnumeration>} Map of enumeration items.
     */
    private static enumerate<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        enumerationCtor: EnumerationCtor<TEnumeration, TKey>
    ): Map<TKey, TEnumeration>
    {
        let entries = enumerationCtor.prototype[ENUMERATION_SYMBOL] as Map<TKey, TEnumeration>;

        if (entries === undefined || entries === null)
        {
            entries = Enumeration.collect(enumerationCtor);

            Object.defineProperty(enumerationCtor.prototype, ENUMERATION_SYMBOL, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: entries
            });
        }

        return entries;
    }

    /**
     * Collects enumeration items from property definitions.
     * 
     * @param {EnumerationCtor<TEnumeration, TKey>} enumerationCtor Enumeration constructor to collect items for.
     * 
     * @returns {Map<TKey, TEnumeration>} Map of enumeration items.
     */
    private static collect<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
        enumerationCtor: EnumerationCtor<TEnumeration, TKey>
    ): Map<TKey, TEnumeration>
    {
        const enumerations = new Array<TEnumeration>();
        const entries = Object.entries(enumerationCtor);

        for (let i = 0; i < entries.length; i++)
        {
            const value = entries[i][1];

            if (value === undefined || value === null)
            {
                continue;
            }

            if (value instanceof enumerationCtor)
            {
                enumerations.push(value);

                continue;
            }

            if (typeof value === 'object' && value[ENUMERATION_SYMBOL] instanceof enumerationCtor)
            {
                enumerations.push(value);

                continue;
            }
        }

        enumerations.sort((x, y) => 
        {
            if (x.lt(y)) 
            {
                return -1;
            }

            if (x.gt(y)) 
            {
                return 1;
            }

            return 0;
        });

        const map = new Map<TKey, TEnumeration>();

        for (let i = 0; i < enumerations.length; i++)
        {
            map.set(enumerations[i].key, enumerations[i]);
        }

        return map;
    }

    /**
     * Defines comparer for a key.
     * 
     * @param {TKey} key Key.
     * 
     * @returns {Comparer<Key>} Concrete comparer for a key.
     */
    private static defineComparer<TKey extends Key>(key: TKey): Comparer<Key>
    {
        const comparer = typeof key === 'number' ? this.numberComparer : this.stringComparer;

        return comparer;
    }

    /**
     * Enumeration key which can be string or number.
     * 
     * @type {TKey}
     */
    public readonly key: TKey;

    /**
     * Enumeration comparer.
     * 
     * @type {Comparer<TKey>}
     */
    public readonly comparer: Comparer<TKey>;

    /**
     * Constructor.
     * 
     * @param {TKey} key Enumeration key which can be string or number.
     * @param {Comparer<TKey>} comparer Enumeration comparer.
     */
    public constructor(key: TKey, comparer: Comparer<TKey> = Enumeration.defineComparer(key))
    {
        this.key = key;
        this.comparer = comparer;

        return;
    }

    /**
     * Checks if current enumeration equals another.
     * 
     * @param {TEnumeration} enumeration Another enumeration.
     * 
     * @returns {boolean} True when current enumeration equals another enumeration. False otherwise. 
     */
    public eq(enumeration: TEnumeration): boolean 
    {
        return this.comparer.eq(this.key, enumeration.key);
    }

    /**
     * Checks if current enumeration not equals another.
     * 
     * @param {TEnumeration} enumeration Another enumeration.
     * 
     * @returns {boolean} True when current enumeration not equals another enumeration. False otherwise. 
     */
    public neq(enumeration: TEnumeration): boolean 
    {
        return this.comparer.neq(this.key, enumeration.key);
    }

    /**
     * Checks if current enumeration greater than another.
     * 
     * @param {TEnumeration} enumeration Another enumeration.
     * 
     * @returns {boolean} True when current enumeration greater than another enumeration. False otherwise. 
     */
    public gt(enumeration: TEnumeration): boolean 
    {
        return this.comparer.gt(this.key, enumeration.key);
    }

    /**
     * Checks if current enumeration greater than or equals another.
     * 
     * @param {TEnumeration} enumeration Another enumeration.
     * 
     * @returns {boolean} True when current enumeration greater than or equals another enumeration. False otherwise. 
     */
    public gte(enumeration: TEnumeration): boolean 
    {
        return this.comparer.gte(this.key, enumeration.key);
    }

    /**
     * Checks if current enumeration lower than another.
     * 
     * @param {TEnumeration} enumeration Another enumeration.
     * 
     * @returns {boolean} True when current enumeration lower than another enumeration. False otherwise. 
     */
    public lt(enumeration: TEnumeration): boolean 
    {
        return this.comparer.lt(this.key, enumeration.key);
    }

    /**
     * Checks if current enumeration lower than or equals another.
     * 
     * @param {TEnumeration} enumeration Another enumeration.
     * 
     * @returns {boolean} True when current enumeration lower than or equals another enumeration. False otherwise. 
     */
    public lte(enumeration: TEnumeration): boolean 
    {
        return this.comparer.lte(this.key, enumeration.key);
    }
    
    /**
     * Returns the primitive value of enumeration.
     * 
     * @returns {TKey} Enumeration key.
     */
    public valueOf(): TKey
    {
        return this.key;
    }
    
    /**
     * Converts enumeration to string.
     * 
     * @returns {string} String representation of enumeration. 
     */
    public toString(): string 
    {
        return this.key.toString();
    }
}
