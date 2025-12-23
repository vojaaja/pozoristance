<template>
  <div class="profile">
    <h2>Moj profil</h2>

    <p>Korisničko ime: {{ user.username }}</p>
    <p>Ime: {{ user.firstname }}</p>
    <p>Prezime: {{ user.lastname }}</p>
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
