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
                <li>
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Signup' }">Signup</router-link>
                </li>

                <li>
                    <a @click="logout" class="btn-small white black-text">Logout</a>
                </li>

                <li>
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
            // currentUser: null
        }
    },
    methods: {
        logout() {
            // alert('logout')
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        }
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
