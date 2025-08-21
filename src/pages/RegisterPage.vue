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
          <div v-if="!v$.username.required">Username is required.</div>
          <div v-else-if="!v$.username.minLength || !v$.username.maxLength">
            Username must be 3–8 characters.
          </div>
          <div v-else-if="!v$.username.alpha">Username must contain only letters.</div>
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
          <div v-if="!v$.firstName.required">First name is required.</div>
          <div v-else-if="!v$.firstName.minLength || !v$.firstName.maxLength">
            First name must be 3–20 characters.
          </div>
          <div v-else-if="!v$.firstName.alpha">Only letters allowed.</div>
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
          <div v-if="!v$.lastName.required">Last name is required.</div>
          <div v-else-if="!v$.lastName.minLength || !v$.lastName.maxLength">
            Last name must be 3–20 characters.
          </div>
          <div v-else-if="!v$.lastName.alpha">Only letters allowed.</div>
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
          <div v-if="!v$.email.required">Email is required.</div>
          <div v-else-if="!v$.email.email">Invalid email address.</div>
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
          <div v-if="!v$.password.required">Password is required.</div>
          <div v-else-if="!v$.password.minLength || !v$.password.maxLength">
            Password must be 5–10 characters.
          </div>
          <div v-else-if="!v$.password.passwordRequirements">
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
          <div v-if="!v$.confirmedPassword.required">Confirmation is required.</div>
          <div v-else-if="!v$.confirmedPassword.passwordMatch">
            Passwords do not match.
          </div>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button 
        type="submit" 
        variant="success" 
        class="w-100"
        :disabled="state.isLoading || v$.$invalid"
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
import { reactive } from 'vue';
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
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/.test(value);
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

    // Create validation rules inside setup to access state
    const passwordMatch = (value) => {
      return value === state.password;
    };

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      firstName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        alpha,
      },
      lastName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        alpha,
      },
      email: {
        required,
        email,
      },
      country: { required },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        passwordRequirements,
      },
      confirmedPassword: {
        required,
        passwordMatch: passwordMatch,
      },
    };

    const v$ = useVuelidate(rules, state);

    const register = async () => {
      console.log('=== REGISTRATION PROCESS STARTED ===');
      // Prevent multiple submissions
      if (state.isLoading) {
        console.log('Already submitting, skipping');
        return;
      }
      console.log('Current form values:', {
        username: state.username,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        country: state.country,
        password: state.password,
        confirmedPassword: state.confirmedPassword
      });
      console.log('Password match check:', state.password === state.confirmedPassword);
      const valid = await v$.value.$validate();
      console.log('Validation result:', valid);
      console.log('Validation errors:', v$.value.$errors);
      if (!valid) {
        console.log('Validation failed, stopping');
        console.log('Detailed errors:');
        let msg = '';
        if (v$.value.password && v$.value.password.$invalid) {
          if (!v$.value.password.required) {
            msg = 'Password is required.';
          } else if (!v$.value.password.minLength || !v$.value.password.maxLength) {
            msg = 'Password must be 5–10 characters.';
          } else if (!v$.value.password.passwordRequirements) {
            msg = 'Password must contain at least one number and one special character.';
          }
        } else if (v$.value.confirmedPassword && v$.value.confirmedPassword.$invalid) {
          if (!v$.value.confirmedPassword.required) {
            msg = 'Password confirmation is required.';
          } else if (!v$.value.confirmedPassword.passwordMatch) {
            msg = 'Passwords do not match.';
          }
        } else {
          msg = 'Please correct the highlighted errors in the form.';
        }
        window.alert(msg);
        return;
      }
      // Set loading state
      state.isLoading = true;
      state.submitError = null;
      try {
        console.log('Attempting registration with:', { 
          username: state.username, 
          email: state.email, 
          country: state.country 
        });
        console.log('Full request payload:', {
          username: state.username,
          firstname: state.firstName,
          lastname: state.lastName,
          email: state.email,
          country: state.country,
          password: state.password,
          confirmPassword: state.confirmedPassword,
        });
        console.log('Sending request to:', '/Register');
        await axios.post('/Register', {
          username: state.username,
          firstname: state.firstName,
          lastname: state.lastName,
          email: state.email,
          country: state.country,
          password: state.password,
          confirmPassword: state.confirmedPassword,
          profilePic: '', // Default empty profile pic
        });
        console.log('Registration successful');
        // Clear form data
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
        console.error('Registration error:', err);
        console.error('Error response:', err.response);
        console.error('Error message:', err.message);
        // More detailed error handling
        let errorMessage = 'Unexpected error occurred.';
        if (err.response) {
          // Server responded with error status
          const status = err.response.status;
          const data = err.response.data;
          console.log('Server error status:', status);
          console.log('Server error data:', data);
          if (status === 409) {
            errorMessage = 'Username or email already exists. Please choose different credentials.';
          } else if (status === 400) {
            // Try to extract more specific error info from server
            if (typeof data?.message === 'string') {
              if (data.message.toLowerCase().includes('email')) {
                errorMessage = 'Email is already in use.';
              } else if (data.message.toLowerCase().includes('username')) {
                errorMessage = 'Username is already in use.';
              } else if (data.message.toLowerCase().includes('password')) {
                errorMessage = 'Password does not meet requirements.';
              } else if (data.message.toLowerCase().includes('match')) {
                errorMessage = 'Passwords do not match.';
              } else {
                errorMessage = data.message;
              }
            } else {
              errorMessage = 'Invalid registration data. Please check your inputs.';
            }
          } else if (status === 500) {
            // Try to extract more specific error info from server
            const serverMessage = data?.message;
            if (serverMessage && serverMessage.includes('400')) {
              errorMessage = 'Server validation error. Please try with a different country or check your input data.';
            } else {
              errorMessage = 'Server error occurred. This might be due to external service issues. Please try again later or contact support.';
            }
          } else {
            errorMessage = data?.message || `Server error (${status}). Please try again.`;
          }
        } else if (err.request) {
          // Network error
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          // Other error
          errorMessage = err.message || 'Unexpected error occurred.';
        }
        state.submitError = errorMessage;
        state.isLoading = false;
        // Show popup for registration error
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
