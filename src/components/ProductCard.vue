<template>
  <article class="product-card">
    <div class="product-image" v-if="product.imageUrl">
      <img :src="product.imageUrl" :alt="product.name" />
    </div>
    <div class="product-content">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-description">
        {{ product.description }}
      </p>
      <div class="product-footer">
        <span class="product-price">{{ product.price.toFixed(2) }} €</span>
        <button class="product-button" @click="$emit('add-to-cart', product)">
          In den Warenkorb
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "../api/api";

interface Props {
  product: Product;
}

defineProps<Props>();
defineEmits<{
  (e: "add-to-cart", product: Product): void;
}>();
</script>

<style scoped>
.product-card {
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
  background: #ffffff;
}

.product-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.product-description {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0.25rem 0 0.5rem;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-weight: 600;
  color: #111827;
}

.product-button {
  border: none;
  border-radius: 9999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  background: #111827;
  color: white;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
}

.product-button:hover {
  background: #1f2937;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}
</style>
