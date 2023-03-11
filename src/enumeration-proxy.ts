import { Enumeration } from './enumeration';
import { EnumerationResolver } from './enumeration-resolver';
import { isNil } from './functions/is-nil';
import { Key } from './key';

/**
 * Proxy to resolve enumeration at a later time.
 * 
 * @type {EnumerationProxy<TEnumeration, TKey>}
 */
export class EnumerationProxy<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>
{
    /**
     * Enumeration resolver attached to a proxy.
     * 
     * @type {EnumerationResolver<TEnumeration, TKey>}
     */
    private enumerationResolver: EnumerationResolver<TEnumeration, TKey>;

    /**
     * Resolved value behind a proxy.
     * 
     * @type {TEnumeration}
     */
    private enumeration?: TEnumeration;

    /**
     * Constructor.
     * 
     * @param {EnumerationResolver<TEnumeration, TKey>} enumerationResolver Enumeration resolver.
     */
    public constructor(enumerationResolver: EnumerationResolver<TEnumeration, TKey>)
    {
        this.enumerationResolver = enumerationResolver;

        return;
    }

    /**
     * Resolves enumeration behind a proxy.
     * 
     * @returns {TEnumeration} Resolved enumeration.
     */
    public resolveEnumeration(): TEnumeration
    {
        let enumeration = this.enumeration;

        if (isNil(enumeration))
        {
            enumeration = this.enumerationResolver();

            this.enumeration = enumeration;
        }
        
        return enumeration;
    }
}
