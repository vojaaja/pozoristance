<template>
  <div v-if="predstavA" class="details-container">
    <div class="details-card">
      <h2 class="title">Detalji za predstavu {{ predstavA.naziv }}</h2>
      <hr>

      <p class="description"><strong>Opis:</strong> {{ predstavA.opis }}</p>

      <p class="seats">
        <strong>Preostala mesta:</strong>
        <span :class="{ danger: predstavA.broj_mesta === 0 }">
          {{ predstavA.broj_mesta }}
        </span>
      </p>

      <!-- prikaz samo za korisnike -->
      <div v-if="!isAdmin" class="buy-section">
        <div class="input-row">
          <label>Broj karata:</label>
          <input
            type="number"
            v-model.number="kolicina"
            min="1"
            :max="predstavA.broj_mesta"
          >
        </div>

        <!-- kad nema slobodnih mesta dugme se gasi -->
        <button
          class="buy-button"
          @click="kupiKarte"
          :disabled="predstavA.broj_mesta === 0"
        >
          Kupi kartu
        </button>

        <p v-if="poruka" class="success">
          {{ poruka }}
        </p>
      </div>

      <p v-if="predstavA.broj_mesta === 0" class="error">
        Nema više slobodnih mesta za ovu predstavu.
      </p>
    </div>
  </div>
</template>



<script>
export default {
  name: 'DetailsView',

  data() {
    return {
      predstavA: null,
      predstave: [],
      kolicina: 1,
      poruka: '',
      isAdmin: false
    }
  },

  created() {
    // uzima naziv iz urla detaljipredstave/naziv i smesta ga u promenljivu
    const naziv = this.$route.params.naziv

    this.predstave =
      JSON.parse(localStorage.getItem('predstave')) || []

    this.predstavA = this.predstave.find(
      p => p.naziv === naziv
    )

    // provera da li je korisnik admin
    const user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))
    this.isAdmin = user && user.type === 1

  },

  methods: {
    kupiKarte() {
      if (
        this.kolicina > 0 &&
        this.kolicina <= this.predstavA.broj_mesta
      ) {
        /* smanji broj mesta za broj kupljenih karata */
        this.predstavA.broj_mesta -= this.kolicina

        localStorage.setItem(
          'predstave',
          JSON.stringify(this.predstave)
        )

        /* upisi kupljene karte korisniku */
        let user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))

        if (!user.kupljeneKarte) {
          user.kupljeneKarte = []
        }

        const postojeca = user.kupljeneKarte.find(
          k => k.nazivPredstave === this.predstavA.naziv
        )

        // ako je vec kupio karte za predstavu
        if (postojeca) {
          postojeca.kolicina += this.kolicina
        } else {
          user.kupljeneKarte.push({
            nazivPredstave: this.predstavA.naziv,
            kolicina: this.kolicina
          })
        }

        /* desile se promene na korisniku, pa se mora sacuvati u localStorage */
        localStorage.setItem(
          'ulogovanKorisnik',
          JSON.stringify(user)
        )

        let users = JSON.parse(localStorage.getItem('users'))

        users = users.map(u =>
          u.username === user.username ? user : u
        )

        localStorage.setItem('users', JSON.stringify(users))

        // ispis poruke
        this.poruka = `Kupljeno ${this.kolicina} karata.`
        this.kolicina = 1
      }
    }

  }
}
</script>



<style scoped>
.details-container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.details-card {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
}

.title {
  margin-bottom: 10px;
}

.description {
  margin: 12px 0;
  line-height: 1.5;
}

.seats {
  margin-bottom: 16px;
}

.buy-section {
  margin-top: 20px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="number"] {
  width: 80px;
  padding: 6px;
}

.buy-button {
  margin-top: 14px;
  padding: 10px 18px;
  background-color: #2c7be5;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}

.buy-button:hover:not(:disabled) {
  background-color: #1a68d1;
}

.buy-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.success {
  margin-top: 10px;
  color: #1e7e34;
  font-weight: 600;
}

.error {
  margin-top: 14px;
  color: #c82333;
  font-weight: 600;
}

.danger {
  color: #c82333;
  font-weight: 700;
}
</style>
