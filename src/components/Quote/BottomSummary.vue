<template>
    <div class="relative bg-white z-5">
        <div class="relative p-3 mb-4">
            <div class="flex justify-content-center mb-3">
                <div class="bg-yellow-500 custom-gray-border custom-overlap border-round-2xl" id="benefitsButton"
                    :style="{ top: buttonBottom }" @click="showQuote()">
                    <div class="flex justify-content-between p-2">
                        <label class="text-sm font-bold">
                            Close
                        </label>

                        <i class="far fa-times-circle" @click="goBack()"></i>
                    </div>
                </div>
            </div>

            <div class="flex justify-content-between align-items-center">
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

        <div class="bg-yellow-500 px-4 py-3 relative">
            <div class="flex justify-content-center mb-3">
                <div class="custom-light-gray-bg custom-gray-border custom-overlap border-round-2xl" id="benefitsButton"
                    :style="{ top: buttonBottom }" @click="showQuote()">
                    <div class="flex justify-content-center py-2">
                        <span class="text-sm font-bold">
                            {{ showQuoteText }}
                        </span>
                    </div>
                </div>
            </div>

            <label class="text-sm font-bold">Fill in the details below:</label>
            <GetQuoteForm />

        </div>

        <div class="custom-dark-gray-bg px-4 py-3">
            <div class="flex justify-content-between align-items-center">
                <label class="font-bold text-yellow-500">Showing quotes for: </label>

                <div class="border-round-2xl bg-yellow-500 border-yellow-500 text-black-alpha-90 font-bold text-xs px-3 py-1"
                    size="small">
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
import { ref, onMounted } from 'vue'

import GetQuoteForm from '@/components/Quote/GetQuoteForm.vue'

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

onMounted(() => {
    var button = document.getElementById('benefitsButton')
    var butHeight = button.offsetHeight
    var halvedButton = butHeight / 2

    buttonBottom.value = '-' + halvedButton + 'px'
})
</script>