<template>
  <div class="text-xl lg:text-3xl font-bold text-accent m-6 text-center">
    <h1>Ihre Daten</h1>
  </div>
  <div class="mx-8 py-6 border-neutral-400 border rounded">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
        <tr>
          <th>Auswählen</th>
          <th>Art</th>
          <th>Wert</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dataList" :key="index">
          <td>
            <input v-model="item.selected" type="checkbox" >
          </td>
          <td>{{ item.kind }}</td>
          <td>{{ item.info }}</td>
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

<script setup>
import axios from 'axios';

const dataList = ref([
  { kind: 'Familienname', info: 'Musterfrau' },
  { kind: 'Name', info: 'Manuela' },
  { kind: 'Geburtsdatum', info: '01.01.2000' },
  { kind: 'Geburtsort', info: 'Berlin' },
  { kind: 'Geburtsland', info: 'Deutschland' },
  { kind: 'Geburtsstaat', info: 'Berlin' },
  { kind: 'Geburtsstadt', info: 'Berlin' },
  { kind: 'Wohnadresse', info: 'Musterstraße 1, 12345 Berlin' },
  { kind: 'Wohnland', info: 'Deutschland' },
  { kind: 'Wohnstaat', info: 'Berlin' },
  { kind: 'Wohnstadt', info: 'Berlin' },
  { kind: 'Postleitzahl', info: '12345' },
  { kind: 'Wohnstraße', info: 'Musterstraße' },
  { kind: 'Hausnummer', info: '1' },
  { kind: 'Geschlecht', info: 'Weiblich' },
  { kind: 'Nationalität', info: 'Deutsch' },
  { kind: 'Ausstellungsdatum', info: '01.01.2020' },
  { kind: 'Ablaufdatum', info: '01.01.2030' },
  { kind: 'Ausstellende Behörde', info: 'Stadt Berlin' },
  { kind: 'Dokumentnummer', info: 'D12345678' },
  { kind: 'Verwaltungsnummer', info: 'A12345678' },
  { kind: 'Ausstellungsland', info: 'Deutschland' },
  { kind: 'Ausstellungsbehörde', info: 'Berlin' },
]);
const postData = async () => {
  const requestData = {};

  try {
    const response = await axios.post('/ui/presentations', requestData);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};
</script>