<template>
  <div>
    <div class="text-xl lg:text-3xl font-bold text-accent m-6 text-center">
      <h1>Ihre Daten</h1>
    </div>
    <div v-if="dataList" class="mx-6 border-neutral-400 border rounded">
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <tbody>
          <tr v-for="item in dataList" :key="item.key">
            <td class="px-4 py-2 border">{{ item.key }}</td>
            <td class="px-4 py-2 border">{{ item.value }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="errorMessage" class="mx-6 p-4 border-red-400 border rounded text-red-500">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onMounted, ref} from 'vue';
import {getMdocClaims, getSdJwtClaims} from "~/utils/utils";
import type {WalletResponse} from "~/models/WalletResponse";
import type {ClaimEntry} from "~/models/ClaimEntry";

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl
const dataList = ref<ClaimEntry[]>([]);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  const sessionStore = useSessionStore();
  const presentationId = sessionStore.presentationId

  const route = useRoute()
  const responseCode = ref()
  const hash = route.hash

  if (hash && presentationId) {
    try {
      const params = new URLSearchParams(hash.slice(1))
      responseCode.value = params.get('response_code')

      const response = await axios.get(
          `${baseUrl}/ui/presentations/${presentationId}?response_code=${responseCode.value}`
      );
      const walletResponse: WalletResponse = response.data
      const vpToken = walletResponse.vp_token;

      // Currently this supports only one incoming presentation. For multiple presentations the following part should be adjusted accordingly.
      const format = walletResponse.presentation_submission.descriptor_map[0].format

      if (['vc+sd-jwt', 'vc+sd-jwt+zkp'].includes(format)) {
        const sdJwtClaims = await getSdJwtClaims(vpToken)
        if (sdJwtClaims) {
          dataList.value = sdJwtClaims
          sessionStore.$reset();
        } else {
          errorMessage.value = 'Fehler beim Abrufen der Daten';
        }
      }
      else if (['mso_mdoc', 'mso_mdoc+zkp'].includes(format)) {
        const mdocClaims = await getMdocClaims(vpToken)
        if (mdocClaims) {
          dataList.value = mdocClaims
          sessionStore.$reset();
        } else {
          errorMessage.value = 'Fehler beim Abrufen der Daten';
        }
      }
    } catch (error) {
      console.error('Error wallet redirect', error)
      errorMessage.value = 'Fehler beim Abrufen der Daten';
    }
  } else {
    errorMessage.value = 'Fehler beim Abrufen der Daten';
  }
})
</script>
