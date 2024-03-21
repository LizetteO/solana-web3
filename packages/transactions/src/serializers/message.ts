import { getAddressDecoder, getAddressEncoder } from '@solana/addresses';
import {
    combineCodec,
    createEncoder,
    Decoder,
    mapDecoder,
    mapEncoder,
    VariableSizeCodec,
    VariableSizeDecoder,
    VariableSizeEncoder,
} from '@solana/codecs-core';
import { getArrayDecoder, getArrayEncoder, getStructDecoder, getStructEncoder } from '@solana/codecs-data-structures';
import { getShortU16Decoder, getShortU16Encoder } from '@solana/codecs-numbers';
import { getBase58Decoder, getBase58Encoder, getStringDecoder, getStringEncoder } from '@solana/codecs-strings';

import type { getCompiledAddressTableLookups } from '../compile-address-table-lookups.js';
import { CompiledMessage } from '../message.js';
import { getAddressTableLookupDecoder, getAddressTableLookupEncoder } from './address-table-lookup.js';
import { getMessageHeaderDecoder, getMessageHeaderEncoder } from './header.js';
import { getInstructionDecoder, getInstructionEncoder } from './instruction.js';
import { getTransactionVersionDecoder, getTransactionVersionEncoder } from './transaction-version.js';

function getCompiledMessageLegacyEncoder(): VariableSizeEncoder<CompiledMessage> {
    return getStructEncoder(getPreludeStructEncoderTuple()) as VariableSizeEncoder<CompiledMessage>;
}

function getCompiledMessageVersionedEncoder(): VariableSizeEncoder<CompiledMessage> {
    return mapEncoder(
        getStructEncoder([
            ...getPreludeStructEncoderTuple(),
            ['addressTableLookups', getAddressTableLookupArrayEncoder()],
        ]) as VariableSizeEncoder<CompiledMessage>,
        (value: CompiledMessage) => {
            if (value.version === 'legacy') {
                return value;
            }
            return {
                ...value,
                addressTableLookups: value.addressTableLookups ?? [],
            } as Exclude<CompiledMessage, { readonly version: 'legacy' }>;
        },
    ) as VariableSizeEncoder<CompiledMessage>;
}

function getPreludeStructEncoderTuple() {
    return [
        ['version', getTransactionVersionEncoder()],
        ['header', getMessageHeaderEncoder()],
        ['staticAccounts', getArrayEncoder(getAddressEncoder(), { size: getShortU16Encoder() })],
        ['lifetimeToken', getStringEncoder({ encoding: getBase58Encoder(), size: 32 })],
        ['instructions', getArrayEncoder(getInstructionEncoder(), { size: getShortU16Encoder() })],
    ] as const;
}

function getPreludeStructDecoderTuple() {
    return [
        ['version', getTransactionVersionDecoder() as Decoder<number>],
        ['header', getMessageHeaderDecoder()],
        ['staticAccounts', getArrayDecoder(getAddressDecoder(), { size: getShortU16Decoder() })],
        ['lifetimeToken', getStringDecoder({ encoding: getBase58Decoder(), size: 32 })],
        ['instructions', getArrayDecoder(getInstructionDecoder(), { size: getShortU16Decoder() })],
        ['addressTableLookups', getAddressTableLookupArrayDecoder()],
    ] as const;
}

function getAddressTableLookupArrayEncoder() {
    return getArrayEncoder(getAddressTableLookupEncoder(), { size: getShortU16Encoder() });
}

function getAddressTableLookupArrayDecoder() {
    return getArrayDecoder(getAddressTableLookupDecoder(), { size: getShortU16Decoder() });
}

export function getCompiledMessageEncoder(): VariableSizeEncoder<CompiledMessage> {
    return createEncoder({
        getSizeFromValue: (compiledMessage: CompiledMessage) => {
            if (compiledMessage.version === 'legacy') {
                return getCompiledMessageLegacyEncoder().getSizeFromValue(compiledMessage);
            } else {
                return getCompiledMessageVersionedEncoder().getSizeFromValue(compiledMessage);
            }
        },
        write: (compiledMessage, bytes, offset) => {
            if (compiledMessage.version === 'legacy') {
                return getCompiledMessageLegacyEncoder().write(compiledMessage, bytes, offset);
            } else {
                return getCompiledMessageVersionedEncoder().write(compiledMessage, bytes, offset);
            }
        },
    });
}

export function getCompiledMessageDecoder(): VariableSizeDecoder<CompiledMessage> {
    return mapDecoder(
        getStructDecoder(getPreludeStructDecoderTuple()) as VariableSizeDecoder<
            CompiledMessage & { addressTableLookups?: ReturnType<typeof getCompiledAddressTableLookups> }
        >,
        ({ addressTableLookups, ...restOfMessage }) => {
            if (restOfMessage.version === 'legacy' || !addressTableLookups?.length) {
                return restOfMessage;
            }
            return { ...restOfMessage, addressTableLookups } as Exclude<
                CompiledMessage,
                { readonly version: 'legacy' }
            >;
        },
    );
}

export function getCompiledMessageCodec(): VariableSizeCodec<CompiledMessage> {
    return combineCodec(getCompiledMessageEncoder(), getCompiledMessageDecoder());
}
