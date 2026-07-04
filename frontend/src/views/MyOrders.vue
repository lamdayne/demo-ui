<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">{{ appStore.t('home') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/account" class="hover:text-[#1E4B35]">{{ appStore.t('account') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">{{ appStore.t('myOrdersTitle') }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-1">{{ appStore.t('myOrdersTitle') }}</h1>
      <p class="text-xs text-gray-500 mb-8">{{ appStore.t('trackReviewManage') }}</p>

      <!-- Tabs filter bar -->
      <div class="flex border-b border-gray-200 bg-white rounded-t-2xl p-4 shadow-sm gap-2">
        <button @click="activeStatusFilter = 'all'" class="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5" :class="activeStatusFilter === 'all' ? 'bg-[#1E4B35] text-white' : 'text-gray-600 hover:bg-gray-50'">
          {{ appStore.t('allOrders') }}
        </button>
        <button @click="activeStatusFilter = 'review'" class="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5" :class="activeStatusFilter === 'review' ? 'bg-[#1E4B35] text-white' : 'text-gray-600 hover:bg-gray-50'">
          <span class="w-2 h-2 rounded-full bg-orange-500"></span> {{ appStore.t('inReview') }}
        </button>
        <button @click="activeStatusFilter = 'delivered'" class="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5" :class="activeStatusFilter === 'delivered' ? 'bg-[#1E4B35] text-white' : 'text-gray-600 hover:bg-gray-50'">
          <span class="w-2 h-2 rounded-full bg-green-500"></span> {{ appStore.t('delivered') }}
        </button>
        <button @click="activeStatusFilter = 'cancelled'" class="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5" :class="activeStatusFilter === 'cancelled' ? 'bg-[#1E4B35] text-white' : 'text-gray-600 hover:bg-gray-50'">
          <span class="w-2 h-2 rounded-full bg-red-500"></span> {{ appStore.t('cancelled') }}
        </button>
      </div>

      <!-- Filter Controls row -->
      <div class="bg-white border-x border-b border-gray-200 p-4 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
        <div class="md:col-span-6 relative">
          <input type="text" :placeholder="appStore.t('searchByOrderNumber')" class="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#1E4B35]" />
          <Search class="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        </div>
        
        <div class="md:col-span-3 flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white gap-2">
          <Calendar class="w-4 h-4 text-gray-400" />
          <span class="text-[10px] text-gray-600">May 01, 2026 &rarr; May 31, 2026</span>
        </div>

        <div class="md:col-span-3 flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white gap-2">
          <span class="text-[9px] font-bold text-gray-400 uppercase">{{ appStore.t('sortBy') }}</span>
          <select class="w-full text-xs bg-transparent border-none text-gray-700 focus:ring-0 p-0 font-medium">
            <option>{{ appStore.t('orderDateNewest') }}</option>
            <option>{{ appStore.t('orderDateOldest') }}</option>
            <option>{{ appStore.t('totalHighLow') }}</option>
            <option>{{ appStore.t('totalLowHigh') }}</option>
          </select>
        </div>
      </div>

      <!-- Orders List Table -->
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm mb-8 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-250 text-gray-400 font-bold uppercase text-[9px]">
                <th class="p-4">{{ appStore.t('orderNumber') }}</th>
                <th class="p-4">{{ appStore.t('date') }}</th>
                <th class="p-4">{{ appStore.t('items') }}</th>
                <th class="p-4">{{ appStore.t('total') }}</th>
                <th class="p-4">{{ appStore.t('status') }}</th>
                <th class="p-4 text-right">{{ appStore.t('actions') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 transition">
                <td class="p-4 font-bold text-gray-900">
                  <div>{{ order.id }}</div>
                  <div class="text-[10px] text-gray-400 font-normal">Placed on {{ order.dateStr }}</div>
                </td>
                <td class="p-4 text-gray-500">{{ order.dateStr }}<br/>{{ order.timeStr }}</td>
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-gray-700">{{ order.itemCount }} {{ appStore.t('itemsLabel') }}</span>
                    <div class="flex -space-x-2 overflow-hidden">
                      <img v-for="(img, idx) in order.images.slice(0, 2)" :key="idx" :src="img" class="w-6 h-6 rounded-full border-2 border-white object-cover" />
                    </div>
                    <span v-if="order.itemCount > 2" class="text-[9px] text-gray-400 font-bold">+{{ order.itemCount - 2 }}</span>
                  </div>
                </td>
                <td class="p-4 font-bold text-gray-900">{{ order.total.toLocaleString() }} VND</td>
                <td class="p-4">
                  <span class="inline-flex items-center gap-1.5 font-semibold" :class="order.statusColor">
                    <span class="w-2 h-2 rounded-full" :class="order.statusDot"></span>
                    {{ getStatusLabel(order.status) }}
                  </span>
                </td>
                <td class="p-4 text-right">
                  <button @click="toggleOrderDetails(order.id)" class="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition inline-flex items-center gap-1">
                    {{ appStore.t('viewOrderDetails') }} <ChevronDown class="w-3.5 h-3.5 text-gray-400 transition-transform" :class="{ 'rotate-180': activeDetailsOrderId === order.id }" />
                  </button>
                </td>
              </tr>
              <tr v-if="filteredOrders.length === 0">
                <td colspan="6" class="p-8 text-center text-gray-400">No orders found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 bg-gray-50/50 border-t border-gray-150 flex items-center justify-between text-[11px] text-gray-500">
          <span>{{ appStore.t('showingOrders').replace('{start}', filteredOrders.length ? 1 : 0).replace('{end}', filteredOrders.length).replace('{total}', filteredOrders.length) }}</span>
          <div class="flex gap-1.5">
            <button class="w-7 h-7 border border-gray-200 rounded flex items-center justify-center bg-white hover:bg-gray-50 text-gray-400"><ChevronLeft class="w-4 h-4"/></button>
            <button class="w-7 h-7 rounded flex items-center justify-center bg-[#1E4B35] text-white font-bold">1</button>
            <button class="w-7 h-7 border border-gray-200 rounded flex items-center justify-center bg-white hover:bg-gray-50 text-gray-400"><ChevronRight class="w-4 h-4"/></button>
          </div>
        </div>
      </div>

      <!-- Active Order Detail Card -->
      <div v-if="activeDetailsOrderId && activeOrder" class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-8 space-y-6">
        <!-- Detail Header -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center"><Check class="w-6 h-6" /></div>
            <div>
              <div class="flex items-center gap-2.5">
                <h3 class="font-extrabold text-gray-900 text-lg">{{ appStore.t('orderNumber') }} # {{ activeOrder.id }}</h3>
                <span class="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200">{{ getStatusLabel(activeOrder.status) }}</span>
              </div>
              <p class="text-[10px] text-gray-500 mt-0.5">Placed on {{ activeOrder.dateStr }} at {{ activeOrder.timeStr }} • {{ activeOrder.itemCount }} {{ appStore.t('itemsLabel') }} • Total {{ activeOrder.total.toLocaleString() }} VND</p>
            </div>
          </div>

          <div class="flex gap-2">
            <button @click="trackOrder" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition">{{ appStore.t('trackOrder') }}</button>
            <button @click="reorder" class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-xs font-bold transition">Reorder</button>
          </div>
        </div>

        <!-- Details Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs border-b border-gray-100 pb-6">
          <!-- Shipping Address -->
          <div class="space-y-3">
            <h4 class="font-bold text-gray-400 uppercase tracking-widest text-[9px] flex items-center gap-1.5"><MapPin class="w-4 h-4 text-gray-400" /> {{ appStore.t('shippingAddress') }}</h4>
            <div class="text-gray-900 leading-relaxed font-semibold">
              {{ appStore.user?.name || 'Nguyen Van An' }}<br/>
              <span class="text-gray-500 font-normal">{{ formatAddress(activeOrder.shippingAddressStr) }}</span>
            </div>
            <button @click="editAddress" class="text-[10px] font-bold text-gray-500 hover:text-[#1E4B35] px-3 py-1.5 border border-gray-200 rounded-lg hover:border-[#1E4B35] transition">View / Edit Address</button>
          </div>

          <!-- Payment Method -->
          <div class="space-y-3">
            <h4 class="font-bold text-gray-400 uppercase tracking-widest text-[9px] flex items-center gap-1.5"><CreditCard class="w-4 h-4 text-gray-400" /> {{ appStore.t('paymentMethod') }}</h4>
            <div class="text-gray-900 leading-relaxed font-semibold">
              {{ activeOrder.paymentMethod }} (simulated)<br/>
              <span class="text-gray-500 font-normal">Transaction ID: GT-{{ activeOrder.id }}<br/>Paid on {{ activeOrder.dateStr }}</span>
            </div>
            <button @click="viewPayment" class="text-[10px] font-bold text-gray-500 hover:text-[#1E4B35] px-3 py-1.5 border border-gray-200 rounded-lg hover:border-[#1E4B35] transition">View Payment Details</button>
          </div>

          <!-- Delivery Information -->
          <div class="space-y-3">
            <h4 class="font-bold text-gray-400 uppercase tracking-widest text-[9px] flex items-center gap-1.5"><Truck class="w-4 h-4 text-gray-400" /> Delivery Information</h4>
            <div class="text-gray-900 leading-relaxed font-semibold">
              <span v-if="activeOrder.status === 'Delivered' || activeOrder.status === 'Completed'">Delivered on {{ activeOrder.dateStr }}</span>
              <span v-else-if="activeOrder.status === 'Cancelled'">Order Cancelled</span>
              <span v-else>Estimated delivery within 2-4 business days</span><br/>
              <span class="text-gray-500 font-normal">Delivered by: Green Trace Express<br/>Tracking ID: GTE-{{ activeOrder.id }}</span>
            </div>
            <button @click="trackOrder" class="text-[10px] font-bold text-gray-500 hover:text-[#1E4B35] px-3 py-1.5 border border-gray-200 rounded-lg hover:border-[#1E4B35] transition">View Tracking Details</button>
          </div>
        </div>

        <!-- Timeline Stepper -->
        <div class="border-b border-gray-100 pb-8 pt-4">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 relative max-w-4xl mx-auto">
            <!-- Connector Line -->
            <div class="absolute left-6 top-1/2 -translate-y-1/2 right-6 h-0.5 bg-gray-200 hidden md:block z-0"></div>

            <!-- Step 1 -->
            <div class="flex md:flex-col items-center gap-4 md:text-center z-10">
              <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                   :class="activeOrderStepIndex >= 1 ? 'bg-[#1E4B35] text-white' : 'bg-gray-100 text-gray-400'">
                <Check class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-gray-900 text-xs">{{ appStore.t('orderPlacedStep') }}</div>
                <div class="text-[9px] text-gray-400">{{ activeOrder.dateStr }} • {{ activeOrder.timeStr }}</div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeOrderStepIndex < 2 }">
              <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                   :class="activeOrderStepIndex >= 2 ? 'bg-[#1E4B35] text-white' : 'bg-gray-100 text-gray-400'">
                <Check class="w-4 h-4" v-if="activeOrderStepIndex > 2" />
                <Clock class="w-4 h-4" v-else />
              </div>
              <div>
                <div class="font-bold text-gray-900 text-xs">{{ appStore.t('paymentConfirmedStep') }}</div>
                <div class="text-[9px] text-gray-400">{{ activeOrderStepIndex >= 2 ? 'Confirmed' : 'Pending' }}</div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeOrderStepIndex < 3 }">
              <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                   :class="activeOrderStepIndex >= 3 ? 'bg-[#1E4B35] text-white' : 'bg-gray-100 text-gray-400'">
                <Check class="w-4 h-4" v-if="activeOrderStepIndex > 3" />
                <Clock class="w-4 h-4" v-else />
              </div>
              <div>
                <div class="font-bold text-gray-900 text-xs">{{ appStore.t('preparingOrderStep') }}</div>
                <div class="text-[9px] text-gray-400">{{ activeOrderStepIndex >= 3 ? 'In progress' : 'Pending' }}</div>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeOrderStepIndex < 4 }">
              <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                   :class="activeOrderStepIndex >= 4 ? 'bg-[#1E4B35] text-white' : 'bg-gray-100 text-gray-400'">
                <Check class="w-4 h-4" v-if="activeOrderStepIndex > 4" />
                <Clock class="w-4 h-4" v-else />
              </div>
              <div>
                <div class="font-bold text-gray-900 text-xs">{{ appStore.t('shippedStep') }}</div>
                <div class="text-[9px] text-gray-400">{{ activeOrderStepIndex >= 4 ? 'Shipped' : 'Pending' }}</div>
              </div>
            </div>

            <!-- Step 5 -->
            <div class="flex md:flex-col items-center gap-4 md:text-center z-10" :class="{ 'opacity-60': activeOrderStepIndex < 5 }">
              <div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow"
                   :class="activeOrderStepIndex >= 5 ? 'bg-[#1E4B35] text-white' : 'bg-gray-100 text-gray-400'">
                <Check class="w-4 h-4" />
              </div>
              <div>
                <div class="font-bold text-xs" :class="activeOrderStepIndex === 5 ? 'text-[#1E4B35] font-extrabold' : 'text-gray-900'">{{ appStore.t('deliveredStep') }}</div>
                <div class="text-[9px] text-gray-400">{{ activeOrderStepIndex >= 5 ? 'Delivered' : 'Pending' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed list inside Order -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-8 space-y-4">
            <h4 class="font-bold text-gray-900 text-xs">{{ appStore.t('itemsInOrder') }}</h4>
            
            <div class="border border-gray-150 rounded-2xl overflow-hidden divide-y divide-gray-100">
              <div v-for="item in activeOrder.itemsList" :key="item.name" class="p-4 flex gap-4 items-center bg-white hover:bg-gray-50/50 transition">
                <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img :src="item.image" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h5 class="font-bold text-gray-900 text-xs">{{ item.name }}</h5>
                  <div class="text-[9px] text-gray-500 flex flex-wrap gap-x-3">
                    <span>{{ appStore.t('batchProducer') }}: <span class="font-semibold">{{ item.producer }}</span></span>
                    <span>Batch: <span class="font-mono text-[#1E4B35] font-bold">{{ item.batch }}</span></span>
                  </div>
                  <router-link to="/traceability" class="inline-flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 text-[8px] font-bold px-2 py-0.5 rounded border border-green-200 mt-1 transition">
                    <Scan class="w-2.5 h-2.5"/> Trace
                  </router-link>
                </div>
                <div class="text-right flex-shrink-0 text-xs">
                  <div class="text-[9px] text-gray-400">{{ appStore.t('unitPrice') }}</div>
                  <div class="font-bold text-gray-900">{{ item.price.toLocaleString() }} VND</div>
                  <div class="text-[9px] text-gray-400">Qty: {{ item.qty }}</div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex flex-wrap gap-3 pt-2">
              <button @click="simulatedInvoice" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">{{ appStore.t('downloadSampleInvoice') }}</button>
              <button @click="requestReturn" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">{{ appStore.t('requestReturnDemo') }}</button>
              <router-link to="/support" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">{{ appStore.t('contactSupport') }}</router-link>
            </div>
            <p class="text-[9px] text-gray-400 italic">{{ appStore.t('requestReturnDemoDesc') }}</p>
          </div>

          <!-- Order Summary Details Box -->
          <div class="lg:col-span-4 bg-gray-50/50 border border-gray-200 rounded-2xl p-5 space-y-4">
            <h4 class="font-bold text-gray-900 text-xs border-b border-gray-250 pb-2">{{ appStore.t('summary') }}</h4>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between text-gray-500">
                <span>{{ appStore.t('subtotal') }} ({{ activeOrder.itemCount }} {{ appStore.t('itemsLabel') }})</span>
                <span class="font-semibold text-gray-800">{{ activeOrderSubtotal.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ appStore.t('discount') }}</span>
                <span class="font-semibold text-green-600">-{{ activeOrderDiscount.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ appStore.t('shippingFee') }}</span>
                <span class="font-semibold text-gray-800">{{ activeOrderShipping.toLocaleString() }} VND</span>
              </div>

              <div class="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-xs">
                <span>{{ appStore.t('totalPaid') }}</span>
                <span class="text-sm font-extrabold text-[#1E4B35]">{{ activeOrder.total.toLocaleString() }} VND</span>
              </div>
              
              <div class="flex justify-between text-gray-500 pt-2 text-[10px]">
                <span>{{ appStore.t('paymentMethod') }}</span>
                <span class="font-medium text-gray-700">{{ activeOrder.paymentMethod }} (simulated)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Need help section -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center"><Headphones class="w-5 h-5"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('needHelpSampleOrder') }}</h4>
              <p class="text-[10px] text-gray-500">{{ appStore.t('needHelpSampleOrderDesc') }}</p>
            </div>
          </div>

          <div class="flex items-center gap-6 text-[10px] text-gray-600">
            <span class="flex items-center gap-1.5"><MessageSquare class="w-4 h-4 text-gray-400" /> {{ appStore.t('liveChat') }}</span>
            <span class="flex items-center gap-1.5"><Mail class="w-4 h-4 text-gray-400" /> support@greentrace.demo</span>
          </div>
        </div>

        <div class="flex gap-2">
          <router-link to="/support" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition">{{ appStore.t('contactSupport') }}</router-link>
          <router-link to="/support" class="text-xs font-bold text-gray-500 hover:text-gray-700 flex items-center gap-0.5">Visit Help Center &rarr;</router-link>
        </div>
      </div>

      <!-- Bottom blue alert notice -->
      <div class="border border-blue-150 bg-blue-50/50 rounded-2xl p-4 flex items-center gap-2.5 text-xs text-blue-800">
        <Info class="w-5 h-5 text-blue-600 flex-shrink-0" />
        <span>{{ appStore.t('prototypeNotice') }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { ChevronRight, Search, Calendar, ChevronLeft, ChevronDown, Check, MapPin, CreditCard, Truck, Headphones, MessageSquare, Mail, Info, Scan, ShieldCheck, Download, Package, Banknote } from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const activeStatusFilter = ref('all')
const activeDetailsOrderId = ref(null)

onMounted(async () => {
  if (!appStore.token) {
    appStore.triggerToast(appStore.lang === 'vi' ? 'Vui lòng đăng nhập để xem đơn hàng của bạn.' : 'Please login to view your orders.')
    router.push('/')
    return
  }
  try {
    await appStore.fetchOrders()
    if (appStore.orders.length > 0) {
      activeDetailsOrderId.value = `GT-${appStore.orders[0].id}`
    }
  } catch (err) {
    console.error('Error fetching orders:', err)
  }
})

const getStatusLabel = (status) => {
  switch (status) {
    case 'Pending':
      return appStore.t('pendingStatus')
    case 'In Review':
      return appStore.t('inReviewStatus')
    case 'Preparing':
    case 'Preparing Order':
    case 'Processing':
      return appStore.t('preparingStatus')
    case 'Shipped':
    case 'Shipping':
      return appStore.t('shippedStatus')
    case 'Delivered':
    case 'Completed':
      return appStore.t('deliveredStatus')
    case 'Cancelled':
      return appStore.t('cancelledStatus')
    default:
      return status
  }
}

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

const orders = computed(() => {
  return appStore.orders.map(order => {
    // Determine status dot
    let statusDot = 'bg-orange-500'
    let statusColor = 'text-orange-600'
    if (order.status === 'Delivered' || order.status === 'Completed') {
      statusDot = 'bg-green-500'
      statusColor = 'text-green-600'
    } else if (order.status === 'Cancelled') {
      statusDot = 'bg-red-500'
      statusColor = 'text-red-600'
    }

    // Format list items
    const itemsList = (order.items || []).map(item => ({
      name: item.product_name || 'Traceable Farm Product',
      producer: item.producer_name || 'Verified Partner Farm',
      batch: item.batch_id || 'N/A',
      spec: `Verified Batch Item`,
      image: item.product_image || 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=80',
      price: parseFloat(item.price),
      qty: item.quantity
    }))

    return {
      id: `GT-${order.id}`,
      rawId: order.id,
      dateStr: new Date(order.created_at).toLocaleDateString(),
      timeStr: new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      itemCount: itemsList.length,
      total: parseFloat(order.total_price),
      status: order.status,
      paymentMethod: order.payment_method || 'MoMo',
      shippingAddressStr: order.shipping_address,
      statusDot,
      statusColor,
      images: itemsList.map(item => item.image),
      itemsList
    }
  })
})

const filteredOrders = computed(() => {
  if (activeStatusFilter.value === 'all') return orders.value
  if (activeStatusFilter.value === 'review') {
    return orders.value.filter(o => 
      o.status === 'Pending' || 
      o.status === 'In Review' || 
      o.status === 'Preparing' || 
      o.status === 'Preparing Order' || 
      o.status === 'Processing' || 
      o.status === 'Shipped' || 
      o.status === 'Shipping'
    )
  }
  if (activeStatusFilter.value === 'delivered') return orders.value.filter(o => o.status === 'Delivered' || o.status === 'Completed')
  if (activeStatusFilter.value === 'cancelled') return orders.value.filter(o => o.status === 'Cancelled')
  return orders.value
})

const activeOrder = computed(() => {
  return orders.value.find(o => o.id === activeDetailsOrderId.value)
})

const activeOrderSubtotal = computed(() => {
  if (!activeOrder.value || !activeOrder.value.itemsList) return 0
  return activeOrder.value.itemsList.reduce((sum, item) => sum + item.price * item.qty, 0)
})

const activeOrderShipping = computed(() => {
  return activeOrderSubtotal.value >= 500000 ? 0 : 30000
})

const activeOrderDiscount = computed(() => {
  if (!activeOrder.value) return 0
  return Math.max(0, activeOrderSubtotal.value + activeOrderShipping.value - activeOrder.value.total)
})

const activeOrderStepIndex = computed(() => {
  if (!activeOrder.value) return 1
  const status = activeOrder.value.status
  switch (status) {
    case 'Pending':
      return 1
    case 'In Review':
      return 2
    case 'Preparing':
    case 'Preparing Order':
    case 'Processing':
      return 3
    case 'Shipped':
    case 'Shipping':
      return 4
    case 'Delivered':
    case 'Completed':
      return 5
    case 'Cancelled':
      return 0
    default:
      return 1
  }
})

const toggleOrderDetails = (orderId) => {
  if (activeDetailsOrderId.value === orderId) {
    activeDetailsOrderId.value = null
  } else {
    activeDetailsOrderId.value = orderId
  }
}

const trackOrder = () => {
  appStore.triggerToast(appStore.lang === 'vi' ? 'Đang mô phỏng định vị lô hàng trên bản đồ...' : 'Simulating shipment location tracking on map...')
}

const reorder = () => {
  appStore.triggerToast(appStore.lang === 'vi' ? 'Đã thêm các sản phẩm từ đơn hàng này vào giỏ hàng!' : 'Added items from this order to your current cart!')
}

const editAddress = () => {
  appStore.triggerToast(appStore.lang === 'vi' ? 'Thao tác mô phỏng: Chỉnh sửa thông tin giao hàng...' : 'Simulated action: Editing delivery details...')
}

const viewPayment = () => {
  appStore.triggerToast(appStore.lang === 'vi' ? 'Thao tác mô phỏng: Kiểm tra phản hồi sao kê ngân hàng...' : 'Simulated action: Checking bank statement response...')
}

const simulatedInvoice = () => {
  appStore.triggerToast(appStore.lang === 'vi' ? 'Đang tải bản sao hóa đơn...' : 'Downloading invoice copy...')
}

const requestReturn = () => {
  appStore.triggerToast(appStore.lang === 'vi' ? 'Mô phỏng quy trình Trả hàng: Vui lòng chọn sản phẩm cần trả.' : 'Simulating Return Request workflow: Select items to return.')
}
</script>
