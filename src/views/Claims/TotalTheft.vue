<template>
  <div class="h-full">
    <TopNav variation="no-logo-white" :page="page" />

    <div class="m-0 px-3 py-1">
      <template v-if="!showSummary">
        <!-- First Form -->
        <template v-if="!secondForm">
          <div>
            <h4 class="m-0 font-medium py-3 border-bottom-1 border-yellow-500">
              Please upload photos, videos or voice message of the accident as
              shown below.
            </h4>
            <div class="uploads py-4 border-bottom-1 border-yellow-500">
              <div
                class="upload-item relative py-4 flex flex-column gap-2 align-items-center justify-content-center border-2 border-gray-500 border-round-xl"
                v-for="(item, index) in uploads" :key="index">
                <div>
                  <img :src="item.img" alt="Claim Png" height="40px" width="auto" />
                </div>
                <p class="label m-0 text-center font-medium">
                  {{ item.label }}
                </p>
                <template v-if="item.hasCamera">
                  <div class="absolute-item">
                    <i class="fas fa-camera bg-yellow-500 text-lg py-2 px-2 border-round-3xl"></i>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="flex flex-column mt-4">
            <label class="font-medium text-sm">Where was the vehicle stolen?</label>
            <InputGroup class="mt-2">
              <InputText class="border-900 border-round-left-3xl text-sm py-3" placeholder="Enter Location" />
              <InputGroupAddon class="bg-yellow-500 border-900 border-round-right-2xl">
                <i class="fa-thin fa-location-dot text-gray-900"></i>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div class="flex flex-column mt-3">
            <label class="font-medium text-sm">When was the vehicle stolen?</label>
            <div class="mt-2">
              <Calendar v-model="datetime12h" placeholder="Enter Date & Time"
                class="w-full custom-rounded-calendar custom-small-dropdown" showIcon showTime hourFormat="12"
                iconDisplay="input">
                <template #inputicon="{ clickCallback }">
                  <i class="fas fa-calendar-days text-black-alpha-90 text-sm" @click="clickCallback"></i>
                </template>
              </Calendar>
            </div>
          </div>

          <div class="flex flex-column mt-3">
            <label class="font-medium text-sm">Please provide details of how the theft occurred</label>
            <Textarea class="border-900 border-round-2xl mt-2 text-sm" v-model="value" rows="3" cols="30"
              placeholder="Type here…" />
          </div>

          <CustomButton label="Save and Continue" icon="fa-arrow-circle-right"
            bgColor="bg-yellow-500 font-medium text-lg mt-4" @click="saveAndContinue" />
        </template>

        <!-- Second Form -->
        <template v-else>
          <div>
            <h4 class="m-0 font-medium py-3 border-bottom-1 border-yellow-500">
              Please share the remaining documents as soon as possible.
            </h4>
          </div>

          <!-- Who was driving? -->
          <div class="border-bottom-1 border-yellow-500 pb-4">
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">Who was driving the vehicle?</label>
              <div class="flex flex-wrap gap-3 mt-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="wasDriving" inputId="self" name="self" value="self" />
                  <label for="self" class="ml-2">Self</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="wasDriving" inputId="otherDriver" name="otherDriver" value="otherDriver" />
                  <label for="otherDriver" class="ml-2">Other Driver</label>
                </div>
              </div>
            </div>

            <template v-if="wasDriving === 'otherDriver'">
              <div class="flex flex-column mt-3">
                <label class="font-medium text-sm">Enter name as appears on ID</label>
                <InputText class="border-900 border-round-2xl text-sm mt-2" placeholder="Enter Name" variant="filled" />
              </div>

              <div class="flex flex-column mt-2">
                <label class="font-medium text-sm">ID Number</label>
                <InputText class="border-900 border-round-2xl text-sm mt-2" placeholder="Enter ID Number"
                  variant="filled" />
              </div>
            </template>
          </div>

          <div class="border-bottom-1 border-yellow-500 pb-3">
            <!-- Police Station where accident was reported -->
            <div class="flex flex-column mt-3 mb-3">
              <label class="font-medium text-sm">Police Station where accident was reported</label>
              <InputGroup class="mt-2">
                <InputText class="border-900 border-round-left-2xl text-sm py-3" placeholder="Enter Location" />
                <InputGroupAddon class="bg-yellow-500 border-900 border-round-right-2xl">
                  <i class="fa-thin fa-location-dot"></i>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <!-- When the accident was reported -->
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">When was the accident reported to the police?</label>
              <div class="mt-2">
                <Calendar v-model="reportToPolice" placeholder="Enter Date & Time"
                  class="w-full custom-rounded-calendar custom-small-dropdown" showIcon showTime hourFormat="12"
                  iconDisplay="input">
                  <template #inputicon="{ clickCallback }">
                    <i class="fas fa-calendar-days text-black-alpha-90 text-sm" @click="clickCallback"></i>
                  </template>
                </Calendar>
              </div>
            </div>

            <!-- OB Number -->
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">OB Number</label>
              <InputText v-model="OBNumber" class="border-900 border-round-3xl text-sm mt-2 py-3"
                placeholder="Enter OB Number" />
            </div>
          </div>

          <div class="pb-3">
            <div class="custom-file-input-container mt-3" id="uploadAbstract">
              <div class="flex align-items-center gap-2">
                <i class="fas fa-user-police py-2 px-2 bg-yellow-500 border-round-3xl"></i>
                <label for="">Upload Police Abstract</label>
              </div>
              <div class="flex align-items-center gap-3 bg-yellow-500 py-1 px-2 border-round-3xl">
                <template v-if="true">
                  <input type="file" id="fileInput" class="custom-file-input" @change="uploadFile($event)" />
                  <label for="upload" class="text-sm font-medium">Upload</label>
                  <i class="fas fa-cloud-arrow-up"></i>
                </template>
                <template v-else>
                  <label for="removeFile" class="text-sm font-medium">Remove File</label>
                  <i class="fas fa-circle-xmark"></i>
                </template>
              </div>
            </div>

            <div class="custom-file-input-container mt-3" id="uploadDL">
              <div class="flex align-items-center gap-2">
                <i class="fas fa-id-card py-2 px-2 bg-yellow-500 border-round-3xl"></i>
                <label for="">Upload Driver’s License</label>
              </div>
              <div class="flex align-items-center gap-3 bg-yellow-500 py-1 px-2 border-round-3xl">
                <template v-if="true">
                  <input type="file" id="fileInput" class="custom-file-input" @change="uploadFile($event)" />
                  <label for="upload" class="text-sm font-medium">Upload</label>
                  <i class="fas fa-cloud-arrow-up"></i>
                </template>
                <template v-else>
                  <label for="removeFile" class="text-sm font-medium">Remove File</label>
                  <i class="fas fa-circle-xmark"></i>
                </template>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <CustomButton label="Submit" icon="fa-circle-arrow-right" bgColor="bg-yellow-500 text-lg font-semibold mt-3"
            @click="handleSubmit" />
        </template>
      </template>

      <template v-else>
        <p class="m-0 font-semibold text-lg mt-3">
          Below is a summary of your claim.
        </p>
        <div class="summary-table mt-2">
          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Claim Type</p>
            <p class="m-0 font-medium">Total Theft</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Make and Model</p>
            <p class="m-0 font-medium">Toyota Corolla</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Registration No.</p>
            <p class="m-0 font-medium">KBU617A</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Driver</p>
            <p class="m-0 font-medium">Victor Gachangi</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Police Station</p>
            <p class="m-0 font-medium">Kabete Police Station</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Date of Incidence</p>
            <p class="m-0 font-medium">September 17th 2023</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Time of Incidence</p>
            <p class="m-0 font-medium">12:45 PM</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Location of Incidence</p>
            <p class="m-0 font-medium">Waiyaki Way</p>
          </div>
        </div>

        <CustomButton label="Submit Claim" bgColor="bg-yellow-500 text-xl font-semibold mt-6"
          icon="fa-arrow-circle-right " />
      </template>
    </div>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import CustomButton from "../../components/shared/CustomButton.vue";
