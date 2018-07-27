<template>
    <div class="edit-anime container">
        <h2 class="center-align">Editar Anime</h2>
        <!-- <div>
            {{ this.$route.params.anime_slug }}
        </div> -->      
        <div v-if="anime">
            <form @submit.prevent="AnimeEdit">
                <div class="field">
                    <label for="title">Title</label>
                    <input type="text" name="title" v-model="anime.title">
                </div>
                <div class="field">
                    <label for="episodes">Episodes</label>
                    <input type="number" name="episodes" v-model="anime.episodes">
                </div>

                <div class="field" v-for="(genre, index) in anime.genres" :key="index">
                    <label for="genre">Genre {{ index + 1 }}</label>
                    <input type="text" name="genre" v-model="anime.genres[index]">
                </div>

                <div class="field">
                    <label for="genre">Genres</label>
                    <input type="text" name="genre" v-model="anotherGenre">
                    <button class="btn-small genre-btn" @click.prevent="addGenre">Add genre</button>
                </div>                

                <div class="field">
                    <label for="synopsis">Synopsis</label>
                    <textarea name="synopsis" class="materialize-textarea text-area" v-model="anime.synopsis"></textarea>
                </div>

                <div class="center-align field">
                    <button class="btn">Edit Anime</button>
                </div>
            </form>            
        </div>

    </div>   
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditAnime',
    data() {
        return {
            anime: null,
            anotherGenre: null
        }
    },
    methods: {
        AnimeEdit () {
            // alert('edit')
            this.anime.slug = slugify(this.anime.title, {
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true
            })

            db.collection('animes').doc(this.anime.id).update({
                title: this.anime.title,
                episodes: this.anime.episodes,
                synopsis: this.anime.synopsis,
                slug: this.anime.slug,
                genres: this.anime.genres
            }).then(() => {
                this.$router.push({ name: 'Index'})
            })
        },
        addGenre() {
            // alert('add')
            if(this.anotherGenre){
                this.anime.genres.push(this.anotherGenre)
                this.anotherGenre = null
            } else {
                // this.errorGenre = 'Genero vazio'
            }
        }
    },
    created() {
        let ref = db.collection('animes').where('slug', '==', this.$route.params.anime_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.anime = doc.data()
                this.anime.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-anime {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.edit-anime h2 {
    font-size: 2em;
    margin: 20px auto;
}

.edit-anime .field {
    margin: 20px auto;
    position: relative;
}

.edit-anime .text-area {
    height: 120px;
}

.edit-anime .genre-btn {
    /* color: aqua; */
    position: absolute;
    top: 4px;
    right: 4px;
}
</style>
