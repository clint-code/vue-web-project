<template>
    <div class="mb-6">
        <div class="flex justify-content-end">
            <i class="fas fa-circle-xmark text-2xl" @click="closeModal"></i>
        </div>
        
        <div class="w-9 mx-auto border-round-3xl shadow-2 px-4 mt-2">
            <div class="flex flex-column align-items-center">
                <h3 class="text-center w-10">
                    Where do you want you Valuation done?
                </h3>
                <div class="custom-bottom-border-1 w-8"></div>

                <label class="text-center text-sm mt-4">
                    Book your valuation now. One of our valuers will come to your location.
                    Choose your convenient time from 8AM - 5PM any day from Monday to Friday.
                </label>

                <img class="mt-4" src="@/assets/img/valuation-car.png" width="132px" />

                <div class="my-4 w-full">
                    <div class="flex w-full custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3"
                        @click="showValuationDateTimeModal()">
                        <i class="fas fa-calendar-days text-2xl text-yellow-500"></i>
                        <label class="font-bold">{{ valuationDate }}</label>
                    </div>

                    <div class="flex custom-shadow-1 custom-border-radius px-4 h-4rem align-items-center gap-3 mt-4"
                        @click="showPlacesModal()">
                        <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
                        <label class="font-bold">{{ valuationLocation }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { useStore } from "vuex"

const emits = defineEmits()

const store = useStore()

const valuationDate = store.getters.getValuationDate
const valuationTime = store.getters.getValuationTime
const valuationLocation = store.getters.getValuationLocation
const valuationStatus = store.getters.getValuationStatus

const showValuationDateTimeModal = () => {
    emits('showValuationDateTimeModal')
}

const showPlacesModal = () => {
    emits('showGooglePlacesModal')
}

const closeModal = () => {
    emits('closeMainModal')
}
</script>