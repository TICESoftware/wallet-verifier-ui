<template>
  <div
      :class="[
      showHeader ? 'translate-y-0' : '-translate-y-full',
      'transform-gpu transition-transform duration-500 sticky top-0 z-50',
    ]"
  >
    <div class="flex items-center justify-between max-w-7xl mx-auto pl-10 pr-2 py-3">
      <div class="flex-1 flex justify-center relative text-xl text-base-100 lg:pl-48 lg:text-3xl">
        EUDI Wallet
      </div>
      <div class="hidden lg:block">
        <NavLinks :links="links"/>
      </div>
      <div class="lg:hidden">
        <NavLinksMobile :links="links"/>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import NavLinksMobile from "~/components/NavLinksMobile.vue";
import type {NavLinks} from "~/models/NavLinks";

const links: NavLinks[] =
    [
      {name: "Home", to: "/"},
      {name: "Demo", to: "/provider"},
      {name: "Kontakt", to: "/kontakt"},
    ]

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const showHeader = ref(true);
const lastScrollPosition = ref(0);

const onScroll = () => {
  const currentScrollPosition = document.documentElement.scrollTop;
  // Momentum scrolling on iOS can cause the scroll position to be negative
  if (currentScrollPosition < 0) return;

  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) return;

  // show if scrolling up
  showHeader.value = currentScrollPosition < lastScrollPosition.value;

  lastScrollPosition.value = currentScrollPosition;
};
</script>
