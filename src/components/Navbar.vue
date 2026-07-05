<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import KategorienSidebar from "@/components/KategorienSidebar.vue";
import { useCart } from "@/stores/cart";
import { RouterLink } from "vue-router";

type Language = {
  code: string;
  label: string;
};

type Currency = {
  id: string;
  code: string;
  name: string;
  country: string;
};

const emit = defineEmits<{
  (e: "leaveWelcome"): void;
}>();

const sidebarOpen = ref(false);
const currencyOpen = ref(false);
const accountOpen = ref(false);

const languages: Language[] = [
  { code: "DE", label: "Deutsch" },
  { code: "EN", label: "English" },
  { code: "IT", label: "Italiano" },
  { code: "PT", label: "Português" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "TR", label: "Türkçe" },
  { code: "AR", label: "العربية" },
];

const currencies: Currency[] = [
  { id: "de-eur", code: "EUR", name: "Euro", country: "Deutschland" },
  { id: "it-eur", code: "EUR", name: "Euro", country: "Italien" },
  { id: "fr-eur", code: "EUR", name: "Euro", country: "Frankreich" },
  { id: "es-eur", code: "EUR", name: "Euro", country: "Spanien" },
  { id: "us-usd", code: "USD", name: "US Dollar", country: "USA" },
];

const selectedLangCode = ref("DE");
const selectedCurrencyId = ref("de-eur");

const selectedLang = computed(
    () => languages.find((lang) => lang.code === selectedLangCode.value) ?? languages[0]
);

const selectedCountry = computed(
    () => currencies.find((currency) => currency.id === selectedCurrencyId.value) ?? currencies[0]
);

const { totalItems } = useCart();

/* Konto erstellen */
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const formError = ref("");
const formSuccess = ref("");

let successTimeout: number | null = null;

function closeSidebar() {
  sidebarOpen.value = false;
}

function toggleCurrency() {
  accountOpen.value = false;
  currencyOpen.value = !currencyOpen.value;
}

function closeCurrency() {
  currencyOpen.value = false;
}

function openAccountModal() {
  closeCurrency();
  formError.value = "";
  formSuccess.value = "";
  accountOpen.value = true;
}

function closeAccountModal() {
  accountOpen.value = false;
  formError.value = "";
  formSuccess.value = "";

  if (successTimeout) {
    clearTimeout(successTimeout);
    successTimeout = null;
  }
}

function resetRegisterForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}

function submitRegister() {
  formError.value = "";
  formSuccess.value = "";

  const trimmedFirstName = firstName.value.trim();
  const trimmedLastName = lastName.value.trim();
  const trimmedEmail = email.value.trim().toLowerCase();

  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !password.value || !confirmPassword.value) {
    formError.value = "Bitte fülle alle Felder aus.";
    return;
  }

  if (password.value.length < 6) {
    formError.value = "Das Passwort muss mindestens 6 Zeichen lang sein.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    formError.value = "Die Passwörter stimmen nicht überein.";
    return;
  }

  console.log("Neues Konto:", {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email: trimmedEmail,
  });

  formSuccess.value = "Konto erfolgreich vorbereitet.";
  resetRegisterForm();

  if (successTimeout) {
    clearTimeout(successTimeout);
  }

  successTimeout = window.setTimeout(() => {
    closeAccountModal();
  }, 1200);
}

onBeforeUnmount(() => {
  if (successTimeout) {
    clearTimeout(successTimeout);
  }
});
</script>

