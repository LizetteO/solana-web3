import { Base58EncodedAddress } from '@solana/addresses';

type GetClusterNodesNode = Readonly<{
    /** The unique identifier of the node's feature set */
    featureSet: number | null;
    /** Gossip network address for the node */
    gossip: string | null;
    /** Node public key, as base-58 encoded string */
    pubkey: Base58EncodedAddress;
    /**
     * JSON RPC network address for the node,
     * or `null` if the JSON RPC service is not enabled
     */
    rpc: string | null;
    /** The shred version the node has been configured to use */
    shredVersion: number | null;
    /** TPU network address for the node */
    tpu: string | null;
    /**
     * The software version of the node,
     * or `null` if the version information is not available
     */
    version: string | null;
}>;

type GetClusterNodesApiResponse = readonly GetClusterNodesNode[];

export interface GetClusterNodesApi {
    /**
     * Returns information about all the nodes participating in the cluster
     */
    getClusterNodes(): GetClusterNodesApiResponse;
}
