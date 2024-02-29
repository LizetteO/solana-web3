import {
    SOLANA_ERROR__ACCOUNT_NOT_FOUND,
    SOLANA_ERROR__ADDRESS_BYTE_LENGTH_OUT_OF_RANGE,
    SOLANA_ERROR__ADDRESS_STRING_LENGTH_OUT_OF_RANGE,
    SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED,
    SOLANA_ERROR__CODECS_CANNOT_DECODE_EMPTY_BYTE_ARRAY,
    SOLANA_ERROR__CODECS_CODEC_REQUIRES_FIXED_SIZE,
    SOLANA_ERROR__CODECS_ENUM_DISCRIMINATOR_OUT_OF_RANGE,
    SOLANA_ERROR__CODECS_FIXED_SIZE_ENCODER_DECODER_SIZE_MISMATCH,
    SOLANA_ERROR__CODECS_INVALID_DATA_ENUM_VARIANT,
    SOLANA_ERROR__CODECS_INVALID_SCALAR_ENUM_VARIANT,
    SOLANA_ERROR__CODECS_INVALID_STRING_FOR_BASE,
    SOLANA_ERROR__CODECS_NUMBER_OUT_OF_RANGE,
    SOLANA_ERROR__CODECS_VARIABLE_SIZE_ENCODER_DECODER_MAX_SIZE_MISMATCH,
    SOLANA_ERROR__CODECS_WRONG_NUMBER_OF_BYTES,
    SOLANA_ERROR__CODECS_WRONG_NUMBER_OF_ITEMS,
    SOLANA_ERROR__EXPECTED_DECODED_ACCOUNT,
    SOLANA_ERROR__FAILED_TO_DECODE_ACCOUNT,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_ALREADY_INITIALIZED,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_BORROW_FAILED,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_BORROW_OUTSTANDING,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_DATA_SIZE_CHANGED,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_DATA_TOO_SMALL,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_NOT_EXECUTABLE,
    SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_NOT_RENT_EXEMPT,
    SOLANA_ERROR__INSTRUCTION_ERROR_ARITHMETIC_OVERFLOW,
    SOLANA_ERROR__INSTRUCTION_ERROR_BORSH_IO_ERROR,
    SOLANA_ERROR__INSTRUCTION_ERROR_BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS,
    SOLANA_ERROR__INSTRUCTION_ERROR_CALL_DEPTH,
    SOLANA_ERROR__INSTRUCTION_ERROR_COMPUTATIONAL_BUDGET_EXCEEDED,
    SOLANA_ERROR__INSTRUCTION_ERROR_CUSTOM,
    SOLANA_ERROR__INSTRUCTION_ERROR_DUPLICATE_ACCOUNT_INDEX,
    SOLANA_ERROR__INSTRUCTION_ERROR_DUPLICATE_ACCOUNT_OUT_OF_SYNC,
    SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT,
    SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_DATA_MODIFIED,
    SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_LAMPORT_CHANGE,
    SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_MODIFIED,
    SOLANA_ERROR__INSTRUCTION_ERROR_EXTERNAL_ACCOUNT_DATA_MODIFIED,
    SOLANA_ERROR__INSTRUCTION_ERROR_EXTERNAL_ACCOUNT_LAMPORT_SPEND,
    SOLANA_ERROR__INSTRUCTION_ERROR_GENERIC_ERROR,
    SOLANA_ERROR__INSTRUCTION_ERROR_ILLEGAL_OWNER,
    SOLANA_ERROR__INSTRUCTION_ERROR_IMMUTABLE,
    SOLANA_ERROR__INSTRUCTION_ERROR_INCORRECT_AUTHORITY,
    SOLANA_ERROR__INSTRUCTION_ERROR_INCORRECT_PROGRAM_ID,
    SOLANA_ERROR__INSTRUCTION_ERROR_INSUFFICIENT_FUNDS,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ACCOUNT_DATA,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ACCOUNT_OWNER,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ARGUMENT,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ERROR,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_INSTRUCTION_DATA,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_REALLOC,
    SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_SEEDS,
    SOLANA_ERROR__INSTRUCTION_ERROR_MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED,
    SOLANA_ERROR__INSTRUCTION_ERROR_MAX_ACCOUNTS_EXCEEDED,
    SOLANA_ERROR__INSTRUCTION_ERROR_MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED,
    SOLANA_ERROR__INSTRUCTION_ERROR_MAX_SEED_LENGTH_EXCEEDED,
    SOLANA_ERROR__INSTRUCTION_ERROR_MISSING_ACCOUNT,
    SOLANA_ERROR__INSTRUCTION_ERROR_MISSING_REQUIRED_SIGNATURE,
    SOLANA_ERROR__INSTRUCTION_ERROR_MODIFIED_PROGRAM_ID,
    SOLANA_ERROR__INSTRUCTION_ERROR_NOT_ENOUGH_ACCOUNT_KEYS,
    SOLANA_ERROR__INSTRUCTION_ERROR_PRIVILEGE_ESCALATION,
    SOLANA_ERROR__INSTRUCTION_ERROR_PROGRAM_ENVIRONMENT_SETUP_FAILURE,
    SOLANA_ERROR__INSTRUCTION_ERROR_PROGRAM_FAILED_TO_COMPILE,
    SOLANA_ERROR__INSTRUCTION_ERROR_PROGRAM_FAILED_TO_COMPLETE,
    SOLANA_ERROR__INSTRUCTION_ERROR_READONLY_DATA_MODIFIED,
    SOLANA_ERROR__INSTRUCTION_ERROR_READONLY_LAMPORT_CHANGE,
    SOLANA_ERROR__INSTRUCTION_ERROR_REENTRANCY_NOT_ALLOWED,
    SOLANA_ERROR__INSTRUCTION_ERROR_RENT_EPOCH_MODIFIED,
    SOLANA_ERROR__INSTRUCTION_ERROR_UNBALANCED_INSTRUCTION,
    SOLANA_ERROR__INSTRUCTION_ERROR_UNINITIALIZED_ACCOUNT,
    SOLANA_ERROR__INSTRUCTION_ERROR_UNKNOWN,
    SOLANA_ERROR__INSTRUCTION_ERROR_UNSUPPORTED_PROGRAM_ID,
    SOLANA_ERROR__INSTRUCTION_ERROR_UNSUPPORTED_SYSVAR,
    SOLANA_ERROR__INVALID_KEYPAIR_BYTES,
    SOLANA_ERROR__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED,
    SOLANA_ERROR__MAX_PDA_SEED_LENGTH_EXCEEDED,
    SOLANA_ERROR__MULTIPLE_ACCOUNTS_NOT_FOUND,
    SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND,
    SOLANA_ERROR__NONCE_INVALID,
    SOLANA_ERROR__NOT_A_BASE58_ENCODED_ADDRESS,
    SOLANA_ERROR__NOT_ALL_ACCOUNTS_DECODED,
    SOLANA_ERROR__PROGRAM_DERIVED_ADDRESS_BUMP_SEED_OUT_OF_RANGE,
    SOLANA_ERROR__RPC_INTEGER_OVERFLOW,
    SOLANA_ERROR__SIGNER_ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS,
    SOLANA_ERROR__SIGNER_EXPECTED_KEY_PAIR_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_MESSAGE_MODIFYING_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_MESSAGE_PARTIAL_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_MESSAGE_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_MODIFYING_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_PARTIAL_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_SENDING_SIGNER,
    SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_SIGNER,
    SOLANA_ERROR__TRANSACTION_ERROR_DUPLICATE_INSTRUCTION,
    SOLANA_ERROR__TRANSACTION_ERROR_INSUFFICIENT_FUNDS_FOR_RENT,
    SOLANA_ERROR__TRANSACTION_ERROR_PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED,
    SOLANA_ERROR__TRANSACTION_ERROR_UNKNOWN,
    SOLANA_ERROR__TRANSACTION_FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING,
    SOLANA_ERROR__TRANSACTION_FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE,
    SOLANA_ERROR__TRANSACTION_FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND,
    SOLANA_ERROR__TRANSACTION_INVOKED_PROGRAMS_CANNOT_PAY_FEES,
    SOLANA_ERROR__TRANSACTION_INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE,
    SOLANA_ERROR__TRANSACTION_MISSING_ADDRESS,
    SOLANA_ERROR__TRANSACTION_MISSING_SIGNATURES,
    SOLANA_ERROR__TRANSACTION_VERSION_NUMBER_OUT_OF_RANGE,
    SolanaErrorCode,
} from './codes';

