<script setup>
import bgImage from '@/assets/Atlas Shop.png'
</script>

<template>
  <div class="about-page" :style="{ '--bg': `url(${bgImage})` }">
    <div class="about-content-layer">

      <!-- HERO / HEADER -->
      <section class="about-header">
        <h1>Über uns</h1>
        <p class="about-subtitle">
          Dein Shop für Qualität, Alltagserleichterung und fairen Preis.
        </p>
      </section>

      <!-- INTRO -->
      <section class="about-content">
        <h2>Willkommen bei Atlas</h2>
        <p>
          Bei Atlas findest du moderne, zuverlässige und praktische Produkte,
          die den Alltag wirklich erleichtern.
          Unser Ziel ist es, hochwertige Artikel anzubieten,
          die langlebig sind, gut aussehen und trotzdem fair im Preis bleiben.
        </p>

        <h3>Wofür wir stehen</h3>
        <ul>
          <li><strong>Qualität</strong> – langlebige, sorgfältig ausgewählte Produkte.</li>
          <li><strong>Modernes Design</strong> – zeitlos, funktional und klar.</li>
          <li><strong>Schnelle Lieferung</strong> – zuverlässig &amp; sicher.</li>
          <li><strong>Faire Preise</strong> – ohne versteckte Kosten.</li>
          <li><strong>Echter Support</strong> – wir helfen, wenn du uns brauchst.</li>
        </ul>
      </section>

      <!-- STORY -->
      <section class="about-section">
        <h2>Unsere Geschichte</h2>
        <p>
          Atlas entstand aus dem Wunsch, einen Shop zu schaffen,
          dem man wirklich vertrauen kann.
          Zu oft erleben Kunden online schlechte Qualität
          oder enttäuschende Versprechen – das wollten wir ändern.
        </p>
        <p>
          Unser Fokus liegt auf Produkten,
          die einen echten Mehrwert bieten –
          ohne Schnickschnack, aber mit echtem Nutzen.
        </p>
      </section>

      <!-- MISSION -->
      <section class="about-section">
        <h2>Unsere Mission</h2>
        <p>
          Wir möchten hochwertige Produkte für jeden zugänglich machen.
          Dabei stehen Zuverlässigkeit, Transparenz
          und eine stressfreie Shopping-Erfahrung im Mittelpunkt.
        </p>

        <p class="trust-note">
          Transparenz, Zuverlässigkeit und ehrliche Produkte
          stehen bei Atlas an erster Stelle.
        </p>
      </section>

      <!-- FEATURES -->
      <section class="about-highlight">
        <h2>Was uns besonders macht</h2>

        <div class="feature-grid">
          <div class="feature-box">
            <span class="icon">⚡</span>
            <h3>Schnelle Lieferung</h3>
            <p>Zügiger Versand in ganz Deutschland.</p>
          </div>

          <div class="feature-box">
            <span class="icon">💬</span>
            <h3>Kundenservice</h3>
            <p>Support auf Augenhöhe – ehrlich &amp; direkt.</p>
          </div>

          <div class="feature-box">
            <span class="icon">⭐</span>
            <h3>Qualität</h3>
            <p>Produkte, die halten, was sie versprechen.</p>
          </div>

          <div class="feature-box">
            <span class="icon">🔒</span>
            <h3>Sicherheit</h3>
            <p>Geschützte Daten &amp; sichere Zahlungsanbieter.</p>
          </div>
        </div>
      </section>

      <!-- FINAL -->
      <section class="about-final">
        <h2>Danke für dein Vertrauen!</h2>
        <p>
          Schön, dass du Teil der Atlas-Community bist.
          Wir freuen uns darauf, dich auch in Zukunft zu begleiten.
        </p>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* ===============================
   THEME
================================ */
.about-page {
  position: relative;
  min-height: 100vh;

  --gold-main: #FAD961;
  --gold-soft: rgba(255, 230, 150, 0.95);
  --gold-muted: rgba(255, 220, 120, 0.85);
  --gold-glow: rgba(250, 217, 97, 0.55);
}

/* ===============================
   BACKGROUND
================================ */
.about-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background: var(--bg) center / cover no-repeat;
  z-index: -2;
}

.about-page::after {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: -1;
}

/* ===============================
   LAYOUT (mathematisch mittig)
================================ */
.about-content-layer {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  padding: 80px 40px;
  text-align: center;
  line-height: 1.85;
  color: var(--gold-soft);
}

/* ===============================
   HEADER / HERO
================================ */
.about-header {
  max-width: 900px;
  margin: 0 auto 90px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 230, 150, 0.25);
}

.about-header h1 {
  font-size: 3.2rem;
  margin-bottom: 14px;
  color: var(--gold-main);
  text-shadow: 0 0 10px var(--gold-glow);
}

.about-subtitle {
  font-size: 1.25rem;
  color: var(--gold-muted);
}

/* ===============================
   SECTIONS
================================ */
.about-content,
.about-section,
.about-highlight,
.about-final {
  margin-top: 90px;
}

.about-content h2,
.about-section h2,
.about-highlight h2,
.about-final h2 {
  font-size: 2.2rem;
  margin-bottom: 22px;
  color: var(--gold-main);
  text-shadow: 0 0 8px var(--gold-glow);
}

.about-content h3 {
  font-size: 1.5rem;
  margin: 40px 0 18px;
  color: var(--gold-main);
}

/* ===============================
   TEXT
================================ */
.about-content p,
.about-section p,
.about-content li,
.about-final p {
  max-width: 680px;
  margin: 0 auto 18px;
  font-size: 1.15rem;
}

.about-content ul {
  list-style: none;
  padding: 0;
  margin: 25px auto;
}

.about-content strong {
  color: var(--gold-main);
}

.trust-note {
  margin-top: 30px;
  font-style: italic;
  color: var(--gold-muted);
}

/* ===============================
   FEATURES
================================ */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  max-width: 1000px;
  margin: 40px auto 0;
}

.feature-box {
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 16px;
  border: 1px solid rgba(255, 230, 150, 0.25);
}

.feature-box h3 {
  color: var(--gold-main);
  margin: 10px 0;
}

.feature-box p {
  font-size: 1.05rem;
}

.feature-box .icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

/* ===============================
   RESPONSIVE
================================ */
@media (max-width: 1000px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .about-header h1 {
    font-size: 2.4rem;
  }

  .about-content-layer {
    padding: 60px 20px;
  }
}
</style>
