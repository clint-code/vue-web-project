<template>
  <TopNav back="/get-quote" variation="white" />

  <div class="custom-mobile-view">
    <div class="px-3 py-4" :style="{ 'margin-bottom': marginBottom }">
      <div class="flex">
        <i class="fas fa-message-check text-yellow-500 text-2xl"></i>

        <div class="flex flex-column mx-2">
          <label class="font-bold mb-1">Your quote is ready!</label>
          <div class="custom-bottom-border"></div>
        </div>
      </div>

      <div class="mt-4 flex flex-column gap-6" v-if="quotes != null">
        <div v-for="(quote, index) in quotes" :key="index">
          <div class="custom-card border-round-2xl relative p-3">
            <div class="flex justify-content-between align-items-center">
              <img :src="quote.UnderwriterIcon" height="40px" width="auto" />

              <div class="border-round-2xl bg-yellow-500 border-yellow-500 text-black-alpha-90 font-bold p-2 text-sm"
                size="small" @click="buyQuote(quote)">
                Buy Now
              </div>
            </div>
            <hr class="custom-gray" />

            <div class="flex justify-content-between">
              <div class="flex flex-column">
                <label class="font-bold text-sm">Lipa in full</label>
              </div>

              <template v-if="quote.LipaFullAmount != null">
                <label class="font-bold text-right w-5">KES {{ quote.LipaFullAmount.toLocaleString() }}</label>
              </template>
            </div>
            <hr class="custom-gray" />

            <div class="flex justify-content-between">
              <div class="flex flex-column">
                <label class="font-bold text-sm">Lipa Pole Pole Deposit</label>
              </div>

              <template v-if="quote.LipaPolePoleDeposit != null">
                <label class="font-bold text-right w-6">KES {{ quote.LipaPolePoleDeposit.toLocaleString() }}</label>
              </template>
            </div>

            <div class="flex justify-content-between mt-1">
              <label class="font-light text-xs text-left w-6">
                Monthly Installment
              </label>

              <template v-if="quote.LipaPolePoleInstallment != null">
                <label class="font-bold text-xs text-right w-6">KES {{ quote.LipaPolePoleDeposit.toLocaleString() }}
                </label>
              </template>
            </div>

            <div class="flex justify-content-center mt-4">
              <div class="custom-light-gray-bg custom-gray-border custom-overlap border-round-2xl" id="benefitsButton"
                :style="{ bottom: buttonBottom }" @click="showQuote(quote, index)">
                <div class="flex justify-content-center py-2">
                  <span class="text-sm font-bold">
                    {{ quote.buttonText }}
                  </span>
                </div>

                <div class="custom-caret-info" :style="{ bottom: buttonBottom }" v-if="quote.active">
                  <i class="fas fa-caret-down custom-light-gray text-3xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="custom-light-gray-bg border-round-2xl custom-shadow mt-4" v-if="quote.active">
            <div class="p-4">
              <div class="flex justify-content-between">
                <label class="text-xs font-medium">Base Premium</label>
                <template v-if="quote.BasicPremium != null">
                  <label class="text-xs text-right font-bold">
                    KES {{ quote.BasicPremium.toLocaleString() }}
                  </label>
                </template>
              </div>

              <template v-if="quote.addedBenefits && quote.addedBenefits.length">
                <div v-for="(benefit, index) in quote.addedBenefits">
                  <div class="flex justify-content-between mt-2">
                    <label class="text-xs">{{ benefit.name }}</label>
                    <template v-if="benefit.amount != null">
                      <label class="text-xs text-right font-bold">KES {{ benefit.amount.toLocaleString() }}</label>
                    </template>
                  </div>
                </div>
              </template>

              <template v-if="quote.taxesAndCharges.length">
                <div v-for="(tax, index) in quote.taxesAndCharges">
                  <div class="flex justify-content-between mt-2">
                    <label class="text-xs">{{ tax.name }}</label>
                    <template v-if="tax.amount != null">
                      <label class="text-xs text-right font-bold">KES {{ tax.amount.toLocaleString() }}</label>
                    </template>
                  </div>
                </div>
              </template>
            </div>

            <div>
              <TabView>
                <TabPanel>
                  <template #header>
                    <div class="flex align-items-center gap-3">
                      <span class="font-bold white-space-nowrap text-sm">Add Benefits</span>
                      <i class="fas fa-layer-plus text-sm"></i>
                    </div>
                  </template>

                  <div v-for="(benefit, index) in formattedBenefits">
                    <div :class="{
      'flex-column': benefit.limitInput && benefit.active,
      'align-items-center': !benefit.limitInput || !benefit.active
    }" class="flex justify-content-between  custom-gray-border-bottom py-2">
                      <div class="flex align-items-center">
                        <Checkbox v-model="benefit.active" :binary="true" variant="filled"
                          @change="changeBenefit(benefit, index)" />
                        <label class="text-xs ml-2">
                          {{ benefit.name }}
                          <template v-if="benefit.limitInput && benefit.minimumLimit != null
      ">
                            <span class="text-xs">(Free upto
                              {{ benefit.minimumLimit.toLocaleString() }})</span>
                          </template>
                        </label>
                      </div>

                      <template v-if="benefit.limitInput && benefit.active">
                        <div class="mt-2">
                          <InputGroup class="border-round-2xl">
                            <InputGroupAddon
                              class="border-round-left-2xl bg-white border-left-2 border-left-2 border-y-2 custom-dark-gray-border">
                              <span class="text-xs font-bold">KES</span>
                            </InputGroupAddon>
                            <InputText class="border-y-2 border-x-none custom-dark-gray-border text-xs"
                              :placeholder="benefit.minimumLimit.toLocaleString() + ' - ' + benefit.maximumLimit.toLocaleString()"
                              size="small" v-model="benefit.benefitValue" />

                            <InputGroupAddon class="border-round-right-2xl border-none custom-dark-gray-bg-1"
                              style="box-shadow: inset 0 0 0 2px #4a4a4a" @click="changeBenefitWithLimit(benefit)">
                              <span class="text-white font-bold">ADD</span>
                            </InputGroupAddon>
                          </InputGroup>
                        </div>
                      </template>

                      <template v-else-if="benefit.amount != null && !benefit.limitInput">
                        <label class="text-xs text-right">
                          KES {{ benefit.amount.toLocaleString() }}
                        </label>
                      </template>
                    </div>
                  </div>

                  <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-4"
                    @click="buyQuote(quote)">
                    <div class="flex justify-content-between align-items-center">
                      <label class="font-bold">Buy Now</label>
                      <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <template #header>
                    <div class="flex align-items-center gap-3">
                      <span class="font-bold white-space-nowrap text-sm">Cover Details</span>
                      <i class="fas fa-square-info"></i>
                    </div>
                  </template>

                  <template v-if="quote.coverDetails.length">
                    <div v-for="(cover, index) in quote.coverDetails">
                      <div class="flex justify-content-between custom-gray-border-bottom py-1 mb-2" :key="index">
                        <label class="text-xs">{{ cover.name }}</label>
                        <label class="text-xs">KES {{ cover.price.toLocaleString() }}</label>
                      </div>
                    </div>
                  </template>

                  <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-4"
                    @click="buyQuote(quote)">
                    <div class="flex justify-content-between align-items-center">
                      <label class="font-bold">Buy Now</label>
                      <template v-if="quote.LipaFullAmount != null">
                        <label class="font-bold">
                          KES
                          {{ quote.LipaFullAmount.toLocaleString() }}
                        </label>
                      </template>

                      <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                    </div>
                  </div>
                </TabPanel>
              </TabView>
            </div>
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
import { useStore } from "vuex";
import useToastMessages from "@/composables/useToastMessages";

