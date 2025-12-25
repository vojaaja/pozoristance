<template> 
  <nav class="nav" v-if="ulogovan">

    <!-- LOGO LEVO -->
    <div class="logo">
      <img src="@/assets/pozoristance.svg" alt="Pozorištance logo">
    </div>

    <!-- LINKOVI POSLE LOGOVANJA -->
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      | <router-link to="/profile">Moj profil</router-link>
      | <a href="#" @click.prevent="logout">Logout</a>
    </div>

  </nav>
</template>


<script>
export default {
  name: "Navigation",
  data() {
    return {
      ulogovan: false
    }
  },
  created() {
    this.ulogovan = localStorage.getItem('ulogovanKorisnik') !== null /*ako postoji True, ako ne postoji False */
  },
  methods: {
    logout() {
      localStorage.removeItem('ulogovanKorisnik')
      window.location.href = '/' /*rucno reloaduje stranicu i vrati je na pocetnu */
    }
  }
}
</script>


<style>
/* NAVIGATION BAR */
nav.nav {
  position: relative;
  padding: 12px 30px;  
  background-color: #42b983;
  display: flex;
  align-items: center;
}

/* LOGO */
.logo img {
  height: 35px;
  width: auto;
}

/* LINKOVI U NAV BARU*/
.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

nav a {
  color: #000000;
  text-decoration: none;
  margin: 0 10px;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>



