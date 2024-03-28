<template>
  <TopNav back="/get-quote" variation="white-yellow-icons" />

  <div class="custom-mobile-view">
    <div class="px-3 pt-4" :style="{ 'margin-bottom': marginBottom }">
      <div class="flex justify-content-between">
        <label class="font-bold text-sm">Motor Car Insurance</label>
        <label class="font-bold text-sm">Step 1 of 4</label>
      </div>

      <ProgressBar class="custom-progress-bar mt-2" :value="25" :showValue="false"></ProgressBar>

      <div>
        <div class="relative bg-yellow-500 border-round-3xl px-3 custom-padding-block mt-3 z-2">
          <template v-if="productCategory === 'PRIVATE'">
            <label class="text-sm font-bold">Your Personal Details</label>
          </template>
          <!-- <template v-else-if="productCategory === 'COMMERCIAL'">
          <label class="text-sm font-bold">Proposer Details</label>
        </template> -->
        </div>

        <div class="relative z-1">
          <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl custom-accordion-body py-4 px-3">
            <div class="grid">
              <div class="col-12">
                <div class="flex flex-column gap-2">
                  <label class="text-sm">Enter Name</label>
                  <InputText v-model="customerName" class="text-sm border-round-3xl custom-padding-block"
                    placeholder="Use your ID name" />
                </div>
              </div>


            </div>

            <div class="grid align-items-center mt-1">
              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <label class="text-sm font-medium">Choose I.D. Type*</label>
                  <Dropdown v-model="selectedIdenficationDocument" :options="identificationDocuments" optionLabel="name"
                    optionValue="value" placeholder="Select Document"
                    class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown py-1" />
                </div>
              </div>

              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <template v-if="selectedIdenficationDocument == 'NationalID'">
                    <label class="text-sm">Enter National ID No*</label>
                    <InputText class="text-sm border-round-3xl custom-padding-block" type="number"
                      placeholder="National ID" v-model="nationalId" />
                  </template>

                  <template v-else-if="selectedIdenficationDocument == 'AlienID'">
                    <label class="text-sm">Alien ID</label>
                    <InputText v-model="alienId" class="text-sm border-round-3xl custom-padding-block"
                      placeholder="Enter alien id" />
                  </template>

                  <template v-else-if="selectedIdenficationDocument == 'Passport'">
                    <label class="text-sm">Passport</label>
                    <InputText v-model="passport" class="text-sm border-round-3xl custom-padding-block"
                      placeholder="Enter passport number" />
                  </template>
                </div>
              </div>
            </div>

            <div class="grid mt-2">
              <div class="col-12">
                <div class="w-full border-round-3xl bg-gray-800 px-3 py-3" @click="verifyCustomer()">
                  <div class="flex justify-content-between align-items-center">
                    <label for="" class="font-bold text-sm text-white">Verify Details
                    </label>
                    <i class="fas fa-circle-arrow-right text-white"></i>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="verificationStatus">
              <div class="grid mt-3 pt-4 border-top-1 border-gray-400">
                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Phone Number</label>
                    <InputText type="number" v-model="phoneNumber" class="border-round-3xl text-sm custom-padding-block"
                      placeholder="Enter Phone Number" />
                  </div>
                </div>

                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Email</label>
                    <InputText v-model="email" class="text-sm border-round-3xl custom-padding-block"
                      placeholder="Enter Email" />
                  </div>
                </div>
              </div>

              <div class="grid mt-1 align-items-center">
                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Date of Birth</label>

                    <Calendar v-model="dob" placeholder="Choose Date"
                      class="w-full custom-rounded-calendar custom-small-dropdown custom-pd-calendar" showIcon
                      iconDisplay="input" :maxDate="maxDate">
                      <template #inputicon="{ clickCallback }">
                        <i class="fas fa-calendar-days text-black-alpha-90 text-sm " @click="clickCallback"></i>
                      </template>
                    </Calendar>
                  </div>
                </div>

                <template v-if="kraPinStatus">
                  <div class="col-6">
                    <div class="flex flex-column gap-2">
                      <label class="text-sm font-medium">KRA PIN</label>
                      <InputText v-model="kraPIN" class="text-sm border-round-3xl custom-padding-block"
                        placeholder="PIN number" />
                    </div>
                  </div>
                </template>

                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Upload Copy ID</label>
                    <div class="custom-file-input-container bg-white border-round-3xl custom-pd-file-input">
                      <input type="file" id="fileInput" class="custom-file-input " @change="uploadFile($event)" />
                      <label class="text-sm custom-input-color">{{
      uploadTxt
    }}</label>
                      <i class="fas fa-upload text-sm custom-gray"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full border-round-3xl custom-pd-bg-lightblue px-3 py-3 mt-3" @click="submit()">
                <div class="flex justify-content-between align-items-center">
                  <label class="font-medium text-sm">Save and Continue</label>
                  <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- COMPANY DETAILS -->
    <!-- <template v-if="productCategory === 'COMMERCIAL'">
      <div class="px-3 pt-4 mt-3" :style="{ 'margin-bottom': marginBottom }">
        <div class="relative bg-yellow-500 border-round-3xl px-3 custom-padding-block mt-3 z-2">
          <label class="text-sm font-bold">Company Details</label>
        </div>
      </div>
    </template> -->

    <div :class="overlay"></div>
  </div>

  <div class="custom-desktop-view custom-width-80">
    <DesktopPersonalDetails />
  </div>

  <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity" />
  <Toast />
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import DesktopPersonalDetails from "@/components/Desktop/AdditionalDetails/PersonalDetails.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ids } from "@/util/identificationDocuments.js";

