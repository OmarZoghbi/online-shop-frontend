<script setup lang="ts">
import ArticleCard from './ArticleCard.vue'

const articles = [
  {
    name: "Oversized Hoodie Schwarz",
    price: 24.99,
    imageUrl: "/src/assets/Hoodie.png",
    badge: "Neu"
  },
  {
    name: "Oversized Hoodie Beige",
    price: 19.99,
    imageUrl: "/src/assets/Hoodie 2.png",
    badge: "20%"
  },
  {
    name: "Oversized Hoodie Hellblau",
    price: 19.99,
    imageUrl: "/src/assets/Hoodie 3.png",
    badge: "10%"
  },
  {
    name: "Unisex Hoodie – Modern Fit | Stylischer Grauton",
    price: 29.99,
    imageUrl: "/src/assets/Hoodie 4.png"
  },
  {
    name: "Warndreieck - Klappbar & Hochreflektierend",
    price: 9.99,
    imageUrl: "/src/assets/Warndreieck.png"
  },

  { name: "HandyHalterung fürs Auto",
    price: 12.99,
    imageUrl: "/src/assets/Handyhalter.png"
  },

  { name: "Multifunktions-Taschenlampe – LED, Notlicht",
    price: 14.99,
    imageUrl: "/src/assets/Taschenlampe.png"

  },
  {
    name: "Kraftstoffkanister",
    price: 8.99,
    imageUrl: "/src/assets/Kanister.png"
  },
  {
    name: "Starthilfekabel",
    price: 11.99,
    imageUrl: "/src/assets/Kabel.png"
  },
  {
    name: "Fußmatten Set – Universal, Rutschfest & Leicht zu Reinigen ",
    price: 18.99,
    imageUrl: "/src/assets/Fußmatten.png"
  }
]
</script>

<template>
  <section class="article-list">
    <h2>Artikelübersicht</h2>

    <div class="grid">
      <ArticleCard
          v-for="(item, index) in articles"
          :key="index"
          :name="item.name"
          :price="item.price"
          :imageUrl="item.imageUrl"
          :badge="item.badge"
      />
    </div>
  </section>
</template>

<style scoped>
.article-list {
  padding: 10px 0 30px;
}

.article-list h2 {
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 Spalten auf Desktop */
  gap: 20px;
  padding: 0 20px;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* 3 Spalten auf Tablets */
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 Spalten auf Smartphones */
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr; /* 1 Spalte auf kleinen Geräten */
  }
}



</style>