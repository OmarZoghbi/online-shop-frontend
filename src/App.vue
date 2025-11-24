<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ArticleList from './components/ArticleList.vue'

import { ref, onMounted } from "vue";
import api from "./api.js";   // <-- Axios API importieren

const message = ref("Lade...");

// Backend-Request über Axios
onMounted(async () => {
  try {
    const response = await api.get("/hello");
    message.value = response.data;
  } catch (error) {
    console.error(error);
    message.value = "Fehler beim Backend-Request";
  }
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <h1>Mein Online-Shop</h1>
    <ArticleList />
  </main>

  <RouterView />

  <!-- Antwort der API -->
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
/* dein Style bleibt unverändert */
</style>
