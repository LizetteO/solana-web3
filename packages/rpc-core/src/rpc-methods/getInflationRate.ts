import { F64UnsafeSeeDocumentation, U64UnsafeBeyond2Pow53Minus1 } from './common';

type GetInflationRateApiResponse = Readonly<{
    /** Epoch for which these values are valid */
    epoch: U64UnsafeBeyond2Pow53Minus1;
    /** Inflation allocated to the foundation */
    foundation: F64UnsafeSeeDocumentation;
    /** Total inflation */
    total: F64UnsafeSeeDocumentation;
    /** Inflation allocated to validators */
    validator: F64UnsafeSeeDocumentation;
}>;

export interface GetInflationRateApi {
    /**
     * Returns the current block height of the node
     */
    getInflationRate(): GetInflationRateApiResponse;
}
