<template>
  <div class="container mt-4" style="max-width: 400px;">
    <h2 class="mb-4">Login</h2>
    <LoginForm @success="onLoginSuccess" />
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
    onLoginSuccess() {
      this.$router.push('/main');
    }
  }
};
</script>