<template>
  <header class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo-animated" @click="emit('leaveWelcome')">
        ATLAS STORE
      </router-link>

      <router-link
          to="/kategorien"
          class="nav-link"
          @click="
          emit('leaveWelcome');
          closeSidebar();
        "
      >
        Alle Kategorien
      </router-link>

      <router-link
          to="/kontakt"
          class="nav-link"
          @click="
          emit('leaveWelcome');
          closeSidebar();
        "
      >
        Kontakt
      </router-link>

      <router-link
          to="/about"
          class="nav-link"
          @click="
          emit('leaveWelcome');
          closeSidebar();
        "
      >
        Über uns
      </router-link>
      <router-link
          to="/admin/products"
          class="nav-link"
          @click="
          emit('leaveWelcome');
          closeSidebar();
        "
      >
        Admin Produkte
      </router-link>

    </div>

    <div class="navbar-right">
      <div class="currency-wrapper">
        <button
            type="button"
            class="currency-trigger"
            :class="{ 'is-open': currencyOpen }"
            @click.stop="toggleCurrency"
            aria-haspopup="dialog"
            :aria-expanded="currencyOpen"
        >
          <span class="currency-trigger__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="globe-icon">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="M3 12h18" fill="none" stroke="currentColor" stroke-width="1.6" />
              <path d="M12 3a13 13 0 0 1 0 18" fill="none" stroke="currentColor" stroke-width="1.6" />
              <path d="M12 3a13 13 0 0 0 0 18" fill="none" stroke="currentColor" stroke-width="1.6" />
            </svg>
          </span>

          <span class="currency-trigger__value">
            {{ selectedLang.label }} · {{ selectedCountry.code }}
          </span>
        </button>

        <div v-if="currencyOpen" class="currency-popup" @click.stop>
          <div class="currency-popup__header">
            <div>
              <h3 class="popup-title">Sprache und Währung</h3>
              <p class="popup-sub">Passe deine Regionseinstellungen für den Shop an.</p>
            </div>

            <button type="button" class="popup-close" @click="closeCurrency" aria-label="Popup schließen">
              ×
            </button>
          </div>

          <div class="currency-current">
            <span class="currency-current__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" class="globe-icon globe-icon--popup">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
                <path d="M3 12h18" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path d="M12 3a13 13 0 0 1 0 18" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path d="M12 3a13 13 0 0 0 0 18" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </span>

            <div class="currency-current__text">
              <strong>{{ selectedLang.label }}</strong>
              <span>{{ selectedCountry.code }} · {{ selectedCountry.name }} · {{ selectedCountry.country }}</span>
            </div>
          </div>

          <label class="popup-label" for="lang-select">Sprache</label>
          <div class="popup-select-wrapper">
            <select id="lang-select" class="popup-select" v-model="selectedLangCode">
              <option v-for="l in languages" :key="l.code" :value="l.code">
                {{ l.label }}
              </option>
            </select>
          </div>

          <label class="popup-label" for="currency-select">Währung</label>
          <div class="popup-select-wrapper">
            <select id="currency-select" class="popup-select" v-model="selectedCurrencyId">
              <option v-for="c in currencies" :key="c.id" :value="c.id">
                {{ c.code }} – {{ c.name }} ({{ c.country }})
              </option>
            </select>
          </div>

          <div class="popup-actions">
            <button type="button" class="popup-btn popup-btn--secondary" @click="closeCurrency">
              Abbrechen
            </button>
            <button type="button" class="popup-btn" @click="closeCurrency">
              Speichern
            </button>
          </div>
        </div>
      </div>

      <div v-if="currencyOpen" class="dropdown-backdrop" @click="closeCurrency"></div>

      <RouterLink to="/warenkorb" class="cart-link" aria-label="Warenkorb">
        <span class="cart-icon">🛒</span>

        <span v-if="totalItems > 0" class="cart-badge">
    {{ totalItems }}
  </span>

      </RouterLink>

      <button type="button" class="icon-btn" aria-label="Benutzerkonto">
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="2" fill="none" />
        </svg>
      </button>

      <button type="button" class="btn-gold" @click="openAccountModal">
        Konto erstellen
      </button>
    </div>
  </header>

  <KategorienSidebar :open="sidebarOpen" :close="closeSidebar" />
  <div v-if="sidebarOpen" class="overlay" @click="closeSidebar"></div>

  <div v-if="accountOpen" class="account-backdrop" @click="closeAccountModal"></div>

  <div v-if="accountOpen" class="account-modal-wrap">
    <div class="account-modal" @click.stop>
      <button type="button" class="account-close" @click="closeAccountModal" aria-label="Modal schließen">
        ×
      </button>

      <h2 class="account-title">Konto erstellen</h2>
      <p class="account-subtitle">Erstelle dein Atlas-Store-Konto in wenigen Schritten.</p>

      <form class="account-form" @submit.prevent="submitRegister">
        <div class="account-grid">
          <label class="account-label">
            Vorname
            <input v-model="firstName" type="text" class="account-input" required />
          </label>

          <label class="account-label">
            Nachname
            <input v-model="lastName" type="text" class="account-input" required />
          </label>
        </div>

        <label class="account-label">
          E-Mail
          <input v-model="email" type="email" class="account-input" required />
        </label>

        <label class="account-label">
          Passwort
          <input v-model="password" type="password" class="account-input" required />
        </label>

        <label class="account-label">
          Passwort bestätigen
          <input v-model="confirmPassword" type="password" class="account-input" required />
        </label>

        <p v-if="formError" class="form-message form-error">{{ formError }}</p>
        <p v-if="formSuccess" class="form-message form-success">{{ formSuccess }}</p>

        <button type="submit" class="account-submit">Jetzt registrieren</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ================================
   NAVBAR
