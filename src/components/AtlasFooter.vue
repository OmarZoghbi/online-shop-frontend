<script setup lang="ts">
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Alle Kategorien", to: "/kategorien" },
  { label: "Suche", to: "/suche" },
  { label: "Datenschutz-Einstellungen", to: "/datenschutz" },
];

const helpLinks = [
  { label: "Kontakt", to: "/kontakt" },
  { label: "Über uns", to: "/about" },
  { label: "Warum Atlas Store?", to: "/warum-wir" },
  { label: "Häufige Fragen", to: "/faq" },
];

const legalLinks = [
  { label: "Zahlung und Versand", to: "/zahlung-und-versand" },
  { label: "Widerrufsbelehrung", to: "/widerruf" },
  { label: "AGB", to: "/agb" },
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutzerklärung", to: "/datenschutz" },
];
</script>

<template>
  <footer class="footer">
    <div class="footer__glow"></div>

    <div class="footer__inner">
      <!-- Top -->
      <div class="footer__top">
        <div class="footer__brand">
          <h2 class="footer__logo">ATLAS STORE</h2>
          <p class="footer__text">
            Premium-Produkte für Technik, Lifestyle und Alltag – in einem klaren,
            stilvollen und modernen Einkaufserlebnis.
          </p>
        </div>

        <div class="footer__trust">
          <div class="trust-card">
            <span class="trust-card__badge">✓</span>
            <div>
              <strong>Mitglied Händlerbund</strong>
              <p>Verlässlicher Onlinehandel</p>
            </div>
          </div>

          <div class="trust-card">
            <span class="trust-card__badge">★</span>
            <div>
              <strong>Sicher einkaufen</strong>
              <p>Geschützte Bestellung & Zahlung</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="footer__grid">
        <div class="footer__column">
          <h3>Schnelle Links</h3>
          <RouterLink
              v-for="item in quickLinks"
              :key="item.label"
              :to="item.to"
              class="footer__link"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="footer__column">
          <h3>Hilfe & Unterstützung</h3>
          <RouterLink
              v-for="item in helpLinks"
              :key="item.label"
              :to="item.to"
              class="footer__link"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="footer__column">
          <h3>Rechtliches</h3>
          <RouterLink
              v-for="item in legalLinks"
              :key="item.label"
              :to="item.to"
              class="footer__link"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="footer__column footer__column--newsletter">
          <h3>Newsletter</h3>
          <p class="footer__newsletter-text">
            Abonniere exklusive Angebote und Neuheiten. Jederzeit kündbar.
          </p>

          <form class="newsletter-form">
            <input
                type="email"
                placeholder="E-Mail"
                class="newsletter-form__input"
            />
            <button type="submit" class="newsletter-form__button">
              →
            </button>
          </form>

          <div class="footer__socials">
            <a href="#" class="social-pill">f</a>
            <a href="#" class="social-pill">ig</a>
            <a href="#" class="social-pill">yt</a>
            <a href="#" class="social-pill">t</a>
            <a href="#" class="social-pill">x</a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer__bottom">
        <span>© 2026 Atlas Store. Alle Rechte vorbehalten.</span>
        <span>Premium Shopping im Blau-Gold-Stil.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.footer {
  position: relative;
  overflow: hidden;
  margin-top: 40px;
  padding: 70px 24px 24px;
  background: linear-gradient(180deg, rgba(7, 31, 56, 0.96) 0%, rgba(4, 22, 41, 0.98) 100%);
  border-top: 1px solid rgba(250, 217, 97, 0.24);
  box-shadow:
      0 -10px 30px rgba(0, 0, 0, 0.22),
      0 0 24px rgba(250, 217, 97, 0.08) inset;
}

.footer__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
      radial-gradient(circle at top center, rgba(250, 217, 97, 0.12), transparent 40%),
      linear-gradient(to bottom, rgba(250, 217, 97, 0.04), transparent 30%);
}

.footer__inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
}

.footer__top {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  align-items: flex-start;
  margin-bottom: 42px;
}

.footer__brand {
  max-width: 520px;
}

.footer__logo {
  margin: 0 0 14px;
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: 1px;
  color: #fad961;
  text-shadow:
      0 0 12px rgba(250, 217, 97, 0.22),
      0 0 28px rgba(250, 217, 97, 0.08);
}

.footer__text {
  margin: 0;
  color: rgba(255, 239, 185, 0.86);
  line-height: 1.7;
  font-size: 1rem;
}

.footer__trust {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.trust-card {
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(250, 217, 97, 0.26);
  box-shadow:
      0 10px 28px rgba(0, 0, 0, 0.24),
      0 0 16px rgba(250, 217, 97, 0.08);
}

.trust-card__badge {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f9d46a 0%, #d6a53a 100%);
  color: #082949;
  font-weight: 900;
  flex-shrink: 0;
}

.trust-card strong {
  display: block;
  margin-bottom: 4px;
  color: #fff1bf;
  font-size: 1rem;
}

.trust-card p {
  margin: 0;
  color: rgba(255, 239, 185, 0.76);
  font-size: 0.92rem;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.15fr;
  gap: 34px;
  padding: 34px 0;
  border-top: 1px solid rgba(250, 217, 97, 0.12);
  border-bottom: 1px solid rgba(250, 217, 97, 0.12);
}

.footer__column h3 {
  margin: 0 0 18px;
  color: #fff1bf;
  font-size: 1.3rem;
  font-weight: 800;
}

.footer__link {
  display: block;
  margin-bottom: 12px;
  color: rgba(255, 239, 185, 0.78);
  text-decoration: none;
  line-height: 1.55;
  transition: 0.22s ease;
}

.footer__link:hover {
  color: #fad961;
  transform: translateX(2px);
}

.footer__newsletter-text {
  margin: 0 0 16px;
  color: rgba(255, 239, 185, 0.8);
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(250, 217, 97, 0.24);
  background: rgba(255, 255, 255, 0.06);
  margin-bottom: 20px;
}

.newsletter-form__input {
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 16px;
  background: transparent;
  color: #fff;
  font-size: 0.98rem;
}

.newsletter-form__input::placeholder {
  color: rgba(255, 239, 185, 0.58);
}

.newsletter-form__button {
  border: none;
  min-width: 58px;
  height: 50px;
  cursor: pointer;
  background: #fad961;
  color: #082949;
  font-size: 1.2rem;
  font-weight: 900;
  transition: 0.22s ease;
}

.newsletter-form__button:hover {
  background: #ffeaa3;
}

.footer__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.social-pill {
  min-width: 42px;
  height: 42px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fad961;
  font-weight: 800;
  border: 1px solid rgba(250, 217, 97, 0.24);
  background: rgba(255, 255, 255, 0.05);
  transition: 0.22s ease;
}

.social-pill:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(250, 217, 97, 0.42);
  transform: translateY(-2px);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 18px;
  color: rgba(255, 239, 185, 0.62);
  font-size: 0.92rem;
}

@media (max-width: 1100px) {
  .footer__top {
    flex-direction: column;
  }

  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 700px) {
  .footer {
    padding: 56px 18px 22px;
  }

  .footer__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer__bottom {
    flex-direction: column;
  }

  .trust-card {
    min-width: 0;
    width: 100%;
  }
}
</style>