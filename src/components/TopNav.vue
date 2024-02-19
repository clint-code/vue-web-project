<template>
    <div ref="navbar">
        <div class="custom-navbar custom-desktop-view">
            <div class="flex justify-content-between align-content-center">
                <div>
                    <img src="@/assets/img/logo.png" height="60px" width="auto">
                </div>

                <div>                    
                    <span class="custom-nav-item-desktop">Home</span>
                    <span class="custom-nav-item-desktop">Lipa Pole Pole</span>
                </div>        
            </div>
        </div>

        <div class="custom-navbar custom-mobile-view custom-mobile-nav">
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
        console.log(props.back)
        router.push(props.back)
    }
</script>