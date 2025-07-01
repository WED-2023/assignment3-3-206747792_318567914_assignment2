<template>
  <div class="container">
    <h3>{{ title }}</h3>

    <div class="row">
      <div class="col" v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
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
      default: 'random', // ברירת מחדל
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
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
        this.recipes = Array.isArray(recipes) ? recipes : [];
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        this.recipes = [];
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
