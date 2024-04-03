<template>
    <div class="flex">
        <div class="w-6 p-4">
            <div class="flex justify-content-center relative">
                <i class="far fa-exclamation-circle text-red-500 text-6xl text-center"></i>
            </div>

            <div class="flex justify-content-center mt-4">
                <div class="flex flex-column">
                    <label class="font-bold text-center text-lg">Unsuccessful</label>

                    <label class="font-medium text-center text-sm custom-spacing mt-4">
                       {{ props.errorMessage }}
                    </label>
                </div>
            </div>

            <div class="justify-content-center mt-4">
                <div class="px-2">
                    <div class="grid">
                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                Transaction ID
                            </label>
                        </div>

                        <div class="col-2">
                            <label class="block text-left">
                                :
                            </label>
                        </div>

                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                81647627
                            </label>
                        </div>
                    </div>

                    <div class="grid">
                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                Amount
                            </label>
                        </div>

                        <div class="col-2">
                            <label class="block text-left">
                                :
                            </label>
                        </div>

                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                KSh. 12,000
                            </label>
                        </div>
                    </div>

                    <div class="grid">
                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                Status
                            </label>
                        </div>

                        <div class="col-2">
                            <label class="block text-left">
                                :
                            </label>
                        </div>

                        <div class="col-5">
                            <label class="block text-left text-sm font-bold text-red-500">
                                UNSUCCESSFUL
                            </label>
                        </div>
                    </div>

                    <div class="grid">
                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                Date
                            </label>
                        </div>

                        <div class="col-2">
                            <label class="block text-left">
                                :
                            </label>
                        </div>

                        <div class="col-5">
                            <label class="block text-left text-sm font-medium">
                                14 Sep 2021
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-content-center mt-4">
                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 custom-py-10 gap-8" @click="closeErrorModal()">
                        <label class="text-sm font-bold">Done</label>
                        <i class="fas fa-arrow-circle-right text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-6 custom-bg-image-cc-2 p-4">
            <div class="flex justify-content-center gap-3">
                <i class="fas fa-user-headset text-white text-5xl"></i>
            </div>

            <div class="flex justify-content-center">
                <div class="flex flex-column my-6">
                    <label class="text-white text-center font-bold px-4">
                        How can we brighten your day today? Ask Me anything, or share your feedback.
                    </label>

                    <label class="text-white text-center px-4 mt-4">
                        Talk to Me, I reply in under 15 minutes
                    </label>
                </div>                
            </div>

            <div class="flex justify-content-center mt-8">
                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-white border-round-3xl gap-2 px-3 py-2" @click="showMyPolices()">
                        <i class="fas fa-phone-volume text-2xl"></i>
                        <div class="flex flex-column">
                            <label class="text-sm font-bold">0709 184 444</label>
                            <label class="text-xs">Call for any assistance</label>
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, defineEmits } from 'vue'

const isLoading = ref(true);
const fullPage = ref(false);
const opacity = ref(0);

const props = defineProps({
    errorMessage: String
})

const emits = defineEmits([
    "closeErrorModal"
])

const closeErrorModal = () => {
    emits("closeErrorModal")
}

</script>