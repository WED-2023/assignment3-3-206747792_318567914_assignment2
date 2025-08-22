<template>
  <div class="container mt-4">
    <h2 class="mb-4">Favorites</h2>
    <RecipePreviewList
      ref="favoritesList"
      title="Favorite Recipes"
      type="favorites"
      v-if="recipes.length"
      :recipes="recipes"
      :favoritesIds="favoritesIds"
      @toggle-favorite="handleToggleFavorite"
    />
    <div v-else class="text-center text-muted mt-5" style="font-size:1.2em">
      You don’t have any favorite recipes yet — start exploring and add some!
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
import store from '../store';

export default {
  name: 'FavoritesPage',
  components: { RecipePreviewList },
  setup() {
    const recipes = ref([]);

    const handleToggleFavorite = async ({ id }) => {
      if (store.favoritesIds.has(id)) {
        await store.removeFavorite(id);
        recipes.value = recipes.value.filter(r => r.id !== id);
      } else {
        await store.addFavorite(id);
        // Optionally re-fetch or add to recipes.value
      }
    };

    onMounted(async () => {
      // Fetch the user's favorite recipes from backend
      const res = await fetch(store.server_domain + '/user/favorites', { credentials: 'include' });
      const data = await res.json();
      recipes.value = Array.isArray(data) ? data : [];
      await store.loadFavorites();
    });

    const filteredRecipes = computed(() => {
      return recipes.value.filter(r => store.favoritesIds.has(r.id));
    });

    return {
      recipes: filteredRecipes,
      favoritesIds: store.favoritesIds,
      handleToggleFavorite
    };
  }
};
</script>
