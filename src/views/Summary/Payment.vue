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
                            <template v-if="paymentAmount != null">
                                <label class="text-right text-sm font-bold">KES {{ paymentAmount.toLocaleString()
                                    }}</label>
                            </template>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div class="flex flex-column mt-4">
                    <label class="font-bold text-sm">Email Address</label>
                    <InputText class="border-round-3xl mt-2" placeholder="Enter email" v-model="email" />
                </div>

                <div class="mt-4">
                    <label class="font-bold text-sm">Enter Your Mobile Number to Make Payment</label>
                    <InputGroup class="mt-2">
                        <InputGroupAddon class="bg-yellow-500 border-round-left-3xl">
                            <span class="text-xs font-bold">+254</span>
                        </InputGroupAddon>
                        <InputText class="border-round-right-3xl" placeholder="Enter Mobile Number"
                            v-model="phoneNumber" />
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
                        <div class="mt-3">
                            <div @click="navigate('/summary')"
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
                                            <template v-if="paymentAmount != null">
                                                <label class="text-right text-sm font-bold">KES {{
                    paymentAmount.toLocaleString() }}</label>
                                            </template>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="grid">
                                <div class="col-6">
                                    <div class="flex flex-column mt-4">
                                        <label class="font-bold text-sm">Enter Your Mobile Number to Make
                                            Payment</label>
                                        <InputGroup class="mt-2">
                                            <InputGroupAddon class="bg-yellow-500 border-round-left-3xl">
                                                <span class="text-sm font-bold text-black-alpha-90">+254</span>
                                            </InputGroupAddon>
                                            <InputText class="border-round-right-3xl" placeholder="Enter Mobile Number"
                                                v-model="phoneNumber" />
                                        </InputGroup>
                                    </div>
                                </div>

                                <div class="col-6">
                                    <div class="flex flex-column mt-4">
                                        <label class="font-bold text-sm">Email Address</label>
                                        <InputText class="border-round-3xl mt-2" placeholder="Enter email"
                                            v-model="email" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="mt-3">
                                    <div class="flex justify-content-between border-round-3xl bg-yellow-500 px-3 align-items-center custom-py-10"
                                        @click="submit()">
                                        <label class="font-bold text-sm text-alpha-90">Pay Now</label>
                                        <i class="fas fa-circle-arrow-right text-black-alpha-90 text-alpha-90"></i>
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

    <Dialog v-model:visible="paymentModal" modal :closable="false" :showHeader="false" :showFooter="false"
        class="custom-dialog-2">
        <div class="custom-desktop-view">
            <template v-if="paymentStatus == 'IN-PROGRESS'">
                <DesktopPaymentPendingModal />
            </template>

            <template v-else-if="paymentStatus == 'SUCCESS'">
                <DesktopPaymentSuccessModal />
            </template>

            <template v-else-if="paymentStatus == 'FAILED'">
                <DesktopPaymentErrorModal :errorMessage="errorMessage" @closeErrorModal=closeErrorModal />
            </template>
        </div>
    </Dialog>

    <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity" />
    <Toast />
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useStore } from "vuex";
import { useRouter } from 'vue-router'

import paymentService from "@/services/paymentService.js";

import usePhoneNumberFormatter from "@/composables/usePhoneNumberFormatter";
import useToastMessages from "@/composables/useToastMessages";

import TopNav from '@/components/TopNav.vue'
import Steps from "@/components/Steps.vue"
import DesktopPaymentPendingModal from '@/components/Desktop/Payment/DesktopPaymentPendingModal.vue'
import DesktopPaymentSuccessModal from '@/components/Desktop/Payment/DesktopPaymentSuccessModal.vue'
import DesktopPaymentErrorModal from '@/components/Desktop/Payment/DesktopPaymentErrorModal.vue'


const { format } = usePhoneNumberFormatter();
const { showSuccessToast, showErrorToast } = useToastMessages();

const step = ref("Payment")
const level = ref(4)

const phoneNumber = ref(null)
const email = ref(null)

const router = useRouter()
const store = useStore();

const isLoading = ref(false);
const fullPage = ref(true);
const opacity = ref(0.7);

// const paymentAmount = store.getters.getPaymentPlan.amount
const paymentAmount = ref("1")
const paymentStatus = ref(null)
const paymentModal = ref(false)

const interval = ref(null)
const count = ref(0)

const errorMessage = ref(null)

onMounted(() => {
    //
});

const submit = () => {
    let data = {}

    data.quoteRef = store.getters.getQuoteRef
    data.certEmail = email.value
    data.amount = store.getters.getPaymentPlan.amount
    data.paymentPhone = format(phoneNumber.value)
    data.paymentType = store.getters.getPaymentPlan.paymentType
    data.nationalId = store.getters.getPersonalDetails.nationalId
    data.paymentMethod = "MPESA"
    data.transactionType = "NB"

    isLoading.value = true

    paymentService.postPayment(data)
        .then((response) => {
            isLoading.value = false
            paymentStatus.value = 'IN-PROGRESS'
            paymentModal.value = true

            clearInterval(interval.value)
            count.value = 0

            if (response.data.response_code == 200) {
                interval.value = setInterval(
                    () => checkPaymentStatus(),
                    5000
                )
            }
            else {
                showErrorToast("Error", response)
            }
        })
        .catch((error) => {
            isLoading.value = false
            showErrorToast("Error", error)
        })
}

const checkPaymentStatus = () => {
    let data = {}

    count.value += 1;

    data.quoteRef = store.getters.getQuoteRef

    paymentService.checkPaymentStatus(data)
        .then((response) => {
            if (response.data.response_code == 200) {
                clearInterval(interval.value)

                paymentStatus.value = "SUCCESS"
            }
            else {

            }
        })
        .catch((error) => {
            let errorBody = error.response.data

            if (errorBody.data.status) {
                if (errorBody.data.status == 'IN-PROGRESS') {
                    if (count.value > 20) {
                        clearInterval(interval.value)

                        errorMessage.value = "Max retries. Payment status not updated."
                        paymentStatus.value = "FAILED"

                        //navigate('/payment-summary')
                    }
                }
                else if (errorBody.data.status == 'FAILED') {
                    clearInterval(interval.value)

                    errorMessage.value = response.data.errorMessage
                    paymentStatus.value = "FAILED"
                }
            }
            else {
                errorMessage.value = errorBody.message
                paymentStatus.value = "FAILED"
            }
        })
}

const closeErrorModal = () => {
    paymentStatus.value = null
    paymentModal.value = false

    clearInterval(interval.value)
    count.value = 0
}

const navigate = (path) => {
    router.push(path)
}

</script>