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
    onLoginSuccess(user) {
      console.log("Login successful:", user);
      // עדכון ה-store כך שה-UI יזהה התחברות
      this.$root.$store?.login?.(user.username); // ליתר בטחון, אך נעדיף ייבוא ישיר
      try {
        // אם store לא על root, נייבא ישירות
        const store = require('../store').default;
        store.login(user.username);
      } catch (e) { console.error(e); }
      this.$router.push('/');
    }
  }
};
</script>
