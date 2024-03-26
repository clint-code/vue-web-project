<template>
  <div class="grid">
    <div class="lg:col-10">
      <div class="mt-4">
        <div
          class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-1 px-3 py-2 custom-w-5"
          @click="navigate('/accept-terms')">
          <i class="fas fa-angle-double-left text-white"></i>
          <label class="text-sm font-bold text-white justify-content-end">Back</label>
        </div>
      </div>

      <div class="pb-4 pr-4" :style="{ 'margin-bottom': marginBottom }">
        <div class="relative bg-yellow-500 border-round-2xl px-3 custom-py-10 mt-3 z-2">
          <label class="text-sm font-bold">Your Personal Details</label>
        </div>

        <div class="relative z-1">
          <div
            class="w-full custom-light-gray-bg-1 custom-gray-border-2 border-round-bottom-3xl custom-accordion-body-2 py-4 px-3">
            <div class="grid">
              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <label class="text-sm font-medium">Enter Name (As appears on your ID)</label>
                  <InputText v-model="customerName" class="text-sm border-round-3xl" placeholder="Enter your ID name" />
                </div>
              </div>

              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <label class="text-sm font-medium">Choose I.D. Type</label>
                  <Dropdown v-model="selectedIdenficationDocument" :options="identificationDocuments" optionLabel="name"
                    optionValue="value" placeholder="Select Document"
                    class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown-1" />
                </div>
              </div>
            </div>

            <div class="grid align-items-center mt-1">
              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <template v-if="selectedIdenficationDocument == 'NationalID'">
                    <label class="text-sm font-medium">Enter ID Number</label>
                    <InputText v-model="nationalId" class="text-sm border-round-3xl" type="number"
                      placeholder="Enter national id" />
                  </template>

                  <template v-else-if="selectedIdenficationDocument == 'AlienID'">
                    <label class="text-sm font-medium">Alien ID</label>
                    <InputText v-model="alienId" class="text-sm border-round-3xl" placeholder="Enter alien id" />
                  </template>

                  <template v-else-if="selectedIdenficationDocument == 'Passport'">
                    <label class="text-sm font-medium">Passport</label>
                    <InputText v-model="passport" class="text-sm border-round-3xl"
                      placeholder="Enter passport number" />
                  </template>
                </div>
              </div>

              <div class="col-6 mt-3">
                <div class="w-full border-round-2xl custom-dark-gray-bg px-3 py-2 mt-2" @click="verifyCustomer()">
                  <div class="flex justify-content-between align-items-center">
                    <label class="font-bold text-sm text-white">Verify Details</label>
                    <i class="fas fa-circle-arrow-right text-white"></i>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="verificationStatus">
              <div class="grid mt-1">
                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Phone Number</label>
                    <InputGroup>
                      <InputGroupAddon class="bg-yellow-500 border-round-left-2xl">
                        <span class="text-xs font-bold">+254</span>
                      </InputGroupAddon>
                      <InputText type="number" v-model="phoneNumber" class="border-round-right-3xl text-sm"
                        placeholder="Enter Phone Number" />
                    </InputGroup>
                  </div>
                </div>

                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Email</label>
                    <InputText v-model="email" class="text-sm border-round-3xl" placeholder="Enter Email" />
                  </div>
                </div>
              </div>

              <div class="grid mt-1">
                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Date of Birth</label>
                    <Calendar v-model="dob" placeholder="Choose Date"
                      class="w-full custom-rounded-calendar custom-small-dropdown-1" showIcon iconDisplay="input"
                      :maxDate="maxDate">
                      <template #inputicon="{ clickCallback }">
                        <i class="fas fa-calendar-days text-black-alpha-90 text-sm" @click="clickCallback"></i>
                      </template>
                    </Calendar>
                  </div>
                </div>

                <div class="col-6">
                  <div class="flex flex-column gap-2">
                    <label class="text-sm font-medium">Upload Copy ID</label>
                    <div class="custom-file-input-container bg-white border-round-3xl">
                      <input type="file" id="fileInput" class="custom-file-input" @change="uploadFile($event)" />
                      <label class="text-sm custom-input-color">{{ uploadTxt }}</label>
                      <i class="fas fa-upload text-sm custom-gray"></i>
                    </div>
                  </div>
                </div>
              </div>

              <template v-if="kraPinStatus">
                <div class="grid mt-1">
                  <div class="col-6">
                    <div class="flex flex-column gap-2">
                      <label class="text-sm font-medium">KRA PIN</label>
                      <InputText v-model="kraPIN" class="text-sm border-round-3xl" placeholder="PIN number" />
                    </div>
                  </div>
                </div>
              </template>

              <div class="w-full border-round-2xl px-3 py-2 mt-2"
                :class="{ 'bg-yellow-500': verificationStatus, 'custom-gray-bg': !verificationStatus }"
                @click="submit()">
                <div class="flex justify-content-between align-items-center">
                  <label class="font-bold text-sm">Save and Continue</label>
                  <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-2 mt-4">
      <Steps :step="step" :level="level" />
    </div>

    <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity" />
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ids } from "@/util/identificationDocuments.js";

