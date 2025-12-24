<template>
  <div v-if="predstavA">
    <h2>Detalji za predstavu {{ predstavA.naziv }}</h2>
    <hr>

    <p><strong>Opis:</strong> {{ predstavA.opis }}</p>

    <p>
      <strong>Preostala mesta:</strong>
      {{ predstavA.broj_mesta }}
    </p>

    <div v-if="!isAdmin">
      <div>
        <label>Broj karata:</label>
        <input
          type="number"
          v-model.number="kolicina"
          min="1"
          :max="predstavA.broj_mesta"
        >
      </div>

      <button
        @click="kupiKarte"
        :disabled="predstavA.broj_mesta === 0"
      >
        Kupi kartu
      </button>

      <p v-if="poruka" style="color: green;">
        {{ poruka }}
      </p>
    </div>


    <p v-if="predstavA.broj_mesta === 0" style="color: red;">
      Nema više slobodnih mesta za ovu predstavu.
    </p>
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
    const naziv = this.$route.params.naziv

    this.predstave =
      JSON.parse(localStorage.getItem('predstave')) || []

    this.predstavA = this.predstave.find(
      p => p.naziv === naziv
    )

    // fallback ako nema broj_mesta
    if (this.predstavA && this.predstavA.broj_mesta === undefined) {
      this.predstavA.broj_mesta = 50
      localStorage.setItem(
        'predstave',
        JSON.stringify(this.predstave)
      )
    }
    const user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))
    this.isAdmin = user && user.type === 1

  },

  methods: {
    kupiKarte() {
      if (
        this.kolicina > 0 &&
        this.kolicina <= this.predstavA.broj_mesta
      ) {
        /* 1. smanji broj mesta */
        this.predstavA.broj_mesta -= this.kolicina

        localStorage.setItem(
          'predstave',
          JSON.stringify(this.predstave)
        )

        /* 2. upisi kupljene karte korisniku */
        let user = JSON.parse(localStorage.getItem('ulogovanKorisnik'))

        if (!user.kupljeneKarte) {
          user.kupljeneKarte = []
        }

        const postojeca = user.kupljeneKarte.find(
          k => k.nazivPredstave === this.predstavA.naziv
        )

        if (postojeca) {
          postojeca.kolicina += this.kolicina
        } else {
          user.kupljeneKarte.push({
            nazivPredstave: this.predstavA.naziv,
            kolicina: this.kolicina
          })
        }

        /* 3. sacuvaj korisnika */
        localStorage.setItem(
          'ulogovanKorisnik',
          JSON.stringify(user)
        )

        let users = JSON.parse(localStorage.getItem('users'))

        users = users.map(u =>
          u.username === user.username ? user : u
        )

        localStorage.setItem('users', JSON.stringify(users))

        /* 4. poruka */
        this.poruka = `Kupljeno ${this.kolicina} karata.`
        this.kolicina = 1
      }
    }

  }
}
</script>
