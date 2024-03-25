<template>
  <TopNav back="/get-quote" variation="white-yellow-icons" />

  <div class="custom-mobile-view">
    <div class="px-3 pt-4 overflow-y-auto mb-4 relative">
      <!-- Header Progress Bar -->
      <div>
        <div class="flex justify-content-between">
          <label class="font-bold text-xs">Motor Car Insurance</label>
          <label class="font-bold text-xs">Step 3 of 4</label>
        </div>

        <ProgressBar class="custom-progress-bar mt-2" :value="75" :showValue="false"></ProgressBar>
      </div>

      <!-- Lipa Full -->
      <div class="my-4">
        <div>
          <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion"
            v-if="!lipaFullDetails">
            <div class="flex justify-content-between">
              <label class="font-bold text-sm text-white w-6">Lipa in Full</label>
              <label class="font-bold text-sm text-white text-right w-6">KES {{
          quoteSummary.LipaFullAmount.toLocaleString() }}</label>
            </div>

            <div class="flex justify-content-between gap-4">
              <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3"
                @click="toggleLipaFullDetails()">
                <label class="font-bold text-sm p-2">View</label>
              </div>

              <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3" @click="submit()">
                <label class="font-bold text-sm p-2">Pay Now</label>
              </div>
            </div>
          </div>
        </div>

        <div class="relative" v-if="lipaFullDetails">
          <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
            <div class="mt-8">
              <QuoteDetails quoteType="Lipa Full" />
            </div>

            <div class="mt-3">
              <div @click="submit()"
                class="flex justify-content-between border-round-2xl bg-yellow-500 px-3 py-2 align-items-center">
                <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                <label class="font-bold text-sm text-alpha-90">KES {{ quoteSummary.LipaFullAmount.toLocaleString()
                  }}</label>
                <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
              </div>
            </div>
          </div>

          <div
            class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion-body z-0">
            <div class="flex justify-content-between">
              <label class="font-bold text-sm text-white w-6">Lipa in Full</label>
              <label class="font-bold text-sm text-white text-right w-6">KES {{
          quoteSummary.LipaFullAmount.toLocaleString() }}</label>
            </div>

            <div class="flex justify-content-between gap-4" @click="toggleLipaFullDetails()">
              <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3">
                <label class="font-bold text-sm p-2">Close</label>
              </div>

              <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3" @click="submit()">
                <label class="font-bold text-sm p-2">Pay Now</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lipa Pole Pole -->
      <div class="my-4">
        <div>
          <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion"
            v-if="!lipaPolePoleDetails">
            <div class="flex justify-content-between">
              <label class="font-bold text-sm text-white w-6">Lipa Pole Pole</label>
              <label class="font-bold text-sm text-white text-right w-6">KES
                {{ quoteSummary.LipaPolePoleDeposit.toLocaleString() }}</label>
            </div>

            <div class="flex justify-content-between gap-4">
              <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3"
                @click="toggleLipaPolePoleDetails()">
                <label class="font-bold text-sm p-2">View</label>
              </div>

              <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3" @click="submit()">
                <label class="font-bold text-sm p-2">Pay Now</label>
              </div>
            </div>
          </div>
        </div>

        <div class="relative" v-if="lipaPolePoleDetails">
          <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
            <div class="mt-8">
              <QuoteDetails quoteType="Lipa Pole Pole" />
            </div>

            <div class="mt-4">
              <label class="font-bold">Customise your lipa pole pole plan</label>

              <div class="flex flex-column mt-4">
                <label class="font-bold text-sm">Deposit Amount</label>
                <InputText class="border-round-3xl text-sm mt-2" placeholder="Enter amount above 25,000" />
              </div>

              <div class="flex flex-column mt-4">
                <label class="font-bold text-sm">Installment Period (Upto 10 Months)</label>
                <Dropdown v-model="selectedInstallmentPeriod" :options="installmentsArray" placeholder="Choose"
                  class="border-round-3xl custom-dark-dropdown custom-md-dropdown mt-2" optionLabel="name" />
              </div>
            </div>

            <div class="mt-4">
              <div
                class="flex justify-content-between border-round-2xl custom custom-dark-gray-bg px-3 py-2 align-items-center">
                <label class="font-bold text-sm text-white">Continue</label>
                <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-white"></i>
              </div>
            </div>

            <div class="mt-3">
              <div @click="submit()"
                class="flex justify-content-between border-round-2xl bg-yellow-500 px-3 py-2 align-items-center">
                <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                <template v-if="quoteSummary.LipaPolePoleDeposit">
                  <label class="text-sm font-bold text-right w-8">KES
                    {{
          quoteSummary.LipaPolePoleDeposit.toLocaleString()
        }}</label>
                </template>
                <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
              </div>
            </div>
          </div>

          <div
            class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion-body z-0">
            <div class="flex justify-content-between">
              <label class="font-bold text-sm text-white w-6">Lipa Pole Pole</label>
              <label class="font-bold text-sm text-white text-right w-6">KES {{
            quoteSummary.LipaPolePoleDeposit.toLocaleString()
          }}</label>
            </div>

            <div class="flex justify-content-between gap-4">
              <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3"
                @click="toggleLipaPolePoleDetails()">
                <label class="font-bold text-sm p-2">Close</label>
              </div>

              <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3" @click="submit()">
                <label class="font-bold text-sm p-2">Pay Now</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="custom-desktop-view">
    <div class="custom-width-80">
      <div class="grid">
        <div class="lg:col-10 relative">
          <div class="mb-4">
            <div class="mt-3">
              <div
                class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-1 px-3 py-2 custom-w-5"
                @click="navigate('/vehicle-details')">
                <i class="fas fa-angle-double-left text-white"></i>
                <label class="text-sm font-bold text-white justify-content-end">Back</label>
              </div>

              <h3 class="mb-2">Here is a summary of your insurance policy.</h3>
              <div class="custom-bottom-border-1 w-2"></div>
            </div>

            <!-- Lipa Full -->
            <div class="mt-5">
              <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion-1"
                v-if="!summaryDetails" @click="toggleSummaryDetails()">
                <div class="flex">
                  <label class="font-bold text-sm mr-auto">Lipa Full</label>               

                  <template v-if="quoteSummary.LipaFullAmount">
                    <label class="font-bold text-sm mx-auto">KES
                      {{ quoteSummary.LipaFullAmount.toLocaleString() }}
                    </label>                   
                  </template>

                  <i class="fas fa-circle-chevron-down ml-auto"></i>                  
                </div>
              </div>

              <div class="relative" v-if="summaryDetails">
                <div class="w-full custom-gray-border border-1 border-round-bottom-3xl border-top-none p-3 z-1">
                  <QuoteDetails quoteType="Lipa Full" />

                  <div class="mt-3">
                    <div @click="submit()"
                      class="flex justify-content-between border-round-2xl bg-yellow-500 px-3 py-2 align-items-center">
                      <label class="font-bold text-sm text-alpha-90">Pay Now</label>

                      <template v-if="quoteSummary.LipaFullAmount">
                        <label class="font-bold text-sm">KES
                          {{ quoteSummary.LipaFullAmount.toLocaleString() }}</label>
                      </template>
                      <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
                    </div>
                  </div>
                </div>

                <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion-body-2 z-0"
                  @click="toggleSummaryDetails()">
                  <div class="flex justify-content-between">
                    <label class="font-bold text-sm">Lipa Full</label>
                    <template v-if="quoteSummary.LipaFullAmount">
                      <label class="font-bold text-sm">KES
                        {{
          quoteSummary.LipaFullAmount.toLocaleString()
        }}</label>
                    </template>
                    <i class="fas fa-circle-chevron-up"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lipa Pole Pole -->
            <div class="mt-4">
              <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion-1"
                v-if="!paymentPlan" @click="togglePaymentPlan()">
                <div class="flex">
                  <label class="font-bold text-sm mr-auto">Lipa Pole Pole</label>

                  <template v-if="quoteSummary.LipaPolePoleDeposit">
                    <label class="font-bold text-sm mx-auto">KES
                      {{ quoteSummary.LipaPolePoleDeposit.toLocaleString() }}
                    </label>
                  </template>

                  <i class="fas fa-circle-chevron-down ml-auto"></i>
                </div>
              </div>

              <div class="relative" v-if="paymentPlan">
                <div class="w-full custom-gray-border border-1 border-round-bottom-3xl z-1">
                  <div class="px-3 pt-3 ">
                    <QuoteDetails quoteType="Lipa Pole Pole" />
                  </div>

                  <div class="custom-light-gray-bg-1 border-round-bottom-3xl p-3">
                    <div>
                      <label class="font-bold">Customise your lipa pole pole plan</label>
                      <div class="grid">
                        <div class="col-6">
                          <div class="flex flex-column mt-4">
                            <label class="font-bold text-sm">Deposit Amount</label>
                            <InputText class="border-round-3xl text-sm mt-2" v-model="deposit" :placeholder=" 'Enter amount above ' + quoteSummary.LipaPolePoleDeposit.toLocaleString()" />
                          </div>
                        </div>

                        <div class="col-6">
                          <div class="flex flex-column mt-4">
                            <label class="font-bold text-sm">Installment Period (Upto 10 Months)</label>
                            <Dropdown v-model="selectedInstallmentPeriod" :options="installmentsArray"
                              placeholder="Choose" class="border-round-3xl custom-dark-dropdown custom-md-dropdown mt-2"
                              optionLabel="name" optionValue="value" />
                          </div>
                        </div>
                      </div>

                      <div class="grid mt-2">
                        <div class="col-6">
                          <div
                            class="flex justify-content-between border-round-2xl custom-dark-gray-bg px-3 py-2 align-items-center shadow-1" @click="calculate()">
                            <label class="font-bold text-sm text-white">Continue</label>
                            <i class="fas fa-circle-arrow-right text-black-alpha-90 text-white"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-3">
                      <div @click="submit()"
                        class="flex justify-content-between border-round-2xl bg-yellow-500 px-3 py-2 align-items-center">
                        <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                        <template v-if="quoteSummary.LipaPolePoleDeposit">
                          <label class="text-xs font-bold text-right w-8">KES
                            {{ quoteSummary.LipaPolePoleDeposit.toLocaleString() }}</label>
                        </template>
                        <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion-body-2 z-0"
                  @click="togglePaymentPlan()">
                  <div class="flex justify-content-between">
                    <label class="font-bold text-sm mr-auto">Lipa Pole Pole</label>

                    <template v-if="quoteSummary.LipaPolePoleDeposit">
                      <label class="font-bold text-sm mx-auto">KES
                        {{ quoteSummary.LipaPolePoleDeposit.toLocaleString() }}
                      </label>
                    </template>

                    <i class="fas fa-circle-chevron-down ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-2 mt-4">
          <Steps :step="step" :level="level" />
        </div>
      </div>
    </div>
  </div>

  <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity" />
  <Toast />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import TopNav from "@/components/TopNav.vue";
