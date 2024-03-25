import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../views/Landing.vue'

import GetQuote from '../views/Quote/GetQuote.vue'
import Quote from '@/views/Quote/Quote.vue'
import AcceptTerms from '@/views/Quote/AcceptTerms.vue'

import PersonalDetails from '@/views/AdditionalDetails/PersonalDetails.vue'
import VehicleDetails from '@/views/AdditionalDetails/VehicleDetails.vue'

import Summary from '@/views/Summary/Summary.vue'
import Payment from '@/views/Summary/Payment.vue'
import PaymentSummary from '@/views/Summary/PaymentSummary.vue'

import ContactUs from '@/views/ContactUs/ContactUs.vue'

import LipaPolePole from '@/views/LipaPolePole/LipaPolePole.vue'

import MyPolicies from '@/views/MyPolicies/MyPolicies.vue'
import PolicyDetails from '@/views/MyPolicies/PolicyDetails.vue'

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


  {
    path: '/contact-us',
    component: ContactUs,
  },

  {
    path: '/lipa-pole-pole',
    component: LipaPolePole
  },

  {
    path: '/my-policies',
    component: MyPolicies
  },
  {
    path: '/policy-details',
    component: PolicyDetails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
