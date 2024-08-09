<template>
  <div v-if="props.qrCodeData" class="flex flex-col justify-center items-center gap-6">
    <qrcode-vue :value="link" :level="level" :render-as="renderAs" :size="200" class="my-10"/>
    <NuxtLink :to="link">
      <button class="btn btn-primary">
        Mit Wallet-App authentifizieren
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import type {Level, RenderAs} from 'qrcode.vue'

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl

const props = defineProps<{
  qrCodeData: { client_id: string, request_uri: string }
}>();
const {client_id, request_uri} = props.qrCodeData;
const authenticationUrl = `eudi-openid4vp://${baseUrl}?client_id=${client_id}&request_uri=${request_uri}`

const link = ref(authenticationUrl)
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
</script>