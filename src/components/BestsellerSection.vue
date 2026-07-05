<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useCart } from "@/stores/cart";


const { addToCart } = useCart();

function parseEuroPrice(price: string): number {
  return Number(
      price
          .replace("€", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
  );
}

function addBestsellerToCart(product: Product): void {
  addToCart({
    id: product.id,
    name: product.name,
    category: product.category,
    price: parseEuroPrice(product.price),
    oldPrice: product.oldPrice ? parseEuroPrice(product.oldPrice) : undefined,
    badge: product.badge,
    emoji: product.emoji,
  });
}

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  emoji: string;
  moq: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Premium Bluetooth Kopfhörer",
    category: "Elektronik",
    price: "89,99 €",
    oldPrice: "119,99 €",
    badge: "-25%",
    emoji: "🎧",
    moq: "MOQ: 1",
  },
  {
    id: 2,
    name: "Elegante Designer Uhr",
    category: "Schmuck & Uhren",
    price: "149,99 €",
    oldPrice: "189,99 €",
    badge: "Bestseller",
    emoji: "⌚",
    moq: "MOQ: 1",
  },
  {
    id: 3,
    name: "Luxus Duftkerzen Set",
    category: "Haus & Garten",
    price: "39,99 €",
    oldPrice: "54,99 €",
    badge: "Neu",
    emoji: "🕯️",
    moq: "MOQ: 1",
  },
  {
    id: 4,
    name: "Premium Auto Pflege Set",
    category: "Autozubehör",
    price: "59,99 €",
    oldPrice: "79,99 €",
    badge: "Top",
    emoji: "🚘",
    moq: "MOQ: 1",
  },
  {
    id: 5,
    name: "Goldene Sonnenbrille Classic",
    category: "Accessoires",
    price: "69,99 €",
    oldPrice: "94,99 €",
    badge: "Exklusiv",
    emoji: "🕶️",
    moq: "MOQ: 1",
  },
  {
    id: 6,
    name: "Smart Home Lichtsystem",
    category: "Elektronik",
    price: "129,99 €",
    oldPrice: "169,99 €",
    badge: "-20%",
    emoji: "💡",
    moq: "MOQ: 1",
  },
];

const currentIndex = ref(0);
const visibleCards = ref(5);

function updateVisibleCards(): void {
  const width = window.innerWidth;

  if (width <= 520) {
    visibleCards.value = 1;
  } else if (width <= 760) {
    visibleCards.value = 2;
  } else if (width <= 980) {
    visibleCards.value = 3;
  } else if (width <= 1280) {
    visibleCards.value = 4;
  } else {
    visibleCards.value = 5;
  }

  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
}

const maxIndex = computed(() =>
    Math.max(products.length - visibleCards.value, 0)
);

const isPrevDisabled = computed(() => currentIndex.value === 0);
const isNextDisabled = computed(() => currentIndex.value >= maxIndex.value);

function scrollPrev(): void {
  if (isPrevDisabled.value) return;
  currentIndex.value -= 1;
}

function scrollNext(): void {
  if (isNextDisabled.value) return;
  currentIndex.value += 1;
}

onMounted(() => {
  updateVisibleCards();
  window.addEventListener("resize", updateVisibleCards);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateVisibleCards);
});
</script>

