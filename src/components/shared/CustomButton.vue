<template>
  <div :class="[
    'flex justify-content-between align-items-center border-round-3xl px-3 py-3 w-full text-md shadow-2',
    bgColor,
  ]">
    <span>{{ label }}</span>
    <template v-if="icon">
      <i class="fas" :class="iconClasses"></i>
    </template>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  bgColor: {
    type: String,
    default: "bg-yellow-500",
  },
});

const iconClasses = computed(() => {
  return `${props.icon} ml-2`;
});
</script>

<style scoped>
.custom-bg-black {
  background-color: #4a4a4a;
  color: #ffffff;
}

.custom-prop {
  background-color: #ffc402;
  font-weight: 500;
}
</style>
