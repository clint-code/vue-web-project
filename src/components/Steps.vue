<template>
    <div class="flex justify-content-center">
        <div class="flex flex-column">
            <div class="flex flex-column">
                <div class="flex justify-content-center">
                    <div class="custom-icon-bg" :class="{ 'bg-yellow-500' : step == 'Personal Details', 'custom-dark-gray-bg' : step !=  'Personal Details'}">
                        <i class="far fa-user-friends text-sm" :class="{ 'text-white' : step !=  'Personal Details'}"></i>
                    </div>
                </div>

                <label class="text-sm font-bold text-center py-2" :class="{ 'text-yellow-500' : step == 'Personal Details' }">Personal Details</label>
            </div>

            <div class="mx-auto" :class="{ 'custom-dark-yellow-border-left' : level == 0, 'custom-dark-gray-border-left' : level != 0 }"></div>

            <div class="flex flex-column py-2">
                <div class="flex justify-content-center">
                    <div class="custom-icon-bg" :class="{ 'bg-yellow-500' : step == 'Vehicle Details', 'custom-dark-gray-bg' : step !=  'Vehicle Details'}">
                        <i class="far fa-car text-sm" :class="{ 'text-white' : step !=  'Vehicle Details'}"></i>
                    </div>
                </div>

                <label class="text-sm font-bold text-center py-2" :class="{ 'text-yellow-500' : step == 'Vehicle Details' }">Vehicle Details</label>
            </div>

            <div class="mx-auto" :class="{ 'custom-dark-yellow-border-left' : level > 1, 'custom-dark-gray-border-left' : level <= 1 }"></div>

            <div class="flex flex-column py-2">
                <div class="flex justify-content-center">
                    <div class="custom-icon-bg" :class="{ 'bg-yellow-500' : step == 'Summary', 'custom-dark-gray-bg' : step !=  'Summary'}">
                        <i class="far fa-list-check text-sm" :class="{ 'text-white' : step !=  'Summary'}"></i>
                    </div>
                </div>
                <label class="text-sm font-bold text-center py-2" :class="{ 'text-yellow-500' : step == 'Summary' }">Summary</label>
            </div>

            <div class="mx-auto" :class="{ 'custom-dark-yellow-border-left' : level > 2, 'custom-dark-gray-border-left' : level <= 2 }"></div>

            <div class="flex flex-column py-2">
                <div class="flex justify-content-center">
                    <div class="custom-icon-bg" :class="{ 'bg-yellow-500' : step == 'Payment', 'custom-dark-gray-bg' : step !=  'Payment'}">
                        <i class="far fa-money-bill-wave text-sm" :class="{ 'text-white' : step !=  'Payment'}"></i>
                    </div>
                </div>
                <label class="text-sm font-bold text-center py-2" :class="{ 'text-yellow-500' : step == 'Payment' }">Payment</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
const props = defineProps({
    step: String,
    level: Number
});

const emits = defineEmits()
</script>