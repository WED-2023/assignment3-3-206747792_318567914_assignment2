<template>
  <div class="green-bg">
    <div class="main-card shadow-lg">
      <div class="header-area">
        <h1 class="main-title">
          Join us in the <span class="highlight">search</span> for the perfect recipe
        </h1>
        <p class="subtitle">Find, filter and discover delicious recipes for every taste and need</p>
      </div>
      <form class="search-form-modern" @submit.prevent="fetchRecipes">
        <div class="search-row">
          <input v-model="q" type="text" class="search-input-modern" placeholder="Search recipes..." required />
          <button type="submit" class="search-btn-modern" :disabled="loading">
            <span v-if="!loading" class="icon-search"></span>
          </button>
        </div>
        <div class="filters-row">
          <div class="filter-group-modern">
            <label>Results</label>
            <select v-model.number="number">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="15">15</option>
            </select>
          </div>
          <div class="filter-group-modern">
            <label>Sort by</label>
            <select v-model="sort">
              <option value="">None</option>
              <option value="readyInMinutes">Preparation Time</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <div class="filter-group-modern cuisine-dropdown-group">
            <label>Cuisine</label>
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
          <div class="filter-group-modern diet-dropdown-group">
            <label>Diet</label>
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
          <div class="filter-group-modern intolerance-dropdown-group">
            <label>Intolerances</label>
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
      <div v-if="loading" class="loading-area">
        <div class="spinner"></div>
        <span>Searching…</span>
      </div>
      <div v-if="error" class="error-modern">{{ error }}</div>
      <div v-if="results.length" class="results-grid-modern">
        <div v-for="recipe in results" :key="recipe.id" class="recipe-card-modern">
          <img v-if="recipe.image" :src="recipe.image" class="recipe-img-modern" alt="Recipe image" />
          <div class="recipe-info-modern">
            <h3 class="recipe-title-modern">{{ recipe.title }}</h3>
            <div class="badges-row">
              <span class="badge-green">{{ recipe.readyInMinutes }} min</span>
              <span class="badge-light">{{ recipe.servings || 1 }} servings</span>
              <span class="badge-like">❤ {{ recipe.aggregateLikes }}</span>
            </div>
            <div class="badges-row small">
              <span v-for="c in (recipe.cuisines || [])" :key="c" class="badge-outline">{{ c }}</span>
              <span v-for="d in (recipe.diets || [])" :key="d" class="badge-outline">{{ d }}</span>
            </div>
            <details class="instructions-collapse">
              <summary>Show instructions</summary>
              <ol>
                <li v-for="s in recipe._instructions || []" :key="s.number">{{ s.step }}</li>
              </ol>
            </details>
          </div>
        </div>
      </div>
      <div v-else-if="!loading && !error" class="empty-state-modern">
        <span class="icon-empty"></span>
        <div>No results. Try another search.</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
        // ignore parse errors intentionally
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
.green-bg {
  min-height: 100vh;
  background: #f6faf6;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2.5rem 0;
}
.main-card {
  background: #fff;
  border-radius: 2.5rem;
  max-width: 950px;
  width: 100%;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 4px 32px 0 rgba(60, 80, 60, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-area {
  text-align: center;
  margin-bottom: 2.2rem;
}
.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
}
.highlight {
  background: #e6f7d9;
  color: #3a6c2f;
  border-radius: 1.2em;
  padding: 0.1em 0.5em;
}
.subtitle {
  color: #5a6e5a;
  font-size: 1.15rem;
  margin-bottom: 0.2rem;
}
.search-form-modern {
  width: 100%;
  margin-bottom: 2.2rem;
}
.search-row {
  display: flex;
  align-items: center;
  background: #f2f8f2;
  border-radius: 2em;
  padding: 0.4em 0.7em 0.4em 1.2em;
  box-shadow: 0 1px 6px 0 rgba(60, 80, 60, 0.06);
  margin-bottom: 1.2rem;
}
.search-input-modern {
  flex: 1 1 0;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  outline: none;
  padding: 0.6em 0.5em;
  color: #2a3d2a;
}
.search-btn-modern {
  background: #b6e6a7;
  border: none;
  border-radius: 50%;
  width: 2.7em;
  height: 2.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  color: #3a6c2f;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 0.5em;
  box-shadow: 0 1px 4px 0 rgba(60, 80, 60, 0.08);
}
.search-btn-modern:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.icon-search::before {
  content: "\1F50D";
  font-size: 1.3em;
}
.filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2em;
  justify-content: center;
  margin-bottom: 0.5em;
}
.filter-group-modern {
  background: #f2f8f2;
  border-radius: 1.5em;
  padding: 0.7em 1.2em 0.5em 1.2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 120px;
  box-shadow: 0 1px 4px 0 rgba(60, 80, 60, 0.04);
}
.filter-group-modern label {
  font-size: 0.98em;
  color: #3a6c2f;
  font-weight: 600;
  margin-bottom: 0.2em;
}
.filter-group-modern select {
  border: none;
  background: #e6f7d9;
  border-radius: 1em;
  padding: 0.3em 0.7em;
  font-size: 1em;
  color: #2a3d2a;
  outline: none;
  margin-bottom: 0.1em;
}
.loading-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
  margin: 1.5em 0;
}
.spinner {
  width: 1.7em;
  height: 1.7em;
  border: 3px solid #b6e6a7;
  border-top: 3px solid #3a6c2f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.error-modern {
  color: #b00;
  background: #fff0f0;
  border-radius: 1em;
  padding: 0.7em 1.2em;
  margin: 1em 0;
  text-align: center;
  font-weight: 500;
}
.results-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2em;
  margin-top: 1.5em;
  width: 100%;
}
.recipe-card-modern {
  background: #f8fff8;
  border-radius: 2em;
  box-shadow: 0 2px 12px 0 rgba(60, 80, 60, 0.07);
  padding: 1.2em 1.2em 1em 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 340px;
}
.recipe-img-modern {
  width: 100%;
  max-width: 220px;
  max-height: 140px;
  object-fit: cover;
  border-radius: 1.2em;
  margin-bottom: 0.7em;
  box-shadow: 0 1px 6px 0 rgba(60, 80, 60, 0.08);
}
.recipe-info-modern {
  width: 100%;
  text-align: center;
}
.recipe-title-modern {
  font-size: 1.15em;
  font-weight: 700;
  color: #2a3d2a;
  margin-bottom: 0.3em;
}
.badges-row {
  display: flex;
  gap: 0.5em;
  justify-content: center;
  margin-bottom: 0.2em;
}
.badges-row.small {
  gap: 0.3em;
  margin-bottom: 0.2em;
}
.badge-green {
  background: #b6e6a7;
  color: #2a3d2a;
  border-radius: 1em;
  padding: 0.2em 0.8em;
  font-size: 0.98em;
  font-weight: 600;
}
.badge-light {
  background: #e6f7d9;
  color: #3a6c2f;
  border-radius: 1em;
  padding: 0.2em 0.8em;
  font-size: 0.98em;
}
.badge-like {
  background: #fff;
  color: #e05a5a;
  border-radius: 1em;
  padding: 0.2em 0.8em;
  font-size: 0.98em;
  border: 1.5px solid #e6f7d9;
}
.badge-outline {
  background: #fff;
  color: #3a6c2f;
  border-radius: 1em;
  padding: 0.15em 0.7em;
  font-size: 0.92em;
  border: 1.2px solid #b6e6a7;
}
.instructions-collapse {
  margin-top: 0.7em;
  text-align: left;
}
.instructions-collapse summary {
  cursor: pointer;
  color: #3a6c2f;
  font-weight: 600;
  font-size: 1em;
  outline: none;
  border-radius: 0.7em;
  padding: 0.2em 0.7em;
  background: #e6f7d9;
  margin-bottom: 0.3em;
}
.instructions-collapse[open] summary {
  background: #b6e6a7;
}
.empty-state-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #7a8c7a;
  margin: 2.5em 0 1em 0;
  font-size: 1.1em;
  gap: 0.5em;
}
.icon-empty::before {
  content: "\1F614";
  font-size: 2.2em;
  display: block;
  margin-bottom: 0.2em;
}
@media (max-width: 700px) {
  .main-card {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }
  .results-grid-modern {
    grid-template-columns: 1fr;
    gap: 1.2em;
  }
  .filters-row {
    gap: 0.7em;
  }
}
</style>
