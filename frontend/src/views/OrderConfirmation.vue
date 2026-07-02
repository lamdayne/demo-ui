<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">{{ appStore.t('home') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/cart" class="hover:text-[#1E4B35]">{{ appStore.t('cart') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/checkout" class="hover:text-[#1E4B35]">{{ appStore.t('checkout') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">{{ appStore.t('orderConfirmationTitle') }}</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 max-w-6xl pt-16 text-center space-y-4">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-[#1E4B35] border-r-transparent"></div>
      <p class="text-gray-500 text-sm font-semibold">Loading order details...</p>
    </div>

    <!-- Order Not Found State -->
    <div v-else-if="!order" class="container mx-auto px-4 max-w-6xl pt-16 text-center space-y-6">
      <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
        <Info class="w-8 h-8" />
      </div>
      <div>
        <h2 class="text-xl font-extrabold text-gray-900">Order Not Found</h2>
        <p class="text-xs text-gray-500 mt-2">We couldn't retrieve the details for this order. It might not exist or belong to another account.</p>
      </div>
      <router-link to="/products" class="inline-block bg-[#1E4B35] hover:bg-[#163a29] text-white px-6 py-3 rounded-xl text-xs font-bold transition">
        {{ appStore.t('continueShopping') }}
      </router-link>
    </div>

    <!-- Main Content -->
    <div v-else class="container mx-auto px-4 max-w-6xl pt-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-1">{{ appStore.t('orderConfirmationTitle') }}</h1>
      <p class="text-xs text-gray-500 mb-8">{{ appStore.t('thankYouReceived') }}</p>

      <!-- Large Confirmation Banner -->
      <div class="bg-[#F8FAF9] border border-green-150 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm mb-8">
        <div class="w-16 h-16 rounded-full bg-[#1E4B35] text-white flex items-center justify-center flex-shrink-0">
          <Check class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{{ appStore.t('orderNumber') }}</h2>
          <div class="text-2xl font-extrabold text-gray-900 font-mono mb-1">GT-{{ order.id }}</div>
          <p class="text-xs text-gray-500">Your sample order has been placed. A confirmation notification has been registered to your dashboard.</p>
        </div>
      </div>

      <!-- Order Stats row (5 Columns) -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div class="space-y-1.5 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><Calendar class="w-3.5 h-3.5 text-gray-400" /> {{ appStore.t('orderDate') }}</span>
          <div class="text-[11px] font-bold text-gray-900">{{ dateStr }}</div>
          <div class="text-[9px] text-gray-400">{{ timeStr }} (ICT)</div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><CreditCard class="w-3.5 h-3.5 text-gray-400" /> {{ appStore.t('paymentMethod') }}</span>
          <div class="text-[11px] font-bold text-gray-900">{{ order.payment_method }}</div>
          <div><span class="bg-green-50 border border-green-200 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded">Paid</span></div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><Truck class="w-3.5 h-3.5 text-gray-400" /> {{ appStore.t('shippingMethod') }}</span>
          <div class="text-[11px] font-bold text-gray-900">Standard Shipping</div>
          <div class="text-[9px] text-gray-400">2-4 business days</div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center md:col-span-1">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><MapPin class="w-3.5 h-3.5 text-gray-400" /> {{ appStore.t('shippingAddress') }}</span>
          <div class="text-[11px] font-bold text-gray-900 leading-tight">{{ appStore.user?.name || 'Nguyen Van An' }}</div>
          <div class="text-[9px] text-gray-500 leading-normal">{{ formatAddress(order.shipping_address) }}</div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><Clock class="w-3.5 h-3.5 text-gray-400" /> {{ appStore.t('nextStep') }}</span>
          <div class="text-[11px] text-gray-600 leading-snug">{{ appStore.t('reviewingOrderText') }}</div>
        </div>
      </div>

      <!-- Items List & Summary columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        <!-- Order Items Column -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 text-sm mb-4">{{ appStore.t('orderItems') }}</h3>
            
            <div class="divide-y divide-gray-100">
              <!-- Dynamic Items -->
              <div v-for="item in itemsList" :key="item.name" class="py-4 flex gap-4 items-center">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img :src="item.image" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h4 class="font-bold text-gray-900 text-xs">{{ item.name }}</h4>
                  <div class="text-[10px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>{{ appStore.t('batchProducer') }}: <span class="font-semibold">{{ item.producer }}</span></span>
                    <span>Batch: <span class="font-mono text-[#1E4B35] font-bold">{{ item.batch }}</span></span>
                  </div>
                  <div class="flex gap-2 pt-1 text-[8px] font-bold">
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Leaf class="w-2.5 h-2.5"/> Traceable</span>
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Check class="w-2.5 h-2.5"/> Verified</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="font-bold text-gray-900 text-xs">{{ item.price.toLocaleString() }} VND</div>
                  <div class="text-[10px] text-gray-400">Qty: {{ item.qty }}</div>
                </div>
              </div>
            </div>

            <!-- Footer of list -->
            <div class="flex justify-between items-center border-t border-gray-100 pt-4 text-xs font-bold text-gray-700 mt-2">
              <span>{{ itemsList.length }} {{ appStore.t('itemsLabel') }}</span>
              <span class="text-green-600 flex items-center gap-1"><ShieldCheck class="w-4 h-4" /> {{ appStore.t('allProductsTraceable') }}</span>
            </div>
          </div>
        </div>

        <!-- Order Summary Column -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 class="font-bold text-gray-900 text-sm">{{ appStore.t('summary') }}</h3>
            
            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between text-gray-500">
                <span>{{ appStore.t('subtotal') }} ({{ itemsList.length }} {{ appStore.t('itemsLabel') }})</span>
                <span class="font-semibold text-gray-900">{{ subtotal.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ appStore.t('discount') }}</span>
                <span class="font-semibold text-green-600">-{{ discount.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ appStore.t('shippingFee') }}</span>
                <span class="font-semibold text-gray-900">{{ shipping.toLocaleString() }} VND</span>
              </div>
              
              <div class="border-t border-gray-100 pt-3 flex justify-between font-bold text-sm text-gray-900">
                <span>{{ appStore.t('totalPaid') }}</span>
                <span class="text-lg font-extrabold text-[#1E4B35]">{{ totalPaid.toLocaleString() }} VND</span>
              </div>
              <p class="text-[9px] text-gray-400">Taxes included • Total calculated at checkout</p>
            </div>

            <!-- Free shipping banner -->
            <div class="border border-green-100 rounded-xl p-3 bg-green-50/50 flex gap-3 items-center text-[10px] text-gray-700 leading-snug">
              <Truck class="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <span class="font-bold">Free standard shipping</span> for rewards & sample orders from 500,000 VND.
              </div>
            </div>

            <!-- Promo applied tag if discount exists -->
            <div v-if="discount > 0" class="border border-gray-200 rounded-xl p-3 flex justify-between items-center text-xs">
              <div class="flex flex-col">
                <span class="text-[9px] text-gray-400">{{ appStore.t('promoApplied') }}</span>
                <span class="font-bold text-gray-800">GREENTRACE10</span>
              </div>
              <Check class="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Order Progress Stepper -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-sm mb-8">
        <h3 class="font-bold text-gray-900 text-sm mb-8">{{ appStore.t('orderProgress') }}</h3>
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 relative max-w-4xl mx-auto">
          <!-- Connector line (desktop) -->
          <div class="absolute left-6 top-1/2 -translate-y-1/2 right-6 h-0.5 bg-gray-250 hidden md:block z-0"></div>

          <!-- Step 1 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10">
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                 :class="activeStepIndex >= 1 ? 'bg-[#1E4B35] text-white shadow-[#1E4B35]/25' : 'bg-gray-100 text-gray-400'">
              <Check class="w-5 h-5" v-if="activeStepIndex > 1" />
              <Clock class="w-5 h-5" v-else />
            </div>
            <div>
              <div class="font-bold text-gray-900 text-xs">{{ appStore.t('orderReceivedStep') }}</div>
              <div class="text-[9px] text-gray-400">{{ dateStr }} • {{ timeStr }}</div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeStepIndex < 2 }">
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                 :class="activeStepIndex > 2 ? 'bg-[#1E4B35] text-white' : activeStepIndex === 2 ? 'bg-green-50 text-[#1E4B35]' : 'bg-gray-100 text-gray-400'">
              <Check class="w-5 h-5" v-if="activeStepIndex > 2" />
              <ClipboardList class="w-5 h-5" v-else />
            </div>
            <div>
              <div class="font-bold text-xs" :class="activeStepIndex === 2 ? 'text-[#1E4B35]' : 'text-gray-900'">{{ appStore.t('reviewingStep') }}</div>
              <div class="text-[9px] font-semibold" :class="activeStepIndex === 2 ? 'text-[#1E4B35]' : 'text-gray-400'">
                {{ activeStepIndex > 2 ? 'Completed' : activeStepIndex === 2 ? 'In progress' : 'Pending' }}
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeStepIndex < 3 }">
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                 :class="activeStepIndex > 3 ? 'bg-[#1E4B35] text-white' : activeStepIndex === 3 ? 'bg-green-50 text-[#1E4B35]' : 'bg-gray-100 text-gray-400'">
              <Check class="w-5 h-5" v-if="activeStepIndex > 3" />
              <Package class="w-5 h-5" v-else />
            </div>
            <div>
              <div class="font-bold text-xs" :class="activeStepIndex === 3 ? 'text-[#1E4B35]' : 'text-gray-900'">{{ appStore.t('packingStep') }}</div>
              <div class="text-[9px] font-semibold" :class="activeStepIndex === 3 ? 'text-[#1E4B35]' : 'text-gray-400'">
                {{ activeStepIndex > 3 ? 'Completed' : activeStepIndex === 3 ? 'In progress' : 'Pending' }}
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeStepIndex < 4 }">
            <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                 :class="activeStepIndex >= 4 ? 'bg-green-50 text-[#1E4B35]' : 'bg-gray-100 text-gray-400'">
              <Truck class="w-5 h-5" />
            </div>
            <div>
              <div class="font-bold text-xs" :class="activeStepIndex === 4 ? 'text-[#1E4B35]' : 'text-gray-900'">{{ appStore.t('readyToShipStep') }}</div>
              <div class="text-[9px] font-semibold" :class="activeStepIndex === 4 ? 'text-[#1E4B35]' : 'text-gray-400'">
                {{ activeStepIndex >= 4 ? 'Ready' : 'Pending' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- What happens next (4 Columns) -->
      <div class="mb-12">
        <h3 class="font-bold text-gray-900 text-sm mb-6">{{ appStore.t('whatHappensNext') }}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><ClipboardList class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('step1Title') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.t('step1Desc') }}</p>
            </div>
          </div>

          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Package class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('step2Title') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.t('step2Desc') }}</p>
            </div>
          </div>

          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Truck class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('step3Title') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.t('step3Desc') }}</p>
            </div>
          </div>

          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Mail class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('step4Title') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.t('step4Desc') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid (4 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><MapPin class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">{{ appStore.t('trackOrder') }}</h4>
            <p class="text-[10px] text-gray-500">Track your shipment and delivery updates.</p>
          </div>
          <button @click="simulatedAction" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition mt-6">{{ appStore.t('trackOrder') }}</button>
        </div>

        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><FileText class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">{{ appStore.t('viewOrderDetails') }}</h4>
            <p class="text-[10px] text-gray-500">See full order details, items, and status.</p>
          </div>
          <router-link to="/orders" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold text-center block transition mt-6">{{ appStore.t('viewOrderDetails') }}</router-link>
        </div>

        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><ShoppingCart class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">{{ appStore.t('continueShopping') }}</h4>
            <p class="text-[10px] text-gray-500">Explore more traceable products.</p>
          </div>
          <router-link to="/products" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold text-center block transition mt-6">{{ appStore.t('continueShopping') }}</router-link>
        </div>

        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><Download class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">{{ appStore.t('downloadInvoice') }}</h4>
            <p class="text-[10px] text-gray-500">Download your sample invoice (PDF).</p>
          </div>
          <button @click="simulatedInvoice" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition mt-6">{{ appStore.t('downloadInvoice') }}</button>
        </div>
      </div>

      <!-- Need help banner -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35] flex-shrink-0">
            <Headphones class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('needHelpSampleOrder') }}</h4>
            <p class="text-xs text-gray-500 mt-0.5">{{ appStore.t('needHelpSampleOrderDesc') }}</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="text-xs text-gray-600 space-y-1">
            <div class="flex items-center gap-1.5"><Mail class="w-4 h-4 text-gray-400"/> support@greentrace.demo</div>
            <div class="flex items-center gap-1.5"><Phone class="w-4 h-4 text-gray-400"/> +84 123 456 789</div>
          </div>
          <router-link to="/support" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-xs font-bold transition">
            {{ appStore.t('contactSupport') }}
          </router-link>
        </div>
      </div>

      <!-- Explore more columns (2 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-12 h-12 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Leaf class="w-6 h-6"/></div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">{{ appStore.t('reviewBatchRecords') }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed mb-4">{{ appStore.t('reviewBatchRecordsDesc') }}</p>
            <router-link to="/traceability" class="text-xs font-bold text-[#1E4B35] hover:underline flex items-center gap-0.5">View Batch Records &rarr;</router-link>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-12 h-12 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><User class="w-6 h-6"/></div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">{{ appStore.t('viewProducerProfiles') }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed mb-4">{{ appStore.t('viewProducerProfilesDesc') }}</p>
            <router-link to="/producers" class="text-xs font-bold text-[#1E4B35] hover:underline flex items-center gap-0.5">Explore Producers &rarr;</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { ChevronRight, Calendar, CreditCard, Truck, MapPin, Clock, Check, Leaf, ShieldCheck, FileText, Package, Download, Headphones, Mail, Phone, User, ClipboardList, Info } from 'lucide-vue-next'

const route = useRoute()
const appStore = useAppStore()

const order = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const id = route.query.id
    if (id) {
      order.value = await appStore.fetchOrder(id)
    } else {
      await appStore.fetchOrders()
      if (appStore.orders && appStore.orders.length > 0) {
        order.value = appStore.orders[0]
      }
    }
  } catch (e) {
    console.error('Failed to load order confirmation details:', e)
  } finally {
    loading.value = false
  }
})

