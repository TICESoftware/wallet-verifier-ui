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
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type {PresentationRequest} from "~/models/PresentationRequest.ts";
import {presentationInfo} from '~/models/PresentationInfo';
import type {PresentationResponse} from "~/models/PresentationResponse";

const emit = defineEmits(['data-posted']);

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl
type dataList = { kind: string; selected: boolean }
const dataList = ref<{ kind: string, selected: boolean }[]>(Object.keys(presentationInfo).map(kind => ({
  kind,
  selected: false
})));
const postData = async () => {
  const selectedItems = dataList.value.filter(item => item.selected);

  const presentationRequest: PresentationRequest = {
    nonce: crypto.randomUUID(),
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
    const presentationResponse: PresentationResponse = response.data;

    emit('data-posted', presentationResponse);
  } catch (error) {
    console.error('Error posting data:', error);
  }
}
</script>