<template>
  <TopNav back="/get-quote" variation="white-yellow-icons" />

  <div class="custom-mobile-view">
    <div class="px-3 pt-4" :style="{ 'margin-bottom': marginBottom }">
      <div class="flex justify-content-between">
        <label class="font-bold text-sm">Motor Car Insurance</label>
        <label class="font-bold text-sm">Step 1 of 4</label>
      </div>

      <ProgressBar
        class="custom-progress-bar mt-2"
        :value="25"
        :showValue="false"
      ></ProgressBar>

      <div class="relative bg-yellow-500 border-round-2xl px-3 py-2 mt-3 z-2">
        <label class="text-sm font-bold">Your Personal Details</label>
      </div>

      <div class="relative z-1">
        <div
          class="custom-light-gray-bg-1 border-round-bottom-3xl custom-accordion-body py-4 px-3"
        >
          <div class="grid">
            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm">Enter Name</label>
                <InputText
                  v-model="customerName"
                  class="text-sm border-round-3xl"
                  placeholder="Enter your ID name"
                />
              </div>
            </div>

            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm font-medium">Choose I.D. Type</label>
                <Dropdown
                  v-model="selectedIdenficationDocument"
                  :options="identificationDocuments"
                  optionLabel="name"
                  optionValue="value"
                  placeholder="Select Document"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown"
                />
              </div>
            </div>
          </div>

          <div class="grid mt-1">
            <div class="col-6">
              <div class="flex flex-column gap-2">
                <template v-if="selectedIdenficationDocument == 'NationalID'">
                  <label class="text-sm">Enter ID Number</label>
                  <InputText
                    class="text-sm border-round-3xl"
                    placeholder="Enter ID number"
                    v-model="nationalId"
                  />
                </template>

                <template v-else>
                  <label class="text-sm">Passport</label>
                  <InputText
                    v-model="passport"
                    class="text-sm border-round-3xl"
                    placeholder="Enter ID number"
                  />
                </template>
              </div>
            </div>

            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm">KRA PIN</label>
                <InputText
                  v-model="kraPin"
                  class="text-sm border-round-3xl"
                  placeholder="PIN number"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="grid mt-1">
            <div class="col-12">
              <div
                class="w-full border-round-2xl bg-yellow-500 px-3 py-2 mt-2"
                @click="verifyCustomer()"
              >
                <div class="flex justify-content-between align-items-center">
                  <label for="" class="font-bold text-sm"
                    >Verify Details
                  </label>
                  <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="grid mt-1">
            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm font-medium">Phone Number</label>
                <InputGroup>
                  <InputGroupAddon class="bg-yellow-500 border-round-left-2xl">
                    <span class="text-xs font-bold">+254</span>
                  </InputGroupAddon>
                  <InputText
                    type="number"
                    v-model="phoneNumber"
                    class="border-round-right-3xl text-sm"
                    placeholder="Enter Phone Number"
                  />
                </InputGroup>
              </div>
            </div>

            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm font-medium">Email</label>
                <InputText
                  v-model="email"
                  class="text-sm border-round-3xl"
                  placeholder="Enter Email"
                />
              </div>
            </div>
          </div>

          <div class="grid mt-1">
            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm font-medium">Date of Birth</label>

                <Calendar
                  v-model="dob"
                  placeholder="Choose Date"
                  class="w-full custom-rounded-calendar custom-small-dropdown"
                  showIcon
                  iconDisplay="input"
                  :maxDate="maxDate"
                >
                  <template #inputicon="{ clickCallback }">
                    <i
                      class="fas fa-calendar-days text-black-alpha-90 text-sm"
                      @click="clickCallback"
                    ></i>
                  </template>
                </Calendar>
              </div>
            </div>

            <div class="col-6">
              <div class="flex flex-column gap-2">
                <label class="text-sm font-medium">Upload Copy ID</label>
                <div
                  class="custom-file-input-container bg-white border-round-3xl"
                >
                  <input
                    type="file"
                    id="fileInput"
                    class="custom-file-input"
                    @change="uploadFile($event)"
                  />
                  <label class="text-sm custom-input-color">{{
                    uploadTxt
                  }}</label>
                  <i class="fas fa-upload text-sm custom-gray"></i>
                </div>
              </div>
            </div>
          </div>

          <div
            class="w-full border-round-2xl border-1 px-3 py-2 mt-2"
            :class="{
              'bg-yellow-500 border-yellow-500 ': verificationStatus,
              'custom-gray-bg': !verificationStatus,
            }"
            @click="submit()"
          >
            <div class="flex justify-content-between align-items-center">
              <label class="font-bold text-sm">Save and Continue</label>
              <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="overlay"></div>
  </div>

  <div class="custom-desktop-view custom-width-80">
    <DesktopPersonalDetails />
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import Footer from "@/components/Footer.vue";
import Steps from "@/components/Steps.vue";
import DesktopPersonalDetails from "@/components/Desktop/AdditionalDetails/PersonalDetails.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import additionalDetailsService from "@/services/additionalDetailsService.js";

