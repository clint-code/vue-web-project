<template>
    <div ref="navbar">
        <div class="custom-desktop-view custom-gray-border-bottom-1">
            <div class="flex justify-content-betweeen align-items-center gap-4 custom-width-80">
                <img class="py-2" src="@/assets/img/logo.png" height="60px" width="auto">

                <div class="flex justify-content-betweeen gap-4 mx-auto">
                    <div class="custom-bottom-border-1 pb-1">
                        <label class="font-bold text-sm">Home</label>
                    </div>

                    <div>
                        <label class="text-sm">Our Products</label>
                    </div>

                    <div>
                        <label class="text-sm">Lipa Pole Pole</label>
                    </div>

                    <div>
                        <label class="text-sm">FAQs</label>
                    </div>

                    <div>
                        <label class="text-sm">Contact Us</label>
                    </div>
                </div>

                <div class="flex align-items-center justify-content-end gap-2 mx-auto">
                    <i class="fas fa-phone-volume"></i>
                    <label class="font-bold">0709 184 444</label>
                </div>

                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2" @click="navigate('/my-policies')">
                        <label class="text-sm font-bold">My Policies</label>
                        <i class="fas fa-user-circle"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="custom-mobile-view custom-mobile-nav">
            <template v-if="props.variation == 'fullLogo'">
                <div class="flex justify-content-between align-items-center px-3 py-2" :class="{ 'bg-yellow-500' : menuDetails }">
                    <div>
                        <img src="../assets/img/logo.png" height="37px" width="auto" v-if="!menuDetails">
                        <img src="../assets/img/logo-white.png" height="37px" width="auto" v-if="menuDetails">
                    </div>

                    <div class="flex">
                        <div class="custom-icon-bg bg-yellow-500 mr-3" :class="{ 'bg-yellow-500' : !menuDetails, 'bg-white' : menuDetails }" @click="navigate('/my-policies')">
                            <i class="fas fa-user text-sm"></i>
                        </div>

                        <div class="custom-icon-bg" @click="showMenuDetails()" :class="{ 'bg-yellow-500' : !menuDetails, 'bg-white' : menuDetails }">
                            <i class="fas fa-bars text-sm" v-if="!menuDetails"></i>
                            <i class="fas fa-xmark text-sm" v-if="menuDetails"></i>
                        </div>
                    </div>
                </div>
            </template>

            <template v-if="props.variation == 'full-logo-transparent'">
                <div class="align-items-center" :class="{'custom-contact-us-bg' : page == 'Contact Us',  'custom-lipa-pole-pole-bg' : page == 'Lipa Pole Pole'}">
                    <div class="flex justify-content-between custom-mobile-nav px-3 py-2">
                        <div>
                            <img src="../assets/img/logo.png" height="37px" width="auto">
                        </div>

                        <div class="flex">
                            <div class="custom-icon-bg bg-yellow-500 mr-3" @click="navigate('/my-policies')">
                                <i class="fas fa-user text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-yellow-500" @click="showMenuDetails()">
                                <i class="fas fa-bars text-sm" v-if="!menuDetails"></i>
                                <i class="fas fa-xmark text-sm" v-if="menuDetails"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="props.variation == 'yellow'">
                <div class="flex justify-content-between align-items-center bg-yellow-500 px-3 py-2">
                    <div>
                        <i class="fas fa-arrow-left" @click="goBack()"></i>
                    </div>

                    <div>
                        <img src="../assets/img/logo-icon.png" height="33px" width="auto">
                    </div>

                    <div>
                        <div class="flex">
                            <div class="custom-icon-bg bg-black-alpha-90 mr-3" @click="navigate('/my-policies')">
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-black-alpha-90">
                                <i class="fas fa-bars text-white text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="props.variation == 'white'">
                <div class="flex justify-content-between align-items-center px-3 py-2">
                    <div>
                        <i class="fas fa-arrow-left" @click="goBack()"></i>
                    </div>

                    <div>
                        <img src="../assets/img/logo-white-bg.png" height="33px" width="auto">
                    </div>

                    <div>
                        <div class="flex">
                            <div class="custom-icon-bg bg-black-alpha-90 mr-3" @click="navigate('/my-policies')">
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-black-alpha-90">
                                <i class="fas fa-bars text-white text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="props.variation == 'white-yellow-icons'">
                <div class="flex justify-content-between align-items-center px-3 py-2">
                    <div>
                        <i class="fas fa-arrow-left" @click="goBack()"></i>
                    </div>

                    <div>
                        <img src="../assets/img/logo-white-bg.png" height="33px" width="auto">
                    </div>

                    <div>
                        <div class="flex">
                            <div class="custom-icon-bg bg-yellow-500 mr-3" @click="navigate('/my-policies')">
                                <i class="fas fa-user text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-yellow-500">
                                <i class="fas fa-bars text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="props.variation == 'no-logo-white'">
                <div class="flex justify-content-between align-items-center px-3 py-2">
                    <div>
                        <i class="fas fa-arrow-left" @click="goBack()"></i>
                        <label class="text-sm font-bold px-2">{{ page }}</label>
                    </div>

                    <div>
                        <div class="flex">
                            <div class="custom-icon-bg bg-yellow-500 mr-3" @click="navigate('/my-policies')">
                                <i class="fas fa-user text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-yellow-500">
                                <i class="fas fa-bars text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="props.variation == 'no-logo-yellow'">
                <div class="flex justify-content-between align-items-center bg-yellow-500 px-3 py-2">
                    <div>
                        <i class="fas fa-arrow-left" @click="goBack()"></i>
                        <label class="text-sm font-bold px-2">{{ page }}</label>
                    </div>

                    <div>
                        <div class="flex">
                            <div class="custom-icon-bg bg-white mr-3" @click="navigate('/my-policies')">
                                <i class="fas fa-user text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-white">
                                <i class="fas fa-bars text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="overlay-menu bg-yellow-500" v-if="menuDetails">                
                <div class="custom-brown-border-bottom custom-brown-border-top px-3 py-2" @click="navigate('/')">
                    <div class="flex align-items-center py-2 mb-2">
                        <i class="fa-home" :class="{ 'fas' : page ==  'Home', 'far' : page !=  'Home'  }"></i>
                        <label class="text-sm px-2" :class="{ 'font-bold' : page ==  'Home'  }">Home</label>
                    </div>
                </div>

                <div class="custom-brown-border-bottom px-3 py-2" @click="navigate('/lipa-pole-pole')">
                    <div class="flex align-items-center py-2 mb-2">
                        <i class="fa-wallet" :class="{ 'fas' : page ==  'Lipa Pole Pole', 'far' : page !=  'Lipa Pole Pole'  }"></i>
                        <label class="text-sm px-2" :class="{ 'font-bold' : page ==  'Lipa Pole Pole'  }">Lipa Pole Pole</label>
                    </div>
                </div>

                <div class="custom-brown-border-bottom px-3 py-2" @click="navigate('/faqs')">
                    <div class="flex align-items-center py-2 mb-2">
                        <i class="fa-messages-question" :class="{ 'fas' : page ==  'FAQs', 'far' : page !=  'FAQs'  }"></i>
                        <label class="text-sm px-2" :class="{ 'font-bold' : page ==  'FAQs'  }">FAQs</label>
                    </div>
                </div>

                <div class="custom-brown-border-bottom px-3 py-2" @click="navigate('/contact-us')">
                    <div class="flex align-items-center py-2 mb-2">
                        <i class="fa-headset" :class="{ 'fas' : page ==  'Contact Us', 'far' : page !=  'Contact Us'  }"></i>
                        <label class="text-sm px-2" :class="{ 'font-bold' : page ==  'Contact Us'  }">Contact Us</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const emits = defineEmits()
const props = defineProps({
    variation: String,
    back: String,
    page: String
});
const router = useRouter()

const menuDetails = ref(false)
const navbar = ref(null)
const navbarHeight = ref(0)

onMounted(() => {
    if (navbar.value) {
        navbarHeight.value = navbar.value.clientHeight
        emits('calculatedHeight', navbarHeight.value);
    }
})

const goBack = () => {
    router.push(props.back)
}

const showMenuDetails = () => {
    if(menuDetails.value) {
        menuDetails.value = false
    }
    else {
        menuDetails.value = true
    }
}

const navigate = (value) => {
    router.push(value)
}
</script>