<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>

    <span v-if="ulogovan">
      <!-- | <router-link to="/test">TEST LINK</router-link> -->
      | <router-link to="/profile">Moj profil</router-link>
      | <a href="#" @click.prevent="logout">Logout</a>
    </span>
  </nav>
</template>

<style>



nav {
  padding: 30px;
  background-color: #42b983;
  text-align: center;
}

/* boja za linkove */
nav a {
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  margin: 0 10px;
}

/* boja kad predjem misem */
nav a:hover {
  color: #2c3e50;
}

/* boja aktivne rute  */
nav a.router-link-exact-active {
  color: #2c3e50;
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

