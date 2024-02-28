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
                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2">
                        <label class="text-sm font-bold">My Policies</label>
                        <i class="fas fa-user-circle"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="custom-mobile-view custom-mobile-nav">
            <template v-if="props.variation == 'fullLogo'">
                <div class="flex justify-content-between align-items-center px-3 py-2">
                    <div>
                        <img src="../assets/img/logo.png" height="37px" width="auto">
                    </div>

                    <div class="flex">
                        <div class="custom-icon-bg bg-yellow-500 mr-3">
                            <i class="fas fa-user text-sm"></i>
                        </div>

                        <div class="custom-icon-bg bg-yellow-500">
                            <i class="fas fa-bars text-sm"></i>
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
                            <div class="custom-icon-bg bg-black-alpha-90 mr-3">
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
                            <div class="custom-icon-bg bg-black-alpha-90 mr-3">
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
                            <div class="custom-icon-bg bg-yellow-500 mr-3">
                                <i class="fas fa-user text-sm"></i>
                            </div>

                            <div class="custom-icon-bg bg-yellow-500">
                                <i class="fas fa-bars text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
});
const router = useRouter()

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
</script>