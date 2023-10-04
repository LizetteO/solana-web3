import { Base64EncodedWireTransaction } from 'types';

import { getTransactionEncoder } from './serializers/transaction';

export function getBase64EncodedWireTransaction(
    transaction: Parameters<ReturnType<typeof getTransactionEncoder>['serialize']>[0]
): Base64EncodedWireTransaction {
    const wireTransactionBytes = getTransactionEncoder().serialize(transaction);
    if (__NODEJS__) {
        return Buffer.from(wireTransactionBytes).toString('base64') as Base64EncodedWireTransaction;
    } else {
        return (btoa as Window['btoa'])(String.fromCharCode(...wireTransactionBytes)) as Base64EncodedWireTransaction;
    }
}
