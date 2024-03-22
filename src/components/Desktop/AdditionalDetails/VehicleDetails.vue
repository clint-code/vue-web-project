<template>
    <div class="custom-width-80">
        <div class="grid">
            <div class="lg:col-10 relative">
                <div class="overflow-y-scroll" :style="{ 'height': newSectionHeight }">
                    <div class="mt-3">
                        <div @click="navigate('/personal-details')"
                            class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-1 px-3 py-2 custom-w-5">
                            <i class="fas fa-angle-double-left text-white"></i>
                            <label class="text-sm font-bold text-white justify-content-end">Back</label>
                        </div>
                    </div>

                    <div class="mt-3">
                        <div class="relative bg-yellow-500 border-round-2xl px-3 custom-py-10 z-2">
                            <label class="text-sm font-bold">Vehicle Details</label>
                        </div>

                        <div class="relative z-1 mb-8">
                            <div class="custom-light-gray-bg-1 custom-gray-border-2 border-round-bottom-3xl w-full custom-accordion-body-2 py-4 px-3">
                                <div class="grid">
                                    <div class="col-6">
                                        <div class="flex flex-column gap-2">
                                            <label class="text-sm font-medium">Vehicle Registration No.</label>
                                            <InputText class="text-sm border-round-3xl" v-model="registrationNumber"
                                                placeholder="Enter Registration" />
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="flex flex-column gap-2">
                                            <label class="text-sm font-medium">Upload Logbook</label>
                                            <div class="custom-file-input-container bg-white border-round-3xl">
                                                <input type="file" id="fileInput" class="custom-file-input"
                                                    @change="uploadFile($event)">
                                                <label class="text-sm custom-input-color">{{ uploadTxt }}</label>
                                                <i class="fas fa-upload text-sm custom-gray"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid mt-1">
                                    <div class="col-6">
                                        <div class="flex flex-column gap-2">
                                            <label class="text-sm font-medium">Choose Security Device</label>
                                            <MultiSelect v-model="selectedSecurityDevices" display="chip"
                                                :options="securityDevices" optionLabel="name"
                                                placeholder="Select Security Device"
                                                class="w-full text-sm border-round-3xl" />
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="flex flex-column gap-2">
                                            <label class="text-sm font-medium">Choose Policy Start Date</label>

                                            <Calendar placeholder="Choose Date" dateFormat="dd/mm/yy"
                                                v-model="coverStartDate" :minDate="minDate"
                                                class="w-full custom-rounded-calendar custom-small-dropdown-1" showIcon
                                                iconDisplay="input">
                                                <template #inputicon="{ clickCallback }">
                                                    <i class="fas fa-calendar-days text-black-alpha-90 text-sm"
                                                        @click="clickCallback"></i>
                                                </template>
                                            </Calendar>
                                        </div>
                                    </div>
                                </div>

                                <template v-if="store.getters.getValuationStatus">
                                    <div class="relative mb-4 mt-2" >
                                        <div
                                            class="w-full custom-gray-bg custom-gray-border-3 border-1 border-round-top-3xl p-3">
                                            <div class="flex justify-content-between">
                                                <label class="font-bold text-xs w-6">Location</label>
                                                <label class="font-bold text-xs text-right w-6">{{ store.getters.getValuationLocation }}</label>
                                            </div>

                                            <div class="flex justify-content-between mt-2">
                                                <label class="font-bold text-xs w-6">Date</label>
                                                <template v-if="store.getters.getValuationDate != 'Choose date'">
                                                    <label class="font-bold text-xs text-right w-6">{{ store.getters.getValuationDate }}</label>
                                                </template>
                                               
                                            </div>

                                            <div class="flex justify-content-between mt-2 mb-3">
                                                <label class="font-bold text-xs w-6">Time</label>
                                                <template v-if="store.getters.getValuationTime != 'Choose time'">
                                                    <label class="font-bold text-xs text-right w-6">{{ store.getters.getValuationTime }}</label>
                                                </template>                                                
                                            </div>
                                        </div>

                                        <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2 custom-accordion-body-1"
                                            @click="showValuationModal()">
                                            <div class="flex justify-content-between align-items-center">
                                                <label class="font-bold text-sm text-white">Update Valuation Details</label>
                                                <i class="fas fa-circle-arrow-right text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <template v-else>
                                    <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2"
                                        @click="showValuationModal()">
                                        <div class="flex justify-content-between align-items-center">
                                            <label class="font-bold text-sm text-white">Book Valuation Now</label>
                                            <i class="fas fa-circle-arrow-right text-white"></i>
                                        </div>
                                    </div>
                                </template>

                                <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-3"
                                    @click="submit()">

                                    <div class="flex justify-content-between align-items-center">
                                        <label class="font-bold text-sm">View Summary</label>
                                        <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom-0 left-0 w-full absolute">
                    <BottomSummaryDesktop @showOverlay="displayOverlay" @calculatedCardHeight="resetHeight" @reverifyVehicle="reverifyVehicle"/>
                </div>
            </div>

            <div class="lg:col-2 mt-4">
                <Steps :step="step" :level="level" />
            </div>
        </div>
    </div>

    <Dialog v-model:visible="modal" modal :closable="false" :showHeader="false" :showFooter="false"
        class="custom-dialog">
        <div class="custom-desktop-view">
            <MainDialogModal @showValuationDateTimeModal="showCalendarModal" @showGooglePlacesModal="showPlacesModal"
                @closeMainModal="closeMainModal" />
        </div>
    </Dialog>

    <Dialog v-model:visible="calendarModal" modal :closable="false" :showHeader="false" :showFooter="false"
        class="custom-dialog">
        <div class="custom-desktop-view">
            <DateTimeModal @showGooglePlacesModal="showPlacesModal" @closeDateTimeModal="closeDateTimeModal" />
        </div>
    </Dialog>

    <Dialog v-model:visible="placesModal" modal :closable="false" :showHeader="false" :showFooter="false"
        class="custom-dialog">
        <div class="custom-desktop-view">
            <PlacesModal @showValuationDateTimeModal="showCalendarModal"
                @setValuationLocation="setValuationLocationFromModal" @closePlacesModal="closePlacesModal" />
        </div>
    </Dialog>

    <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity"/>
    <Toast />

    <div :class="overlay"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex"

