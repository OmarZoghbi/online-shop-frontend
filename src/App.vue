<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from 'vue-router'
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import Werbebar from "@/components/werbebar.vue";
import AtlasFooter from "@/components/AtlasFooter.vue";

const message = ref("Lade...");

function requestmessage(): void {
  axios
      .get<string>('https://online-shop-backend-8v7u.onrender.com/hello')
      .then((response) => (message.value = response.data))
      .catch((error) => console.log(error));
}

onMounted(() => {
  requestmessage();
});

</script>

<template>

  <div id="app">

    <Werbebar />
    <Navbar />

    <main class="content-area">
      <RouterView />
    </main>

    <AtlasFooter />
  </div>
</template>

<style scoped>

.content-area {
  width: 100%;
  padding-top: 148px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>