<template>
    <template v-if="props.quoteState == 'New Policy'">
        <div class="flex justify-content-between custom-gray-border-bottom py-2 mb-2">
            <label class="text-xs w-4">Feb 14th 2021 </label>
            <label class="text-xs font-bold text-right w-8">KES 10,750</label>
        </div>
    </template>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
    quoteState: String
});
</script>