import useToastMessages from "@/composables/useToastMessages";
const { showSuccessToast, showErrorToast } = useToastMessages();

import { useStore } from "vuex";
import { faL } from "@fortawesome/free-solid-svg-icons";
const store = useStore();
const quoteRef = store.getters.getQuoteRef;

const router = useRouter();

const step = ref("Personal Details");
const level = ref(1);

const items = ref([
  {
    label: "Personal Info",
  },
  {
    label: "Reservation",
  },
  {
    label: "Review",
  },
]);

const selectedIdenficationDocument = ref("NationalID");
const identificationDocuments = ref([
  {
    name: "National ID",
    value: "NationalID",
  },
  {
    name: "Passport",
    value: "Passport",
  },
]);
const uploadTxt = ref("Upload");
const marginBottom = ref(null);
const overlay = ref(null);

const customerName = ref(null);
const dob = ref(null);

const nationalId = ref(null);
const passport = ref(null);

const kraPin = ref(null);
const verificationStatus = ref(false);

const email = ref(null);
const phoneNumber = ref(null);

const maxDate = ref(new Date());

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

const verifyCustomer = () => {
  let data = {};

  data.nationalId = nationalId.value;
  data.docType = selectedIdenficationDocument.value;
  data.customerName = customerName.value;
  data.quoteRef = quoteRef;

  isLoading.value = true;

  additionalDetailsService
    .verifyCustomer(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code == 200) {
        console.log(response.data.data);
        verificationStatus.value = true;
        kraPin.value = response.data.data.kraPin;
        customerName.value = response.data.data.iprsCustomerName;
      } else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error.response.data);
      isLoading.value = false;
    });
};

onMounted(() => {
  // var bottomCard = document.getElementById('bottomCard')
  // var bottomCardHeight = bottomCard.offsetHeight
  // marginBottom.value = bottomCardHeight + 'px'
});

const displayOverlay = (value) => {
  if (value) {
    overlay.value = "custom-overlay";
  } else {
    overlay.value = null;
  }
};

const uploadFile = (e) => {
  // uploadTxt.value = e.target.files[0].name
  uploadTxt.value = "Uploaded";
};

const submit = () => {
  let data = {};

  data.nationalId = nationalId.value;
  data.docType = selectedIdenficationDocument.value;
  data.customerName = customerName.value;
  data.kraPin = kraPin.value;
  data.email = email.value;
  data.customerType = "Individual";
  data.phoneNumber = phoneNumber.value;
  data.quoteRef = quoteRef;

  router.push("/vehicle-details");

  isLoading.value = true;

  additionalDetailsService
    .createCustomer(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code == 200) {
        store.commit("setPersonalDetails", data);
        navigate("/vehicle-details");
      } else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error.response.data);
      isLoading.value = false;
    });
};
</script>
