<template>
  <div class="custom-desktop-view custom-width-80" :class="{
    'mt-3': props.insuranceClass == 'PRIVATE',
    'mt-7': props.insuranceClass != 'PRIVATE',
  }">
    <div class="py-4" :style="{ 'margin-bottom': marginBottom }">
      <div class="flex align-items-center">
        <i class="fas fa-message-smile text-yellow-500 text-4xl my-1"></i>

        <div class="flex flex-column mx-3">
          <h3 class="my-1">Your estimate quote is ready</h3>
          <div class="custom-bottom-border"></div>
          <label class="text-sm mt-2">Choose your preferred quote and make payment to receive your
            Digital Certificate of Insurance.</label>
        </div>
      </div>

      <div class="mt-4">
        <div class="grid relative">
          <div class="lg:col-4 mb-4" v-for="(quote, index) in quotes">
            <div class="custom-card border-round-2xl relative p-3" :key="index">
              <div class="flex justify-content-between align-items-center">
                <img 
                  :src="quote.UnderwriterIcon" 
                  height="20px" 
                  width="auto" />

                <div
                  class="border-round-2xl bg-yellow-500 border-yellow-500 text-black-alpha-90 font-bold px-2 py-1 text-xs"
                  size="small" 
                  @click="buyQuote(quote)">
                  Buy Now
                </div>
              </div>
              <hr class="custom-gray" />

              <div class="flex justify-content-between">
                <label class="font-bold text-sm text-left w-7">Lipa in Full</label>

                <template v-if="quote.LipaFullAmount != null">
                  <label class="font-bold text-right w-5">KES {{ quote.LipaFullAmount.toLocaleString() }}</label>
                </template>
                
              </div>
              <hr class="custom-gray" />

              <div class="flex justify-content-between">
                <label class="font-bold text-sm text-left w-6">Lipa Pole Pole Deposit</label>

                <template v-if="quote.LipaPolePoleDeposit != null">
                  <label class="font-bold text-right w-6">KES {{ quote.LipaPolePoleDeposit.toLocaleString() }}</label>
                </template>
              </div>

              <div class="flex justify-content-between mt-1">
                <label class="text-sm text-left w-6">
                  Monthly Installment
                </label>

                <template v-if="quote.LipaPolePoleInstallment != null">
                  <label class="text-sm text-right w-6">
                    KES {{ quote.LipaPolePoleDeposit.toLocaleString() }}
                  </label>
                </template>
              </div>

              <div class="flex justify-content-center mt-4" @click="showQuote(index, quote)">
                <div class="custom-overlap border-round-2xl" 
                :class="{ 'custom-light-gray-bg': !quote.active, 'bg-yellow-500': quote.active, }" 
                id="benefitsButton" :style="{ bottom: buttonBottom }">
                  
                  <div class="flex justify-content-center py-2">
                    <span class="text-sm font-bold">
                      {{ quote.buttonText }}
                    </span>
                  </div>

                  <div class="custom-caret-info" :style="{ bottom: buttonBottom }" v-if="quote.active">
                    <i class="fas fa-caret-down text-yellow-500 text-3xl"></i>
                  </div>

                </div>

              </div>

            </div>

            <div class="custom-full-width" v-if="quote.active">
              <div class="custom-light-gray-bg border-round-2xl custom-shadow mt-4">
                <div class="p-4">

                  <div class="flex justify-content-between">
                    <label class="text-xs font-medium">Base Premium</label>
                    <template v-if="quote.BasicPremium != null">
                      <label class="text-xs text-right font-bold">KES {{ quote.BasicPremium.toLocaleString() }}</label>
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
                  <TabView class="custom-desktop-tab">
                    <TabPanel class="py-0">
                      <template #header>
                        <div class="flex align-items-center gap-3">
                          <span class="font-bold white-space-nowrap text-sm">Add Benefits</span>
                          <i class="fas fa-layer-plus text-sm"></i>
                        </div>
                      </template>

                      <div class="py-2">
                        <template v-if="formattedBenefits != null">
                          <div v-for="(benefit, index) in formattedBenefits">
                            <div class="flex justify-content-between align-items-center custom-gray-border-bottom py-2">
                              <div class="flex align-items-center">
                                <Checkbox 
                                  v-model="benefit.active" 
                                  :binary="true" 
                                  variant="filled"
                                  @change="changeBenefit(benefit, index)" />

                                <label class="text-xs ml-2">
                                  {{ benefit.name }}
                                  <template v-if="benefit.limitInput && benefit.minimumLimit != null">
                                    <span class="text-xs">(Free upto {{ benefit.minimumLimit.toLocaleString() }})</span>
                                  </template>
                                </label>
                              </div>

                              <template v-if="benefit.limitInput && benefit.active">
                                <div class="w-4">
                                  <InputGroup class="border-round-2xl">
                                    <InputGroupAddon
                                      class="border-round-left-2xl bg-white border-left-2 border-left-2 border-y-2 custom-dark-gray-border">
                                      <span class="text-xs font-bold">KES</span>
                                    </InputGroupAddon>
                                    
                                    <InputText 
                                      class="border-y-2 border-x-none custom-dark-gray-border"
                                      v-model="benefit.benefitValue" 
                                      :placeholder="benefit.minimumLimit.toLocaleString() + ' - ' + benefit.maximumLimit.toLocaleString()" 
                                      size="small" />

                                    <InputGroupAddon
                                      class="border-round-right-2xl custom-box-shadow border-none custom-dark-gray-bg-1"
                                      @click="changeBenefitWithLimit(benefit)">

                                      <span class="text-white text-xs font-semibold">ADD</span>

                                    </InputGroupAddon>
                                  </InputGroup>
                                </div>
                              </template>

                              <template v-else-if="benefit.amount != null && !benefit.limitInput">
                                <label class="text-xs text-right">KES {{ benefit.amount.toLocaleString() }}</label>
                              </template>
                            </div>
                          </div>
                        </template>
                      </div>

                      <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-4"
                        @click="buyQuote(quote)">
                        <div class="flex justify-content-between align-items-center">
                          <label class="font-bold">Buy Now</label>

                          <template v-if="quote.LipaFullAmount != null">
                            <label class="font-bold">KES
                              {{ quote.LipaFullAmount.toLocaleString() }}</label>
                          </template>

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
                          <div class="flex justify-content-between custom-gray-border-bottom py-2 px-1 mb-2">
                            <label class="text-xs">{{ cover.name }}</label>
                            <template v-if="cover.price != null">
                              <label class="text-xs">KES {{ cover.price.toLocaleString() }}</label>
                            </template>
                          </div>
                        </div>
                      </template>

                      <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 px-1 mt-4"
                        @click="buyQuote(quote)">

                        <div class="flex justify-content-between align-items-center">
                          
                          <label class="font-bold">Buy Now</label>

                          <template v-if="quote.LipaFullAmount != null">
                            <label class="font-bold text-right">KES
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
    </div>
  </div>

  <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity" />
  <Toast />
