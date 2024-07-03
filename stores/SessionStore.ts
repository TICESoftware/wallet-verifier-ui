import { defineStore } from 'pinia'

const runtimeConfig = useRuntimeConfig()

export const useSessionStore = defineStore('session', () => {
    const baseUrl = runtimeConfig.public.apiUrl

    async function _create(): Promise<void> {
        try {
            // TODO ...
            await fetch(`${baseUrl}/...`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            return
        } catch (error) {
            console.error(error)
            return
        }
    }
})
