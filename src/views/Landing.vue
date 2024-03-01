<template>
    <div>
        <TopNav variation="fullLogo" :page="page" @calculatedHeight="adjustHeight" />

        <div class="custom-parent-container">
            <div class="custom-desktop-view relative">
                <div class="custom-city-bg" :style="{ height: sectionHeight }" id="section">
                    <div class="custom-width-80">
                        <div class="flex flex-column">
                            <div class="flex flex-column">
                                <h1 class="font-bold">Instant Insurance, <span class="bg-yellow-500 px-1">anywhere,
                                        anytime!</span></h1>

                                <label>Get your insurance now and pay in installments with our <span class="font-bold">Lipa
                                        Pole Pole</span> financing option.</label>
                            </div>

                            <div class="grid mt-4">
                                <div class="col-2">
                                    <div class="border-round-2xl py-4"
                                        :class="{ 'bg-yellow-500': motorCarActive, 'bg-white': !motorCarActive }">
                                        <div>
                                            <div class="flex justify-content-center">
                                                <template v-if="motorCarActive">
                                                    <img src="../assets/img/motor-alt.png" width="auto" height="36px">
                                                </template>

                                                <template v-else>
                                                    <img src="../assets/img/motor.png" width="auto" height="36px">
                                                </template>
                                            </div>

                                            <div class="flex justify-content-center mt-2">
                                                <label class="text-xs font-semibold text-center">Motor Car</label>
                                            </div>

                                            <div class="flex justify-content-center mt-3">
                                                <div class="flex justify-content-between align-items-center border-round-2xl gap-2 px-2 py-1"
                                                    @click="toggleDetails('motor')"
                                                    :class="{ 'bg-yellow-500': !motorCarActive, 'bg-white': motorCarActive }">
                                                    <label class="font-bold text-xs">Get Quote</label>
                                                    <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                                </div>
                                            </div>

                                            <!-- <div id="caret" class="custom-caret-info custom-caret-bottom"
                                                v-if="motorCarActive">
                                                <i
                                                    class="fas fa-caret-down custom-light-gray text-yellow-500 custom-caret-size"></i>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="col-2">
                                    <div class="border-round-2xl py-4"
                                        :class="{ 'bg-yellow-500': motorCycleActive, 'bg-white': !motorCycleActive }">
                                        <div>
                                            <div class="flex justify-content-center">
                                                <template v-if="motorCycleActive">
                                                    <img src="../assets/img/bike.png" width="auto" height="36px">
                                                </template>

                                                <template v-else>
                                                    <img src="../assets/img/bike.png" width="auto" height="36px">
                                                </template>
                                            </div>

                                            <div class="flex justify-content-center mt-2">
                                                <label class="text-xs font-semibold text-center">Motor Cycle</label>
                                            </div>

                                            <div class="flex justify-content-center mt-3">
                                                <div class="flex justify-content-between align-items-center bg-yellow-500 border-round-2xl gap-2 px-2 py-1"
                                                    @click="toggleDetails('motor')"
                                                    :class="{ 'bg-yellow-500': !motorCycleActive, 'bg-white': motorCycleActive }">
                                                    <label class="font-bold text-xs">Get Quote</label>
                                                    <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                                </div>
                                            </div>

                                            <!-- <div id="caret" class="custom-caret-info custom-caret-bottom"
                                                v-if="motorCycleActive">
                                                <i
                                                    class="fas fa-caret-down custom-light-gray text-yellow-500 custom-caret-size"></i>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="motorCarActive">
                                <div class="w-full bg-white p-4 border-round-3xl">
                                    <div class="flex justify-content-between">
                                        <label class="font-bold text-sm">
                                            Fill in the details below to compare policies and get the best quotes.
                                        </label>
                                        <i class="far fa-times-circle text-2xl text-yellow-500"></i>
                                    </div>

                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-3 mt-2">
                                            <div class="flex align-items-center" v-for="insuranceType in insuranceTypes"
                                                :key="insuranceType.name">
                                                <RadioButton v-model="selectedInsuranceType" :value="insuranceType.name" />
                                                <label for="ingredient1" class="ml-1 text-xs font-bold">{{
                                                    insuranceType.name
                                                }}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-4">
                                        <div class="flex flex-wrap gap-3 mt-2">
                                            <div class="flex align-items-center" v-for="insuranceClass in insuranceClasses"
                                                :key="insuranceClass.name">
                                                <RadioButton v-model="selectedInsuranceClass"
                                                    :value="insuranceClass.name" />
                                                <label for="ingredient1" class="ml-1 text-xs font-bold">{{
                                                    insuranceClass.name
                                                }}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-2 mt-4">
                                        <div class="custom-w-2">
                                            <Dropdown v-model="selectedMake" :options="makes" optionLabel="name"
                                                placeholder="Make E.g BMW"
                                                class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-small-dropdown-1" />
                                        </div>

                                        <div class="custom-w-2">
                                            <Dropdown v-model="selectedMake" :options="makes" optionLabel="name"
                                                placeholder="Model E.g X3"
                                                class="w-full border-round-3xl custom-yellow-dropdown custom-dark-gray-border custom-small-dropdown-1" />
                                        </div>

                                        <div class="custom-w-2">
                                            <InputGroup class="custom-amount-input-1">
                                                <InputGroupAddon class="border-round-3xl custom-dark-gray-border p-1">
                                                    <div class="bg-yellow-500 border-round-2xl flex">
                                                        <label class="text-sm font-bold text-black-alpha-90 p-2 py-1">KES</label>
                                                    </div>
                                                </InputGroupAddon>
                                                <InputText class="border-round-3xl custom-dark-gray-border text-sm"
                                                    placeholder="Estimate value" />
                                            </InputGroup>
                                        </div>

                                        <div class="custom-w-2">
                                            <Calendar v-model="yom" placeholder="Year of Manufacture"
                                                class="w-full custom-sm-rd-calendar" showIcon iconDisplay="input">
                                                <template #inputicon="{ clickCallback }">
                                                    <i class="fas fa-calendar-days text-yellow-500"
                                                        @click="clickCallback"></i>
                                                </template>
                                            </Calendar>
                                        </div>

                                        <div class="custom-w-2">
                                            <div class="w-full border-round-3xl bg-yellow-500 border-1 border-yellow-500 p-2"
                                                @click="showQuote()">
                                                <div class="flex justify-content-between align-items-center">
                                                    <label class="font-bold text-sm">Get Quote</label>
                                                    <i class="fas fa-circle-arrow-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!showQuoteStatus">
                    <div class="flex justify-content-center p-2 mt-4">
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
                                            Book your car valuation online for the same day and get your actual insurance
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
                                <div class="w-6 shadow-2 border-round-3xl p-4">
                                    <div class="flex">
                                        <img src="@/assets/img/person.png" width="180px" height="auto" />

                                        <div>
                                            <h1>
                                                Reach out to us for any queries
                                            </h1>

                                            <label class="font-bold">
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

                                <div class="w-6 shadow-2 border-round-3xl bg-yellow-500 p-4">
                                    <div class="flex">
                                        <img src="@/assets/img/hand.png" width="200px" />

                                        <div>
                                            <h1>
                                                Lipa Pole Pole
                                            </h1>

                                            <label class="font-bold mt-4">
                                                This is an Insurance premium financing option, that allows you to pay
                                                flexible monthly installments of upto 10 months.
                                            </label>

                                            <div
                                                class="flex justify-content-between align-items-center custom-dark-gray-bg border-round-3xl gap-2 p-3 py-2 mt-5 w-8">
                                                <label class="font-bold text-white">Learn More</label>

                                                <i class="fas fa-arrow-alt-circle-right text-white text-3xl"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div :id="quotesSection">
                    <Quotes v-if="showQuoteStatus" />
                </div>
            </div>

            <div class="custom-mobile-view">
                <div :style="{ height: sectionHeight }" id="section">
                    <div class="flex flex-column p-2">
                        <label class="font-bold">Instant Insurance, <span class="text-yellow-500">anywhere,
                                anytime!</span></label>

                        <label class="mt-2">Get your insurance now and pay in up to <span class="font-bold">10 months
                                installments</span> with our
                            <span class="font-bold">Lipa Pole Pole</span> financing option.</label>

                        <div class="custom-card border-round mt-4 p-2">
                            <label class="text-xs">Protect what matters most to you with InsureMe. <span
                                    class="font-bold text-yellow-500">Get Quote Now!</span></label>
                        </div>
                    </div>

                    <div class="grid mt-2 p-2">
                        <div class="col-4">
                            <div class="custom-card border-round py-4" @click="getQuote()">
                                <div class="flex justify-content-center">
                                    <img src="../assets/img/motor.png" width="auto" height="36px">
                                </div>

                                <div class="flex justify-content-center mt-2">
                                    <label class="text-xs font-semibold text-center">Motor Car</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="custom-card border-round py-4">
                                <div class="flex justify-content-center">
                                    <img src="../assets/img/bike.png" width="auto" height="36px">
                                </div>

                                <div class="flex justify-content-center mt-2">
                                    <label class="text-xs font-semibold text-center">Motor Car</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="custom-card border-round py-4">
                                <div class="flex justify-content-center">
                                    <img src="../assets/img/personal-accident.png" width="auto" height="36px">
                                </div>

                                <div class="flex justify-content-center mt-2">
                                    <label class="text-xs font-semibold text-center">Personal Accident</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img class="custom-bottom-image" src="../assets/img/landing-bg-mobile.png" width="100%">
                </div>

                <div class="px-2">
                    <div>
                        <div class="flex align-items-center">
                            <i class="fas fa-car text-yellow-500 text-4xl"></i>

                            <div class="flex flex-column m-3">
                                <h3 class="my-1">Get a Quote</h3>
                                <div class="custom-bottom-border"></div>
                            </div>
                        </div>

                        <label class="text-sm">
                            Book your car valuation online for the same day and get your actual insurance quote.
                        </label>
                    </div>

                    <div class="mt-4">
                        <div class="flex align-items-center">
                            <i class="fas fa-user-shield text-yellow-500 text-4xl"></i>

                            <div class="flex flex-column m-2">
                                <h3 class="my-1">Tell Us About Yourself</h3>
                                <div class="custom-bottom-border"></div>
                            </div>

                        </div>

                        <label class="text-sm">
                            Choose the motor cover you wish to apply for and fill in the required information.
                        </label>
                    </div>

                    <div class="mt-4">
                        <div class="flex align-items-center">
                            <i class="fas fa-wallet text-yellow-500 text-4xl"></i>

                            <div class="flex flex-column m-2">
                                <h3 class="my-1">Flexible payment</h3>
                                <div class="custom-bottom-border"></div>
                            </div>

                        </div>

                        <label class="text-sm">
                            Get your insurance now and pay in installments with our Lipa Pole Pole financing option.
                        </label>
                    </div>
                </div>

                <div class="custom-gray-city-bg mt-4">
                    <div class="flex justify-content-center p-4">

                        <div class="flex flex-column align-items-center">
                            <i class="fas fa-arrow-right-to-arc text-white text-5xl"></i>

                            <h3 class="text-center text-white">Sign in to view your policies, claims and more</h3>

                            <Button type="button" class="border-round-2xl bg-yellow-500 border-yellow-500 mt-2"
                                size="small">
                                <div class="flex align-items-center">
                                    <span class="text-sm text-black-alpha-90 font-bold mr-2">Sign in</span>
                                    <i class="fas fa-circle-user text-black-alpha-90"></i>
                                </div>
                            </Button>
                        </div>

                    </div>
                </div>

                <div class="bg-yellow-500 p-4">
                    <div class="flex justify-content-center">
                        <div class="flex flex-column align-items-center">
                            <i class="far fa-wallet text-black-alpha-90 text-5xl"></i>

                            <h3 class="text-center">Lipa Pole Pole</h3>

                            <label class="text-center font-bold text-sm">
                                This is an Insurance premium financing option, that allows you to pay flexible monthly
                                installments of upto 10 months.
                            </label>

                            <Button type="button" class="border-round-2xl bg-black-alpha-90 border-black-alpha-90 mt-4"
                                size="small">
                                <div class="flex align-items-center">
                                    <span class="text-sm text-white font-bold mr-2">Learn more</span>
                                    <i class="fas fa-circle-arrow-right text-white"></i>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <div class="flex justify-content-center">
                        <div class="flex flex-column align-items-center">
                            <i class="fas fa-headset text-black-alpha-90 text-5xl"></i>

                            <h3 class="text-center">Reach out to us for any queries</h3>

                            <label class="text-center font-medium">
                                We aim to keep you smiling with our personalised customer support.
                            </label>

                            <Button type="button" class="border-round-2xl bg-yellow-500 border-yellow-500 mt-2"
                                size="small">
                                <div class="flex align-items-center">
                                    <span class="text-sm text-black-alpha-90 font-bold mr-2">Talk to us</span>
                                    <i class="fas fa-circle-phone text-black-alpha-90"></i>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                <div class="p-4">
                    <Footer />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TopNav from '@/components/TopNav.vue'
