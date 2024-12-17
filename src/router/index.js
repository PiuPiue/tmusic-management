import Vue from 'vue'
import VueRouter from 'vue-router'
import homeIndex from '@/views/home.vue'
import SongList from '@/views/SongList.vue'
import tmusicIndex from '@/views/tmusic.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/home', component: homeIndex ,
    children: [
      { path: '/home/playlist', component: SongList },
      { path: '/home/tmusic', component: tmusicIndex }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
