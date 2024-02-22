import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../views/Landing.vue'

import GetQuote from '../views/Quote/GetQuote.vue'
import Quote from '@/views/Quote/Quote.vue'
import AcceptTerms from '@/views/Quote/AcceptTerms.vue'
import PersonalDetails from '@/views/Quote/PersonalDetails.vue'
import VehicleDetails from '@/views/Quote/VehicleDetails.vue'
import Summary from '@/views/Quote/Summary.vue'
import Payment from '@/views/Quote/Payment.vue'
import PaymentSummary from '@/views/Quote/PaymentSummary.vue'

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

  { 
    path: '/vehicle-details', 
    component: VehicleDetails 
  },

  { 
    path: '/summary', 
    component: Summary 
  },

  { 
    path: '/payment', 
    component: Payment 
  },
  
  { 
    path: '/payment-summary', 
    component: PaymentSummary 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
