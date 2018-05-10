import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
const Singer=resolve => require(['@/components/singer/singer'], resolve);

Vue.use(Router)


const routes=[
  
    {path:'/', redirect: '/login' },
    {path:'/login', component: Login },
    {path:'/singer', component: Singer }
   
]
const router= new Router({
	routes : routes
})
export default router
