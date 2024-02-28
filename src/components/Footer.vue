<template>
    <div class="custom-desktop-view">
        <div class="flex">
            <label>
                © 2023 InsureMe. All Rights Reserved. Regulated by the IRA. <span class="font-bold underline">Terms of Use/Privacy Policy</span>
            </label>

            <div class="flex ml-auto">
                <i class="fab fa-facebook text-black-alpha-90 text-2xl mx-3"></i>
                <i class="fab fa-instagram text-black-alpha-90 text-2xl mx-3"></i>
                <i class="fab fa-twitter text-black-alpha-90 text-2xl mx-3"></i>
                <i class="fab fa-linkedin text-black-alpha-90 text-2xl mx-3"></i>
            </div>
        </div>
    </div>

    <div class="custom-mobile-view">
        <div class="flex flex-column">
            <div class="flex justify-content-center">
                <i class="fab fa-facebook text-black-alpha-90 text-2xl mx-3"></i>
                <i class="fab fa-instagram text-black-alpha-90 text-2xl mx-3"></i>
                <i class="fab fa-twitter text-black-alpha-90 text-2xl mx-3"></i>
                <i class="fab fa-linkedin text-black-alpha-90 text-2xl mx-3"></i>
            </div>

            <div class="flex justify-content-center">
                <label class="text-center text-xs font-bold mt-4">
                    © 2023 InsureMe. All Rights Reserved. Regulated by the IRA.Terms of Use/Privacy Policy
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
</script>