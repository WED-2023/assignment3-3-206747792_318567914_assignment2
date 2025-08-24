<template>
  <div class="card recipe-card text-decoration-none text-dark position-relative">
    <div class="image-container">
      <router-link
        :to="routerLinkTo"
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
  <FavoriteButton :isFavorite="isFavorite" @toggle-favorite="$emit('toggle-favorite', { id })" />
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
import FavoriteButton from './FavoriteButton.vue';
export default {
  name: "RecipePreview",
  components: { FavoriteButton },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    isPersonal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    routerLinkTo() {
      if (this.isPersonal) {
        return { name: 'recipe', params: { recipeId: this.recipe.id }, query: { personal: 1 } };
      }
      return { name: 'recipe', params: { recipeId: this.recipe.id } };
    }
  }
};
</script>

<style scoped>
.card.recipe-card {
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 20px;
}
.image-container {
  position: relative;
}
.clickable-image {
  cursor: pointer;
  border-radius: 14px 14px 0 0;
  object-fit: cover;
  height: 180px;
  width: 100%;
}
.overlay-text {
  position: absolute;
  bottom: 8px;
  right: 12px;
  background: rgba(255,255,255,0.8);
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.9em;
  color: #333;
}
.favorite-btn {
  font-size: 1.7em;
  color: #bbb;
  transition: color 0.2s;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
}
.favorite-btn.active,
.favorite-btn[aria-pressed="true"] {
  color: #e74c3c !important;
}
.favorite-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.icons {
  margin-top: 8px;
  font-size: 1.2em;
}
</style>
