<template>
  <TopNav back="/get-quote" variation="white" />

  <div class="custom-width-80 px-3">
    <div class="">
      <p class="font-bold">
        COMPREHENSIVE PRIVATE Car POLICY TERMS AND CONDITIONS.
      </p>

      <div class="custom-terms-section border-bottom-1 custom-dark-gray-border">
        <p class="font-bold">Definitions</p>

        <p>
          You will find the following words or phrases in this policy and
          wherever they appear will have the meaning described below:
        </p>

        <p>
          <span class="font-bold">Accident:</span>
          A sudden, unplanned and unforeseen mishap not under your control or
          that of the authorized driver.
        </p>

        <p>
          <span class="font-bold">Certificate of insurance:</span>
          The document in prescribed form and is to be displayed on the vehicle
          as required by law as evidence that you have taken out the insurance
          and displayed as required by law.
        </p>

        <p>
          <span class="font-bold">Claim:</span>
          Demand by you for indemnity or benefit under the Policy.
        </p>

        <p>
          <span class="font-bold">Claim:</span>
          Demand by you for indemnity or benefit under the Policy.
        </p>

        <p>
          <span class="font-bold">Excess:</span>
          The first amount of each claim borne by you.
        </p>

        <p>
          <span class="font-bold">Indemnity:</span>
          Restoring you to the financial position you were in immediately before
          the accident.
        </p>

        <p>
          <span class="font-bold">Legal liability:</span>
          Financial responsibilities attaching to you because of your failure to
          observe an obligation imposed by law.
        </p>

        <p>
          <span class="font-bold">Market Value:</span>
          The cost of replacing your vehicle with one of similar type and
          condition.
        </p>

        <p>
          <span class="font-bold">Members of your Household:</span>
          Persons you normally live with in your residence.
        </p>

        <p>
          <span class="font-bold">Period of Insurance:</span>
          The period shown in the schedule and any subsequent period for which
          you will pay and we accept a renewal premium.
        </p>
      </div>

      <div class="custom-mobile-view">
        <div class="flex justify-content-between border-2 custom-dark-gray-border border-round-2xl p-2 mt-4">
          <label class="text-xs font-bold">Read All Terms and Conditions</label>
          <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
        </div>
      </div>

      <div class="custom-desktop-view px-4 mb-2">
        <div class="flex justify-content-between border-2 custom-dark-gray-border border-round-3xl p-2 mt-4">
          <label class="font-bold">Read All Terms and Conditions</label>
          <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
        </div>
      </div>
    </div>

    <div class="custom-mobile-view relative">
      <div class="border-top-1 custom-dark-gray-border my-4 bottom-5 absolute w-full">
        <div class="flex gap-2">
          <div class="w-3 border-round-2xl bg-black-alpha-90 border-1 border-black-alpha-90 custom-px-12 py-2 mt-4"
            @click="navigate('/')">
            <div class="flex justify-content-between align-items-center">
              <label class="text-xs text-white font-bold">Cancel</label>
              <i class="far fa-times-circle text-white text-xs"></i>
            </div>
          </div>

          <div class="w-9 border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-2 py-2 mt-4"
            @click="acceptTerms()">
            <div class="flex justify-content-between align-items-center">
              <label class="text-xs font-bold">Accept Terms & Conditions</label>
              <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="custom-desktop-view">
      <div class="border-top-1 custom-dark-gray-border my-4 px-4 w-full">
        <div class="flex justify-content-between mt-4">
          <div class="flex align-items-center bg-black-alpha-90 border-round-3xl gap-2 px-3 py-2"
            @click="navigate('/')">
            <label class="font-bold text-white">Cancel</label>
            <i class="far fa-times-circle text-white"></i>
          </div>

          <div class="flex justify-content-end align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2"
            @click="acceptTerms()">
            <label class="font-bold">Accept Terms & Conditions</label>
            <i class="far fa-circle-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity" />
  <Toast />
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "vuex";

import quoteService from "@/services/quoteService.js";

import useToastMessages from "@/composables/useToastMessages";
const { showSuccessToast, showErrorToast } = useToastMessages();

const store = useStore();

const selectedQuote = store.getters.getSelectedQuote;
const quoteRef = store.getters.getQuoteRef;

const router = useRouter();

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

onMounted(() => {
  //
});

const acceptTerms = () => {
  let data = {};

  data.quoteRef = store.getters.getQuoteRef;
  data.tscAccepted = 1;
  data.underwriter = store.getters.getSelectedQuote.underwriterName;

  isLoading.value = true;

  quoteService
    .selectQuoteUnderwriter(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code == 200) {
        navigate("/personal-details");
      } else {
        showErrorToast("Error", response.data.message);
      }
    })
    .catch((error) => {
      isLoading.value = false;
      showErrorToast("Error", error);
    })
};

const navigate = (path) => {
  router.push(path);
};
</script>
