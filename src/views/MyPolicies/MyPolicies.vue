<template>
    <TopNav variation="no-logo-white" :page="page"/>

    <div class="p-3">
        
        <div class="flex justify-content-between custom-bottom-border-3 pb-1">
            <label class="font-bold text-sm">Motor Car</label>
            <i class="fas fa-car-bus custom-gray"></i>
        </div>

        <div class="grid mt-2">
            <div class="col-4">
                <div class="flex flex-column justify-content-center bg-yellow-500 border-round-2xl p-2">
                    <i class="fas fa-car text-4xl text-center mt-2"></i>

                    <label class="font-medium text-xs text-center mt-2">Mercedes E250</label>
                    <label class="font-medium text-xs text-center">KBC 987H</label>

                    <div class="flex justify-content-center my-2">
                        <div class="flex bg-white border-round-2xl px-3 py-1" @click="navigate('/policy-details')">
                            <label class="text-xs font-bold">Active</label>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        <div class="flex justify-content-between custom-bottom-border-3 pb-1 mt-4">
            <label class="font-bold text-sm">Motorcycle</label>
            <i class="fas fa-motorcycle custom-gray"></i>
        </div>

        <div class="grid mt-2">
            <div class="col-4">
                <div class="flex flex-column justify-content-center bg-yellow-500 border-round-2xl p-2">
                    <i class="fas fa-motorcycle text-4xl text-center mt-2"></i>

                    <label class="font-medium text-xs text-center mt-2">Baja Pulser 180</label>
                    <label class="font-medium text-xs text-center">KMFD 987H</label>

                    <div class="flex justify-content-center my-2">
                        <div class="flex bg-white border-round-2xl px-3 py-1" @click="navigate('/policy-details')">
                            <label class="text-xs font-bold">Active</label>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopNav from '@/components/TopNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const page = "My Policies"

const navigate = (value) => {
    router.push(value)
}

</script>