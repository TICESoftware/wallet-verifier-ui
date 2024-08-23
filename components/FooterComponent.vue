<template>
  <footer class="w-full bg-white p-6">
    <div class="text-center">
      <NuxtLink to="https://tice.software/de/impressum.html" target="_blank" class="mx-2">Impressum</NuxtLink>
      <NuxtLink to="/kontakt" class="mx-2">Kontakt</NuxtLink>
    </div>
    <div class="text-xs text-center mt-6">
      Website © {{ date }} -
      <a
          href="https://tice.software/"
          class="hover:text-gray-400 font-semibold py-1"
      >TICE GmbH</a
      >
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
