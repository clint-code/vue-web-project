<template>
    <TopNav back="/get-quote" variation="white-yellow-icons" />

    <div class="custom-mobile-view">
        <div class="px-3 pt-4" :style="{ 'margin-bottom': marginBottom }">
            <div class="flex justify-content-between">
                <label class="font-bold text-sm">Motor Car Insurance</label>
                <label class="font-bold text-sm">Step 1 of 4</label>
            </div>

            <ProgressBar class="custom-progress-bar mt-2" :value="25" :showValue="false"></ProgressBar>

            <div class="relative bg-yellow-500 border-round-2xl px-3 py-2 mt-3 z-2">
                <label class="text-sm font-bold">Your Personal Details</label>
            </div>

            <div class="relative z-1">
                <div class="custom-light-gray-bg-1 border-round-bottom-3xl custom-accordion-body py-4 px-3">
                    <div class="grid">
                        <div class="col-6">
                            <div class="flex flex-column gap-2">
                                <label class="text-sm">Enter Name</label>
                                <InputText class="text-sm border-round-3xl" placeholder="Enter your ID name" />
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="flex flex-column gap-2">
                                <label class="text-sm">Date of Birth</label>

                                <Calendar v-model="yom" placeholder="Choose Date"
                                    class="w-full custom-rounded-calendar custom-small-dropdown" showIcon
                                    iconDisplay="input">
                                    <template #inputicon="{ clickCallback }">
                                        <i class="fas fa-calendar-days text-black-alpha-90 text-sm"
                                            @click="clickCallback"></i>
                                    </template>
                                </Calendar>
                            </div>
                        </div>
                    </div>

                    <div class="grid mt-1">
                        <div class="col-6">
                            <div class="flex flex-column gap-2">
                                <label class="text-sm font-medium">Choose I.D. Type</label>
                                <Dropdown v-model="selectedIdenficationDocument" :options="identificationDocuments"
                                    optionLabel="name" placeholder="Select Document"
                                    class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown" />
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="flex flex-column gap-2">
                                <label class="text-sm">Enter ID Number</label>
                                <InputText class="text-sm border-round-3xl" placeholder="Enter ID number" />
                            </div>
                        </div>
                    </div>

                    <div class="grid mt-1">
                        <div class="col-6">
                            <div class="flex flex-column gap-2">
                                <label class="text-sm">Upload Copy ID</label>
                                <div class="custom-file-input-container bg-white border-round-3xl">
                                    <input type="file" id="fileInput" class="custom-file-input"
                                        @change="uploadFile($event)">
                                    <label class="text-sm custom-input-color">{{ uploadTxt }}</label>
                                    <i class="fas fa-upload text-sm custom-gray"></i>
                                </div>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="flex flex-column gap-2">
                                <label class="text-sm">KRA PIN</label>
                                <InputText class="text-sm border-round-3xl" placeholder="PIN number" />
                            </div>
                        </div>
                    </div>

                    <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-2"
                        @click="submit()">
                        <div class="flex justify-content-between align-items-center">
                            <label class="font-bold text-sm">Save and Continue</label>
                            <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :class="overlay"></div>
    </div>

    <div class="custom-desktop-view custom-width-80">
        <DesktopPersonalDetails />
    </div>
</template>

<script setup>
import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Steps from '@/components/Steps.vue'
import DesktopPersonalDetails from '@/components/Desktop/PersonalDetails/PersonalDetails.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const step = ref("Personal Details")
const level = ref(1)

const items = ref([
    {
        label: 'Personal Info'
    },
    {
        label: 'Reservation'
    },
    {
        label: 'Review'
    }
]);

const selectedIdenficationDocument = ref(null)
const identificationDocuments = ref([
    {
        "name": "National ID"
    },
    {
        "name": "Passport"
    }
])
const uploadTxt = ref('Upload')
const marginBottom = ref(null)
const overlay = ref(null)

onMounted(() => {
    // var bottomCard = document.getElementById('bottomCard')
    // var bottomCardHeight = bottomCard.offsetHeight
    // marginBottom.value = bottomCardHeight + 'px'
})

const displayOverlay = (value) => {
    if (value) {
        overlay.value = 'custom-overlay'
    }
    else {
        overlay.value = null
    }
}

const uploadFile = (e) => {
    // uploadTxt.value = e.target.files[0].name
    uploadTxt.value = "Uploaded"
}

const submit = () => {
    console.log("submit ")
    router.push('/vehicle-details')
}
</script>