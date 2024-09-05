import type { TransactionResponse } from "~/models/TransactionResponse";
export interface TransactionStore extends TransactionResponse {
    nonce: string;
}