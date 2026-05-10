<script setup lang="ts">
type FeaturedCategory = {
  title: string;
  text: string;
  slug: string;
};

type Stat = {
  value: string;
  label: string;
};

const trustPoints: string[] = [
  "Premium-Auswahl",
  "Sicher bezahlen",
  "Schneller Versand",
  "Exklusive Angebote",
];

const featuredCategories: FeaturedCategory[] = [
  {
    title: "Autozubehör",
    text: "Design und Funktion für moderne Fahrzeuge.",
    slug: "Autozubehör",
  },
  {
    title: "Elektronik",
    text: "Klare Technik, stilvoll präsentiert.",
    slug: "Unterhaltungselektronik",
  },
  {
    title: "Haus & Garten",
    text: "Produkte mit Komfort und Ästhetik.",
    slug: "Haus & Garten",
  },
];

const stats: Stat[] = [
  { value: "500+", label: "ausgewählte Produkte" },
  { value: "Top", label: "Angebote & Bestseller" },
  { value: "Schnell", label: "Versand & Service" },
];
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__left">
        <h1 class="hero__title">
          Entdecken Sie stilvolle Produkte
          <span class="hero__title-accent">zu starken Preisen</span>
        </h1>

        <p class="hero__text">
          Entdecken Sie ausgewählte Produkte mit modernem Look, klarer Qualität
          und exklusivem Atlas-Store-Design. Von Elektronik bis Haus &amp; Garten –
          alles in einer starken Premium-Umgebung.
        </p>

        <div class="hero__actions">
          <RouterLink to="/kategorien" class="hero__btn hero__btn--primary">
            Jetzt entdecken
          </RouterLink>
        </div>

        <div class="hero__trust">
          <span
              v-for="item in trustPoints"
              :key="item"
              class="hero__trust-item"
          >
            ✦ {{ item }}
          </span>
        </div>
      </div>

      <div class="hero__right">
        <div class="hero__panel">
          <div class="hero__panel-badge">Top-Kategorien</div>

          <h2 class="hero__panel-title">Shoppen Sie unsere Highlights</h2>

          <p class="hero__panel-text">
            Sorgfältig ausgewählte Bereiche für einen starken ersten Einstieg in
            den Shop.
          </p>

          <div class="hero__feature-list">
            <RouterLink
                v-for="item in featuredCategories"
                :key="item.title"
                :to="`/kategorie/${encodeURIComponent(item.slug)}`"
                class="hero__feature-card"
            >
              <div class="hero__feature-top">
                <span class="hero__feature-dot"></span>
                <span class="hero__feature-title">{{ item.title }}</span>
              </div>

              <p class="hero__feature-text">{{ item.text }}</p>
            </RouterLink>
          </div>
        </div>

        <div class="hero__stats">
          <div
              v-for="stat in stats"
              :key="stat.label"
              class="hero__stat-card"
          >
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.hero {
  position: relative;
  z-index: 1;
  padding: 210px 28px 90px;
}

.hero__inner {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 38px;
  align-items: start;
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeUp 0.9s ease forwards;
}

.hero__left {
  padding-top: 18px;
}

