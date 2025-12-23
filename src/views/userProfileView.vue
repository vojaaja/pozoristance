<template>
  <div class="profile">
    <h2>Moj profil</h2>

    <form @submit.prevent="sacuvaj">
      <p>
        Ime:
        <input type="text" v-model="user.firstname">
      </p>

      <p>
        Prezime:
        <input type="text" v-model="user.lastname">
      </p>

      <p>
        Telefon:
        <input type="text" v-model="user.phone">
      </p>

      <p>
        Adresa:
        <input type="text" v-model="user.address">
      </p>

      <p>
        E-mail:
        <input type="email" v-model="user.email">
      </p>

      <p>
        Korisničko ime:
        <input type="text" v-model="user.username" disabled>
      </p>

      <p>
        Lozinka:
        <input type="password" v-model="user.password">
      </p>

      <button type="submit">Sačuvaj izmene</button>
    </form>

    <p v-if="poruka" style="color: green">{{ poruka }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      user: null,
      poruka: ''
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))
  },
  methods: {
    sacuvaj() {
      // 1. update ulogovanog korisnika
      localStorage.setItem(
        'ulogovanKorisnik',
        JSON.stringify(this.user)
      )

      // 2. update u "bazi" korisnika
      let users = JSON.parse(localStorage.getItem('users'))

      users = users.map(u =>
        u.username === this.user.username ? this.user : u
      )

      localStorage.setItem('users', JSON.stringify(users))

      this.poruka = 'Podaci su uspešno sačuvani'
    }
  }
}
</script>