import QuoteDetails from "@/components/Quote/QuoteDetails.vue";
import Steps from "@/components/Steps.vue";

import summaryService from "@/services/summaryService.js";
import useToastMessages from "@/composables/useToastMessages";

import { installments } from "@/util/installments.js";

const { showSuccessToast, showErrorToast } = useToastMessages();

const router = useRouter();
const store = useStore();

const step = ref("Summary");
const level = ref(3);

const lipaFullDetails = ref(false);
const lipaPolePoleDetails = ref(false);

const deposit = ref(null);

const installmentsArray = ref(null);
const selectedInstallmentPeriod = ref(null);

const summaryDetails = ref(false);
const paymentPlan = ref(true);
const quoteSummary = store.getters.getQuoteSummary;

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

onMounted(() => {
  installmentsArray.value = installments;
});

const toggleLipaFullDetails = () => {
  if (lipaFullDetails.value) {
    lipaFullDetails.value = false;
  } else {
    lipaPolePoleDetails.value = false;
    lipaFullDetails.value = true;
  }
};

const toggleLipaPolePoleDetails = () => {
  if (lipaPolePoleDetails.value) {
    lipaPolePoleDetails.value = false;
  } else {
    lipaPolePoleDetails.value = true;
    lipaFullDetails.value = false;
  }
};

