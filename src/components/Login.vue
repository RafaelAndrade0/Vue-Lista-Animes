<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center teal-text">login</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field center">
                <button class="btn deep-teal">login</button>
            </div>
        </form>
    </div>    
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            // alert('login')
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log(user)
                    alert(`You are logged in as ${user.user.email}`)
                    this.$router.push({ name: 'Index' })
                })
        }
    }
}
</script>

<style>
.login {
    max-width: 400px;
    margin-top: 60px;
}

.login h2 {
    font-size: 2.4em;
}

.login .field {
    margin-bottom: 16px;
}
</style>
