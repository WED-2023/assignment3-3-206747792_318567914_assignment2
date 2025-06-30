<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Left column: Explore Recipes -->
      <div class="col-md-8">
        <h3>Explore This Recipes</h3>
        <RecipePreviewList class="RandomRecipes" ref="exploreList" title="Random Recipes"/>

        <div class="text-center mt-3">
          <button class="btn btn-secondary" @click="refreshExplore">More</button>
        </div>
      </div>

      <!-- Right column: Last Viewed or Login Prompt -->
      <div class="col-md-4">
        <div v-if="store.username">
          <h3>Last Watched Recipes</h3>
          <RecipePreviewList class="RandomRecipes" ref="lastViewedList" type="last-viewed" />
        </div>
        <div v-else class="text-center mt-4">
          <p>You must be logged in to see your viewed recipes.</p>
          <router-link :to="{ name: 'login' }">
            <button class="btn btn-primary">Login</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;

    const refreshExplore = () => {
      internalInstance.refs.exploreList.updateRecipes();
    };

    return {
      store,
      refreshExplore
    };
  }
};
</script>

<style scoped>
.RandomRecipes {
  margin: 10px 0;
}
</style>
