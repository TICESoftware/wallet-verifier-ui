import { defineStore } from 'pinia'
import type {TransactionStore} from "~/stores/models/TransactionStore";

export const useSessionStore = defineStore('session', {
    state: () => ({
        clientId: null as string | null,
        presentationId: null as string | null,
        requestUri: null as string | null,
        nonce: null as string | null,
    }),
    actions: {
        setPresentationStore(data: TransactionStore) {
            this.clientId = data.client_id
            this.presentationId = data.presentation_id
            this.requestUri = data.request_uri
            this.nonce = data.nonce
        },
        $reset() {
            this.clientId = null
            this.presentationId = null
            this.requestUri = null
            this.nonce = null
        }
    },
    persist: true,
})