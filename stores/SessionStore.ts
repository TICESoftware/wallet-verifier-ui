import { defineStore } from 'pinia'

const runtimeConfig = useRuntimeConfig()

export const useSessionStore = defineStore('session', () => {
    const baseUrl = runtimeConfig.public.apiUrl

    async function create(): Promise<void> {
        try {
            // TODO ...
            const responsePost = await fetch(`${baseUrl}/...`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            return
        } catch (error: any) {
            console.error(error)
            return
        }
    }
})
