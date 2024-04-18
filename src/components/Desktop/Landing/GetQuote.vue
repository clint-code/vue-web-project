<template>

  <div class="w-full bg-white p-4 border-round-3xl shadow-1">

    <div class="flex justify-content-between">

      <label class="font-bold text-sm">
        Fill in the details below to compare policies and get the best quotes.
      </label>
      <i class="far fa-times-circle text-2xl text-yellow-500"></i>

    </div>

    <div class="mt-4">

      <div class="flex flex-wrap gap-3 mt-2">

        <div 
          class="flex align-items-center" 
          v-for="insuranceClass in insuranceClasses" 
          :key="insuranceClass.name">
          
          <RadioButton 
            v-model="selectedInsuranceClass" 
            :value="insuranceClass.value" />

          <label for="ingredient1" class="ml-1 text-xs font-bold">
            {{insuranceClass.name}}
          </label>

        </div>

      </div>

    </div>

    <div class="mt-4">

      <div class="flex flex-wrap gap-3 mt-2">

        <div 
          class="flex align-items-center" 
          v-for="insuranceType in insuranceTypes" 
          :key="insuranceType.name">

          <RadioButton 
            v-model="selectedInsuranceType" 
            :value="insuranceType.name" />

          <label for="ingredient1" class="ml-1 text-xs font-bold">
            {{insuranceType.name}}
          </label>

        </div>

      </div>

    </div>

    <div class="grid mt-3">

      <div class="col-3">

        <Dropdown 
          v-model="selectedCoverDuration" 
          :options="coverDurations" 
          optionLabel="name" 
          optionValue="value"
          placeholder="Cover Duration"
          class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />

      </div>

      <div class="col-3">
        <Dropdown 
          v-model="selectedMake" 
          :options="makes" 
          editable 
          optionLabel="vehicle_name"
          placeholder="Make E.g BMW" 
          filterPlaceholder="Search make" 
          @input="searchVehicleMakes"
          @change="changeVehicleMake"
          class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />
      </div>

      <div class="col-3">
        <Dropdown 
          v-model="selectedModel" 
          :options="models" 
          editable 
          optionLabel="vehicle_model"
          placeholder="Model E.g X3" 
          filterPlaceholder="Search model" 
          @input="searchVehicleModels"
          @change="changeVehicleModel"
          class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />
      </div>

      <div class="col-3">

        <InputGroup class="custom-amount-input-1">

          <InputGroupAddon class="border-round-3xl custom-dark-gray-border custom-border-1-5 p-1">
            <div class="bg-yellow-500 border-round-2xl flex">
              <label class="text-sm font-bold text-black-alpha-90 p-2 py-1">KES</label>
            </div>
          </InputGroupAddon>
          
          <InputText 
            class="border-round-3xl custom-dark-gray-border custom-border-1-5 text-sm" 
            v-model="estimatedValue"
            placeholder="Estimate value" />

        </InputGroup>

      </div>

      <div class="col-3">
        
        <Calendar 
          v-model="yearOfManufacture" 
          placeholder="Year of Manufacture" 
          view="year" 
          dateFormat="yy"
          class="w-full custom-sm-rd-calendar" 
          :maxDate="maxDate" 
          showIcon 
          iconDisplay="input">

          <template #inputicon="{ clickCallback }">
            <i class="fas fa-calendar-days text-yellow-500" @click="clickCallback"></i>
          </template>

        </Calendar>

      </div>

      <template v-if="selectedInsuranceClass != 'PRIVATE'">

        <div class="col-3">
          <Dropdown 
            v-model="selectedPersonCovered" 
            :options="personsCovered" 
            optionLabel="name" 
            optionValue="name"
            placeholder="Person Covered"
            class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />
        </div>

        <div class="col-3">
          <Dropdown 
            v-model="selectedPassengers" 
            :options="passengers" 
            optionLabel="name" 
            optionValue="value"
            placeholder="No. of passengers"
            class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />
        </div>

        <div class="col-3">
          <Dropdown 
            v-model="selectedVehicleTonnage" 
            :options="vehicleTonnage" 
            optionLabel="name"
            optionValue="value"
            placeholder="Vehicle Tonnage"
            class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />
        </div>

        <template v-if="selectedInsuranceClass == 'COMMERCIAL'">

          <div class="col-3">
            <Dropdown 
              v-model="selectedVehicleUse" 
              :options="vehicleUses" 
              optionLabel="name" 
              optionValue="name"
              placeholder="Vehicle Use"
              class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown-1" />
          </div>

        </template>

      </template>

      <div class="col-3">

        <div 
          v-ripple 
          class="p-ripple w-full border-round-3xl bg-yellow-500 border-1 border-yellow-500 p-2"
          @click="getQuote()">

          <div class="flex justify-content-between align-items-center">
            <label class="font-bold text-sm">Get Quote</label>
            <i class="fas fa-circle-arrow-right"></i>
          </div>

        </div>

      </div>

    </div>

  </div>
  
  <loading 
    v-model:active="isLoading" 
    :is-full-page="fullPage" 
    color="#FFC402" 
    loader="dots" 
    :opacity="opacity" />
  <Toast />
  
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import debounce from "lodash/debounce";

