<template>
    <TopNav back="/get-quote" variation="white-yellow-icons" @calculatedHeight="adjustHeight" />

    <div>
        <div :class="overlay"></div>

        <div class="px-3 pt-4 overflow-y-auto mb-4" :style="{ 'height': sectionHeight }">
            <div>
                <div class="flex justify-content-between">
                    <label class="font-bold text-xs">Motor Car Insurance</label>
                    <label class="font-bold text-xs">Step 2 of 4</label>

                    <ProgressBar class="custom-progress-bar mt-2" :value="50" :showValue="false"></ProgressBar>
                </div>
            </div>

            <div class="mt-3 mb-4">
                <div class="relative bg-yellow-500 border-round-2xl px-3 py-2 z-2">
                    <label class="text-xs font-bold">Vehicle Details</label>
                </div>

                <div class="relative z-1">
                    <div class="custom-light-gray-bg-1 border-round-bottom-3xl w-full custom-accordion-body py-4 px-3">
                        <div class="grid">
                            <div class="col-6">
                                <div class="flex flex-column gap-2">
                                    <label class="text-xs">Vehicle Registration No.</label>
                                    <InputText class="text-xs border-round-3xl" placeholder="Enter Registration" />
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="flex flex-column gap-2">
                                    <label class="text-xs">Upload Copy ID</label>
                                    <div class="custom-file-input-container bg-white border-round-3xl">
                                        <input type="file" id="fileInput" class="custom-file-input"
                                            @change="uploadFile($event)">
                                        <label class="text-xs custom-input-color">{{ uploadTxt }}</label>
                                        <i class="fas fa-upload text-sm custom-gray"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid mt-1">
                            <div class="col-12">
                                <div class="flex flex-column gap-2">
                                    <label class="text-xs font-medium">Choose Security Device</label>
                                    <MultiSelect v-model="selectedSecurityDevices" display="chip" :options="securityDevices"
                                        optionLabel="name" placeholder="Select Security Device"
                                        class="w-full md:w-20rem text-xs border-round-3xl" />
                                </div>
                            </div>
                        </div>

                        <div class="grid mt-1">
                            <div class="col-12">
                                <div class="flex flex-column gap-2">
                                    <label class="text-xs">Choose Policy Start Date</label>

                                    <Calendar placeholder="Choose Date" dateFormat="dd/mm/yy"
                                        class="w-full custom-rounded-calendar custom-small-dropdown" showIcon
                                        iconDisplay="input">
                                        <template #inputicon="{ clickCallback }">
                                            <i class="fas fa-calendar-days text-black-alpha-90 text-sm"
                                                @click="clickCallback"></i>
                                        </template>
                                    </Calendar>
                                </div>
                            </div>
                        </div>

                        <div class="relative mb-4" v-if="valuationStatus">
                            <div class="w-full bg-yellow-500 border-round-top-3xl p-3">
                                <div class="flex justify-content-between">
                                    <label class="font-bold text-xs w-6">Location</label>
                                    <label class="font-bold text-xs text-right w-6">{{ valuationLocation }}</label>
                                </div>

                                <div class="flex justify-content-between mt-2">
                                    <label class="font-bold text-xs w-6">Date</label>
                                    <label class="font-bold text-xs text-right w-6">{{ valuationDate }}</label>
                                </div>

                                <div class="flex justify-content-between mt-2 mb-3">
                                    <label class="font-bold text-xs w-6">Time</label>
                                    <label class="font-bold text-xs text-right w-6">{{ valuationTime.name }}</label>
                                </div>
                            </div>

                            <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2 custom-accordion-body-1"
                                @click="showValuationModal()">
                                <div class="flex justify-content-between align-items-center">
                                    <label class="font-bold text-xs text-white">Book Valuation Now</label>
                                    <i class="fas fa-circle-arrow-right text-white"></i>
                                </div>
                            </div>
                        </div>

                        <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2"
                            @click="showValuationModal()" v-if="!valuationStatus">
                            <div class="flex justify-content-between align-items-center">
                                <label class="font-bold text-xs text-white">Book Valuation Now</label>
                                <i class="fas fa-circle-arrow-right text-white"></i>
                            </div>
                        </div>

                        <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-2"
                            @click="submit()">

                            <div class="flex justify-content-between align-items-center">
                                <label class="font-bold text-xs">View Summary</label>
                                <label class="font-bold text-xs">KES 50,317</label>
                                <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="bottom-0 left-0 w-full fixed z-1" id="bottomCard">
            <BottomSummary @showOverlay="displayOverlay" />
        </div>

        <Dialog v-model:visible="modal" modal :closable="false" :showHeader="false" :showFooter="false"
            class="custom-dialog">

            <div class="flex flex-column align-items-center">
                <h3 class="text-center px-4">
                    Choose your preferred date, time and location for your valuation
                </h3>
                <div class="custom-bottom-border-1 w-6rem"></div>

                <i class="fas fa-car-bus text-7xl text-yellow-500 mt-4"></i>
            </div>

            <div class="mt-6">
                <div class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3"
                    @click="showCalendarModal()">
                    <i class="fas fa-calendar-days text-2xl text-yellow-500"></i>
                    <label class="font-bold">{{ valuationDate }}</label>
                </div>

                <div class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3 mt-4"
                    @click="showTimeModal()">
                    <i class="fas fa-clock text-2xl text-yellow-500"></i>
                    <label class="font-bold">{{ valuationTime.name }}</label>
                </div>

                <div class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3 mt-4"
                    @click="showPlacesModal()">
                    <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
                    <label class="font-bold">{{ valuationLocation }}</label>
                </div>
            </div>

            <div class="mt-5">
                <div class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
                    @click="closeModal()">
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
        </Dialog>

        <Dialog v-model:visible="calendarModal" modal :closable="false" :showHeader="false" :showFooter="false"
            class="custom-dialog">

            <div class="flex flex-column align-items-center">
                <h3 class="text-center px-4">
                    What date do you prefer for your valuation?
                </h3>
                <div class="custom-bottom-border-1 w-6rem"></div>

                <i class="fas fa-calendar-days text-7xl text-yellow-500 mt-4"></i>
            </div>

            <div class="flex align-items-center mt-4">
                <Calendar class="custom-datepicker" :showWeek="false" v-model="valuationDate" inline showWeek />
            </div>

            <div class="mt-5">
                <div class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
                    @click="setValuationDate()">
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

        </Dialog>

        <Dialog v-model:visible="timeModal" modal :closable="false" :showHeader="false" :showFooter="false"
            class="custom-dialog">

            <div class="flex flex-column align-items-center">
                <h3 class="text-center px-4">
                    What time do you prefer for your valuation?
                </h3>
                <div class="custom-bottom-border-1 w-6rem"></div>

                <i class="fas fa-clock text-7xl text-yellow-500 mt-4"></i>
            </div>

            <div class="mt-4 w-full">
                <div class="flex custom-shadow-1 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
                    @click="showTimeModal()">
                    <i class="fas fa-clock text-2xl text-yellow-500"></i>
                    <label class="font-bold">{{ valuationTime.name }}</label>
                </div>

                <Listbox class="mt-4 h-13rem overflow-auto custom-listbox" listStyle="custom-list" v-model="valuationTime"
                    :options="timesArray" optionLabel="name" />

            </div>

            <div class="mt-5">
                <div class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
                    @click="setValuationTime()">
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

        </Dialog>

        <Dialog v-model:visible="placesModal" modal :closable="false" :showHeader="false" :showFooter="false"
            class="custom-dialog">

            <div class="flex flex-column align-items-center">
                <h3 class="text-center px-4">
                    Please enter your preferred location
                </h3>
                <div class="custom-bottom-border-1 w-6rem"></div>

                <i class="fas fa-map-marker-alt text-7xl text-yellow-500 mt-4"></i>
            </div>

            <div class="mt-4 w-full">
                <div class="flex custom-shadow-1 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4">
                    <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
                    <InputText class="border-none w-full font-bold custom-border-radius" v-model="searchTerm"
                        @input="debouncedSearch" placeholder="Search location" />
                </div>

                <Listbox class="mt-4 h-13rem overflow-auto custom-listbox px-3" listStyle="custom-list" v-model="searchTerm"
                    :options="valuationLocations" optionLabel="name" optionValue="name" />

            </div>

            <div class="mt-5">
                <div class="flex justify-content-between custom-shadow-1 bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 mt-4"
                    @click="setValuationLocation()">
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

        </Dialog>
    </div>
