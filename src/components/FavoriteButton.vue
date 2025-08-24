<template>
  <button
    class="favorite-btn btn btn-link p-0"
    :class="{ active: isFavorite }"
    :aria-pressed="isFavorite"
    :aria-label="isFavorite ? 'Added to favorites' : 'Add to favorites'"
    role="button"
    @click.stop="onClick"
    :title="isFavorite ? 'Added to favorites' : 'Add to favorites'"
    :disabled="isFavorite"
  >
    <span v-if="isFavorite">♥</span>
    <span v-else>♡</span>
  </button>
</template>

<script>
export default {
  name: "FavoriteButton",
  props: {
    isFavorite: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClick() {
      if (!this.isFavorite) {
        this.$emit('toggle-favorite');
      }
    }
  }
};
</script>

<style scoped>
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
</style>
