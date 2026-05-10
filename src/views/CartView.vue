<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useCart } from "@/stores/cart";
import bgImage from "@/assets/Atlas Shop.png";

const {
  items,
  totalItems,
  totalPrice,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = useCart();

const isEmpty = computed(() => items.value.length === 0);

function formatPrice(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
</script>

<template>
  <section
      class="cart-page"
      :style="{ '--cart-bg-image': `url(${bgImage})` }"
  >
    <div class="cart-page__overlay"></div>

    <div class="cart-page__inner">
      <header class="cart-page__header">
        <span class="cart-page__eyebrow">ATLAS STORE</span>
        <h1 class="cart-page__title">Warenkorb</h1>
      </header>

      <div v-if="isEmpty" class="cart-empty">
        <div class="cart-empty__icon">🛒</div>

        <h2 class="cart-empty__title">Dein Warenkorb ist leer</h2>

        <div class="cart-empty__trust">
          <p class="cart-empty__trust-item">Atlas Store.de Käuferschutz</p>
          <p class="cart-empty__trust-item">Sicherer Zahlungsverkehr</p>
          <p class="cart-empty__trust-item">Garantierte Lieferung</p>
          <p class="cart-empty__trust-item">Rückgaberecht</p>
        </div>

        <RouterLink to="/kategorien" class="cart-empty__button">
          Weiter shoppen
        </RouterLink>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <article
              v-for="item in items"
              :key="item.id"
              class="cart-item"
          >
            <div class="cart-item__media">
              <span class="cart-item__emoji">{{ item.emoji || "📦" }}</span>
            </div>

            <div class="cart-item__info">
              <span class="cart-item__category">{{ item.category }}</span>
              <h2 class="cart-item__name">{{ item.name }}</h2>
              <p class="cart-item__price">
                {{ formatPrice(item.price) }}
              </p>
            </div>

            <div class="cart-item__controls">
              <div class="cart-item__quantity">
                <button
                    type="button"
                    class="cart-item__quantity-btn"
                    @click="decreaseQuantity(item.id)"
                >
                  −
                </button>

                <span class="cart-item__quantity-value">
                  {{ item.quantity }}
                </span>

                <button
                    type="button"
                    class="cart-item__quantity-btn"
                    @click="increaseQuantity(item.id)"
                >
                  +
                </button>
              </div>

              <p class="cart-item__subtotal">
                {{ formatPrice(item.price * item.quantity) }}
              </p>

              <button
                  type="button"
                  class="cart-item__remove"
                  @click="removeFromCart(item.id)"
              >
                Entfernen
              </button>
            </div>
          </article>
        </div>

        <aside class="cart-summary">
          <h2 class="cart-summary__title">Zusammenfassung</h2>

          <div class="cart-summary__row">
            <span>Artikel</span>
            <span>{{ totalItems }}</span>
          </div>

          <div class="cart-summary__row cart-summary__row--total">
            <span>Gesamt</span>
            <strong>{{ formatPrice(totalPrice) }}</strong>
          </div>

          <RouterLink to="/kategorien" class="cart-summary__secondary">
            Weiter shoppen
          </RouterLink>

          <button type="button" class="cart-summary__primary">
            Zur Kasse
          </button>
        </aside>
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

.cart-page {
  position: relative;
  min-height: 100%;
  padding: 32px 28px 90px;
  overflow: hidden;
}

.cart-page__overlay {
  position: absolute;
  inset: 0;
  background:
      linear-gradient(
          180deg,
          rgba(6, 25, 46, 0.82) 0%,
          rgba(8, 41, 73, 0.84) 45%,
          rgba(5, 24, 43, 0.88) 100%
      ),
      var(--cart-bg-image) center / cover no-repeat;
  z-index: 0;
}

.cart-page__inner {
  position: relative;
  z-index: 1;
  max-width: 1320px;
  margin: 0 auto;
}

.cart-page__header {
  margin-bottom: 24px;
}

.cart-page__eyebrow {
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

.cart-page__title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  color: #fff1bf;
  text-shadow:
      0 0 14px rgba(250, 217, 97, 0.16),
      0 0 28px rgba(250, 217, 97, 0.08);
}

.cart-empty {
  max-width: 760px;
  margin: 0 auto;
  padding: 42px 28px;
  text-align: center;
  border-radius: 28px;
  background: linear-gradient(
      180deg,
      rgba(12, 49, 86, 0.92) 0%,
      rgba(8, 41, 73, 0.96) 100%
  );
  border: 1px solid rgba(250, 217, 97, 0.24);
  box-shadow:
      0 0 24px rgba(250, 217, 97, 0.08),
      0 18px 34px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.cart-empty__icon {
  margin-bottom: 18px;
  font-size: 3rem;
}

.cart-empty__title {
  margin: 0 0 22px;
  font-size: 2rem;
  color: #fff1bf;
}

.cart-empty__trust {
  margin-bottom: 26px;
}

.cart-empty__trust-item {
  margin: 0 0 10px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 241, 191, 0.84);
}

.cart-empty__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  padding: 14px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 800;
  color: #082949;
  background: #fad961;
  box-shadow: 0 0 16px rgba(250, 217, 97, 0.26);
  transition: 0.25s ease;
}

.cart-empty__button:hover {
  background: #ffeaa3;
  transform: translateY(-2px);
}

.cart-content {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.9fr);
  gap: 24px;
}

