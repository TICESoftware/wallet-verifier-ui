<script setup lang="ts">
</script>

<template>
  <div class="join join-vertical mx-auto py-4">
    <div class="collapse collapse-arrow join-item border-neutral border">
      <input type="radio" name="my-accordion-4">
      <div class="collapse-title text-xl font-medium text-accent">Das ist EUDI</div>
      <div class="collapse-content">
        <p>Der Name EUDI steht für das Projekt "EU Digital Identity", in dem EU-weit digitale Brieftaschen für Identitäten entwickelt werden.</p>
        <p class="my-2"><NuxtLink to="https://digital-strategy.ec.europa.eu/de/policies/eudi-wallet-implementation" target="_blank" class="btn btn-xs">Weitere Informationen</NuxtLink></p>
      </div>
    </div>
    <div class="collapse collapse-arrow join-item border-neutral border">
      <input type="radio" name="my-accordion-4" checked="checked">
      <div class="collapse-title text-xl font-medium text-accent">Zero-Knowledge Proof (ZKP)</div>
      <div class="collapse-content">
        <p>Details zum implementierten Zero-Knowledge Proof finden sich bei GitHub in den Beschreibungen zu den in diesem Rahmen entwickelten Open-Source-Bibliotheken <NuxtLink to="https://github.com/TICESoftware/ZKP" target="_blank" class="font-bold">ZKP</NuxtLink> (Kotlin) und <NuxtLink to="https://github.com/TICESoftware/ZKP-Swift" target="_blank" class="font-bold">ZKP-Swift</NuxtLink>.</p>
        <p class="my-2"><NuxtLink to="https://github.com/TICESoftware/ZKP/blob/main/README.md" class="btn btn-xs" target="_blank">Zu den Details</NuxtLink></p>
      </div>
    </div>
    <div class="collapse collapse-arrow join-item border-neutral border">
      <input type="radio" name="my-accordion-4" >
      <div class="collapse-title text-xl font-medium text-accent">Über TICE</div>
      <div class="collapse-content">
        <p>Das Team von TICE versucht stets, optimale Lösungen zu finden im Spannungsfeld zwischen den sehr hohen Anforderungen an die UX auf der einen und Sicherheit und Datenschutz auf der anderen Seite.</p>
        <p>Unser Ansatz im EUDI-Projekt verfolgt eine Wallet-Lösung mit einer Smartphone-App als zentralem Baustein für Millionen von Bürger:innen. Dabei wird vorrangig auf Open-Source-Komponenten und bereits existente Protokolle gesetzt. Ausgehend vom deutschen Personalausweis, der hohe Sicherheitskriterien erfüllt, erweitern wir dadurch die Möglichkeiten, die eine digitale Wallet bieten kann: Identifizierung, Authentifizierung, Signieren digitaler Dokumente, Pseudonymer Login und Strong Customer Authentication.</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