import Steps from "@/components/Steps.vue";

import additionalDetailsService from "@/services/additionalDetailsService.js";
import fileUploadService from "@/services/fileUploadService.js";

import useToastMessages from "@/composables/useToastMessages";
import usePhoneNumberFormatter from "@/composables/usePhoneNumberFormatter";

const { showSuccessToast, showErrorToast } = useToastMessages();
const { format } = usePhoneNumberFormatter();

const router = useRouter();
const store = useStore();
const quoteRef = store.getters.getQuoteRef;

const step = ref("Personal Details");
const level = ref(1);

const selectedIdenficationDocument = ref("NationalID");
const identificationDocuments = ids;

const marginBottom = ref(null);
const overlay = ref(null);

const customerName = ref(null);
const dob = ref(null);

const nationalId = ref(null);
const passport = ref(null);
const alienId = ref(null)

const kraPIN = ref(null);
const kraPinStatus = ref(false);
const verificationStatus = ref(false);

const email = ref(null);
const phoneNumber = ref(null);

const maxDate = ref(new Date());

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

const uploadTxt = ref("Upload");

onMounted(() => {
  const today = new Date();
  maxDate.value = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
})

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
  kraPIN.value = null

  additionalDetailsService
    .verifyCustomer(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code == 200) {
        if (response.data.data.customerExists) {
          store.commit("setPersonalDetails", data);
          navigate("/vehicle-details");
          showSuccessToast("Success", "Verification successfull.")
        }
        else {
          verificationStatus.value = true;

          if (response.data.data.kraPin == "" || response.data.data.kraPin == null) {
            kraPinStatus.value = true
          }
          else {
            kraPIN.value = response.data.data.kraPin;
          }
        }
      }
      else {
        showErrorToast("Error", response);
      }
    })
    .catch((error) => {
      isLoading.value = false;

      if (error.response) {
        showErrorToast("Error", error.response);
      }
      else {
        showErrorToast("Error", error.response);
      }

    });
}

const uploadFile = (event) => {
  isLoading.value = true;
  let originalFile = event.target.files[0]

  let formData = new FormData();
  formData.append('file', originalFile)
  formData.append("docType", "NATIONAL ID");
  formData.append("requestRef", quoteRef);
  formData.append("fileRef", nationalId.value);

  fileUploadService.fileUpload(formData)
    .then((response) => {
      isLoading.value = false;

      if (response.data.code == 200) {
        uploadTxt.value = "Uploaded"
        showSuccessToast("Success", "File uploaded successfully")
      }
      else {
        showErrorToast("Error", response);
      }
    })
    .catch((error) => {
      isLoading.value = false;
      showErrorToast("Error", error);
    })
}

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
  data.kraPin = kraPIN.value;
  data.email = email.value;
  data.customerType = "Individual";
  data.phoneNumber = format(phoneNumber.value);
  data.quoteRef = quoteRef;

  isLoading.value = true;

  additionalDetailsService
    .createCustomer(data)
    .then((response) => {
      if (response.data.response_code == 200) {
        navigate("/vehicle-details");
      }
      else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error);
      isLoading.value = false;
    });
}

const navigate = (path) => {
  router.push(path);
};
</script>