import Steps from "@/components/Steps.vue"
import BottomSummaryDesktop from '@/components/Desktop/BottomSummary/BottomSummary.vue'
import MainDialogModal from "@/components/Desktop/Valuation/MainDialog.vue"
import DateTimeModal from "@/components/Desktop/Valuation/DateTime.vue"
import PlacesModal from "@/components/Desktop/Valuation/Places.vue"

import useToastMessages from "@/composables/useToastMessages"
import useDateFormatter from "@/composables/useDateFormatter"
import useArrayToStringFormatter from "@/composables/useArrayToStringFormatter"

import additionalDetailsService from '@/services/additionalDetailsService'

const props = defineProps({
    sectionHeight: String,
    topNavHeight: Number
})

const { showSuccessToast, showErrorToast } = useToastMessages()
const { format } = useDateFormatter()
const { formatArray } = useArrayToStringFormatter()

const store = useStore()
const router = useRouter()

const isLoading = ref(false)
const fullPage = ref(true)
const opacity = ref(0.7)

const valuationDate = store.getters.getValuationDate
const valuationTime = store.getters.getValuationTime
const valuationLocation = store.getters.getValuationLocation
const valuationStatus = store.getters.getValuationStatus
const personalDetails = store.getters.getPersonalDetails
const quoteRef = store.getters.getQuoteRef

const step = ref("Vehicle Details")
const level = ref(2)

const registrationNumber = ref(null)
const coverStartDate = ref(null)

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
const overlay = ref(null)

const modal = ref(false)
const calendarModal = ref(false)
const timeModal = ref(false)
const placesModal = ref(false)

const searchTerm = ref(null)
const bottomCardHeight = ref(null)
const newSectionHeight = ref(null)

