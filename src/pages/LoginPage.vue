<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h2 class="mb-4">Login</h2>
    <LoginForm @success="onLoginSuccess" />
    <div class="mt-3 text-center">
      <span>Not registered yet?</span>
      <router-link to="/register">
        <button class="btn btn-primary ms-2">Sign up now</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  methods: {
    onLoginSuccess(user) {
      console.log("Login successful:", user);
      // Update the store so the UI recognizes the login
      this.$root.$store?.login?.(user.username);
      try {
        // If store is not on root, import directly
        const store = require('../store').default;
        store.login(user.username);
      } catch (e) { console.error(e); }
      this.$router.push('/');
    }
  }
};
</script>
