<template>
    <div class="navbar">
        <nav class="grey darken-4">
            <div class="nav-wrapper">
            <a class="brand-logo">
                <router-link :to="{ name: 'Index' }">
                    Vue Lista Animes
                </router-link>
            </a>
            <ul class="right hide-on-med-and-down">
                <li v-if="!currentUser">
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </li>
                <li v-if="!currentUser">
                    <router-link :to="{ name: 'Signup' }">Registrar</router-link>
                </li>

                <li v-if="currentUser">
                    <span> Bem vindo, {{ currentUser.email }}</span>
                </li>

                <li v-if="currentUser">
                    <a @click="logout" class="btn-small white black-text">Logout</a>
                </li>

                <li v-if="currentUser">
                    <a class="waves-effect waves-light btn">
                        <router-link :to="{ name: 'AddAnime' }">
                            Adicionar Anime
                        </router-link>
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    </div>   
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data() {
        return {
            currentUser: null
        }
    },
    methods: {
        logout() {
            // alert('logout')
            firebase.auth().signOut().then(() => {
                // this.currentUser = null
                this.$router.push({ name: 'Login' })
            })
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                // console.log(user.email)
                this.currentUser = user
            } else {
                this.currentUser = null
            }
        })
    }
}
</script>

<style>
.navbar .brand-logo {
    margin: 0 20px;
}

.navbar .btn {
    /* font-size: 40px; */
    padding: 0 60px;
    margin-right: 40px;
}
</style>
