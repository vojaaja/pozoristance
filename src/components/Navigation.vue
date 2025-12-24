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





<style>
/* NASLOV PRE LOGOVANJA */
nav.nav {
  position: relative;
  padding: 12px 30px;   /* ⬅ prostor gore i dole */
  background-color: #42b983;
  display: flex;
  align-items: center;
}


/* LOGO */
.logo img {
  height: 35px;
  width: auto;
}

/* NASLOV – APSOLUTNO U CENTRU */
.nav-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 45px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #000000;
  pointer-events: none; /* ne smeta klikovima */
}

/* LINKOVI */
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


<!-- PROMENIO SAM IME U APPNAVIGATION JER MI SADA OVA VERZIJA VUE.JS TO TRAZI IZGLEDA -->
<script>
export default {
  name: "Navigation",
  data() {
    return {
      ulogovan: false
    }
  },
  created() {
    this.ulogovan = localStorage.getItem('ulogovanKorisnik') !== null

    window.addEventListener('ulogovan', () => {
      this.ulogovan = true
    })
  },
  methods: {
    logout() {
      localStorage.removeItem('ulogovanKorisnik')
      window.location.href = '/'
    }
  }
}
</script>

