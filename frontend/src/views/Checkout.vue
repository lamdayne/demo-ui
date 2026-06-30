<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Breadcrumb & Progress -->
    <div class="border-b border-gray-200">
      <div class="container mx-auto px-4 max-w-6xl py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">Home</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/cart" class="hover:text-[#1E4B35]">Cart</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">Checkout</span>
        </div>
        
        <!-- Stepper -->
        <div class="flex items-center gap-4 text-sm font-semibold relative">
           <div class="flex flex-col items-center gap-2 z-10">
             <div class="w-8 h-8 rounded-full border-2 border-[#1E4B35] text-[#1E4B35] flex items-center justify-center bg-white relative">
               <Check class="w-4 h-4" />
               <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                 <Check class="w-2.5 h-2.5 text-white" />
               </div>
             </div>
             <span class="text-gray-900">Cart</span>
           </div>
           
           <div class="w-24 h-0.5 bg-[#1E4B35] absolute left-6 top-4 -z-0"></div>
           
           <div class="flex flex-col items-center gap-2 z-10">
             <div class="w-8 h-8 rounded-full bg-[#1E4B35] text-white flex items-center justify-center">
               2
             </div>
             <span class="text-gray-900">Checkout</span>
           </div>

           <div class="w-24 h-0.5 bg-gray-200 absolute left-36 top-4 -z-0"></div>

           <div class="flex flex-col items-center gap-2 z-10">
             <div class="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center bg-white">
               3
             </div>
             <span class="text-gray-400">Confirmation</span>
           </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-[#1E4B35] mb-2">Checkout</h1>
        <p class="text-gray-600">Review your information and place your sample order.</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Form Area -->
        <div class="w-full lg:w-[65%] space-y-4">
          <!-- 1. Contact Info -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">1</span>
                Contact Information
              </h2>
              <button class="text-sm font-semibold text-[#1E4B35] flex items-center gap-1"><Edit2 class="w-4 h-4"/> Edit</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Full Name</label>
                <input type="text" v-model="name" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Email Address</label>
                <input type="text" v-model="email" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Phone Number</label>
                <input type="text" v-model="phone" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
            </div>
          </div>

          <!-- 2. Shipping Address -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">2</span>
                Shipping Address
              </h2>
              <button class="text-sm font-semibold text-[#1E4B35] flex items-center gap-1"><Edit2 class="w-4 h-4"/> Edit</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Street Address</label>
                <input type="text" v-model="address" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Apartment, suite, etc. (optional)</label>
                <input type="text" placeholder="Apartment 5B" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <div>
                <label class="block text-sm text-gray-600 mb-1.5">City</label>
                <input type="text" v-model="city" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Province / State</label>
                <input type="text" v-model="province" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">Postal Code</label>
                <input type="text" v-model="postalCode" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
              </div>
            </div>
             <div>
                <label class="block text-sm text-gray-600 mb-1.5">Country</label>
                <select class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]">
                  <option>Vietnam</option>
                </select>
            </div>
          </div>

          <!-- 3. Delivery Method -->
          <div class="border border-[#1E4B35] rounded-xl p-6 bg-[#F8FAF9] shadow-sm">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">3</span>
              Delivery Method
            </h2>
            <div class="space-y-3">
              <label class="flex items-center justify-between p-4 border border-[#1E4B35] bg-[#F0FDF4] rounded-lg cursor-pointer">
                <div class="flex items-center gap-4">
                  <input type="radio" checked name="delivery" class="text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5" />
                  <Truck class="w-6 h-6 text-[#1E4B35]" />
                  <div>
                    <div class="font-bold text-gray-900">Standard Shipping</div>
                    <div class="text-sm text-gray-500">Delivery in 3-5 business days</div>
                  </div>
                </div>
                <div class="font-bold text-gray-900">30,000 VND</div>
              </label>
              
              <label class="flex items-center justify-between p-4 border border-gray-200 bg-white rounded-lg cursor-pointer hover:border-gray-300">
                <div class="flex items-center gap-4">
                  <input type="radio" name="delivery" class="text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5" />
                  <Truck class="w-6 h-6 text-gray-400" />
                  <div>
                    <div class="font-bold text-gray-900">Express Shipping</div>
                    <div class="text-sm text-gray-500">Delivery in 1-2 business days</div>
                  </div>
                </div>
                <div class="font-bold text-gray-900">60,000 VND</div>
              </label>
            </div>
          </div>

          <!-- 4. Payment Method -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">4</span>
              Payment Method
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
               <label class="border-2 border-[#1E4B35] bg-[#F8FAF9] rounded-xl p-4 flex flex-col items-center text-center cursor-pointer relative">
                 <input type="radio" checked name="payment" class="absolute top-3 left-3 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                 <div class="w-12 h-12 bg-[#A50064] rounded-lg text-white font-bold flex items-center justify-center mb-2">mo<br/>mo</div>
                 <div class="font-bold text-gray-900 text-sm">MoMo</div>
                 <div class="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1">Simulated payment</div>
               </label>

               <label class="border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-gray-300 relative">
                 <input type="radio" name="payment" class="absolute top-3 left-3 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                 <div class="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mb-2"><CreditCard class="w-6 h-6"/></div>
                 <div class="font-bold text-gray-900 text-sm">VNPay</div>
                 <div class="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1">Simulated payment</div>
               </label>
               
               <label class="border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-gray-300 relative">
                 <input type="radio" name="payment" class="absolute top-3 left-3 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                 <div class="w-12 h-12 bg-gray-100 rounded-lg text-gray-600 flex items-center justify-center mb-2"><Banknote class="w-6 h-6"/></div>
                 <div class="font-bold text-gray-900 text-sm leading-tight">Cash on Delivery</div>
                 <div class="text-[10px] text-gray-500 mt-1">Pay when you receive</div>
               </label>
               
               <label class="border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-gray-300 relative">
                 <input type="radio" name="payment" class="absolute top-3 left-3 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                 <div class="w-12 h-12 bg-gray-100 rounded-lg text-gray-600 flex items-center justify-center mb-2"><CreditCard class="w-6 h-6"/></div>
                 <div class="font-bold text-gray-900 text-sm leading-tight">Card Payment</div>
                 <div class="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1">Simulated payment</div>
               </label>
            </div>
            <p class="text-xs text-gray-500 flex items-center gap-1.5">
              <ShieldCheck class="w-4 h-4" /> All payments are simulated. No real payment is processed in this academic prototype.
            </p>
          </div>

          <!-- 5. Promo Code -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">5</span>
              Promo Code
            </h2>
            <div class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
               <div class="flex items-center gap-3">
                 <span class="bg-white border border-green-200 text-green-800 font-bold px-3 py-1 rounded flex items-center gap-1">GREENTRACE10 <Check class="w-3 h-3"/></span>
                 <span class="text-green-800 font-medium text-sm">Applied</span>
               </div>
               <button class="border border-gray-300 bg-white px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-50">Remove</button>
            </div>
            <p class="text-sm text-gray-600 mt-3">You saved 48,300 VND with GREENTRACE10.</p>
          </div>

          <!-- 6. Order Notes -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">6</span>
              Order Notes <span class="text-gray-400 font-normal text-base">(optional)</span>
            </h2>
            <textarea v-model="notes" maxlength="300" placeholder="Add any notes about your order (e.g., leave at front door, special instructions)..." rows="3" class="w-full border border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-[#1E4B35] resize-none"></textarea>
            <div class="text-right text-xs text-gray-400 mt-1">{{ notes.length }} / 300</div>
          </div>

          <!-- 7. Policy -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">7</span>
              Policy Acknowledgement
            </h2>
            <div class="space-y-3">
               <label class="flex items-center gap-3 cursor-pointer">
                 <input type="checkbox" checked class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5" />
                 <span class="text-sm text-gray-700">I have read and agree to the <strong>Terms of Use.</strong></span>
               </label>
               <label class="flex items-center gap-3 cursor-pointer">
                 <input type="checkbox" checked class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5" />
                 <span class="text-sm text-gray-700">I have read and agree to the <strong>Privacy Policy.</strong></span>
               </label>
               <label class="flex items-center gap-3 cursor-pointer">
                 <input type="checkbox" checked class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5" />
                 <span class="text-sm text-gray-700">I have read and agree to the <strong>Return Policy.</strong></span>
               </label>
               <label class="flex items-center gap-3 cursor-pointer">
                 <input type="checkbox" checked class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5" />
                 <span class="text-sm text-gray-700">I have read and agree to the <strong>Shipping Policy.</strong></span>
               </label>
            </div>
          </div>

          <button @click="placeOrder" class="w-full py-4 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg shadow-[#1E4B35]/20 mt-4">
            Place Sample Order <Lock class="w-5 h-5" />
          </button>
          
          <p class="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mb-8">
              <Info class="w-4 h-4" /> No real payment is processed in this academic prototype.
          </p>

        </div>

        <!-- Sidebar Summary -->
        <div class="w-full lg:w-[35%]">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
            <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <h3 class="text-xl font-bold text-[#1E4B35]">Order Summary</h3>
              <button class="text-sm font-semibold text-[#1E4B35] flex items-center gap-1"><Edit2 class="w-4 h-4"/> Edit Cart</button>
            </div>
            
            <p class="text-sm font-bold text-gray-900 mb-4">{{ subtotalItems }} items</p>
            
            <!-- Items -->
            <div class="space-y-4 mb-6 border-b border-gray-100 pb-6 max-h-[300px] overflow-y-auto pr-1">
               <div v-for="item in appStore.cart" :key="item.id" class="flex gap-3">
                 <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                   <img :src="item.image_url" :alt="item.name" class="w-full h-full object-cover" />
                 </div>
                 <div class="flex-grow">
                   <div class="flex justify-between">
                     <h4 class="font-bold text-gray-900 text-sm leading-tight max-w-[140px]">{{ item.name }}</h4>
                     <span class="font-bold text-gray-900 text-sm">{{ (parseFloat(item.price) * item.quantity).toLocaleString() }} VND</span>
                   </div>
                   <p class="text-xs text-gray-500 mt-1">{{ item.producer_name || 'Verified Farm' }}</p>
                   <p class="text-[10px] text-gray-400">Qty: {{ item.quantity }}</p>
                   <div class="flex gap-1 mt-2">
                     <span class="text-[9px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded flex items-center gap-1"><ShieldCheck class="w-2.5 h-2.5"/> Batch record available</span>
                   </div>
                 </div>
               </div>
            </div>

            <!-- Totals -->
            <div class="space-y-3 mb-6 border-b border-gray-100 pb-6">
              <div class="flex justify-between text-gray-600 text-sm">
                <span>Subtotal ({{ subtotalItems }} items)</span>
                <span class="font-medium text-gray-900">{{ subtotalPrice.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-green-600 text-sm">
                <span>Discount (GREENTRACE10)</span>
                <span class="font-medium">-{{ discountPrice.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-600 text-sm">
                <span>Standard Shipping</span>
                <span class="font-medium text-gray-900">{{ shippingFee === 0 ? 'FREE' : shippingFee.toLocaleString() + ' VND' }}</span>
              </div>
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-end mb-1">
                <span class="font-bold text-gray-900 text-xl">Total</span>
                <span class="text-2xl font-bold text-[#1E4B35]">{{ totalPrice.toLocaleString() }} VND</span>
              </div>
              <p class="text-xs text-gray-500">Taxes included</p>
            </div>
            
            <!-- Shipping Banner -->
            <div class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-start gap-3 mb-8">
              <Truck class="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 class="text-green-800 font-bold text-sm mb-0.5">Free standard shipping</h4>
                <p class="text-green-700 text-xs leading-tight">for memberships & selected orders from 500,000 VND</p>
              </div>
            </div>

            <!-- Shop with Confidence -->
            <div class="bg-[#F8FAF9] rounded-xl p-6">
               <h3 class="font-bold text-gray-900 mb-4">Shop with confidence</h3>
               <ul class="space-y-4">
                 <li class="flex gap-3">
                   <Lock class="w-5 h-5 text-[#1E4B35] flex-shrink-0" />
                   <div>
                     <h4 class="text-sm font-bold text-gray-900">Secure payments</h4>
                     <p class="text-xs text-gray-500">Your payment information is protected.</p>
                   </div>
                 </li>
                 <li class="flex gap-3">
                   <FileText class="w-5 h-5 text-[#1E4B35] flex-shrink-0" />
                   <div>
                     <h4 class="text-sm font-bold text-gray-900">Supporting records available</h4>
                     <p class="text-xs text-gray-500">Access batch records and lab reports.</p>
                   </div>
                 </li>
                 <li class="flex gap-3">
                   <Leaf class="w-5 h-5 text-[#1E4B35] flex-shrink-0" />
                   <div>
                     <h4 class="text-sm font-bold text-gray-900">Quality guaranteed</h4>
                     <p class="text-xs text-gray-500">Carefully selected and verified products.</p>
                   </div>
                 </li>
                 <li class="flex gap-3">
                   <RotateCcw class="w-5 h-5 text-[#1E4B35] flex-shrink-0" />
                   <div>
                     <h4 class="text-sm font-bold text-gray-900">Easy returns</h4>
                     <p class="text-xs text-gray-500">7-day support for most products.</p>
                   </div>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Need Help Support Banner -->
      <div class="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative">
             <Image class="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg">Need help with your order?</h3>
            <p class="text-gray-600">Our team is here to assist you.</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-6 md:gap-12">
          <div class="flex items-center gap-3">
             <MessageCircle class="w-6 h-6 text-[#1E4B35]" />
             <div>
               <div class="font-bold text-gray-900 text-sm">Live Chat</div>
               <div class="text-xs text-gray-500">Available 8:00 - 20:00</div>
             </div>
          </div>
          <div class="flex items-center gap-3">
             <Mail class="w-6 h-6 text-[#1E4B35]" />
             <div>
               <div class="font-bold text-gray-900 text-sm">Email Support</div>
               <div class="text-xs text-gray-500">support@greentrace.demo</div>
             </div>
          </div>
          <div class="flex items-center gap-3">
             <Phone class="w-6 h-6 text-[#1E4B35]" />
             <div>
               <div class="font-bold text-gray-900 text-sm">Call Us</div>
               <div class="text-xs text-gray-500">+84 912 345 678</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronRight, Check, Edit2, Truck, CreditCard, Banknote, ShieldCheck, Lock, Info, Image, CheckCircle2, FileText, Leaf, RotateCcw, MessageCircle, Mail, Phone } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const appStore = useAppStore()

// Billing / Shipping Form inputs
const name = ref(appStore.user?.full_name || 'Nguyen Van An')
const email = ref(appStore.user?.email || 'an.nguyen@example.demo')
const phone = ref(appStore.user?.phone || '+84 912 345 678')

const address = ref('')
const city = ref('')
const province = ref('')
const postalCode = ref('')
const notes = ref('')

onMounted(async () => {
  try {
    const list = await appStore.fetchAddresses()
    if (list.length > 0) {
      const addr = list[0]
      address.value = addr.street
      city.value = addr.city
      province.value = addr.province
      postalCode.value = addr.postal_code
    } else {
      address.value = '123 Green Street, District 1'
      city.value = 'Ho Chi Minh City'
      province.value = 'Ho Chi Minh City'
      postalCode.value = '700000'
    }
  } catch (e) {
    address.value = '123 Green Street, District 1'
    city.value = 'Ho Chi Minh City'
    province.value = 'Ho Chi Minh City'
    postalCode.value = '700000'
  }
})

// Computeds
const subtotalItems = computed(() => {
  return appStore.cart.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotalPrice = computed(() => {
  return appStore.cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
})

const discountPrice = computed(() => {
  return Math.round(subtotalPrice.value * 0.10)
})

const shippingFee = computed(() => {
  if (subtotalPrice.value >= 500000 || subtotalPrice.value === 0) return 0
  return 30000
})

const totalPrice = computed(() => {
  return Math.max(0, subtotalPrice.value - discountPrice.value + shippingFee.value)
})

const placeOrder = async () => {
  if (appStore.cart.length === 0) {
    alert('Your cart is empty!')
    return
  }
  
  try {
    const orderData = {
      address: `${address.value}, ${city.value}, ${province.value}, ${postalCode.value}`,
      payment_method: 'MoMo',
      notes: notes.value
    }
    await appStore.placeOrder(orderData)
    router.push('/confirmation')
  } catch (error) {
    alert('Failed to place order: ' + error.message)
  }
}
</script>