================================ */
.navbar {
  width: 100%;
  height: 130px;
  padding: 18px 80px 20px;
  background: #082949;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow:
      0 0 25px rgba(250, 217, 97, 0.35),
      0 0 12px rgba(250, 217, 97, 0.55) inset;
  border-bottom: 1px solid rgba(250, 217, 97, 0.35);
  position: fixed;
  top: 38px;
  left: 0;
  z-index: 200;
}

/* ================================
   LINKS
================================ */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

/* ================================
   GOLD-LOGO
================================ */
.logo-animated {
  font-size: 46px;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(
      90deg,
      #a6751b 0%,
      #f9d46a 25%,
      #fff4c4 50%,
      #f9d46a 75%,
      #a6751b 100%
  );
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation:
      goldGlow 4s linear infinite,
      goldShine 2.4s ease-in-out infinite;
  text-decoration: none !important;
  cursor: pointer;
}

@keyframes goldGlow {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}

@keyframes goldShine {
  0% {
    text-shadow:
        0 0 6px rgba(250, 217, 97, 0.2),
        0 0 15px rgba(255, 244, 196, 0.15);
  }
  50% {
    text-shadow:
        0 0 14px rgba(250, 217, 97, 0.7),
        0 0 28px rgba(255, 244, 196, 0.35);
  }
  100% {
    text-shadow:
        0 0 6px rgba(250, 217, 97, 0.2),
        0 0 15px rgba(255, 244, 196, 0.15);
  }
}

/* ================================
   NAV LINKS
================================ */
.nav-link {
  color: #fad961;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: 0.25s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: #fad961;
  transition: width 0.25s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* ================================
   RECHTE SEITE
================================ */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 28px;
}
.navbar span,
.navbar .icon {
  color: #fad961;

}

/* ================================
   WÄHRUNG / SPRACHE
================================ */
.currency-wrapper {
  position: relative;
  z-index: 301;
}

.currency-trigger {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border: 1px solid rgba(250, 217, 97, 0.35);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  color: #fad961;
  cursor: pointer;
  transition: 0.25s ease;
  min-height: 52px;
}

.currency-trigger:hover,
.currency-trigger.is-open {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(250, 217, 97, 0.6);
  box-shadow: 0 0 14px rgba(250, 217, 97, 0.14);
}

.currency-trigger__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fad961;
  flex-shrink: 0;
}

.globe-icon {
  width: 18px;
  height: 18px;
  display: block;
}

.currency-trigger__value {
  font-size: 16px;
  font-weight: 700;
  color: #fad961;
  white-space: nowrap;
}

.currency-popup {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  width: 380px;
  max-width: min(380px, calc(100vw - 24px));
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, #0c3156 0%, #082949 100%);
  border: 1px solid rgba(250, 217, 97, 0.35);
  box-shadow:
      0 0 28px rgba(250, 217, 97, 0.14),
      0 20px 45px rgba(0, 0, 0, 0.35);
  z-index: 300;
}

.currency-popup__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.popup-title {
  margin: 0 0 5px;
  color: #fad961;
  font-size: 18px;
  font-weight: 800;
}

.popup-sub {
  margin: 0;
  color: rgba(255, 235, 170, 0.88);
  font-size: 13px;
  line-height: 1.45;
}

.popup-close {
  background: transparent;
  border: none;
  color: #fad961;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.currency-current {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  margin-bottom: 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(250, 217, 97, 0.22);
}

.currency-current__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fad961;
  flex-shrink: 0;
}

.globe-icon--popup {
  width: 22px;
  height: 22px;
}

.currency-current__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.currency-current__text strong {
  color: #fff1bf;
  font-size: 14px;
}

.currency-current__text span {
  color: rgba(255, 235, 170, 0.82);
  font-size: 12px;
  line-height: 1.35;
}

.popup-label {
  display: block;
  margin-bottom: 6px;
  color: #f8e8a8;
  font-size: 13px;
  font-weight: 700;
}

.popup-select-wrapper {
  border: 1px solid rgba(250, 217, 97, 0.24);
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.popup-select-wrapper:focus-within {
  border-color: rgba(250, 217, 97, 0.75);
  box-shadow: 0 0 0 3px rgba(250, 217, 97, 0.12);
}

.popup-select {
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  color: #fff1bf;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  appearance: auto;
}

.popup-select option {
  background: #0c3156;
  color: #fff1bf;
}

.popup-select optgroup {
  background: #0c3156;
  color: #fad961;
}

.popup-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 8px;
}

