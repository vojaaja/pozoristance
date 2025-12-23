<template>
    <div class = 'user'>
        <div v-if = '!knjige'> Nema knjiga u sistemu</div>
        <div v-if = 'knjige'>
            <table>
                <tr>
                    <th>Naziv</th>
                    <th>Godina</th>
                    <th>Autor</th>
                </tr>
                <tr v-for = 'knjiga in knjige' :key = 'knjiga.naziv'>
                    <td>
                        <router-link :to="/detaljiknjige/+knjiga.naziv">
                        {{ knjiga.naziv }}
                        </router-link>
                        <!-- ovako ispod kaze ChatGPT da se pise -->
                        <!-- <router-link :to="`/detaljiknjige/${knjiga.naziv}`">
                        {{ knjiga.naziv }}
                        </router-link> -->
                    </td>
                    <td>{{ knjiga.godine }}</td>
                    <td>{{ knjiga.autor }}</td>
                    <!-- <td><button @click = 'edit(knjiga)'></button></td> -->
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
        knjige: []
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
    this.knjige = JSON.parse(localStorage.getItem('knjige'))
  }
}
</script>