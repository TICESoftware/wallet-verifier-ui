<script setup lang="ts">
const {innerClass} = defineProps<{
  innerClass?: string;
}>();
</script>
<template>
  <div class="sm:px-8">
    <div class="mx-auto max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8" :class="innerClass">
        <div class="mx-auto max-w-2xl lg:max-w-6xl">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
