<template>
  <div class="text-xl lg:text-3xl font-bold text-accent m-6 text-center">
    <h1>Ihre Daten</h1>
  </div>
  <div class="text-base text-black m-6 text-center">
    <p>Wählen Sie hier die Daten, welche Sie übermitteln möchten.</p>
  </div>
  <div class="mx-6 py-4 border-neutral-400 border rounded">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <tbody>
        <tr v-for="item in dataList" :key="item.kind">
          <td>
            <input v-model="item.selected" type="checkbox">
          </td>
          <td>{{ item.kind }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-4">
      <button class="btn btn-primary" @click="postData">
        Hier ausweisen
      </button>
    </div>
    <div v-if="errorMessage" class="mx-6 my-4 p-4 border-red-400 border rounded text-red-500">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type {TransactionRequest} from "~/models/TransactionRequest.ts";
import {presentationInfo} from '~/models/PresentationInfo';
import type {TransactionResponse} from "~/models/TransactionResponse";
import {ref} from "vue";

const errorMessage = ref<string | null>(null);

const emit = defineEmits(['data-posted']);
const sessionStore = useSessionStore();

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl
const nonce = crypto.randomUUID()

const dataList = ref<{ kind: string, selected: boolean }[]>(Object.keys(presentationInfo).map(kind => ({
  kind,
  selected: false
})));
const postData = async () => {
  const selectedItems = dataList.value.filter(item => item.selected);

  const presentationRequest: TransactionRequest = {
    nonce: nonce,
    response_mode: 'direct_post',
    type: 'vp_token',
    presentation_definition: {
      id: crypto.randomUUID(),
      input_descriptors: [
        {
          id: "eu.europa.ec.eudi.pid.1",
          name: "EUDI PID",
          purpose: "We need to verify your identity",
          format: {
            mso_mdoc: {
              alg: [
                "ES256", "ES384", "ES512", "EdDSA",
                "ESB256", "ESB320", "ESB384", "ESB512"
              ]
            }
          },
          constraints: {
            fields: selectedItems.map(item => ({
              path: [`$['eu.europa.ec.eudi.pid.1']['${presentationInfo[item.kind]}']`],
              intent_to_retain: false
            }))
          }
        }
      ],
    },

  };

  try {
    const response = await axios.post(`${baseUrl}/ui/presentations`, presentationRequest);
    const {client_id, presentation_id, request_uri}: TransactionResponse = response.data;

    sessionStore.setPresentationStore({client_id, presentation_id, request_uri, nonce});
    emit('data-posted', {client_id, request_uri});
    console.log('client_id: ', client_id);

  } catch (error) {
    console.error('Error posting data:', error);
    errorMessage.value = 'Fehler beim Senden der Daten';
  }
}
</script>