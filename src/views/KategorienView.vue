<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import ArticleCard from "../components/ArticleCard.vue";

const route = useRoute();
const kategorie = route.params.name;

const alleArtikel = [
  { name: "Warndreieck", price: 9.99, imageUrl: "/src/assets/Warndreieck.png", category: "Autozubehör" },
  { name: "Handyhalterung Auto", price: 12.99, imageUrl: "/src/assets/Handyhalter.png", category: "Autozubehör" },
  { name: "Taschenlampe", price: 14.99, imageUrl: "/src/assets/Taschenlampe.png", category: "Autozubehör" },
  { name: "Kraftstoffkanister", price: 8.99, imageUrl: "/src/assets/Kanister.png", category: "Autozubehör" },

  { name: "Oversized Hoodie Schwarz", price: 24.99, imageUrl: "/src/assets/Hoodie.png", category: "Bekleidung & Accessoires" },
  { name: "Oversized Hoodie Blau", price: 19.99, imageUrl: "/src/assets/Hoodie 3.png", category: "Bekleidung & Accessoires" },
];

const gefiltert = computed(() =>
    alleArtikel.filter(a => a.category === kategorie)
);
</script>

<template>
  <div class="container">
    <h1 class="title">{{ kategorie }}</h1>

    <div class="grid">
      <ArticleCard
          v-for="(item, i) in gefiltert"
          :key="i"
          :name="item.name"
          :price="item.price"
          :imageUrl="item.imageUrl"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