</template>

<script setup>
import debounce from 'lodash/debounce'

import TopNav from '@/components/TopNav.vue'
import BottomSummary from '@/components/Quote/BottomSummary.vue'
import { times } from '@/util/times.js'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import validation from '@/services/validation.js'

const router = useRouter()

const selectedSecurityDevices = ref(null)
const securityDevices = ref([
    {
        "name": "Immobilizer"
    },
    {
        "name": "Gear Lock"
    }
])
const uploadTxt = ref('Upload')
const sectionHeight = ref(null)
const overlay = ref(null)

const modal = ref(false)
const calendarModal = ref(false)
const timeModal = ref(false)
const placesModal = ref(false)

const valuationDate = ref('Choose a Date')

const valuationLocation = ref('Enter valuation location')
const valuationLocations = ref([])
const searchTerm = ref(null)

const valuationTime = ref({ name: 'Select Time' })
const timesArray = ref(null)

const valuationStatus = ref(false)

onMounted(() => {
    timesArray.value = times
})

const adjustHeight = (value) => {
    var navbarHeight = value

    var viewportHeightInPixels = window.innerHeight;

    var bottomCard = document.getElementById('bottomCard')
    var bottomCardHeight = bottomCard.offsetHeight

    var difference = viewportHeightInPixels - (navbarHeight + bottomCardHeight + 12)

    sectionHeight.value = difference + 'px'
}

const debouncedSearch = debounce(async (term) => {
    valuationLocations.value = [];

    const results = await performSearch(term);
    valuationLocations.value = results;
}, 1000)

const performSearch = async () => {
    //validation.getPlaces(searchTerm.value)

    return new Promise((resolve) => {
        const results = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ]
        resolve(results)
    })
}

const displayOverlay = (value) => {
    if (value) {
        overlay.value = 'custom-overlay'
    }
    else {
        overlay.value = null
    }
}

const uploadFile = (e) => {
    //uploadTxt.value = e.target.files[0].name
    uploadTxt.value = "Uploaded"
}

const showValuationModal = () => {
    modal.value = true
}

const showCalendarModal = () => {
    modal.value = false
    calendarModal.value = true
}

const setValuationDate = () => {
    modal.value = true
    calendarModal.value = false
}

const showTimeModal = () => {
    modal.value = false
    timeModal.value = true
}

const setValuationTime = () => {
    modal.value = true
    timeModal.value = false
}

const closeModal = () => {
    if (valuationDate.value != 'Choose a Date' && valuationTime.value != null && valuationLocation.value != null) {
        modal.value = false
        valuationStatus.value = true
    }
}

const showPlacesModal = () => {
    modal.value = false
    placesModal.value = true
}

const setValuationLocation = () => {
    modal.value = true
    placesModal.value = false
    valuationLocation.value = searchTerm.value
}

const submit = () => {
    router.push("/summary")
}
</script>