</template>

<script setup>
import { ref, toRef, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import quoteService from "@/services/quoteService.js";

import useToastMessages from "@/composables/useToastMessages";
const { showSuccessToast, showErrorToast } = useToastMessages();

import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  insuranceClass: String,
  quotes: Array,
  quoteRef: String,
});

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

const buttonBottom = ref(null);
const marginBottom = ref(null);

const checked = ref("");

const quotes = toRef(props, "quotes");
const activeQuote = ref();
const activeQuoteIndex = ref(null);

const formattedBenefits = ref(null);

onMounted(() => {
  var button = document.getElementById("benefitsButton");

  var butHeight = button.offsetHeight;
  var halvedButton = butHeight / 3;

  buttonBottom.value = "-" + halvedButton + "px";

  // var bottomCard = document.getElementById('bottomCard')
  // var bottomCardHeight = bottomCard.offsetHeight
  // marginBottom.value = bottomCardHeight + 'px'
});

const showQuote = (index, quote) => {
  
  console.log("Index:",index, "Quote:", quote);

  if (quote.active) {
    quote.active = false;
    quote.buttonText = "View Benefits";
    activeQuoteIndex.value = null;
  } else {
    if (activeQuoteIndex.value != null) {
      props.quotes[activeQuoteIndex.value].active = false;
      props.quotes[activeQuoteIndex.value].buttonText = "View Benefits";
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
          }
        )
      );
    }
  }
};

const changeBenefit = (benefit, index) => {
  
  console.log("Benefit:", benefit, index);

  if (!benefit.limitInput || !benefit.active) {
    let status = benefit.active ? "add" : "remove";

    let data = {};
    data.quoteRef = props.quoteRef;
    data.action = status;
    data.benefitName = benefit.name;
    data.underWriter = activeQuote.value.underwriterName;
    data.limitAmount = benefit.amount;

    addOrRemoveBenefit(data);
    console.log("Benefit added:", data);
  }
};

const changeBenefitWithLimit = (benefit) => {
  
  if (
    benefit.benefitValue > benefit.minimumLimit &&
    benefit.benefitValue < benefit.maximumLimit
  ) {

    let data = {};
    data.quoteRef = props.quoteRef;
    data.action = "add";
    data.benefitName = benefit.name;
    data.underWriter = activeQuote.value.underwriterName;
    data.limitAmount = benefit.benefitValue;

    console.log("Changing benefit with limit:", data);

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
  console.log(data);
  isLoading.value = true;

  quoteService
    .addOrRemoveBenefit(data)
    .then((response) => {
      let newQuote = response.data.data;
      newQuote.active = true;
      newQuote.buttonText = "Close";
      console.log("New quote:", newQuote);

      quotes.value[activeQuoteIndex.value] = newQuote;
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      showErrorToast("Error", error.data.message);
    });
};

const buyQuote = (value) => {
  store.commit("setSelectedQuote", value);
  store.commit("setQuoteRef", props.quoteRef);
  console.log(value);

  router.push("/accept-terms");
};
</script>
