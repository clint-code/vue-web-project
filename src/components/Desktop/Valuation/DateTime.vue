<template>
  <div class="mb-6">
    <div class="flex justify-content-end">
      <i class="fas fa-circle-xmark text-2xl" @click="closeModal"></i>
    </div>

    <div class="w-9 mx-auto border-round-3xl shadow-2 px-4 mt-2">
      <div class="flex flex-column align-items-center">
        <h3 class="text-center w-10">
          What date & time do you prefer for your valuation?
        </h3>
        <div class="custom-bottom-border-1 w-8"></div>

        <i class="fas fa-calendar-days text-7xl text-yellow-500 mt-4"></i>

        <div class="my-4 w-full">
          <div
            class="flex custom-border-radius align-items-center custom-dark-gray-border border-1 px-4"
          >
            <Calendar
              class="w-full h-4rem align-items-center gap-3 custom-calendar-input custom-dark-calendar pr-2"
              placeholder="Choose date"
              :showWeek="false"
              v-model="valuationDate"
              dateFormat="dd/mm/yy"
              :minDate="minDate"
              @dateSelect="changeDate()"
            />
            <i class="fas fa-calendar-days text-2xl custom-gray"></i>
          </div>

          <Dropdown
            v-model="valuationTime"
            :options="timesArray"
            optionLabel="name"
            optionValue="name"
            placeholder="Choose time"
            class="w-full h-4rem align-items-center custom-border-radius font-bold mt-4 pl-4 pr-3 custom-dark-dropdown-1 custom-dropdown-1 border-1"
            @change="changeTime()"
          />

          <div
            class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3 mt-4"
            @click="showPlacesModal()"
          >
            <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
            <label class="font-bold custom-gray">Set valuation location</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { times } from "@/util/times.js";
import { useStore } from "vuex";

import useToastMessages from "@/composables/useToastMessages";
const { showSuccessToast, showErrorToast } = useToastMessages();

const emits = defineEmits();

const store = useStore();
const valuationDate = ref(null);
const valuationTime = ref(null);

const minDate = ref(new Date());

const timesArray = ref(null);

onMounted(() => {
  timesArray.value = times;

  valuationDate.value = store.getters.getValuationDate;
  valuationTime.value = store.getters.getValuationTime;
});

const showPlacesModal = () => {
  if (valuationDate.value != null && valuationTime.value != null) {
    let formattedDate =
      typeof valuationDate.value != "string"
        ? valuationDate.value.toLocaleDateString()
        : valuationDate.value;

    store.commit("setValuationDate", formattedDate);
    store.commit("setValuationTime", valuationTime.value);
    store.commit("setValuationStatus", true);

    emits("showGooglePlacesModal");
  } else {
    showErrorToast("Error", "Please fill in all fields.");
  }
};

const changeDate = () => {
  emits("changeValuationDate", valuationDate.value.toLocaleDateString());
};

const changeTime = () => {
  emits("changeValuationTime", valuationTime.value);
};

const closeModal = () => {
  emits("closeDateTimeModal");
};
</script>

<style scoped>
.p-dropdown {
  border: #4a4a4a 1px solid;
}

/* .p-dropdown .p-dropdown-label.p-placeholder {
    color: #4A4A4A !important;
} */
</style>
