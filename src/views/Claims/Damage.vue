<template>
  <div class="h-full">
    <TopNav variation="no-logo-white" :page="page" />

    <div class="m-0 px-3 py-1">
      <!-- First Form -->
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

      <!-- Where did the accident happen? -->
      <div class="flex flex-column mt-4">
        <label class="font-medium text-sm">Where did the accident happen?</label>

        <InputGroup class="mt-2 custom-input-padding-1">
          <InputText class="border-900 border-round-left-3xl text-sm border-right-none py-2"
            placeholder="Enter Location" />
          <InputGroupAddon class="bg-white border-900 border-left-white border-round-right-3xl">
            <i class="fas fa-location-dot text-yellow-500 text-lg"></i>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <!-- When did the accident happen? -->
      <div class="flex flex-column mt-3">
        <label class="font-medium text-sm">When did the accident happen?</label>

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

      <!-- Please provide details of how the accident occurred -->
      <div class="flex flex-column mt-3">
        <label class="font-medium text-sm">Please provide details of how the accident occurred</label>
        <Textarea class="border-900 border-round-2xl mt-2 text-sm" v-model="value" rows="3" cols="30"
          placeholder="Type here…" />
      </div>

      <!-- Where can the vehicle be inspected? -->
      <div class="flex flex-column mt-3 mb-3">
        <label class="font-medium text-sm">Where can the vehicle be inspected?</label>

        <InputGroup class="mt-2 custom-input-padding-1">
          <InputText class="border-900 border-round-left-3xl text-sm border-right-none py-2"
            placeholder="Enter Location" />
          <InputGroupAddon class="bg-white border-900 border-left-white border-round-right-3xl">
            <i class="fas fa-location-dot text-yellow-500 text-lg"></i>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <CustomButton label="Save and Continue" icon="fa-arrow-circle-right" bgColor="bg-yellow-500 text-md font-bold"
        @click="saveAndContinue" />

    </div>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import { ref } from "vue";
import CustomButton from "../../components/shared/CustomButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const page = "Damage";
const datetime12h = ref();

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
  router.push("/damage-details")
};


</script>

<style scoped>
.label::after {
  content: "*";
}
</style>
