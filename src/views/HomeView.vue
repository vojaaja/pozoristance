<template>
  <div class="home">

    <!-- NIJE ULOGOVAN -->
    <div v-if="!ulogovanKorisnik" class="login-wrapper">
      <img alt="Logo" src="../assets/pozoristance2-01.png">

      <form class="login-form" @submit.prevent="login">
        <div class="row">
          <input type="text" v-model="username" placeholder="Korisničko ime">
        </div>

        <div class="row">
          <input type="password" v-model="password" placeholder="Lozinka">
        </div>

        <button type="submit">Ulogujte se</button>
      </form>

      <p class="message">{{ message }}</p>
    </div>


    <!-- ULOGOVAN KUPAC -->
    <UserView v-else-if="ulogovanKorisnik.type === 0" />

    <!-- ULOGOVAN ZAPOSLENI -->
    <AdminView v-else />

  </div>
</template>

<script>
import UserView from '@/views/User.vue'
import AdminView from '@/views/Admin.vue'

export default {
  name: 'HomeView',
  components: {
    UserView,
    AdminView
  },
  data() {
    return {
      username: '',
      password: '',
      message: '',
      ulogovanKorisnik: null
    }
  },
  created() {
    const user = localStorage.getItem('ulogovanKorisnik')
    if (user) {
      this.ulogovanKorisnik = JSON.parse(user)
    }
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem('users')) || []

      const user = users.find(
        u => u.username === this.username && u.password === this.password
      )

      if (!user) {
        this.message = 'Pogrešno korisničko ime ili lozinka'
        return
      }

      localStorage.setItem('ulogovanKorisnik', JSON.stringify(user))
      this.ulogovanKorisnik = user
      this.message = ''

      window.location.reload()

    }
    
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  margin-top: 20px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  width: 100%;
}

input,
button {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
}

input {
  border: 1px solid #333;
}

button {
  margin-top: 10px;
  cursor: pointer;
}

.message {
  margin-top: 10px;
  color: red;
}

.login-wrapper {
  min-height: calc(100vh - 80px); /* 80px ≈ visina navigacije */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
