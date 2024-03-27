<template>
    <div class="relative">
        <div class="custom-city-bg" :style="{ height: sectionHeight }" id="section">
            <div class="custom-width-80">
                <div class="flex flex-column">
                    <div class="flex flex-column">
                        <h2 class="font-bold mt-4 mb-2">Instant Insurance, <span class="bg-yellow-500 px-1">anywhere,
                                anytime!</span></h2>

                        <label>Get your insurance now and pay in installments with our <span class="font-bold">Lipa
                                Pole Pole</span> financing option.</label>
                    </div>

                    <div class="grid mt-4" v-if="formattedProducts != null">
                        <div v-ripple class="p-ripple col-2" v-for="(product, index) in formattedProducts">
                            <div class="border-round-2xl py-3"
                                :class="{ 'bg-yellow-500': product.active, 'bg-white': !product.active }">
                                <div>
                                    <div class="flex justify-content-center">
                                        <img :src="product.icon" width="40rem" height="auto"
                                            :class="{ 'custom-img-filter': product.active }">
                                    </div>

                                    <div class="flex justify-content-center mt-2">
                                        <label class="text-xs font-semibold text-center">{{ product.name }}</label>
                                    </div>

                                    <div class="flex justify-content-center mt-3">
                                        <div class="flex justify-content-between  border-round-2xl gap-2 px-2 py-1"
                                            @click="toggleDetails(index, product.category_type, product.id)"
                                            :class="{ 'bg-yellow-500': !product.active, 'bg-white': product.active }">
                                            <label class="font-bold text-xs">Get Quote</label>
                                            <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                        </div>
                                    </div>

                                    <!-- <div id="caret" class="custom-caret-info custom-caret-bottom" v-if="motorCarActive">
                                        <i class="fas fa-caret-down custom-light-gray text-yellow-500 custom-caret-size"></i>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="motorCarActive && selectedProductId != null">
                        <GetQuote :productId="selectedProductId" @getQuote="getQuote" />
                    </template>
                </div>
            </div>
        </div>

        <template v-if="!showQuotes">
            <div class="flex justify-content-center p-2" :class="{ 'mt-3' : !motorCarActive, 'mt-7' : motorCarActive }">
                <div class="flex flex-column m-3">
                    <h3 class="font-bold my-2">Get covered in 3 simple steps</h3>
                    <div class="custom-dark-yellow-border-bottom"></div>
                </div>
            </div>

            <div class="mt-4">
                <div class="grid">
                    <div class="col-4 px-4">
                        <div class="flex justify-content-center">
                            <div class="flex flex-column">
                                <i class="fas fa-car text-yellow-500 text-5xl text-center"></i>

                                <h4 class="text-center  my-2">Get a Quote</h4>

                                <div class="custom-dark-gray-border-bottom"></div>

                                <label class="text-center mt-2 px-6">
                                    Book your car valuation online for the same day and get your actual
                                    insurance
                                    quote.
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 px-4">
                        <div class="flex justify-content-center">
                            <div class="flex flex-column">
                                <i class="fas fa-user-shield text-yellow-500 text-5xl text-center"></i>

                                <h4 class="text-center my-2">Tell Us About Yourself</h4>

                                <div class="custom-dark-gray-border-bottom"></div>

                                <label class="text-center mt-2 px-6">
                                    Choose the motor cover you wish to apply for and fill in the required
                                    information.
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 px-4">
                        <div class="flex justify-content-center">
                            <div class="flex flex-column">
                                <i class="fas fa-wallet text-yellow-500 text-5xl text-center"></i>

                                <h4 class="text-center my-2">Get Cover</h4>

                                <div class="custom-dark-gray-border-bottom"></div>

                                <label class="text-center mt-2 px-6">
                                    Get your insurance sticker online and you’re good to go!
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <div class="custom-gray-city-bg-1">
                    <div class="custom-width-80">
                        <div class="flex justify-content-between align-items-center">
                            <i class="fas fa-headset text-8xl text-white mt-6"></i>
                            <h2 class="text-white mt-4">Sign in to view your policies, claims and more</h2>

                            <div
                                class="flex justify-content-between align-items-center bg-yellow-500 custom-border-round-5 gap-3 px-4 py-1">
                                <h2 class="font-bold">Sign In</h2>
                                <i class="fas fa-user-circle text-black-alpha-90 text-3xl"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="mt-6">
                <div class="custom-width-80">
                    <div class="flex gap-4">
                        <div class="w-6 shadow-2 border-round-3xl">
                            <div class="flex custom-img-container">
                                <div class="w-6">
                                    <img src="@/assets/img/person.png" class="custom-full-height-img pt-4" />
                                </div>

                                <div>
                                    <h2>
                                        Reach out to us for any queries
                                    </h2>

                                    <label class="font-medium">
                                        We aim to keep you smiling with our personalised customer support.
                                    </label>

                                    <div
                                        class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-2 px-3 py-2 mt-4 w-8">
                                        <label class="font-bold text-white">Talk to us</label>

                                        <div class="custom-icon-bg bg-yellow-500">
                                            <i class="fas fa-phone text-white"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-6 shadow-2 border-round-3xl bg-yellow-500 z-2">
                            <div class="flex custom-img-container">
                                <div class="w-6">
                                    <img src="@/assets/img/hand.png"
                                        class="custom-full-height-img border-round-bottom-3xl pt-4" />
                                </div>

                                <div>
                                    <h2>
                                        Lipa Pole Pole
                                    </h2>

                                    <label class="font-medium mt-4">
                                        This is an Insurance premium financing option, that allows you to
                                        pay flexible monthly installments of upto 10 months.
                                    </label>

                                    <div
                                        class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-2 p-3 py-2 mt-5 w-9">
                                        <label class="font-bold text-white">Learn More</label>

                                        <i class="fas fa-arrow-alt-circle-right text-white text-3xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <template v-if="quotes.length">
                <Quotes :insuranceClass="quoteDetails.productCategory" :quotes="quotes" :quoteRef="quoteRef" />
            </template>            
        </template>

        <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity"/>
        <Toast />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

