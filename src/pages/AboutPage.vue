<template>
  <div class="about container py-4" dir="ltr">
    <!-- Header -->
    <header class="text-center mb-4">
      <h1 class="display-6 fw-bold mb-2">About the Project</h1>
    </header>

    <!-- Overview -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">Overview</h2>
        <p class="mb-2">
          <strong>Grandma’s Recipes &amp; More</strong> is a full-stack recipe web app
          built for the <strong>Web Development Environments</strong> course at Ben-Gurion University.
        </p>
        <p class="mb-2">What users can do:</p>
        <ul class="mb-3">
          <li>Explore new recipes from an external API with full details (ingredients, steps, time, likes, diet labels).</li>
          <li>Save and manage a personal list of favorite recipes.</li>
          <li>Add and manage <em>Personal Recipes</em>.</li>
          <li>Add and manage <em>Family Recipes</em> with a story behind them.</li>
          <li>See the <em>Last Watched Recipes</em> on the home page.</li>
          <li>Filter search by cuisine, diet, and intolerances.</li>
        </ul>
        <p class="mb-2">
          Tech stack: frontend with <strong>Vue.js</strong>; backend with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MySQL</strong>.
        </p>
        <p class="mb-0">We built it step-by-step:</p>
        <ul class="mb-0">
          <li>Write the requirements</li>
          <li>Build the backend</li>
          <li>Build the frontend and connect everything</li>
        </ul>
      </div>
    </div>

    <!-- Development Team -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">Development Team</h2>
        <ul class="list-unstyled mb-0">
          <li class="mb-2">• Hadar Knafo</li>
          <li>• Lital Kupchick</li>
        </ul>
      </div>
    </div>

    <!-- Milestones -->
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">Previous Milestones</h2>
        <ul class="list-unstyled mb-0">
          <li class="mb-2">
            <a
              href="https://github.com/WED-2023/assignment3-2-206747792_318567914_assignment2.git"
              target="_blank" rel="noopener" class="link-primary text-decoration-none"
            >
              3.2 — Backend Implementation
            </a>
          </li>
          <li>
            <a
              href="https://github.com/WED-2023/assignment3-3-206747792_318567914_assignment2.git"
              target="_blank" rel="noopener" class="link-primary text-decoration-none"
            >
              3.3 — Frontend Implementation
            </a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about {
  font-family: "Segoe UI", Roboto, Arial, sans-serif;
}
.card {
  border-radius: 1rem;
}
</style>
