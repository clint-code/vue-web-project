<template>
    <div class="relative bg-white border-round-top-2xl z-5">
        <div class="relative p-3 mb-4" v-if="editDetails">
            <div>
                <div class="flex justify-content-end">
                    <i class="fas fa-circle-xmark text-2xl custom-gray" @click="editQuoteDetails"></i>
                </div>

                <div class="flex justify-content-between align-items-center py-2">
                    <img src="@/assets/img/madison.png" height="20px" width="auto" />                    
                </div>

                <hr class="custom-gray" />

                <div class="flex justify-content-between">
                    <div class="flex flex-column">
                        <label class="font-bold text-sm">Lipa in full</label>
                        <label class="font-light text-sm mt-1">Inc. of Tax & Levies</label>
                    </div>

                    <label class="font-bold">KES 50,000</label>
                </div>
                <hr class="custom-gray" />

                <div class="flex justify-content-between">
                    <div class="flex flex-column">
                        <label class="font-bold text-sm">Lipa Pole Pole Deposit</label>
                        <label class="font-light text-sm mt-1">Lipa Pole Pole Monthly Installment</label>
                    </div>

                    <label class="font-bold">KES 50,000</label>
                </div>
            </div>
        </div>

        <div class="bg-yellow-500 p-3 relative" v-if="editDetails">
            <label class="text-sm font-bold">Fill in the details below:</label>
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

            <div class="grid mt-1">
                <div class="col-6">
                    <div class="flex justify-content-between align-items-center bg-black-alpha-90 border-round-3xl gap-2 px-3 py-2" @click="editQuoteDetails()" v-if="editDetails">
                        <label class="text-sm font-bold text-white">Update</label>
                        <i class="fas fa-arrow-circle-right text-white"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="custom-dark-gray-bg px-4 py-3">
            <div class="flex justify-content-between align-items-center">
                <label class="font-bold text-yellow-500">Showing quotes for: </label>

                <div class="border-round-2xl bg-yellow-500 border-yellow-500 text-black-alpha-90 font-bold text-xs px-3 py-1"
                    @click="editQuoteDetails()" v-if="!editDetails">
                    Edit
                </div>
            </div>

            <div class="flex justify-content-between mt-2">
                <label class="font-bold text-white text-sm">Audi Q5</label>

                <label class="font-bold text-white text-center text-sm">2015</label>
            </div>

            <div class="flex justify-content-between mt-2">
                <label class="font-bold text-white text-sm">Estimate Car Value</label>

                <label class="font-bold text-white text-center text-sm">KES 2,200,000</label>
            </div>

            <div class="flex justify-content-between mt-2">
                <label class="font-bold text-white text-sm">Cover Period</label>

                <label class="font-bold text-white text-center text-sm">12 Months</label>
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

const showQuoteText = ref('View Benefits')
const buttonBottom = ref(null)
const editDetails = ref(false)

onMounted(() => {

    // var button = document.getElementById('benefitsButton')
    // var butHeight = button.offsetHeight
    // var halvedButton = butHeight / 2

    // buttonBottom.value = '-' + halvedButton + 'px'

    // console.log(buttonBottom.value)

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
</script>