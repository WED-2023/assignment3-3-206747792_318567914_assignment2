import { reactive } from 'vue';


const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: "http://localhost:3000",

  // Favorites state
  favoritesIds: new Set(),

  async loadFavorites() {
    try {
      const res = await fetch(this.server_domain + '/user/favorites', { credentials: 'include' });
      const data = await res.json();
      this.favoritesIds = new Set(Array.isArray(data) ? data.map(r => r.id) : []);
      localStorage.setItem('favoritesIds', JSON.stringify(Array.from(this.favoritesIds)));
    } catch (e) {
      // fallback to localStorage if available
      const local = localStorage.getItem('favoritesIds');
      if (local) this.favoritesIds = new Set(JSON.parse(local));
    }
  },


  async addFavorite(id) {
    await fetch(this.server_domain + '/user/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ recipeId: id })
    });
    this.favoritesIds.add(id);
    localStorage.setItem('favoritesIds', JSON.stringify(Array.from(this.favoritesIds)));
  },

  async removeFavorite() {
    // Un-favorite is not supported by backend, do nothing
    // Optionally, show a message or ignore
    return;
  },

  hydrateFavorites() {
    const local = localStorage.getItem('favoritesIds');
    if (local) this.favoritesIds = new Set(JSON.parse(local));
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
    localStorage.removeItem('favoritesIds');
  }
});

export default store;
