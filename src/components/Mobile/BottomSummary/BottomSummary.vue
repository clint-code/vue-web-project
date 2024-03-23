<template>
  <div class="relative bg-white border-round-top-2xl z-5">
    <div class="relative p-3 mb-4" v-if="editDetails">
      <div>
        <div class="flex justify-content-end">
          <i
            class="fas fa-circle-xmark text-2xl custom-gray"
            @click="editQuoteDetails"
          ></i>
        </div>

        <div class="flex justify-content-between align-items-center py-2">
          <img
            :src="selectedQuote.UnderwriterIcon"
            width="100px"
            height="auto"
          />
        </div>

        <hr class="custom-gray" />

        <div class="flex justify-content-between">
          <div class="flex flex-column">
            <label class="font-bold text-sm">Lipa in full</label>
            <label class="font-light text-sm mt-1">Inc. of Tax & Levies</label>
          </div>

          <template v-if="selectedQuote.LipaFullAmount != null">
            <label class="font-bold"
              >KES {{ selectedQuote.LipaFullAmount.toLocaleString() }}</label
            >
          </template>
        </div>
        <hr class="custom-gray" />

        <div class="flex justify-content-between">
          <div class="flex flex-column">
            <label class="font-bold text-sm">Lipa Pole Pole Deposit</label>
            <label class="font-light text-sm mt-1"
              >Lipa Pole Pole Monthly Installment</label
            >
          </div>

          <template v-if="selectedQuote.LipaPolePoleDeposit != null">
            <label class="font-bold"
              >KES
              {{ selectedQuote.LipaPolePoleDeposit.toLocaleString() }}</label
            >
          </template>
        </div>
      </div>
    </div>

    <div class="bg-yellow-500 p-3 relative" v-if="editDetails">
      <label class="text-sm font-bold">Fill in the details below:</label>
      <div class="grid mt-1">
        <div class="col-6">
          <Dropdown
            v-model="selectedMake"
            :options="makes"
            filter
            optionLabel="vehicle_name"
            placeholder="Make E.g BMW"
            filterPlaceholder="Search make"
            @filter="searchVehicleMakes"
            @change="changeVehicleMake"
            class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
          />
        </div>

        <div class="col-6">
          <Dropdown
            v-model="selectedModel"
            :options="models"
            filter
            optionLabel="vehicle_model"
            placeholder="Model E.g X5"
            filterPlaceholder="Search model"
            @filter="searchVehicleModels"
            @change="changeVehicleModel"
            class="w-full border-round-3xl custom-dark-dropdown shadow-1 custom-small-dropdown"
          />
        </div>
      </div>

      <div class="grid mt-1">
        <div class="col-6">
          <div
            class="flex justify-content-between align-items-center bg-black-alpha-90 border-round-3xl gap-2 px-3 py-2"
            @click="updateQuote()"
            v-if="editDetails"
          >
            <label class="text-sm font-bold text-white">Update</label>
            <i class="fas fa-arrow-circle-right text-white"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="custom-dark-gray-bg px-4 py-3">
      <div class="flex justify-content-between align-items-center">
        <label class="font-bold text-yellow-500">Showing quotes for: </label>

        <div
          class="border-round-2xl bg-yellow-500 border-yellow-500 text-black-alpha-90 font-bold text-xs px-3 py-1"
          @click="editQuoteDetails()"
          v-if="!editDetails"
        >
          Edit
        </div>
      </div>

      <div class="flex justify-content-between mt-2">
        <label class="font-bold text-white text-sm"
          >{{ details.make }} {{ details.model }}</label
        >

        <label class="font-bold text-white text-center text-sm">{{
          details.yearOfManufacture
        }}</label>
      </div>

      <div class="flex justify-content-between mt-2">
        <label class="font-bold text-white text-sm">Estimate Car Value</label>

        <label class="font-bold text-white text-center text-sm"
          >KES {{ details.estimatedValue.toLocaleString() }}</label
        >
      </div>

      <div class="flex justify-content-between mt-2">
        <label class="font-bold text-white text-sm">Cover Period</label>

        <label class="font-bold text-white text-center text-sm"
          >{{ details.coverDuration }} Month(s)</label
        >
      </div>
    </div>
  </div>

  <loading
    v-model:active="isLoading"
    :is-full-page="false"
    color="#FFC402"
    loader="dots"
    :opacity="opacity"
  />
  <Toast />
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