import quoteService from "@/services/quoteService.js";

import useToastMessages from "@/composables/useToastMessages";
const { showSuccessToast, showErrorToast } = useToastMessages();

import { useStore } from "vuex";

const store = useStore();

const emits = defineEmits([
  "getQuote",
]);

const props = defineProps({
  productId: Number,
});

const sectionHeight = ref(0);

const estimatedValue = ref(null);

const yearOfManufacture = ref(null);
const maxDate = ref(new Date());

const selectedCoverDuration = ref(null);
const coverDurations = ref([
  {
    name: "1 Month",
    value: 1,
  },
  {
    name: "12 Months",
    value: 12,
  },
]);

const selectedInsuranceClass = ref("PRIVATE");
const insuranceClasses = ref([
  {
    name: "Private",
    value: "PRIVATE",
  },
  {
    name: "Commercial",
    value: "COMMERCIAL",
  },
  {
    name: "PSV",
    value: "PSV",
  },
]);

const selectedInsuranceType = ref("Comprehensive");
const insuranceTypes = ref([
  {
    name: "Comprehensive",
  },
  {
    name: "Third Party",
  },
]);

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

const selectedMake = ref(null);
const makes = ref([]);
const makeId = ref(null);
const makeName = ref(null);

const selectedModel = ref(null);
const models = ref([]);
const modelId = ref(null);
const modelName = ref(null);

const selectedPersonCovered = ref(null);
const personsCovered = ref([
  {
    name: "Individual",
  },
  {
    name: "Corporate",
  },
]);

const selectedVehicleTonnage = ref(null);
const vehicleTonnage = ref([
  {
    name: "1 Tonne",
    value: 1,
  },
  {
    name: "2 Tonnes",
    value: 2,
  },
]);

const selectedPassengers = ref(null);
const passengers = ref([
  {
    name: "33 Seater",
    value: 33,
  },
  {
    name: "64 Seater",
    value: 64,
  },
]);

const selectedVehicleUse = ref(null);
const vehicleUses = ref([
  {
    name: "Own Goods",
  },
  {
    name: "General Cartage",
  },
]);

onMounted(() => {
  //
});

const changeVehicleMake = (value) => {
  if (value.value.id) {
    makeId.value = value.value.id;
    makeName.value = value.value.vehicle_name;
  } else {
    makeId.value = null;
    makeName.value = null;
  }
};

const searchVehicleMakes = debounce(async (searchTerm) => {
  if (searchTerm.target.value != "") {
    await getMakes(searchTerm.target.value);
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

      if (response.data.response_code == 200) {
        makes.value = response.data.data;
        console.log("Makes:", makes.value);

      } else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }

    })

    .catch((error) => {
      showErrorToast("Error", error.response.data);
      isLoading.value = false;
    });

  return vehicleMakes;
};

const changeVehicleModel = (value) => {
  if (value.value.id) {
    modelId.value = value.value.id;
    modelName.value = value.value.vehicle_model;
  } else {
    modelId.value = null;
    modelName.value = null;
  }
};

const searchVehicleModels = debounce(async (searchTerm) => {
  if (makeId.value == null) {
    showErrorToast("Error", "Vehicle make not selected.");
  } else {
    if (searchTerm.target.value != "") {
      await getModels(searchTerm.target.value);
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
        console.log("Models:", models.value);

      } else {
        isLoading.value = false;
        showErrorToast("Error", response.data);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error.response.data);
      isLoading.value = false;
    });

  return vehicleModels;
};

const getQuote = () => {
  let data = {};
  data.make = makeName.value;
  data.model = modelName.value;
  data.yearOfManufacture = new Date(yearOfManufacture.value).getFullYear();
  data.productId = props.productId;
  data.productCategory = selectedInsuranceClass.value;
  data.productType = selectedInsuranceType.value;
  data.estimatedValue = estimatedValue.value;
  data.tcsAccepted = true;
  data.coverDuration = selectedCoverDuration.value;
  data.vehicleUse = selectedVehicleUse.value;
  data.tonnage = selectedVehicleTonnage.value;
  data.passangers = selectedPassengers.value;
  data.productPolicyId = 0;

  if (selectedInsuranceClass.value == "PRIVATE") {
    data.customerType = "Individual";
  } else {
    data.customerType = selectedPersonCovered.value;
  }

  console.log("Data on get quote:", data);

  /**
   * store is used to maintain the current state of the data in this app
   * this data is stored while the using the app and can't be accessible while
   * not logged in for privacy reasons. This is different from local storage
   * which is a persistent state
   */
  store.commit("setQuoteDetails", data);
  emits("getQuote", data);

};

</script>

<style scoped>
.p-inputtext {
  border-left: none !important;
}
</style>
