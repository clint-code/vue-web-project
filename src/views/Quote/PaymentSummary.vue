<template>
    <TopNav back="/summary" variation="white-yellow-icons" />

    <div class="px-3 overflow-y-auto mb-4 relative">
        <div class="mt-4">
            <div class="flex flex-column">
                <label class="font-bold mb-1">Payment Successful</label>
                <div class="custom-bottom-border"></div>
            </div>
        </div>

        <div>
            <p class="text-xs">
                Thank you Victor Gachangi, your payment has been received
                and we thank you for choosing InsureMe as your partner
                and welcome you to the family.
            </p>

            <p class="text-xs">
                Your Certificate Of Insurance is being processed.
                You’ll receive a notification on your email address and SMS once it’s ready.
            </p>
        </div>

        <div class="mt-4">
            <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion" v-if="!transactionDetails" @click="toggleTransactionDetails()">
                <div class="flex justify-content-between">
                    <label class="font-bold text-sm ">Your Transaction Details</label>
                    <i class="fas fa-circle-chevron-down"></i>
                </div>
            </div>

            <div class="relative" v-if="transactionDetails">
                <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
                    <QuoteDetails />
                </div>

                <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion-body z-0" @click="toggleTransactionDetails()">
                    <div class="flex justify-content-between">
                        <label class="font-bold text-sm ">Your Transaction Details</label>
                        <i class="fas fa-circle-chevron-up"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion" v-if="!paymentPlan" @click="togglePaymentPlan()">
                <div class="flex justify-content-between">
                    <label class="font-bold text-sm ">Your Monthly Payment Plan</label>
                    <i class="fas fa-circle-chevron-down"></i>
                </div>
            </div>

            <div class="relative" v-if="paymentPlan">
                <div class="w-full custom-light-gray-bg-1 border-round-bottom-3xl p-3 z-1">
                    <div class="mt-3">
                        <PaymentPlan quoteState="New Policy" />
                    </div>                    
                </div>

                <div class="w-full border-round-3xl bg-yellow-500 px-3 custom-py-10 custom-accordion-body z-0"  @click="togglePaymentPlan()">
                    <div class="flex justify-content-between">
                        <label class="font-bold text-sm ">Your Monthly Payment Plan</label>
                        <i class="fas fa-circle-chevron-up"></i>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <p class="font-bold">
                If you have any questions or comments we will be happy to hear from you.
            </p>

            <p class="text-sm">
                Our lines are always open, call us on <span class="font-bold">+254 709 184 000</span>
            </p>
        </div>

        <div class="mt-8">
            <Footer />
        </div>
       
    </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import QuoteDetails from '@/components/Quote/QuoteDetails.vue'
import PaymentPlan from '@/components/Quote/PaymentPlan.vue'

import { ref, onMounted } from 'vue'

const transactionDetails = ref(true)
const paymentPlan = ref(false)

onMounted(() => {
    
})

const toggleTransactionDetails = () => {
    if(transactionDetails.value) {
        transactionDetails.value = false
    }
    else {
        transactionDetails.value = true
        paymentPlan.value = false
    }
}

const togglePaymentPlan = () => {
    if(paymentPlan.value) {
        paymentPlan.value = false
    }
    else {
        paymentPlan.value = true
        transactionDetails.value = false
    }
}
</script>