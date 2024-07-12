// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/tailwindcss', "@nuxt/image"],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8080',
      version: 'dev',
    },
  }
})