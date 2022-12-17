import { Enumeration } from '../enumeration';
import { EnumerationProxy } from '../enumeration-proxy';
import { EnumerationProxyHandler } from '../enumeration-proxy-handler';
import { EnumerationResolver } from '../enumeration-resolver';
import { Key } from '../key';

/**
 * Provides a way for defer enumeration initialization. Used for creation of 
 * polymorphic enums.
 * 
 * @param {EnumerationResolver<TEnumeration, TKey>} enumerationResolver Enumeration resolver.
 *  
 * @returns {TEnumeration} Defered enumeration.
 */
export function defer<TEnumeration extends Enumeration<TEnumeration, TKey>, TKey extends Key>(
    enumerationResolver: EnumerationResolver<TEnumeration, TKey>
): TEnumeration
{
    const enumerationProxy = new EnumerationProxy(enumerationResolver);
    const enumerationProxyHandler = new EnumerationProxyHandler<TEnumeration, TKey>();
    const enumeration = new Proxy<any>(enumerationProxy, enumerationProxyHandler);

    return enumeration;
}
