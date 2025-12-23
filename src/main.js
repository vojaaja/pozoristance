// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')



import Vue from 'vue'
import App from './App.vue'
import router from './router'
import users from './data/usersData'

Vue.config.productionTip = false

// inicijalna "baza" korisnika (samo prvi put)
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users))
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
