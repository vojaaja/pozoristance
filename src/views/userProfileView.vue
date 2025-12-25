<template>
  <div class="profile" v-if="user">
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

    <!-- PRIKAZ KUPLJENIH KARATA - samo za korisnika -->
    <div v-if="user.type === 0">
      <hr>

      <h3 class="section-title">Kupljene karte</h3>

      <div
        v-if="user.kupljeneKarte.length === 0"
        class="no-tickets"
      >
        Nemate kupljenih karata.
      </div>

      <div v-else class="tickets-list">
        <div
          class="ticket-item"
          v-for="karta in user.kupljeneKarte"
          :key="karta.nazivPredstave"
        >
          <span class="ticket-name">
            {{ karta.nazivPredstave }}
          </span>

          <span class="ticket-count">
            {{ karta.kolicina }} karata
          </span>
        </div>
      </div>
    </div>

  </div>
</template>



<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      user: null,
      poruka: '',
      isAdmin: false
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))

    if (!this.user.kupljeneKarte) {
      this.user.kupljeneKarte = []
    }
    // provera da li je korisnik admin
    this.isAdmin = this.user.type === 1
  },
  methods: {
    sacuvaj() {
      // update ulogovanog korisnika u localStorage
      localStorage.setItem(
        'ulogovanKorisnik',
        JSON.stringify(this.user)
      )

      // update podataka user-a u localStorage-u
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


.section-title {
  margin-top: 30px;
  margin-bottom: 15px;
}

.no-tickets {
  font-style: italic;
  color: #777;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.ticket-name {
  font-weight: bold;
}

.ticket-count {
  color: #333;
}
</style>