.popup-btn {
  width: 100%;
  padding: 12px;
  background: #fad961;
  color: #082949;
  font-size: 14px;
  font-weight: 800;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 0 8px rgba(250, 217, 97, 0.32);
}

.popup-btn:hover {
  background: #ffeaa3;
  transform: translateY(-1px);
}

.popup-btn--secondary {
  background: transparent;
  color: #f8e8a8;
  border: 1px solid rgba(250, 217, 97, 0.35);
  box-shadow: none;
}

.popup-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.06);
}

.dropdown-backdrop {
  position: fixed;
  inset: 0;
  z-index: 299;
}

.cart-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  text-decoration: none;
}

.cart-icon {
  font-size: 1.5rem;
  line-height: 1;
}
.cart-badge {
  position: absolute;
  top: -10px;
  right: -12px;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ffd84d;
  color: #082949 !important;
  font-size: 0.75rem;
  font-weight: 900;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 5;
}

.navbar .cart-badge {
  color: #082949 !important;
}

/* ================================
   ICONS
================================ */
.icon-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.icon {
  width: 26px;
  height: 26px;
  stroke: #fad961;
  transition: 0.25s ease;
}

.icon:hover {
  transform: scale(1.15);
  opacity: 0.8;
}

/* ================================
   GOLD BUTTON
================================ */
.btn-gold {
  padding: 10px 22px;
  border-radius: 50px;
  background: #fad961;
  color: #082949;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 0 8px rgba(250, 217, 97, 0.6);
}

.btn-gold:hover {
  background: #ffeaa3;
  box-shadow: 0 0 12px rgba(250, 217, 97, 0.9);
  transform: translateY(-2px);
}

/* ================================
   OVERLAY (Sidebar)
================================ */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 150;
}

/* ================================
   ACCOUNT MODAL
================================ */
.account-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 399;
}

.account-modal-wrap {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 400;
}

.account-modal {
  position: relative;
  width: 100%;
  max-width: 540px;
  padding: 30px 26px 24px;
  border-radius: 22px;
  background: linear-gradient(180deg, #0c3156 0%, #082949 100%);
  border: 1px solid rgba(250, 217, 97, 0.35);
  box-shadow:
      0 0 28px rgba(250, 217, 97, 0.14),
      0 20px 45px rgba(0, 0, 0, 0.35);
}

.account-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fad961;
  font-size: 28px;
  cursor: pointer;
}

.account-title {
  margin: 0 0 8px;
  font-size: 30px;
  color: #fad961;
  text-align: center;
}

.account-subtitle {
  margin: 0 0 24px;
  color: rgba(255, 235, 170, 0.88);
  text-align: center;
  line-height: 1.5;
}

.account-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.account-label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #f8e8a8;
  font-size: 14px;
  font-weight: 600;
}

.account-input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(250, 217, 97, 0.24);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  outline: none;
}

.account-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.account-input:focus {
  border-color: rgba(250, 217, 97, 0.75);
  box-shadow: 0 0 0 3px rgba(250, 217, 97, 0.12);
}

.account-submit {
  margin-top: 8px;
  width: 100%;
  padding: 13px 16px;
  border: none;
  border-radius: 999px;
  background: #fad961;
  color: #082949;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0 0 10px rgba(250, 217, 97, 0.38);
}

.account-submit:hover {
  background: #ffeaa3;
  transform: translateY(-2px);
}

.form-message {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.form-error {
  color: #ffb7b7;
}

.form-success {
  color: #b8ffd5;
}

@media (max-width: 1100px) {
  .navbar {
    padding-left: 30px;
    padding-right: 30px;
  }

  .logo-animated {
    font-size: 38px;
  }

  .navbar-left {
    gap: 20px;
  }

  .navbar-right {
    gap: 18px;
  }
}

@media (max-width: 820px) {
  .navbar {
    height: auto;
    min-height: 110px;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    padding: 18px 20px;
  }

  .navbar-left,
  .navbar-right {
    flex-wrap: wrap;
    justify-content: center;
  }

  .account-grid {
    grid-template-columns: 1fr;
  }

  .currency-popup {
    right: 50%;
    transform: translateX(50%);
  }
}

@media (max-width: 560px) {
  .logo-animated {
    font-size: 30px;
  }

  .nav-link {
    font-size: 16px;
  }

  .account-modal {
    padding: 24px 18px 20px;
  }

  .account-title {
    font-size: 24px;
  }

  .currency-trigger__value {
    font-size: 14px;
  }

  .currency-popup {
    width: calc(100vw - 24px);
    padding: 18px;
  }
}
</style>