
<template>
  <div class="notfound-container">
    <div class="notfound-content">
      <div class="notfound-illustration">
        <!-- Fun illustration: chef hat emoji -->
        <span class="chef-emoji" aria-label="Chef Hat" role="img">👨‍🍳</span>
      </div>
      <h1 class="notfound-title">404</h1>
      <p class="notfound-message">Looks like you’re lost in the kitchen!</p>
      <router-link to="/" class="home-btn">Back to Home</router-link>
    </div>
  </div>
</template>

<style scoped>

.notfound-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6faf6 0%, #b6e6a7 100%);
}

.notfound-content {
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(60, 80, 60, 0.10);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  width: 90vw;
  text-align: center;
}

.notfound-illustration {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.chef-emoji {
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.10));
}

.notfound-title {
  font-size: 5rem;
  font-weight: 900;
  color: #3a6c2f;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  text-shadow: 0 2px 12px #e6f7d9;
}

.notfound-message {
  font-size: 1.2rem;
  color: #5a6e5a;
  margin-bottom: 2rem;
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
}

.home-btn {
  display: inline-block;
  background: linear-gradient(90deg, #b6e6a7 0%, #e6f7d9 100%);
  color: #3a6c2f;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(60, 80, 60, 0.10);
  transition: background 0.2s, transform 0.2s;
}
.home-btn:hover {
  background: linear-gradient(90deg, #a3d9a5 0%, #b6e6a7 100%);
  color: #2a3d2a;
  transform: translateY(-2px) scale(1.04);
}

@media (max-width: 500px) {
  .notfound-content {
    padding: 2rem 1rem 1.5rem 1rem;
    max-width: 95vw;
  }
  .notfound-title {
    font-size: 3rem;
  }
  .notfound-illustration {
    font-size: 2.5rem;
  }
}
</style>