import useToastMessages from "@/composables/useToastMessages"
import useDateFormatter from "@/composables/useDateFormatter"

import quoteService from '@/services/quoteService.js'

import GetQuote from '@/components/Desktop/Landing/GetQuote.vue'
import Quotes from '@/components/Desktop/Landing/Quotes.vue'

const router = useRouter()
const emits = defineEmits()
const props = defineProps({
    products: Array,
    sectionHeight: String
})

const { showSuccessToast, showErrorToast } = useToastMessages()
const { format } = useDateFormatter()

const quoteDetails = ref(null)
const quotes = ref([])
const quoteRef = ref(null)

const isLoading = ref(false)
const fullPage = ref(true)
const opacity = ref(0.7)

const formattedProducts = ref(null)
const motorCarActive = ref(false)

const showQuotes = ref(false)

const selectedProductId = ref(null)

onMounted(() => {
    formatProducts()
})

const formatProducts = () => {
    formattedProducts.value = props.products.map(product => (
        { 
            ...product, 
            active: false 
        }))
}

const toggleDetails = (index, value, id) => {
    formattedProducts.value[index].active = true
    selectedProductId.value = id

    if (index >= 0 && index < formattedProducts.value.length) {
        formattedProducts.value.forEach((product, i) => {
            if (i != index) {
                product.active = false
            }
        })
    }

    if (value == "CAR") {
        if (motorCarActive.value) {
            motorCarActive.value = false
        }
        else {
            motorCarActive.value = true
        }
        // else {
        //     motorCarActive.value = true

        //     var caret = document.getElementById('caret')
        //     var caretHeight = caret.offsetHeight

        //     buttonBottom.value = '-' + (caretHeight / 2) + 'px'

        // }
    }
    else {
        motorCarActive.value = false
    }
}

const getQuote = (value) => {
    isLoading.value = true
    quoteDetails.value = value
    quotes.value = []

    quoteService.getQuote(value)
        .then((response) => {
            isLoading.value = false

            if(response.data.response_code == 200) {
                quoteRef.value = response.data.data.quoteRef  
                console.log(response.data.data);
                quotes.value = response.data.data.quotes.map(quote => (
                    {
                        ...quote, 
                        active: false, 
                        buttonText: 'View Benefits' 
                    }
                ))              
                showQuotes.value = true
            }
            else {
                showErrorToast("Error", response.data.message)
            }            
        })
        .catch((error) => {
            showErrorToast("Error", error)
            isLoading.value = false
        })
}
</script>