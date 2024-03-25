<template>
    <TopNav variation="full-logo-transparent" :page="page" />

    <div class="p-3">
        <div class="flex flex-column">
            <h3 class="my-1">Contact Us</h3>
            <div class="custom-bottom-border"></div>
        </div>

        <div class="flex flex-column">
            <label class="font-medium mt-2">
                If you have any questions or comments we will be happy to hear from you.
            </label>

            <label class="text-sm mt-3">
                Our lines are always open, call us on +254 709 184 000
            </label>
        </div> 
        
        <div class="custom-light-gray-bg-1 border-round-3xl mt-4 p-3">
            <div class="flex justify-content-center flex-column">
                <label class="text-sm text-center font-medium">
                    Have a question or want to share your thoughts? We’re all ears 
                    and ready to elevate your experience to new heights!
                </label>

                <h2 class="text-center">hello@insureme.co.ke</h2>

                <label class="text-center font-medium">
                    Got a question? No problem! Just fill out the form below 
                    and we’ll be sure to get back to you with a smile!
                </label>

                <div class="flex flex-column mt-4">
                    <label class="font-medium text-sm">Full Names</label>
                    <InputText class="border-round-3xl text-sm mt-2" placeholder="Enter name" />
                </div>

                <div class="flex flex-column mt-4">
                    <label class="font-medium text-sm">Email Address</label>
                    <InputText class="border-round-3xl text-sm mt-2" placeholder="Enter email" />
                </div>    
                
                <div class="mt-4">
                    <label class="font-medium text-sm">Mobile Number</label>
                    <InputGroup class="mt-2">
                        <InputGroupAddon class="bg-yellow-500 border-round-left-2xl">
                            <span class="text-xs font-bold">+254</span>
                        </InputGroupAddon>
                        <InputText class="border-round-right-2xl text-sm" placeholder="Enter Mobile Number" />
                    </InputGroup>
                </div>

                <div class="flex flex-column mt-4">
                    <label class="font-medium text-sm">Select Category</label>
                    <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Select"
                        class="border-round-3xl custom-dark-dropdown custom-small-dropdown-1 mt-2"/>
                </div>

                <div class="flex flex-column mt-4">
                    <label class="font-medium text-sm">Select Category</label>
                    <Textarea class="border-round-3xl mt-2 text-sm" v-model="value" rows="5" cols="30" placeholder="Type here…" />
                </div>

                <div class="flex justify-content-between align-items-center bg-yellow-500 border-round-3xl px-3 py-2 mt-4">
                    <label class="text-sm font-bold">Send</label>
                    <i class="fas fa-arrow-circle-right"></i>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopNav from '@/components/TopNav.vue'

const page = ref("Contact Us")
</script>