<template>
  <div id="app">
    <div id="nav" class="nav-bar-modern">
      <div class="nav-left">
        <router-link :to="{ name: 'main' }" class="nav-logo-link">
          <img src="@/assets/logo.svg" alt="Logo" class="nav-logo" />
        </router-link>
        <router-link class="nav-link" :to="{ name: 'main' }">Recipes</router-link>
        <router-link class="nav-link" :to="{ name: 'search' }">Search</router-link>
        <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
      </div>
      <div class="nav-right">
        <template v-if="!store.username">
          <span class="nav-guest">Hello guest</span>
          <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
        </template>
        <template v-else>
          <span class="nav-user">{{ store.username }}</span>
          <div class="nav-dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
            <button class="nav-link nav-dropdown-btn">Personal Area ▼</button>
            <div v-if="showDropdown" class="nav-dropdown-content">
              <router-link class="nav-dropdown-link" :to="{ name: 'familyRecipes' }">My Family Recipes</router-link>
            </div>
          </div>
          <router-link class="nav-link" :to="{ name: 'createRecipe' }">Create Recipe</router-link>
          <button @click="logout" class="nav-link nav-logout-btn">Logout</button>
        </template>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from './store';

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const showDropdown = ref(false);

    const logout = () => {
      store.logout();
      alert('User logged out successfully');
      router.push("/").catch(() => {});
    };

    return { store, logout, showDropdown };
  }
}
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}


.nav-bar-modern {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 36px 10px 36px;
  background: #f6faf6;
  box-shadow: 0 2px 12px 0 rgba(60, 80, 60, 0.07);
  margin-bottom: 1.5em;
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 1.5em;
}
.nav-logo-link {
  display: flex;
  align-items: center;
  margin-right: 1.2em;
}
.nav-logo {
  width: 40px;
  height: 40px;
  display: block;
}
.nav-link {
  font-weight: 600;
  color: #2c3e50;
  background: none;
  border: none;
  border-radius: 0;
  padding: 0.5em 1.1em;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
  font-size: 1.08em;
}
.nav-link.router-link-exact-active, .nav-link.router-link-active {
  color: #42b983;
  border-bottom: 2.5px solid #42b983;
  background: none;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.1em;
}
.nav-guest {
  color: #888;
  font-size: 1.05em;
  margin-right: 0.7em;
}
.nav-user {
  color: #3a6c2f;
  font-weight: 600;
  font-size: 1.08em;
  margin-right: 0.7em;
}
.nav-dropdown {
  position: relative;
  display: inline-block;
}
.nav-dropdown-btn {
  background: none;
  border: none;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  font-size: 1.08em;
  padding: 0.5em 1.1em;
}
.nav-dropdown-content {
  display: block;
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  min-width: 200px;
  box-shadow: 0 2px 12px 0 rgba(60, 80, 60, 0.13);
  border-radius: 1.2em;
  z-index: 100;
  padding: 0.7em 0.5em;
}
.nav-dropdown-link {
  display: block;
  color: #2c3e50;
  padding: 0.5em 1.2em;
  border-radius: 0.7em;
  text-decoration: none;
  font-size: 1.05em;
  transition: background 0.2s, color 0.2s;
}
.nav-dropdown-link:hover {
  background: #e6f7d9;
  color: #3a6c2f;
}
.nav-logout-btn {
  background: none;
  color: #b00;
  border: none;
  font-weight: 600;
  margin-left: 0.5em;
  cursor: pointer;
  font-size: 1.08em;
  transition: color 0.2s;
}
.nav-logout-btn:hover {
  color: #a00;
}
</style>
