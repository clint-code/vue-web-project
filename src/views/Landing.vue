<template>
    <div>
        <TopNav variation="fullLogo" :page="page" @calculatedHeight="adjustHeight" />

        <div class="custom-parent-container">
            <div class="custom-desktop-view">
                <template v-if="products != null">
                    <Products :products="products" :sectionHeight="sectionHeight"/>
                </template>                
            </div>

            <div class="custom-mobile-view">
                <MobileLanding :products="products" :sectionHeight="sectionHeight" v-if="products != null"/>              
            </div>
        </div>

        <loading v-model:active="isLoading" :is-full-page="fullPage" color="#FFC402" loader="dots" :opacity="opacity"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import quoteService from '@/services/quoteService.js'

import TopNav from '@/components/TopNav.vue'

import Products from '@/components/Desktop/Landing/Products.vue'
import MobileLanding from '@/components/Mobile/Landing/Landing.vue'

const page = ref("Home")

const isLoading = ref(true)
const fullPage = ref(false)
const opacity = ref(0.7)

const navbarHeight = ref(0)
const sectionHeight = ref(null)

const buttonBottom = ref(null)

const products = ref(null)

onMounted(() => {
    getProducts()
})

const getProducts = () => {
    quoteService.getProducts()
        .then((response) => {
            products.value = response.data.data
            isLoading.value = false
        })
        .catch((error) => {
            console.log(error)
        })
}

const adjustHeight = (value) => {
    navbarHeight.value = value

    var viewportHeightInPixels = window.innerHeight;
    var difference = viewportHeightInPixels - navbarHeight.value

    sectionHeight.value = difference + 'px'
}
</script>