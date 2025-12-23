<template>
  <div class="profile">
    <h2>Moj profil</h2>

    <p>Ime: {{ user.firstname }}</p>
    <p>Prezime: {{ user.lastname }}</p>
    <p>Telefon: {{ user.phone }}</p>   
    <p>Adresa: {{ user.address }}</p>
    <p>E-mail: {{ user.email }}</p>
    <p>Korisničko ime: {{ user.username }}</p>
    <p>Lozinka: {{ user.password }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))
  }
}
</script>
