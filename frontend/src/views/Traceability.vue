<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Header & Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">Home</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-gray-400">Traceability</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">Batch Traceability</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-[#1E4B35] mb-2">Batch Traceability</h1>
        <p class="text-gray-600">See the journey of this batch from farm to you.</p>
      </div>

      <!-- Look up a batch search block -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex-shrink-0">
          <h3 class="font-bold text-gray-900 text-lg mb-1 flex items-center gap-1.5">
            Look up a batch <Info class="w-4 h-4 text-gray-400 cursor-pointer" />
          </h3>
          <p class="text-xs text-gray-500">Enter a batch or lot number</p>
        </div>
        <div class="flex flex-grow max-w-xl w-full gap-3">
          <input type="text" value="LOT-UMH-2605-001" class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] font-mono text-gray-900" />
          <button class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-6 py-3 rounded-lg font-bold transition">Search</button>
        </div>
      </div>

      <!-- Batch Overview Card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Product Details -->
        <div class="lg:col-span-5 flex gap-5">
          <div class="w-28 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200" alt="Honey" class="w-full h-full object-cover" />
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-xs text-gray-500 font-medium">Product</span>
            <h4 class="font-bold text-gray-900 text-lg leading-tight mb-1.5">U Minh Forest Wild Honey 500 ml</h4>
            <div class="text-sm text-gray-600 mb-2">
              <span class="font-semibold text-gray-900">Producer:</span> U Minh Bee Farm
            </div>
            <div class="flex flex-wrap gap-2 text-xs">
              <span class="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-700">Batch LOT-UMH-2605-001</span>
              <span class="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                <Check class="w-3 h-3"/> Reviewed Sample
              </span>
            </div>
          </div>
        </div>

        <!-- Explanation Column -->
        <div class="lg:col-span-4 border-t lg:border-t-0 lg:border-l lg:border-r border-gray-100 pt-6 lg:pt-0 px-0 lg:px-6">
          <h4 class="font-bold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
            What this means <CheckCircle2 class="w-4 h-4 text-green-600" />
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            This batch has been reviewed for key records and quality checks by our team. It is not a government certification or a guarantee, but it helps you choose with more confidence.
          </p>
        </div>

        <!-- QR Code Column -->
        <div class="lg:col-span-3 flex flex-col items-center text-center">
          <span class="text-xs text-gray-500 font-semibold mb-2">Scan to view this batch</span>
          <div class="w-24 h-24 bg-gray-100 p-2 rounded-lg flex items-center justify-center border border-gray-200">
            <QrCode class="w-full h-full text-gray-800" />
          </div>
          <div class="text-[10px] text-gray-400 font-mono mt-2">LOT-UMH-2605-001<br/>green-trace.vn/trace/LOT-UMH-2605-001</div>
        </div>
      </div>

      <!-- Batch Journey Timeline -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
        <h3 class="font-bold text-gray-900 text-lg mb-8">Batch Journey Timeline</h3>
        <div class="flex flex-col md:flex-row justify-between relative max-w-4xl mx-auto pb-6">
          <!-- Connective line -->
          <div class="hidden md:block absolute top-7 left-[8%] right-[8%] border-t-2 border-[#1E4B35] -z-10"></div>

          <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
            <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
              <Hexagon class="w-6 h-6"/>
            </div>
            <h4 class="font-bold text-gray-900 text-sm">Hive Collection</h4>
            <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">Honey collected from U Minh forest apiaries.</p>
            <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">May 06, 2026</span>
          </div>

          <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
            <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
              <Droplet class="w-6 h-6"/>
            </div>
            <h4 class="font-bold text-gray-900 text-sm">Extraction</h4>
            <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">Honey extracted and filtered.</p>
            <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">May 07, 2026</span>
          </div>

          <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
            <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
              <CheckCircle2 class="w-6 h-6"/>
            </div>
            <h4 class="font-bold text-gray-900 text-sm">Quality Check</h4>
            <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">Samples tested for quality & safety.</p>
            <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">May 08, 2026</span>
          </div>

          <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
            <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
              <Package class="w-6 h-6"/>
            </div>
            <h4 class="font-bold text-gray-900 text-sm">Packing</h4>
            <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">Bottled, sealed and labeled.</p>
            <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">May 09, 2026</span>
          </div>

          <div class="flex flex-col items-center text-center relative">
            <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
              <Truck class="w-6 h-6"/>
            </div>
            <h4 class="font-bold text-gray-900 text-sm">Ready to Ship</h4>
            <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">Cleared for delivery from producer.</p>
            <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">May 10, 2026</span>
          </div>
        </div>
      </div>

      <!-- Product Summary & Producer Summary grids -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Product Summary -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div class="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
            <Package class="w-5 h-5 text-[#1E4B35]" />
            <h3 class="font-bold text-gray-900 text-base">Product Summary</h3>
          </div>
          <div class="flex items-center gap-6 mb-6">
            <div class="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200" alt="Honey" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">U Minh Forest Wild Honey 500 ml</h4>
              <p class="text-xs text-gray-500 mt-0.5">Category: Honey</p>
            </div>
          </div>
          <div class="space-y-3 text-sm text-gray-700">
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Net Volume</span>
              <span class="font-semibold text-gray-900">500 ml</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Batch / Lot No.</span>
              <span class="font-mono font-semibold text-gray-900">LOT-UMH-2605-001</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Batch Date</span>
              <span class="font-semibold text-gray-900">May 07, 2026</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Best Before</span>
              <span class="font-semibold text-gray-900">May 07, 2028</span>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-gray-500">Storage</span>
              <span class="font-semibold text-gray-900">Store in a cool, dry place.</span>
            </div>
          </div>
        </div>

        <!-- Producer Summary -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div class="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
            <User class="w-5 h-5 text-[#1E4B35]" />
            <h3 class="font-bold text-gray-900 text-base">Producer Summary</h3>
          </div>
          <div class="flex items-center gap-6 mb-6">
            <div class="w-20 h-20 rounded-full overflow-hidden border border-white shadow">
              <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=150" alt="Beekeepers" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">U Minh Bee Farm</h4>
              <p class="text-xs text-gray-500 mt-0.5">Location: Ca Mau Province, Vietnam</p>
            </div>
          </div>
          <div class="space-y-3 text-sm text-gray-700">
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Farm Type</span>
              <span class="font-semibold text-gray-900">Forest-based beekeeping</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Established</span>
              <span class="font-semibold text-gray-900">2018</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-gray-50">
              <span class="text-gray-500">Certification</span>
              <span class="font-semibold text-gray-900">—</span>
            </div>
            <div class="flex justify-between py-1.5">
              <span class="text-gray-500">Reviewed On</span>
              <span class="font-semibold text-gray-900">May 10, 2026</span>
            </div>
            <div class="pt-3 border-t border-gray-100 flex justify-end">
              <router-link to="/producer/1" class="text-[#1E4B35] text-sm font-semibold hover:underline flex items-center gap-1">
                View producer profile <ArrowRight class="w-4 h-4"/>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Supporting Records -->
      <div class="mb-8">
        <h3 class="font-bold text-gray-900 text-lg mb-6">Supporting Records</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <FileText class="w-6 h-6 text-[#1E4B35]" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">Sample Batch Record</h4>
                <p class="text-xs text-gray-500 leading-normal">Details of collection, extraction, processing and packing.</p>
              </div>
            </div>
            <a href="#" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5">
              View Record <ExternalLink class="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <FlaskConical class="w-6 h-6 text-[#1E4B35]" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">Sample Lab Report</h4>
                <p class="text-xs text-gray-500 leading-normal">Lab analysis for key quality and safety parameters.</p>
              </div>
            </div>
            <a href="#" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5">
              View Report <ExternalLink class="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <User class="w-6 h-6 text-[#1E4B35]" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">Producer Profile Reviewed</h4>
                <p class="text-xs text-gray-500 leading-normal">Information about the farm, practices and facilities.</p>
              </div>
            </div>
            <router-link to="/producer/1" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5">
              View Profile <ExternalLink class="w-4 h-4 text-gray-400" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Explanations Block -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-4">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-2">What "Reviewed" Means</h4>
            <ul class="space-y-2 text-xs text-gray-600 list-disc pl-4">
              <li>Our team checks the records and sample results provided by the producer.</li>
              <li>We verify that key steps and dates are consistent.</li>
              <li>Reviewed does not mean government certification.</li>
              <li>This is not a guarantee of absolute truth or future performance.</li>
            </ul>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-4">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Leaf class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-2">What This Means For You</h4>
            <ul class="space-y-2 text-xs text-gray-600 list-disc pl-4">
              <li>You can see how this batch was made and checked.</li>
              <li>It helps you choose with more confidence.</li>
              <li>Product quality can still vary naturally.</li>
              <li>If you have questions, we are here to help.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Related Actions -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <router-link to="/products" class="border border-gray-200 bg-white rounded-xl p-4 flex items-center gap-3 hover:border-[#1E4B35] transition text-left">
          <ArrowLeft class="w-5 h-5 text-gray-400" />
          <div>
            <h4 class="font-bold text-gray-900 text-xs">Back to Product</h4>
            <p class="text-[10px] text-gray-500">View product details</p>
          </div>
        </router-link>

        <router-link to="/support" class="border border-gray-200 bg-white rounded-xl p-4 flex items-center gap-3 hover:border-[#1E4B35] transition text-left">
          <HelpCircle class="w-5 h-5 text-gray-400" />
          <div>
            <h4 class="font-bold text-gray-900 text-xs">Contact Support</h4>
            <p class="text-[10px] text-gray-500">Ask us anything</p>
          </div>
        </router-link>

        <router-link to="/producer/1" class="border border-gray-200 bg-white rounded-xl p-4 flex items-center gap-3 hover:border-[#1E4B35] transition text-left">
          <User class="w-5 h-5 text-gray-400" />
          <div>
            <h4 class="font-bold text-gray-900 text-xs">View Producer</h4>
            <p class="text-[10px] text-gray-500">See producer profile</p>
          </div>
        </router-link>

        <button class="border border-gray-200 bg-white rounded-xl p-4 flex items-center gap-3 hover:border-[#1E4B35] transition text-left">
          <Share2 class="w-5 h-5 text-gray-400" />
          <div>
            <h4 class="font-bold text-gray-900 text-xs">Share This Batch</h4>
            <p class="text-[10px] text-gray-500">Share with others</p>
          </div>
        </button>
      </div>

      <!-- Testimonial Community Quote -->
      <div class="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div class="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Nguyen Van An" class="w-full h-full object-cover" />
        </div>
        <div>
          <Quote class="w-8 h-8 text-green-300 mb-1 opacity-50" />
          <p class="text-base text-[#1E4B35] font-medium italic mb-2 leading-relaxed">
            We believe openness builds trust. Thank you for supporting real producers.
          </p>
          <div class="font-bold text-gray-900 text-xs">Nguyen Van An</div>
          <div class="text-[10px] text-gray-500">Green Trace Community</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight, Info, Check, QrCode, Hexagon, Droplet, CheckCircle2, Package, Truck, User, ArrowRight, FileText, FlaskConical, ExternalLink, ShieldCheck, Leaf, ArrowLeft, HelpCircle, Share2, Quote } from 'lucide-vue-next'
</script>
