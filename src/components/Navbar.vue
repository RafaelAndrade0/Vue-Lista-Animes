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
export default {
    name: 'Navbar',
    data() {
        return {

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
