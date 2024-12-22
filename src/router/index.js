import Vue from 'vue'
import VueRouter from 'vue-router'
import homeIndex from '@/views/home.vue'
import SongList from '@/views/SongList.vue'
import tmusicIndex from '@/views/tmusic.vue'
import SingerIndex from '@/views/Singer.vue'
import UserIndex from '@/views/User.vue'
import song from '@/views/song.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/home', component: homeIndex ,
    children: [
      { path: '/home/playlist', component: SongList },
      { path: '/home/tmusic', component: tmusicIndex },
      {path:'/home/singer',component:SingerIndex},
      {path:'/home/user',component:UserIndex},
      {path:'/home/song',component:song}
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router  
