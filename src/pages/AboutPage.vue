<template>
  <div class="about-page container mx-auto p-6">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-center mb-6">About the Project</h1>

    <!-- Marketing blurb -->
    <section class="bg-white shadow-lg rounded-2xl p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Overview</h2>
      <p class="text-gray-700 leading-relaxed">
        We are a student development team from Ben-Gurion University, building
        the <strong>“Grandma's Recipes & More”</strong> application as part of the
        <strong>Web Development Environments</strong> course. The app helps users manage
        personal and family recipes, save favorites, and discover new dishes with
        a smart search experience.
      </p>
    </section>

    <!-- Team -->
    <section class="bg-white shadow-lg rounded-2xl p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Development Team</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-1">
        <li>👩‍💻 Lital Kupchik — Frontend (Vue.js)</li>
        <li>👨‍💻 Teammate — Backend (Node.js + Express)</li>
        <li>🛠️ Joint work — API design, MySQL schema, testing & QA</li>
      </ul>
    </section>

    <!-- Previous exercises / milestones -->
    <section class="bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-xl font-semibold mb-4">Previous Milestones</h2>
      <ul class="list-disc list-inside">
        <li>
          <RouterLink to="/docs/ex1" class="text-blue-600 hover:underline">
            3.1 — API Specification (PRD)
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/docs/ex2" class="text-blue-600 hover:underline">
            3.2 — Backend Implementation (Node.js + Express + MySQL)
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/docs/ex3" class="text-blue-600 hover:underline">
            3.3 — Frontend Implementation (Vue.js)
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-page {
  direction: rtl; /* Keep RTL layout if your site is primarily Hebrew */
  font-family: "Heebo", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
</style>
