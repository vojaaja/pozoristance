<template>
    <div v-if="knjiga">
        Detalji za knjigu {{ knjiga.naziv }}
        <hr>
        Godina: {{ knjiga.godine }}
    </div>
</template>




<script>
export default {
  name: 'DetailsView',
  data(){
    return{
        knjiga:{}
    }
  },
  created(){
    // ono sto je prosledjeno kad je kliknuta knjiga
    var naziv = this.$route.params.naziv; 
    // ovde nije radila proveru, ali kaze 'mozete proveriti'
    var knjige = JSON.parse(localStorage.getItem('knjige'));
    this.knjiga = knjige.find(knjiga=>knjiga.naziv == naziv);
  }
}
</script>