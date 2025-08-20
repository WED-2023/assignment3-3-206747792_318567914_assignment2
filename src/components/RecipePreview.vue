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
  width: 100%;
  max-width: 320px;
  min-width: 240px;
  min-height: 370px;
  max-height: 420px;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  border-radius: 12px;
  background: #fff;
}
.recipe-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(74,144,226,0.13);
}

.image-container {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.clickable-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  cursor: pointer;
  display: block;
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

.card-body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}
.card-text {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.3rem;
}
.icons {
  font-size: 1.2rem;
  margin-top: 5px;
}
</style>
