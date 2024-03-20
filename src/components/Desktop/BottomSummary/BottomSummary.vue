<template>
    <template v-if="quoteDetails != null">
        <div class="relative bg-white border-round-top-3xl z-5" ref="bottomSummary">
            <template v-if="editDetails">
                <div class="relative">
                    <div class="grid">
                        <div class="col-6 p-4">
                            <label class="text-sm font-bold">
                                Kindly ensure that your Vehicle Registration Number matches the Make and Model.
                            </label>

                            <div class="grid mt-1">
                                <div class="col-6">
                                    <Dropdown v-model="selectedMake" :options="makes" filter :loading="makesLoader"
                                        optionLabel="vehicle_name" placeholder="Make E.g BMW"
                                        filterPlaceholder="Search make" @filter="searchVehicleMakes"
                                        @change="changeVehicleMake"
                                        class="w-full border-round-3xl custom-dark-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown" />
                                </div>

                                <div class="col-6">
                                    <Dropdown v-model="selectedModel" :options="models" filter :loading="modelsLoader"
                                        optionLabel="vehicle_model" placeholder="Model E.g X3"
                                        filterPlaceholder="Search model" @filter="searchVehicleModels"
                                        @change="changeVehicleModel"
                                        class="w-full border-round-3xl custom-dark-dropdown custom-dark-gray-border custom-border-1-5 custom-small-dropdown" />
                                </div>
                            </div>
                        </div>
                        <div class="col-6 px-4 py-3 custom-right-drop-shadow">
                            <div class="flex justify-content-end">
                                <i class="fas fa-circle-xmark text-2xl custom-gray" @click="editQuoteDetails"></i>
                            </div>

                            <img :src="selectedQuote.UnderwriterIcon" width="100px" />
                            <hr class="custom-gray" />

                            <div class="flex justify-content-between">
                                <div class="flex flex-column">
                                    <label class="font-bold text-xs">Lipa in full</label>
                                </div>

                                <template v-if="selectedQuote.LipaFullAmount != null">
                                    <label class="font-bold text-right w-5 text-sm">KES {{
        selectedQuote.LipaFullAmount.toLocaleString() }}</label>
                                </template>
                            </div>
                            <hr class="custom-gray" />

                            <div class="flex justify-content-between">
                                <label class="font-bold text-xs text-left w-6">Lipa Pole Pole Deposit</label>

                                <template v-if="selectedQuote.LipaPolePoleDeposit != null">
                                    <label class="font-bold text-right w-6 text-sm">KES {{
        selectedQuote.LipaPolePoleDeposit.toLocaleString() }}</label>
                                </template>
                            </div>

                            <div class="flex justify-content-between mt-1">
                                <label class="font-light text-xs text-left w-6">Monthly Installment</label>

                                <template v-if="selectedQuote.LipaPolePoleInstallment != null">
                                    <label class="font-bold text-xs text-right w-6">KES {{
        selectedQuote.LipaPolePoleInstallment.toLocaleString() }}</label>
                                </template>
                            </div>

                        </div>
                    </div>
                </div>
            </template>

            <div class="custom-light-gray-bg-1 custom-dark-gray-border border-1 border-round-top-3xl p-3">
                <div class="flex justify-content-between mb-3">
                    <div class="flex align-items-center">
                        <label class="text-sm font-bold px-1">
                            Showing quotes for:
                        </label>

                        <label class="text-sm px-1">
                            {{ quoteDetails.make }} - {{ quoteDetails.yearOfManufacture }}
                        </label>

                        <div class="custom-yellow-border-left my-auto"></div>

                        <label class="text-sm px-1">
                            <span class="font-bold">
                                Estimated Value :
                            </span>
                            KES {{ quoteDetails.estimatedValue }}
                        </label>

                        <div class="custom-yellow-border-left my-auto"></div>

                        <label class="text-sm px-1">
                            <span class="font-bold">
                                Cover Duration :
                            </span>
                            {{ quoteDetails.coverDuration }} Month(s)
                        </label>
                    </div>

                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2"
                        @click="editQuoteDetails()" v-if="!editDetails">
                        <label class="text-sm font-bold">Edit</label>
                        <i class="fas fa-arrow-circle-right"></i>
                    </div>

                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2"
                        @click="editQuoteDetails()" v-if="editDetails">
                        <label class="text-sm font-bold">Update</label>
                        <i class="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
            </div>
        </div>

        <loading v-model:active="isLoading" :is-full-page="false" color="#FFC402" loader="dots" :opacity="opacity" />
        <Toast />
    </template>

