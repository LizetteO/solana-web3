import { Base58EncodedAddress } from '@solana/keys';
import {
    Base58EncodedBytes,
    Base58EncodedDataResponse,
    Base64EncodedDataResponse,
    Commitment,
    LamportsUnsafeBeyond2Pow53Minus1,
    Slot,
    TransactionVersion,
    U64UnsafeBeyond2Pow53Minus1,
} from './common';
import { TransactionError } from '../transaction-error';
import { Blockhash } from '../blockhash';
import { UnixTimestamp } from '../unix-timestamp';

type TokenBalance = Readonly<{
    /** Index of the account in which the token balance is provided for. */
    accountIndex: number;
    /** Pubkey of the token's mint. */
    mint: Base58EncodedAddress;
    /** Pubkey of token balance's owner. */
    owner?: Base58EncodedAddress;
    /** Pubkey of the Token program that owns the account. */
    programId?: Base58EncodedAddress;
    uiTokenAmount: {
        /** Raw amount of tokens as a string, ignoring decimals. */
        amount: string;
        /** Number of decimals configured for token's mint. */
        decimals: number;
        /**
         * Token amount as a float, accounting for decimals.
         * @deprecated
         */
        uiAmount: number | null;
        /** Token amount as a string, accounting for decimals. */
        uiAmountString: string;
    };
}>;

type TransactionRewardBase = Readonly<{
    /** The public key of the account that received the reward */
    pubkey: Base58EncodedAddress;
    /** number of reward lamports credited or debited by the account */
    lamports: LamportsUnsafeBeyond2Pow53Minus1;
    /** account balance in lamports after the reward was applied */
    postBalance: LamportsUnsafeBeyond2Pow53Minus1;
}>;

type TransactionRewardWithoutCommission = TransactionRewardBase &
    Readonly<{
        /** type of reward */
        rewardType: 'fee' | 'rent';
    }>;

/** Commission is present only for voting and staking rewards */
type TransactionRewardWithCommission = TransactionRewardBase &
    Readonly<{
        /** type of reward */
        rewardType: 'voting' | 'staking';
        /** vote account commission when the reward was credited */
        commission: number;
    }>;

type TransactionReward = TransactionRewardWithoutCommission | TransactionRewardWithCommission;

/** @deprecated */
type TransactionStatus = { Ok: null } | { Err: TransactionError };

type ReturnData = {
    /** the program that generated the return data */
    programId: Base58EncodedAddress;
    /** the return data itself */
    data: Base64EncodedDataResponse;
};

type TransactionMetaBase = Readonly<{
    /** Error if transaction failed, null if transaction succeeded. */
    err: TransactionError | null;
    /** fee this transaction was charged */
    fee: LamportsUnsafeBeyond2Pow53Minus1;
    /** array of account balances from before the transaction was processed */
    preBalances: readonly LamportsUnsafeBeyond2Pow53Minus1[];
    /** array of account balances after the transaction was processed */
    postBalances: readonly LamportsUnsafeBeyond2Pow53Minus1[];
    /** List of token balances from before the transaction was processed or omitted if token balance recording was not yet enabled during this transaction */
    preTokenBalances?: readonly TokenBalance[];
    /** List of token balances from after the transaction was processed or omitted if token balance recording was not yet enabled during this transaction */
    postTokenBalances?: readonly TokenBalance[];
    /** array of string log messages or null if log message recording was not enabled during this transaction */
    logMessages: readonly string[] | null;
    /** transaction-level rewards */
    rewards: readonly TransactionReward[] | null;
    /**
     * Transaction status
     * @deprecated
     */
    status: TransactionStatus;
    /** the most-recent return data generated by an instruction in the transaction */
    returnData?: ReturnData;
    /** number of compute units consumed by the transaction */
    computeUnitsConsumed?: U64UnsafeBeyond2Pow53Minus1;
}>;

type AddressTableLookup = Readonly<{
    /** public key for an address lookup table account. */
    accountKey: Base58EncodedAddress;
    /** List of indices used to load addresses of writable accounts from a lookup table. */
    writableIndexes: readonly number[];
    /** List of indices used to load addresses of readonly accounts from a lookup table. */
    readableIndexes: readonly number[];
}>;

type TransactionBase = Readonly<{
    message: {
        recentBlockhash: Blockhash;
    };
    signatures: readonly Base58EncodedBytes[];
}>;

type TransactionInstruction = Readonly<{
    programIdIndex: number;
    accounts: readonly number[];
    data: Base58EncodedBytes;
}>;

type TransactionJson = TransactionBase &
    Readonly<{
        message: {
            accountKeys: readonly Base58EncodedAddress[];
            header: {
                numReadonlySignedAccounts: number;
                numReadonlyUnsignedAccounts: number;
                numRequiredSignatures: number;
            };
            instructions: readonly TransactionInstruction[];
        };
    }>;

type PartiallyDecodedTransactionInstruction = Readonly<{
    accounts: readonly Base58EncodedAddress[];
    data: Base58EncodedBytes;
    programId: Base58EncodedAddress;
}>;

