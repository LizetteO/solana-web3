import { Base58EncodedAddress } from '@solana/addresses';
import { createHttpTransport, createJsonRpc } from '@solana/rpc-transport';
import type { SolanaJsonRpcErrorCode } from '@solana/rpc-transport/dist/types/json-rpc-errors';
import type { Rpc } from '@solana/rpc-transport/dist/types/json-rpc-types';
import fetchMock from 'jest-fetch-mock-fork';

import { Commitment } from '../common';
import { createSolanaRpcApi, SolanaRpcMethods } from '../index';

describe('getTokenLargestAccounts', () => {
    let rpc: Rpc<SolanaRpcMethods>;
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.dontMock();
        rpc = createJsonRpc<SolanaRpcMethods>({
            api: createSolanaRpcApi(),
            transport: createHttpTransport({ url: 'http://127.0.0.1:8899' }),
        });
    });

    (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
        describe(`when called with \`${commitment}\` commitment`, () => {
            // TODO: will need a way to create token mint + accounts in tests
            it('returns the 20 largest token accounts', async () => {
                expect.assertions(3);
                // See scripts/fixtures/spl-token-mint-account.json
                const pubkey =
                    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr' as Base58EncodedAddress<'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'>;
                const tokenAccountBalance = await rpc.getTokenLargestAccounts(pubkey, { commitment }).send();
                expect(tokenAccountBalance).toMatchObject({
                    context: {
                        slot: expect.any(BigInt), // Changes
                    },
                    value: expect.any(Array),
                });
                // Only one fixture for a token account for this mint
                expect(tokenAccountBalance.value).toHaveLength(1);
                expect(tokenAccountBalance.value[0]).toMatchObject({
                    address: 'AyGCwnwxQMCqaU4ixReHt8h5W4dwmxU7eM3BEQBdWVca',
                    amount: '9999999779500000',
                    decimals: 6,
                    // This can be Number or null, but we're using a fixture so it should be Number
                    uiAmount: 9999999779.5,
                    uiAmountString: '9999999779.5',
                });
            });
        });
    });

    describe('when called with an account that is not a token mint', () => {
        it('throws an error', async () => {
            expect.assertions(1);
            const stakeActivationPromise = rpc
                .getTokenSupply(
                    // Randomly generated
                    'BnWCFuxmi6uH3ceVx4R8qcbWBMPVVYVVFWtAiiTA1PAu' as Base58EncodedAddress
                )
                .send();
            await expect(stakeActivationPromise).rejects.toMatchObject({
                code: -32602 satisfies (typeof SolanaJsonRpcErrorCode)['JSON_RPC_INVALID_PARAMS'],
                message: expect.any(String),
                name: 'SolanaJsonRpcError',
            });
        });
    });
});
