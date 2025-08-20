import { reactive } from 'vue';

const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: "http://localhost:3000",

  login(username) {
    console.log('Store: login function called with username:', username);
    localStorage.setItem('username', username);
    this.username = username;
    console.log("Store: login completed, current username:", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem('username');
    this.username = undefined;
  }
});

export default store;
