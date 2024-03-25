<template>
  <TopNav
    back="/get-quote"
    variation="white-yellow-icons"
    @calculatedHeight="adjustHeight"
  />

  <div class="custom-mobile-view">
    <div class="px-3 pt-4" :style="{ height: sectionHeight }">
      <div class="flex justify-content-between">
        <label class="font-bold text-sm">Motor Car Insurance</label>
        <label class="font-bold text-sm">Step 2 of 4</label>
      </div>

      <ProgressBar
        class="custom-progress-bar mt-2"
        :value="50"
        :showValue="false"
      ></ProgressBar>

      <div class="mt-3 mb-4">
        <div class="relative bg-yellow-500 border-round-2xl px-3 py-2 z-2">
          <label class="text-xs font-bold">Vehicle Details</label>
        </div>

        <div class="relative z-1">
          <div
            class="custom-light-gray-bg-1 border-round-bottom-3xl w-full custom-accordion-body py-4 px-3"
          >
            <div class="grid">
              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <label class="text-xs">Vehicle Registration No.</label>
                  <InputText
                    class="text-xs border-round-3xl"
                    v-model="registrationNumber"
                    placeholder="Enter Registration"
                  />
                </div>
              </div>

              <div class="col-6">
                <div class="flex flex-column gap-2">
                  <label class="text-xs">Upload Logbook</label>
                  <div
                    class="custom-file-input-container bg-white border-round-3xl"
                  >
                    <input
                      type="file"
                      id="fileInput"
                      class="custom-file-input"
                      @change="uploadFile($event)"
                    />
                    <label class="text-xs custom-input-color">{{
                      uploadTxt
                    }}</label>
                    <i class="fas fa-upload text-sm custom-gray"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid mt-1">
              <div class="col-12">
                <div class="flex flex-column gap-2">
                  <label class="text-xs font-medium"
                    >Choose Security Device</label
                  >
                  <MultiSelect
                    v-model="selectedSecurityDevices"
                    display="chip"
                    :options="securityDevices"
                    optionLabel="name"
                    placeholder="Select Security Device"
                    class="w-full md:w-20rem text-xs border-round-3xl"
                  />
                </div>
              </div>
            </div>

            <div class="grid mt-1">
              <div class="col-12">
                <div class="flex flex-column gap-2">
                  <label class="text-xs">Choose Policy Start Date</label>

                  <Calendar
                    placeholder="Choose Date"
                    dateFormat="dd/mm/yy"
                    class="w-full custom-rounded-calendar custom-small-dropdown"
                    showIcon
                    iconDisplay="input"
                    v-model="coverStartDate"
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
            </div>

            <div class="relative mb-4" v-if="valuationStatus">
              <div class="w-full bg-yellow-500 border-round-top-3xl p-3">
                <div class="flex justify-content-between">
                  <label class="font-bold text-xs w-6">Location</label>
                  <label class="font-bold text-xs text-right w-6">{{
                    valuationLocation
                  }}</label>
                </div>

                <div class="flex justify-content-between mt-2">
                  <label class="font-bold text-xs w-6">Date</label>
                  <template v-if="valuationDate != 'Choose date'">
                    <label class="font-bold text-xs text-right w-6">{{
                      format(valuationDate)
                    }}</label>
                  </template>
                </div>

                <div class="flex justify-content-between mt-2 mb-3">
                  <label class="font-bold text-xs w-6">Time</label>
                  <template v-if="valuationTime != 'Choose time'">
                    <label class="font-bold text-xs text-right w-6">{{
                      valuationTime.name
                    }}</label>
                  </template>
                </div>
              </div>

              <div
                class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2 custom-accordion-body-1"
                @click="showValuationModal()"
              >
                <div class="flex justify-content-between align-items-center">
                  <label class="font-bold text-xs text-white"
                    >Update Valuation Details</label
                  >
                  <i class="fas fa-circle-arrow-right text-white"></i>
                </div>
              </div>
            </div>

            <div
              class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2"
              @click="showValuationModal()"
              v-if="!valuationStatus"
            >
              <div class="flex justify-content-between align-items-center">
                <label class="font-bold text-xs text-white"
                  >Book Valuation Now</label
                >
                <i class="fas fa-circle-arrow-right text-white"></i>
              </div>
            </div>

            <div
              class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-2"
              @click="submit()"
            >
              <div class="flex justify-content-between align-items-center">
                <label class="font-bold text-xs">View Summary</label>
                <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="overlay"></div>

    <div class="bottom-0 left-0 w-full absolute" id="bottomCard">
      <BottomSummaryMobile
        @showOverlay="displayOverlay"
        :details="store.getters.getQuoteDetails"
        @reverifyVehicle="reverifyVehicle"
      />
    </div>
  </div>

  <div class="custom-desktop-view">
    <template v-if="topNavHeight != null">
      <DesktopVehicleDetails :topNavHeight="topNavHeight" />
    </template>
  </div>

  <Dialog
    v-model:visible="modal"
    modal
    :closable="false"
    :showHeader="false"
    :showFooter="false"
    class="custom-dialog"
  >
    <div class="custom-mobile-view">
      <div class="flex flex-column align-items-center">
        <h3 class="text-center px-4">
          Choose your preferred date, time and location for your valuation
        </h3>
        <div class="custom-bottom-border-1 w-6rem"></div>

        <i class="fas fa-car-bus text-7xl text-yellow-500 mt-4"></i>
      </div>

      <div class="mt-6">
        <div
          class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3"
          @click="showCalendarModal()"
        >
          <i class="fas fa-calendar-days text-2xl text-yellow-500"></i>
          <label class="font-bold">{{ valuationDate }}</label>
        </div>

        <div
          class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3 mt-4"
          @click="showTimeModal()"
        >
          <i class="fas fa-clock text-2xl text-yellow-500"></i>
          <label class="font-bold">{{ valuationTime.name }}</label>
        </div>

        <div
          class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3 mt-4"
          @click="showPlacesModal()"
        >
          <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
          <label class="font-bold">{{ valuationLocation }}</label>
        </div>
      </div>

      <div class="mt-5">
        <div
          class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
          @click="closeModal()"
        >
          <label class="font-bold text-xl">Continue</label>
          <i class="fas fa-circle-arrow-right text-black-alpha-90 text-xl"></i>
        </div>
      </div>

      <hr class="mt-4 px-0" />

      <div>
        <div class="flex flex-column align-items-center">
          <h3 class="text-center my-2">Go Back</h3>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="calendarModal"
    modal
    :closable="false"
    :showHeader="false"
    :showFooter="false"
    class="custom-dialog"
  >
    <div class="custom-mobile-view">
      <div class="flex flex-column align-items-center">
        <h3 class="text-center px-4">
          What date do you prefer for your valuation?
        </h3>
        <div class="custom-bottom-border-1 w-6rem"></div>

        <i class="fas fa-calendar-days text-7xl text-yellow-500 mt-4"></i>
      </div>

      <div class="flex align-items-center mt-4">
        <Calendar
          class="custom-datepicker"
          :showWeek="false"
          v-model="valuationDate"
          inline
          :minDate="minDate"
          @dateSelect="changeDate()"
        />
      </div>

      <div class="mt-5">
        <div
          class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
          @click="setValuationDate()"
        >
          <label class="font-bold text-xl">Continue</label>
          <i class="fas fa-circle-arrow-right text-black-alpha-90 text-xl"></i>
        </div>
      </div>
      <hr class="mt-4 px-0" />

      <div>
        <div class="flex flex-column align-items-center">
          <h3 class="text-center my-2">Go Back</h3>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="timeModal"
    modal
    :closable="false"
    :showHeader="false"
    :showFooter="false"
    class="custom-dialog"
  >
    <div class="custom-mobile-view">
      <div class="flex flex-column align-items-center">
        <h3 class="text-center px-4">
          What time do you prefer for your valuation?
        </h3>
        <div class="custom-bottom-border-1 w-6rem"></div>

        <i class="fas fa-clock text-7xl text-yellow-500 mt-4"></i>
      </div>

      <div class="mt-4 w-full">
        <div
          class="flex custom-shadow-1 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
          @click="showTimeModal()"
        >
          <i class="fas fa-clock text-2xl text-yellow-500"></i>
          <label class="font-bold">{{ valuationTime.name }}</label>
        </div>

        <Listbox
          class="mt-4 h-13rem overflow-auto custom-listbox"
          listStyle="custom-list"
          v-model="valuationTime"
          :options="timesArray"
          optionLabel="name"
        />
      </div>

      <div class="mt-5">
        <div
          class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
          @click="setValuationTime()"
        >
          <label class="font-bold text-xl">Continue</label>
          <i class="fas fa-circle-arrow-right text-black-alpha-90 text-xl"></i>
        </div>
      </div>
      <hr class="mt-4 px-0" />

      <div>
        <div class="flex flex-column align-items-center">
          <h3 class="text-center my-2">Go Back</h3>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="placesModal"
    modal
    :closable="false"
    :showHeader="false"
    :showFooter="false"
    class="custom-dialog"
  >
    <div class="custom-mobile-view">
      <div class="flex flex-column align-items-center">
        <h3 class="text-center px-4">Please enter your preferred location</h3>
        <div class="custom-bottom-border-1 w-6rem"></div>

        <i class="fas fa-map-marker-alt text-7xl text-yellow-500 mt-4"></i>
      </div>

      <div class="mt-4 w-full">
        <div
          class="flex custom-shadow-1 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
        >
          <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
          <InputText
            class="border-none w-full font-bold custom-border-radius"
            v-model="searchTerm"
            @input="debouncedSearch"
            placeholder="Search location"
          />
        </div>

        <Listbox
          class="mt-4 h-13rem overflow-auto custom-listbox px-3"
          listStyle="custom-list"
          v-model="searchTerm"
          :options="valuationLocations"
          optionLabel="name"
          optionValue="name"
        />
      </div>

      <div class="mt-5">
        <div
          class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
          @click="setValuationLocation()"
        >
          <label class="font-bold text-xl">Continue</label>
          <i class="fas fa-map-marker-alt text-black-alpha-90 text-xl"></i>
        </div>
      </div>

      <hr class="mt-4 px-0" />

      <div>
        <div class="flex flex-column align-items-center">
          <h3 class="text-center my-2">Go Back</h3>
        </div>
      </div>
    </div>
  </Dialog>

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
import debounce from "lodash/debounce";

