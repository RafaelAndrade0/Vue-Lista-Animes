<template>
    <div class="signup container">
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center teal-text">Registrar</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field center">
                <button class="btn deep-teal">Signup</button>
            </div>
        </form>
    </div>    
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        signup() {
            // alert('signup')
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log(user)
                    alert(`Account created for ${user.user.email}`)
                    this.$router.push({ name: 'Index' })
                })
        }
    }
}
</script>

<style>
.signup {
    max-width: 400px;
    margin-top: 60px;
}

.signup h2 {
    font-size: 2.4em;
}

.signup .field {
    margin-bottom: 16px;
}
</style>
