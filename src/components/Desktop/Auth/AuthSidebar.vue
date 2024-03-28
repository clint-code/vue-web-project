<template>
    <Sidebar v-model:visible="sidebar" no-header position="right" class="custom-gray-blue-bg w-6">
        <template #container="{ closeCallback }">
            <div class="py-2 px-5">
                <template v-if="isRegistration">
                    <div class="flex justify-content-between align-items-center">
                        <h3>Registration</h3>

                        <div @click="closeSidebar()"
                            class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-2xl gap-2 px-2 py-1">
                            <label class="font-bold text-xs text-white">Close</label>
                            <i class="fas fa-circle-xmark text-white text-sm"></i>
                        </div>
                    </div>

                    <Registration @showLogin="showLogin"/>
                </template>       
                
                <template v-if="isLogin">
                    <div class="flex justify-content-between align-items-center">
                        <h3>Login</h3>

                        <div @click="closeSidebar()"
                            class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-2xl gap-2 px-2 py-1">
                            <label class="font-bold text-xs text-white">Close</label>
                            <i class="fas fa-circle-xmark text-white text-sm"></i>
                        </div>
                    </div>

                    <Login />
                </template>
            </div>
        </template>
    </Sidebar>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

import Registration from './Registration.vue'
import Login from './Login.vue'

const props = defineProps({
    sidebar: Boolean,
});

const emits = defineEmits([
    "closeSidebar"
])

const sidebar = props.sidebar

const accountTypes = ref(['Individual', 'Business'])
const selectedAccountType = ref(null)

const customerName = ref(null)
const phoneNumber = ref(null)
const email = ref(null)

const terms = ref(false)

const isRegistration = ref(true)
const isLogin = ref(false)

onMounted(() => {
    //
})

const closeSidebar = () => {
    emits("closeSidebar", false)
}

const showLogin = (value) => {
    isLogin.value = value
    isRegistration.value = !value
}
</script>