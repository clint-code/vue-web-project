<template>
  <div class="h-full">
    <template v-if="hasSubmitted">
      <TopNav variation="no-back-arrow-white" :page="page" />

      <!-- Rating -->
      <div class="py-4 flex flex-column justify-content-between align-items-center gap-8">
        <div class="flex flex-column justify-content-center align-items-center py-4 gap-5">
          <i class="fa-thin fa-circle-check text-8xl text-yellow-500"></i>
          <p class="m-0 text-center px-4 text-xl font-medium">
            Thank you for submitting your claim. Our team will keep you up to
            date with the claim status.
          </p>
        </div>

        <div class="px-4 flex flex-column justify-content-between gap-6">
          <div class="flex flex-column gap-2">
            <h4 class="m-0 text-lg font-medium text-center">
              How was your overall experience?
            </h4>
            <p class="m-0 font-light text-lg text-center">
              We appreciate your feedback because it helps us serve your better.
            </p>
          </div>
          <div class="ratings flex flex-column align-items-center gap-4 m-0">
            <div class="m-0">Stars</div>
            <p class="m-0 font-normal text-lg">
              <span class="m-0 text-xl font-semibold mr-2">4.0</span>
              It's Excellent
            </p>
          </div>
          <div>
            <CustomButton label="View Claim Status" icon="fa-arrow-circle-right" bgColor="custom-prop text-lg" />
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="!hasSubmitted">
      <TopNav variation="no-logo-yellow" :page="page" />

      <template v-if="!showTermsAndCondition">
        <div class=" bg-yellow-500 border-top-1 border-gray-900">
          <p class="m-0 px-3 text-md font-semibold pt-6">
            Select a policy to start your claim process.
          </p>
          <div class="w-full px-3 flex flex-column gap-4 pb-4">
            <div class="flex flex-column">
              <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name"
                placeholder="Toyota Corolla - KBU 617A"
                class="border-1 border-round-3xl custom-dark-dropdown custom-small-dropdown-1 mt-2 py-2" />
            </div>
            <div>
              <CustomButton label="Submit New Claim" bgColor="custom-bg-black" icon="fa-arrow-circle-right"
                @click="handleSubmitClaim" />
            </div>
          </div>
        </div>

        <!-- Has no claims -->
        <template v-if="!hasClaims">
          <div class="px-4 py-4 flex flex-column align-items-center gap-4 mb-4">
            <div class="px-5 custom-border-title">
              <h5 class="text-xl font-medium text-center mb-2">
                Hi Victor, welcome to our simple & fast claim process.
              </h5>
              <div class="flex justify-content-center">
                <div class="custom-bottom-border-1 w-4"></div>
              </div>
            </div>
            <p class="m-0 text-center font-light text-gray-600 line-height-3">
              If you are visiting this page, chances are you are going through a
              tough time. We will make the process as easy and transparent as
              possible to help provide you with the peace of mind you need.
            </p>
            <div class="m-0 text-center">
              <i class="fa-thin fa-shield-exclamation text-8xl"></i>
              <p class="text-md font-medium text-gray-800">
                You have no active claims!
              </p>
            </div>
          </div>
        </template>

        <!-- Has claims -->
        <template v-else-if="hasClaims">
          <div class="m-0 flex flex-column gap-4 px-3">
            <div class="flex align-items-center gap-2 border-bottom-1 border-yellow-500 py-3">
              <h3 class="m-0 font-normal">Claim Status</h3>
              <i class="fa-thin fa-sensor-triangle-exclamation text-2xl"></i>
            </div>
            <div class="custom-claims-status">
              <div v-for="(claim, index) in submittedClaims" :key="index"
                class="card-claim py-3 flex flex-column gap-2 align-items-center justify-content-center border-2 border-gray-500 border-round-xl">
                <div>
                  <img :src="claim.image" alt="Claim Png" height="40px" width="auto" />
                </div>
                <div class="flex flex-column gap-1">
                  <p class="m-0 text-sm text-center font-medium">
                    {{ claim.claimType }}
                  </p>
                  <p class="m-0 text-sm text-center font-medium">
                    {{ claim.claimOn }}
                  </p>
                </div>
                <div>
                  <div class="border-round-xl py-1 w-full px-2 text-center" :class="{
      'bg-yellow-500': claim.status === 'Approved',
      'custom-bg-black text-white':
        claim.status === 'Submitted',
      'bg-red-500 text-white': claim.status === 'Declined',
      'custom-bg-green': claim.status === 'Released',
    }">
                    <label class="text-sm font-normal">{{
      claim.status
    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>

      <!-- Terms & Conditions -->
      <template v-else-if="showTermsAndCondition">
        <div class="bg-yellow-500 border-top-1 border-gray-900">
          <div class="py-2 px-4">
            <h4 class="m-0 text-xl">Toyota Corolla - KBU 617A</h4>
            <h6 class="m-0 text-lg uppercase">Important notice</h6>
            <ol role="list" class="px-3 py-0">
              <li class="text-sm font-light line-height-3">
                The information provided is to enable the company and its
                Solicitors to advise on and to conduct anylegal proceedings
                which may ensure.
              </li>
              <li class="text-sm font-light line-height-3">
                No liability under the policy is admitted by Issue of this
                electronic form.
              </li>
              <li class="text-sm font-light line-height-3">
                Neither owner nor driver must admit fault or liability for this
                accident.
              </li>
              <li class="text-sm font-light line-height-3">
                Do not answer communications about this accident, but send them
                to the Insurers for consideration.
              </li>
              <li class="text-sm font-light line-height-3">
                All questions must be answered in full by yourself or to your
                dictation.
              </li>
              <li class="text-sm font-light line-height-3">
                Repairs must not be authorised without prior authority of the
                Insurers.
              </li>
            </ol>
          </div>
        </div>

        <div :class="{
      'bg-yellow-500 border-y-1': accepted,
      'custom-bg-black': !accepted,
    }">
          <div class="py-3 px-4 flex gap-2">
            <Checkbox v-model="accepted" :binary="true" />
            <label for="terms" :class="{ 'text-sm': true, 'font-medium': accepted }">
              Please confirm you have read and understood the above notice to
              continue.
            </label>
          </div>
        </div>

        <template v-if="accepted">
          <div class="py-3 px-3">
            <h6 class="m-0 text-lg font-medium">Choose type of claim</h6>
            <div class="custom-claims py-4">
              <div v-for="(claim, index) in claims" :key="index"
                class="card-claim flex flex-column gap-2 align-items-center justify-content-center py-2 px-1 border-2 border-round-xl"
                @click="handleClick(index)" :class="{
      'border-gray-500  ': selectedClaim !== index,
      'bg-yellow-500 border-black ': selectedClaim === index,
    }">
                <div>
                  <img :src="selectedClaim === index
      ? claim.image.white
      : claim.image.yellow
      " alt="damage" height="40px" width="auto" />
                </div>
                <p class="m-0 text-xs text-center font-semibold">
                  {{ claim.label }}
                </p>
                <div class="border-round-xl py-1 w-full text-center" :class="{
      'bg-yellow-500': selectedClaim !== index,
      'custom-bg-black': selectedClaim === index,
    }">
                  <label class="text-sm font-medium">Submit Claim</label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </template>

    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import CustomButton from "@/components/shared/CustomButton.vue";
import Footer from "../../components/Footer.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { submitCl, submittedCls } from "@/util/claims.js";

const router = useRouter();
const page = "My Claims";
const showTermsAndCondition = ref(false);
const accepted = ref(false);
const selectedClaim = ref(null);
const hasClaims = ref(true);
const hasSubmitted = ref(false);

const submittedClaims = submittedCls;

const claims = submitCl

const handleClick = (index) => {
  selectedClaim.value = index;
  const path = claims[index].path;
  router.push(path);
};

const handleSubmitClaim = () => {
  showTermsAndCondition.value = true;
};
</script>
