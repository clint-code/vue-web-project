<template>
    <div class="relative bg-white border-round-top-3xl z-5" ref="bottomSummary">
        <div class="relative" v-if="editDetails">
            <div class="grid">
                <div class="col-6 p-4">
                    <label class="text-sm font-bold">
                        Kindly ensure that your Vehicle Registration Number matches the Make and Model.
                    </label>

                    <div class="grid mt-1">
                        <div class="col-6">
                            <Dropdown v-model="selectedMake" :options="makes" optionLabel="name" placeholder="Make E.g BMW"
                                class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1" />
                        </div>

                        <div class="col-6">
                            <Dropdown v-model="selectedModel" :options="models" optionLabel="name" placeholder="Model E.g X5"
                                class="w-full border-round-3xl custom-dark-dropdown shadow-1 custom-small-dropdown" />
                        </div>
                    </div>
                </div>
                <div class="col-6 px-4 py-3 custom-right-drop-shadow">
                    <div class="flex justify-content-end">
                        <i class="fas fa-circle-xmark text-2xl custom-gray" @click="editQuoteDetails"></i>
                    </div>

                    <img src="@/assets/img/madison.png" width="100px" />
                    <hr class="custom-gray" />

                    <div class="flex justify-content-between">
                        <div class="flex flex-column">
                            <label class="font-bold text-xs">Lipa in full</label>
                            <label class="font-light text-xs mt-1">Inc. of Tax & Levies</label>
                        </div>

                        <label class="font-bold text-sm">KES 50,000</label>
                    </div>
                    <hr class="custom-gray" />

                    <div class="flex justify-content-between">
                        <div class="flex flex-column">
                            <label class="font-bold text-xs">Lipa Pole Pole Deposit</label>
                            <label class="font-light text-xs mt-1">Lipa Pole Pole Monthly Installment</label>
                        </div>

                        <label class="font-bold text-sm">KES 50,000</label>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="custom-light-gray-bg-1 custom-dark-gray-border border-1 border-round-top-3xl p-3">
            <div class="flex justify-content-between mb-3">
                <div class="flex align-items-center">
                    <label class="text-sm font-bold px-1">
                        Showing quotes for:
                    </label>

                    <label class="text-sm px-1">
                        Honda Fit - 2011
                    </label>

                    <div class="custom-yellow-border-left my-auto"></div>

                    <label class="text-sm px-1">
                        <span class="font-bold">
                            Estimated Value :
                        </span>
                        KES 1,000,000
                    </label>

                    <div class="custom-yellow-border-left my-auto"></div>

                    <label class="text-sm px-1">
                        <span class="font-bold">
                            Cover Duration :
                        </span>
                        12 Months
                    </label>
                </div>

                <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2" @click="editQuoteDetails()" v-if="!editDetails">
                    <label class="text-sm font-bold">Edit</label>
                    <i class="fas fa-arrow-circle-right"></i>
                </div>

                <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2" @click="editQuoteDetails()" v-if="editDetails">
                    <label class="text-sm font-bold">Update</label>
                    <i class="fas fa-arrow-circle-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

import GetQuoteForm from '@/components/Quote/GetQuoteForm.vue'

const emits = defineEmits()

const selectedInsuranceClass = ref(null)
const insuranceClasses = ref([
    {
        "name": "Private"
    },
    {
        "name": "Commercial"
    },
    {
        "name": "PSV"
    }
])

const selectedInsuranceType = ref(null)
const insuranceTypes = ref([
    {
        "name": "Comprehensive"
    },
    {
        "name": "Third Party"
    }
])

const selectedCoverDuration = ref(null)
const coverDurations = ref([
    {
        "name": "12 Months"
    },
    {
        "name": "1 Month"
    }
])

const yom = ref(null)
const estimateValue = ref(null)

const selectedMake = ref(null)
const makes = ref([
    {
        "name": "VW"
    },
    {
        "name": "BMW"
    }
])

const selectedModel = ref(null)
const models = ref([
    {
        "name": "X3"
    },
    {
        "name": "X5"
    }
])

const buttonBottom = ref(null)
const editDetails = ref(false)

const bottomSummary = ref(null)
const bottomCardHeight = ref(0)

onMounted(() => {
    if (bottomSummary.value) {
        bottomCardHeight.value = bottomSummary.value.clientHeight
        emits('calculatedCardHeight', bottomCardHeight.value)
    }

    buttonBottom.value = '-17px'
})

const editQuoteDetails = () => {
    if (editDetails.value) {
        editDetails.value = false
        emits('showOverlay', false)
    }
    else {
        editDetails.value = true
        emits('showOverlay', true)
    }
}

const closeModal = () => {
    emits('closeBottomSummary', bottomCardHeight.value)
}
</script>