import TopNav from "@/components/TopNav.vue";
import BottomSummaryMobile from "@/components/Mobile/BottomSummary/BottomSummary.vue";

import useDateFormatter from "@/composables/useDateFormatter";
import useArrayToStringFormatter from "@/composables/useArrayToStringFormatter";

import additionalDetailsService from "@/services/additionalDetailsService";

import DesktopVehicleDetails from "@/components/Desktop/AdditionalDetails/VehicleDetails.vue";
import { useStore } from "vuex";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { times } from "@/util/times.js";

const store = useStore();
const router = useRouter();

const { format } = useDateFormatter();
const { formatArray } = useArrayToStringFormatter();

const overlay = ref(null);
const isLoading = ref(false);
const opacity = ref(0.7);

const quoteRef = store.getters.getQuoteRef;

const registrationNumber = ref(null);
const coverStartDate = ref(null);

const minDate = ref(new Date());

const modal = ref(false);
const calendarModal = ref(false);
const timeModal = ref(false);
const placesModal = ref(false);

const valuationDate = ref("Choose a Date");

const valuationLocation = ref("Enter valuation location");
const valuationLocations = ref([]);
const searchTerm = ref(null);

const valuationTime = ref({ name: "Select Time" });
const timesArray = ref(null);

const valuationStatus = ref(false);

