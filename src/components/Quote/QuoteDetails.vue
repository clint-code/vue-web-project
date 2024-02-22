<template>
    <div>
        <div class="flex justify-content-between mt-3 custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-6">Policy/Reference Number</label>
            <label class="text-xs font-bold text-right w-6">018337678437515</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Insurance Class</label>
            <label class="text-xs font-bold text-right w-8">Motor Private Comprehensive</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Insurance Type</label>
            <label class="text-xs font-bold text-right w-8">Saloon</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Sum Insured</label>
            <label class="text-xs font-bold text-right w-8">KES 1,500,000</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Make and Model</label>
            <label class="text-xs font-bold text-right w-8">Toyota Corolla</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Registration No.</label>
            <label class="text-xs font-bold text-right w-8">KBU617A</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Policy Underwriter</label>
            <label class="text-xs font-bold text-right w-8">Madison Insurance</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Cover Start Date</label>
            <label class="text-xs font-bold text-right w-8">June 16th 2024</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Cover End Date</label>
            <label class="text-xs font-bold text-right w-8">June 15th 2024</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Base Premium</label>
            <label class="text-xs font-bold text-right w-8">KES 120,000</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Valuation Services</label>
            <label class="text-xs font-bold text-right w-8">KES 580</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Training Levy</label>
            <label class="text-xs font-bold text-right w-8">KES 100</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">PHCF</label>
            <label class="text-xs font-bold text-right w-8">KES 125</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Stamp Duty</label>
            <label class="text-xs font-bold text-right w-8">KES 40</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Transaction Fee</label>
            <label class="text-xs font-bold text-right w-8">KES 582</label>
        </div>
    </div>
    <template v-if="props.quoteType == 'Lipa Full'">
        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Total Premium </label>
            <label class="text-xs font-bold text-right w-8">KES 127,427</label>
        </div>
    </template>

    <template v-if="props.quoteType == 'Lipa Pole Pole'">
        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Total Amount Payable </label>
            <label class="text-xs font-bold text-right w-8">KES 127,427</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Deposit Amount Due</label>
            <label class="text-xs font-bold text-right w-8">KES 28,360</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Monthly Installmenents</label>
            <label class="text-xs font-bold text-right w-8">KES 3,712</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Installment Period</label>
            <label class="text-xs font-bold text-right w-8">10 Months</label>
        </div>
    </template>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
    quoteType: String,
    quoteState: String
});
</script>