<template>
    <div class="custom-width-80">
        <div class="grid">
            <div class="lg:col-10 relative">
                <div class="overflow-y-auto mb-4" :style="{ 'height': props.sectionHeight }">
                    <div class="mt-6">
                        <div
                            class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-1 px-3 py-2 custom-w-5">
                            <i class="fas fa-angle-double-left text-white"></i>
                            <label class="text-sm font-bold text-white justify-content-end">Back</label>
                        </div>
                    </div>

                    <div class="mt-3 mb-4">
                        <div class="relative bg-yellow-500 border-round-2xl px-3 custom-py-10 z-2">
                            <label class="text-sm font-bold">Vehicle Details</label>
                        </div>

                        <div class="relative z-1">
                            <div
                                class="custom-light-gray-bg-1 custom-gray-border-2 border-round-bottom-3xl w-full custom-accordion-body-2 py-4 px-3">
                                <div class="grid">
                                    <div class="col-6">
                                        <div class="flex flex-column gap-2">
                                            <label class="text-sm">Vehicle Registration No.</label>
                                            <InputText class="text-sm border-round-3xl"
                                                placeholder="Enter Registration" />
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="flex flex-column gap-2">
                                            <label class="text-sm">Upload Copy ID</label>
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
                                            <label class="text-sm">Choose Policy Start Date</label>

                                            <Calendar placeholder="Choose Date" dateFormat="dd/mm/yy"
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

                                <div class="relative mb-4 mt-2" v-if="valuationStatus">
                                    <div
                                        class="w-full custom-gray-bg custom-gray-border-3 border-1 border-round-top-3xl p-3">
                                        <div class="flex justify-content-between">
                                            <label class="font-bold text-xs w-6">Location</label>
                                            <label class="font-bold text-xs text-right w-6"
                                                v-if="valuationLocation != 'Enter valuation location'">{{
                    valuationLocation }}</label>
                                        </div>

                                        <div class="flex justify-content-between mt-2">
                                            <label class="font-bold text-xs w-6">Date</label>
                                            <label class="font-bold text-xs text-right w-6"
                                                v-if="valuationDate != 'Choose a Date'">{{ valuationDate
                                                }}</label>
                                        </div>

                                        <div class="flex justify-content-between mt-2 mb-3">
                                            <label class="font-bold text-xs w-6">Time</label>
                                            <label class="font-bold text-xs text-right w-6"
                                                v-if="valuationTime.name != 'Select Time'">{{
                    valuationTime.name
                }}</label>
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

                                <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg px-3 py-2 mt-2"
                                    @click="showValuationModal()" v-if="!valuationStatus">
                                    <div class="flex justify-content-between align-items-center">
                                        <label class="font-bold text-sm text-white">Book Valuation Now</label>
                                        <i class="fas fa-circle-arrow-right text-white"></i>
                                    </div>
                                </div>

                                <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-3"
                                    @click="submit()">

                                    <div class="flex justify-content-between align-items-center">
                                        <label class="font-bold text-sm">View Summary</label>
                                        <label class="font-bold text-sm">KES 50,317</label>
                                        <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom-0 left-0 w-full absolute">
                    <BottomSummaryDesktop @showOverlay="displayOverlay" @calculatedCardHeight="resetHeight" />
                </div>
            </div>

            <div class="lg:col-2 mt-4">
                <Steps :step="step" :level="level" />
            </div>
        </div>
    </div>

    <div :class="overlay"></div>
</template>

<script setup>
import { times } from '@/util/times.js'

import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from "vuex"

import useToastMessages from "@/composables/useToastMessages"
const { showSuccessToast, showErrorToast } = useToastMessages()

const store = useStore()
const quoteRef = store.getters.getQuoteRef

import Steps from "@/components/Steps.vue"
import BottomSummaryDesktop from '@/components/Desktop/BottomSummary/BottomSummary.vue'

const props = defineProps({
    sectionHeight: String,
})

const step = ref("Vehicle Details")
const level = ref(2)

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

onMounted(() => {
    
})

const displayOverlay = (value) => {
    if (value) {
        overlay.value = 'custom-overlay'
    }
    else {
        overlay.value = null
    }
}

</script>
