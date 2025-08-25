<template>
  <div class="container mt-4" style="max-width: 500px;">
    <h2 class="mb-4">Register</h2>
    <b-form @submit.prevent="register">
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="state.username"
          @blur="v$.username.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.username.$error">
          <div v-if="v$.username.required?.$invalid">Username is required.</div>
          <div v-else-if="v$.username.minLength?.$invalid || v$.username.maxLength?.$invalid">
            Username must be 3–8 characters.
          </div>
          <div v-else-if="v$.username.alpha?.$invalid">Username must contain only letters.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name -->
      <b-form-group label="First Name" label-for="firstName">
        <b-form-input
          id="firstName"
          v-model="state.firstName"
          @blur="v$.firstName.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.firstName.$error">
          <div v-if="v$.firstName.required?.$invalid">First name is required.</div>
          <div v-else-if="v$.firstName.minLength?.$invalid || v$.firstName.maxLength?.$invalid">
            First name must be 3–20 characters.
          </div>
          <div v-else-if="v$.firstName.alpha?.$invalid">Only letters allowed.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name -->
      <b-form-group label="Last Name" label-for="lastName">
        <b-form-input
          id="lastName"
          v-model="state.lastName"
          @blur="v$.lastName.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.lastName.$error">
          <div v-if="v$.lastName.required?.$invalid">Last name is required.</div>
          <div v-else-if="v$.lastName.minLength?.$invalid || v$.lastName.maxLength?.$invalid">
            Last name must be 3–20 characters.
          </div>
          <div v-else-if="v$.lastName.alpha?.$invalid">Only letters allowed.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          type="email"
          v-model="state.email"
          @blur="v$.email.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.email.$error">
          <div v-if="v$.email.required?.$invalid">Email is required.</div>
          <div v-else-if="v$.email.email?.$invalid">Invalid email address.</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group label="Country" label-for="country">
        <b-form-select
          id="country"
          v-model="state.country"
          :options="countries"
          @change="v$.country.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.country.$error">
          Country is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="state.password"
          @blur="v$.password.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.password.$error">
          <div v-if="v$.password.required?.$invalid">Password is required.</div>
          <div v-else-if="v$.password.minLength?.$invalid || v$.password.maxLength?.$invalid">
            Password must be 5–10 characters.
          </div>
          <div v-else-if="v$.password.passwordRequirements?.$invalid">
            Password must contain at least one number and one special character.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group label="Confirm Password" label-for="confirmedPassword">
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="state.confirmedPassword"
          @blur="v$.confirmedPassword.$touch()"
        />
        <b-form-invalid-feedback v-if="v$.confirmedPassword.$error">
          <div v-if="v$.confirmedPassword.required?.$invalid">Confirmation is required.</div>
          <div v-else-if="v$.confirmedPassword.passwordMatch?.$invalid">
            Passwords do not match.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      
      <b-button 
        type="submit" 
        variant="success" 
        class="w-100"
        :disabled="state.isLoading"
      >
        <span v-if="state.isLoading">
          <b-spinner small></b-spinner>
          Registering...
        </span>
        <span v-else>Register</span>
      </b-button>

      <b-alert
        variant="danger"
        class="mt-3"
        dismissible
        v-if="state.submitError"
        show
      >
        Registration failed: {{ state.submitError }}
        <div v-if="state.submitError && state.submitError.includes('country')" class="mt-2 small">
          <strong>Tip:</strong> Try selecting a different country from the dropdown list.
        </div>
        <div v-else-if="state.submitError && state.submitError.includes('Server error')" class="mt-2 small">
          <strong>Tip:</strong> This appears to be a temporary server issue. Please try again in a few minutes.
        </div>
      </b-alert>

      <div class="mt-2">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { reactive, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useRouter } from 'vue-router';
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from '@vuelidate/validators';
import rawCountries from '../assets/countries';
import axios from 'axios';

// Custom validator for password requirements
const passwordRequirements = (value) => {
  const v = value || '';
  const hasNumber = /[0-9]/.test(v);
  const hasSpecialChar = /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/.test(v);
  return hasNumber && hasSpecialChar;
};

