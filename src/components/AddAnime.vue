<template>
    <div class="add-anime container">
        <h2 class="center-align">Adicionar Anime</h2>

        <form @submit.prevent="AnimeAdd">
            <div class="field">
                <label for="title">Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field">
                <label for="episodes">Episodes</label>
                <input type="number" name="episodes" v-model="episodes">
            </div>

            <div class="field" v-for="(genre, index) in genres" :key="index">
                <label for="genre">Genre {{ index + 1 }}</label>
                <input type="text" name="genre" v-model="genres[index]">
            </div>

            <div class="field">
                <label for="genre">Genres</label>
                <input type="text" name="genre" v-model="anotherGenre">
                <button class="btn-small genre-btn" @click.prevent="addGenre">Add genre</button>
            </div>


            <div class="field">
                <label for="synopsis">Synopsis</label>
                <textarea name="synopsis" class="materialize-textarea text-area" v-model="synopsis"></textarea>
            </div>

            <div class="center-align">
                <span class="red-text darken-2">
                    <p>{{ this.errorTitle }}</p>
                    <p>{{ this.errorGenre }}</p>
                </span>
            </div>

            <div class="center-align field">
                <button class="btn">Add Anime</button>
            </div>

        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddAnime',
    data() {
        return {
            title: null,
            episodes: null,
            synopsis: null,
            slug: null,
            genres: [],
            anotherGenre: null,
            errorTitle: null,
            errorGenre: null
        }   
    },
    methods: {
        AnimeAdd() {
            if(this.title){
                this.errorTitle = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // alert('add-anime')
                db.collection('animes').add({
                    title: this.title,
                    episodes: this.episodes,
                    synopsis: this.synopsis,
                    slug: this.slug,
                    genres: this.genres
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(error => console.log(error))
            } else {
                this.errorTitle = 'O titulo não pode ser vazio'
            }
        },
        addGenre() {
            // alert('add')
            if(this.anotherGenre){
                this.errorGenre = null
                this.genres.push(this.anotherGenre)
                this.anotherGenre = null
            } else {
                this.errorGenre = 'Genero vazio'
            }
        }
    }    
}
</script>

<style>
.add-anime {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.add-anime h2 {
    font-size: 2em;
    margin: 20px auto;
}

.add-anime .field {
    margin: 20px auto;
    position: relative;
}

.add-anime .text-area {
    height: 120px;
}

.add-anime .genre-btn {
    /* color: aqua; */
    position: absolute;
    top: 4px;
    right: 4px;
}

</style>
