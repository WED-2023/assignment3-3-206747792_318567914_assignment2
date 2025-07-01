<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="card recipe-card text-decoration-none text-dark"
  >
    <div class="image-container">
      <img
        v-if="recipe.image"
        :src="recipe.image"
        class="card-img-top clickable-image"
        alt="Recipe image"
      />
      <div class="overlay-text">Click to view</div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text">Ready in {{ recipe.readyInMinutes }} minutes</p>
      <p class="card-text">{{ recipe.aggregateLikes }} likes</p>
      <div class="icons">
        <span v-if="recipe.vegetarian" title="Vegetarian">🌿</span>
        <span v-if="recipe.vegan" title="Vegan">🥦</span>
        <span v-if="recipe.glutenFree" title="Gluten Free">🚫</span>
      </div>
    </div>
  </router-link>
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
  cursor: pointer;
  transition: transform 0.2s ease;
}
.recipe-card:hover {
  transform: scale(1.02);
}

.image-container {
  position: relative;
}

.clickable-image {
  height: 200px;
  object-fit: cover;
  width: 100%;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.image-container:hover .clickable-image {
  opacity: 0.8;
}

.overlay-text {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .overlay-text {
  opacity: 1;
}

.icons {
  font-size: 1.2rem;
  margin-top: 5px;
}
</style>
