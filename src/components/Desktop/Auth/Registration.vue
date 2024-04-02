<template>
    <div class="mt-2">
        <div class="flex flex-wrap gap-3 mt-2">
            <div class="flex align-items-center" v-for="accountType in accountTypes">
                <RadioButton v-model="selectedAccountType" :value="accountType" />
                <label class="ml-2 font-medium text-sm">{{ accountType }}</label>
            </div>
        </div>
    </div>

    <div class="mt-4">
        <div class="flex flex-column gap-2">
            <label class="text-sm font-medium">Enter Name (As appears on your ID)</label>
            <InputText v-model="customerName" class="text-sm border-round-3xl" placeholder="Enter your ID name" />
        </div>
    </div>

    <div class="mt-3">
        <div class="flex flex-column gap-2">
            <label class="text-sm font-medium">Phone Number</label>
            <InputGroup>
                <InputGroupAddon class="bg-yellow-500 border-round-left-2xl">
                    <span class="text-xs font-bold">+254</span>
                </InputGroupAddon>
                <InputText type="number" v-model="phoneNumber" class="border-round-right-3xl text-sm"
                    placeholder="Enter Phone Number" />
            </InputGroup>
        </div>
    </div>

    <div class="mt-3">
        <div class="flex flex-column gap-2">
            <label class="text-sm font-medium">Email</label>
            <InputText v-model="email" class="text-sm border-round-3xl" placeholder="Enter Email" />
        </div>
    </div>

    <div class="flex align-items-center mt-3">
        <Checkbox v-model="terms" :binary="true" variant="filled" />
        <label class="text-xs font-medium ml-1">
            By continuing, you agree to our Terms & Conditions
        </label>
    </div>

    <div class="mt-3">
        <div
            class="flex justify-content-between align-items-center bg-yellow-500 border-round-3xl shadow-1 gap-2 px-3 custom-py-10">
            <label class="font-bold text-black-alpha-90">Register</label>
            <i class="fas fa-circle-arrow-right text-black-alpha-90 text-lg"></i>
        </div>
    </div>

    <div class="mt-3">
        <p class="font-medium text-sm text-black-alpha-90 mb-2">
            Already have an account?
        </p>
        <div @click="showLogin()"
            class="flex justify-content-between align-items-center custom-gray-bg-2 border-round-3xl shadow-1 gap-2 px-3 custom-py-10">
            <label class="font-bold text-white">Login</label>
            <i class="fas fa-circle-arrow-right text-white text-lg"></i>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['showLogin'])

const showLogin = () => {
    emit('showLogin', true)
}
</script>