type ParsedTransactionInstruction = Readonly<{
    parsed: {
        type: string;
        info: object;
    };
    program: string;
    programId: Base58EncodedAddress;
}>;

type TransactionJsonParsed = TransactionJson &
    Readonly<{
        message: {
            accountKeys: [
                {
                    pubkey: Base58EncodedAddress;
                    signer: boolean;
                    source: string;
                    writable: boolean;
                }
            ];
            instructions: readonly (ParsedTransactionInstruction | PartiallyDecodedTransactionInstruction)[];
        };
    }>;

type GetTransactionCommonConfig<TMaxSupportedTransactionVersion> = Readonly<{
    commitment?: Commitment;
    maxSupportedTransactionVersion?: TMaxSupportedTransactionVersion;
}>;

type GetTransactionApiResponseBase = Readonly<{
    /** the slot this transaction was processed in */
    slot: Slot;
    /** estimated production time of when the transaction was processed. null if not available */
    blockTime: UnixTimestamp | null;
}>;

type TransactionMetaLoadedAddresses = Readonly<{
    loadedAddresses: {
        writable: readonly Base58EncodedAddress[];
        readonly: readonly Base58EncodedAddress[];
    };
}>;

type InnerInstructions<TInstructionType> = Readonly<{
    index: number;
    instructions: readonly TInstructionType[];
}>;

type TransactionMetaInnerInstructionsNotParsed = Readonly<{
    innerInstructions: readonly InnerInstructions<TransactionInstruction>[];
}>;

type TransactionMetaInnerInstructionsParsed = Readonly<{
    innerInstructions: readonly InnerInstructions<
        PartiallyDecodedTransactionInstruction | ParsedTransactionInstruction
    >[];
}>;

type TransactionAddressTableLookups = Readonly<{
    message: Readonly<{
        addressTableLookups?: readonly AddressTableLookup[] | null;
    }>;
}>;

export interface GetTransactionApi {
    /**
     * Returns transaction details for a confirmed transaction
     */
    getTransaction<TMaxSupportedTransactionVersion extends TransactionVersion | void = void>(
        address: Base58EncodedAddress,
        config: GetTransactionCommonConfig<TMaxSupportedTransactionVersion> &
            Readonly<{
                encoding: 'jsonParsed';
            }>
    ):
        | (GetTransactionApiResponseBase &
              (TMaxSupportedTransactionVersion extends void
                  ? Record<string, never>
                  : { version: TransactionVersion }) & {
                  meta: (TransactionMetaBase & TransactionMetaInnerInstructionsParsed) | null;
                  transaction: TransactionJsonParsed & TransactionAddressTableLookups;
              })
        | null;
    getTransaction<TMaxSupportedTransactionVersion extends TransactionVersion | void = void>(
        address: Base58EncodedAddress,
        config: GetTransactionCommonConfig<TMaxSupportedTransactionVersion> &
            Readonly<{
                encoding: 'base64';
            }>
    ):
        | (GetTransactionApiResponseBase &
              (TMaxSupportedTransactionVersion extends void
                  ? Record<string, never>
                  : { version: TransactionVersion }) & {
                  meta:
                      | (TransactionMetaBase &
                            TransactionMetaInnerInstructionsNotParsed &
                            (TMaxSupportedTransactionVersion extends void
                                ? Record<string, never>
                                : TransactionMetaLoadedAddresses))
                      | null;
                  transaction: Base64EncodedDataResponse;
              })
        | null;
    getTransaction<TMaxSupportedTransactionVersion extends TransactionVersion | void = void>(
        address: Base58EncodedAddress,
        config: GetTransactionCommonConfig<TMaxSupportedTransactionVersion> &
            Readonly<{
                encoding: 'base58';
            }>
    ):
        | (GetTransactionApiResponseBase &
              (TMaxSupportedTransactionVersion extends void
                  ? Record<string, never>
                  : { version: TransactionVersion }) & {
                  meta:
                      | (TransactionMetaBase &
                            TransactionMetaInnerInstructionsNotParsed &
                            (TMaxSupportedTransactionVersion extends void
                                ? Record<string, never>
                                : TransactionMetaLoadedAddresses))
                      | null;
                  transaction: Base58EncodedDataResponse;
              })
        | null;
    getTransaction<TMaxSupportedTransactionVersion extends TransactionVersion | void = void>(
        address: Base58EncodedAddress,
        config?: GetTransactionCommonConfig<TMaxSupportedTransactionVersion> &
            Readonly<{
                encoding?: 'json';
            }>
    ):
        | (GetTransactionApiResponseBase &
              (TMaxSupportedTransactionVersion extends void
                  ? Record<string, never>
                  : { version: TransactionVersion }) & {
                  meta:
                      | (TransactionMetaBase &
                            TransactionMetaInnerInstructionsNotParsed &
                            (TMaxSupportedTransactionVersion extends void
                                ? Record<string, never>
                                : TransactionMetaLoadedAddresses))
                      | null;
                  transaction: TransactionJson & TransactionAddressTableLookups;
              })
        | null;
}