const sectionHeight = ref(null);

const topNavHeight = ref(null);
const bottomCardHeight = ref(null);

const selectedSecurityDevices = ref(null);
const securityDevices = ref([
  {
    name: "Immobilizer",
  },
  {
    name: "Gear Lock",
  },
]);
const uploadTxt = ref("Upload");

onMounted(() => {
  timesArray.value = times;
});

const adjustHeight = (value) => {
  var navbarHeight = value;

  var viewportHeightInPixels = window.innerHeight;

  var bottomCard = document.getElementById("bottomCard");
  var bottomCardHeight = bottomCard.offsetHeight;

  var difference =
    viewportHeightInPixels - (navbarHeight + bottomCardHeight + 12);

  sectionHeight.value = difference + "px";
  topNavHeight.value = navbarHeight;
  console.log("top nav bar height" + topNavHeight.value);
};

const debouncedSearch = debounce(async (term) => {
  valuationLocations.value = [];

  const results = await performSearch(term);
  valuationLocations.value = results;
}, 1000);

const performSearch = async () => {
  //validation.getPlaces(searchTerm.value)

  return new Promise((resolve) => {
    const results = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ];
    resolve(results);
  });
};

const displayOverlay = (value) => {
  if (value) {
    overlay.value = "custom-overlay";
  } else {
    overlay.value = null;
  }
};

