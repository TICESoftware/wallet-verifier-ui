<template>
  <ul class="flex items-center gap-4">
    <NuxtLink
        :to="link.to"
        :class="[
        $route.path === link.to? 'pb-2 text-white border border-transparent border-b-white': 'text-black',
        'px-2 hover:text-amber-900'
      ]"
        v-for="(link, index) in links"
        :key="`navlinks-${index}`"
    >
      {{ link.name }}
    </NuxtLink>
  </ul>
</template>

<script setup lang="ts">
import type {NavLinks} from "~/types/NavLinks";

const {links} = defineProps<{
  links: NavLinks[];
}>();
</script>
