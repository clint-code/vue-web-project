<template>
    <div>
        <div class="grid mt-1">
            <div class="col-6">
                <Dropdown v-model="selectedInsuranceClass" :options="insuranceClasses" optionLabel="name"
                    placeholder="Insurance Class"
                    class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1" />
            </div>

            <div class="col-6">
                <Dropdown v-model="selectedInsuranceType" :options="insuranceTypes" optionLabel="name"
                    placeholder="Insurance Type"
                    class="w-full border-round-3xl custom-dark-dropdown shadow-1 custom-small-dropdown" />
            </div>
        </div>

        <div class="grid mt-1">
            <div class="col-6">
                <Dropdown v-model="selectedCoverDuration" :options="coverDurations" optionLabel="name"
                    placeholder="Cover Duration"
                    class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown shadow-1" />
            </div>

            <div class="col-6">
                <Calendar v-model="yom" placeholder="Year of Manufacture"
                    class="w-full custom-rounded-calendar custom-small-dropdown" showIcon iconDisplay="input">
                    <template #inputicon="{ clickCallback }">
                        <i class="fas fa-calendar-days text-black-alpha-90 text-sm" @click="clickCallback"></i>
                    </template>
                </Calendar>
            </div>
        </div>

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
                <InputGroup class="custom-amount-input">
                    <InputGroupAddon class="border-round-3xl p-1">
                        <div class="bg-yellow-500 border-round-xl flex">
                            <label class="text-xs font-bold text-black-alpha-90 px-2 py-1">KES</label>
                        </div>
                    </InputGroupAddon>
                    <InputText class="border-round-3xl" placeholder="Estimate value" />
                </InputGroup>
            </div>

            <div class="col-6">
                <div class="w-full border-round-2xl bg-black-alpha-90 border-1 border-black-alpha-90 p-2"
                    @click="getQuote()">
                    <div class="flex justify-content-between align-items-center">
                        <label class="text-xs text-white font-bold">Update</label>
                        <i class="fas fa-circle-arrow-right text-white text-xs"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import GetQuoteForm from '@/components/Quote/GetQuoteForm.vue'
</script>