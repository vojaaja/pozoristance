<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/pozoristance2-01.png">
    <HelloWorld msg="Dobrodošli!"/>

    <!-- <br> -->
    <form class = "login-form" @submit.prevent="login">
      <div class="row">
      <input type = 'text' name = 'username' v-model = 'username' placeholder="Korisničko ime"><br>
      </div>
      <div class="row">
      <input type = 'password' name = 'password' v-model = 'password' placeholder="Lozinka"><br>
      </div>
      <button type="submit">Ulogujte se</button>
    </form>

    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import users from '../data/usersData'
export default {
  name: 'HomeView',
  data(){ 
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login(){
      var user = users.find(user=>user.username==this.username && user.password == this.password)

      if(user==null){
        this.message = 'Greska'
      }else{
        localStorage.setItem('ulogovanKorisnik', JSON.stringify(user))
        // EMITUJ EVENT
        window.dispatchEvent(new Event('ulogovan'))

        this.$router.push('/test')

        if(user.type==0){
          this.$router.push('user')
        }else{
          this.$router.push('admin')
        }
      }
    }
  }
}
</script>


<!-- <style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> -->


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


</style>
