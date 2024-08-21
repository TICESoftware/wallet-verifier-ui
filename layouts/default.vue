<template>
  <div data-theme="wallettheme" class="flex flex-col min-h-screen">
    <div class="lg:pt-10 bg-primary">
      <HeaderComponent/>
    </div>
    <div class="flex-grow max-w-sm lg:max-w-7xl mx-auto">
      <div class="mx-6 my-4">
        <slot/>
      </div>
    </div>
    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
</script>
