<template>
  <div id="index">
    
    <div class="change-mode left-align">
      <button @click="showMode = !showMode" class="btn">Mudar Modo de Exibição</button>
    </div>

    <div class="index-list">
        <!-- <label for="search">Search</label> -->
        <input type="text" name="search" v-model="searchAnime" placeholder="Filtre a lista de animes">

        <div v-if="!showMode" v-for="(anime, index) in animeFilter" :key="index">
            <h3 class="teal-text darken-4">{{ anime.title }} </h3>
            <p>{{ anime.synopsis }} </p>
        </div>
    </div>

    <div v-if="showMode" class="index container">
      <!-- <h1>Index</h1> -->
      <div v-for="(anime, index) in animeFilter" :key="index" class="card">
        <span class="card-title teal-text">
          {{ anime.title }}
        </span>

        <div class="card-image">
          <img :src="anime.image" alt="">
        </div>

        <div class="card-content">

          <div v-for="(genre, index) in anime.genres" :key="index" class="chip center-align">
              {{genre}}
          </div>  

          <p>
            Episodes: {{ anime.episodes }}
          </p>

          <p>{{ anime.synopsis | readMore(300, '...')}}</p>

        </div>

        <a class="btn-floating btn-small red delete" @click="AnimeDelete(anime.id)">
          <i class="material-icons">delete</i>
        </a>

        <a class="btn-floating btn-large halfway-fab">
          <router-link :to="{ name: 'EditAnime', params: { anime_slug: anime.slug } }">
            <i class="material-icons">edit</i>
          </router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      animes: [],
      showMode: true,
      searchAnime: ''
    }
  },
  methods: {
    AnimeDelete(id) {
      db.collection('animes').doc(id).delete()
      .then(anime => {
        this.animes = this.animes.filter(anime => {
          return anime.id !== id
        })
      }).catch(error => console.log(error))
    }
  },
  filters: {
    readMore(text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  created() {
    // fetch data from firestore
    db.collection('animes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let anime = doc.data()
        anime.id = doc.id
        this.animes.push(anime)
      })
    })
  },
  computed: {
      animeFilter() {
          return this.animes.filter(anime => {
              return anime.title.toLowerCase().match(this.searchAnime.toLowerCase())
          })
      }
  }
}
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 20px;
}

.index .card-title {
  margin: 0 20px;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
}

.index .card-image img {
  margin-top: 10px;
  height: 180px;
}

.index-list {
    max-width: 600px;
    margin-left:auto; 
    margin-right:auto;
    margin-top: 10px;
}

.index-list h3 {
    font-size: 30px;
}

#index { 
  background:url('../assets/midoriya_bg.png');
  background-position: top left;
  background-repeat: no-repeat;
  min-height: 700px;
}

</style>
