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
            <div class="custom-uploads py-4 border-bottom-1 border-yellow-500">
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
                  <div class="custom-absolute-item">
                    <i class="fas fa-camera bg-yellow-500 text-lg py-2 px-2 border-round-3xl"></i>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Place of theft -->
          <div class="flex flex-column mt-4">
            <label class="font-medium text-sm">Place of theft</label>

            <InputGroup class="mt-2 custom-input-padding-1">
              <InputText class="border-900 border-round-left-3xl text-sm border-right-none py-2"
                placeholder="Enter Location" />
              <InputGroupAddon class="bg-white border-900 border-left-white border-round-right-3xl">
                <i class="fas fa-location-dot text-yellow-500 text-lg"></i>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <!-- When was the vehicle stolen? -->
          <div class="flex flex-column mt-3">
            <label class="font-medium text-sm">When was the vehicle stolen?</label>

            <div class="mt-2">
              <Calendar v-model="datetime12h" placeholder="Enter Date & Time"
                class="w-full custom-rounded-calendar custom-dark-border custom-calender-text border-1 border-round-3xl custom-input-padding-1"
                showIcon showTime iconDisplay="input">
                <template #inputicon="{ clickCallback }">
                  <i class="fas fa-calendar-days text-yellow-500" @click="clickCallback"></i>
                </template>
              </Calendar>
            </div>
          </div>

          <!-- Place of recovery -->
          <div class="flex flex-column mt-4">
            <label class="font-medium text-sm">Place of recovery</label>

            <InputGroup class="mt-2 custom-input-padding-1">
              <InputText class="border-900 border-round-left-3xl text-sm border-right-none py-2"
                placeholder="Enter Location" />
              <InputGroupAddon class="bg-white border-900 border-left-white border-round-right-3xl">
                <i class="fas fa-location-dot text-yellow-500 text-lg"></i>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <!-- When was the vehicle recovered? -->
          <div class="flex flex-column mt-3">
            <label class="font-medium text-sm">When was the vehicle recovered?</label>

            <div class="mt-2">
              <Calendar v-model="datetime12h" placeholder="Enter Date & Time"
                class="w-full custom-rounded-calendar custom-dark-border custom-calender-text border-1 border-round-3xl custom-input-padding-1"
                showIcon showTime iconDisplay="input">
                <template #inputicon="{ clickCallback }">
                  <i class="fas fa-calendar-days text-yellow-500" @click="clickCallback"></i>
                </template>
              </Calendar>
            </div>
          </div>

          <!-- Mileage of vehicle at recovery -->
          <div class="flex flex-column mt-3 custom-input-padding-1">
            <label class="font-medium text-sm">Mileage of vehicle at recovery</label>
            <InputText v-model="OBNumber" class="border-900 border-round-3xl text-sm mt-2"
              placeholder="Enter Mileage" />
          </div>

          <!-- Where can the vehicle be inspected? -->
          <div class="flex flex-column mt-4">
            <label class="font-medium text-sm">Where can the vehicle be inspected?</label>
            <InputGroup class="mt-2 custom-input-padding-1">
              <InputText class="border-900 border-round-left-3xl text-sm border-right-none py-2"
                placeholder="Enter Location" />
              <InputGroupAddon class="bg-white border-900 border-left-white border-round-right-3xl">
                <i class="fas fa-location-dot text-yellow-500 text-lg"></i>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <CustomButton label="Save and Continue" icon="fa-arrow-circle-right"
            bgColor="bg-yellow-500 font-bold text-md mt-4 mb-3" @click="saveAndContinue" />
        </template>

        <!-- Second Form -->
        <template v-else>
          <div>
            <h4 class="m-0 font-medium py-3 border-bottom-1 border-yellow-500">
              Please provide details of any damage to the vehicle at the time of
              recovery.
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
              <div class="flex flex-column mt-3 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">Enter name as appears on ID</label>
                <InputText class="border-900 border-round-3xl text-sm mt-2" placeholder="Enter Name" variant="filled" />
              </div>

              <div class="flex flex-column mt-2 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">ID Number</label>
                <InputText class="border-900 border-round-3xl text-sm mt-2" placeholder="Enter ID Number"
                  variant="filled" />
              </div>
            </template>
          </div>

          <!-- Has it been towed? -->
          <div class="border-bottom-1 border-yellow-500 pb-4">
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">Has the vehicle been towed?</label>
              <div class="flex flex-wrap gap-3 mt-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="wasTowed" inputId="yesTowed" name="yesTowed" value="yes" />
                  <label for="yesTowed" class="ml-2">Yes</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="wasTowed" inputId="noTowed" name="noTowed" value="no" />
                  <label for="noTowed" class="ml-2">No</label>
                </div>
              </div>
            </div>

            <template v-if="wasTowed === 'yes'">
              <div class="flex flex-column mt-3 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">Enter name of towing agent</label>
                <InputText class="border-900 border-round-3xl text-sm mt-2" placeholder="Enter Name" variant="filled" />
              </div>

              <div class="flex flex-column mt-2 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">Phone number</label>
                <InputText class="border-900 border-round-3xl text-sm mt-2" placeholder="Enter Phone Number"
                  variant="filled" />
              </div>
            </template>
          </div>

          <!-- Was the vehicle damaged -->
          <div class="border-bottom-1 border-yellow-500 pb-4">
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">Was the vehicle damaged?</label>
              <div class="flex flex-wrap gap-3 mt-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="wasDamaged" inputId="yesDamaged" name="yesDamaged" value="yes" />
                  <label for="yesDamaged" class="ml-2">Yes</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="wasDamaged" inputId="noDamaged" name="noDamaged" value="no" />
                  <label for="noDamaged" class="ml-2">No</label>
                </div>
              </div>
            </div>

            <template v-if="wasDamaged === 'yes'">
              <div class="flex flex-column mt-3 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">Describe the vehicle parts or accessories damaged</label>
                <Textarea class="border-900 border-round-2xl mt-3 text-sm" v-model="value" rows="5" cols="30"
                  placeholder="Side Mirrors, Head lamps, Spare Wheel Cover" variant="filled" />
              </div>
            </template>
          </div>

          <!-- Has it been repaired? -->
          <div class="border-bottom-1 border-yellow-500 pb-4">
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">Has the vehicle been repaired?</label>
              <div class="flex flex-wrap gap-3 mt-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="wasRepaired" inputId="yesRepaired" name="yesRepaired" value="yes" />
                  <label for="yesRepaired" class="ml-2">Yes</label>
                </div>
                <div class="flex align-items-center">
                  <RadioButton v-model="wasRepaired" inputId="noRepaired" name="noRepaired" value="no" />
                  <label for="noRepaired" class="ml-2">No</label>
                </div>
              </div>
            </div>

            <template v-if="wasRepaired === 'yes'">
              <div class="flex flex-column mt-3 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">Enter name of garage</label>
                <InputText class="border-900 border-round-3xl text-sm mt-2" placeholder="Enter Name" variant="filled" />
              </div>

              <div class="flex flex-column mt-2 custom-input-padding-1 custom-placeholder-color">
                <label class="font-medium text-sm">Phone number</label>
                <InputText class="border-900 border-round-3xl text-sm mt-2" placeholder="Enter Phone Number"
                  variant="filled" />
              </div>
            </template>
          </div>

          <div class="border-bottom-1 border-yellow-500 pb-4">
            <!-- Police Station where accident was reported -->
            <div class="flex flex-column mt-3 mb-3">
              <label class="font-medium text-sm">Police Station where accident was reported</label>

              <InputGroup class="mt-2 custom-input-padding-1">
                <InputText class="border-900 border-round-left-3xl text-sm border-right-none py-2"
                  placeholder="Enter Location" />
                <InputGroupAddon class="bg-white border-900 border-left-white border-round-right-3xl">
                  <i class="fas fa-location-dot text-yellow-500 text-lg"></i>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <!-- When was the accident reported to the police? -->
            <div class="flex flex-column mt-3">
              <label class="font-medium text-sm">When was the accident reported to the police?</label>
              <div class="mt-2">
                <Calendar v-model="reportToPolice" placeholder="Enter Date & Time"
                  class="w-full custom-rounded-calendar custom-dark-border custom-calender-text border-1 border-round-3xl custom-input-padding-1"
                  showIcon showTime hourFormat="12" iconDisplay="input">
                  <template #inputicon="{ clickCallback }">
                    <i class="fas fa-calendar-days text-yellow-500" @click="clickCallback"></i>
                  </template>
                </Calendar>
              </div>
            </div>

            <!-- Enter OB Number -->
            <div class="flex flex-column mt-3 custom-input-padding-1">
              <label class="font-medium text-sm">OB Number</label>
              <InputText v-model="OBNumber" class="border-900 border-round-3xl text-sm mt-2"
                placeholder="Enter OB Number" />
            </div>
          </div>

          <!-- File uploads -->
          <div class="pb-4">
            <div class="custom-file-input-container-2 mt-3" id="uploadAbstract">
              <div class="flex align-items-center gap-2">
                <i class="fas fa-user-police py-2 px-2 bg-yellow-500 border-round-3xl"></i>
                <label class="font-light text-gray-800">Upload Police Abstract</label>
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

            <div class="custom-file-input-container-2 mt-3" id="uploadDL">
              <div class="flex align-items-center gap-2">
                <i class="fas fa-id-card py-2 px-2 bg-yellow-500 border-round-3xl"></i>
                <label class="font-light text-gray-800">Upload Driver’s License</label>
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

            <div class="custom-file-input-container-2 mt-3" id="uploadReceipt-1">
              <div class="flex align-items-center gap-2">
                <i class="fas fa-receipt py-2 px-2 bg-yellow-500 border-round-3xl"></i>
                <label class="font-light text-gray-800">Upload Receipt</label>
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

            <div class="custom-file-input-container-2 mt-3 custom-fill" id="addReceipt">
              <div class="flex align-items-center gap-2">
                <i class="fas fa-receipt py-2 px-2 bg-white border-round-3xl"></i>
                <label for="addReceipt" class="text-white">Add Receipt</label>
              </div>

              <i class="fa-thin fa-circle-plus text-3xl bg-white border-round-3xl"></i>
            </div>
          </div>

          <!-- Submit Button -->
          <CustomButton label="Submit" icon="fa-circle-arrow-right" bgColor="bg-yellow-500 text-md font-bold mb-4"
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
            <p class="m-0 font-semibold">Theft & Recovery of Vehicle</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Make and Model</p>
            <p class="m-0 font-semibold">Toyota Corolla</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Registration No.</p>
            <p class="m-0 font-semibold">KBU617A</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Driver</p>
            <p class="m-0 font-semibold">Victor Gachangi</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Police Station</p>
            <p class="m-0 font-semibold">Kabete Police Station</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Date of Incidence</p>
            <p class="m-0 font-semibold">September 17th 2023</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Time of Incidence</p>
            <p class="m-0 font-semibold">12:45 PM</p>
          </div>

          <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
            <p class="m-0 font-light text-gray-700">Location of Incidence</p>
            <p class="m-0 font-semibold">Waiyaki Way</p>
          </div>
        </div>

        <CustomButton label="Submit Claim" bgColor="bg-yellow-500 text-md font-bold mt-6"
          icon="fa-arrow-circle-right " />
      </template>
    </div>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import CustomButton from "../../components/shared/CustomButton.vue";
import { ref } from "vue";

const page = "Theft & Recovery";
const secondForm = ref(false);
const showSummary = ref(false);

const wasDriving = ref();
const wasTowed = ref();
const wasDamaged = ref();
const wasRepaired = ref();

const uploadTxt = ref("Upload");
const uploadFile = (e) => {
  // uploadTxt.value = e.target.files[0].name
  uploadTxt.value = "Uploaded";
};

const uploads = [
  {
    img: "src/assets/img/right-side.png",
    label: "Right Side",
    hasCamera: true,
  },
  {
    img: "src/assets/img/left-side.png",
    label: "Left Side",
    hasCamera: true,
  },
  {
    img: "src/assets/img/front-side.png",
    label: "Front Side",
    hasCamera: true,
  },
  {
    img: "src/assets/img/back-side.png",
    label: "Back Side",
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
.label::after {
  content: "*";
}

.p-variant-filled {
  background-color: #d5d9e2;
}
</style>
