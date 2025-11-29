<template>
  <section class="product-list-wrapper">
    <header class="product-list-header">
      <h2>Produkte</h2>
      <p v-if="!loading && !error">
        {{ products.length }} Artikel gefunden
      </p>
      <p v-if="loading">Produkte werden geladen...</p>
      <p v-if="error" class="error-text">
        {{ error }}
      </p>
    </header>

    <div v-if="!loading && !error" class="product-grid">
      <ProductCard
          v-for="p in products"
          :key="p.id"
          :product="p"
          @add-to-cart="handleAddToCart"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getProducts, type Product } from "../api/shopApi";
import ProductCard from "./ProductCard.vue";

const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    products.value = await getProducts();
  } catch (err) {
    console.error(err);
    error.value = "Fehler beim Laden der Produkte. Bitte später erneut versuchen.";
  } finally {
    loading.value = false;
  }
});

function handleAddToCart(product: Product) {
  // hier vorerst nur loggen – Warenkorb machen wir im nächsten Schritt schöner
  console.log("In den Warenkorb:", product);
}
</script>

<style scoped>
.product-list-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
}

.product-list-header {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 1.5rem;
}

.product-list-header h2 {
  font-size: 1.6rem;
  margin: 0;
}

.error-text {
  color: #b91c1c;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1rem;
}
</style>
