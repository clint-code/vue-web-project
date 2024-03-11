<template>
    <div :style="{ height: props.sectionHeight }" id="section">
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
            <div class="col-4" v-for="(product, index) in props.products">
                <div class="custom-card border-round py-4" @click="getQuote(product.category_type)">
                    <div class="flex justify-content-center">
                        <img :src="product.icon" width="auto" height="36px">
                    </div>

                    <div class="flex justify-content-center mt-2">
                        <label class="text-xs font-semibold text-center">{{ product.name }}</label>
                    </div>
                </div>
            </div>
        </div>

        <img class="custom-bottom-image" src="@/assets/img/landing-bg-mobile.png" width="100%">
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

                <Button type="button" class="border-round-2xl bg-yellow-500 border-yellow-500 mt-2" size="small">
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

                <Button type="button" class="border-round-2xl bg-yellow-500 border-yellow-500 mt-2" size="small">
                    <div class="flex align-items-center">
                        <span class="text-sm text-black-alpha-90 font-bold mr-2">Talk to us</span>
                        <i class="fas fa-circle-phone text-black-alpha-90"></i>
                    </div>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emits = defineEmits()
const props = defineProps({
    products: Array,
    sectionHeight: String
})

const getQuote = (value) => {
    if(value == 'CAR') {
        router.push('/get-quote')
    }
}
</script>