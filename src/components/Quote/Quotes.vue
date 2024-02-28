<template>
    <div class="custom-desktop-view custom-width-80">
        <div class="px-3 py-4" :style="{ 'margin-bottom': marginBottom }">
            <div class="flex align-items-center">
                <i class="fas fa-message-smile text-yellow-500 text-4xl my-1"></i>

                <div class="flex flex-column mx-3">
                    <h2 class="my-1">Your estimate quote is ready</h2>
                    <div class="custom-bottom-border"></div>
                    <label class="text-sm mt-2">Choose your preferred quote and make payment to receive your Digital
                        Certificate of Insurance.</label>
                </div>
            </div>

            <div class="mt-4">
                <div class="grid relative">
                    <div class="lg:col-4">
                        <div class="custom-card border-round-2xl relative p-3">
                            <div class="flex justify-content-between align-items-center">
                                <img src="@/assets/img/madison.png" height="20px" width="auto" />

                                <div class="border-round-2xl bg-yellow-500 border-yellow-500 text-black-alpha-90 font-bold p-2 text-sm"
                                    size="small" @click="1()">
                                    Buy Now
                                </div>
                            </div>
                            <hr class="custom-gray" />

                            <div class="flex justify-content-between">
                                <div class="flex flex-column">
                                    <label class="font-bold text-sm">Lipa in full</label>
                                    <label class="font-light text-sm mt-1">Inc. of Tax & Levies</label>
                                </div>

                                <label class="font-bold">KES 50,000</label>
                            </div>
                            <hr class="custom-gray" />

                            <div class="flex justify-content-between">
                                <div class="flex flex-column">
                                    <label class="font-bold text-sm">Lipa Pole Pole Deposit</label>
                                    <label class="font-light text-sm mt-1">Lipa Pole Pole Monthly Installment</label>
                                </div>

                                <label class="font-bold">KES 50,000</label>
                            </div>

                            <div class="flex justify-content-center mt-4">
                                <div class="custom-light-gray-bg custom-gray-border custom-overlap border-round-2xl"
                                    id="benefitsButton" :style="{ bottom: buttonBottom }" @click="showQuote()">
                                    <div class="flex justify-content-center py-2">
                                        <span class="text-sm font-bold">
                                            {{ showQuoteText }}
                                        </span>
                                    </div>

                                    <div class="custom-caret-info" :style="{ bottom: buttonBottom }" v-if="showQuoteStatus">
                                        <i class="fas fa-caret-down custom-light-gray text-3xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="custom-full-width" v-if="showQuoteStatus">
                            <div class="custom-light-gray-bg border-round-2xl custom-shadow mt-4">
                                <div class="p-4">
                                    <div class="flex justify-content-between">
                                        <label class="text-xs font-medium">Base Premium</label>
                                        <label class="text-xs font-bold">KES 30,000</label>
                                    </div>

                                    <div class="flex justify-content-between mt-2">
                                        <label class="text-xs">Windscreen</label>
                                        <label class="text-xs font-bold">KES 2,000</label>
                                    </div>

                                    <div class="flex justify-content-between mt-2">
                                        <label class="text-xs">Entertainment Unit</label>
                                        <label class="text-xs font-bold">KES 2,000</label>
                                    </div>

                                    <div class="flex justify-content-between mt-2">
                                        <label class="text-xs">PHCF</label>
                                        <label class="text-xs font-bold">KES 150</label>
                                    </div>
                                </div>

                                <div>
                                    <TabView class="custom-desktop-tab">
                                        <TabPanel class="py-0">
                                            <template #header>
                                                <div class="flex align-items-center gap-3">
                                                    <span class="font-bold white-space-nowrap text-sm">Add Benefits</span>
                                                    <i class="fas fa-layer-plus text-sm "></i>
                                                </div>
                                            </template>

                                            <div class="custom-gray-border-bottom py-2">
                                                <div class="flex justify-content-between align-items-center">
                                                    <div class="flex align-items-center">
                                                        <Checkbox v-model="checked" :binary="true" variant="filled" />
                                                        <label class="text-xs ml-2">Windscreen (Free Upto KES
                                                            30,000)</label>
                                                    </div>

                                                    <div class="mt-4">
                                                        <InputGroup class="border-round-2xl">
                                                            <InputGroupAddon
                                                                class="border-round-left-2xl bg-white border-left-2 border-left-2 border-y-2 custom-dark-gray-border">
                                                                <span class="text-xs font-bold">KES</span>
                                                            </InputGroupAddon>
                                                            <InputText
                                                                class="border-y-2 border-x-none custom-dark-gray-border"
                                                                placeholder="Estimate value" size="small" />

                                                            <InputGroupAddon
                                                                class="border-round-right-2xl border-none custom-dark-gray-bg-1"
                                                                style="box-shadow: inset 0 0 0 2px #4A4A4A;"><span
                                                                    class="text-white font-bold">ADD</span>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 mt-4"
                                                @click="getQuote()">
                                                <div class="flex justify-content-between align-items-center">
                                                    <label class="font-bold">Buy Now</label>
                                                    <label class="font-bold">KES 42,000</label>
                                                    <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <template #header>
                                                <div class="flex align-items-center gap-3">
                                                    <span class="font-bold white-space-nowrap text-sm">Cover
                                                        Details</span>
                                                    <i class="fas fa-square-info"></i>
                                                </div>
                                            </template>

                                            <div
                                                class="flex justify-content-between custom-gray-border-bottom py-2 px-1 mb-2">
                                                <label class="text-xs">3rd Party Property Damage</label>
                                                <label class="text-xs">KES 2,000</label>
                                            </div>

                                            <div
                                                class="flex justify-content-between custom-gray-border-bottom py-2 px-1 mb-2">
                                                <label class="text-xs">3rd Party Persons Injury/Death (per person)</label>
                                                <label class="text-xs">KES 2,000</label>
                                            </div>

                                            <div
                                                class="flex justify-content-between custom-gray-border-bottom py-2 px-1 mb-2">
                                                <label class="text-xs">3rd Party Person (per event)</label>
                                                <label class="text-xs">KES 2,000</label>
                                            </div>

                                            <div class="w-full border-round-2xl bg-yellow-500 border-1 border-yellow-500 px-3 py-2 px-1 mt-4"
                                                @click="getQuote()">
                                                <div class="flex justify-content-between align-items-center">
                                                    <label class="font-bold">Buy Now</label>
                                                    <label class="font-bold">KES 49,500</label>
                                                    <i class="fas fa-circle-arrow-right text-black-alpha-90"></i>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </TabView>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="fixed bottom-0 left-0 w-full" id="bottomCard">
            <BottomSummary />
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const buttonBottom = ref(null)
const marginBottom = ref(null)

const checked = ref('')
const showQuoteStatus = ref(false)
const showQuoteText = ref('View Benefits')

onMounted(() => {
    var button = document.getElementById('benefitsButton')
    var butHeight = button.offsetHeight
    var halvedButton = butHeight / 2

    buttonBottom.value = '-' + halvedButton + 'px'

    var bottomCard = document.getElementById('bottomCard')
    var bottomCardHeight = bottomCard.offsetHeight
    marginBottom.value = bottomCardHeight + 'px'
})

const showQuote = () => {
    console.log(showQuoteStatus.value)

    if (showQuoteStatus.value) {
        showQuoteStatus.value = false
        showQuoteText.value = 'View Benefits'
    }
    else {
        showQuoteStatus.value = true
        showQuoteText.value = 'Close'
    }
}

const getQuote = () => {
    router.push('/accept-terms')
}
</script>