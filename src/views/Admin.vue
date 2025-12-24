<template>
  <div class="admin">

    <!-- FORMA ZA DODAVANJE -->
    <h2 class="forma-naslov">Dodaj predstavu</h2>

    <form class="forma">
      <input
        type="text"
        v-model="naziv"
        placeholder="Naziv predstave"
      >

      <input
        type="text"
        v-model="opis"
        placeholder="Opis predstave"
      >

      <input
        type="text"
        v-model="slika"
        placeholder="Naziv slike (npr. cuprija.jpg)"
      >

      <button type="button" @click="dodaj">
        Dodaj
      </button>
    </form>

    <p v-if="poruka" class="poruka">
      {{ poruka }}
    </p>

    <hr>

    <!-- SORTIRANJE (ISTO KAO USER) -->
    <div v-if="predstave.length > 0" style="margin-bottom: 20px;">
      Sortiraj po nazivu:
      <select v-model="sortOrder" @change="sortiraj">
        <option value="asc">A – Z</option>
        <option value="desc">Z – A</option>
      </select>
    </div>

    <!-- LISTA PREDSTAVA -->
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
      poruka: '',
      sortOrder: 'asc'
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

      // ponovo sortiraj nakon dodavanja
      this.sortiraj()
    },

    obrisi(index) {
      this.predstave.splice(index, 1)

      localStorage.setItem(
        'predstave',
        JSON.stringify(this.predstave)
      )
    },

    sortiraj() {
      if (this.sortOrder === 'asc') {
        this.predstave.sort((a, b) =>
          a.naziv.localeCompare(b.naziv)
        )
      } else {
        this.predstave.sort((a, b) =>
          b.naziv.localeCompare(a.naziv)
        )
      }
    }
  },

  created() {
    this.predstave =
      JSON.parse(localStorage.getItem('predstave')) || []

    // podrazumevano sortiranje
    this.sortiraj()
  }
}
</script>

<style scoped>
/* GLAVNI KONTEJNER */
.admin {
  padding: 40px;
}

/* NASLOV FORME */
.forma-naslov {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

/* FORMA */
.forma {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
  margin: 0 auto;
}

/* INPUT */
.forma input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

/* DUGME DODAJ */
.forma button {
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}

/* PORUKA */
.poruka {
  margin-top: 15px;
  text-align: center;
  color: green;
}

/* GRID */
.predstave-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

/* KARTICA */
.predstava-card {
  text-align: left;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

/* POSTER */
.poster {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
}

/* NAZIV */
.naziv {
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
}

/* OPIS */
.opis {
  margin-top: 6px;
  font-size: 14px;
  color: #555;
}

/* OBRISI */
.obrisi {
  margin-top: 10px;
  background-color: #c62828;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
