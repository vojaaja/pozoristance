<template>
    <div>
        <br>
        <h2>Dodaj predstavu</h2>
        <form>
            Naziv: <input type = 'text' name = 'naziv' v-model = 'naziv'>
            <br>
            Opis: <input type = 'text' name = 'opis' v-model = 'opis'>
            <br>
            Slika: <input type = 'text' name = 'slika' v-model = 'slika'>
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
        opis: '',
        slika: '',
        predstave: []
    }
  },
  methods:{
    dodaj(){
        this.predstave.push({naziv: this.naziv, opis: this.opis, 
            slika: this.slika
        });
        localStorage.setItem('predstave', JSON.stringify(this.predstave));
    }
  },
  created(){
    if(localStorage.getItem('predstave') == null){
        this.predstave = [];
        localStorage.setItem('predstave', JSON.stringify(this.predstave));
    }else{
        this.predstave = JSON.parse(localStorage.getItem('predstave'))
    }
  }
}
</script>