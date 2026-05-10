<script setup lang="ts">
import { ref } from "vue";
import bgImage from "@/assets/Atlas Shop.png";

const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");
const file = ref<File | null>(null);
const privacyAccepted = ref(false);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0] ?? null;
}

function submitForm() {
  console.log({
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
    file: file.value,
    privacyAccepted: privacyAccepted.value,
  });
}

function goBack() {
  window.history.back();
}
</script>

<template>
  <div class="contact-page" :style="{ '--bg': `url(${bgImage})` }">
    <div class="contact-content-layer">
      <section class="contact-card">
        <header class="contact-header">
          <h2>Kontakt</h2>
          <p class="contact-subtitle">
            Bei Fragen oder Hilfe – schreib uns.
            Wir melden uns schnellstmöglich.
          </p>
        </header>

        <form class="contact-form" @submit.prevent="submitForm">
          <label for="name">
            Name
            <input id="name" type="text" v-model="name" required />
          </label>

          <label for="email">
            E-Mail
            <input id="email" type="email" v-model="email" required />
          </label>

          <label for="subject">
            Betreff
            <input id="subject" type="text" v-model="subject" required />
          </label>

          <label for="message">
            Nachricht
            <textarea id="message" rows="6" v-model="message" required></textarea>
          </label>

          <label for="file">
            Datei (optional)
            <input
                id="file"
                class="file-input"
                type="file"
                @change="handleFileChange"
            />
          </label>

          <label class="privacy" for="privacy">
            <input id="privacy" type="checkbox" v-model="privacyAccepted" required />
            <span>
              Ich akzeptiere die
              <a href="/privacy">Datenschutzrichtlinie</a>.
            </span>
          </label>

          <button type="submit" class="btn-primary">Absenden</button>
          <button type="button" class="btn-back" @click="goBack">
            Zurück
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ===============================
   THEME
================================ */
.contact-page {
  position: relative;
  min-height: 100vh;

  --gold-main: #fad961;
  --gold-soft: rgba(255, 230, 150, 0.95);
  --gold-muted: rgba(255, 220, 120, 0.85);
  --gold-glow: rgba(250, 217, 97, 0.55);
}

/* ===============================
   BACKGROUND
================================ */
.contact-page::before,
.contact-page::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.contact-page::before {
  background: var(--bg) center / cover no-repeat;
  z-index: -2;
}

.contact-page::after {
  background: rgba(0, 0, 0, 0.75);
  z-index: -1;
}

/* ===============================
   LAYOUT
================================ */
.contact-content-layer {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 80px 60px;
  width: 100%;
}

.contact-card {
  width: 100%;
  max-width: 900px;
  padding: 48px 60px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 22px;
  border: 1px solid rgba(255, 230, 150, 0.25);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.28);
}
.contact-form {
  max-width: 100%;
  margin: 0 auto;
}

/* ===============================
   HEADER
================================ */
.contact-header {
  text-align: center;
  margin-bottom: 36px;
}

.contact-header h2 {
  font-size: 2.3rem;
  margin-bottom: 12px;
  color: var(--gold-main);
  text-shadow: 0 0 8px var(--gold-glow);
}

.contact-subtitle {
  font-size: 1.05rem;
  color: var(--gold-muted);
  line-height: 1.5;
}

/* ===============================
   FORM CONTAINER
================================ */


/* ===============================
   FORM ELEMENTS
================================ */
.contact-form label {
  display: block;
  margin-bottom: 18px;
  font-weight: 600;
  color: var(--gold-soft);
}

.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form textarea {
  display: block;
  width: 100%;
  margin-top: 6px;
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
}

.contact-form textarea {
  resize: vertical;
  min-height: 140px;
}

.file-input {
  display: block;
  width: 100%;
  margin-top: 6px;
  color: var(--gold-soft);
}

/* ===============================
   PRIVACY
================================ */
.privacy {
  display: flex !important;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--gold-soft);
  margin: 24px 0 32px;
}

.privacy input[type="checkbox"] {
  width: auto;
  margin: 3px 0 0;
  flex-shrink: 0;
}

.privacy a {
  color: var(--gold-main);
  text-decoration: underline;
}

/* ===============================
   BUTTONS
================================ */
button {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.25s ease;
}

.btn-primary {
  background: var(--gold-main);
  color: #000;
  border: none;
  margin-bottom: 12px;
  font-weight: 700;
}

.btn-primary:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

.btn-back {
  background: transparent;
  border: 1px solid var(--gold-muted);
  color: var(--gold-soft);
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.06);
}

@media (max-width: 640px) {
  .contact-card {
    padding: 28px 18px;
  }

  .contact-header h2 {
    font-size: 1.9rem;
  }

  .contact-subtitle {
    font-size: 0.98rem;
  }
}
</style>