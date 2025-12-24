<template>
    <div v-if="predstavA">
        Detalji za predstavu {{ predstavA.naziv }}
        <hr>
        Opis: {{ predstavA.opis }}
    </div>
</template>




<script>
export default {
  name: 'DetailsView',
  data(){
    return{
        predstavA:{}
    }
  },
  created(){
    // ono sto je prosledjeno kad je kliknuta predstava
    var naziv = this.$route.params.naziv; 
    // ovde nije radila proveru, ali kaze 'mozete proveriti'
    var predstave = JSON.parse(localStorage.getItem('predstave'));
    this.predstavA = predstave.find(predstavA=>predstavA.naziv == naziv);
  }
}
</script>