import GetQuoteForm from "@/components/Quote/GetQuoteForm.vue";

import { useStore } from "vuex";

import debounce from "lodash/debounce";
import quoteService from "@/services/quoteService.js";
import useToastMessages from "@/composables/useToastMessages";
import { faL } from "@fortawesome/free-solid-svg-icons";

const isLoading = ref(false);
const opacity = ref(0.7);

const store = useStore();
const selectedQuote = store.getters.getSelectedQuote;

const { showSuccessToast, showErrorToast } = useToastMessages();

const emits = defineEmits([
  "showOverlay",
  "reverifyVehicle"
]);

onMounted(() => {
  // var button = document.getElementById('benefitsButton')
  // var butHeight = button.offsetHeight
  // var halvedButton = butHeight / 2

  // buttonBottom.value = '-' + halvedButton + 'px'

  // console.log(buttonBottom.value)

  if (details != null) {
    getSelectedMake();
  }

  buttonBottom.value = "-17px";
});

const { details } = defineProps({
  details: {
    type: Object, // Set the type of the prop
    required: true, // Make the prop required
  },
});

const selectedMake = ref(null);
const makes = ref([]);
const makeId = ref(null);
const makeName = ref(null);
const isInitialMakeLoad = ref(true);

const getSelectedMake = async () => {
  await getMakes(details.make);
};

const changeVehicleMake = (value) => {
  if (value.value.id) {
    makeId.value = value.value.id;
    makeName.value = value.value.vehicle_name;
  } else {
    makeId.value = null;
    makeName.value = null;
  }
  let quoteDetails = store.getters.getQuoteDetails;
  quoteDetails.make = makeName.value;

  store.commit("setQuoteDetails", quoteDetails);
};

const searchVehicleMakes = debounce(async (searchTerm) => {
  if (searchTerm.value != "") {
    await getMakes(searchTerm.value);
  }
}, 1000);

const getMakes = async (searchTerm) => {
  let data = {};
  data.searchTerm = searchTerm;
  data.productId = 1;

  isLoading.value = true;

  const vehicleMakes = [];

  quoteService
    .getMakes(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code === 200) {
        makes.value = response.data.data;

        if (isInitialMakeLoad.value) {
          selectedMake.value = makes.value[0];
          makeId.value = selectedMake.value.id;
          makeName.value = selectedMake.value.vehicle_name;
          isInitialMakeLoad.value = false;

          getSelectedModel();
        }
      } else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error);
      isLoading.value = false;
    });

  return vehicleMakes;
};

const selectedModel = ref(null);
const models = ref([]);
const modelId = ref(null);
const modelName = ref(null);
const isInitialModelLoad = ref(true);

const getSelectedModel = async () => {
  await getModels(details.model);
};

const changeVehicleModel = (value) => {
  if (value.value.id) {
    modelId.value = value.value.id;
    modelName.value = value.value.vehicle_model;
  } else {
    modelId.value = null;
    modelName.value = null;
  }

  let quoteDetails = store.getters.getQuoteDetails;
  quoteDetails.model = modelName.value;

  store.commit("setQuoteDetails", quoteDetails);
};

const searchVehicleModels = debounce(async (searchTerm) => {
  if (makeId.value == null) {
    showErrorToast("Error", "Vehicle make not selected.");
  } else {
    if (searchTerm.value != "") {
      await getModels(searchTerm.value);
    }
  }
}, 1000);

const getModels = async (searchTerm) => {
  let data = {};
  data.searchTerm = searchTerm;
  data.makeId = makeId.value;

  isLoading.value = true;

  const vehicleModels = [];

  quoteService
    .getModels(data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.response_code == 200) {
        models.value = response.data.data;

        if (isInitialModelLoad.value) {
          selectedModel.value = models.value[0];
          modelId.value = selectedModel.value.id;
          modelName.value = selectedModel.vehicle_model;
          isInitialModelLoad.value = false;
        }
      } else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error);
      isLoading.value = false;
    });

  return vehicleModels;
};

const buttonBottom = ref(null);
const editDetails = ref(false);

const editQuoteDetails = () => {
  if (editDetails.value) {
    editDetails.value = false;
    emits("showOverlay", false);
  } else {
    editDetails.value = true;
    emits("showOverlay", true);
  }
};

const updateQuote = () => {
  emits("reverifyVehicle");
};
</script>