.hero__eyebrow {
  display: inline-block;
  margin-bottom: 18px;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #082949;
  background: linear-gradient(180deg, #f9d46a 0%, #d7a93e 100%);
  box-shadow:
      0 0 14px rgba(250, 217, 97, 0.28),
      inset 0 1px 1px rgba(255, 255, 255, 0.35);
}

.hero__title {
  margin: 0 0 20px;
  max-width: 760px;
  font-size: clamp(2.5rem, 5vw, 4.8rem);
  line-height: 1.05;
  font-weight: 900;
  color: #fff3c6;
  text-shadow:
      0 0 18px rgba(250, 217, 97, 0.18),
      0 0 40px rgba(250, 217, 97, 0.08);
}

.hero__title-accent {
  display: block;
  color: #fad961;
}

.hero__text {
  max-width: 680px;
  margin: 0 0 30px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(255, 241, 191, 0.9);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 210px;
  padding: 15px 26px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 800;
  transition: 0.25s ease;
}

.hero__btn--primary {
  background: #fad961;
  color: #082949;
  box-shadow: 0 0 16px rgba(250, 217, 97, 0.34);
  animation: glowPulse 2.6s ease-in-out infinite;
}

.hero__btn--primary:hover {
  background: #ffeaa3;
  transform: translateY(-2px);
}

.hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__trust-item {
  padding: 10px 14px;
  border-radius: 999px;
  color: #fff1bf;
  font-size: 0.95rem;
  background: rgba(8, 41, 73, 0.62);
  border: 1px solid rgba(250, 217, 97, 0.18);
  backdrop-filter: blur(8px);
}

.hero__right {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero__panel {
  border-radius: 28px;
  padding: 28px 24px;
  background: linear-gradient(
      180deg,
      rgba(12, 49, 86, 0.9) 0%,
      rgba(8, 41, 73, 0.94) 100%
  );
  border: 1px solid rgba(250, 217, 97, 0.34);
  box-shadow:
      0 0 28px rgba(250, 217, 97, 0.12),
      0 18px 44px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(12px);
}

.hero__panel-badge {
  display: inline-block;
  margin-bottom: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #082949;
  background: #fad961;
}

.hero__panel-title {
  margin: 0 0 8px;
  font-size: 1.7rem;
  color: #fff1bf;
}

.hero__panel-text {
  margin: 0 0 18px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(255, 235, 170, 0.84);
}

.hero__feature-list {
  display: grid;
  gap: 14px;
}

.hero__feature-card {
  position: relative;
  display: block;
  padding: 16px 42px 14px 16px;
  border-radius: 18px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(250, 217, 97, 0.16);
  transition: 0.25s ease;
}

.hero__feature-card::after {
  content: "→";
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  color: #fad961;
  font-size: 1.1rem;
  opacity: 0;
  transition: 0.25s ease;
}

.hero__feature-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(250, 217, 97, 0.34);
}

.hero__feature-card:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.hero__feature-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.hero__feature-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fad961;
  box-shadow: 0 0 10px rgba(250, 217, 97, 0.4);
  flex-shrink: 0;
}

.hero__feature-title {
  font-size: 1rem;
  font-weight: 800;
  color: #fff1bf;
}

.hero__feature-text {
  margin: 0;
  color: rgba(255, 235, 170, 0.8);
  line-height: 1.5;
  font-size: 0.93rem;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.hero__stat-card {
  padding: 18px 14px;
  border-radius: 20px;
  text-align: center;
  background: rgba(8, 41, 73, 0.72);
  border: 1px solid rgba(250, 217, 97, 0.22);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
}

.hero__stat-card strong {
  display: block;
  margin-bottom: 6px;
  font-size: 1.45rem;
  color: #fad961;
}

.hero__stat-card span {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 241, 191, 0.84);
  line-height: 1.4;
}

@keyframes heroFadeUp {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glowPulse {
  0%,
  100% {
    box-shadow: 0 0 16px rgba(250, 217, 97, 0.34);
  }
  50% {
    box-shadow:
        0 0 30px rgba(250, 217, 97, 0.62),
        0 0 54px rgba(250, 217, 97, 0.24);
  }
}

@media (max-width: 1100px) {
  .hero {
    padding-top: 200px;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .hero__left {
    padding-top: 0;
  }
}

@media (max-width: 700px) {
  .hero {
    padding: 185px 18px 60px;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__btn {
    width: 100%;
    min-width: 0;
  }

  .hero__stats {
    grid-template-columns: 1fr;
  }

  .hero__panel,
  .hero__stat-card {
    border-radius: 20px;
  }

  .hero__title {
    font-size: clamp(2.1rem, 9vw, 3rem);
  }

  .hero__text {
    font-size: 1rem;
  }

  .hero__feature-card {
    padding-right: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__inner,
  .hero__btn--primary {
    animation: none;
  }

  .hero__btn,
  .hero__feature-card,
  .hero__feature-card::after {
    transition: none;
  }
}
</style>