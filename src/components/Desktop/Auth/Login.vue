<template>
    
    <div class="mt-3">
        <div class="flex flex-column gap-2">
            <label class="text-sm font-medium">Email</label>
            <InputText v-model="email" class="text-sm border-round-3xl" placeholder="Enter Email" />
        </div>
    </div>

    <div class="mt-3">

        <div class="flex flex-column gap-2">
            <label class="text-sm font-medium">Password</label>
            <InputText v-model="email" class="text-sm border-round-3xl" type="password" placeholder="Enter Password" />
        </div>

    </div>

    <div class="flex justify-content-between align-items-center mt-4">
        
        <div class="flex align-items-center">
            <Checkbox v-model="terms" :binary="true" variant="filled" />
            <label class="text-xs font-medium ml-1">
                Remember me
            </label>
        </div>

        <div>
            <label class="text-xs font-medium underline">
                Forgot password?
            </label>
        </div>

    </div>    

    <div class="mt-3">

        <div
            class="flex justify-content-between align-items-center bg-yellow-500 border-round-3xl shadow-1 gap-2 px-3 custom-py-10">
            <label class="font-bold text-black-alpha-90">Login</label>
            <i class="fas fa-circle-arrow-right text-black-alpha-90 text-lg"></i>
        </div>

    </div>

    <div class="mt-3">

        <p class="font-medium text-sm text-black-alpha-90 mb-2">
            Don’t have an account?
        </p>

        <div
            class="flex justify-content-between align-items-center custom-gray-bg-2 border-round-3xl shadow-1 gap-2 px-3 custom-py-10">
            <label class="font-bold text-white">Register</label>
            <i class="fas fa-circle-arrow-right text-white text-lg"></i>
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
</script>