import Footer from '@/components/Footer.vue'
import Quotes from '@/components/Quote/Quotes.vue'

const page = ref("Home")

const navbarHeight = ref(0)
const sectionHeight = ref(null)
const router = useRouter()

const buttonBottom = ref(null)

const motorCarActive = ref(false)
const motorCycleActive = ref(false)

const selectedInsuranceType = ref(null)
const insuranceTypes = ref([
    {
        "name": "Private"
    },
    {
        "name": "Commercial"
    },
    {
        "name": "PSV"
    }
])

const selectedInsuranceClass = ref(null)
const insuranceClasses = ref([
    {
        "name": "Comprehensive"
    },
    {
        "name": "Third Party Only"
    }
])

const showQuoteStatus = ref(false)
const quotesSection = ref("quotesSection")

onMounted(() => {
    //
})

const adjustHeight = (value) => {
    navbarHeight.value = value

    var viewportHeightInPixels = window.innerHeight;
    var difference = viewportHeightInPixels - navbarHeight.value

    sectionHeight.value = difference + 'px'
}

const getQuote = () => {
    router.push('/get-quote')
}

const toggleDetails = (value) => {
    if (value == "motor") {
        if (motorCarActive.value) {
            motorCarActive.value = false
        }
        else {
            motorCarActive.value = true

            var caret = document.getElementById('caret')
            var caretHeight = caret.offsetHeight

            buttonBottom.value = '-' + (caretHeight / 2) + 'px'

        }
    }
}

const showQuote = () => {
    if(showQuoteStatus.value) {
        showQuoteStatus.value = false
    }
    else {
        showQuoteStatus.value = true

        const element = document.getElementById(quotesSection.value);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }        
    }
}

</script>