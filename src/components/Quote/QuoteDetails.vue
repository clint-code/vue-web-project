<template>
    <template v-if="quoteDetails != null">
        <div class="flex justify-content-between mt-3 custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-6">Quote Reference</label>
            <label class="text-xs font-bold text-right w-6">{{ quoteDetails.quoteRef }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Insurance Class</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.insuranceType }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Insurance Type</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.insuranceClass }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Sum Insured</label>
            <label class="text-xs font-bold text-right w-8">KES {{ quoteDetails.transFormedSumInsured }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Make and Model</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.make }} {{ quoteDetails.model }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Registration No.</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.vehicleRegistrationNo }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Policy Underwriter</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.underwriterName }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Cover Start Date</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.coverStartDate }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Cover End Date</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.coverEndDate }}</label>
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Base Premium</label>
            <template v-if="quoteDetails.BasicPremium">
                <label class="text-xs font-bold text-right w-8">KES {{ quoteDetails.BasicPremium.toLocaleString() }}</label>
            </template>            
        </div>

        <div v-for="(charge, index) in quoteDetails.taxesAndCharges">
            <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2" :key="index">
                <label class="text-xs w-4">{{ charge.name }}</label>
                <template v-if="quoteDetails.BasicPremium">
                    <label class="text-xs font-bold text-right w-8">KES {{ charge.amount.toLocaleString() }}</label>
                </template> 
            </div>
        </div>  
    </template>
    
    <template v-if="props.quoteType == 'Lipa Full'">
        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Total Premium </label>
            <template v-if="quoteDetails.LipaFullAmount">
                <label class="text-xs font-bold text-right w-8">KES {{ quoteDetails.LipaFullAmount.toLocaleString() }}</label>
            </template> 
        </div>
    </template>

    <template v-if="props.quoteType == 'Lipa Pole Pole'">
        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Total Amount Payable </label>
            <template v-if="quoteDetails.LipaFullAmount">
                <label class="text-xs font-bold text-right w-8">KES {{ quoteDetails.LipaFullAmount.toLocaleString() }}</label>
            </template> 
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Deposit Amount Due</label>
            <template v-if="quoteDetails.LipaPolePoleDeposit">
                <label class="text-xs font-bold text-right w-8">KES {{ quoteDetails.LipaPolePoleDeposit.toLocaleString() }}</label>
            </template> 
        </div>

        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Monthly Installmenents</label>
            <template v-if="quoteDetails.LipaPolePoleInstallment">
                <label class="text-xs font-bold text-right w-8">KES {{ quoteDetails.LipaPolePoleInstallment.toLocaleString() }}</label>
            </template> 
        </div>

        <div class="flex justify-content-between py-2">
            <label class="text-xs w-4">Installment Period</label>
            <label class="text-xs font-bold text-right w-8">{{ quoteDetails.LipaPolePolePeriod }} Month(s)</label>
        </div>
    </template>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { useStore } from "vuex"

const store = useStore()
const props = defineProps({
    quoteType: String,
    quoteState: String
});

const quoteDetails = store.getters.getQuoteSummary
</script>
