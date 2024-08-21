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

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl
const dataList = ref<{ key: string; value: string }[]>([]);
const errorMessage = ref<string | null>(null);

let vpToken: string;
onMounted(async () => {
  const sessionStore = useSessionStore();
  const presentationId = sessionStore.presentationId

  const route = useRoute()
  const responseCode = ref()
  const hash = route.hash


  // TODO: add check for nonce
  // const nonce = route.query.nonce
  // if (nonce !== vpToken.nonce) {
  //   errorMessage.value = 'Nonce ist falsch';
  //   return;
  // }

  if (hash && presentationId) {
    try {
      const params = new URLSearchParams(hash.slice(1))
      responseCode.value = params.get('response_code')

      const response = await axios.get(
          `${baseUrl}/ui/presentations/${presentationId}?response_code=${responseCode.value}`
      );
      vpToken = response.data.vp_token;

      if (vpToken.includes('ey')) {
        const sdJwtClaims = await getSdJwtClaims(vpToken)
        if (sdJwtClaims) {
          dataList.value = Object.entries(sdJwtClaims)
              .filter(([key]) => !['cnf', 'exp', 'iat', 'iss', 'vct'].includes(key))
              .map(([key, value]) => ({
                key: key.replaceAll('_', ' '),
                value: typeof value === 'object' ? JSON.stringify(value) : String(value)
              }));
          sessionStore.$reset();
        } else {
          errorMessage.value = 'Fehler beim Abrufen der Daten';
        }
      } else {
        const mdocClaims = await getMdocClaims(vpToken)
        if (mdocClaims) {
          dataList.value = Object.entries(mdocClaims).map(([, valueObj]) => ({
            key: valueObj.key,
            value: valueObj.value
          }));
          sessionStore.$reset();
        } else {
          errorMessage.value = 'Fehler beim Abrufen der Daten';
        }
      }
    } catch {
      errorMessage.value = 'Fehler beim Abrufen der Daten';
    }
  } else {
    errorMessage.value = 'Fehler beim Abrufen der Daten';
  }
})
</script>
