<template>
    <TopNav back="/get-quote" variation="white-yellow-icons" @calculatedHeight="adjustHeight"/>

    <div class="custom-desktop-view">
        <div :style="{ minHeight: sectionHeight }">
            <DesktopSubmitClaim :height="sectionHeight" />
        </div>       
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import TopNav from "@/components/TopNav.vue";
import DesktopSubmitClaim from "@/components/Desktop/Claims/DesktopSubmitClaim.vue";

const sectionHeight = ref(null)

const adjustHeight = (value) => {
  var navbarHeight = value;

  var viewportHeightInPixels = window.innerHeight;

  var difference = viewportHeightInPixels - navbarHeight;

  sectionHeight.value = difference + "px";
};
</script>