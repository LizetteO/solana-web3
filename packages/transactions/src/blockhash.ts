import { base58 } from '@metaplex-foundation/umi-serializers';

import { IDurableNonceTransaction } from './durable-nonce';
import { ITransactionWithSignatures } from './signatures';
import { BaseTransaction } from './types';

export type Blockhash = string & { readonly __blockhash: unique symbol };

type BlockhashLifetimeConstraint = Readonly<{
    blockhash: Blockhash;
    lastValidBlockHeight: bigint;
}>;

export interface ITransactionWithBlockhashLifetime {
    readonly lifetimeConstraint: BlockhashLifetimeConstraint;
}

export function assertIsBlockhash(putativeBlockhash: string): asserts putativeBlockhash is Blockhash {
    try {
        // Fast-path; see if the input string is of an acceptable length.
        if (
            // Lowest value (32 bytes of zeroes)
            putativeBlockhash.length < 32 ||
            // Highest value (32 bytes of 255)
            putativeBlockhash.length > 44
        ) {
            throw new Error('Expected input string to decode to a byte array of length 32.');
        }
        // Slow-path; actually attempt to decode the input string.
        const bytes = base58.serialize(putativeBlockhash);
        const numBytes = bytes.byteLength;
        if (numBytes !== 32) {
            throw new Error(`Expected input string to decode to a byte array of length 32. Actual length: ${numBytes}`);
        }
    } catch (e) {
        throw new Error(`\`${putativeBlockhash}\` is not a blockhash`, {
            cause: e,
        });
    }
}

export function setTransactionLifetimeUsingBlockhash<TTransaction extends BaseTransaction & IDurableNonceTransaction>(
    blockhashLifetimeConstraint: BlockhashLifetimeConstraint,
    transaction: TTransaction | (TTransaction & ITransactionWithSignatures)
): Omit<TTransaction, keyof ITransactionWithSignatures | 'lifetimeConstraint'> & ITransactionWithBlockhashLifetime;
export function setTransactionLifetimeUsingBlockhash<
    TTransaction extends BaseTransaction | (BaseTransaction & ITransactionWithBlockhashLifetime)
>(
    blockhashLifetimeConstraint: BlockhashLifetimeConstraint,
    transaction: TTransaction | (TTransaction & ITransactionWithSignatures)
): Omit<TTransaction, keyof ITransactionWithSignatures> & ITransactionWithBlockhashLifetime;
export function setTransactionLifetimeUsingBlockhash(
    blockhashLifetimeConstraint: BlockhashLifetimeConstraint,
    transaction: BaseTransaction | (BaseTransaction & ITransactionWithBlockhashLifetime)
) {
    if (
        'lifetimeConstraint' in transaction &&
        transaction.lifetimeConstraint.blockhash === blockhashLifetimeConstraint.blockhash &&
        transaction.lifetimeConstraint.lastValidBlockHeight === blockhashLifetimeConstraint.lastValidBlockHeight
    ) {
        return transaction;
    }
    let out;
    if ('signatures' in transaction) {
        // The implication of the lifetime constraint changing is that any existing signatures are invalid.
        const {
            signatures: _, // eslint-disable-line @typescript-eslint/no-unused-vars
            ...unsignedTransaction
        } = transaction;
        out = {
            ...unsignedTransaction,
            lifetimeConstraint: blockhashLifetimeConstraint,
        };
    } else {
        out = {
            ...transaction,
            lifetimeConstraint: blockhashLifetimeConstraint,
        };
    }
    Object.freeze(out);
    return out;
}
