<template>
  <div>
    <PresentationForm v-if="!qrCodeData"  @data-posted="handleDataPosted"/>
    <QrCode v-if="qrCodeData" :data="qrCodeData"/>
  </div>
</template>

<script setup lang="ts">
import QrCode from "~/components/QrCode.vue";
import PresentationForm from "~/components/PresentationForm.vue";
import type {PresentationResponse} from "~/models/PresentationResponse";

const qrCodeData = ref<PresentationResponse | null>(null);

const handleDataPosted = (data: PresentationResponse) => {
  qrCodeData.value = data;
};
</script>