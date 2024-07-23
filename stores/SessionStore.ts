import { defineStore } from 'pinia'
import type {PresentationResponse} from "~/models/PresentationResponse";


export const useSessionStore = defineStore('session', {
    state: () => ({
        clientId: null as string | null,
        presentationId: null as string | null,
        requestUri: null as string | null,
    }),
    actions: {
        setPresentationResponse(response: PresentationResponse) {
            this.clientId = response.client_id
            this.presentationId = response.presentation_id
            this.requestUri = response.request_uri
        }
    }
})