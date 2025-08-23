import { reactive } from 'vue';


const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: "http://localhost:3000",

  // Favorites state
  favoritesIds: new Set(),
  favoritesIdsArr: [],

  async loadFavorites() {
    try {
      const res = await fetch(this.server_domain + '/user/favorites', { credentials: 'include' });
      const data = await res.json();
  this.favoritesIds = new Set(Array.isArray(data) ? data.map(r => r.id) : []);
  this.favoritesIdsArr = Array.from(this.favoritesIds);
  localStorage.setItem('favoritesIds', JSON.stringify(this.favoritesIdsArr));
    } catch (e) {
      // fallback to localStorage if available
      const local = localStorage.getItem('favoritesIds');
      if (local) {
        this.favoritesIds = new Set(JSON.parse(local));
        this.favoritesIdsArr = Array.from(this.favoritesIds);
      }
    }
  },


  async addFavorite(id) {
    if (!this.username) {
      alert('You must be logged in to add favorites.');
      return;
    }
    // Update UI immediately
  this.favoritesIds.add(id);
  this.favoritesIdsArr = Array.from(this.favoritesIds);
  localStorage.setItem('favoritesIds', JSON.stringify(this.favoritesIdsArr));
    try {
      const res = await fetch(this.server_domain + '/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ recipeId: id })
      });
      if (!res.ok) {
        // Undo if failed
  this.favoritesIds.delete(id);
  this.favoritesIdsArr = Array.from(this.favoritesIds);
  localStorage.setItem('favoritesIds', JSON.stringify(this.favoritesIdsArr));
        if (res.status === 401) {
          alert('Session expired. Please log in again.');
        } else {
          alert('Failed to add favorite.');
        }
      }
    } catch (e) {
  this.favoritesIds.delete(id);
  this.favoritesIdsArr = Array.from(this.favoritesIds);
  localStorage.setItem('favoritesIds', JSON.stringify(this.favoritesIdsArr));
      alert('Network error. Try again.');
    }
  },

  async removeFavorite(id) {
    if (!this.username) {
      alert('You must be logged in to remove favorites.');
      return;
    }
    // Update UI immediately
    this.favoritesIds.delete(id);
    localStorage.setItem('favoritesIds', JSON.stringify(Array.from(this.favoritesIds)));
    // If backend supports DELETE, you can add fetch here
  },

  hydrateFavorites() {
    const local = localStorage.getItem('favoritesIds');
    if (local) {
      this.favoritesIds = new Set(JSON.parse(local));
      this.favoritesIdsArr = Array.from(this.favoritesIds);
    }
  },

  login(username) {
    console.log('Store: login function called with username:', username);
    localStorage.setItem('username', username);
    this.username = username;
    this.loadFavorites();
    console.log("Store: login completed, current username:", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem('username');
    this.username = undefined;
  this.favoritesIds = new Set();
  this.favoritesIdsArr = [];
  localStorage.removeItem('favoritesIds');
  }
});

export default store;