import additionalDetailsService from "@/services/additionalDetailsService.js";
import fileUploadService from "@/services/fileUploadService.js";

import useToastMessages from "@/composables/useToastMessages";
import usePhoneNumberFormatter from "@/composables/usePhoneNumberFormatter";

const { showSuccessToast, showErrorToast } = useToastMessages();
const { format } = usePhoneNumberFormatter();

import { useStore } from "vuex";
const store = useStore();
const quoteRef = store.getters.getQuoteRef;
const productCategory = store.getters.getQuoteDetails.productCategory

const router = useRouter();

const selectedIdenficationDocument = ref("NationalID");
const identificationDocuments = ids;
const uploadTxt = ref("Upload");
const marginBottom = ref(null);
const overlay = ref(null);

const customerName = ref(null);
const dob = ref(null);

const nationalId = ref(null);
const passport = ref(null);
const alienId = ref(null);

const kraPin = ref(null);
const kraPinStatus = ref(false);
const verificationStatus = ref(false);

const email = ref(null);
const phoneNumber = ref(null);

const maxDate = ref(new Date());

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

onMounted(() => {
  const today = new Date()
  maxDate.value = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
});

const verifyCustomer = () => {
  let data = {};

  if (selectedIdenficationDocument.value == 'NationalID') {
    data.nationalId = nationalId.value;
  }
  else if (selectedIdenficationDocument.value == 'Passport') {
    data.passport = passport.value;
  }
  else if (selectedIdenficationDocument.value == 'AlienID') {
    data.alienId = alienId.value;
  }

  data.docType = selectedIdenficationDocument.value;
  data.customerName = customerName.value;
  data.quoteRef = quoteRef;

  isLoading.value = true;
  kraPin.value = null

  additionalDetailsService
    .verifyCustomer(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code == 200) {
        if (response.data.data.customerExists) {
          store.commit("setPersonalDetails", data);
          navigate("/vehicle-details");
          showSuccessToast("Success", "Verification successfull.")
        } else {
          verificationStatus.value = true

          if (response.data.data.kraPin == "" || response.data.data.kraPin == null) {
            kraPinStatus.value = true
          } else {
            kraPinStatus.value = response.data.data.kraPin
          }
        }
      }
      else {
        isLoading.value = false
        showErrorToast("Error", response)
      }
    })
    .catch((error) => {
      isLoading.value = false;

      if (error.response) {
        showErrorToast("Error", error.response);
      } else {
        showErrorToast("Error", error.response);
      }
    });
};

const uploadFile = (event) => {
  isLoading.value = true;
  let originalFile = event.target.files[0]

  let formData = new FormData();
  formData.append('file', originalFile)
  formData.append("docType", "National ID")
  formData.append("requestRef", quoteRef)
  formData.append("fileRef", nationalId.value)

  console.log(formData);

  fileUploadService.fileUpload(formData)
    .then((response) => {
      isLoading.value = false

      if (response.data.code == 200) {
        uploadTxt.value = "Uploaded"
        showSuccessToast("Success", "File uploaded successfully")
      }
      else {
        showErrorToast("Error", response)
      }
    })
    .catch((error) => {
      isLoading.value = false
      showErrorToast("Error", error)
    })

};

const submit = () => {
  let data = {};

  if (selectedIdenficationDocument.value == 'NationalID') {
    data.nationalId = nationalId.value;
  }
  else if (selectedIdenficationDocument.value == 'Passport') {
    data.passport = passport.value;
  }
  else if (selectedIdenficationDocument.value == 'AlienID') {
    data.alienId = alienId.value;
  }

  data.docType = selectedIdenficationDocument.value;
  data.customerName = customerName.value;
  data.kraPin = kraPin.value;
  data.email = email.value;
  data.customerType = "Individual";
  data.phoneNumber = format(phoneNumber.value);
  data.quoteRef = quoteRef;

  isLoading.value = true;

  additionalDetailsService
    .createCustomer(data)
    .then((response) => {
      isLoading.value = false;
      store.commit("setPersonalDetails", data);

      if (response.data.response_code == 200) {
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

const navigate = (path) => {
  router.push(path);
};
</script>