</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

import { useStore } from "vuex"

import debounce from 'lodash/debounce'

import quoteService from '@/services/quoteService.js'

const store = useStore()
const quoteDetails = store.getters.getQuoteDetails
const selectedQuote = store.getters.getSelectedQuote

const emits = defineEmits()

const isLoading = ref(false)

const selectedMake = ref(null)
const makes = ref([])
const makeId = ref(null)
const makeName = ref(null)

const selectedModel = ref(null)
const models = ref([])
const modelId = ref(null)
const modelName = ref(null)

const buttonBottom = ref(null)
const editDetails = ref(false)

const bottomSummary = ref(null)
const bottomCardHeight = ref(0)


onMounted(() => {
    if (bottomSummary.value) {
        bottomCardHeight.value = bottomSummary.value.clientHeight
        emits('calculatedCardHeight', bottomCardHeight.value)
    }

    buttonBottom.value = '-17px'
})

const editQuoteDetails = () => {
    if (editDetails.value) {
        editDetails.value = false
        emits('showOverlay', false)
    }
    else {
        editDetails.value = true
        emits('showOverlay', true)
    }
}

const closeModal = () => {
    emits('closeBottomSummary', bottomCardHeight.value)
}

const changeVehicleMake = (value) => {
    if (value.value.id) {
        makeId.value = value.value.id
        makeName.value = value.value.vehicle_name
    }
    else {
        makeId.value = null
        makeName.value = null
    }
}

const searchVehicleMakes = debounce(async (searchTerm) => {
    if (searchTerm.value != "") {
        await getMakes(searchTerm.value)
    }
}, 1000)

const getMakes = async (searchTerm) => {
    let data = {}
    data.searchTerm = searchTerm
    data.productId = 1

    isLoading.value = true

    const vehicleMakes = []

    quoteService.getMakes(data)
        .then((response) => {
            isLoading.value = false

            if (response.data.response_code == 200) {
                makes.value = response.data.data
            }
            else {
                isLoading.value = false
                showErrorToast("Error", response.data)
            }
        })
        .catch((error) => {
            showErrorToast("Error", error.response.data)
            isLoading.value = false
        })

    return vehicleMakes
}

const changeVehicleModel = (value) => {
    if (value.value.id) {
        modelId.value = value.value.id
        modelName.value = value.value.vehicle_model
    }
    else {
        modelId.value = null
        modelName.value = null
    }
}

const searchVehicleModels = debounce(async (searchTerm) => {
    if (makeId.value == null) {
        showErrorToast("Error", "Vehicle make not selected.")
    }
    else {
        if (searchTerm.value != "") {
            await getModels(searchTerm.value)
        }
    }
}, 1000)

const getModels = async (searchTerm) => {
    let data = {}
    data.searchTerm = searchTerm
    data.makeId = makeId.value

    isLoading.value = true

    const vehicleModels = []

    quoteService.getModels(data)
        .then((response) => {
            isLoading.value = false

            if (response.data.response_code == 200) {
                models.value = response.data.data
            }
            else {
                isLoading.value = false
                showErrorToast("Error", response.data)
            }
        })
        .catch((error) => {
            showErrorToast("Error", error.response.data)
            isLoading.value = false
        })

    return vehicleModels
}
</script>
