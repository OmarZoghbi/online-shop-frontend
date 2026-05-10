<script setup lang="ts">
const props = defineProps<{
  name: string
  price: number
  imageUrl: string
  badge?: string
}>();
</script>

<template>
  <article class="article-card">
    <div class="image-wrapper">
      <img :src="imageUrl" :alt="name" />
      <span v-if="badge" class="badge">{{ badge }}</span>
    </div>

    <div class="info">
      <h3 class="name">{{ name }}</h3>
      <p class="price">{{ price.toFixed(2) }} €</p>
      <button class="add-btn">In den Warenkorb</button>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(0,0,0,0.12);
}

.image-wrapper {
  position: relative;
  padding-top: 130%; /* H&M Bildformat */
  overflow: hidden;
}

.image-wrapper img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  left: 10px;
  top: 10px;
  background: #111;
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.info {
  padding: 12px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;            /* Info-Bereich füllt die verfügbare Höhe */
}

.name {
  font-size: 0.95rem;
  font-weight: 500;
}

.price {
  font-weight: 600;
  font-size: 0.95rem;
}

.add-btn {
  margin-top: auto;   /* Button nach ganz unten schieben */
  border: none;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  background: #111;
  color: #fff;
}


</style>
