<template>
    <div v-ripple class="p-ripple" :class="divClass">
        <div class="flex justify-content-between align-items-center">
            <label class="font-bold text-sm">{{ buttonText }}</label>
            <i :class="iconClass"></i>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const props = defineProps({
    divClass: String,
    iconClass: String,
    buttonText: String
});

const divClass = props.divClass
const iconClass = props.iconClass
const buttonText = props.buttonText
</script>