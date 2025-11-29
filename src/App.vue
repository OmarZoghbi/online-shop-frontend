<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ArticleList from './components/ArticleList.vue'

import axios from "axios";
import { ref, onMounted } from "vue";

const message = ref("Lade...");


//requestmessage-Funktion
// ---------------------------------------------------
function requestmessage() : void {
  axios
      .get<string>('https://online-shop-backend-8v7u.onrender.com/hello')
      .then((response) => (message.value = response.data))
      .catch ((error) => console.log(error))
}

onMounted(() => {
  requestmessage();
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

  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
/* dein Style bleibt unverändert */
</style>
