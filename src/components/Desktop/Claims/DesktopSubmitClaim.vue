<template>
    <div class="custom-width-80 flex" :style="{ minHeight: props.height }">
        <DesktopSideNav :page="page" :height="props.height" />

        <div class="py-4 pl-4 w-full">
            <div class="flex justify-content-between">
                <label class="text-xl">My Claims</label>

                <div class="flex justify-content-end">
                    <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2 shadow-1"
                        @click="showMyPolices()">
                        <label class="text-sm font-bold">Submit New Claim</label>
                        <i class="fas fa-arrow-circle-right"></i>
                    </div>
                </div>
            </div>

            <div class="mt-6 custom-bottom-border-4 pb-2">
                <label class="custom-gray font-semibold">
                    Hi Victor, welcome to our simple & fast claim process.
                </label>
            </div>

            <div class="mt-4 custom-dotted-border pb-4">
                <label class="custom-gray">
                    If you are visiting this page, chances are you are going through a tough time. We will make the
                    process as easy and transparent as possible to help provide the peace of mind you need.
                </label>
            </div>

            <div class="mt-3 pb-2">
                <label class="custom-gray font-semibold">
                    You have no active claims!
                </label>

                <div class="custom-bg-light custom-pd-bg-border border-1 border-round-2xl mt-3 p-3">
                    <label class="custom-gray font-semibold text-sm">
                        Select a policy to start your claim process.
                    </label>

                    <div class="grid mt-1">
                        <div class="col-8">
                            <Dropdown placeholder="Select vehicle"
                                class="w-full border-round-3xl custom-dark-dropdown custom-small-dropdown-1" />
                        </div>

                        <div class="col-4">
                            <div class="flex justify-content-end">
                                <div class="flex align-items-center bg-yellow-500 border-round-3xl gap-2 px-3 py-2 shadow-1"
                                    @click="showMyPolices()">
                                    <label class="text-sm font-bold">Submit New Claim</label>
                                    <i class="fas fa-arrow-circle-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import DesktopSideNav from "@/components/Desktop/Layout/DesktopSideNav.vue";

const props = defineProps({
    height: String
})

const page = ref("Claims")
</script>