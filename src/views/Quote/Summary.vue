<template>
    <TopNav back="/get-quote" variation="white-yellow-icons" />

    <div>
        <div class="px-3 pt-4 overflow-y-auto mb-4 relative">
            <div>
                <div class="flex justify-content-between">
                    <label class="font-bold text-xs">Motor Car Insurance</label>
                    <label class="font-bold text-xs">Step 3 of 4</label>
                </div>

                <ProgressBar class="custom-progress-bar mt-2" :value="75" :showValue="false"></ProgressBar>
            </div>

            <div class="my-4">
                <div>
                    <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion"
                        v-if="!lipaFullDetails">
                        <div class="flex justify-content-between">
                            <label class="font-bold text-sm text-white w-6">Lipa in Full</label>
                            <label class="font-bold text-sm text-white text-right w-6">KES 125,432</label>
                        </div>

                        <div class="flex justify-content-between gap-4">
                            <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3"
                                @click="toggleLipaFullDetails()">
                                <label class="font-bold text-sm p-2">View</label>
                            </div>

                            <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3"
                                @click="submit()">
                                <label class="font-bold text-sm p-2">Pay Now</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative" v-if="lipaFullDetails">
                    <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
                        <div class="mt-8">
                            <QuoteDetails quoteType="Lipa Full" />
                        </div>                       

                        <div class="mt-3">
                            <div class="flex justify-content-between border-round-2xl bg-yellow-500 px-3 py-2 align-items-center">
                                <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                                <label class="font-bold text-sm text-alpha-90">KES 125,360</label>
                                <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
                            </div>
                        </div>
                    </div>

                    <div
                        class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion-body z-0">
                        <div class="flex justify-content-between">
                            <label class="font-bold text-sm text-white w-6">Lipa in Full</label>
                            <label class="font-bold text-sm text-white text-right w-6">KES 125,432</label>
                        </div>

                        <div class="flex justify-content-between gap-4" @click="toggleLipaFullDetails()">
                            <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3">
                                <label class="font-bold text-sm p-2">Close</label>
                            </div>

                            <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3">
                                <label class="font-bold text-sm p-2">Pay Now</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="my-4">
                <div>
                    <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion"
                        v-if="!lipaPolePoleDetails">
                        <div class="flex justify-content-between">
                            <label class="font-bold text-sm text-white w-6">Lipa Pole Pole</label>
                            <label class="font-bold text-sm text-white text-right w-6">KES 25,432</label>
                        </div>

                        <div class="flex justify-content-between gap-4">
                            <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3"
                                @click="toggleLipaPolePoleDetails()">
                                <label class="font-bold text-sm p-2">View</label>
                            </div>

                            <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3">
                                <label class="font-bold text-sm p-2">Pay Now</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative" v-if="lipaPolePoleDetails">
                    <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
                        <div class="mt-8">
                            <QuoteDetails quoteType="Lipa Pole Pole" />
                        </div>     

                        <div class="mt-4">
                            <label class="font-bold">Customise your lipa pole pole plan</label>

                            <div class="flex flex-column mt-4">
                                <label class="font-bold text-sm">Deposit Amount</label>
                                <InputText class="border-round-3xl text-sm mt-2" placeholder="Enter amount above 25,000" />
                            </div>

                            <div class="flex flex-column mt-4">
                                <label class="font-bold text-sm">Installment Period (Upto 10 Months)</label>
                                <Dropdown v-model="selectedInstallmentPeriod" :options="installmentsArray" placeholder="Choose"
                                    class="border-round-3xl custom-dark-dropdown custom-md-dropdown mt-2"
                                    optionLabel="name" />
                            </div>
                        </div>

                        <div class="mt-4">
                            <div class="flex justify-content-between border-round-2xl custom custom-dark-gray-bg px-3 py-2 align-items-center">
                                <label class="font-bold text-sm text-white">Continue</label>
                                <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-white"></i>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="flex justify-content-between border-round-2xl bg-yellow-500 px-3 py-2 align-items-center">
                                <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                                <label class="font-bold text-sm text-alpha-90">KES 28,360</label>
                                <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
                            </div>
                        </div>
                    </div>

                    <div class="w-full border-round-2xl custom-dark-gray-border border-1 custom-dark-gray-bg p-3 custom-accordion-body z-0">
                        <div class="flex justify-content-between">
                            <label class="font-bold text-sm text-white w-6">Lipa Pole Pole</label>
                            <label class="font-bold text-sm text-white text-right w-6">KES 25,432</label>
                        </div>

                        <div class="flex justify-content-between gap-4">
                            <div class="flex justify-content-center w-6 bg-white border-round-3xl mt-3" @click="toggleLipaPolePoleDetails()">
                                <label class="font-bold text-sm p-2">Close</label>
                            </div>

                            <div class="flex justify-content-center w-6 bg-yellow-500 border-round-3xl mt-3">
                                <label class="font-bold text-sm p-2">Pay Now</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import QuoteDetails from '@/components/Quote/QuoteDetails.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { installments } from '@/util/installments.js'

const router = useRouter()

const lipaFullDetails = ref(false)
const lipaPolePoleDetails = ref(false)

const installmentsArray = ref(null)
const selectedInstallmentPeriod = ref(null)

onMounted(() => {
    installmentsArray.value = installments
})

const toggleLipaFullDetails = () => {
    if (lipaFullDetails.value) {
        lipaFullDetails.value = false
    }
    else {
        lipaPolePoleDetails.value = false
        lipaFullDetails.value = true
    }
}

const toggleLipaPolePoleDetails = () => {
    if (lipaPolePoleDetails.value) {
        lipaPolePoleDetails.value = false
    }
    else {
        lipaPolePoleDetails.value = true
        lipaFullDetails.value = false
    }
}

const submit = () => {
    router.push("/payment")
}
</script>