const dateStr = computed(() => {
  if (!order.value) return ''
  return new Date(order.value.created_at).toLocaleDateString()
})

const timeStr = computed(() => {
  if (!order.value) return ''
  return new Date(order.value.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const formatAddress = (addr) => {
  if (!addr) return ''
  try {
    if (typeof addr === 'string') {
      if (addr.startsWith('"') && addr.endsWith('"')) {
        return JSON.parse(addr)
      }
      return addr
    }
    return JSON.stringify(addr)
  } catch (e) {
    return addr
  }
}

const itemsList = computed(() => {
  if (!order.value || !order.value.items) return []
  return order.value.items.map(item => ({
    name: item.product_name || 'Traceable Farm Product',
    producer: item.producer_name || 'Verified Partner Farm',
    batch: item.batch_id || 'N/A',
    image: item.product_image || 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=80',
    price: parseFloat(item.price),
    qty: item.quantity
  }))
})

const subtotal = computed(() => {
  return itemsList.value.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const shipping = computed(() => {
  return subtotal.value >= 500000 ? 0 : 30000
})

const totalPaid = computed(() => {
  if (!order.value) return 0
  return parseFloat(order.value.total_price)
})

const discount = computed(() => {
  return Math.max(0, subtotal.value + shipping.value - totalPaid.value)
})

const activeStepIndex = computed(() => {
  if (!order.value) return 1
  const status = order.value.status
  switch (status) {
    case 'Pending':
      return 1
    case 'In Review':
      return 2
    case 'Preparing':
    case 'Preparing Order':
      return 3
    case 'Shipped':
    case 'Shipping':
    case 'Delivered':
      return 4
    case 'Cancelled':
      return 0
    default:
      return 1
  }
})

const simulatedAction = () => {
  alert('Simulated Action: Opening tracking system for this parcel...')
}

const simulatedInvoice = () => {
  alert('Simulated Action: Generating mock PDF invoice for LOT GT-' + (order.value?.id || '001'))
}
</script>
