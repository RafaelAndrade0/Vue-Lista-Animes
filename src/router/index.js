import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddAnime from '@/components/AddAnime'
import EditAnime from '@/components/EditAnime'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-anime',
      name: 'AddAnime',
      component: AddAnime,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-anime/:anime_slug',
      name: 'EditAnime',
      component: EditAnime,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // verificar se a rota precisa de auth
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    // verificar se o usuario está logado
    let user = firebase.auth().currentUser
    if(user) {
      // user logado
      next()
    } else {
      // user não logado
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router