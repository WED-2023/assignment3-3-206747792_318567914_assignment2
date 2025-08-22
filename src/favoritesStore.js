// Pinia store for managing favorite recipe IDs
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import store from './store';

export const useFavoritesStore = defineStore('favorites', () => {
  const favoritesIds = ref(new Set());
  const loading = ref(false);

  // Load favorites from backend
  async function loadFavorites() {
    try {
      loading.value = true;
      const { data } = await axios.get(store.server_domain + '/user/favorites', { withCredentials: true });
      favoritesIds.value = new Set((data || []).map(r => r.id));
      localStorage.setItem('favoritesIds', JSON.stringify(Array.from(favoritesIds.value)));
    } catch (e) {
      // fallback to localStorage if available
      const local = localStorage.getItem('favoritesIds');
      if (local) favoritesIds.value = new Set(JSON.parse(local));
    } finally {
      loading.value = false;
    }
  }

  // Add favorite
  async function addFavorite(id) {
    await axios.post(store.server_domain + '/user/favorites', { recipeId: id }, { withCredentials: true });
    favoritesIds.value.add(id);
    localStorage.setItem('favoritesIds', JSON.stringify(Array.from(favoritesIds.value)));
  }

  // Remove favorite
  async function removeFavorite(id) {
    await axios.delete(store.server_domain + `/user/favorites/${id}`, { withCredentials: true });
    favoritesIds.value.delete(id);
    localStorage.setItem('favoritesIds', JSON.stringify(Array.from(favoritesIds.value)));
  }

  // Hydrate from localStorage on init
  function hydrate() {
    const local = localStorage.getItem('favoritesIds');
    if (local) favoritesIds.value = new Set(JSON.parse(local));
  }

  return { favoritesIds, loading, loadFavorites, addFavorite, removeFavorite, hydrate };
});
