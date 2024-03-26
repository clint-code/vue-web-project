<template>
    <TopNav variation="no-logo-yellow" :page="page" />

    <div class="bg-yellow-500">
        <div class="p-3 relative">
            <label class="font-medium">KCD 321A - Subaru Outback, 2500 CC</label>

            <div class="grid my-3">
                <div class="col-4">
                    <div class="flex justify-content-between align-items-center bg-white border-round-3xl gap-2 py-2 px-1"
                        @click="navigate('/my-claims')">
                        <label class="text-xs font-medium">Submit Claim</label>
                        <i class="fas fa-arrow-alt-circle-right text-sm"></i>
                    </div>
                </div>

                <div class="col-4">
                    <div class="flex justify-content-between align-items-center bg-white border-round-3xl gap-2 py-2 px-1"
                        @click="navigate('/my-policies')">
                        <label class="text-xs font-medium">Renew Cover</label>
                        <i class="fas fa-arrow-alt-circle-right text-sm"></i>
                    </div>
                </div>

                <div class="col-4">
                    <div class="flex justify-content-between align-items-center bg-white border-round-3xl gap-2 py-2 px-1"
                        @click="navigate('/my-policies')">
                        <label class="text-xs font-medium">Cancel Cover</label>
                        <i class="fas fa-arrow-alt-circle-right text-sm"></i>
                    </div>
                </div>
            </div>

            <div id="actionButton" class="absolute left-0 right-0" :style="{ bottom: customButtonBottom }">
                <div class="px-3">
                    <div class="flex justify-content-between align-items-center border-round-3xl custom-dark-gray-bg px-3 custom-py-10"
                        @click="navigate('/my-policies')">
                        <label class="font-medium text-white">Lipa Pole Pole Payment Plan</label>
                        <i class="fas fa-plus-circle text-xl text-white"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="absolute left-0 right-0 bottom-0">
        <div class="custom-light-blue-bg py-4 px-3">
            <div class="flex justify-content-between align-items-center custom-gray-border-bottom-2 mt-4 pb-2">
                <label class="text-xs font-medium">
                    February 14th 2023 — 10,750
                </label>

                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 p-1"
                        @click="navigate('/my-policies')">
                        <label class="text-xs font-bold">Paid</label>
                        <i class="far fa-check-circle"></i>
                    </div>
                </div>
            </div>

            <div class="flex justify-content-between align-items-center custom-gray-border-bottom-2 mt-4 pb-2">
                <label class="text-xs font-medium">
                    February 14th 2023 — 10,750
                </label>

                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-black-alpha-90 border-round-3xl gap-2 p-1"
                        @click="navigate('/my-policies')">
                        <label class="text-xs font-bold text-white">Pay Now</label>
                        <i class="fas fa-arrow-alt-circle-right text-yellow-500"></i>
                    </div>
                </div>
            </div>

            <div class="flex justify-content-between align-items-center custom-gray-border-bottom-2 mt-4 pb-2">
                <label class="text-xs font-medium">
                    February 14th 2023 — 10,750
                </label>

                <div class="flex justify-content-end">
                    <div class="flex align-items-center custom-bg-light border-round-3xl custom-dark-gray-border border-1 gap-2 p-1"
                        @click="navigate('/my-policies')">
                        <label class="text-xs font-bold">Pending</label>
                        <i class="fas fa-exclamation-circle text-800"></i>
                    </div>
                </div>
            </div>

            <div class="flex justify-content-between align-items-center bg-yellow-500 border-round-3xl mt-3 custom-py-10 px-3"
                @click="submit()">
                <label class="font-bold">Pay Balance — KES 125,670</label>
                <i class="fas fa-arrow-alt-circle-right text-xl"></i>
            </div>
        </div>
    </div>

    <div class="px-3 mt-6">
        <div class="flex justify-content-between align-items-center border-round-3xl custom-dark-gray-bg px-3 custom-py-10"
            @click="navigate('/my-policies')">
            <label class="font-medium text-white">Your Transaction Details</label>
            <i class="fas fa-plus-circle text-xl text-white"></i>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopNav from '@/components/TopNav.vue'

const page = "Policy Details"
const customButtonBottom = ref(null)

onMounted(() => {
    adjustButtonBottom()
})

const adjustButtonBottom = () => {
    var button = document.getElementById("actionButton")
    var buttonHeight = button.offsetHeight
    var halvedButtonHeight = buttonHeight / 2

    customButtonBottom.value = '-' + halvedButtonHeight + 'px'
}
</script>