const minDate = ref(new Date());

onMounted(() => {
   //
})

const resetHeight = (value) => {
    bottomCardHeight.value = value

    var viewportHeightInPixels = window.innerHeight
    var difference = viewportHeightInPixels - props.topNavHeight

    newSectionHeight.value = difference + 'px'
}

const displayOverlay = (value) => {
    if (value) {
        overlay.value = 'custom-overlay'
    }
    else {
        overlay.value = null
    }
}

const changeValuationDate = (value) => {
    valuationDate.value = value
    valuationStatus.value = true
}

const changeValuationTime = (value) => {
    valuationTime.value = value
    valuationStatus.value = true
}

const closeDateTimeModal = () => {
    calendarModal.value = false
}

const closeMainModal = () => {
    modal.value = false
}

const closePlacesModal = () => {
    placesModal.value = false
}

const showValuationModal = () => {
    modal.value = true
}

const showCalendarModal = () => {
    modal.value = false
    placesModal.value = false
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
    calendarModal.value = false
    placesModal.value = true
}

const setValuationLocation = () => {
    modal.value = true
    placesModal.value = false
    valuationLocation.value = searchTerm.value
}

const setValuationLocationFromModal = (value) => {
    placesModal.value = false
    valuationLocation.value = value
    valuationStatus.value = true
}

const submit = () => {
    verifyVehicle()
}

const verifyVehicle = () => {
    let data = {}

    data.registrationNo = registrationNumber.value
    data.quoteRef = quoteRef
    data.nationalId = personalDetails.nationalId

    isLoading.value = true

    additionalDetailsService.verifyVehicle(data)
        .then((response) =>{
            if (response.data.response_code == 200) {
                postValuation()
            }
            else {
                isLoading.value = false
                showErrorToast("Error", response)
            }
           
        })
        .catch((error) => {
            isLoading.value = false
            showErrorToast("Error", error)
        })
}

const postValuation = () => {
    let data = {}

    data.date = format(store.getters.getValuationDate)
    data.time = store.getters.getValuationTime
    data.latitude = "0.00"
    data.longitude = "0.00"
    data.quoteRef = store.getters.getQuoteRef
    data.placeName = store.getters.getValuationLocation

    additionalDetailsService.postValuation(data)
        .then((response) => {
            if (response.data.response_code == 200) {
                getQuoteSummary()
            }
            else {
                isLoading.value = false
                showErrorToast("Error", response)
            }            
        })
        .catch((error) => {
            isLoading.value = false
            showErrorToast("Error", error)
        })
}

const getQuoteSummary = () => {
    let data = {}

    data.quoteRef = store.getters.getQuoteRef
    data.coverStartDate = format(coverStartDate.value)
    data.securityDevice = selectedSecurityDevices.value.map(item => item.name).join(', ')

    additionalDetailsService.getQuoteSummary(data)
        .then((response) => {
            if (response.data.response_code == 200) {
                store.commit("setQuoteSummary", response.data.data)
                navigate("/summary")
            }
            else {
                isLoading.value = false
                showErrorToast("Error", response)
            }
        })
        .catch((error) => {
            showErrorToast("Error", error)
        })
}

const navigate = (path) => {
    router.push(path)
}

const reverifyVehicle = () => {
    if(registrationNumber.value != null) {
        let data = {}

        data.quoteRef = store.getters.getQuoteRef
        data.make = store.getters.getQuoteDetails.make
        data.model = store.getters.getQuoteDetails.model
        data.registrationNo = registrationNumber.value

        isLoading.value = true

        additionalDetailsService.reverifyVehicle(data)
            .then((response) => {
                if (response.data.response_code == 200) {
                    isLoading.value = false
                    showSuccessToast("Success", "Vehicle verified successfully")
                }
                else {
                    isLoading.value = false
                    showErrorToast("Error", response)
                }
            })
            .catch((error) => {
                isLoading.value = false
                showErrorToast("Error", error)
            })
    }
    else {
        showErrorToast("Error", "Please enter vehicle registration number.")
    }    
}

</script>
