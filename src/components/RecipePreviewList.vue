<template>
  <div class="container">
    <h3>{{ title }}</h3>

    <div class="row">
      <div class="col" v-for="r in internalRecipes" :key="r.id">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :id="r.id"
          :isFavorite="favoritesIds && favoritesIds.has ? favoritesIds.has(r.id) : false"
          @toggle-favorite="$emit('toggle-favorite', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'random',
    },
    recipes: {
      type: Array,
      default: null,
    },
    favoritesIds: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      internalRecipes: [],
    };
  },
  mounted() {
    // Do nothing here. The watcher on recipes will handle fetching if needed.
  },
  watch: {
    recipes: {
      handler(newVal) {
        if (Array.isArray(newVal)) {
          this.internalRecipes = newVal;
        } else {
          // If recipes is not provided, fetch from server
          this.updateRecipes();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async updateRecipes() {
      try {
        const endpoint =
          this.type === "last-viewed"
            ? "/recipes/lastViewed"
            : "/recipes/random";
        const response = await axios.get(
          this.$root.store.server_domain + endpoint,
          { withCredentials: true }
        );
        const recipes = response.data;
        this.internalRecipes = Array.isArray(recipes) ? recipes : [];
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        this.internalRecipes = [];
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
