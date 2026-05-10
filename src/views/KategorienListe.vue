<script setup lang="ts">
import bgImage from "@/assets/Atlas Shop.png";

const kategorien = [
  { name: "Autozubehör", icon: "🚗" },
  { name: "Bekleidung & Accessoires", icon: "👕" },
  { name: "Unterhaltungselektronik", icon: "🎧" },
  { name: "Sport & Unterhaltung", icon: "🏀" },
  { name: "Schmuck, Brillen & Uhren", icon: "💎" },
  { name: "Verpackung & Druck", icon: "📦" },
  { name: "Haus & Garten", icon: "🏡" },
  { name: "Kosmetikartikel", icon: "💄" },
];

const pageStyle: Record<string, string> = {
  "--bg": `url(${bgImage})`,
};
</script>

<template>
  <div class="page" :style="pageStyle">
    <div class="container">
      <h1 class="title">Alle Kategorien</h1>

      <div class="grid">
        <RouterLink
            v-for="k in kategorien"
            :key="k.name"
            :to="`/kategorie/${encodeURIComponent(k.name)}`"
            class="card"
        >
          <div class="icon">{{ k.icon }}</div>
          <div class="name">{{ k.name }}</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.page {
  position: relative;
  min-height: 100vh;
  --gold-main: #fad961;
  --gold-soft: rgba(255, 230, 150, 0.95);
  --gold-muted: rgba(255, 220, 120, 0.85);
  --gold-glow: rgba(250, 217, 97, 0.55);
}

.page::before,
.page::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.page::before {
  background: var(--bg) center / cover no-repeat;
  z-index: -2;
}

.page::after {
  background: rgba(0, 0, 0, 0.75);
  z-index: -1;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.title {
  font-size: 2.3rem;
  margin-bottom: 12px;
  color: var(--gold-main);
  text-shadow: 0 0 8px var(--gold-glow);
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  justify-items: center;
}

.card {
  background: rgba(8, 41, 73, 0.9);
  border: 1px solid rgba(250, 217, 97, 0.45);
  border-radius: 18px;
  width: 240px;
  height: 240px;
  padding: 24px 16px;
  text-align: center;
  text-decoration: none;
  color: #fad961;
  transition: 0.28s ease;
  box-shadow:
      0 0 18px rgba(0, 0, 0, 0.28),
      0 0 14px rgba(250, 217, 97, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 45px;
  margin-bottom: 10px;
  line-height: 1;
}

.name {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  min-height: 62px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-wrap: break-word;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 1.6rem;
  }
}
</style>