const navigate = (path) => {
  router.push(path);
};

const toggleSummaryDetails = () => {
  if (summaryDetails.value) {
    summaryDetails.value = false;
  } else {
    summaryDetails.value = true;
    paymentPlan.value = false;
  }
};

const togglePaymentPlan = () => {
  if (paymentPlan.value) {
    paymentPlan.value = false;
  } else {
    paymentPlan.value = true;
    summaryDetails.value = false;
  }
};

const calculate = () => {
  let data = {}

  data.quoteRef = quoteSummary.quoteRef
  data.companyId = quoteSummary.companyId
  data.insuranceCategoryId = quoteSummary.insuranceCategoryId
  data.policyType = quoteSummary.policyType
  data.insuranceType = quoteSummary.insuranceType
  data.totalBenfitsAmount = quoteSummary.totalBenfitsAmount
  data.totalTaxAndCharges = quoteSummary.totalTaxAndCharges
  data.deposit = deposit.value
  data.frequency = selectedInstallmentPeriod.value
  data.basicPremium = quoteSummary.BasicPremium
  data.payableAmount = quoteSummary.LipaFullAmount

  isLoading.value = true

  summaryService.lipaPolePoleCalculator(data)
    .then((response) => {
      if(response.data.response_code == 200) {
        isLoading.value = false
        let newQuoteSummary = quoteSummary 

        newQuoteSummary.LipaPolePoleDeposit = response.data.data.lipapolePoleAmount
        newQuoteSummary.LipaPolePoleInstallment = response.data.data.LipaPolePoleInstallementAmount
        newQuoteSummary.LipaPolePolePeriod = selectedInstallmentPeriod.value

        quoteSummary.value = newQuoteSummary
        store.commit("setQuoteSummary", quoteSummary);
      }
      else {
        showErrorToast(response)
      }      
    })
    .catch((error) => {
      isLoading.value = false
      showErrorToast(error)
    })
}
</script>
