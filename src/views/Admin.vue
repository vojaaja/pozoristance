<template>
    <div>
        <br>
        <h2>Dodaj knjigu</h2>
        <form>
            Naziv: <input type = 'text' name = 'naziv' v-model = 'naziv'>
            <br>
            Godina izdanja: <input type = 'text' name = 'godina' v-model = 'godina'>
            <br>
            Autor: <input type = 'text' name = 'autor' v-model = 'autor'>
            <br>
            <button @click = 'dodaj()'>Dodaj</button>
        </form>
    </div>
</template>


<!-- ovo sam dodao -->
<script>
export default {
  name: 'AdminView',
  data(){
    return{
        naziv: '',
        godina: '',
        autor: '',
        knjige: []
    }
  },
  methods:{
    dodaj(){
        this.knjige.push({naziv: this.naziv, godine: parseInt(this.godina), 
            autor: this.autor
        });
        localStorage.setItem('knjige', JSON.stringify(this.knjige));
    }
  },
  created(){
    if(localStorage.getItem('knjige') == null){
        this.knjige = [];
        localStorage.setItem('knjige', JSON.stringify(this.knjige));
    }else{
        this.knjige = JSON.parse(localStorage.getItem('knjige'))
    }
  }
}
</script>