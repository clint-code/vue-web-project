import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../views/Landing.vue'

import GetQuote from '../views/Quote/GetQuote.vue'
import Quote from '@/views/Quote/Quote.vue'
import AcceptTerms from '@/views/Quote/AcceptTerms.vue'
import PersonalDetails from '@/views/Quote/PersonalDetails.vue'

const routes = [
  { 
    path: '/', 
    component: Landing 
  },


  { 
    path: '/get-quote', 
    component: GetQuote 
  },

  { 
    path: '/quote', 
    component: Quote 
  },

  { 
    path: '/accept-terms', 
    component: AcceptTerms 
  },

  { 
    path: '/personal-details', 
    component: PersonalDetails 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
