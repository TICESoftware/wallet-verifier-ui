// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8080',
      version: 'dev',
    },
  }
})
