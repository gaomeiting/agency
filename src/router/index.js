import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Singer from '@/components/singer/singer'


Vue.use(Router)
//const FilmDetail=resolve => require(['@/components/filmDetail/FilmDetail'], resolve);

const routes=[
  
    {path:'/', redirect: "/login" },
    {path:'/login', component: Login },
    {path:'/singer', component: Singer }
   
]
const router= new Router({
	routes : routes
})
export default router
