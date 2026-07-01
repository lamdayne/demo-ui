<template>
  <div class="bg-[#F8FAF9] min-h-screen py-10">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-[#1E4B35] mb-2 tracking-tight">Your Cart</h1>
        <p class="text-gray-600 text-lg">Review your items, adjust quantities, and proceed to checkout.</p>
      </div>

      <!-- Trust Bar -->
      <div class="bg-white border border-green-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-8 shadow-sm">
        <div class="flex-1 flex justify-center items-center gap-3 py-2 md:py-0 text-[#1E4B35] font-medium text-sm">
          <Leaf class="w-5 h-5" /> All products are traceable.
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-2 md:py-0 text-[#1E4B35] font-medium text-sm">
          <CheckCircle2 class="w-5 h-5" /> Verified producers.
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-2 md:py-0 text-[#1E4B35] font-medium text-sm">
          <Lock class="w-5 h-5" /> Secure payments.
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Cart Area -->
        <div class="w-full lg:w-[65%]">
          <!-- Cart Table -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div class="hidden md:grid grid-cols-12 gap-4 p-5 border-b text-sm font-semibold text-gray-500 bg-[#FAFAFA]">
              <div class="col-span-3">Product</div>
              <div class="col-span-3">Producer & Batch</div>
              <div class="col-span-2 text-center">Quantity</div>
              <div class="col-span-2 text-center">Unit Price</div>
              <div class="col-span-2 text-right">Subtotal</div>
            </div>

            <div class="divide-y divide-gray-100" v-if="appStore.cart.length > 0">
              <!-- Dynamic Cart Item -->
              <div v-for="item in appStore.cart" :key="item.id" class="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div class="col-span-1 md:col-span-3 flex gap-4">
                  <div class="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img :src="item.image_url" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex flex-col justify-center">
                    <h3 class="font-bold text-gray-900 text-base leading-tight">{{ item.name }}</h3>
                  </div>
                </div>
                <div class="col-span-1 md:col-span-3">
                  <div class="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
                    <User class="w-4 h-4 text-green-600" /> {{ item.producer_name || 'Verified Producer' }}
                  </div>
                  <p class="text-xs text-gray-500">Location: {{ item.producer_location || 'Vietnam' }}</p>
                </div>
                <div class="col-span-1 md:col-span-2 flex flex-col items-center">
                  <div class="flex items-center border border-gray-200 rounded-lg h-10 w-28 bg-white mb-2">
                    <button @click="appStore.updateCartQuantity(item.id, item.quantity - 1)" class="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">–</button>
                    <input type="text" :value="item.quantity" class="w-full text-center border-none text-base font-medium focus:ring-0 p-0 text-gray-900" readonly />
                    <button @click="appStore.updateCartQuantity(item.id, item.quantity + 1)" class="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">+</button>
                  </div>
                  <button @click="appStore.toggleWishlist(item.id)" class="text-xs text-gray-500 hover:text-[#1E4B35] underline">Save for later</button>
                </div>
                <div class="col-span-1 md:col-span-2 text-center text-sm text-gray-600">{{ parseFloat(item.price).toLocaleString() }} VND</div>
                <div class="col-span-1 md:col-span-2 flex flex-col items-end">
                  <div class="font-bold text-gray-900 text-base mb-2">{{ (parseFloat(item.price) * item.quantity).toLocaleString() }} VND</div>
                  <button @click="appStore.removeFromCart(item.id)" class="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1"><Trash2 class="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
            </div>
            <div v-else class="py-16 text-center text-gray-400 text-sm font-semibold">
              Your shopping cart is empty.
            </div>

            <!-- Cart Footer Actions -->
            <div class="p-5 border-t border-gray-100 flex justify-between items-center bg-[#FAFAFA]" v-if="appStore.cart.length > 0">
              <button class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#1E4B35]">
                <Heart class="w-4 h-4" /> Save Cart
              </button>
              <button @click="appStore.clearCart" class="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500">
                <Trash2 class="w-4 h-4" /> Clear Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <div class="w-full lg:w-[35%]">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-28">
            <h3 class="text-2xl font-bold text-[#1E4B35] mb-6">Order Summary</h3>
            
            <div class="space-y-4 mb-6 border-b border-gray-100 pb-6">
              <div class="flex justify-between text-gray-600 text-sm">
                <span>Subtotal ({{ subtotalItems }} items)</span>
                <span class="font-medium text-gray-900">{{ subtotalPrice.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-green-600 text-sm">
                <span>Discount <br/><span class="text-xs opacity-75">(GREENTRACE10)</span></span>
                <span class="font-medium">-{{ discountPrice.toLocaleString() }} VND</span>
              </div>
              <div class="flex justify-between text-gray-600 text-sm items-center">
                <span class="flex items-center gap-1">Standard Shipping <Info class="w-3.5 h-3.5" /></span>
                <span class="font-medium text-gray-900">{{ shippingFee === 0 ? 'FREE' : shippingFee.toLocaleString() + ' VND' }}</span>
              </div>
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-end mb-1">
                <span class="font-bold text-gray-900 text-lg">Total</span>
                <span class="text-2xl font-bold text-[#1E4B35]">{{ totalPrice.toLocaleString() }} VND</span>
              </div>
              <p class="text-xs text-gray-500 max-w-[200px]">Taxes included. Final total calculated at checkout.</p>
            </div>
            
            <!-- Shipping Banner -->
            <div class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-start gap-3 mb-6">
              <Truck class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 class="text-green-800 font-bold text-sm mb-0.5">Free standard shipping</h4>
                <p class="text-green-700 text-xs leading-tight">for merchandise subtotal from 500,000 VND</p>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-2">Have a promo code?</label>
              
              <div v-if="appliedCoupon" class="flex items-center border border-green-500 rounded-lg overflow-hidden h-12 bg-white px-4 justify-between">
                <span class="text-gray-900 font-bold uppercase text-sm">{{ appliedCoupon.code }}</span>
                <Check class="w-5 h-5 text-green-500" />
              </div>
              <div v-if="appliedCoupon" class="flex justify-between mt-2 px-1">
                <span class="text-xs text-green-600 font-semibold">Applied</span>
                <span @click="removeCoupon" class="text-xs text-red-500 hover:text-red-700 cursor-pointer underline">Remove</span>
              </div>
              
              <div v-else class="flex border border-gray-300 rounded-lg overflow-hidden h-12 bg-white">
                <input 
                  type="text" 
                  v-model="couponCodeInput" 
                  placeholder="Enter promo code" 
                  class="w-full px-4 border-none focus:ring-0 text-gray-900 text-xs uppercase" 
                />
                <button 
                  @click="applyCoupon"
                  class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-4 font-bold text-xs transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mt-6 mb-4">
        <div v-if="appliedCoupon" class="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Tag class="w-6 h-6 text-green-600" />
            <div>
              <h4 class="text-green-800 font-bold text-sm">Promo code applied!</h4>
              <p class="text-green-700 text-xs">You saved {{ discountPrice.toLocaleString() }} VND with {{ appliedCoupon.code }}.</p>
            </div>
          </div>
          <CheckCircle2 class="w-5 h-5 text-green-600" />
        </div>
        <router-link to="/products" class="flex-1 border-2 border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-gray-700 hover:border-[#1E4B35] hover:text-[#1E4B35] transition bg-white">
          <ArrowLeft class="w-5 h-5" /> Continue Shopping
        </router-link>
        <router-link to="/checkout" class="flex-1 py-4 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg shadow-[#1E4B35]/20">
          <Lock class="w-5 h-5" /> Proceed to Checkout
        </router-link>
      </div>

      <p class="text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 mb-8">
        <ShieldCheck class="w-4 h-4" /> Secure checkout. Your data is protected.
      </p>

      <!-- Trust Features Bar -->
      <div class="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-12 shadow-sm">
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Every item includes</div>
            <div class="text-sm font-semibold text-gray-900">Sample Batch Records</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Sprout class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Transparent from farm</div>
            <div class="text-sm font-semibold text-gray-900">to your table</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <CheckCircle2 class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Producers are reviewed</div>
            <div class="text-sm font-semibold text-gray-900">and verified</div>
          </div>
        </div>
      </div>

      <!-- You may also like -->
      <div class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">You may also like</h2>
          <router-link to="/products" class="text-sm font-medium text-gray-700 hover:text-[#1E4B35] flex items-center gap-1">View all products <ArrowRight class="w-4 h-4" /></router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div v-for="item in recommendations" :key="item.name" class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition">
            <div class="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              <ImageIcon v-else class="w-10 h-10 text-gray-300" />
            </div>
            <div class="p-3">
              <h4 class="font-bold text-gray-900 text-sm leading-tight mb-1">{{ item.name }}</h4>
              <div class="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <MapPin class="w-3 h-3" /> {{ item.producer }}
              </div>
              <div class="font-bold text-gray-900 text-sm mb-3">{{ item.price }}</div>
              <button class="w-full py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center gap-1.5 hover:border-[#1E4B35] hover:text-[#1E4B35] transition">
                <ShoppingCart class="w-3.5 h-3.5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Trust Bar -->
      <div class="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200 shadow-sm">
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <Lock class="w-5 h-5 text-[#1E4B35]" />
          <div>
            <div class="font-bold text-sm text-gray-900">Secure payments</div>
            <div class="text-xs text-gray-500">Multiple safe options</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <LeafIcon class="w-5 h-5 text-[#1E4B35]" />
          <div>
            <div class="font-bold text-sm text-gray-900">Quality guaranteed</div>
            <div class="text-xs text-gray-500">Carefully selected</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <RotateCcw class="w-5 h-5 text-[#1E4B35]" />
          <div>
            <div class="font-bold text-sm text-gray-900">Easy returns</div>
            <div class="text-xs text-gray-500">7-day support</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <HeadphonesIcon class="w-5 h-5 text-[#1E4B35]" />
          <div>
            <div class="font-bold text-sm text-gray-900">Friendly support</div>
            <div class="text-xs text-gray-500">We're here to help</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Image as ImageIcon, User, Trash2, Heart, Lock, CheckCircle2, Leaf as LeafIcon, Info, Truck, Tag, ArrowLeft, ArrowRight, Check, ShieldCheck, FileText, Sprout, MapPin, ShoppingCart, RotateCcw, Headphones as HeadphonesIcon } from 'lucide-vue-next'
import { Leaf } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

const recommendations = [
  { name: 'Honeycomb 300 g', producer: 'U Minh Bee Farm', price: '95,000 VND', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200' },
  { name: 'Ben Tre Green Pomelo 1 kg', producer: 'Ben Tre Fruit Co-op', price: '79,000 VND', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=200' },
  { name: 'Jasmine Tea 100 g', producer: 'Tra Vinh Tea Garden', price: '89,000 VND', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=200' }
]

const couponCodeInput = ref('')
const appliedCoupon = ref(null)

const applyCoupon = async () => {
  if (!couponCodeInput.value.trim()) return
  try {
    const coupon = await appStore.validateCouponCode(couponCodeInput.value.trim(), subtotalPrice.value)
    appliedCoupon.value = coupon
    appStore.triggerToast(`Coupon "${coupon.code}" applied successfully!`)
  } catch (error) {
    appStore.triggerToast(error.message || 'Invalid discount coupon code')
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  couponCodeInput.value = ''
  appStore.triggerToast('Discount coupon code removed.')
}

const subtotalItems = computed(() => {
  return appStore.cart.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotalPrice = computed(() => {
  return appStore.cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
})

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
  return 30000
})

const totalPrice = computed(() => {
  return Math.max(0, subtotalPrice.value - discountPrice.value + shippingFee.value)
})
</script>
