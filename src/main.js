import Vue from 'vue'
import App from './App.vue'
import router from './router'
import users from './data/usersData'

Vue.config.productionTip = false

// stavljam inicijalne korisnike iz usersData.js u localStorage)
// potrebno mi je bilo da korisnici budu sacuvani i posle logouta
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users))
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
