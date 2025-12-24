<template>
  <div class="user">


    <!-- SORTIRANJE -->
    <div v-if="predstave.length > 0" style="margin-bottom: 20px;">
      Sortiraj po nazivu:
      <select v-model="sortOrder" @change="sortiraj">
        <option value="asc">A – Z</option>
        <option value="desc">Z – A</option>
      </select>
    </div>


    <div v-if="!predstave || predstave.length === 0">
      Nema predstava u sistemu
    </div>

    <div v-else class="predstave-grid">
      <div
        class="predstava-card"
        v-for="predstava in predstave"
        :key="predstava.naziv"
      >

        <!-- LINK: samo slika + naziv -->
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


            <p class="opis">
            {{ predstava.opis }}
            </p>
        </router-link>

        <!-- OPIS NIJE LINK -->


      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'UserView',

  data() {
    return {
      predstave: [],
      sortOrder: 'asc'
    }
  },

  methods: {
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

    // podrazumevano A–Z
    this.sortiraj()
  }
}
</script>


<style scoped>
.user {
  padding: 40px;
}

/* GRID ZA KARTICE */
.predstave-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 40px;
}

/* JEDNA PREDSTAVA */
.predstava-card {
  text-align: left;
}

/* LINK BEZ PODVLAČENJA */
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
</style>

