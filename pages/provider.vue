<template>
  <div>
    <PresentationForm v-if="!qrCodeData" @data-posted="handleDataPosted"/>
    <QrCode v-if="qrCodeData" :qr-code-data="qrCodeData"/>
  </div>
</template>

<script setup lang="ts">
import QrCode from "~/components/QrCode.vue";
import PresentationForm from "~/components/PresentationForm.vue";

const qrCodeData = ref<{ client_id: string, request_uri: string } | null>(null);

const handleDataPosted = ({client_id, request_uri}: {client_id: string, request_uri: string}) => {
  qrCodeData.value = {client_id, request_uri};
};
</script>