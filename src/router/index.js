import Vue from 'vue'
import Router from 'vue-router'
import Activity from '@/components/activity/activity'


Vue.use(Router)
//const FilmDetail=resolve => require(['@/components/filmDetail/FilmDetail'], resolve);

const routes=[
  
    
    {path:'/', component: Activity },
   
]
const router= new Router({
	routes : routes
})
export default router
