<!-- <template>
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
</template> -->

<template>
  <div class="profile">
    <h2>Moj profil</h2>

    <form class="profile-form" @submit.prevent="sacuvaj">
      <div class="form-row">
        <label>Ime</label>
        <input type="text" v-model="user.firstname">
      </div>

      <div class="form-row">
        <label>Prezime</label>
        <input type="text" v-model="user.lastname">
      </div>

      <div class="form-row">
        <label>Telefon</label>
        <input type="text" v-model="user.phone">
      </div>

      <div class="form-row">
        <label>Adresa</label>
        <input type="text" v-model="user.address">
      </div>

      <div class="form-row">
        <label>E-mail</label>
        <input type="email" v-model="user.email">
      </div>

      <div class="form-row">
        <label>Korisničko ime</label>
        <input type="text" v-model="user.username" disabled>
      </div>

      <div class="form-row">
        <label>Lozinka</label>
        <input type="password" v-model="user.password">
      </div>

      <button type="submit">Sačuvaj izmene</button>
    </form>

    <p v-if="poruka" class="success">{{ poruka }}</p>
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


<style scoped>
.profile {
  max-width: 420px;
  margin: 0 auto;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: flex;
  align-items: center;
}

.form-row label {
  width: 140px;
  font-weight: bold;
}

.form-row input {
  flex: 1;
  padding: 6px;
  box-sizing: border-box;
}

button {
  margin-top: 15px;
  padding: 8px;
}

.success {
  margin-top: 10px;
  color: green;
}
</style>
