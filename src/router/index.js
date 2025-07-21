import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
//import SearchContacts from '../views/SearchContacts.vue';

const routes = [
  { path: '/', component: HomeView, name: 'HomeView' },
  { path: '/acerca', component: AboutView, name: 'AboutView' },
  //{ path: '/search', component: SearchContacts, name: 'SearchContacts' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;