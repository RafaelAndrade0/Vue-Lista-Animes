import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddAnime from '@/components/AddAnime'
import EditAnime from '@/components/EditAnime'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-anime',
      name: 'AddAnime',
      component: AddAnime
    },
    {
      path: '/edit-anime/:anime_slug',
      name: 'EditAnime',
      component: EditAnime
    }
  ]
})
