<template>
    <div class = 'user'>
        <div v-if = '!predstave'> Nema predstava u sistemu</div>
        <div v-if = 'predstave'>
            <table>
                <tr>
                    <th>Naziv</th>
                    <th>Opis</th>
                    <th>Slika</th>
                </tr>
                <tr v-for = 'predstavA in predstave' :key = 'predstavA.naziv'>
                    <td>
                        <router-link :to="/detaljipredstave/+predstavA.naziv">
                        {{ predstavA.naziv }}
                        </router-link>
                    </td>
                    <td>{{ predstavA.opis }}</td>
                    <td>{{ predstavA.slika }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style>
    .user{
        display: flex;
        justify-content: center;
    }
</style>



<!-- ovo sam dodao -->
<script>
export default {
  name: 'UserView',
  data(){
    return{
        predstave: []
    }
  },
  methods:{
    // edit(knjigaizmen){
    //     for(var i=0; i<this.knjige.length; i++){
    //         if(this.knjige[i] == knjigaizmen){
    //             this.knjige[i].
    //         }
    //     }
    // }

  },
  created(){
    this.predstave = JSON.parse(localStorage.getItem('predstave'))
  }
}
</script>