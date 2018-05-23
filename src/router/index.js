import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '@/components/login/login'
const Home=resolve => require(['@/components/home/home'], resolve);
const Singer=resolve => require(['@/components/singer/singer'], resolve);
const SingerDetail=resolve => require(['@/components/singer-detail/singer-detail'], resolve);
const AddSinger=resolve => require(['@/components/add-singer/add-singer'], resolve);
const AddTeacher=resolve => require(['@/components/add-teacher/add-teacher'], resolve);
const Stories=resolve => require(['@/components/stories/stories'], resolve);
const Teacher=resolve => require(['@/components/teacher/teacher'], resolve);
const TeacherDetail=resolve => require(['@/components/teacher-detail/teacher-detail'], resolve);
const Intention=resolve => require(['@/components/intention/intention'], resolve);
const UploadStory=resolve => require(['@/components/upload-story/upload-story'], resolve);

Vue.use(Router)


const routes=[
  
    {path:'/', redirect: '/login' },
    {path:'/login', component: Login },
    {path:'/home', component: Home, meta: {
            requireAuth: true,
        }
    },
    {path:'/singer', component: Singer, meta: {
            requireAuth: true,
        }},
    {path: '/singer/:id', component: SingerDetail, meta: {
            requireAuth: true,
        } },
    {path:'/addSinger', component: AddSinger, meta: {
            requireAuth: true,
        } },
    {path:'/addTeacher', component: AddTeacher, meta: {
            requireAuth: true,
        } },
    {path:'/teacher', component: Teacher, meta: {
            requireAuth: true,
        } },
    {path: '/teacher/:id', component: TeacherDetail, meta: {
            requireAuth: true,
        } },
    {path:'/stories', component: Stories, meta: {
            requireAuth: true,
        } },
    {path:'/intention', component: Intention, meta: {
            requireAuth: true,
        } },
    {path:'/uploadStory', component: UploadStory, meta: {
            requireAuth: true,
        } }
   
]
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    
    store.commit('SET_LOGIN', window.localStorage.getItem('token'))
}
const router= new Router({
	routes : routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})
export default router
