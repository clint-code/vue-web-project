<template>
  <div>
    <TopNav back="/" variation="yellow" :page="page" />

    <div class="custom-mobile-view">
      <div class="bg-yellow-500 relative p-3" id="section">
        <div class="flex justify-content-center">
          <label class="font-bold text-center text-sm"
            >Motor Car - Fill in the details below to get a quote:
          </label>
        </div>

        <div class="grid mt-2">
          <div class="col-6">
            <Dropdown
              v-model="selectedInsuranceClass"
              :options="insuranceClasses"
              optionLabel="name"
              optionValue="value"
              placeholder="Insurance Class"
              @change="changeInsuranceClass()"
              class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
            />
          </div>

          <div class="col-6">
            <Dropdown
              v-model="selectedInsuranceType"
              :options="insuranceTypes"
              optionLabel="name"
              optionValue="name"
              placeholder="Insurance Type"
              class="w-full border-round-3xl custom-dark-dropdown shadow-1 custom-small-dropdown"
            />
          </div>
        </div>

        <div class="grid mt-2">
          <div class="col-6">
            <Dropdown
              v-model="selectedCoverDuration"
              :options="coverDurations"
              optionLabel="name"
              placeholder="Cover Duration"
              class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
            />
          </div>

          <div class="col-6">
            <Calendar
              v-model="yom"
              placeholder="Year of Manufacture"
              class="w-full custom-rounded-calendar custom-small-dropdown"
              showIcon
              iconDisplay="input"
              dateFormat="yy"
              view="year"
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

        <div class="grid mt-2">
          <div class="col-6">
            <Dropdown
              v-model="selectedMake"
              :options="makes"
              optionLabel="vehicle_name"
              filter
              :loading="makesLoader"
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
              :loading="modelsLoader"
              optionLabel="vehicle_model"
              placeholder="Model E.g X3"
              filterPlaceholder="Search model"
              @filter="searchVehicleModels"
              @change="changeVehicleModel"
              class="w-full border-round-3xl custom-dark-dropdown shadow-1 custom-small-dropdown"
            />
          </div>
        </div>

        <div class="custom-mb-60 z-2">
          <template v-if="selectedInsuranceClass == 'PRIVATE'">
            <div class="grid mt-2">
              <div class="col-6">
                <InputGroup class="custom-amount-input">
                  <InputGroupAddon class="border-round-3xl p-1">
                    <div class="bg-yellow-500 border-round-xl flex">
                      <label
                        class="text-xs font-bold text-black-alpha-90 px-2 py-1"
                        >KES</label
                      >
                    </div>
                  </InputGroupAddon>
                  <InputText
                    class="border-round-3xl"
                    placeholder="Estimate value"
                    v-model="estimatedValue"
                  />
                </InputGroup>
              </div>

              <div class="col-6">
                <div
                  class="w-full border-round-2xl bg-black-alpha-90 border-1 border-black-alpha-90 p-2"
                  @click="getQuote()"
                >
                  <div class="flex justify-content-between align-items-center">
                    <label class="text-xs text-white font-bold"
                      >View Quote</label
                    >
                    <i class="fas fa-circle-arrow-right text-white text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="selectedInsuranceClass == 'COMMERCIAL'">
            <div class="grid mt-2">
              <div class="col-6">
                <Dropdown
                  v-model="selectedVehicleTonnage"
                  :options="vehicleTonnage"
                  optionLabel="name"
                  placeholder="Vehicle Tonnage"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>

              <div class="col-6">
                <Dropdown
                  v-model="selectedPassengers"
                  :options="passengers"
                  optionLabel="name"
                  placeholder="No. of passengers"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>
            </div>

            <div class="grid mt-2">
              <div class="col-6">
                <Dropdown
                  v-model="selectedPersonCovered"
                  :options="personsCovered"
                  optionLabel="name"
                  placeholder="Person Covered"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>

              <div class="col-6">
                <Dropdown
                  v-model="selectedVehicleUse"
                  :options="vehicleUses"
                  optionLabel="name"
                  placeholder="Vehicle Use"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>
            </div>

            <div class="grid mt-2">
              <div class="col-6">
                <InputGroup class="custom-amount-input">
                  <InputGroupAddon class="border-round-3xl p-1">
                    <div class="bg-yellow-500 border-round-xl flex">
                      <label
                        class="text-xs font-bold text-black-alpha-90 px-2 py-1"
                        >KES</label
                      >
                    </div>
                  </InputGroupAddon>
                  <InputText
                    class="border-round-3xl"
                    placeholder="Estimate value"
                    v-model="estimatedValue"
                  />
                </InputGroup>
              </div>

              <div class="col-6">
                <div
                  class="w-full border-round-2xl bg-black-alpha-90 border-1 border-black-alpha-90 p-2"
                  @click="getQuote()"
                >
                  <div class="flex justify-content-between align-items-center">
                    <label class="text-xs text-white font-bold"
                      >View Quote</label
                    >
                    <i class="fas fa-circle-arrow-right text-white text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="selectedInsuranceClass == 'PSV'">
            <div class="grid mt-2">
              <div class="col-6">
                <Dropdown
                  v-model="selectedPersonCovered"
                  :options="personsCovered"
                  optionLabel="name"
                  placeholder="Person Covered"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>

              <div class="col-6">
                <Dropdown
                  v-model="selectedPassengers"
                  :options="passengers"
                  optionLabel="name"
                  placeholder="No. of passengers"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>
            </div>

            <div class="grid mt-2">
              <div class="col-6">
                <Dropdown
                  v-model="selectedVehicleTonnage"
                  :options="vehicleTonnage"
                  optionLabel="name"
                  placeholder="Vehicle Tonnage"
                  class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1"
                />
              </div>

              <div class="col-6">
                <InputGroup class="custom-amount-input">
                  <InputGroupAddon class="border-round-3xl p-1">
                    <div class="bg-yellow-500 border-round-xl flex">
                      <label
                        class="text-xs font-bold text-black-alpha-90 px-2 py-1"
                        >KES</label
                      >
                    </div>
                  </InputGroupAddon>
                  <InputText
                    class="border-round-3xl"
                    placeholder="Estimate value"
                    v-model="estimatedValue"
                  />
                </InputGroup>
              </div>
            </div>

            <div class="grid mt-2">
              <div class="col-12">
                <div
                  class="w-full border-round-2xl bg-black-alpha-90 border-1 border-black-alpha-90 p-2"
                  @click="getQuote()"
                >
                  <div class="flex justify-content-between align-items-center">
                    <label class="text-xs text-white font-bold"
                      >View Quote</label
                    >
                    <i class="fas fa-circle-arrow-right text-white text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <img
          class="custom-bottom-image-alt z-1"
          src="@/assets/img/bg-city-yellow.png"
        />
      </div>

      <div class="p-3">
        <div>
          <h3 class="my-2">About Motor Car insurance</h3>
          <div class="custom-bottom-border"></div>
        </div>

        <div class="mt-4">
          <p class="font-bold m-0">Third-Party Only</p>
          <p class="font-bold my-1">
            Get a Car Insurance Quote - It’s Fast and Easy
          </p>

          <p class="custom-gray-text">
            Choosing the right car insurance can be tough. We make the process
            easier with a fast online car insurance quote that will help you get
            the discounts and savings as you go. You can compare options and
            customize coverage to fit your needs.
          </p>
        </div>

        <div class="mt-4">
          <p class="font-bold my-1">Comprehensive car insurance</p>

          <p class="custom-gray-text">
            Comprehensive insurance is an auto insurance that provides
            protection to you, your car and third parties against all possible
            risk.
          </p>

          <p class="custom-gray-text">
            It covers a wide array of events that can damage your car, including
            candalism, fires, and rockslides on twisting mountain roads.
          </p>

          <p class="custom-gray-text">
            This is a cover with the promise of total protection. We will invest
            our best to offer you the perfect cover to protect your vehicle
            against financial liabilities arising out of unforeseen
            contingencies.
          </p>

          <p class="custom-gray-text">What’s covered?</p>

          <p class="custom-gray-text">
            Comprehensive helps cover damage to your car that’s not the result
            of a collision, such as:
          </p>

          <ol>
            <li>Theft</li>
            <li>vandalism</li>
            <li>Fire</li>
            <li>Natural disasters (like a hurricane or a tornado)</li>
            <li>Falling objects</li>
            <li>Damage done to your car by animals</li>
            <li>
              A civil disturbance (like a riot tha results in damage or
              destruction of your car)
            </li>
            <li>In case of vehicle theft caught on fireF, vandalism</li>
            <li>In damage due to natural calamities</li>
          </ol>
        </div>

        <div class="mt-4">
          <p class="font-bold my-1">What’s not covered?</p>

          <p class="custom-gray-text">
            There are certain risk and situations that are excluded from claim
            benefits. When you Buy Car Insurance, it is important that you know
            about these inclusions and exclusions in detail so that there is no
            scope of ambiguity.
          </p>

          <p class="custom-gray-text">
            Some losses which are not covered by comprehensive car insurance
            These are mensioned below
          </p>
        </div>
      </div>
    </div>
  </div>

  <loading
    v-model:active="isLoading"
    :is-full-page="fullPage"
    color="#FFC402"
    loader="dots"
    :opacity="opacity"
  />
  <Toast />