import quoteService from "@/services/quoteService.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const quotes = store.getters.getQuotes;
const quoteRef = store.getters.getQuoteRef;
const activeQuote = ref();
const activeQuoteIndex = ref(null);
const formattedBenefits = ref(null);

const buttonBottom = ref(null);
const marginBottom = ref(null);

const { showErrorToast } = useToastMessages();
const isLoading = ref(false);

onMounted(() => {
  console.log(store.getters.getQuoteRef)

  var button = document.getElementById("benefitsButton");
  var butHeight = button.offsetHeight;
  var halvedButton = butHeight / 2;

  buttonBottom.value = "-" + halvedButton + "px";
});

const showQuote = (quote, index) => {
  if (quote.active) {
    quote.active = false;
    quote.buttonText = "View Benefits";
    activeQuoteIndex.value = null;
  } else {
    if (activeQuoteIndex.value != null) {
      quotes[activeQuoteIndex.value].active = false;
      quotes[activeQuoteIndex.value].buttonText = "View Benefits";
      activeQuoteIndex.value = null;
    }
    quote.active = true;
    quote.buttonText = "Close";
    activeQuoteIndex.value = index;
    activeQuote.value = quote;

    formatBenefits(quote.AdditionalBenefits);
  }
};

const formatBenefits = (additionalBenefits) => {
  formattedBenefits.value = null;

  if (additionalBenefits.length) {
    if (
      activeQuote.value.addedBenefits &&
      activeQuote.value.addedBenefits.length
    ) {
      const formattedBenefitsArray = [];

      formattedBenefits.value = additionalBenefits.map((benefit) => {
        const formattedBenefit = benefit;

        const index = activeQuote.value.addedBenefits.findIndex(
          (addedBenefit) => addedBenefit.name === benefit.name
        );

        if (index !== -1) {
          formattedBenefit.active = true;
          formattedBenefit.benefitValue = benefit.limitInput
            ? activeQuote.value.addedBenefits[index].limitAmount
            : null;
        } else {
          formattedBenefit.benefitValue = null;
          formattedBenefit.active = false;
        }

        formattedBenefitsArray.push(formattedBenefit);
      });

      formattedBenefits.value = formattedBenefitsArray;
    } else {
      formattedBenefits.value = additionalBenefits.map((benefit) => ({
        ...benefit,
        active: false,
        benefitValue: null,
      }));
    }
  }
};

