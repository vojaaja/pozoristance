<template>
  <div class="admin">

    <!-- FORMA ZA DODAVANJE -->
    <h2>Dodaj predstavu</h2>

    <form>
      Naziv:
      <input type="text" v-model="naziv">
      <br>

      Opis:
      <input type="text" v-model="opis">
      <br>

      Slika:
      <input type="text" v-model="slika">
      <br>

      <button type="button" @click="dodaj">
        Dodaj
      </button>
    </form>

    <p v-if="poruka" class="poruka">
      {{ poruka }}
    </p>

    <hr>

    <!-- ISTI PRIKAZ KAO USER -->
    <div v-if="predstave.length === 0">
      Nema predstava u sistemu
    </div>

    <div v-else class="predstave-grid">
      <div
        class="predstava-card"
        v-for="(predstava, index) in predstave"
        :key="predstava.naziv"
      >

        <router-link
          :to="`/detaljipredstave/${predstava.naziv}`"
          class="card-link"
        >
          <img
            :src="`/images/${predstava.slika}`"
            alt="Poster"
            class="poster"
          />

          <h3 class="naziv">
            {{ predstava.naziv }}
          </h3>
        </router-link>

        <p class="opis">
          {{ predstava.opis }}
        </p>

        <!-- ADMIN AKCIJA -->
        <button class="obrisi" @click="obrisi(index)">
          Obriši
        </button>

      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'AdminView',

  data() {
    return {
      naziv: '',
      opis: '',
      slika: '',
      predstave: [],
      poruka: ''
    }
  },

  methods: {
    dodaj() {
      this.predstave.push({
        naziv: this.naziv,
        opis: this.opis,
        slika: this.slika
      })

      localStorage.setItem(
        'predstave',
        JSON.stringify(this.predstave)
      )

      this.poruka = `Uneta je predstava: ${this.naziv}`

      this.naziv = ''
      this.opis = ''
      this.slika = ''
    },

    obrisi(index) {
      this.predstave.splice(index, 1)

      localStorage.setItem(
        'predstave',
        JSON.stringify(this.predstave)
      )
    }
  },

  created() {
    this.predstave =
      JSON.parse(localStorage.getItem('predstave')) || []
  }
}
</script>


<style scoped>
.admin {
  padding: 40px;
}

.poruka {
  margin-top: 15px;
  color: green;
}

/* GRID */
.predstave-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 40px;
}

.predstava-card {
  text-align: left;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.poster {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
}

.naziv {
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
}

.opis {
  margin-top: 6px;
  font-size: 14px;
  color: #555;
}

/* ADMIN DUGME */
.obrisi {
  margin-top: 10px;
  background-color: #c62828;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