</template>

<script setup>
import { ref, onMounted } from "vue";
import TopNav from "@/components/TopNav.vue";
import { useRouter } from "vue-router";
import useToastMessages from "@/composables/useToastMessages";
import quoteService from "@/services/quoteService.js";
import { useStore } from "vuex";
import debounce from "lodash/debounce";

const store = useStore();

const { showSuccessToast, showErrorToast } = useToastMessages();

const isLoading = ref(false);

const page = ref("Home");

const yom = ref(null);
const maxDate = ref(new Date());
const estimatedValue = ref(null);

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

const selectedInsuranceClass = ref();
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

const selectedMake = ref(null);
const makes = ref([]);
const makeId = ref(null);
const makeName = ref(null);

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

      if (response.data.response_code == 200) {
        makes.value = response.data.data;
        console.log(response.data.data);
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

const selectedModel = ref(null);
const models = ref([]);
const modelId = ref(null);
const modelName = ref(null);

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

const loadImage = ref(false);
const sectionHeight = ref(null);
const router = useRouter();

onMounted(() => {
  calulateSectionHeight();
});

const calulateSectionHeight = () => {
  var section = document.getElementById("section");
  var height = section.offsetHeight;

  console.log(height);

  var totalHeight = height + 80;

  sectionHeight.value = totalHeight + "px";
  loadImage.value = true;
};

const getData = () => {
  let data = {};
  data.make = makeName.value;
  data.model = modelName.value;
  data.yearOfManufacture = new Date(yom.value).getFullYear();
  data.productId = 1;
  data.productCategory = selectedInsuranceClass.value;
  data.productType = selectedInsuranceType.value;
  data.estimatedValue = estimatedValue.value;
  data.tcsAccepted = true;
  data.coverDuration = selectedCoverDuration.value?.value || null;
  data.vehicleUse = selectedVehicleUse.value?.name || null;
  data.tonnage = selectedVehicleTonnage.value?.value || null;
  data.passengers = selectedPassengers.value?.value || null;
  data.productPolicyId = 0;

  if (selectedInsuranceClass.value == "PRIVATE") {
    data.customerType = "Individual";
  } else {
    data.customerType = selectedPersonCovered.value?.name || null;
  }

  return data;
};

const getQuote = () => {
  isLoading.value = true;

  const clientData = getData();

  console.log(clientData);

  store.commit("setQuoteDetails", clientData);

  quoteService
    .getQuote(clientData)
    .then((response) => {
      isLoading.value = false;
      if (response.data.response_code == 200) {
        const quotes = response.data.data.quotes.map((quote) => ({
          ...quote,
          active: false,
          quoteRef: response.data.data.quoteRef,
          buttonText: "View Benefits",
        }));

        store.commit("setQuotes", quotes);
        //store.commit("setQuoteRef", response.data.data.quoteRef);
        console.log(quotes);
        router.push("/quote");
      } else {
        showErrorToast("Error", response.data.message);
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      showErrorToast("Error", "An error occurred with the request.");
      isLoading.value = false;
    });
};

const changeInsuranceClass = () => {
  //calulateSectionHeight()
  var section = document.getElementById("section");
  var height = section.offsetHeight;

  console.log(height);
};
</script>

<style scoped>
.p-inputtext {
  border-left: none !important;
}
</style>
