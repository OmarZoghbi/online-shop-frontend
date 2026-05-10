<script setup>
import welcomeImage from "@/assets/Atlas Shop.png";
import HeroStartseite from "@/components/HeroStartseite.vue";
import BestsellerSection from "@/components/BestsellerSection.vue";
</script>

<template>

  <HeroStartseite />
  <BestsellerSection />
  <div class="welcome-container">
    <img :src="welcomeImage" class="welcome-img" alt="Welcome" />
  </div>
</template>

<style scoped>


/* Bild füllt exakt den gesamten Bildschirm */
.welcome-img {
  position: fixed;
  inset: 0;   /* ersetzt top/left/width/height */
  width: 100%;
  height: 100%;
  object-fit: cover;         /* Das Bild wird so skaliert, dass es den gesamten Bereich abdeckt */
  z-index: 0;

}

</style>