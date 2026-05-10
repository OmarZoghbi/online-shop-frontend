<script setup lang="ts">
import { useRouter} from "vue-router";

const props = defineProps({
  open: Boolean,
  close: Function
});

const router = useRouter();


// Liste deiner Kategorien
const categories = [
  { name: "Autozubehör", route: "/kategorie/autos" },
  { name: "Werkzeug", route: "/kategorie/werkzeug" },
  { name: "Bekleidung & Accessoires", route: "/kategorie/bekleidung" },
  { name: "Kosmetikartikel", route: "/kategorie/kosmetik" },
  { name: "Sport & Unterhaltung", route: "/kategorie/sport" },
  { name: "Schmuck, Brillen & Uhren", route: "/kategorie/schmuck" },
  { name: "Elektronik", route: "/kategorie/elektronik" },
  { name: "Haus & Garten", route: "/kategorie/haus-garten" }
];

function goToCategory(route: string) {
  router.push(route);
}

</script>

<template>


  <!-- Sidebar -->
  <aside class="sidebar" :class="{ open: open }"
         @mouseleave="close && close()">  <!-- 👈 beim Verlassen schließen -->


    <h2 class="sidebar-title">Kategorien für Sie</h2>

    <div class="sidebar-list">
      <button
          v-for="cat in categories"
          :key="cat.route"
          class="sidebar-item"
          @click="goToCategory(cat.route)"
      >
        {{ cat.name }}
      </button>
    </div>
  </aside>
</template>

<style scoped>


/* Sidebar Panel */
/* ================================
   🌟 SIDEBAR (Alle Kategorien)
   ================================ */

.sidebar {
  position: fixed;
  top: 0;
  left: -340px;
  width: 320px;
  height: 100vh;

  background: #082949;
  padding: 25px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  border-right: 1px solid rgba(250,217,97,0.35);
  box-shadow: 6px 0 22px rgba(0,0,0,0.4);

  transition: 0.35s ease;
  z-index: 300;
}


/* Wenn offen → reinfahren */
.sidebar.open {
  left: 0;
}

/* Titel */
.sidebar-title {
  font-size: 24px;                 /* Etwas größere Schriftgröße für den Titel */
  font-weight: 700;                /* Fett für mehr Hervorhebung */
  color: #FAD961;
  margin-bottom: 20px;             /* Etwas mehr Abstand nach unten */
  letter-spacing: 1px;             /* Leichter Buchstabenabstand für edleren Look */
  padding-bottom: 15px;            /* Etwas Abstand zum nächsten Element */
}

/* Kategorie-Einträge */
.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Kategorie Items */
.sidebar-item {
  padding: 12px 16px;
  border-radius: 8px;

  background: rgba(255,255,255,0.05);
  color: #FAD961;

  cursor: pointer;
  border: 1px solid rgba(250,217,97,0.35);
  transition: 0.25s ease;
}

.sidebar-item:hover {
  background: rgba(250,217,97,0.18);
  transform: translateX(5px);
}


/* ================================
   🌙 Overlay (Schließen wenn außen klick)
   ================================ */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 250;
  display: none;
}

.overlay.open {
  display: block;
}
</style>