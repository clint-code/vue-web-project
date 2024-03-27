<template>
  <div class="h-full">
    <TopNav variation="no-logo-white" :page="page" />

    <div class="m-0 px-3 py-1">
      <p class="m-0 font-semibold text-lg mt-3">
        Below is a summary of your claim.
      </p>
      <div class="summary-table mt-2">
        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Claim Type</p>
          <p class="m-0 font-medium">Damage to Vehicle</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Make and Model</p>
          <p class="m-0 font-medium">Toyota Corolla</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Registration No.</p>
          <p class="m-0 font-medium">KBU617A</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Driver</p>
          <p class="m-0 font-medium">Victor Gachangi</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Police Station</p>
          <p class="m-0 font-medium">Kabete Police Station</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Date of Incidence</p>
          <p class="m-0 font-medium">September 17th 2023</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Time of Incidence</p>
          <p class="m-0 font-medium">12:45 PM</p>
        </div>

        <div class="flex justify-content-between align-items-center py-3 border-bottom-1 border-gray-400">
          <p class="m-0 font-light text-gray-700">Location of Incidence</p>
          <p class="m-0 font-medium">Waiyaki Way</p>
        </div>
      </div>

      <CustomButton label="Submit Claim" bgColor="bg-yellow-500 text-md font-bold mt-6" icon="fa-arrow-circle-right " />
    </div>
  </div>
</template>

<script setup>
import TopNav from "@/components/TopNav.vue";
import { ref } from "vue";
import CustomButton from "../../components/shared/CustomButton.vue";
</script>