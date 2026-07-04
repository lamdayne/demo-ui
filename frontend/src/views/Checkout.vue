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
                {{ appStore.t('contactInfoLabel') }}
              </h2>
              <button 
                @click="isEditingContact = !isEditingContact" 
                class="text-sm font-semibold text-[#1E4B35] flex items-center gap-1"
              >
                <span v-if="isEditingContact" class="flex items-center gap-1"><Check class="w-4 h-4"/> Done</span>
                <span v-else class="flex items-center gap-1"><Edit2 class="w-4 h-4"/> Edit</span>
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('fullName') }}</label>
                <input 
                  type="text" 
                  v-model="name" 
                  :disabled="!isEditingContact" 
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35] disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-250 transition duration-200" 
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('emailAddress') }}</label>
                <input 
                  type="email" 
                  v-model="email" 
                  :disabled="!isEditingContact" 
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35] disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-250 transition duration-200" 
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('phoneNumber') }}</label>
                <input 
                  type="text" 
                  v-model="phone" 
                  :disabled="!isEditingContact" 
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35] disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-250 transition duration-200" 
                />
              </div>
            </div>
          </div>

          <!-- 2. Shipping Address -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">2</span>
                {{ appStore.t('shippingAddress') }}
              </h2>
              <router-link to="/account" class="text-xs font-semibold text-[#1E4B35] flex items-center gap-1">
                <MapPin class="w-3.5 h-3.5"/> Manage in My Account
              </router-link>
            </div>

            <!-- Saved Addresses list -->
            <div v-if="savedAddresses.length > 0" class="mb-6">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {{ appStore.lang === 'vi' ? 'Chọn Địa Chỉ Đã Lưu' : 'Select a Saved Address' }}
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="addr in savedAddresses" 
                  :key="addr.id"
                  @click="selectSavedAddress(addr)"
                  class="border rounded-xl p-4 cursor-pointer transition-all duration-205 text-left relative"
                  :class="selectedAddressId === addr.id ? 'border-[#1E4B35] bg-[#F0FDF4] ring-1 ring-[#1E4B35]/25' : 'border-gray-200 hover:border-gray-300'"
                >
                  <div class="flex items-start gap-3">
                    <input 
                      type="radio" 
                      :value="addr.id" 
                      :checked="selectedAddressId === addr.id"
                      class="text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4 mt-0.5 cursor-pointer" 
                    />
                    <div>
                      <div class="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                        {{ addr.recipient }}
                        <span v-if="addr.is_default" class="bg-green-150 text-green-800 text-[8px] px-1.5 py-0.5 rounded font-bold">Default</span>
                      </div>
                      <div class="text-[11px] text-gray-650 mt-1 leading-relaxed">
                        {{ addr.street }}
                        <br/>
                        {{ addr.city }}, {{ addr.country }}
                      </div>
                      <div class="text-[10px] text-gray-500 mt-1 font-medium">
                        {{ addr.phone }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Custom Address option -->
                <div 
                  @click="selectCustomAddress"
                  class="border rounded-xl p-4 cursor-pointer transition-all duration-205 text-left flex items-start gap-3"
                  :class="selectedAddressId === 'new' ? 'border-[#1E4B35] bg-[#F0FDF4] ring-1 ring-[#1E4B35]/25' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input 
                    type="radio" 
                    value="new" 
                    :checked="selectedAddressId === 'new'"
                    class="text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4 mt-0.5 cursor-pointer" 
                  />
                  <div>
                    <div class="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                      <span class="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">+</span>
                      {{ appStore.lang === 'vi' ? 'Địa chỉ khác' : 'New Address' }}
                    </div>
                    <div class="text-[11px] text-gray-550 mt-1 leading-relaxed">
                      {{ appStore.lang === 'vi' ? 'Nhập thủ công địa chỉ giao hàng mới' : 'Manually input a new shipping address below' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Manual Fields -->
            <div class="mt-4 pt-4 border-t border-gray-100" v-if="selectedAddressId === 'new' || savedAddresses.length === 0">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                {{ appStore.lang === 'vi' ? 'Chi Tiết Địa Chỉ Giao Hàng' : 'Shipping Address Details' }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('streetAddress') }}</label>
                  <input type="text" v-model="address" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1.5">Apartment, suite, etc. (optional)</label>
                  <input type="text" placeholder="Apartment 5B" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <div>
                  <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('provinceCity') }}</label>
                  <input type="text" v-model="city" class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35]" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('district') }}</label>
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
            
            <div class="bg-gray-50 rounded-xl p-4 mt-2 text-left" v-else>
              <p class="text-xs text-gray-500 flex items-start gap-2">
                <Info class="w-4 h-4 text-[#1E4B35] flex-shrink-0 mt-0.5" />
                <span>
                  {{ appStore.lang === 'vi' ? 'Bạn đang chọn địa chỉ đã lưu. Để thay đổi, vui lòng chọn "Địa chỉ khác" hoặc cập nhật trong trang tài khoản.' : 'You are using a saved address. Select "New Address" to input a different shipping destination.' }}
                </span>
              </p>
            </div>
          </div>

          <!-- 3. Delivery Method -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">3</span>
              {{ appStore.lang === 'vi' ? 'Phương thức giao hàng' : 'Delivery Method' }}
            </h2>
            <div class="space-y-3">
              <label 
                v-for="method in deliveryMethods" 
                :key="method.id" 
                class="flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200"
                :class="selectedDelivery === method.id ? 'border-[#1E4B35] bg-[#F0FDF4]' : 'border-gray-200 bg-white hover:border-gray-300'"
              >
                <div class="flex items-center gap-4">
                  <input 
                    type="radio" 
                    :value="method.id" 
                    v-model="selectedDelivery" 
                    name="delivery" 
                    class="text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5 cursor-pointer" 
                  />
                  <img :src="method.logo" :alt="method.carrier" class="h-8 w-auto object-contain flex-shrink-0 bg-white p-0.5 rounded" />
                  <div class="text-left">
                    <div class="font-bold text-gray-900 text-sm">{{ method.name }}</div>
                    <div class="text-xs text-gray-500 mt-0.5">{{ appStore.lang === 'vi' ? method.descVi : method.desc }}</div>
                  </div>
                </div>
                <div class="font-bold text-gray-900 text-sm">
                  {{ subtotalPrice >= 500000 ? (appStore.lang === 'vi' ? 'Miễn phí' : 'Free') : method.price.toLocaleString() + ' VND' }}
                </div>
              </label>
            </div>
          </div>

          <!-- 4. Payment Method -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">4</span>
              {{ appStore.t('paymentMethod') }}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
               <label class="rounded-xl p-4 flex flex-col items-center text-center cursor-pointer relative" :class="paymentMethod === 'VNPay' ? 'border-2 border-[#1E4B35] bg-[#F8FAF9]' : 'border border-gray-200 hover:border-gray-300 bg-white'">
                 <input type="radio" value="VNPay" v-model="paymentMethod" name="payment" class="absolute top-3 left-3 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                 <div class="w-12 h-12 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center mb-2"><CreditCard class="w-6 h-6"/></div>
                 <div class="font-bold text-gray-900 text-sm">VNPay</div>
                 <div class="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1">Simulated payment</div>
               </label>
               
               <label class="rounded-xl p-4 flex flex-col items-center text-center cursor-pointer relative" :class="paymentMethod === 'COD' ? 'border-2 border-[#1E4B35] bg-[#F8FAF9]' : 'border border-gray-200 hover:border-gray-300 bg-white'">
                 <input type="radio" value="COD" v-model="paymentMethod" name="payment" class="absolute top-3 left-3 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                 <div class="w-12 h-12 bg-gray-100 rounded-lg text-gray-600 flex items-center justify-center mb-2"><Banknote class="w-6 h-6"/></div>
                 <div class="font-bold text-gray-900 text-sm leading-tight">{{ appStore.t('codLabel') }}</div>
                 <div class="text-[10px] text-gray-500 mt-1">Pay when you receive</div>
               </label>
            </div>
            <p class="text-xs text-gray-500 flex items-center gap-1.5">
              <ShieldCheck class="w-4 h-4" /> All payments are simulated. No real payment is processed in this academic prototype.
            </p>

            <!-- VNPay Details or Link Prompt -->
            <div v-if="paymentMethod === 'VNPay'" class="mt-4 p-4 rounded-xl border border-dashed text-left bg-white" :class="defaultOnlinePaymentMethod ? 'border-[#1E4B35] bg-[#F8FAF9]' : 'border-amber-300 bg-amber-50'">
              <!-- If default payment method exists -->
              <div v-if="defaultOnlinePaymentMethod" class="flex justify-between items-center text-xs">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" :class="defaultOnlinePaymentMethod.type === 'wallet' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-700 border border-gray-100'">
                    <span v-if="defaultOnlinePaymentMethod.type === 'wallet'">VNP</span>
                    <CreditCard v-else class="w-4 h-4"/>
                  </div>
                  <div>
                    <div class="font-bold text-gray-900">
                      {{ defaultOnlinePaymentMethod.type === 'wallet' ? (appStore.lang === 'vi' ? 'Ví VNPay' : 'VNPay Wallet') : (appStore.lang === 'vi' ? 'Thẻ Visa đuôi ' : 'Visa ending in ') + defaultOnlinePaymentMethod.card_number.slice(-4) }}
                    </div>
                    <div class="text-[10px] text-gray-500 mt-0.5">
                      <span v-if="defaultOnlinePaymentMethod.type === 'wallet'">{{ appStore.lang === 'vi' ? 'Liên kết qua SĐT: ' : 'Linked phone: ' }} {{ maskPhoneNumber(defaultOnlinePaymentMethod.phone) }}</span>
                      <span v-else>{{ appStore.lang === 'vi' ? 'Hết hạn: ' : 'Expires: ' }} {{ defaultOnlinePaymentMethod.expiry }}</span>
                    </div>
                  </div>
                </div>
                <button @click="openAddPaymentModal" class="text-[10px] font-bold text-[#1E4B35] hover:underline">
                  {{ appStore.lang === 'vi' ? '+ Thêm phương thức khác' : '+ Add another' }}
                </button>
              </div>

              <!-- If no payment method exists -->
              <div v-else class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <div class="font-bold text-amber-800">{{ appStore.lang === 'vi' ? 'Chưa có phương thức thanh toán online' : 'No online payment method linked' }}</div>
                  <p class="text-[10px] text-amber-700 mt-0.5">{{ appStore.lang === 'vi' ? 'Vui lòng liên kết ví VNPay hoặc thẻ tín dụng để tiếp tục.' : 'Please link a VNPay wallet or credit card to proceed.' }}</p>
                </div>
                <button @click="openAddPaymentModal" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-3 py-1.5 rounded-lg font-bold transition flex-shrink-0">
                  {{ appStore.lang === 'vi' ? 'Thêm phương thức' : 'Link Method' }}
                </button>
              </div>
            </div>
          </div>

          <!-- 5. Promo Code -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">5</span>
              Promo Code
            </h2>
            
            <div v-if="appliedCoupon" class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
               <div class="flex items-center gap-3">
                 <span class="bg-white border border-green-200 text-green-800 font-bold px-3 py-1 rounded flex items-center gap-1">
                   {{ appliedCoupon.code }} 
                   <Check class="w-3 h-3"/>
                 </span>
                 <span class="text-green-800 font-medium text-sm">Applied</span>
               </div>
               <button @click="removeCoupon" class="border border-gray-300 bg-white px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition">Remove</button>
            </div>
            
            <div v-else class="flex gap-2">
              <input 
                type="text" 
                v-model="couponCodeInput" 
                placeholder="Enter promo code (e.g. GREENTRACE10)"
                class="flex-grow border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-[#1E4B35] uppercase text-xs"
              />
              <button 
                @click="applyCoupon"
                class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition"
              >
                Apply
              </button>
            </div>
            
            <p v-if="appliedCoupon" class="text-sm text-gray-600 mt-3">
              You saved {{ discountPrice.toLocaleString() }} VND with {{ appliedCoupon.code }}.
            </p>
          </div>

          <!-- 6. Order Notes -->
          <div class="border border-gray-200 rounded-xl p-6 bg-white">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <span class="w-6 h-6 rounded-full bg-[#1E4B35] text-white text-sm flex items-center justify-center">6</span>
              {{ appStore.t('additionalNotes') }} <span class="text-gray-400 font-normal text-base">(optional)</span>
            </h2>
            <textarea v-model="notes" maxlength="300" :placeholder="appStore.t('notesPlaceholder')" rows="3" class="w-full border border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-[#1E4B35] resize-none"></textarea>
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
            {{ appStore.t('placeOrder') }} <Lock class="w-5 h-5" />
          </button>
          
          <p class="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mb-8">
              <Info class="w-4 h-4" /> No real payment is processed in this academic prototype.
          </p>

        </div>

        <!-- Sidebar Summary -->
        <div class="w-full lg:w-[35%]">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
            <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <h3 class="text-xl font-bold text-[#1E4B35]">{{ appStore.t('summary') }}</h3>
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
                <span>{{ appStore.t('subtotal') }} ({{ subtotalItems }} {{ appStore.t('itemsLabel') }})</span>
                <span class="font-medium text-gray-900">{{ subtotalPrice.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-green-600 text-sm">
                <span>{{ appStore.t('discount') }} <span v-if="appliedCoupon">({{ appliedCoupon.code }})</span></span>
                <span class="font-medium">-{{ discountPrice.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-600 text-sm">
                <span>{{ appStore.t('shipping') }}</span>
                <span class="font-medium text-gray-900">{{ shippingFee === 0 ? appStore.t('free') : shippingFee.toLocaleString() + ' VND' }}</span>
              </div>
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-end mb-1">
                <span class="font-bold text-gray-900 text-xl">{{ appStore.t('total') }}</span>
                <span class="text-2xl font-bold text-[#1E4B35]">{{ totalPrice.toLocaleString() }} VND</span>
              </div>
              <p class="text-xs text-gray-500">{{ appStore.t('taxesIncluded') }}</p>
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

  <!-- ADD PAYMENT METHOD MODAL -->
  <div v-if="isPaymentModalOpen" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-100 text-left">
      <div class="flex justify-between items-center border-b border-gray-100 pb-3">
        <h3 class="font-bold text-gray-900 text-base">{{ appStore.lang === 'vi' ? 'Liên kết phương thức thanh toán' : 'Link Payment Method' }}</h3>
        <button @click="isPaymentModalOpen = false" class="text-gray-400 hover:text-gray-600 font-bold text-lg">&times;</button>
      </div>

      <form @submit.prevent="saveNewPaymentMethod" class="space-y-3 text-xs">
        <div>
          <label class="font-bold text-gray-500 block mb-1">{{ appStore.lang === 'vi' ? 'Loại thanh toán' : 'Payment Type' }}</label>
          <select v-model="newPaymentForm.type" class="w-full border border-gray-300 rounded-lg p-2.5">
            <option value="wallet">{{ appStore.lang === 'vi' ? 'Ví VNPay' : 'VNPay Wallet' }}</option>
            <option value="card">{{ appStore.lang === 'vi' ? 'Thẻ tín dụng (Credit Card)' : 'Credit Card' }}</option>
          </select>
        </div>

        <!-- If Wallet (VNPay) -->
        <div v-if="newPaymentForm.type === 'wallet'">
          <label class="font-bold text-gray-500 block mb-1">{{ appStore.lang === 'vi' ? 'Số điện thoại liên kết VNPay' : 'VNPay Linked Phone Number' }}</label>
          <input type="text" v-model="newPaymentForm.phone" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. +84 912 345 678" required />
        </div>

        <!-- If Card -->
        <div v-else-if="newPaymentForm.type === 'card'" class="space-y-3">
          <div>
            <label class="font-bold text-gray-500 block mb-1">{{ appStore.lang === 'vi' ? 'Tên trên thẻ' : 'Cardholder Name' }}</label>
            <input type="text" v-model="newPaymentForm.cardholder_name" class="w-full border border-gray-300 rounded-lg p-2.5 uppercase" placeholder="e.g. NGUYEN VAN AN" required />
          </div>
          <div>
            <label class="font-bold text-gray-500 block mb-1">{{ appStore.lang === 'vi' ? 'Số thẻ' : 'Card Number' }}</label>
            <input type="text" v-model="newPaymentForm.card_number" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 4111 2222 3333 4444" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-gray-500 block mb-1">{{ appStore.lang === 'vi' ? 'Ngày hết hạn' : 'Expiration Date' }}</label>
              <input type="text" v-model="newPaymentForm.expiry" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="MM/YYYY" required />
            </div>
            <div>
              <label class="font-bold text-gray-500 block mb-1">CVV / CVC</label>
              <input type="password" maxlength="3" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="***" required />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <button type="button" @click="isPaymentModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700">{{ appStore.lang === 'vi' ? 'Hủy' : 'Cancel' }}</button>
          <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg font-bold transition">{{ appStore.lang === 'vi' ? 'Liên kết' : 'Link' }}</button>
        </div>
      </form>
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
const name = ref('Nguyen Van An')
const email = ref('an.nguyen@example.demo')
const phone = ref('+84 912 345 678')

const isEditingContact = ref(false)

const address = ref('')
const city = ref('')
const province = ref('')
const postalCode = ref('')
const notes = ref('')
const paymentMethod = ref('COD')

const isPaymentModalOpen = ref(false)
const newPaymentForm = ref({ type: 'wallet', phone: '', cardholder_name: '', card_number: '', expiry: '' })

const defaultOnlinePaymentMethod = computed(() => {
  return appStore.paymentMethods.find(m => m.is_default) || appStore.paymentMethods[0] || null
})

const openAddPaymentModal = () => {
  newPaymentForm.value = {
    type: 'wallet',
    phone: phone.value || appStore.user?.phone || '',
    cardholder_name: name.value || appStore.user?.name || '',
    card_number: '',
    expiry: ''
  }
  isPaymentModalOpen.value = true
}

const saveNewPaymentMethod = () => {
  appStore.addPaymentMethod(newPaymentForm.value)
  isPaymentModalOpen.value = false
  paymentMethod.value = 'VNPay'
}

const maskPhoneNumber = (num) => {
  if (!num) return ''
  if (num.length <= 6) return num
  return num.slice(0, 4) + ' *** *** ' + num.slice(-3)
}

const savedAddresses = ref([])
const selectedAddressId = ref('new')

const selectSavedAddress = (addr) => {
  selectedAddressId.value = addr.id
  address.value = addr.street || ''
  city.value = addr.city || ''
  province.value = addr.province || addr.city || ''
  postalCode.value = addr.postal_code || addr.postalCode || '700000'
}

const selectCustomAddress = () => {
  selectedAddressId.value = 'new'
  address.value = ''
  city.value = ''
  province.value = ''
  postalCode.value = ''
}

const selectedDelivery = ref('standard')
const deliveryMethods = ref([
  {
    id: 'standard',
    name: 'Giao tiết kiệm (Standard Eco)',
    carrier: 'Viettel Post',
    desc: 'Delivery in 2-3 business days',
    descVi: 'Giao trong 2-3 ngày làm việc',
    price: 12000,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Viettel_Post_logo.svg'
  },
  {
    id: 'fast',
    name: 'Giao nhanh (Next-day)',
    carrier: 'Giao Hàng Nhanh (GHN)',
    desc: 'Delivery tomorrow',
    descVi: 'Giao hàng vào ngày mai',
    price: 18000,
    logo: 'https://static.ybox.vn/2022/8/5/1660242139108-logo.png'
  },
  {
    id: 'chilled',
    name: 'Giao bảo quản lạnh (Chilled)',
    carrier: 'ABA cooltrans',
    desc: '1-2 days (Temperature 0 - 4°C)',
    descVi: 'Giao 1-2 ngày (Nhiệt độ 0 - 4°C)',
    price: 20000,
    logo: 'https://static.ybox.vn/2025/3/5/1742532386651-ABA-cooltrans-logo.jpg'
  },
  {
    id: 'express',
    name: 'Giao tức thời (Same-day)',
    carrier: 'Ahamove',
    desc: 'Deliver today (6-8 hours)',
    descVi: 'Giao hàng trong ngày (6-8 giờ)',
    price: 25000,
    logo: 'https://pos.nvncdn.com/4e732c-26/art/artCT/20200110_0VQJNbkpdGU2xAWRTyUbrMWM.png'
  },
  {
    id: 'frozen',
    name: 'Giao bảo quản đông lạnh (Frozen)',
    carrier: 'ABA cooltrans',
    desc: '1-2 days (Temperature < -18°C)',
    descVi: 'Giao 1-2 ngày (Nhiệt độ < -18°C)',
    price: 25000,
    logo: 'https://static.ybox.vn/2025/3/5/1742532386651-ABA-cooltrans-logo.jpg'
  }
])

onMounted(async () => {
  if (appStore.token) {
    appStore.fetchPaymentMethods()
    if (appStore.paymentMethods.length > 0) {
      paymentMethod.value = 'VNPay'
    } else {
      paymentMethod.value = 'COD'
    }

    try {
      await appStore.fetchProfile()
      if (appStore.user) {
        name.value = appStore.user.name || appStore.user.full_name || name.value
        email.value = appStore.user.email || email.value
        phone.value = appStore.user.phone || phone.value
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    }

    try {
      const list = await appStore.fetchAddresses()
      savedAddresses.value = list
      if (list && list.length > 0) {
        const defaultAddr = list.find(a => a.is_default) || list[0]
        selectSavedAddress(defaultAddr)
      } else {
        selectedAddressId.value = 'new'
        address.value = '123 Green Street, District 1'
        city.value = 'Ho Chi Minh City'
        province.value = 'Ho Chi Minh City'
        postalCode.value = '700000'
      }
    } catch (e) {
      console.error('Failed to load addresses:', e)
      selectedAddressId.value = 'new'
      address.value = '123 Green Street, District 1'
      city.value = 'Ho Chi Minh City'
      province.value = 'Ho Chi Minh City'
      postalCode.value = '700000'
    }
  } else {
    selectedAddressId.value = 'new'
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

const couponCodeInput = ref('')
const appliedCoupon = ref(null)

const applyCoupon = async () => {
  if (!couponCodeInput.value.trim()) return
  try {
    const coupon = await appStore.validateCouponCode(couponCodeInput.value.trim(), subtotalPrice.value)
    appliedCoupon.value = coupon
    appStore.triggerToast((appStore.t('couponAppliedSuccess') || 'Coupon applied successfully!').replace('{code}', coupon.code))
  } catch (error) {
    appStore.triggerToast(error.message || appStore.t('invalidCoupon') || 'Invalid discount coupon code')
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCodeInput.value = ''
  appStore.triggerToast(appStore.t('couponRemoved') || 'Discount coupon code removed.')
}

const discountPrice = computed(() => {
  if (!appliedCoupon.value) return 0
  if (appliedCoupon.value.discount_type === 'percentage') {
    return Math.round(subtotalPrice.value * (parseFloat(appliedCoupon.value.discount_value) / 100))
  } else {
    return Math.round(parseFloat(appliedCoupon.value.discount_value))
  }
})

const shippingFee = computed(() => {
  if (subtotalPrice.value >= 500000 || subtotalPrice.value === 0) return 0
  const method = deliveryMethods.value.find(m => m.id === selectedDelivery.value)
  return method ? method.price : 12000
})

const totalPrice = computed(() => {
  return Math.max(0, subtotalPrice.value - discountPrice.value + shippingFee.value)
})

const placeOrder = async () => {
  if (appStore.cart.length === 0) {
    appStore.triggerToast(appStore.lang === 'vi' ? 'Giỏ hàng của bạn đang trống!' : 'Your cart is empty!')
    return
  }
  
  if (paymentMethod.value === 'VNPay' && !defaultOnlinePaymentMethod.value) {
    appStore.triggerToast(appStore.lang === 'vi' 
      ? 'Vui lòng liên kết phương thức thanh toán online trước khi đặt hàng!' 
      : 'Please link an online payment method before placing your order!'
    )
    openAddPaymentModal()
    return
  }
  
  try {
    const addressString = `${name.value} (${phone.value}) - ${address.value}, ${city.value}, ${province.value}, ${postalCode.value}`
    
    const orderData = {
      address: addressString,
      payment_method: paymentMethod.value,
      notes: notes.value,
      total_price: totalPrice.value
    }
    const placedOrder = await appStore.placeOrder(orderData)
    if (placedOrder && placedOrder.id) {
      router.push({ path: '/confirmation', query: { id: placedOrder.id } })
    } else {
      router.push('/confirmation')
    }
  } catch (error) {
    appStore.triggerToast((appStore.lang === 'vi' ? 'Đặt hàng thất bại: ' : 'Failed to place order: ') + error.message)
  }
}
</script>
