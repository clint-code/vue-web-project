<template>
  <div class="h-full">
    <TopNav variation="no-logo-white" :page="page" />

    <div class="m-0 px-3 py-1">
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

      <div class="border-bottom-1 border-yellow-500 pb-3">
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

        <!-- When the accident was reported -->
        <div class="flex flex-column mt-3">
          <label class="font-medium text-sm">When was the accident reported to the police?</label>
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

        <!-- OB Number -->
        <div class="flex flex-column mt-3 custom-input-padding-1">
          <label class="font-medium text-sm">OB Number</label>
          <InputText v-model="OBNumber" class="border-900 border-round-3xl text-sm mt-2"
            placeholder="Enter OB Number" />
        </div>
      </div>

      <div class="pb-3">
        <div class="custom-file-input-container mt-3" id="uploadAbstract">
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

        <div class="custom-file-input-container mt-3" id="uploadDL">
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
      </div>

      <!-- Submit Button -->
      <CustomButton label="Submit" icon="fa-circle-arrow-right" bgColor="bg-yellow-500 text-md font-bold mt-3"
        @click="handleSubmit" />
    </div>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import { ref } from "vue";
import CustomButton from "../../components/shared/CustomButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const page = "Total Theft";

const wasDriving = ref();
const OBNumber = ref();

const uploadTxt = ref("Upload");
const uploadFile = (e) => {
  // uploadTxt.value = e.target.files[0].name
  uploadTxt.value = "Uploaded";
};

const handleSubmit = () => {
  router.push("/claim-summary")
};
</script>

<style scoped>
.p-variant-filled {
  background-color: #d5d9e2;
}
</style>