<template>
  <section class="bestseller">
    <div class="bestseller__inner">
      <div class="bestseller__panel">
        <div class="bestseller__header">
          <span class="bestseller__eyebrow">ATLAS STORE</span>

          <h2 class="bestseller__title">Unsere Bestseller</h2>

          <div class="bestseller__highlights">
            <span class="bestseller__highlight">● Premium-Auswahl</span>
            <span class="bestseller__highlight">● Sicher bezahlen</span>
            <span class="bestseller__highlight">● Schneller Versand</span>
          </div>

          <RouterLink to="/kategorien" class="bestseller__cta">
            Jetzt entdecken
          </RouterLink>
        </div>

        <div class="bestseller__slider">
          <button
              type="button"
              class="bestseller__arrow bestseller__arrow--left"
              :disabled="isPrevDisabled"
              @click="scrollPrev"
              aria-label="Vorherige Produkte"
          >
            ‹
          </button>

          <div
              class="bestseller__viewport"
              :style="{
              '--visible-cards': String(visibleCards),
              '--current-index': String(currentIndex),
            }"
          >
            <div class="bestseller__track">
              <article
                  v-for="product in products"
                  :key="product.id"
                  class="product-card"
              >
                <div class="product-card__tag-row">
                  <span class="product-card__tag">
                    {{ product.badge || "Atlas" }}
                  </span>
                </div>

                <div class="product-card__media">
                  <div class="product-card__emoji">
                    {{ product.emoji }}
                  </div>
                </div>

                <div class="product-card__body">
                  <span class="product-card__category">
                    {{ product.category }}
                  </span>

                  <h3 class="product-card__title">
                    {{ product.name }}
                  </h3>

                  <div class="product-card__price-row">
                    <strong class="product-card__price">{{ product.price }}</strong>
                    <span
                        v-if="product.oldPrice"
                        class="product-card__old-price"
                    >
                      {{ product.oldPrice }}
                    </span>
                  </div>

                  <p class="product-card__moq">
                    {{ product.moq }}
                  </p>

                  <div class="product-card__actions">
                    <button
                        type="button"
                        class="product-card__btn product-card__btn--primary"
                        @click="addBestsellerToCart(product)"
                    >
                      In den Warenkorb
                    </button>

                    <button
                        type="button"
                        class="product-card__btn product-card__btn--secondary"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <button
              type="button"
              class="bestseller__arrow bestseller__arrow--right"
              :disabled="isNextDisabled"
              @click="scrollNext"
              aria-label="Nächste Produkte"
          >
            ›
          </button>
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

.bestseller {
  position: relative;
  z-index: 1;
  padding: 26px 28px 90px;
}

.bestseller__inner {
  max-width: 1320px;
  margin: 0 auto;
}

.bestseller__panel {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 28px 22px 20px;
  background: linear-gradient(
      135deg,
      rgba(8, 41, 73, 0.96) 0%,
      rgba(12, 49, 86, 0.94) 55%,
      rgba(7, 31, 56, 0.96) 100%
  );
  border: 1px solid rgba(250, 217, 97, 0.22);
  box-shadow:
      0 0 28px rgba(250, 217, 97, 0.08),
      0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.bestseller__panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
      radial-gradient(circle at top center, rgba(250, 217, 97, 0.12), transparent 34%),
      radial-gradient(circle at left, rgba(255, 255, 255, 0.05), transparent 30%),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03), transparent);
  pointer-events: none;
}

.bestseller__header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 24px;
}

.bestseller__eyebrow {
  display: inline-block;
  margin-bottom: 14px;
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

.bestseller__title {
  margin: 0 0 12px;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.1;
  color: #fff1bf;
  text-shadow:
      0 0 12px rgba(250, 217, 97, 0.18),
      0 0 28px rgba(250, 217, 97, 0.08);
}

.bestseller__highlights {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-bottom: 18px;
}

.bestseller__highlight {
  font-size: 0.98rem;
  font-weight: 700;
  color: rgba(255, 241, 191, 0.92);
}

.bestseller__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 800;
  color: #082949;
  background: #fad961;
  box-shadow: 0 0 16px rgba(250, 217, 97, 0.26);
  transition: 0.25s ease;
}

.bestseller__cta:hover {
  background: #ffeaa3;
  transform: translateY(-2px);
}

.bestseller__slider {
  position: relative;
  z-index: 1;
}

.bestseller__viewport {
  --gap: 18px;
  --card-width: calc(
      (100% - (var(--visible-cards) - 1) * var(--gap)) / var(--visible-cards)
  );
  overflow: hidden;
}

.bestseller__track {
  display: flex;
  gap: var(--gap);
  transform: translateX(
      calc(-1 * var(--current-index) * (var(--card-width) + var(--gap)))
  );
  transition: transform 0.35s ease;
}

