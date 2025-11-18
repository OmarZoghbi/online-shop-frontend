<template>
  <div class="article-list">
    <h2>Artikelübersicht</h2>
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <strong>{{ article.name }}</strong> – {{ article.description }} ({{ article.price }} €)
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      articles: [
        { name: "Tastatur", description: "Mechanische Gaming-Tastatur", price: 59.99 },
        { name: "Maus", description: "Kabellose Maus", price: 29.99 },
        { name: "Monitor", description: "27 Zoll Full-HD", price: 189.99 },
      ],
    };
  },
};
</script>
<style scoped>
.article-list {
  margin-top: 20px;
}
h2 {
  color: #42b883;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 6px 0;
}
</style>
