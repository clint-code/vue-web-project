<template>
    <Sidebar v-model:visible="sidebar" no-header position="right" class="custom-gray-blue-bg w-6">
        <template #container="{ closeCallback }">
            <div class="py-3 px-5">
                <div class="flex justify-content-between align-items-center">
                    <h3>Registration</h3>

                    <div
                        class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-2xl gap-2 px-2 py-1">
                        <label class="font-bold text-xs text-white">Close</label>
                        <i class="fas fa-circle-xmark text-white text-sm"></i>
                    </div>
                </div>

                <div class="mt-4">
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
                        <InputText v-model="customerName" class="text-sm border-round-3xl"
                            placeholder="Enter your ID name" />
                    </div>
                </div>

                <div class="mt-4">
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

                <div class="mt-4">
                    <div class="flex flex-column gap-2">
                        <label class="text-sm font-medium">Email</label>
                        <InputText v-model="email" class="text-sm border-round-3xl" placeholder="Enter Email" />
                    </div>
                </div>

                <div class="flex align-items-center mt-4">
                    <Checkbox v-model="terms" :binary="true" variant="filled" />
                    <label class="text-xs font-medium ml-1">
                        By continuing, you agree to our Terms & Conditions
                    </label>
                </div>

                <div class="mt-4">
                    <div
                        class="flex justify-content-between align-items-center bg-yellow-500 border-round-3xl shadow-1 gap-2 px-3 custom-py-10">
                        <label class="font-bold text-black-alpha-90">Register</label>
                        <i class="fas fa-circle-arrow-right text-black-alpha-90 text-lg"></i>
                    </div>
                </div>
               
            </div>
        </template>
    </Sidebar>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const props = defineProps({
    sidebar: Boolean,
});

const sidebar = props.sidebar

const accountTypes = ref(['Individual', 'Business'])
const selectedAccountType = ref(null)

const customerName = ref(null)
const phoneNumber = ref(null)
const email = ref(null)

const terms = ref(false)

onMounted(() => {
    //
})
</script>