const changeBenefit = (benefit, index) => {
  if (!benefit.limitInput || !benefit.active) {
    let status = benefit.active ? "add" : "remove";

    let data = {};
    data.quoteRef = quoteRef;
    data.action = status;
    data.benefitName = benefit.name;
    data.underWriter = activeQuote.value.underwriterName;
    data.limitAmount = benefit.amount;

    addOrRemoveBenefit(data);
  }
};

const changeBenefitWithLimit = (benefit) => {
  if (
    benefit.benefitValue > benefit.minimumLimit &&
    benefit.benefitValue < benefit.maximumLimit
  ) {
    let data = {};
    data.quoteRef = quoteRef;
    data.action = "add";
    data.benefitName = benefit.name;
    data.underWriter = activeQuote.value.underwriterName;
    data.limitAmount = benefit.benefitValue;

    addOrRemoveBenefit(data);
  } else {
    showErrorToast(
      "Error",
      "Benefit value should be greater than " +
      benefit.minimumLimit.toLocaleString() +
      " but less than " +
      benefit.maximumLimit.toLocaleString()
    );
  }
};

const addOrRemoveBenefit = (data) => {
  isLoading.value = true;

  quoteService
    .addOrRemoveBenefit(data)
    .then((response) => {
      let newQuote = response.data.data;
      newQuote.active = true;
      newQuote.buttonText = "Close";

      quotes[activeQuoteIndex.value] = newQuote;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      showErrorToast("Error", error);
    });
};

const buyQuote = (quote) => {
  store.commit("setSelectedQuote", quote);
  router.push("/accept-terms");
};
</script>
