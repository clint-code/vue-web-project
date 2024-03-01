<template>
    <TopNav variation="full-logo-transparent" :page="page" />

    <div class="p-3">
        <div class="flex flex-column">
            <h3 class="my-1">Lipa Pole Pole Payment Plan</h3>
            <div class="custom-bottom-border"></div>
        </div>

        <div class="flex flex-column">
            <p class="text-sm">
                Motor Insurance cover is a requirement by law, and one cannot drive 
                their vehicle on public roads without a valid motor insurance certificate. 
                smile on your face, helping you keep going with simple and personalized solutions.
            </p>

            <p class="text-sm">
                A comprehensive policy provides the best motor vehicle cover as it shields the owner or 
                driver against losses should incidents such as fire, theft, injury, vehicle damage or accident occur.
            </p>
            
            <p class="text-sm">
                InsureMe recognizes that every Kenyan deserves the best insurance cover available. 
                However, purchasing such a comprehensive cover becomes difficult due to the high 
                upfront premium required.
            </p>

            <p class="text-sm">
                Introducing Lipa Pole Pole! This pay-as-you-go financing feature allows you to enjoy the 
                benefits of a comprehensive motor cover whilst paying for the premiums in favorable 
                monthly installments. 
            </p>

            <p class="text-sm font-medium">
                The qualifications for our Lipa Pole Pole payment option are simple. All you need is:
            </p>

            <ul class="text-sm">
                <li>
                    Valid KYC information about the insured, i.e., yourself
                </li>

                <li>
                    Valid copy of ID
                </li>

                <li>
                    Valid copy of Vehicle Logbook
                </li>

                <li>
                    Valid Vehicle registered with the National Transport System Authority (NTSA)
                </li>

                <li>
                    Payment of the required deposit to activate your Lipa Pole Pole facility
                </li>
            </ul>

            <p class="text-sm font-medium">
                We need a deposit from you to activate the Lipa Pole Pole facility which covers the following:
            </p>

            <ul class="text-sm">
                <li>
                    An annual Third Party Only cover for your vehicle
                </li>

                <li>
                    A 60-days comprehensive premium [(Annual Premium / 12 months) * 2months]
                </li>

                <li>
                    Mandatory 3rd party service charges such as vehicle valuation
                </li>

                <li>
                    Any mandatory, non-refundable taxes as such as Policy Holder Compensation Fund (PHCF, 0.25%) and 
                    Training Levy (TL, 0.20%)
                </li>

                <li>
                    Service Fee of 1% + VAT
                </li>
            </ul>

            <p class="text-sm">
                Our Lipa Pole Pole facility charges a nominal interest of 5% per month, computed on a reducing balance basis. 
                The installments have been smoothened out over the period to make both principle + interest payments consistent 
                and easier for you to manage. InsureMe also has a loan calculator that empowers you to change the minimum deposit 
                amount and loan period to suit your financial capacity.
            </p>

            <ul class="text-sm">
                <li>
                    You can increase the minimum deposit required. This action automatically reduces the starting loan principal 
                    and interest charged over the period. 
                </li>

                <li>
                    You can amend the repayment period to between 3 - 10 months (10 months is the default period). This action 
                    automatically increases the starting loan principal and interest charged over the period. 
                </li>

                <li>
                    You can also pre-pay your facility with no penalty charge to you. This action saves you on future interest and premium payments.
                </li>
            </ul>
            
            <p class="text-sm">
                Principal and interest payments are made on a monthly basis. In the event that a loan becomes overdue, you will have a 
                14-day period in which to make payment to keep your policy active. During this period, InsureMe platform will send you 
                relevant reminders via SMS encouraging you to clear your arrears.
            </p>

            <p class="text-sm">
                In the event that you fail to honor the installment within the 14-day period, your comprehensive cover will be 
                downgraded to a Third Party Only cover.
            </p>

            <p class="text-sm">
                Please also take note that during any major vehicle insurance claim, the Lipa Pole facility will be required to be 
                fully paid up as part of the claims document processing.
            </p>

            <div class="flex align-items-center bg-yellow-500 border-round-3xl justify-content-between px-3 py-2">
                <label class="text-sm font-bold">Get Quote Now</label>
                <i class="fas fa-arrow-circle-right"></i>
            </div>
        </div> 
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopNav from '@/components/TopNav.vue'

const page = ref("Lipa Pole Pole")
</script>