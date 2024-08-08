<template>
  <div class="text-xl lg:text-3xl font-bold text-accent m-6 text-center">
    <h1>Ausweisen</h1>
  </div>
  <div class="text-center border border-gray-400 rounded m-6 p-2">
    <p class="m-2">Wählen Sie zuerst die Art der Übertragung:</p>
    <div class="flex flex-row w-full text-sm items-center justify-center">
      <div class="form-control flex-1 mx-1 lg:px-8">
        <label class="label cursor-pointer">
          <span class="label-text mr-1">mDoc</span>
          <input v-model="formType" type="radio" name="formType" value="mDoc" class="radio checked:bg-blue-500">
        </label>
      </div>
      <div class="form-control flex-1 mx-1">
        <label class="label cursor-pointer">
          <span class="label-text mr-1">SDJWT</span>
          <input v-model="formType" type="radio" name="formType" value="SDJWT" class="radio checked:bg-blue-500">
        </label>
      </div>
      <label class="flex items-center flex-1 mx-2">
        <input v-model="isZkpSelected" type="checkbox" class="mr-2">
        <span class="cursor-pointer">ZKP</span>
      </label>
    </div>
  </div>
  <div class="text-xl lg:text-xl font-bold text-accent m-6 text-center">
    <h2>Ihre Daten</h2>
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
import type {Format, TransactionRequest, ZkpFormat} from "~/models/TransactionRequest.ts";
import {MDocClaims} from '~/models/MDocClaims';
import type {TransactionResponse} from "~/models/TransactionResponse";
import {SdJwtClaims} from "~/models/SdJwtClaims";

const errorMessage = ref<string | null>(null);
const formType = ref<string>('mDoc');
const isZkpSelected = ref<boolean>(false);

const emit = defineEmits(['data-posted']);
const sessionStore = useSessionStore();

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl
const nonce = crypto.randomUUID()

const dataList = computed(() => {
  const claims = formType.value === 'mDoc' ? MDocClaims : SdJwtClaims;
  return Object.keys(claims).map(kind => ({
    kind,
    selected: false
  }));
});

const postData = async () => {
  const selectedItems = dataList.value.filter(item => item.selected);

  const alg: string[] = [
    "ES256", "ES384", "ES512", "EdDSA",
    "ESB256", "ESB320", "ESB384", "ESB512"
  ]

  const format: Format = formType.value === 'mDoc' ? {
    mso_mdoc: {
      alg
    }
  } : {
    vc_sd_jwt: {
      alg
    }
  };

  const zkpformat: ZkpFormat = formType.value === 'mDoc' ? {
    "mso_mdoc+zkp": {
      "proof_type": ["secp256r1-sha256"]
    }
  } : {
    "vc+sd-jwt+zkp": {
      "proof_type": ["secp256r1-sha256"]
    }
  }

  function pathLayout(kind: string) {
    if (formType.value === 'mDoc') {
      return [`$['eu.europa.ec.eudi.pid.1']['${MDocClaims[kind]}']`]
    } else {
      return [`$.${SdJwtClaims[kind]}`]
    }
  }

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
          format: isZkpSelected.value ? zkpformat : format,
          constraints: {
            fields: selectedItems.map(item => ({
              path: pathLayout(item.kind),
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
    emit('data-posted', { client_id, request_uri });

  } catch (error) {
    console.error('Error posting data:', error);
    errorMessage.value = 'Fehler beim Senden der Daten';
  }
}
</script>