<template>
  <div class="container mt-4">
    <h2 class="mb-4">Favorites</h2>
    <RecipePreviewList
      ref="favoritesList"
      title="Favorite Recipes"
      type="favorites"
      v-if="recipes.length"
      :recipes="recipes"
    />
    <div v-else class="text-center text-muted mt-5" style="font-size:1.2em">
      You don’t have any favorite recipes yet — start exploring and add some!
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
import axios from 'axios';
import store from '../store';

export default {
  name: 'FavoritesPage',
  components: { RecipePreviewList },
  setup() {
    const recipes = ref([]);
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(
          store.server_domain + '/user/favorites',
          { withCredentials: true }
        );
        recipes.value = Array.isArray(data) ? data : [];
      } catch (e) {
        recipes.value = [];
      }
    };
    onMounted(fetchFavorites);
    return { recipes };
  }
};
</script>
