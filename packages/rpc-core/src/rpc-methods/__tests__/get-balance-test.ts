import { createJsonRpcTransport } from '@solana/rpc-transport';
import type { SolanaJsonRpcErrorCode } from '@solana/rpc-transport/dist/types/json-rpc-transport/json-rpc-errors';
import type { Transport } from '@solana/rpc-transport/dist/types/json-rpc-transport/json-rpc-transport-types';
import fetchMock from 'jest-fetch-mock';
import { createSolanaRpcApi, SolanaRpcMethods } from '../../index';
import { Commitment } from '../common';
import { assertIsBase58EncodedAddress } from '@solana/keys';

describe('getBalance', () => {
    let transport: Transport<SolanaRpcMethods>;
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.dontMock();
        transport = createJsonRpcTransport({
            api: createSolanaRpcApi(),
            url: 'http://127.0.0.1:8899',
        });
    });

    (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
        describe(`when called with \`${commitment}\` commitment`, () => {
            it('returns a balance of zero for a new address', async () => {
                expect.assertions(1);
                // This key is random, don't re-use in any tests that affect balance
                const publicKey = '4BfxgLzn6pEuVB2ynBMqckHFdYD8VNcrheDFFCB6U5TH';
                assertIsBase58EncodedAddress(publicKey);
                const balance = await transport.getBalance(publicKey).send();
                expect(balance.value).toEqual(BigInt(0));
            });
        });
    });

    describe('returns a non-zero balance for an address with lamports', () => {
        // TODO: requires requestAirdrop or something else that can give an address lamports
        it.todo('returns the correct balance after an airdrop');
    });

    describe('when called with a `minContextSlot` higher than the highest slot available', () => {
        it('throws an error', async () => {
            expect.assertions(1);
            // This key is random, don't re-use in any tests that affect balance
            const publicKey = '4BfxgLzn6pEuVB2ynBMqckHFdYD8VNcrheDFFCB6U5TH';
            assertIsBase58EncodedAddress(publicKey);
            const sendPromise = transport
                .getBalance(publicKey, {
                    minContextSlot: 2n ** 63n - 1n, // u64:MAX; safe bet it'll be too high.
                })
                .send();
            await expect(sendPromise).rejects.toMatchObject({
                code: -32016 satisfies (typeof SolanaJsonRpcErrorCode)['JSON_RPC_SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED'],
                message: expect.any(String),
                name: 'SolanaJsonRpcError',
            });
        });
    });
});
