<template>
  <div class="card recipe-card">
    <img
      v-if="recipe.image"
      :src="recipe.image"
      class="card-img-top"
      alt="Recipe image"
    />
    <div class="card-body">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">Ready in {{ recipe.readyInMinutes }} minutes</p>
      <p class="card-text">{{ recipe.aggregateLikes }} likes</p>
      <p class="card-text">Popularity group: {{ recipe.popularityGroup || 'General' }}</p>
      <router-link
        :to="{ name: 'recipe', params: { id: recipe.id } }"
        class="btn btn-primary"
      >
        View Recipe
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.recipe-card {
  width: 18rem;
  margin: 10px auto;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
