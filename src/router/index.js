import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
const Singer=resolve => require(['@/components/singer/singer'], resolve);
const AddSinger=resolve => require(['@/components/add-singer/add-singer'], resolve);
const Stories=resolve => require(['@/components/stories/stories'], resolve);

Vue.use(Router)


const routes=[
  
    {path:'/', redirect: '/login' },
    {path:'/login', component: Login },
    {path:'/singer', component: Singer },
    {path:'/addSinger', component: AddSinger },
    {path:'/stories', component: Stories }
   
]
const router= new Router({
	routes : routes
})
export default router