.product-card {
  flex: 0 0 var(--card-width);
  min-width: 0;
}

.bestseller__arrow {
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  top: 50%;
  z-index: 3;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.9rem;
  line-height: 1;
  color: #082949;
  background: #fad961;
  box-shadow:
      0 10px 22px rgba(0, 0, 0, 0.22),
      0 0 14px rgba(250, 217, 97, 0.18);
  transform: translateY(-50%);
  transition:
      background 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
}

.bestseller__arrow:hover:not(:disabled) {
  background: #ffeaa3;
  transform: translateY(-50%) scale(1.04);
}

.bestseller__arrow:disabled {
  cursor: pointer;
  color: rgba(8, 41, 73, 0.45);
  background: rgba(250, 217, 97, 0.55);
  box-shadow:
      0 6px 14px rgba(0, 0, 0, 0.08),
      0 0 10px rgba(250, 217, 97, 0.08);
  transform: translateY(-50%);
}

.bestseller__arrow--left {
  left: -8px;
}

.bestseller__arrow--right {
  right: -8px;
}

.product-card {
  flex: 0 0
  calc((100% - (var(--visible-cards) - 1) * var(--gap)) / var(--visible-cards));
  min-width: 0;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(
      180deg,
      rgba(14, 54, 94, 0.96) 0%,
      rgba(9, 39, 69, 0.98) 100%
  );
  border: 1px solid rgba(250, 217, 97, 0.2);
  box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.22),
      0 0 18px rgba(250, 217, 97, 0.06);
}

.product-card__tag-row {
  padding: 10px 10px 0;
}

.product-card__tag {
  display: inline-block;
  padding: 4px 9px;
  border-radius: 10px;
  font-size: 0.72rem;
  font-weight: 800;
  color: #082949;
  background: #fad961;
  box-shadow: 0 0 10px rgba(250, 217, 97, 0.16);
}

.product-card__media {
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px 2px;
}

.product-card__emoji {
  font-size: 3.4rem;
  line-height: 1;
  filter: drop-shadow(0 0 14px rgba(250, 217, 97, 0.18));
}

.product-card__body {
  padding: 2px 12px 14px;
}

.product-card__category {
  display: inline-block;
  margin-bottom: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 241, 191, 0.72);
}

.product-card__title {
  margin: 0 0 10px;
  min-height: 40px;
  font-size: 0.92rem;
  line-height: 1.3;
  color: #fff1bf;
}

.product-card__price-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
}

.product-card__price {
  font-size: 1.02rem;
  color: #fad961;
}

.product-card__old-price {
  font-size: 0.82rem;
  color: rgba(255, 241, 191, 0.5);
  text-decoration: line-through;
}

.product-card__moq {
  margin: 0 0 12px;
  font-size: 0.85rem;
  color: rgba(255, 241, 191, 0.82);
}

.product-card__actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.product-card__btn {
  padding: 10px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  transition: 0.25s ease;
}

.product-card__btn--primary {
  border: none;
  background: #fad961;
  color: #082949;
  box-shadow: 0 0 10px rgba(250, 217, 97, 0.22);
}

.product-card__btn--primary:hover {
  background: #ffeaa3;
  transform: translateY(-1px);
}

.product-card__btn--secondary {
  background: transparent;
  color: #f8e8a8;
  border: 1px solid rgba(250, 217, 97, 0.32);
}

.product-card__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.06);
}

@media (max-width: 760px) {
  .bestseller {
    padding: 18px 18px 70px;
  }

  .bestseller__panel {
    padding: 22px 16px 18px;
  }

  .bestseller__arrow--left {
    left: -2px;
  }

  .bestseller__arrow--right {
    right: -2px;
  }
}

@media (max-width: 520px) {
  .bestseller__title {
    font-size: 2rem;
  }

  .bestseller__highlight {
    font-size: 0.9rem;
  }

  .bestseller__arrow {
    width: 42px;
    height: 42px;
    font-size: 1.6rem;
  }
}
</style>