<template>
  <Menu as="div" class="inline-block text-left z-10">
    <div>
      <MenuButton
          class="border rounded-lg px-2 py-2 text-neutral border-neutral hover:bg-white hover:text-black hover:border-black active:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Menu</span>
        <Bars2Icon class="h-4 w-4" aria-hidden="true"/>
      </MenuButton>
    </div>
      <MenuItems
          class="absolute right-0 mt-4 w-56 origin-top-right divide-y divide-zinc-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-2 py-2 w-full">
          <MenuItem
              v-for="(link, index) in links"
              :key="index"
              v-slot="{ close }"
          >
            <NuxtLink
                :class="[
                $route.path === link.to
                  ? 'bg-zinc-200 text-zinc-900'
                  : 'text-zinc-900',
                'group block w-full items-center rounded-xl text-sm',
              ]"
                :to="link.to"
            >
              <span class="truncate px-4 py-2 block" @click="close">{{
                  link.name
                }}</span>
            </NuxtLink>
          </MenuItem>
        </div>
      </MenuItems>
  </Menu>
</template>

<script setup lang="ts">
import {Menu, MenuButton, MenuItems, MenuItem} from "@headlessui/vue";
import {Bars2Icon} from "@heroicons/vue/20/solid";

const {links} = defineProps<{
  links: { name: string; to: string }[];
}>();
</script>