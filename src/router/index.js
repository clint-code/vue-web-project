import { createRouter, createWebHistory } from 'vue-router'

import Landing from '../views/Landing.vue'

const routes = [
  { 
    path: '/', 
    component: Landing 
  },


  { 
    path: '/get-quote', 
    component: () => import("../views/Quote/GetQuote.vue") 
  },

  { 
    path: '/quote', 
    component: () => import("../views/Quote/Quote.vue") 
  },

  { 
    path: '/accept-terms', 
    component: () => import("../views/Quote/AcceptTerms.vue") 
  },

  { 
    path: '/personal-details', 
    component: () => import("../views/AdditionalDetails/PersonalDetails.vue") 
  },

  { 
    path: '/vehicle-details', 
    component: () => import("../views/AdditionalDetails/VehicleDetails.vue") 
  },

  { 
    path: '/summary', 
    component: () => import("../views/Summary/Summary.vue") 
  },

  { 
    path: '/payment', 
    component: () => import("../views/Summary/Payment.vue") 
  },
  
  { 
    path: '/payment-summary', 
    component: () => import("../views/Summary/PaymentSummary.vue") 
  },


  {
    path: '/contact-us',
    component: () => import("../views/ContactUs/ContactUs.vue"),
  },

  {
    path: '/lipa-pole-pole',
    component: () => import("../views/LipaPolePole/LipaPolePole.vue")
  },

  {
    path: '/my-policies',
    component: () => import("../views/MyPolicies/MyPolicies.vue")
  },
  {
    path: '/policy-details',
    component: () => import("../views/MyPolicies/PolicyDetails.vue"),
  },
  {
    path: "/submit-claim",
    component: () => import("@/views/Claims/SubmitClaim.vue"),
  },
  {
    path: "/my-claims",
    component: () => import("../views/Claims/MyClaims.vue"),
  },
  {
    path: "/damage",
    component: () => import("../views/Claims/Damage.vue"),
  },
  {
    path: "/damage-details",
    component: () => import("../views/Claims/DamageDetails.vue"),
  },
  {
    path: "/total-theft",
    component: () => import("../views/Claims/TotalTheft.vue"),
  },
  {
    path: "/total-theft-details",
    component: () => import("../views/Claims/TotalTheftDetails.vue"),
  },
  {
    path: "/theft-recovery",
    component: () => import("../views/Claims/TheftRecovery.vue"),
  },
  {
    path: "/theft-recovery-details",
    component: () => import("../views/Claims/TheftRecoveryDetails.vue"),
  },
  {
    path: "/theft-of-parts",
    component: () => import("../views/Claims/TheftOfParts.vue")
  },
  {
    path: "/theft-of-parts-details",
    component: () => import("../views/Claims/TheftOfPartsDetails.vue")
  },
  {
    path: "/windscreen",
    component: () => import("../views/Claims/Windscreen.vue")
  }, 
  {
    path: "/windscreen-details",
    component: () => import("../views/Claims/WindscreenDetails.vue")
  }, 
  {
    path: "/claim-summary",
    component: () => import("../views/Claims/Summary.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
