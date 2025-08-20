<template>
  <div class="create-recipe-bg">
    <div class="create-recipe-card">
      <h1 class="create-recipe-title">Create a New Recipe</h1>
      <p class="create-recipe-desc">Here you will be able to add your own recipe to the collection.</p>
      <div class="coming-soon">Coming soon...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateRecipePage"
};
</script>

<style scoped>
.create-recipe-bg {
  min-height: 80vh;
  background: linear-gradient(120deg, #f6faf6 60%, #e6f7d9 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2.5rem 0;
}
.create-recipe-card {
  background: #fff;
  border-radius: 2.5rem;
  max-width: 600px;
  width: 100%;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 4px 32px 0 rgba(60, 80, 60, 0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-recipe-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
}
.create-recipe-desc {
  color: #5a6e5a;
  font-size: 1.15rem;
  margin-bottom: 2rem;
}
.coming-soon {
  color: #3a6c2f;
  font-size: 1.3rem;
  background: #e6f7d9;
  border-radius: 1.2em;
  padding: 0.7em 1.5em;
  font-weight: 600;
}
</style>
