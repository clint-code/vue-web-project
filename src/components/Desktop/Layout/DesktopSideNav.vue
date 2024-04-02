<template>
    <div class="w-4 custom-dark-gray-bg pt-4" :style="{ minHeight: props.height }">
        <div class="flex justify-content-center">
            <div class="flex flex-column">
                <div class="semi-circle flex justify-content-center align-items-center">
                    <i class="far fa-square-user text-center text-2xl font-light"></i>  
                </div>

                <div class="semi-circle-1 border-white border-2">
                    <div class="flex justify-content-center">
                        <div class="flex flex-column">
                            <label class="text-white text-xs mt-1">Upload Photo</label>
                            <i class="fas fa-camera text-white text-center mt-1"></i>
                        </div>
                    </div>      
                </div>
            </div>
        </div>

        <div class="flex justify-content-center mt-3">
            <div class="flex flex-column">
                <label class="text-white text-sm font-light text-center">Welcome</label>
                <label class="text-white text-sm font-medium text-center">Victor Gachangi</label>
            </div>           
        </div>

        <div class="mt-4">
            <div class="grid custom-gray-border-bottom-3 py-2 mx-0">
                <div class="col-3">
                    <i class="fas fa-user-shield text-white pl-2"></i>
                </div>

                <div class="col-9">
                    <label class="text-white text-sm font-medium">My Policies</label>
                </div>
            </div>     
            
            <div class="grid custom-gray-border-bottom-3 py-2 mx-0">
                <div class="col-3">
                    <i class="fas fa-address-card text-white pl-2"></i>
                </div>

                <div class="col-9">
                    <label class="text-white text-sm font-medium">My Profile</label>
                </div>
            </div>   

            <div class="grid custom-gray-border-bottom-3 py-2 mx-0" :class="{ 'bg-yellow-500' : props.page == 'Claims' }">
                <div class="col-3">
                    <i class="fas fa-square-list text-white pl-2"></i>
                </div>

                <div class="col-9">
                    <label class="text-white text-sm font-medium">My Claims</label>
                </div>
            </div>   

            <div class="grid custom-gray-border-bottom-3 py-2 mx-0">
                <div class="col-3">
                    <i class="fas fa-users-medical text-white pl-2"></i>
                </div>

                <div class="col-9">
                    <label class="text-white text-sm font-medium">Manage Next of Kin</label>
                </div>
            </div>   

            <div class="grid custom-gray-border-bottom-3 py-2 mx-0">
                <div class="col-3">
                    <i class="fas fa-unlock-keyhole text-white pl-2"></i>
                </div>

                <div class="col-9">
                    <label class="text-white text-sm font-medium">Change Password</label>
                </div>
            </div>   

            <div class="grid custom-gray-border-bottom-3 py-2 mx-0">
                <div class="col-3">
                    <i class="fas fa-right-from-bracket text-white pl-2"></i>
                </div>

                <div class="col-9">
                    <label class="text-white text-sm font-medium">Logout</label>
                </div>
            </div>   
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    page: String,
    height: String
})
</script>