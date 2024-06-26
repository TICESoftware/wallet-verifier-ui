<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
useHead({
  title: 'TICE-Wallet Verifier UI',
  meta: [
    {
      name: 'version',
      content: runtimeConfig.public.version
    }
  ]
})
</script>

<template>
  <NuxtPage />
</template>
