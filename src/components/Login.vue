<template>
    <div class="login container">
        
        <picture>
            <source media="(max-height: 690px)" srcset="../assets/blank.gif">
            <source media="(max-height: 730px)" srcset="../assets/ochako_200.png">
            <source media="(max-width: 800px)" srcset="../assets/blank.gif">
            <source media="(max-width: 1100px)" srcset="../assets/ochako_200.png">
            <source media="(max-width: 1300px)" srcset="../assets/ochako_291.png">
            <img class="img-right" src="../assets/ochako_408.png" alt="Flowers" style="width:auto;">
        </picture>

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
            
            <div class="field center-align">
                <p class="red-text">{{ feedback }}</p>
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
            password: null,
            feedback: null
        }
    },
    methods: {
        login() {
            // alert('login')
            if(this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    alert(`You are logged in as ${user.user.email}`)
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = 'Preencha os dois campos!'
            }
        }
    }
}
</script>

<style>
.login {
    max-width: 400px;
    margin-top: 60px;
}   

.img-right {
    max-height: 650px;
    position: fixed;
    bottom:0px;
    right: 0%;
}

.img-left {
    height: 550px;
    position:fixed;
    bottom:0px;
    left: 0%;
}

.login h2 {
    font-size: 2.4em;
}

.login .field {
    margin-bottom: 16px;
}
</style>
