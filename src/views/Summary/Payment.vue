<template>
    <TopNav back="/summary" variation="white-yellow-icons" />

    <div class="custom-mobile-view">
        <div class="px-3 pt-4 overflow-y-auto mb-4 relative">
            <div>
                <div class="flex justify-content-between">
                    <label class="font-bold text-xs">Motor Car Insurance</label>
                    <label class="font-bold text-xs">Step 4 of 4</label>
                </div>

                <ProgressBar class="custom-progress-bar mt-2" :value="100" :showValue="false"></ProgressBar>
            </div>

            <div class="mt-4">
                <div class="flex align-items-center">
                    <i class="fas fa-comment-alt-check text-yellow-500 text-xl"></i>

                    <div class="flex flex-column mx-2">
                        <label class="font-bold mb-1">Make Payment</label>
                        <div class="custom-bottom-border"></div>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <div class="relative">
                    <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
                        <div class="custom-dotted-border mt-6"></div>

                        <p class="text-sm font-semibold">
                            Please make sure you have the following ready to make a payment:
                        </p>

                        <ul class="text-sm font-semibold">
                            <li>Enough money in your M-Pesa account.</li>
                            <li>The correct MPesa PIN code..</li>
                        </ul>

                        <p class="text-sm font-semibold">
                            Kindly note, you have to wait for the M-Pesa Pop Up message to confirm your payment.
                            Should you wish to retry your transaction, please wait for a period of 3 minutes.
                        </p>
                    </div>

                    <div
                        class="w-full border-round-3xl shadow-1 custom-gray-border bg-white px-3 custom-py-10 custom-accordion-body">
                        <div class="flex justify-content-between">
                            <label class="text-sm font-bold">Total Payable Amount</label>
                            <label class="text-right text-sm font-bold">KES 120,000</label>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div class="flex flex-column mt-4">
                    <label class="font-bold text-sm">Email Address</label>
                    <InputText class="border-round-3xl mt-2" placeholder="Enter email" />
                </div>

                <div class="mt-4">
                    <label class="font-bold text-sm">Enter Your Mobile Number to Make Payment</label>
                    <InputGroup class="mt-2">
                        <InputGroupAddon class="bg-yellow-500 border-round-left-2xl">
                            <span class="text-xs font-bold">+254</span>
                        </InputGroupAddon>
                        <InputText class="border-round-right-2xl" placeholder="Enter Mobile Number" />
                    </InputGroup>
                </div>

                <div class="mt-4">
                    <div class="flex justify-content-between border-round-3xl bg-yellow-500 px-3 align-items-center custom-py-10"
                        @click="submit()">
                        <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                        <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="custom-desktop-view">
        <div class="custom-width-80">
            <div class="grid">
                <div class="lg:col-10 relative">
                    <div class="mb-4">
                        <div class="mt-6">
                            <div
                                class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-1 px-3 py-2 custom-w-5">
                                <i class="fas fa-angle-double-left text-white"></i>
                                <label class="text-sm font-bold text-white justify-content-end">Back</label>
                            </div>

                            <h3 class="mb-2">Make Payment.</h3>
                            <div class="custom-bottom-border-1 w-2"></div>

                            <div class="mt-4">
                                <div class="relative">
                                    <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
                                        <div class="custom-dotted-border mt-6"></div>

                                        <p class="text-sm font-semibold">
                                            Please make sure you have the following ready to make a payment:
                                        </p>

                                        <ul class="text-sm font-semibold">
                                            <li>Enough money in your M-Pesa account.</li>
                                            <li>The correct MPesa PIN code..</li>
                                        </ul>

                                        <p class="text-sm font-semibold">
                                            Kindly note, you have to wait for the M-Pesa Pop Up message to confirm your
                                            payment.
                                            Should you wish to retry your transaction, please wait for a period of 3
                                            minutes.
                                        </p>
                                    </div>

                                    <div
                                        class="w-full border-round-3xl shadow-1 custom-gray-border bg-white px-3 custom-py-10 custom-accordion-body">
                                        <div class="flex justify-content-between">
                                            <label class="text-sm font-bold">Total Payable Amount</label>
                                            <label class="text-right text-sm font-bold">KES 120,000</label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="grid">
                                <div class="col-6">
                                    <div class="mt-4">
                                        <label class="font-bold text-sm">Enter Your Mobile Number to Make Payment</label>
                                        <InputGroup class="mt-2">
                                            <InputGroupAddon class="bg-yellow-500 border-round-left-2xl">
                                                <span class="text-xs font-bold">+254</span>
                                            </InputGroupAddon>
                                            <InputText class="border-round-right-2xl" placeholder="Enter Mobile Number" />
                                        </InputGroup>
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="flex flex-column mt-4">
                                        <label class="font-bold text-sm">Email Address</label>
                                        <InputText class="border-round-3xl mt-2" placeholder="Enter email" />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div class="mt-3">
                                    <div class="flex justify-content-between border-round-3xl bg-yellow-500 px-3 align-items-center custom-py-10"
                                        @click="submit()">
                                        <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                                        <i class="fas fa-circle-arrow-right text-black-alpha-90 text-sm text-alpha-90"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-2 mt-4">
                    <Steps :step="step" :level="level" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Steps from "@/components/Steps.vue"

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const step = ref("Payment")
const level = ref(4)

const router = useRouter()

const submit = () => {
    router.push("/payment-summary")
}

</script>