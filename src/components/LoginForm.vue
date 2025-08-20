<template>
  <form @submit.prevent="onSubmit">
    <b-form-group label="Username">
      <b-form-input v-model.trim="username" autocomplete="username" required />
    </b-form-group>

    <b-form-group label="Password">
      <b-form-input
        v-model="password"
        type="password"
        autocomplete="current-password"
        required
      />
    </b-form-group>

    <b-alert v-if="error" show variant="danger" class="mt-2">
      {{ error }}
    </b-alert>

    <b-button :disabled="loading" type="submit" variant="success" class="mt-3">
      {{ loading ? "Logging in..." : "Login" }}
    </b-button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  methods: {
    async onSubmit() {
      this.error = "";
      this.loading = true;
      try {
        const res = await axios.post(
          "/Login",
          {
            username: this.username,
            password: this.password,
          },
          {
            withCredentials: true
          }
        );

        const ok = res.status === 200 || res.data?.success === true;
        if (ok) {
          this.$emit("success", res.data);
        } else {
          this.error = res.data?.error || "Login failed";
        }
      } catch (e) {
        this.error = e?.response?.data?.error || e.message || "Login failed";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
