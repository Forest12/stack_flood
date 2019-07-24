import Vue from 'vue';
import VueRouter from 'vue-router';

import PostPage from './views/PostPage.vue'
import NewPostPage from './views/NewPostPage.vue'

import PortfolioPage from './views/PortfolioPage.vue'
import NewPortfolioPage from './views/NewPortfolioPage.vue'

import Main from './views/Main.vue'
import UserProfile from './views/UserProfile.vue'

import AdminPage from './views/AdminPage.vue'



Vue.use(VueRouter);

export const router = new VueRouter({
  mode:'history',
  routes: [
    {
    path: '/',
    name: 'Main',
    component: Main,
  },

  {
    path: '/post/:item',
    name: 'Post',
    component: PostPage,
  },
  {
    path: '/post/:item/new',
    name: 'Newpost',
    component: NewPostPage,
  },
  {
    path: '/userProfile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/portfolio/new',
    name: 'Newportfolio',
    component: NewPortfolioPage,

  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PortfolioPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
  },
 
  ]
})
