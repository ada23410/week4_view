import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'posts',
        component: () => import('../views/Posts.vue'),
        props: true
      },
      {
        path: 'profile',
        component: () => import('../views/UserInfo.vue'),
        props: true
      },
      {
        path: 'addpost',
        component: () => import('../views/AddPost.vue'),
        props: true
      },
      {
        path: 'follow',
        component: () => import('../views/Follow.vue'),
        props: true
      },
      {
        path: 'myposts/:userId',
        component: () => import('../views/UserPosts.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
