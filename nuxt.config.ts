// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@pinia-plugin-persistedstate/nuxt',],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8080',
      version: 'dev',
      uiUrl: 'https://staging.wallet.tice.software'
    },
  }
})