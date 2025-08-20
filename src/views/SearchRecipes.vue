<template>
  <div class="search-recipes">
    <form class="search-form" @submit.prevent="fetchRecipes">
      <div class="form-row form-row-top">
        <div class="form-group">
          <label>Results:
            <select v-model.number="number">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="15">15</option>
            </select>
          </label>
        </div>
        <div class="form-group">
          <label>Sort by:
            <select v-model="sort">
              <option value="">None</option>
              <option value="readyInMinutes">Preparation Time</option>
              <option value="popularity">Popularity</option>
            </select>
          </label>
        </div>
      </div>
      <div class="form-row search-bar-row">
        <input v-model="q" type="text" class="search-input" placeholder="Search recipes..." required />
        <button type="submit" class="search-btn" :disabled="loading">
          <span v-if="!loading">🔍 Search</span>
          <span v-else>Loading...</span>
        </button>
      </div>
      <div class="form-row filter-row">
        <div class="form-group filter-group cuisine-dropdown-group">
          <label>Cuisine:</label>
          <div class="dropdown-multiselect" @click.stop="showCuisineDropdown = !showCuisineDropdown">
            <div class="dropdown-selected">
              <span v-if="!cuisine.length" class="dropdown-placeholder">Select...</span>
              <span v-else>{{ cuisine.join(', ') }}</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div v-if="showCuisineDropdown" class="dropdown-list" @click.stop>
              <label v-for="c in cuisines" :key="c" class="dropdown-item">
                <input type="checkbox" :value="c" v-model="cuisine" @click.stop />
                {{ c }}
              </label>
            </div>
          </div>
        </div>
        <div class="form-group filter-group diet-dropdown-group">
          <label>Diet:</label>
          <div class="dropdown-multiselect" @click.stop="showDietDropdown = !showDietDropdown">
            <div class="dropdown-selected">
              <span v-if="!diet.length" class="dropdown-placeholder">Select...</span>
              <span v-else>{{ diet.join(', ') }}</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div v-if="showDietDropdown" class="dropdown-list" @click.stop>
              <label v-for="d in diets" :key="d" class="dropdown-item">
                <input type="checkbox" :value="d" v-model="diet" @click.stop />
                {{ d }}
              </label>
            </div>
          </div>
        </div>
        <div class="form-group filter-group intolerance-dropdown-group">
          <label>Intolerances:</label>
          <div class="dropdown-multiselect" @click.stop="showIntoleranceDropdown = !showIntoleranceDropdown">
            <div class="dropdown-selected">
              <span v-if="!intolerances.length" class="dropdown-placeholder">Select...</span>
              <span v-else>{{ intolerances.join(', ') }}</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div v-if="showIntoleranceDropdown" class="dropdown-list" @click.stop>
              <label v-for="i in intolerancesList" :key="i" class="dropdown-item">
                <input type="checkbox" :value="i" v-model="intolerances" />
                {{ i }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="results.length">
      <h2>Results</h2>
      <div class="results-grid">
        <RecipePreview v-for="recipe in results" :key="recipe.id" :recipe="recipe" />
      </div>
    </div>
    <div v-else-if="!loading && !error">
      <div class="no-results">No matching recipes found.</div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import RecipePreview from "../components/RecipePreview.vue";

const cuisines = [
  "African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"
];
const diets = [
  "Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"
];
const intolerancesList = [
  "Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"
];

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

export default {
  name: "SearchRecipes",
  components: { RecipePreview },
  data() {
    return {
      q: "",
      number: 5,
  cuisine: [],
  diet: [],
      intolerances: [],
      results: [],
      loading: false,
      error: "",
      cuisines,
      diets,
      intolerancesList,
      sort: "",
      showIntoleranceDropdown: false,
      showCuisineDropdown: false,
      showDietDropdown: false
    };
  },
  methods: {
    closeDropdown() {
      this.showIntoleranceDropdown = false;
      this.showCuisineDropdown = false;
      this.showDietDropdown = false;
    },
    async fetchRecipes() {
      this.error = "";
      if (!this.q) {
        this.error = "Please enter a search query.";
        return;
      }
      this.loading = true;
      const params = {
        query: this.q,
        number: this.number,
        cuisine: this.cuisine.length ? this.cuisine.join(",") : undefined,
        diet: this.diet.length ? this.diet.join(",") : undefined,
        intolerances: this.intolerances.join(",") || undefined,
        sort: this.sort || undefined
      };
      try {
        const { data } = await axiosInstance.get("/recipes/search", { params });
        let results = data.results || [];
        // Client-side sort fallback
        if (this.sort === "readyInMinutes") {
          results = results.slice().sort((a, b) => (a.readyInMinutes || 0) - (b.readyInMinutes || 0));
        } else if (this.sort === "popularity") {
          results = results.slice().sort((a, b) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0));
        }
        this.results = results;
        sessionStorage.setItem(
          "lastSearch",
          JSON.stringify({
            q: this.q,
            number: this.number,
            cuisine: this.cuisine,
            diet: this.diet,
            intolerances: this.intolerances,
            sort: this.sort
          })
        );
      } catch (err) {
        this.error = err.response?.data?.message || "An error occurred. Please try again.";
        this.results = [];
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    const user = localStorage.getItem("user");
    const lastSearch = sessionStorage.getItem("lastSearch");
    if (user && lastSearch) {
      try {
        const saved = JSON.parse(lastSearch);
        this.q = saved.q || "";
        this.number = saved.number || 5;
  this.cuisine = Array.isArray(saved.cuisine) ? saved.cuisine : (saved.cuisine ? [saved.cuisine] : []);
  this.diet = Array.isArray(saved.diet) ? saved.diet : (saved.diet ? [saved.diet] : []);
        this.intolerances = saved.intolerances || [];
        this.sort = saved.sort || "";
        this.fetchRecipes();
      } catch (e) {
        // ignore parse errors
      }
    }
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style scoped>
  .cuisine-dropdown-group,
  .diet-dropdown-group,
  .intolerance-dropdown-group {
    position: relative;
  }
.search-recipes {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
form > header {
  margin-bottom: 1rem;
}
.error {
  color: #b00;
  margin: 1rem 0;
}
  .search-form {
    background: #f8f8f8;
    border-radius: 10px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  .form-row-top {
    justify-content: flex-start;
    gap: 2.5rem;
    margin-bottom: 0.5rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    min-width: 140px;
  }
  .search-bar-row {
    gap: 0.5rem;
    margin-bottom: 1.2rem;
  }
  .search-input {
    flex: 1 1 300px;
    padding: 0.7rem 1rem;
    border: 1.5px solid #bbb;
    border-radius: 25px;
    font-size: 1.1rem;
    outline: none;
    transition: border 0.2s;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }
  .search-input:focus {
    border-color: #4a90e2;
  }
  .search-btn {
    background: linear-gradient(90deg, #4a90e2 60%, #357ab8 100%);
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 0.7rem 1.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 4px rgba(74,144,226,0.08);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .search-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  .no-results {
    margin: 2rem 0;
    color: #666;
    text-align: center;
    font-size: 1.1rem;
  }
  .filter-row {
    flex-wrap: nowrap;
    gap: 2rem;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .filter-group {}
  .intolerance-dropdown-group {
    position: relative;
  }
  .dropdown-multiselect {
    position: relative;
    min-width: 120px;
    user-select: none;
    cursor: pointer;
  }
  .dropdown-selected {
    border: 1.5px solid #bbb;
    border-radius: 20px;
    padding: 0.5rem 1.2rem 0.5rem 0.8rem;
    background: #fff;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    transition: border 0.2s;
  }
  .dropdown-selected:focus-within, .dropdown-multiselect:focus-within {
    border-color: #4a90e2;
  }
  .dropdown-placeholder {
    color: #aaa;
  }
  .dropdown-arrow {
    margin-left: 0.7rem;
    font-size: 0.9em;
    color: #888;
  }
  .dropdown-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 110%;
    z-index: 10;
    background: #fff;
    border: 1.5px solid #bbb;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 0.5rem 0.7rem;
    max-height: 220px;
    overflow-y: auto;
    min-width: 160px;
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.2rem 0;
    font-size: 1rem;
    cursor: pointer;
  }
  .filter-group {
    flex: 1 1 0;
    min-width: 160px;
    max-width: 260px;
  }
  @media (max-width: 700px) {
    .filter-row {
      flex-wrap: wrap;
      gap: 1rem;
    }
    .filter-group {
      min-width: 120px;
      max-width: 100%;
    }
  }
</style>