type BasicInstructionErrorContext<T extends SolanaErrorCode> = Readonly<{ [P in T]: { index: number } }>;

type DefaultUnspecifiedErrorContextToUndefined<T> = {
    [P in SolanaErrorCode]: P extends keyof T ? T[P] : undefined;
};

/**
 * To add a new error, follow the instructions at
 * https://github.com/solana-labs/solana-web3.js/tree/master/packages/errors/#adding-a-new-error
 *
 * WARNING:
 *   - Don't change or remove members of an error's context.
 */
export type SolanaErrorContext = DefaultUnspecifiedErrorContextToUndefined<
    BasicInstructionErrorContext<
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_UNKNOWN
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_GENERIC_ERROR
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ARGUMENT
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_INSTRUCTION_DATA
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ACCOUNT_DATA
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_DATA_TOO_SMALL
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INSUFFICIENT_FUNDS
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INCORRECT_PROGRAM_ID
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MISSING_REQUIRED_SIGNATURE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_ALREADY_INITIALIZED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_UNINITIALIZED_ACCOUNT
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_UNBALANCED_INSTRUCTION
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MODIFIED_PROGRAM_ID
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_EXTERNAL_ACCOUNT_LAMPORT_SPEND
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_EXTERNAL_ACCOUNT_DATA_MODIFIED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_READONLY_LAMPORT_CHANGE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_READONLY_DATA_MODIFIED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_DUPLICATE_ACCOUNT_INDEX
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_MODIFIED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_RENT_EPOCH_MODIFIED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_NOT_ENOUGH_ACCOUNT_KEYS
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_DATA_SIZE_CHANGED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_NOT_EXECUTABLE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_BORROW_FAILED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_BORROW_OUTSTANDING
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_DUPLICATE_ACCOUNT_OUT_OF_SYNC
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_CUSTOM
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ERROR
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_DATA_MODIFIED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_LAMPORT_CHANGE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_UNSUPPORTED_PROGRAM_ID
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_CALL_DEPTH
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MISSING_ACCOUNT
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_REENTRANCY_NOT_ALLOWED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MAX_SEED_LENGTH_EXCEEDED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_SEEDS
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_REALLOC
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_COMPUTATIONAL_BUDGET_EXCEEDED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_PRIVILEGE_ESCALATION
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_PROGRAM_ENVIRONMENT_SETUP_FAILURE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_PROGRAM_FAILED_TO_COMPLETE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_PROGRAM_FAILED_TO_COMPILE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_IMMUTABLE
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INCORRECT_AUTHORITY
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_BORSH_IO_ERROR
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ACCOUNT_NOT_RENT_EXEMPT
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_INVALID_ACCOUNT_OWNER
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ARITHMETIC_OVERFLOW
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_UNSUPPORTED_SYSVAR
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_ILLEGAL_OWNER
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MAX_ACCOUNTS_EXCEEDED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED
        | typeof SOLANA_ERROR__INSTRUCTION_ERROR_BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS
    > & {
        [SOLANA_ERROR__ACCOUNT_NOT_FOUND]: {
            address: string;
        };
        [SOLANA_ERROR__ADDRESS_BYTE_LENGTH_OUT_OF_RANGE]: {
            actualLength: number;
        };
        [SOLANA_ERROR__ADDRESS_STRING_LENGTH_OUT_OF_RANGE]: {
            actualLength: number;
        };
        [SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED]: {
            currentBlockHeight: bigint;
            lastValidBlockHeight: bigint;
        };
        [SOLANA_ERROR__CODECS_CANNOT_DECODE_EMPTY_BYTE_ARRAY]: {
            codecDescription: string;
        };
        [SOLANA_ERROR__CODECS_CODEC_REQUIRES_FIXED_SIZE]: {
            codecDescription: string;
        };
        [SOLANA_ERROR__CODECS_ENUM_DISCRIMINATOR_OUT_OF_RANGE]: {
            discriminator: bigint | number;
            maxRange: number;
            minRange: number;
        };
        [SOLANA_ERROR__CODECS_FIXED_SIZE_ENCODER_DECODER_SIZE_MISMATCH]: {
            decoderFixedSize: number;
            encoderFixedSize: number;
        };
        [SOLANA_ERROR__CODECS_INVALID_DATA_ENUM_VARIANT]: {
            value: string;
            variants: string[];
        };
        [SOLANA_ERROR__CODECS_INVALID_SCALAR_ENUM_VARIANT]: {
            maxRange: number;
            minRange: number;
            value: number | string;
            variants: string[];
        };
        [SOLANA_ERROR__CODECS_INVALID_STRING_FOR_BASE]: {
            alphabet: string;
            base: number;
            value: string;
        };
        [SOLANA_ERROR__CODECS_NUMBER_OUT_OF_RANGE]: {
            codecDescription: string;
            max: bigint | number;
            min: bigint | number;
            value: bigint | number;
        };
        [SOLANA_ERROR__CODECS_VARIABLE_SIZE_ENCODER_DECODER_MAX_SIZE_MISMATCH]: {
            decoderMaxSize: number | undefined;
            encoderMaxSize: number | undefined;
        };
        [SOLANA_ERROR__CODECS_WRONG_NUMBER_OF_BYTES]: {
            bytesLength: number;
            codecDescription: string;
            expected: number;
        };
        [SOLANA_ERROR__CODECS_WRONG_NUMBER_OF_ITEMS]: {
            actual: bigint | number;
            codecDescription: string;
            expected: bigint | number;
        };
        [SOLANA_ERROR__EXPECTED_DECODED_ACCOUNT]: {
            address: string;
        };
        [SOLANA_ERROR__FAILED_TO_DECODE_ACCOUNT]: {
            address: string;
        };
        [SOLANA_ERROR__INSTRUCTION_ERROR_BORSH_IO_ERROR]: {
            encodedData: string;
            index: number;
        };
        [SOLANA_ERROR__INSTRUCTION_ERROR_CUSTOM]: {
            code: number;
            index: number;
        };
        [SOLANA_ERROR__INSTRUCTION_ERROR_UNKNOWN]: {
            errorName: string;
            index: number;
            instructionErrorContext?: unknown;
        };
        [SOLANA_ERROR__INVALID_KEYPAIR_BYTES]: {
            byteLength: number;
        };
        [SOLANA_ERROR__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED]: {
            actual: number;
            maxSeeds: number;
        };
        [SOLANA_ERROR__MAX_PDA_SEED_LENGTH_EXCEEDED]: {
            actual: number;
            index: number;
            maxSeedLength: number;
        };
        [SOLANA_ERROR__MULTIPLE_ACCOUNTS_NOT_FOUND]: {
            addresses: string[];
        };
        [SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND]: {
            nonceAccountAddress: string;
        };
        [SOLANA_ERROR__NONCE_INVALID]: {
            actualNonceValue: string;
            expectedNonceValue: string;
        };
        [SOLANA_ERROR__NOT_A_BASE58_ENCODED_ADDRESS]: {
            putativeAddress: string;
        };
        [SOLANA_ERROR__NOT_ALL_ACCOUNTS_DECODED]: {
            addresses: string[];
        };
        [SOLANA_ERROR__PROGRAM_DERIVED_ADDRESS_BUMP_SEED_OUT_OF_RANGE]: {
            bump: number;
        };
        [SOLANA_ERROR__RPC_INTEGER_OVERFLOW]: {
            argumentLabel: string;
            keyPath: readonly (string | number | symbol)[];
            methodName: string;
            optionalPathLabel: string;
            path?: string;
            value: bigint;
        };
        [SOLANA_ERROR__SIGNER_ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_KEY_PAIR_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_MESSAGE_MODIFYING_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_MESSAGE_PARTIAL_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_MESSAGE_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_MODIFYING_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_PARTIAL_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_SENDING_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__SIGNER_EXPECTED_TRANSACTION_SIGNER]: {
            address: string;
        };
        [SOLANA_ERROR__TRANSACTION_ERROR_DUPLICATE_INSTRUCTION]: {
            index: number;
        };
        [SOLANA_ERROR__TRANSACTION_ERROR_INSUFFICIENT_FUNDS_FOR_RENT]: {
            accountIndex: number;
        };
        [SOLANA_ERROR__TRANSACTION_ERROR_PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED]: {
            accountIndex: number;
        };
        [SOLANA_ERROR__TRANSACTION_ERROR_UNKNOWN]: {
            errorName: string;
            transactionErrorContext?: unknown;
        };
        [SOLANA_ERROR__TRANSACTION_FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING]: {
            lookupTableAddresses: string[];
        };
        [SOLANA_ERROR__TRANSACTION_FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE]: {
            highestKnownIndex: number;
            highestRequestedIndex: number;
            lookupTableAddress: string;
        };
        [SOLANA_ERROR__TRANSACTION_FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND]: {
            index: number;
        };
        [SOLANA_ERROR__TRANSACTION_INVOKED_PROGRAMS_CANNOT_PAY_FEES]: {
            programAddress: string;
        };
        [SOLANA_ERROR__TRANSACTION_INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE]: {
            programAddress: string;
        };
        [SOLANA_ERROR__TRANSACTION_MISSING_ADDRESS]: {
            index: number;
        };
        [SOLANA_ERROR__TRANSACTION_MISSING_SIGNATURES]: {
            addresses: string[];
        };
        [SOLANA_ERROR__TRANSACTION_VERSION_NUMBER_OUT_OF_RANGE]: {
            actualVersion: number;
        };
    }
>;
