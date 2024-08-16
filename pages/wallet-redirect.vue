<template>
  <div>
    <div class="text-xl lg:text-3xl font-bold text-accent m-6 text-center">
      <h1>Ihre Daten</h1>
    </div>
    <div v-if="errorMessage" class="mx-6 p-4 border-red-400 border rounded text-red-500">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-else class="mx-6 py-4 border-neutral-400 border rounded">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <tbody>
          <tr v-for="item in dataList" :key="item.kind">
            <td>{{ item.kind }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref, onMounted} from 'vue';
import type {TransactionRequest} from "~/models/TransactionRequest";

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl
const dataList = ref<{ kind: string }[]>([]);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  const sessionStore = useSessionStore();
  const presentationId = sessionStore.presentationId

  const route = useRoute()
  const responseCode = route.query.response_code
  const nonce = route.query.nonce

  if (responseCode && presentationId) {
    try {
      const response = await axios.get<TransactionRequest>(
          `${baseUrl}/ui/presentations`
      );
      const presentationResponse = response.data;

      if (nonce !== presentationResponse.nonce) {
        errorMessage.value = 'Nonce ist falsch';
        return;
      }

      const regex = /^\$\['[^']+'\]/;

      dataList.value = presentationResponse.presentation_definition.input_descriptors[0].constraints.fields.map(field => ({
        kind: field.path[0].replace(regex, '')
      }));

      sessionStore.$reset();
    } catch (error) {
      errorMessage.value = 'Fehler beim Abrufen der Daten';
    }
  } else {
    errorMessage.value = 'Fehler beim Abrufen der Daten';
  }
});
</script>
