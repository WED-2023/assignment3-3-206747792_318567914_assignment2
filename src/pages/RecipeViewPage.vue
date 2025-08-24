<template>
  <div class="container py-4" v-if="recipe">
    <article class="recipe-vertical">

      <!-- Title -->
      <h1 class="title">{{ recipe.title }}</h1>

     

      <!-- Small centered image -->
      <figure class="thumb">
        <img :src="recipe.image" :alt="`${recipe.title} photo`" loading="lazy" />
      </figure>

       <!-- Meta row -->
      <div class="meta-row">
        <div class="chips">
          <span class="chip" :title="`Ready in ${recipe.readyInMinutes} minutes`">⏱ {{ recipe.readyInMinutes }}m</span>
          <span class="chip" :title="`${formattedLikes} likes`">👍 {{ formattedLikes }}</span>
          <span v-if="recipe.servings" class="chip" :title="`Servings: ${recipe.servings}`">🍽 {{ recipe.servings }}</span>
        </div>

  <FavoriteButton :isFavorite="isFavorite" @toggle-favorite="toggleFavorite" />
      </div>

      <!-- Ingredients -->
      <section class="card-block">
        <h2 class="section-title">Ingredients</h2>
        <ul class="nice-list">
          <li
            v-for="(r, index) in recipe.extendedIngredients"
            :key="index + '_' + (r.id ?? index)"
          >
            {{ r.original }}
          </li>
        </ul>
      </section>

      <!-- Instructions -->
      <section class="card-block">
        <h2 class="section-title">Instructions</h2>
        <ol class="steps">
          <li v-for="s in recipe._instructions" :key="s.number">
            {{ s.step }}
          </li>
        </ol>
      </section>

    </article>
  </div>
</template>


