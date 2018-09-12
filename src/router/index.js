import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: _ => import('@/components/Login')
        },
        {
            path: '/',
            alias: '/notebooks',
            component: _ => import('@/components/NotebookList')
        },
        {
            path: '/note',
            component: _ => import('@/components/NoteDetail')
        },
        {
            path: '/trash',
            component: _ => import('@/components/TrashDetail')
        }
    ]
})