.cart-items {
  display: grid;
  gap: 18px;
}

.cart-item {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 24px;
  background: linear-gradient(
      180deg,
      rgba(12, 49, 86, 0.92) 0%,
      rgba(8, 41, 73, 0.96) 100%
  );
  border: 1px solid rgba(250, 217, 97, 0.24);
  box-shadow:
      0 0 24px rgba(250, 217, 97, 0.08),
      0 18px 34px rgba(0, 0, 0, 0.3);
}

.cart-item__media {
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background:
      radial-gradient(circle at top, rgba(250, 217, 97, 0.18), transparent 45%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
}

.cart-item__emoji {
  font-size: 3rem;
}

.cart-item__category {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 241, 191, 0.7);
}

.cart-item__name {
  margin: 0 0 10px;
  font-size: 1.15rem;
  line-height: 1.4;
  color: #fff1bf;
}

.cart-item__price {
  margin: 0;
  font-size: 1rem;
  color: #fad961;
}

.cart-item__controls {
  display: grid;
  justify-items: end;
  gap: 12px;
}

.cart-item__quantity {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(250, 217, 97, 0.24);
  background: rgba(255, 255, 255, 0.03);
}

.cart-item__quantity-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  color: #082949;
  background: #fad961;
}

.cart-item__quantity-value {
  min-width: 20px;
  text-align: center;
  font-weight: 800;
  color: #fff1bf;
}

.cart-item__subtotal {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #fff1bf;
}

.cart-item__remove {
  border: 1px solid rgba(250, 217, 97, 0.3);
  background: transparent;
  color: #f8e8a8;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
}

.cart-summary {
  align-self: start;
  padding: 22px;
  border-radius: 24px;
  background: linear-gradient(
      180deg,
      rgba(12, 49, 86, 0.92) 0%,
      rgba(8, 41, 73, 0.96) 100%
  );
  border: 1px solid rgba(250, 217, 97, 0.24);
  box-shadow:
      0 0 24px rgba(250, 217, 97, 0.08),
      0 18px 34px rgba(0, 0, 0, 0.3);
}

.cart-summary__title {
  margin: 0 0 18px;
  font-size: 1.4rem;
  color: #fff1bf;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 0;
  color: rgba(255, 241, 191, 0.84);
  border-bottom: 1px solid rgba(250, 217, 97, 0.14);
}

.cart-summary__row--total {
  margin-bottom: 22px;
  color: #fff1bf;
}

.cart-summary__secondary,
.cart-summary__primary {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 18px;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
}

.cart-summary__secondary {
  margin-bottom: 12px;
  border: 1px solid rgba(250, 217, 97, 0.3);
  background: transparent;
  color: #f8e8a8;
}

.cart-summary__primary {
  border: none;
  cursor: pointer;
  color: #082949;
  background: #fad961;
  box-shadow: 0 0 16px rgba(250, 217, 97, 0.26);
}

@media (max-width: 980px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 88px 1fr;
  }

  .cart-item__controls {
    grid-column: 1 / -1;
    justify-items: start;
  }
}

@media (max-width: 640px) {
  .cart-page {
    padding: 20px 18px 70px;
  }

  .cart-empty {
    padding: 34px 18px;
  }

  .cart-empty__title {
    font-size: 1.7rem;
  }
}
</style>