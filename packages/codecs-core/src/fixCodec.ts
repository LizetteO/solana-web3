/* eslint-disable sort-keys-fix/sort-keys-fix */
import { fixBytes } from './bytes';
import { Codec, CodecData, Decoder, Encoder } from './codec';
import { NotEnoughBytesError } from './errors';
import { joinEncoderAndDecoder } from './joinEncoderAndDecoder';

function fixCodecHelper(data: CodecData, fixedBytes: number, description?: string): CodecData {
    return {
        description: description ?? `fixed(${fixedBytes}, ${data.description})`,
        fixedSize: fixedBytes,
        maxSize: fixedBytes,
    };
}

/**
 * Creates a fixed-size encoder from a given encoder.
 *
 * @param encoder - The encoder to wrap into a fixed-size encoder.
 * @param fixedBytes - The fixed number of bytes to write.
 * @param description - A custom description for the encoder.
 */
export function fixEncoder<T>(encoder: Encoder<T>, fixedBytes: number, description?: string): Encoder<T> {
    return {
        ...fixCodecHelper(encoder, fixedBytes, description),
        encode: (value: T) => fixBytes(encoder.encode(value), fixedBytes),
    };
}

/**
 * Creates a fixed-size decoder from a given decoder.
 *
 * @param decoder - The decoder to wrap into a fixed-size decoder.
 * @param fixedBytes - The fixed number of bytes to read.
 * @param description - A custom description for the decoder.
 */
export function fixDecoder<T>(decoder: Decoder<T>, fixedBytes: number, description?: string): Decoder<T> {
    return {
        ...fixCodecHelper(decoder, fixedBytes, description),
        decode: (buffer: Uint8Array, offset = 0) => {
            // Slice the buffer to the fixed size.
            buffer = buffer.slice(offset, offset + fixedBytes);
            // Ensure we have enough bytes.
            if (buffer.length < fixedBytes) {
                throw new NotEnoughBytesError('fixCodec', fixedBytes, buffer.length);
            }
            // If the nested decoder is fixed-size, pad and truncate the buffer accordingly.
            if (decoder.fixedSize !== null) {
                buffer = fixBytes(buffer, decoder.fixedSize);
            }
            // Decode the value using the nested decoder.
            const [value] = decoder.decode(buffer, 0);
            return [value, offset + fixedBytes];
        },
    };
}

/**
 * Creates a fixed-size codec from a given codec.
 *
 * @param codec - The codec to wrap into a fixed-size codec.
 * @param fixedBytes - The fixed number of bytes to read/write.
 * @param description - A custom description for the codec.
 */
export function fixCodec<T, U extends T = T>(
    codec: Codec<T, U>,
    fixedBytes: number,
    description?: string
): Codec<T, U> {
    return joinEncoderAndDecoder(
        fixEncoder(codec, fixedBytes, description),
        fixDecoder(codec, fixedBytes, description)
    );
}
