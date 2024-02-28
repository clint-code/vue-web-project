<template>
    <div class="mb-6">
        <div class="flex justify-content-end">
            <i class="fas fa-circle-xmark text-2xl" @click="closeModal"></i>
        </div>

        <div class="w-9 mx-auto border-round-3xl shadow-2 px-4 mt-2">
            <div class="flex flex-column align-items-center">
                <div class="flex justify-content-between custom-dark-gray-bg custom-border-radius px-4 h-3rem align-items-center gap-3 my-4"
                    @click="showValuationDateTimeModal()">
                    <i class="fas fa-circle-chevron-left text-xl text-white"></i>
                    <label class="font-bold text-white">Update date and time</label>
                </div>

                <h3 class="text-center w-10">
                    Please enter your valuation location
                </h3>

                <div class="custom-bottom-border-1 w-8"></div>               

                <div class="mt-4 w-full">
                    <div
                        class="flex custom-border-radius custom-dark-gray-border border-1 px-4 h-3rem align-items-center gap-3">
                        <i class="fas fa-map-marker-alt text-2xl text-yellow-500"></i>
                        <InputText class="border-none w-full font-bold custom-border-radius" v-model="searchTerm"
                            @input="debouncedSearch" placeholder="Please enter address" />
                    </div>

                    <Listbox class="mt-4 h-6rem overflow-auto custom-listbox px-3" listStyle="custom-list"
                        v-model="searchTerm" :options="valuationLocations" optionLabel="name" optionValue="name" />

                    <div class="flex justify-content-between bg-yellow-500 custom-border-radius px-4 h-3rem align-items-center gap-3 my-4"
                        @click="setValuationLocation()">
                        <label class="font-bold">Schedule Valuation</label>
                        <i class="fas fa-map-marker-alt text-black-alpha-90 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import debounce from 'lodash/debounce'
import { ref, onMounted, defineEmits } from 'vue'

const emits = defineEmits()

const searchTerm = ref(null)
const valuationLocations = ref([])

const debouncedSearch = debounce(async (term) => {
    valuationLocations.value = [];

    const results = await performSearch(term);
    valuationLocations.value = results;
}, 1000)

const performSearch = async () => {
    //validation.getPlaces(searchTerm.value)

    return new Promise((resolve) => {
        const results = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ]
        resolve(results)
    })
}

const showValuationDateTimeModal = () => {
    emits('showValuationDateTimeModal')
}

const setValuationLocation = () => {
    emits('setValuationLocation', searchTerm.value)
}

const closeModal = () => {
    emits('closePlacesModal')
}
</script>