export default {
  name: 'RegisterPage',
  setup() {
    const router = useRouter();
    const state = reactive({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      password: '',
      confirmedPassword: '',
      submitError: null,
      isLoading: false,
    });

    const passwordMatch = (value) => value === state.password;

    const rules = {
      username: { required, minLength: minLength(3), maxLength: maxLength(8), alpha },
      firstName:{ required, minLength: minLength(3), maxLength: maxLength(20), alpha },
      lastName: { required, minLength: minLength(3), maxLength: maxLength(20), alpha },
      email:    { required, email },
      country:  { required },
      password: { required, minLength: minLength(5), maxLength: maxLength(10), passwordRequirements },
      confirmedPassword: { required, passwordMatch },
    };

    const v$ = useVuelidate(rules, state);

  /**/  // Field label map
    const fieldLabels = {
      username: 'Username',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      country: 'Country',
      password: 'Password',
      confirmedPassword: 'Confirm Password',
    };

  /**/  // Finds the first detailed error message according to Vuelidate rules
    const firstFieldError = () => {
      const order = ['username','firstName','lastName','email','country','password','confirmedPassword'];
      for (const key of order) {
        const f = v$.value[key];
        if (!f) continue;
        if (f.$invalid) {
          // החזר הודעה מדויקת לפי הכלל שנכשל
          if (f.required?.$invalid)        return `${fieldLabels[key]} is required.`;
          if (f.minLength?.$invalid || f.maxLength?.$invalid) {
            if (key === 'username')  return 'Username must be 3–8 characters.';
            if (key === 'firstName') return 'First name must be 3–20 characters.';
            if (key === 'lastName')  return 'Last name must be 3–20 characters.';
            if (key === 'password')  return 'Password must be 5–10 characters.';
          }
          if (f.alpha?.$invalid)            return `${fieldLabels[key]} must contain letters only.`;
          if (f.email?.$invalid)            return 'Please enter a valid email address.';
          if (f.passwordRequirements?.$invalid)
            return 'Password must contain at least one number and one special character.';
          if (f.passwordMatch?.$invalid)    return 'Passwords do not match.';
          return `Please fix ${fieldLabels[key]}.`;
        }
      }
      return 'Please correct the highlighted fields.';
    };

    const focusFirstInvalid = () => {
      nextTick(() => {
        const el =
          document.querySelector('.is-invalid, [aria-invalid="true"]') ||
          document.querySelector('[data-invalid="true"]');
        el?.focus?.();
      });
    };

    const register = async () => {
  // Validate on click
      v$.value.$touch();
      const valid = await v$.value.$validate();

      if (!valid) {
        window.alert(firstFieldError());
        focusFirstInvalid();
        return;
      }

      if (state.isLoading) return;

      state.isLoading = true;
      state.submitError = null;

      try {
        await axios.post('/Register', {
          username: state.username,
          firstname: state.firstName,
          lastname: state.lastName,
          email: state.email,
          country: state.country,
          password: state.password,
          confirmPassword: state.confirmedPassword,
          profilePic: '',
        });

        // reset & redirect
        state.username = '';
        state.firstName = '';
        state.lastName = '';
        state.email = '';
        state.country = '';
        state.password = '';
        state.confirmedPassword = '';
        state.submitError = null;
        state.isLoading = false;

        alert('Registration successful! You can now login with your new account.');
        router.push('/login');
      } catch (err) {
        let errorMessage = 'Unexpected error occurred.';
        if (err?.response) {
          const status = err.response.status;
          const data = err.response.data;
          if (status === 409) {
            errorMessage = 'Username or email already exists. Please choose different credentials.';
          } else if (status === 400) {
            errorMessage = (typeof data?.message === 'string' && data.message) ||
              'Invalid registration data. Please check your inputs.';
          } else if (status === 500) {
            errorMessage = data?.message || 'Server error occurred. Please try again later.';
          } else {
            errorMessage = data?.message || `Server error (${status}). Please try again.`;
          }
        } else if (err?.request) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = err?.message || errorMessage;
        }
        state.submitError = errorMessage;
        state.isLoading = false;
        window.alert(errorMessage);
      }
    };

    return {
      state,
      countries: ['Select a country', ...rawCountries],
      register,
      v$,
    };
  },
};
</script>