<script>
import FavoriteButton from '../components/FavoriteButton.vue';
export default {
  components: { FavoriteButton },
  data() {
    return {
      recipe: null
    };
  },
  computed: {
    isFavorite() {
      try {
        const id = this.recipe?.id;
        const favs = this.$root?.store?.favoritesIds;
        return !!(id && favs && typeof favs.has === "function" && favs.has(id));
      } catch {
        return false;
      }
    },
    formattedLikes() {
      const v = this.recipe?.aggregateLikes;
      const n = typeof v === "number" ? v : Number(v);
      return Number.isFinite(n) ? n.toLocaleString() : 0;
    }
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId || this.$route.query.id;
      if (!recipeId) {
        this.$router.replace("/NotFound");
        return;
      }
      let response;
      const isPersonal = this.$route.query.personal === '1' || this.$route.query.personal === 1;
      const endpoint = isPersonal
        ? `${this.$root.store.server_domain}/user/my-recipes/${recipeId}`
        : `${this.$root.store.server_domain}/recipes/${recipeId}`;
      try {
        response = await this.axios.get(
          endpoint,
          { withCredentials: true }
        );
        if (response.status !== 200) {
          if (response.status === 404) this.$router.replace("/NotFound");
          return;
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 404) this.$router.replace("/NotFound");
        return;
      }
      const data = response?.data || {};
      const {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        id,
        servings,
        vegetarian,
        vegan,
        glutenFree
      } = data;
      let _instructions = [];
      if (Array.isArray(analyzedInstructions) && analyzedInstructions.length) {
        _instructions = analyzedInstructions
          .map((fstep) => {
            const steps = Array.isArray(fstep?.steps) ? fstep.steps : [];
            if (steps[0]?.step) steps[0].step = (fstep?.name || "") + steps[0].step;
            return steps;
          })
          .reduce((a, b) => a.concat(b), []);
      } else if (typeof instructions === "string" && instructions.trim()) {
        const html = instructions.trim();
        if (/<li[\s>]/i.test(html)) {
          const liMatches = html.match(/<li[^>]*>[\s\S]*?<\/li>/gi) || [];
          const decode = (s) =>
            s
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;|&apos;/g, "'");
          _instructions = liMatches
            .map((li, idx) => {
              const text = decode(li.replace(/<\/?[^>]+>/g, "")).trim();
              return text ? { number: idx + 1, step: text } : null;
            })
            .filter(Boolean);
        } else {
          const parts = html
            .split(/\r?\n|\.(?!\d)/)
            .map((s) => s.trim())
            .filter(Boolean);
          _instructions = parts.map((text, idx) => ({ number: idx + 1, step: text }));
        }
      }
      let _ingredients = [];
      if (Array.isArray(extendedIngredients) && extendedIngredients.length) {
        _ingredients = extendedIngredients;
      } else if (Array.isArray(data.ingredients) && data.ingredients.length) {
        _ingredients = data.ingredients.map((ing) => {
          if (ing.original) return ing;
          const amount = ing.amount ?? ing.quantity ?? "";
          const unit = ing.unit ?? ing.measure ?? "";
          const name = ing.name ?? ing.title ?? "";
          return {
            ...ing,
            original: [amount, unit, name].join(" ").replace(/\s+/g, " ").trim()
          };
        });
      }
      const likesNum =
        typeof aggregateLikes === "number" ? aggregateLikes : Number(aggregateLikes) || 0;
      this.recipe = {
        id,
        title,
        image,
        readyInMinutes,
        aggregateLikes: likesNum,
        servings,
        vegetarian,
        vegan,
        glutenFree,
        extendedIngredients: _ingredients,
        instructions,
        _instructions,
        analyzedInstructions
      };
      try {
        const res = await this.axios.post(
          `/user/viewed/${id}`,
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          console.log(`Recipe ${id} marked as viewed`);
        }
      } catch (e) {
  // intentionally left blank
      }
    } catch (e) {
      console.log("created() error:", e);
    }
  },
  methods: {
    async toggleFavorite() {
      try {
        if (!this.recipe?.id) return;
        if (!this.isFavorite && this.$root?.store?.addFavorite) {
          await this.$root.store.addFavorite(this.recipe.id);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
/* Shell */
.recipe-vertical {
  max-width: 900px;
  margin-inline: auto;
}
.title {
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  font-weight: 800;
  margin: 0 0 .5rem;
}

/* Meta */
.meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: .75rem;
}
.chips {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}
.chip {
  font-size: .9rem;
  padding: .35rem .6rem;
  border-radius: 999px;
  background: #f1f5f9;
  border: 1px solid #e5e7eb;
}
.favorite-btn {
  font-size: 1.7em;
  color: #bbb;
  transition: color 0.2s;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  margin-left: auto;
}
.favorite-btn.active,
.favorite-btn[aria-pressed="true"] {
  color: #e74c3c !important;
}
.favorite-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Image: smaller & centered */
.thumb {
  display: grid;
  place-items: center;
  margin: .25rem 0 1.25rem;
}
.thumb img {
  width: 100%;
  max-width: 680px;              /* <<< מקטין את התמונה */
  aspect-ratio: 4 / 3;           /* יחס נעים ולא ענק */
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
}

/* Blocks stacked one under another */
.card-block {
  background: #fbfbfc;
  border: 1px solid #eef0f3;
  border-radius: 14px;
  padding: 1.1rem 1.2rem;
  margin-bottom: 1rem;
}
.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: .1rem 0 .8rem;
}

/* Lists */
.nice-list { margin: 0; padding-left: 1.1rem; }
.nice-list li { padding: .2rem 0; }

.steps {
  list-style: none;
  padding-left: 0;
  counter-reset: step;
  margin: 0;
}
.steps li {
  position: relative;
  padding-left: 2.2rem;
  margin: .55rem 0;
}
.steps li::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 0; top: 0;
  width: 1.6rem; height: 1.6rem;
  border-radius: 50%;
  display: grid; place-items: center;
  font-size: .9rem; font-weight: 700;
  background: #eaf2ff; border: 1px solid #cfe0ff;
}

/* Small helper */
[disabled] { cursor: not-allowed; opacity: .85; }
</style>
