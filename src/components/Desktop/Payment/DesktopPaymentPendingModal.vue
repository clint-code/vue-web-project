<template>
    <div class="flex">
        <div class="w-6 p-4">
            <div class="flex justify-content-center relative">
                <i class="fas fa-spinner fa-spin inline-block text-yellow-500 text-6xl text-center"></i>
            </div>

            <div class="flex justify-content-center mt-4">
                <div class="flex flex-column">
                    <label class="font-bold text-center text-lg">Processing Payment</label>

                    <label class="font-medium text-center text-sm custom-spacing mt-4">
                        You will receive an M-Pesa prompt on your phone that will ask you to confirm your payment.
                        If the prompt does not appear, please try again or use our Paybill Number.
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
                            <label class="block text-left text-sm font-bold text-yellow-500">
                                PENDING
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
        </div>

        <div class="w-6 custom-bg-image-cc p-4">
            <div class="flex justify-content-center gap-3">
                <i class="fas fa-mobile-android-alt text-white text-5xl"></i>
                <i class="fas fa-exchange text-white text-5xl"></i>
                <i class="fas fa-mobile-android-alt text-white text-5xl"></i>
            </div>

            <div class="flex justify-content-center">
                <div class="flex flex-column mt-6">
                    <label class="text-white text-center font-bold px-4">
                        You can make payment using our Paybill.
                    </label>

                    <label class="text-white text-center font-bold px-4 mt-4">
                        Lipa na Mpesa
                    </label>

                    <label class="text-white text-center font-bold px-4 mt-2">
                        Pay Bill No. 7873633
                    </label>

                    <label class="text-white text-center font-bold px-4 mt-2">
                        Account No. KCT415S
                    </label>

                    <label class="text-white text-center font-bold px-4 mt-2">
                        Amount KES 12,000
                    </label>
                </div>                
            </div>

            <div class="flex justify-content-center mt-4">
                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-white border-round-3xl gap-2 px-3 py-2" @click="showMyPolices()">
                        <label class="text-sm font-bold">Confirm Payment</label>
                        <i class="fas fa-arrow-circle-right text-2xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true);
const fullPage = ref(false);
const opacity = ref(0);

</script>