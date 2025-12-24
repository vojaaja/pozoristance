<template>
    <div v-if="predstavA">
        Detalji za knjigu {{ predstavA.naziv }}
        <hr>
        Godina: {{ predstavA.godine }}
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
    // ono sto je prosledjeno kad je kliknuta knjiga
    var naziv = this.$route.params.naziv; 
    // ovde nije radila proveru, ali kaze 'mozete proveriti'
    var predstave = JSON.parse(localStorage.getItem('predstave'));
    this.predstavA = predstave.find(predstavA=>predstavA.naziv == naziv);
  }
}
</script>