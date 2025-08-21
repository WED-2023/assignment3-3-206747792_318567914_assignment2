<template>
  <div class="card recipe-card text-decoration-none text-dark position-relative">
    <div class="image-container">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        style="display:block;"
      >
        <img
          v-if="recipe.image"
          :src="recipe.image"
          class="card-img-top clickable-image"
          alt="Recipe image"
        />
        <div class="overlay-text">Click to view</div>
      </router-link>
    </div>
    <div class="d-flex justify-content-end align-items-center px-3 pt-2 pb-0">
      <button
        class="favorite-btn btn btn-link p-0"
        :class="{ 'text-danger': isFavorite }"
        :disabled="isFavorite || loading"
        @click.stop="addToFavorites"
        :title="isFavorite ? 'Added to favorites' : 'Add to favorites'"
      >
        <span v-if="isFavorite">♥</span>
        <span v-else>♡</span>
      </button>
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
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import { ref } from 'vue';

export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isFavorite = ref(false);
    const loading = ref(false);

    // Optionally: check if already favorite on mount (not required for minimal flow)

    async function addToFavorites() {
      if (isFavorite.value || loading.value) return;
      loading.value = true;
      try {
        await axios.post(
          store.server_domain + '/user/favorites',
          { recipeId: props.recipe.id },
          { withCredentials: true }
        );
        isFavorite.value = true;
      } catch (e) {
        alert('Failed to add to favorites');
      } finally {
        loading.value = false;
      }
    }

    return { isFavorite, loading, addToFavorites };
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
  position: relative;
}
.recipe-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(74,144,226,0.13);
}
.favorite-btn {
  font-size: 1.7rem;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.2s;
}
.favorite-btn:disabled {
  opacity: 0.7;
  cursor: default;
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
