<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">Home</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/cart" class="hover:text-[#1E4B35]">Cart</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/checkout" class="hover:text-[#1E4B35]">Checkout</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">Order Confirmation</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-1">Order Confirmation</h1>
      <p class="text-xs text-gray-500 mb-8">Thank you! Your sample order has been received.</p>

      <!-- Large Confirmation Banner -->
      <div class="bg-[#F8FAF9] border border-green-150 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm mb-8">
        <div class="w-16 h-16 rounded-full bg-[#1E4B35] text-white flex items-center justify-center flex-shrink-0">
          <Check class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Order Number</h2>
          <div class="text-2xl font-extrabold text-gray-900 font-mono mb-1">GT-2026-0519-001</div>
          <p class="text-xs text-gray-500">Your sample order has been placed. A confirmation email has been sent to <span class="font-semibold text-gray-700">support@greentrace.demo</span></p>
        </div>
      </div>

      <!-- Order Stats row (5 Columns) -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div class="space-y-1.5 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><Calendar class="w-3.5 h-3.5 text-gray-400" /> Order Date</span>
          <div class="text-[11px] font-bold text-gray-900">May 19, 2026</div>
          <div class="text-[9px] text-gray-400">10:24 AM (ICT)</div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><CreditCard class="w-3.5 h-3.5 text-gray-400" /> Payment Method</span>
          <div class="text-[11px] font-bold text-gray-900">VNPay (simulated)</div>
          <div><span class="bg-green-50 border border-green-200 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded">Paid</span></div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><Truck class="w-3.5 h-3.5 text-gray-400" /> Shipping Method</span>
          <div class="text-[11px] font-bold text-gray-900">Standard Shipping</div>
          <div class="text-[9px] text-gray-400">2-4 business days</div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center md:col-span-1">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><MapPin class="w-3.5 h-3.5 text-gray-400" /> Shipping Address</span>
          <div class="text-[11px] font-bold text-gray-900 leading-tight">Nguyen Van An</div>
          <div class="text-[9px] text-gray-500 leading-normal">123 Green Avenue, District 1, Ho Chi Minh City, Vietnam</div>
        </div>

        <div class="space-y-1.5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
          <span class="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase"><Clock class="w-3.5 h-3.5 text-gray-400" /> Next Step</span>
          <div class="text-[11px] text-gray-600 leading-snug">We are reviewing your order. You will receive updates shortly.</div>
        </div>
      </div>

      <!-- Items List & Summary columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        <!-- Order Items Column -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 text-sm mb-4">Order Items</h3>
            
            <div class="divide-y divide-gray-100">
              <!-- Item 1 -->
              <div class="py-4 flex gap-4 items-center">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=150" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h4 class="font-bold text-gray-900 text-xs">U Minh Forest Wild Honey 500 ml</h4>
                  <div class="text-[10px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Producer: <router-link to="/producer/1" class="font-semibold hover:underline">U Minh Bee Farm</router-link></span>
                    <span>Batch: <span class="font-mono text-[#1E4B35] font-bold">LOT-UMH-2605-001</span></span>
                  </div>
                  <div class="flex gap-2 pt-1 text-[8px] font-bold">
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Leaf class="w-2.5 h-2.5"/> Raw & Unfiltered</span>
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Check class="w-2.5 h-2.5"/> Verified Producer</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="font-bold text-gray-900 text-xs">229,000 VND</div>
                  <div class="text-[10px] text-gray-400">Qty: 1</div>
                </div>
              </div>

              <!-- Item 2 -->
              <div class="py-4 flex gap-4 items-center">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=150" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h4 class="font-bold text-gray-900 text-xs">ST25 Premium Rice 2 kg</h4>
                  <div class="text-[10px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Producer: <span class="font-semibold">Soc Trang Rice Co-op</span></span>
                    <span>Batch: <span class="font-mono text-[#1E4B35] font-bold">LOT-ST25-2605-002</span></span>
                  </div>
                  <div class="flex gap-2 pt-1 text-[8px] font-bold">
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Leaf class="w-2.5 h-2.5"/> Organic</span>
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Check class="w-2.5 h-2.5"/> Low Input</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="font-bold text-gray-900 text-xs">139,000 VND</div>
                  <div class="text-[10px] text-gray-400">Qty: 1</div>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="py-4 flex gap-4 items-center">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=150" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow space-y-1">
                  <h4 class="font-bold text-gray-900 text-xs">Lotus Tea 200 g</h4>
                  <div class="text-[10px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Producer: <span class="font-semibold">Lotus Lake Tea Co-op</span></span>
                    <span>Batch: <span class="font-mono text-[#1E4B35] font-bold">LOT-LTT-2605-005</span></span>
                  </div>
                  <div class="flex gap-2 pt-1 text-[8px] font-bold">
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Leaf class="w-2.5 h-2.5"/> Herbal</span>
                    <span class="bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-0.5"><Check class="w-2.5 h-2.5"/> Low Input</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="font-bold text-gray-900 text-xs">115,000 VND</div>
                  <div class="text-[10px] text-gray-400">Qty: 1</div>
                </div>
              </div>
            </div>

            <!-- Footer of list -->
            <div class="flex justify-between items-center border-t border-gray-100 pt-4 text-xs font-bold text-gray-700 mt-2">
              <span>3 items</span>
              <span class="text-green-600 flex items-center gap-1"><ShieldCheck class="w-4 h-4" /> All products are traceable</span>
            </div>
          </div>
        </div>

        <!-- Order Summary Column -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 class="font-bold text-gray-900 text-sm">Order Summary</h3>
            
            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between text-gray-500">
                <span>Subtotal (3 items)</span>
                <span class="font-semibold text-gray-900">483,000 VND</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Discount (GREENTRACE10)</span>
                <span class="font-semibold text-green-600">-48,300 VND</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Shipping (Standard Shipping)</span>
                <span class="font-semibold text-gray-900">30,000 VND</span>
              </div>
              
              <div class="border-t border-gray-100 pt-3 flex justify-between font-bold text-sm text-gray-900">
                <span>Total</span>
                <span class="text-lg font-extrabold text-[#1E4B35]">464,700 VND</span>
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

            <!-- Promo applied tag -->
            <div class="border border-gray-200 rounded-xl p-3 flex justify-between items-center text-xs">
              <div class="flex flex-col">
                <span class="text-[9px] text-gray-400">Promo code applied</span>
                <span class="font-bold text-gray-800">GREENTRACE10</span>
              </div>
              <Check class="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Order Progress Stepper -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-sm mb-8">
        <h3 class="font-bold text-gray-900 text-sm mb-8">Order Progress</h3>
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 relative max-w-4xl mx-auto">
          <!-- Connector line (desktop) -->
          <div class="absolute left-6 top-1/2 -translate-y-1/2 right-6 h-0.5 bg-gray-200 hidden md:block z-0"></div>

          <!-- Step 1 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10">
            <div class="w-10 h-10 rounded-full bg-[#1E4B35] text-white flex items-center justify-center border-4 border-white shadow shadow-[#1E4B35]/25">
              <Check class="w-5 h-5" />
            </div>
            <div>
              <div class="font-bold text-gray-900 text-xs">Order Received</div>
              <div class="text-[9px] text-gray-400">May 19, 2026 • 10:24 AM</div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10">
            <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center border-4 border-white shadow">
              <ClipboardList class="w-5 h-5" />
            </div>
            <div>
              <div class="font-bold text-[#1E4B35] text-xs">Reviewing</div>
              <div class="text-[9px] text-[#1E4B35] font-semibold">In progress</div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10 opacity-60">
            <div class="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border-4 border-white shadow">
              <Package class="w-5 h-5" />
            </div>
            <div>
              <div class="font-bold text-gray-900 text-xs">Packing</div>
              <div class="text-[9px] text-gray-400">Pending</div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex md:flex-col items-center gap-4 md:text-center z-10 opacity-60">
            <div class="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border-4 border-white shadow">
              <Truck class="w-5 h-5" />
            </div>
            <div>
              <div class="font-bold text-gray-900 text-xs">Ready to Ship</div>
              <div class="text-[9px] text-gray-400">Pending</div>
            </div>
          </div>
        </div>
      </div>

      <!-- What happens next (4 Columns) -->
      <div class="mb-12">
        <h3 class="font-bold text-gray-900 text-sm mb-6">What happens next</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><ClipboardList class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">1. We review your order</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">Our team will verify your order and prepare it for shipping.</p>
            </div>
          </div>

          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Package class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">2. We pack with care</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">Products are carefully packed to ensure safe delivery.</p>
            </div>
          </div>

          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Truck class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">3. We ship your order</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">You will receive a tracking link once your order ships.</p>
            </div>
          </div>

          <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-9 h-9 rounded-lg bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Mail class="w-4 h-4"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">4. You get your products</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed">Enjoy traceable, high-quality products from our producers.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid (4 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><MapPin class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">Track Order</h4>
            <p class="text-[10px] text-gray-500">Track your shipment and delivery updates.</p>
          </div>
          <button @click="simulatedAction" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition mt-6">Track Order</button>
        </div>

        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><FileText class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">View Order Details</h4>
            <p class="text-[10px] text-gray-500">See full order details, items, and status.</p>
          </div>
          <router-link to="/orders" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold text-center block transition mt-6">View Details</router-link>
        </div>

        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><ShoppingCart class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">Continue Shopping</h4>
            <p class="text-[10px] text-gray-500">Explore more traceable products.</p>
          </div>
          <router-link to="/products" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold text-center block transition mt-6">Continue Shopping</router-link>
        </div>

        <div class="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35]"><Download class="w-5 h-5"/></div>
            <h4 class="font-bold text-gray-900 text-xs pt-1">Download Invoice</h4>
            <p class="text-[10px] text-gray-500">Download your sample invoice (PDF).</p>
          </div>
          <button @click="simulatedInvoice" class="w-full py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition mt-6">Download Invoice</button>
        </div>
      </div>

      <!-- Need help banner -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35] flex-shrink-0">
            <Headphones class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm">Need help with this sample order?</h4>
            <p class="text-xs text-gray-500 mt-0.5">We're here to help. Contact our support team for any questions about your order or products.</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="text-xs text-gray-600 space-y-1">
            <div class="flex items-center gap-1.5"><Mail class="w-4 h-4 text-gray-400"/> support@greentrace.demo</div>
            <div class="flex items-center gap-1.5"><Phone class="w-4 h-4 text-gray-400"/> +84 123 456 789</div>
          </div>
          <router-link to="/support" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-xs font-bold transition">
            Contact Support
          </router-link>
        </div>
      </div>

      <!-- Explore more columns (2 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-12 h-12 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><Leaf class="w-6 h-6"/></div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">Review Batch Records</h4>
            <p class="text-xs text-gray-500 leading-relaxed mb-4">See lab reports, traceability data, and certifications for your ordered products.</p>
            <router-link to="/traceability" class="text-xs font-bold text-[#1E4B35] hover:underline flex items-center gap-0.5">View Batch Records &rarr;</router-link>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-12 h-12 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0"><User class="w-6 h-6"/></div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">View Producer Profiles</h4>
            <p class="text-xs text-gray-500 leading-relaxed mb-4">Learn more about our trusted producers and their sustainable practices.</p>
            <router-link to="/producers" class="text-xs font-bold text-[#1E4B35] hover:underline flex items-center gap-0.5">Explore Producers &rarr;</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ChevronRight, Calendar, CreditCard, Truck, MapPin, Clock, Check, Leaf, ShieldCheck, FileText, Package, Download, Headphones, Mail, Phone, User } from 'lucide-vue-next'

const simulatedAction = () => {
  alert('Simulated Action: Opening tracking system for this parcel...')
}

const simulatedInvoice = () => {
  alert('Simulated Action: Generating mock PDF invoice for LOT GT-2026-0519-001...')
}
</script>
