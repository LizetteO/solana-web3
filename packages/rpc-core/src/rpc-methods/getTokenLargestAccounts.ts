import { Address } from '@solana/addresses';
import type { IRpcApiMethods } from '@solana/rpc-transport';
import { Commitment } from '@solana/rpc-types';

import { RpcResponse, TokenAmount } from './common';

type GetTokenLargestAccountsApiResponse = RpcResponse<TokenAmount & { address: Address }[]>;

export interface GetTokenLargestAccountsApi extends IRpcApiMethods {
    /**
     * Returns the 20 largest accounts of a particular SPL Token type.
     */
    getTokenLargestAccounts(
        tokenMint: Address,
        config?: Readonly<{
            commitment?: Commitment;
        }>,
    ): GetTokenLargestAccountsApiResponse;
}