const uploadFile = (e) => {
  //uploadTxt.value = e.target.files[0].name
  uploadTxt.value = "Uploaded";
};

const showValuationModal = () => {
  modal.value = true;
};

const showCalendarModal = () => {
  modal.value = false;
  placesModal.value = false;
  calendarModal.value = true;
};

const setValuationDate = () => {
  modal.value = true;
  calendarModal.value = false;
};

const showTimeModal = () => {
  modal.value = false;
  timeModal.value = true;
};

const setValuationTime = () => {
  modal.value = true;
  timeModal.value = false;
};

const closeModal = () => {
  if (
    valuationDate.value != "Choose a Date" &&
    valuationTime.value != null &&
    valuationLocation.value != null
  ) {
    modal.value = false;
    valuationStatus.value = true;
  }
};

const showPlacesModal = () => {
  modal.value = false;
  calendarModal.value = false;
  placesModal.value = true;
};

const setValuationLocation = () => {
  modal.value = true;
  placesModal.value = false;
  valuationLocation.value = searchTerm.value;
};


const submit = () => {
  verifyVehicle();
};

const verifyVehicle = () => {
  let data = {};

  data.registrationNo = registrationNumber.value;
  data.quoteRef = quoteRef;
  data.nationalId = store.getters.getPersonalDetails.nationalId;

  isLoading.value = true;

  additionalDetailsService
    .verifyVehicle(data)
    .then((response) => {
      if (response.data.response_code == 200) {
        postValuation();
        console.log("Passed");
      } else {
        isLoading.value = false;
        showErrorToast("Error", response);
      }
    })
    .catch((error) => {
      isLoading.value = false;
      showErrorToast("Error", error);
    });
};

const postValuation = () => {
  let data = {};

  data.date = format(valuationDate.value);
  data.time = valuationTime.value.name;
  data.latitude = "0.00";
  data.longitude = "0.00";
  data.quoteRef = quoteRef;
  data.placeName = valuationLocation.value;

  console.log(data);

  additionalDetailsService
    .postValuation(data)
    .then((response) => {
      if (response.data.response_code == 200) {
        getQuoteSummary();
        console.log("Passed");
        store.commit("setValuationLocation", valuationLocation.value);
        store.commit("setValuationDate", valuationDate.value);
        store.commit("setValuationTime", valuationTime.value.name);
        store.commit("setValuationStatus", true);
      } else {
        isLoading.value = false;
        showErrorToast("Error", response);
      }
    })
    .catch((error) => {
      isLoading.value = false;
      showErrorToast("Error", error);
    });
};

const getQuoteSummary = () => {
  let data = {};

  data.quoteRef = quoteRef;
  data.coverStartDate = format(coverStartDate.value);
  data.securityDevice = selectedSecurityDevices.value
    .map((item) => item.name)
    .join(", ");

  console.log(data);

  additionalDetailsService
    .getQuoteSummary(data)
    .then((response) => {
      if (response.data.response_code == 200) {
        store.commit("setQuoteSummary", response.data.data);
        navigate("/summary");
        console.log(response.data.data);
      } else {
        isLoading.value = false;
        showErrorToast("Error", response);
      }
    })
    .catch((error) => {
      showErrorToast("Error", error);
    });
};

const navigate = (path) => {
  router.push(path);
};

const reverifyVehicle = () => {
  if (registrationNumber.value != null) {
    let data = {};

    data.quoteRef = store.getters.getQuoteRef;
    data.make = store.getters.getQuoteDetails.make;
    data.model = store.getters.getQuoteDetails.model;
    data.registrationNo = registrationNumber.value;

    isLoading.value = true;

    additionalDetailsService
      .reverifyVehicle(data)
      .then((response) => {
        if (response.data.response_code == 200) {
          isLoading.value = false;
          showSuccessToast("Success", "Vehicle verified successfully");
        } else {
          isLoading.value = false;
          showErrorToast("Error", response);
        }
      })
      .catch((error) => {
        isLoading.value = false;
        showErrorToast("Error", error);
      });
  } else {
    showErrorToast("Error", "Please enter vehicle registration number.");
  }
};


</script>
