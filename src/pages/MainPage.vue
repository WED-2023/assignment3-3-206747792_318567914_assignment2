<template>
  <div class="container mt-4">
    <header class="main-title-header text-center mb-4">
      <h1 class="main-title">Grandma’s Recipes &amp; More</h1>
    </header>
    <div class="row equal-height-row">
      <!-- Left column: Explore Recipes -->
      <div class="col-md-8 column-content">
        <RecipePreviewList
          class="RandomRecipes"
          ref="exploreList"
          title="Explore This Recipe"
          :recipes="exploreRecipes"
          :favoritesIds="favoritesIds"
          @toggle-favorite="handleToggleFavorite"
        />
        <div class="text-center mt-3">
          <button class="btn btn-secondary" @click="refreshExplore">More</button>
        </div>
      </div>

      <!-- Right column: Last Viewed or Login Form -->
      <div class="col-md-4 column-content">
        <div v-if="store.username">
          <RecipePreviewList
            class="RandomRecipes"
            ref="lastViewedList"
            type="last-viewed"
            title="Last Watched Recipes"
            :recipes="lastViewedRecipes"
            :favoritesIds="favoritesIds"
            @toggle-favorite="handleToggleFavorite"
          />
        </div>
        <div v-else class="text-center mt-4">
          <LoginForm @success="onLoginSuccess" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginForm from "../components/LoginForm.vue";
import store from '../store';


export default {
  components: {
    RecipePreviewList,
    LoginForm
  },
  setup() {
    const exploreList = ref(null);
    const lastViewedList = ref(null);
    const storeObj = store;
    const exploreRecipes = ref([]);
    const lastViewedRecipes = ref([]);

    const fetchExploreRecipes = async () => {
      try {
        const res = await fetch(store.server_domain + '/recipes/random', { credentials: 'include' });
        const data = await res.json();
        exploreRecipes.value = Array.isArray(data) ? data : [];
      } catch (e) {
        exploreRecipes.value = [];
      }
    };
    const fetchLastViewedRecipes = async () => {
      try {
        const res = await fetch(store.server_domain + '/user/lastViewed', { credentials: 'include' });
        const data = await res.json();
        lastViewedRecipes.value = Array.isArray(data) ? data : [];
      } catch (e) {
        lastViewedRecipes.value = [];
      }
    };

    const refreshExplore = () => {
      fetchExploreRecipes();
      fetchLastViewedRecipes();
    };

    const onLoginSuccess = (user) => {
      storeObj.login(user.username);
      refreshExplore();
      store.loadFavorites();
    };

    const handleToggleFavorite = async ({ id }) => {
      if (!store.username) {
        alert('You must be logged in to add favorites.');
        return;
      }
      if (store.favoritesIdsArr.includes(id)) {
        await store.removeFavorite(id);
      } else {
        await store.addFavorite(id);
      }
    };

    // Load favorites and recipes on mount
    store.loadFavorites();
    fetchExploreRecipes();
    fetchLastViewedRecipes();

    // Make favoritesIdsArr reactive in the component
    const favoritesIds = ref([...store.favoritesIdsArr]);
    watch(
      () => store.favoritesIdsArr,
      (newVal) => {
        favoritesIds.value = [...newVal];
      }
    );

    return {
      store: storeObj,
      refreshExplore,
      exploreList,
      lastViewedList,
      onLoginSuccess,
      favoritesIds,
      handleToggleFavorite,
      exploreRecipes,
      lastViewedRecipes
    };
  }
};
</script>

<style scoped>
.RandomRecipes {
  margin: 10px 0;
}

.main-title-header {
  margin-top: 10px;
}
.main-title {
  font-family: 'Playfair Display', 'Segoe UI', serif;
  font-size: 2.7rem;
  font-weight: 700;
  color: #b77b3b;
  letter-spacing: 1px;
  text-shadow: 1px 2px 8px #f3e3c3;
}

.equal-height-row {
  display: flex;
}
.column-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  /* Adjust min-height as needed */
  background: #fff;
  box-sizing: border-box;
}
</style>
