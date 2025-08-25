<template>
  <div class="mainpage-bg">
    <div class="mainpage-title-area">
      <h1 class="mainpage-title">Simple and Tasty Recipes</h1>
      <p class="mainpage-desc">Discover delicious recipes for every taste, beautifully presented and easy to make.</p>
    </div>
    <div class="mainpage-cols">
      <!-- Left column: Explore Recipes -->
      <div class="mainpage-col mainpage-col-left">
        <h3 class="mainpage-col-title">Explore these recipes</h3>
        <RecipePreviewList
          class="mainpage-cards"
          ref="exploreList"
          :title="''"
          :recipes="exploreRecipes"
          :favoritesIds="favoritesIds"
          @toggle-favorite="handleToggleFavorite"
        />
        <div class="mainpage-explore-btn-row">
          <button class="mainpage-explore-btn" @click="refreshExplore">Show 3 new recipes &#8635;</button>
        </div>
      </div>
      <!-- Right column: Last Viewed or Login Form -->
      <div class="mainpage-col mainpage-col-right">
        <div v-if="store.username">
          <h3 class="mainpage-col-title">Last Watched Recipes</h3>
          <RecipePreviewList
            class="mainpage-cards"
            ref="lastViewedList"
            type="last-viewed"
            :title="''"
            :recipes="lastViewedRecipes"
            :favoritesIds="favoritesIds"
            @toggle-favorite="handleToggleFavorite"
          />
        </div>
        <div v-else class="mainpage-loginform">
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
.mainpage-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #f6faf6 60%, #e6f7d9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 60px 0;
}
.mainpage-title-area {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 18px;
}
.mainpage-title {
  font-family: 'Playfair Display', 'Segoe UI', serif;
  font-size: 3.2rem;
  font-weight: 800;
  color: #222;
  letter-spacing: 1px;
  margin-bottom: 0.2em;
  line-height: 1.1;
}
.mainpage-desc {
  color: #5a6e5a;
  font-size: 1.18rem;
  margin-bottom: 0.5em;
}
.mainpage-cols {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
}
.mainpage-col {
  background: #fff;
  border-radius: 2.5em;
  box-shadow: 0 4px 24px 0 rgba(60, 80, 60, 0.10);
  padding: 2.5em 2em 2em 2em;
  min-width: 340px;
  max-width: 480px;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mainpage-col-title {
  color: #3a6c2f;
  font-size: 1.25em;
  font-weight: 700;
  margin-bottom: 1em;
  margin-top: 0.5em;
  text-align: center;
}
.mainpage-cards {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2.2em;
  justify-content: center;
  margin-bottom: 1.2em;
}
.mainpage-explore-btn-row {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
}
.mainpage-explore-btn {
  background: #fff;
  color: #222;
  border: none;
  border-radius: 50px;
  font-size: 1.08em;
  font-weight: 700;
  padding: 0.7em 2.2em;
  box-shadow: 0 2px 12px 0 rgba(60, 80, 60, 0.10);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.mainpage-explore-btn:hover {
  background: #e6f7d9;
  color: #3a6c2f;
  box-shadow: 0 4px 24px 0 rgba(60, 80, 60, 0.13);
}
.mainpage-loginform {
  margin: 2.5em auto 0 auto;
  max-width: 400px;
  width: 100%;
}
@media (max-width: 1100px) {
  .mainpage-cols {
    flex-direction: column;
    gap: 2em;
    align-items: center;
  }
  .mainpage-col {
    max-width: 98vw;
    min-width: 0;
    width: 98vw;
  }
}
</style>