import { ref } from "vue";

const page = "Total Theft";
const secondForm = ref(false);
const showSummary = ref(false);

const wasDriving = ref();

const uploadTxt = ref("Upload");
const uploadFile = (e) => {
  // uploadTxt.value = e.target.files[0].name
  uploadTxt.value = "Uploaded";
};

const uploads = [
  {
    img: "src/assets/img/front-side.png",
    label: "Front Side",
    hasCamera: true,
  },
  {
    img: "src/assets/img/video-scene.png",
    label: "Video of Scene",
  },
  {
    img: "src/assets/img/voice-note.png",
    label: "Voice Note",
  },
];

const saveAndContinue = () => {
  secondForm.value = true;
};

const handleSubmit = () => {
  showSummary.value = true;
};
</script>

<style scoped>
.uploads {
  display: grid;
  grid-row-gap: 2rem;
  grid-column-gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
}

.label::after {
  content: "*";
}

.absolute-item {
  position: absolute;
  top: -10px;
  right: -10px;
}

.p-calendar {
  border: 1px solid #000000 !important;
  border-radius: 1.5rem;
}

.p-variant-filled {
  background-color: #d5d9e2;
}

/* .custom-rounded-calendar .p-inputtext {
  padding-block: 1.5rem !important;
} */

.custom-file-input-container {
  padding-block: 1.35rem !important;
  border: 1px solid #000000 !important;
  border-radius: 1.5rem;
  padding-inline: 0.5rem !important;
}

.custom-fill {
  background-color: #4a4a4a;
}
</style>
