<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">{{ appStore.t('home') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/products" class="hover:text-[#1E4B35]">{{ appStore.t('shop') }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-gray-400">{{ product ? product.category : 'Honey' }}</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">{{ product ? ((appStore.lang === 'en' && product.specifications?.name_en) ? product.specifications.name_en : product.name) : 'U Minh Forest Wild Honey, 500 ml' }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-5">
      <!-- Main product intro grid -->
      <div class="bg-white rounded-3xl border border-gray-200 p-5 lg:p-6 shadow-sm mb-6">
        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- Product Images Column -->
          <div class="w-full lg:w-1/2 flex flex-col gap-3">
            <div class="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-150">
              <img :src="activeImage" alt="Product main image" class="w-full h-full object-cover" />
              <!-- Carousel Controls -->
              <button @click="prevImg" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow transition-all">
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button @click="nextImg" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow transition-all">
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Thumbnail gallery -->
            <div class="flex gap-2 justify-center">
              <div v-for="(img, idx) in productImages" :key="idx" @click="activeImageIndex = idx" class="w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition relative" :class="activeImageIndex === idx ? 'border-[#1E4B35]' : 'border-transparent'">
                <img :src="img" class="w-full h-full object-cover" />
                <div v-if="idx === 4" class="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xs">+2</div>
              </div>
            </div>
          </div>

          <!-- Product Details Column -->
          <div class="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
            <div v-if="product">
              <span class="bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-3 py-1 rounded inline-block mb-2">{{ product.category || 'General' }}</span>
              <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{{ (appStore.lang === 'en' && product.specifications?.name_en) ? product.specifications.name_en : product.name }}</h1>
              
              <div class="flex items-center gap-1.5 text-sm mb-3">
                <span class="text-gray-500">{{ appStore.t('by') }}</span>
                <router-link :to="'/producer/' + (product.producer_id || 1)" class="text-[#1E4B35] font-bold underline hover:text-[#163a29]">{{ product.producer_name || appStore.t('verifiedFarm') }}</router-link>
              </div>

              <!-- Rating, Verification -->
              <div class="flex flex-wrap items-center gap-3 text-sm mb-4">
                <div class="flex text-yellow-400">
                  <Star v-for="i in 5" :key="i" class="w-4.5 h-4.5 fill-current" />
                </div>
                <span class="font-bold text-gray-800">{{ product.rating || '5.0' }}</span>
                <span class="text-gray-500">({{ product.reviews_count || '0' }} {{ appStore.t('reviewsCount') }})</span>
                <span class="bg-green-50 text-green-700 px-2.5 py-0.5 rounded font-bold border border-green-200 flex items-center gap-1">
                  <Check class="w-3.5 h-3.5"/> {{ appStore.t('verifiedProducer') }}
                </span>
              </div>

              <!-- Price -->
              <div class="mb-4">
                <div class="text-3xl lg:text-4xl font-extrabold text-[#1E4B35]">{{ parseFloat(product.price).toLocaleString() }} VND</div>
                <div class="text-xs text-gray-400 mt-0.5">({{ appStore.t('taxIncluded') }})</div>
              </div>

              <p class="text-sm text-gray-700 leading-relaxed mb-5">
                {{ product.description || 'Verified organic agricultural produce sourced directly from eco-friendly local cooperatives.' }}
              </p>

              <!-- Specs Table list -->
              <div class="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-150 pt-4 mb-4 text-sm text-gray-700">
                <div class="flex items-center gap-2">
                  <User class="w-4.5 h-4.5 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.t('producerSpec') }}</span> <span class="font-semibold text-gray-900">{{ product.producer_name || 'Verified Cooperative' }}</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <MapPin class="w-4.5 h-4.5 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.t('locationSpec') }}</span> <span class="font-semibold text-gray-900">{{ appStore.localizeAddress(product.producer_location || 'Vietnam') }}</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <Package class="w-4.5 h-4.5 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Quy cách' : 'Specification' }}:</span> <span class="font-semibold text-gray-900">{{ product.specifications?.size || '1 kg' }}</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <PackageCheck class="w-4.5 h-4.5 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Mã lô mẫu' : 'Sample Batch Code' }}:</span> <span class="font-semibold text-gray-900 font-mono">{{ (product.batches && product.batches.length > 0) ? product.batches[0].id : 'N/A' }}</span></span>
                </div>
              </div>
            </div>
            <div v-else class="py-12 text-center text-gray-500 text-sm font-semibold">
              {{ appStore.t('loadingDetails') }}
            </div>

            <!-- Actions Row -->
            <div v-if="product" class="space-y-3">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-gray-300 rounded-xl h-12 w-32 flex-shrink-0">
                  <button @click="qty > 1 ? qty-- : null" class="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold transition text-sm">-</button>
                  <span class="w-12 text-center text-sm font-bold text-gray-900">{{ qty }}</span>
                  <button @click="qty++" class="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold transition text-sm">+</button>
                </div>

                <button @click="toggleWishlist" class="w-12 h-12 border border-gray-300 rounded-xl flex items-center justify-center transition hover:border-[#1E4B35]" :class="isWishlisted ? 'border-red-500 text-red-500 hover:bg-red-50' : 'text-gray-500 hover:text-[#1E4B35]'">
                  <Heart class="w-5.5 h-5.5" :class="{ 'fill-current': isWishlisted }" />
                </button>

                <button @click="addToCart" class="flex-grow h-12 border border-[#1E4B35] text-[#1E4B35] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-green-50 transition text-sm">
                  <ShoppingCart class="w-5 h-5" /> {{ appStore.t('addToCart') }}
                </button>
              </div>
              <button @click="buyNow" class="w-full h-12 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl font-bold flex items-center justify-center transition shadow shadow-[#1E4B35]/25 text-sm">
                {{ appStore.t('buyNow') }}
              </button>
            </div>

          </div>
        </div>

        <!-- Trust Features Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-150 text-center">
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-800">
            <Scan class="w-4 h-4 text-green-600" /> {{ appStore.t('traceableToBatch') }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-800">
            <ShieldCheck class="w-4 h-4 text-green-600" /> {{ appStore.t('verifiedProducer') }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-800">
            <PackageCheck class="w-4 h-4 text-green-600" /> {{ appStore.t('carefullyPacked') }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-800">
            <CreditCard class="w-4 h-4 text-green-600" /> {{ appStore.t('securePaymentsTitle') }}
          </div>
        </div>
      </div>

      <!-- Why choose / batch preview / delivery columns -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <!-- Column 1: Why people choose this product -->
        <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4 text-left">
          <h3 class="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">{{ appStore.t('whyPeopleChoose') }}</h3>
          
          <div class="flex gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0"><Trees class="w-5 h-5 text-green-600"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-0.5">{{ appStore.t('fromForest') }}</h4>
              <p class="text-[11px] text-gray-500 leading-normal">{{ appStore.t('fromForestDesc') }}</p>
            </div>
          </div>

          <div class="flex gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0"><Droplet class="w-5 h-5 text-green-600"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-0.5">{{ appStore.t('rawUnfiltered') }}</h4>
              <p class="text-[11px] text-gray-500 leading-normal">{{ appStore.t('rawUnfilteredDesc') }}</p>
            </div>
          </div>

          <div class="flex gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0"><Globe class="w-5 h-5 text-green-600"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-0.5">{{ appStore.t('traceableTransparent') }}</h4>
              <p class="text-[11px] text-gray-500 leading-normal">{{ appStore.t('traceableTransparentDesc') }}</p>
            </div>
          </div>
        </div>

        <!-- Column 2: Batch record preview -->
        <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between text-left">
          <h3 class="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2 mb-2">{{ appStore.t('batchRecordPreview') }}</h3>
          
          <div class="border border-dashed border-gray-250 rounded-xl p-4 bg-gray-50/50 space-y-2.5">
            <div class="flex justify-between items-center pb-2 border-b border-gray-150">
              <div>
                <span class="text-[9px] text-gray-400 block uppercase font-bold">{{ appStore.t('batchId') }}</span>
                <span class="font-mono font-bold text-xs text-gray-900">{{ activeBatch ? activeBatch.id : 'LOT-UMH-2605-001' }}</span>
              </div>
              <span class="bg-green-50 text-green-700 text-[8px] font-bold px-2 py-0.5 rounded border border-green-200">
                {{ activeBatch ? (appStore.lang === 'vi' ? 'Đã kiểm chứng' : 'Verified Batch') : appStore.t('sampleRecord') }}
              </span>
            </div>
            
            <div class="text-[11px] space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('harvestDate') }}</span>
                <span class="font-semibold text-gray-800">{{ activeBatch ? formatDate(activeBatch.harvest_date) : '19 May 2026' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('locationSpec') }}</span>
                <span class="font-semibold text-gray-800">{{ appStore.localizeAddress(activeBatch ? activeBatch.location : 'U Minh Forest, Ca Mau') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ activeBatch ? (appStore.lang === 'vi' ? 'Nguồn loài' : 'Species Source') : appStore.t('speciesSource') }}</span>
                <span class="font-semibold text-gray-800">{{ activeBatch ? activeBatch.species_source : 'Melaleuca (Tràm)' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('status') }}</span>
                <span class="font-bold text-[#1E4B35]">{{ activeBatch ? activeBatch.status : appStore.t('samplePreviewStatus') }}</span>
              </div>
            </div>
          </div>

          <router-link to="/traceability" class="w-full py-2 border border-gray-300 text-gray-700 text-xs font-bold text-center rounded-lg hover:bg-gray-50 transition mt-3 block">
            {{ appStore.t('viewBatchRecord') }}
          </router-link>
        </div>

        <!-- Column 3: Delivered with care -->
        <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
          <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35] mb-3">
            <PackageCheck class="w-6 h-6" />
          </div>
          <h4 class="font-bold text-gray-900 text-sm mb-1">{{ appStore.t('deliveredWithCare') }}</h4>
          <p class="text-xs text-gray-500 max-w-[200px] leading-relaxed">
            {{ appStore.t('deliveredWithCareDesc') }}
          </p>
        </div>
      </div>

      <!-- Description Tabs -->
      <div class="bg-white border border-gray-200 rounded-3xl shadow-sm mb-8 overflow-hidden">
        <div class="flex border-b border-gray-100 bg-gray-50/50">
          <button @click="activeDetailTab = 'overview'" class="px-6 py-4 font-bold text-xs transition-all" :class="activeDetailTab === 'overview' ? 'text-[#1E4B35] border-b-2 border-[#1E4B35]' : 'text-gray-400 hover:text-gray-900'">{{ appStore.t('overviewTab') }}</button>
          <button @click="activeDetailTab = 'story'" class="px-6 py-4 font-bold text-xs transition-all" :class="activeDetailTab === 'story' ? 'text-[#1E4B35] border-b-2 border-[#1E4B35]' : 'text-gray-400 hover:text-gray-900'">{{ appStore.t('producerStoryTab') }}</button>
          <button @click="activeDetailTab = 'records'" class="px-6 py-4 font-bold text-xs transition-all" :class="activeDetailTab === 'records' ? 'text-[#1E4B35] border-b-2 border-[#1E4B35]' : 'text-gray-400 hover:text-gray-900'">{{ appStore.t('recordsTab') }}</button>
          <button @click="activeDetailTab = 'shipping'" class="px-6 py-4 font-bold text-xs transition-all" :class="activeDetailTab === 'shipping' ? 'text-[#1E4B35] border-b-2 border-[#1E4B35]' : 'text-gray-400 hover:text-gray-900'">{{ appStore.t('shippingTab') }}</button>
        </div>
        <div class="p-6 lg:p-8">
          <div v-if="activeDetailTab === 'overview'" class="text-xs text-gray-600 leading-relaxed max-w-4xl space-y-3">
            <p>
              {{ appStore.t('overviewText1') }}
            </p>
            <p>
              {{ appStore.t('overviewText2') }}
            </p>
          </div>
          
          <div v-if="activeDetailTab === 'story'" class="text-xs text-gray-600 leading-relaxed max-w-4xl space-y-4">
            <div class="flex flex-col md:flex-row gap-6 items-start">
              <div class="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=400" class="w-full h-full object-cover" />
              </div>
              <div class="space-y-2">
                <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('storyTitle') }}</h4>
                <p>
                  {{ appStore.t('storyText1') }}
                </p>
                <p>
                  {{ appStore.t('storyText2') }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="activeDetailTab === 'records'" class="text-sm text-gray-600 leading-relaxed max-w-4xl space-y-4 text-left">
            <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('activeLabTitle') }}</h4>
            <p class="mb-3">{{ appStore.t('activeLabDesc') }}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="p-3 border border-gray-150 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('moistureRate') }}</div>
                <div class="font-bold text-base text-[#1E4B35] mt-1">{{ activeBatch?.water_content ? activeBatch.water_content + '%' : '18.5%' }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('threshold') }} &lt; 20%</div>
              </div>
              <div class="p-3 border border-gray-150 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('hmfContent') }}</div>
                <div class="font-bold text-base text-[#1E4B35] mt-1">{{ activeBatch?.hmf_content ? activeBatch.hmf_content + ' mg/kg' : '12 mg/kg' }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('threshold') }} &lt; 40 mg/kg</div>
              </div>
              <div class="p-3 border border-gray-150 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('diastaseActivity') }}</div>
                <div class="font-bold text-base text-[#1E4B35] mt-1">{{ activeBatch?.diastase_activity ? activeBatch.diastase_activity + ' DN' : '15.2 DN' }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('threshold') }} &gt; 8 DN</div>
              </div>
              <div class="p-3 border border-gray-150 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('antibiotics') }}</div>
                <div class="font-bold text-base text-green-600 mt-1">{{ activeBatch?.adulteration_test || appStore.t('notDetected') }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('zeroTolerance') }}</div>
              </div>
            </div>
          </div>

          <div v-if="activeDetailTab === 'shipping'" class="space-y-12">
            <!-- 1. Header Banner -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-green-100/50 shadow-sm">
              <div class="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 border border-green-100">
                <div class="relative">
                  <Package class="w-16 h-16 text-[#1E4B35]" />
                  <div class="absolute -bottom-1 -right-1 bg-green-600 text-white rounded-full p-1 border-2 border-white">
                    <Check class="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div class="space-y-4 text-left">
                <h3 class="font-extrabold text-gray-900 text-base md:text-lg">
                  {{ appStore.lang === 'vi' ? 'Phối hợp đơn hàng – Vận chuyển bởi đối tác logistics chứng nhận' : 'Order Coordination – Shipped by Certified Logistics Partners' }}
                </h3>
                <p class="text-xs text-gray-600 leading-relaxed max-w-3xl">
                  {{ appStore.lang === 'vi' 
                    ? 'Green Trace chịu trách nhiệm điều phối đơn hàng, đảm bảo đóng gói đúng chuẩn và theo dõi hành trình. Việc vận chuyển được thực hiện bởi các đối tác logistics bên thứ ba có chứng nhận.' 
                    : 'Green Trace coordinates orders, packaging standards, and tracking. Shipping is executed by third-party certified logistics partners.' }}
                </p>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <ShieldCheck class="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span class="text-[10px] font-bold text-gray-700">{{ appStore.lang === 'vi' ? 'Mạng lưới uy tín' : 'Trusted Network' }}</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Droplet class="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span class="text-[10px] font-bold text-gray-700">{{ appStore.lang === 'vi' ? 'Đảm bảo nhiệt độ' : 'Temp Control' }}</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Scan class="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span class="text-[10px] font-bold text-gray-700">{{ appStore.lang === 'vi' ? 'Theo dõi real-time' : 'Real-time Track' }}</span>
                  </div>
                  <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                    <Globe class="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span class="text-[10px] font-bold text-gray-700">{{ appStore.lang === 'vi' ? 'Phục vụ toàn quốc' : 'Nationwide Delivery' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Kiểm tra khả năng giao hàng & Danh sách dịch vụ -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Form checker -->
              <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span class="w-1.5 h-3.5 bg-[#1E4B35] rounded-full"></span>
                  {{ appStore.lang === 'vi' ? '1. Kiểm tra khả năng giao hàng' : '1. Check Delivery Capability' }}
                </h4>
                <div class="space-y-3 text-xs text-left">
                  <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Địa chỉ' : 'Address' }}</label>
                    <input type="text" v-model="deliveryCheckAddress" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Tỉnh / Thành phố' : 'Province / City' }}</label>
                      <input type="text" v-model="deliveryCheckProvince" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Quận / Huyện' : 'District' }}</label>
                      <input type="text" v-model="deliveryCheckDistrict" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phường / Xã' : 'Ward' }}</label>
                      <input type="text" v-model="deliveryCheckWard" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Mã bưu chính' : 'Postal Code' }}</label>
                      <input type="text" v-model="deliveryCheckPostalCode" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
                    </div>
                  </div>
                  <button @click="triggerDeliveryCheck" :disabled="deliveryCheckLoading" class="w-full py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 mt-4 shadow-sm">
                    <span v-if="deliveryCheckLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{{ appStore.lang === 'vi' ? 'Kiểm tra' : 'Check Availability' }}</span>
                  </button>
                </div>

                <!-- Checker result -->
                <div v-if="deliveryCheckChecked && !deliveryCheckLoading" class="bg-green-50 border border-green-200 rounded-xl p-4 text-left flex items-start gap-3 mt-4">
                  <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <Check class="w-4 h-4" />
                  </div>
                  <div class="space-y-1">
                    <h5 class="font-bold text-green-900 text-xs">{{ appStore.lang === 'vi' ? 'Khu vực của bạn có thể giao hàng' : 'Delivery available to your location' }}</h5>
                    <p class="text-[10px] text-green-800 leading-relaxed">
                      {{ appStore.lang === 'vi' ? 'Chúng tôi hỗ trợ giao hàng nhanh, giao hàng tiêu chuẩn và chuỗi lạnh đến địa chỉ này.' : 'We support express, standard, and cold-chain delivery options to this address.' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Available services list -->
              <div class="lg:col-span-2 bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span class="w-1.5 h-3.5 bg-green-600 rounded-full"></span>
                  {{ appStore.lang === 'vi' ? 'Phương thức giao hàng có sẵn' : 'Available Shipping Methods' }}
                </h4>
                <div class="divide-y divide-gray-100 text-xs">
                  <div class="py-3.5 flex justify-between items-center gap-4">
                    <div class="flex items-center gap-3">
                      <img src="https://pos.nvncdn.com/4e732c-26/art/artCT/20200110_0VQJNbkpdGU2xAWRTyUbrMWM.png" alt="Ahamove" class="h-6 w-auto object-contain flex-shrink-0" />
                      <div class="text-left">
                        <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Giao tức thời (Same-day)' : 'Same-day Express' }}</h5>
                        <p class="text-[10px] text-gray-500 mt-0.5">{{ appStore.lang === 'vi' ? 'Giao trong ngày (6-8 giờ)' : 'Deliver today (6-8 hours)' }}</p>
                      </div>
                    </div>
                    <span class="font-bold text-gray-900">25.000 đ</span>
                  </div>

                  <div class="py-3.5 flex justify-between items-center gap-4">
                    <div class="flex items-center gap-3">
                      <img src="https://static.ybox.vn/2022/8/5/1660242139108-logo.png" alt="GHN" class="h-6 w-auto object-contain flex-shrink-0" />
                      <div class="text-left">
                        <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Giao nhanh (Next-day)' : 'Next-day Shipping' }}</h5>
                        <p class="text-[10px] text-gray-500 mt-0.5">{{ appStore.lang === 'vi' ? 'Giao vào ngày mai' : 'Deliver tomorrow' }}</p>
                      </div>
                    </div>
                    <span class="font-bold text-gray-900">18.000 đ</span>
                  </div>

                  <div class="py-3.5 flex justify-between items-center gap-4">
                    <div class="flex items-center gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Viettel_Post_logo.svg" alt="Viettel Post" class="h-6 w-auto object-contain flex-shrink-0" />
                      <div class="text-left">
                        <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Giao tiết kiệm (Standard)' : 'Standard Eco' }}</h5>
                        <p class="text-[10px] text-gray-500 mt-0.5">2 - 3 {{ appStore.lang === 'vi' ? 'ngày làm việc' : 'working days' }}</p>
                      </div>
                    </div>
                    <span class="font-bold text-gray-900">12.000 đ</span>
                  </div>

                  <div class="py-3.5 flex justify-between items-center gap-4">
                    <div class="flex items-center gap-3">
                      <img src="https://static.ybox.vn/2025/3/5/1742532386651-ABA-cooltrans-logo.jpg" alt="ABA cooltrans" class="h-6 w-auto object-contain flex-shrink-0" />
                      <div class="text-left">
                        <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Giao bảo quản lạnh (Chilled)' : 'Cold chain - Chilled' }}</h5>
                        <p class="text-[10px] text-gray-500 mt-0.5">1 - 2 {{ appStore.lang === 'vi' ? 'ngày (Nhiệt độ 0 - 4°C)' : 'days (0 - 4°C)' }}</p>
                      </div>
                    </div>
                    <span class="font-bold text-gray-900">20.000 đ</span>
                  </div>

                  <div class="py-3.5 flex justify-between items-center gap-4">
                    <div class="flex items-center gap-3">
                      <img src="https://static.ybox.vn/2025/3/5/1742532386651-ABA-cooltrans-logo.jpg" alt="ABA cooltrans" class="h-6 w-auto object-contain flex-shrink-0" />
                      <div class="text-left">
                        <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Giao bảo quản đông lạnh (Frozen)' : 'Cold chain - Frozen' }}</h5>
                        <p class="text-[10px] text-gray-500 mt-0.5">1 - 2 {{ appStore.lang === 'vi' ? 'ngày (Nhiệt độ < -18°C)' : 'days (< -18°C)' }}</p>
                      </div>
                    </div>
                    <span class="font-bold text-gray-900">25.000 đ</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Đối tác vận chuyển -->
            <div class="space-y-4">
              <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span class="w-1.5 h-3.5 bg-[#1E4B35] rounded-full"></span>
                {{ appStore.lang === 'vi' ? '2. Đối tác vận chuyển của chúng tôi' : '2. Our Logistics Partners' }}
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-left">
                <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between">
                  <div class="h-10 flex items-center mb-1">
                    <img src="https://pos.nvncdn.com/4e732c-26/art/artCT/20200110_0VQJNbkpdGU2xAWRTyUbrMWM.png" alt="Ahamove" class="h-8 w-auto object-contain" />
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Phạm vi' : 'Scope' }}</span><span class="font-semibold text-gray-700">Hà Nội & TP.HCM</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">API Sync</span><span class="font-bold text-green-600">Connected</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Nhiệt độ' : 'Temp' }}</span><span class="font-semibold text-gray-700">Ambient / Chilled</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Theo dõi' : 'Tracking' }}</span><span class="font-semibold text-gray-700">Live Real-time</span></div>
                  </div>
                </div>

                <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between">
                  <div class="h-10 flex items-center mb-1">
                    <img src="https://static.ybox.vn/2025/3/5/1742532386651-ABA-cooltrans-logo.jpg" alt="ABA cooltrans" class="h-8 w-auto object-contain rounded" />
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Phạm vi' : 'Scope' }}</span><span class="font-semibold text-gray-700">{{ appStore.lang === 'vi' ? 'Liên tỉnh' : 'Inter-provincial' }}</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">API Sync</span><span class="font-bold text-green-600">Connected</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Nhiệt độ' : 'Temp' }}</span><span class="font-semibold text-gray-700">0 - 4°C & &lt; -18°C</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Theo dõi' : 'Tracking' }}</span><span class="font-semibold text-gray-700">Live Sensors</span></div>
                  </div>
                </div>

                <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between">
                  <div class="h-10 flex items-center mb-1">
                    <img src="https://static.ybox.vn/2022/8/5/1660242139108-logo.png" alt="Giao Hàng Nhanh" class="h-8 w-auto object-contain" />
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Phạm vi' : 'Scope' }}</span><span class="font-semibold text-gray-700">63 {{ appStore.lang === 'vi' ? 'Tỉnh thành' : 'Provinces' }}</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">API Sync</span><span class="font-bold text-green-600">Connected</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Nhiệt độ' : 'Temp' }}</span><span class="font-semibold text-gray-700">Ambient</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Theo dõi' : 'Tracking' }}</span><span class="font-semibold text-gray-700">Standard API</span></div>
                  </div>
                </div>

                <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between">
                  <div class="h-10 flex items-center mb-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Viettel_Post_logo.svg" alt="Viettel Post" class="h-8 w-auto object-contain" />
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Phạm vi' : 'Scope' }}</span><span class="font-semibold text-gray-700">63 {{ appStore.lang === 'vi' ? 'Tỉnh thành' : 'Provinces' }}</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">API Sync</span><span class="font-bold text-green-600">Connected</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Nhiệt độ' : 'Temp' }}</span><span class="font-semibold text-gray-700">Ambient</span></div>
                    <div class="flex justify-between"><span class="text-gray-400">{{ appStore.lang === 'vi' ? 'Theo dõi' : 'Tracking' }}</span><span class="font-semibold text-gray-700">Standard API</span></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. Cách đơn hàng được chia và giao -->
            <div class="space-y-4">
              <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span class="w-1.5 h-3.5 bg-green-600 rounded-full"></span>
                {{ appStore.lang === 'vi' ? '3. Cách đơn hàng của bạn được chia và giao' : '3. How Your Order is Split & Shipped' }}
              </h4>
              <div class="border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
                <table class="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-50 border-b border-gray-150 text-[10px] font-bold text-gray-500 uppercase">
                      <th class="p-4">{{ appStore.lang === 'vi' ? 'Nhóm lô hàng' : 'Shipping Group' }}</th>
                      <th class="p-4">{{ appStore.lang === 'vi' ? 'Đặc tính bảo quản' : 'Storage Conditions' }}</th>
                      <th class="p-4">{{ appStore.lang === 'vi' ? 'Đối tác vận chuyển' : 'Logistics Partner' }}</th>
                      <th class="p-4">{{ appStore.lang === 'vi' ? 'Thời gian giao hàng' : 'Delivery Timeline' }}</th>
                      <th class="p-4 text-right">{{ appStore.lang === 'vi' ? 'Phí vận chuyển' : 'Shipping Fee' }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 bg-white">
                    <tr>
                      <td class="p-4 font-bold text-gray-900">
                        {{ appStore.lang === 'vi' ? 'Lô hàng 1: Hàng thường (Ambient)' : 'Group 1: Ambient Goods' }}
                      </td>
                      <td class="p-4">
                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-semibold text-[10px]">Thường (18 - 25°C)</span>
                      </td>
                      <td class="p-4 text-gray-600 font-semibold">Viettel Post / GHN</td>
                      <td class="p-4 text-gray-600">2 - 3 {{ appStore.lang === 'vi' ? 'ngày làm việc' : 'working days' }}</td>
                      <td class="p-4 text-right font-extrabold text-gray-900">12.000 đ</td>
                    </tr>
                    <tr>
                      <td class="p-4 font-bold text-gray-900">
                        {{ appStore.lang === 'vi' ? 'Lô hàng 2: Hàng mát (Chilled)' : 'Group 2: Chilled Goods' }}
                      </td>
                      <td class="p-4">
                        <span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold text-[10px]">Mát (0 - 4°C)</span>
                      </td>
                      <td class="p-4 text-gray-600 font-semibold">ABA cooltrans / Ahamove</td>
                      <td class="p-4 text-gray-600">1 - 2 {{ appStore.lang === 'vi' ? 'ngày làm việc' : 'working days' }}</td>
                      <td class="p-4 text-right font-extrabold text-gray-900">20.000 đ</td>
                    </tr>
                    <tr>
                      <td class="p-4 font-bold text-gray-900">
                        {{ appStore.lang === 'vi' ? 'Lô hàng 3: Hàng đông lạnh (Frozen)' : 'Group 3: Frozen Goods' }}
                      </td>
                      <td class="p-4">
                        <span class="px-2 py-0.5 bg-[#002855]/10 text-[#002855] rounded font-semibold text-[10px]">Đông lạnh (&lt; -18°C)</span>
                      </td>
                      <td class="p-4 text-gray-600 font-semibold">ABA cooltrans</td>
                      <td class="p-4 text-gray-600">1 - 2 {{ appStore.lang === 'vi' ? 'ngày làm việc' : 'working days' }}</td>
                      <td class="p-4 text-right font-extrabold text-gray-900">25.000 đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 5. Hành trình & 6. Chi phí -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs text-left">
              <!-- Timeline hành trình -->
              <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span class="w-1.5 h-3.5 bg-[#1E4B35] rounded-full"></span>
                  {{ appStore.lang === 'vi' ? '4. Hành trình đơn hàng của bạn' : '4. Your Order Journey' }}
                </h4>
                <div class="relative pl-6 border-l border-gray-200 space-y-6 py-2">
                  <div class="relative">
                    <span class="absolute -left-8 top-0.5 bg-[#1E4B35] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">1</span>
                    <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Xác nhận đơn hàng' : 'Order Confirmed' }}</h5>
                    <p class="text-[10px] text-gray-500 mt-0.5">{{ appStore.lang === 'vi' ? 'Hệ thống tự động đồng bộ sang đơn vị logistics.' : 'Automated synchronization to logistics partner.' }}</p>
                  </div>
                  <div class="relative">
                    <span class="absolute -left-8 top-0.5 bg-[#1E4B35] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">2</span>
                    <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Chuẩn bị hàng & Đóng gói' : 'Preparing & Packaging' }}</h5>
                    <p class="text-[10px] text-gray-500 mt-0.5">{{ appStore.lang === 'vi' ? 'Đóng gói theo tiêu chuẩn bảo quản nhiệt độ tương ứng.' : 'Packaged according to standard temperature controls.' }}</p>
                  </div>
                  <div class="relative">
                    <span class="absolute -left-8 top-0.5 bg-gray-200 text-gray-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">3</span>
                    <h5 class="font-bold text-gray-500">{{ appStore.lang === 'vi' ? 'Bàn giao đối tác vận chuyển' : 'Handed Over to Shipper' }}</h5>
                    <p class="text-[10px] text-gray-400 mt-0.5">{{ appStore.lang === 'vi' ? 'Đơn hàng được quét mã vạch và bắt đầu hành trình live tracking.' : 'Order scanned and live tracking initiated.' }}</p>
                  </div>
                  <div class="relative">
                    <span class="absolute -left-8 top-0.5 bg-gray-200 text-gray-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">4</span>
                    <h5 class="font-bold text-gray-500">{{ appStore.lang === 'vi' ? 'Nhận hàng & Xác nhận' : 'Received & Confirmed' }}</h5>
                    <p class="text-[10px] text-gray-400 mt-0.5">{{ appStore.lang === 'vi' ? 'Người dùng kiểm tra nhiệt độ hàng mát/lạnh và bấm xác nhận hoàn tất.' : 'User checks chilled/frozen state and confirms delivery.' }}</p>
                  </div>
                </div>
              </div>

              <!-- Chi phí vận chuyển -->
              <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span class="w-1.5 h-3.5 bg-green-600 rounded-full"></span>
                  {{ appStore.lang === 'vi' ? '5. Ước tính chi phí vận chuyển' : '5. Estimated Shipping Fees' }}
                </h4>
                <div class="space-y-2.5">
                  <div class="flex justify-between"><span class="text-gray-500">{{ appStore.lang === 'vi' ? 'Lô hàng 1 (Hàng thường)' : 'Group 1 (Ambient)' }}</span><span class="font-bold text-gray-900">12.000 đ</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">{{ appStore.lang === 'vi' ? 'Lô hàng 2 (Hàng mát)' : 'Group 2 (Chilled)' }}</span><span class="font-bold text-gray-900">20.000 đ</span></div>
                  <div class="flex justify-between"><span class="text-gray-500">{{ appStore.lang === 'vi' ? 'Lô hàng 3 (Hàng đông lạnh)' : 'Group 3 (Frozen)' }}</span><span class="font-bold text-gray-900">25.000 đ</span></div>
                  <div class="flex justify-between border-t border-gray-100 pt-2.5"><span class="text-gray-500">{{ appStore.lang === 'vi' ? 'Phí đóng gói đặc biệt' : 'Special Packing Fee' }}</span><span class="font-bold text-gray-900">3.000 đ</span></div>
                  <div class="flex justify-between text-green-600 font-semibold"><span class="text-green-600">{{ appStore.lang === 'vi' ? 'Chiết khấu Freeship' : 'Freeship Discount' }}</span><span>-10.000 đ</span></div>
                  <div class="flex justify-between border-t border-gray-150 pt-2.5 text-sm font-bold text-gray-900">
                    <span>{{ appStore.lang === 'vi' ? 'Tổng chi phí vận chuyển ước tính' : 'Total Shipping Fee' }}</span>
                    <span class="text-base text-[#1E4B35] font-extrabold">50.000 đ</span>
                  </div>
                  <div class="bg-green-50 border border-green-200 text-green-800 text-[10px] p-2.5 rounded-lg leading-relaxed mt-2 text-center">
                    {{ appStore.lang === 'vi' ? '🎉 Đã kích hoạt chính sách miễn phí vận chuyển cho đơn hàng từ 700.000 đ!' : '🎉 Free shipping applied for orders over 700,000 đ!' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 7. Tiêu chuẩn đóng gói & 8. Đổi trả hỗ trợ -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs text-left">
              <!-- Tiêu chuẩn đóng gói -->
              <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span class="w-1.5 h-3.5 bg-[#1E4B35] rounded-full"></span>
                  {{ appStore.lang === 'vi' ? '6. Tiêu chuẩn đóng gói & bảo quản' : '6. Packaging & Storage Standards' }}
                </h4>
                <div class="space-y-3">
                  <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span class="font-bold text-gray-900 text-[10px] uppercase block mb-1">Ambient (Thường)</span>
                    <p class="text-[10px] text-gray-600 leading-relaxed">
                      {{ appStore.lang === 'vi' ? 'Hộp carton cứng 5 lớp chống móp méo, có đệm khí chống sốc và kèm túi hạt hút ẩm.' : '5-layer hard carton box, bubbles, air-pillow, desiccants to avoid moisture.' }}
                    </p>
                  </div>
                  <div class="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <span class="font-bold text-blue-900 text-[10px] uppercase block mb-1">Chilled (Hàng mát)</span>
                    <p class="text-[10px] text-blue-800 leading-relaxed">
                      {{ appStore.lang === 'vi' ? 'Thùng xốp chuyên dụng, đá gel lạnh giữ nhiệt độ ổn định 0 - 4°C trong 36 giờ, có niêm phong bảo quản.' : 'Insulated box with gel ice packs maintaining 0 - 4°C for 36 hours, sealed.' }}
                    </p>
                  </div>
                  <div class="bg-[#002855]/5 p-3 rounded-xl border border-[#002855]/10">
                    <span class="font-bold text-[#002855] text-[10px] uppercase block mb-1">Frozen (Hàng đông lạnh)</span>
                    <p class="text-[10px] text-blue-900 leading-relaxed">
                      {{ appStore.lang === 'vi' ? 'Thùng xốp dày dặn tích hợp đá khô bảo quản độ lạnh tối đa dưới -18°C, hút chân không túi đựng sản phẩm.' : 'Heavy-duty insulated box with dry ice maintaining temp below -18°C, vacuum packed.' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Đổi trả & hỗ trợ giao hàng -->
              <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span class="w-1.5 h-3.5 bg-green-600 rounded-full"></span>
                  {{ appStore.lang === 'vi' ? '7. Đổi trả & hỗ trợ giao hàng' : '7. Returns & Support Policy' }}
                </h4>
                <div class="divide-y divide-gray-100">
                  <div class="py-2.5 flex items-start gap-3">
                    <div class="w-6 h-6 rounded bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div class="text-left">
                      <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Đổi trả miễn phí trong 7 ngày' : 'Free Returns in 7 Days' }}</h5>
                      <p class="text-[10px] text-gray-500 leading-relaxed mt-0.5">{{ appStore.lang === 'vi' ? 'Hỗ trợ đổi trả miễn phí nếu sản phẩm hư hỏng do vận chuyển hoặc không đạt chất lượng cam kết.' : 'Free returns for products damaged in transit or failing to meet quality.' }}</p>
                    </div>
                  </div>

                  <div class="py-2.5 flex items-start gap-3">
                    <div class="w-6 h-6 rounded bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div class="text-left">
                      <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Hỗ trợ hư hỏng chuỗi lạnh' : 'Cold Chain Failure Protection' }}</h5>
                      <p class="text-[10px] text-gray-500 leading-relaxed mt-0.5">{{ appStore.lang === 'vi' ? 'Trường hợp cảm biến nhiệt độ báo vượt ngưỡng bảo quản hàng mát/lạnh, hoàn tiền 100% không cần hoàn hàng.' : '100% refund without return if sensors indicate temperature control failure.' }}</p>
                    </div>
                  </div>

                  <div class="py-2.5 flex items-start gap-3">
                    <div class="w-6 h-6 rounded bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div class="text-left">
                      <h5 class="font-bold text-gray-900">{{ appStore.lang === 'vi' ? 'Hỗ trợ 24/7 Hotline' : '24/7 Hotline Support' }}</h5>
                      <p class="text-[10px] text-gray-500 leading-relaxed mt-0.5">{{ appStore.lang === 'vi' ? 'Nhóm phản ứng nhanh luôn sẵn sàng qua Hotline 1900 1234.' : 'Logistics emergency team ready at 1900 1234.' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 9. Câu hỏi thường gặp -->
            <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 class="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span class="w-1.5 h-3.5 bg-[#1E4B35] rounded-full"></span>
                {{ appStore.lang === 'vi' ? '8. Câu hỏi thường gặp' : '8. Frequently Asked Questions' }}
              </h4>
              <div class="space-y-3 text-xs text-left">
                <div class="border border-gray-100 rounded-xl overflow-hidden">
                  <button @click="activeFaqIndex = activeFaqIndex === 0 ? null : 0" class="w-full p-4 font-bold text-gray-800 bg-gray-50/50 hover:bg-gray-100/50 flex justify-between items-center transition">
                    <span>{{ appStore.lang === 'vi' ? 'Green Trace có giao hàng trong khu vực của tôi không?' : 'Does Green Trace ship to my area?' }}</span>
                    <span class="text-gray-400">{{ activeFaqIndex === 0 ? '−' : '+' }}</span>
                  </button>
                  <div v-show="activeFaqIndex === 0" class="p-4 border-t border-gray-100 bg-white leading-relaxed text-gray-600">
                    {{ appStore.lang === 'vi' ? 'Chúng tôi hợp tác với các đơn vị vận chuyển hàng đầu như GHN, Viettel Post để giao hàng toàn quốc 63 tỉnh thành. Bạn có thể sử dụng công cụ kiểm tra khả năng giao hàng ở trên.' : 'We partner with premium carriers to deliver nationwide. Check with our widget above.' }}
                  </div>
                </div>

                <div class="border border-gray-100 rounded-xl overflow-hidden">
                  <button @click="activeFaqIndex = activeFaqIndex === 1 ? null : 1" class="w-full p-4 font-bold text-gray-800 bg-gray-50/50 hover:bg-gray-100/50 flex justify-between items-center transition">
                    <span>{{ appStore.lang === 'vi' ? 'Đơn hàng có thể giao trong ngày không?' : 'Is same-day shipping available?' }}</span>
                    <span class="text-gray-400">{{ activeFaqIndex === 1 ? '−' : '+' }}</span>
                  </button>
                  <div v-show="activeFaqIndex === 1" class="p-4 border-t border-gray-100 bg-white leading-relaxed text-gray-600">
                    {{ appStore.lang === 'vi' ? 'Đối với khu vực nội thành Hà Nội và TP.HCM, bạn có thể lựa chọn dịch vụ Ahamove để giao nhanh trong vòng 6-8 giờ làm việc.' : 'Yes, inner-city Hanoi and Ho Chi Minh City support Ahamove same-day express (6-8 hours).' }}
                  </div>
                </div>

                <div class="border border-gray-100 rounded-xl overflow-hidden">
                  <button @click="activeFaqIndex = activeFaqIndex === 2 ? null : 2" class="w-full p-4 font-bold text-gray-800 bg-gray-50/50 hover:bg-gray-100/50 flex justify-between items-center transition">
                    <span>{{ appStore.lang === 'vi' ? 'Tôi có thể kiểm soát và kiểm tra nhiệt độ hàng lạnh như thế nào?' : 'How do I monitor cold chain temperature?' }}</span>
                    <span class="text-gray-400">{{ activeFaqIndex === 2 ? '−' : '+' }}</span>
                  </button>
                  <div v-show="activeFaqIndex === 2" class="p-4 border-t border-gray-100 bg-white leading-relaxed text-gray-600">
                    {{ appStore.lang === 'vi' ? 'Đơn hàng lạnh được gắn cảm biến báo đỏ/xanh hoặc nhãn đo nhiệt độ. Khi nhận hàng, quý khách có thể kiểm tra trực quan trên nhãn bảo quản trước khi ký xác nhận.' : 'Cold packages feature indicators or sensors. Check indicators visually before signing.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Supporting Records -->
      <div class="mb-12">
        <h3 class="font-bold text-gray-900 text-lg mb-2">{{ appStore.t('recordsTab') }}</h3>
        <p class="text-xs text-gray-400 mb-6">{{ appStore.t('sampleNote') }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-[#1E4B35]"><FileText class="w-5 h-5"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('sampleBatchRecordTitle') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed mb-3">{{ appStore.t('sampleBatchRecordDesc') }}</p>
              <button @click="isReportModalOpen = true" class="text-[10px] font-bold text-[#1E4B35] hover:underline flex items-center gap-1">{{ appStore.t('viewSampleRecordBtn') }} &rarr;</button>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-[#1E4B35]"><FlaskConical class="w-5 h-5"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('sampleLabReportTitle') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed mb-3">{{ appStore.t('sampleLabReportDesc') }}</p>
              <button @click="isReportModalOpen = true" class="text-[10px] font-bold text-[#1E4B35] hover:underline flex items-center gap-1">{{ appStore.t('viewSampleReportBtn') }} &rarr;</button>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-[#1E4B35]"><User class="w-5 h-5"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-1">{{ appStore.t('reviewedProducerTitle') }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed mb-3">{{ appStore.t('reviewedProducerDesc') }}</p>
              <router-link to="/producer/1" class="text-[10px] font-bold text-[#1E4B35] hover:underline flex items-center gap-1">{{ appStore.t('viewProducerProfileBtn') }} &rarr;</router-link>
            </div>
          </div>
        </div>

        <p class="text-[10px] text-gray-400 italic">{{ appStore.t('sampleNote') }}</p>
      </div>

      <!-- About the Producer -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-sm mb-12">
        <h3 class="font-bold text-gray-400 text-xs uppercase tracking-wider mb-6">{{ appStore.t('aboutProducer') }}</h3>
        <div class="flex flex-col lg:flex-row gap-8 items-center">
          <div class="w-full lg:w-1/3 h-52 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400" alt="Beekeepers" class="w-full h-full object-cover" />
          </div>
          <div class="flex-grow space-y-4">
            <div class="flex items-center gap-3">
              <h4 class="font-bold text-gray-900 text-xl">U Minh Bee Farm</h4>
              <span class="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold border border-green-200">{{ appStore.t('verifiedProducer') }}</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">
              {{ appStore.t('producerDesc') }}
            </p>
            <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600 pt-2">
              <span class="flex items-center gap-1.5"><MapPin class="w-4 h-4 text-gray-400"/> Ca Mau, Vietnam</span>
              <span class="flex items-center gap-1.5"><Leaf class="w-4 h-4 text-gray-400"/> {{ appStore.t('natureFriendly') }}</span>
              <span class="flex items-center gap-1.5"><Award class="w-4 h-4 text-gray-400"/> {{ appStore.t('yearsExperience') }}</span>
            </div>
          </div>
          <div class="flex-shrink-0">
            <router-link to="/producer/1" class="px-6 py-3 border border-gray-300 hover:border-[#1E4B35] hover:text-[#1E4B35] rounded-xl text-xs font-bold transition inline-block">
              {{ appStore.t('viewFullProfile') }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- You might also like -->
      <div class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-gray-900 text-lg">{{ appStore.t('youMayAlsoLike') }}</h3>
          <div class="flex gap-2">
            <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition"><ChevronLeft class="w-4 h-4"/></button>
            <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition"><ChevronRight class="w-4 h-4"/></button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="rec in recommendations" :key="rec.name" class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition">
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden">
              <img :src="rec.image" class="w-full h-full object-cover" />
            </div>
            <div class="p-4 space-y-1">
              <h4 class="font-bold text-gray-900 text-xs line-clamp-1">{{ rec.name }}</h4>
              <div class="flex items-center gap-1 text-[10px] text-yellow-400">
                <Star class="w-3.5 h-3.5 fill-current" />
                <span class="font-bold text-gray-700">{{ rec.rating }}</span>
                <span class="text-gray-400">({{ rec.reviews }})</span>
              </div>
              <div class="font-extrabold text-[#1E4B35] text-xs pt-1">{{ rec.price.toLocaleString() }} VND</div>
            </div>
          </div>
        </div>
      </div>

      <!-- What customers say -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-sm">
        <h3 class="font-bold text-gray-900 text-base mb-6">{{ appStore.t('whatCustomersSay') }}</h3>
        
        <div class="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-gray-100 pb-6 mb-6">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" class="w-full h-full object-cover" />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-gray-900 text-sm">Thanh H.</span>
                <span class="bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-150">{{ appStore.t('verifiedBuyer') }}</span>
              </div>
              <div class="flex text-yellow-400 mb-2">
                <Star v-for="i in 5" :key="i" class="w-3.5 h-3.5 fill-current" />
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                {{ appStore.t('reviewText') }}
              </p>
            </div>
          </div>
          <span class="text-[10px] text-gray-400 font-medium">24 May 2026</span>
        </div>

        <div class="text-center">
          <a href="#" class="text-xs font-bold text-[#1E4B35] hover:underline flex items-center justify-center gap-1">
            {{ appStore.t('viewAllReviews') }} <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>

    <!-- CART SUCCESS MODAL -->
    <div v-if="isCartModalOpen" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 border border-gray-100 text-center relative">
        <button @click="isCartModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
        
        <div class="w-12 h-12 bg-green-50 text-[#1E4B35] rounded-full flex items-center justify-center mx-auto mb-2">
          <Check class="w-6 h-6" />
        </div>
        
        <h3 class="font-bold text-gray-900 text-base">{{ appStore.t('addedToCartTitle') }}</h3>
        <p class="text-xs text-gray-500">{{ appStore.t('addedToCartDesc') }}</p>
        
        <div class="border border-gray-100 rounded-xl p-3 bg-gray-50 flex items-center gap-3 text-left">
          <div class="w-12 h-12 rounded overflow-hidden bg-white border border-gray-200 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
          </div>
          <div class="text-xs">
            <h4 class="font-bold text-gray-900 line-clamp-1">{{ product ? product.name : 'U Minh Forest Wild Honey' }}</h4>
            <div class="text-gray-500 mt-0.5">{{ appStore.t('qtyLabel') }} {{ qty }}</div>
            <div class="font-bold text-[#1E4B35] mt-0.5">{{ product ? (product.price * qty).toLocaleString() : (229000 * qty).toLocaleString() }} VND</div>
          </div>
        </div>

        <div class="flex flex-col gap-2 pt-2">
          <router-link to="/checkout" class="w-full py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold text-center block transition">
            {{ appStore.t('proceedToCheckout') }}
          </router-link>
          <router-link to="/cart" class="w-full py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-bold text-center block transition">
            {{ appStore.t('viewShoppingCart') }}
          </router-link>
          <button @click="isCartModalOpen = false" class="text-xs text-gray-400 hover:text-gray-600 font-semibold pt-1">{{ appStore.t('continueShopping') }}</button>
        </div>
      </div>
    </div>

    <!-- LAB REPORT MODAL -->
    <div v-if="isReportModalOpen" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 border border-gray-100 relative max-h-[90vh] overflow-y-auto">
        <button @click="isReportModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
        
        <div class="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div class="w-10 h-10 bg-green-50 text-[#1E4B35] rounded-xl flex items-center justify-center">
            <FlaskConical class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-base">{{ appStore.t('labAnalysisReport') }}</h3>
            <p class="text-xs text-gray-400">{{ appStore.t('batchCode') }} {{ activeBatch ? activeBatch.id : 'LOT-UMH-2605-001' }}</p>
          </div>
        </div>

        <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 space-y-4 text-xs">
          <div class="flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100 pb-2">
            <span>{{ appStore.t('testingFacility') }} Eurofins Agri Testing</span>
            <span>{{ appStore.t('date') }} {{ activeBatch ? formatDate(activeBatch.harvest_date) : '22 May 2026' }}</span>
          </div>

          <div class="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('productName') }}</span>
              <span class="font-semibold text-gray-700">{{ product ? product.name : 'U Minh Wild Honey, 500 ml' }}</span>
            </div>
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('manufacturer') }}</span>
              <span class="font-semibold text-gray-700">{{ product?.producer_name || 'U Minh Bee Farm Co.' }}</span>
            </div>
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('reportStatus') }}</span>
              <span class="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-150 inline-block mt-0.5">{{ activeBatch?.status || appStore.t('passedVerified') }}</span>
            </div>
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('accreditation') }}</span>
              <span class="font-semibold text-gray-700">ISO/IEC 17025 standard</span>
            </div>
          </div>

          <div class="border-t border-gray-100 pt-3">
            <h4 class="font-bold text-gray-800 mb-2">{{ appStore.t('physicoChemical') }}</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('moistureRate') }}</span>
                <div class="text-right">
                  <span class="font-bold text-[#1E4B35]">{{ activeBatch?.water_content ? activeBatch.water_content + '%' : '18.5%' }}</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('required') }} &le; 20%</span>
                </div>
              </div>
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('hmfContent') }}</span>
                <div class="text-right">
                  <span class="font-bold text-[#1E4B35]">{{ activeBatch?.hmf_content ? activeBatch.hmf_content + ' mg/kg' : '12.0 mg/kg' }}</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('required') }} &le; 40 mg/kg</span>
                </div>
              </div>
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('diastaseActivity') }}</span>
                <div class="text-right">
                  <span class="font-bold text-[#1E4B35]">{{ activeBatch?.diastase_activity ? activeBatch.diastase_activity + ' DN' : '15.2 DN' }}</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('required') }} &ge; 8.0 DN</span>
                </div>
              </div>
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('c3c4Sugars') }}</span>
                <div class="text-right">
                  <span class="font-bold text-green-600">{{ activeBatch?.adulteration_test || appStore.t('notDetected') }}</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('pureHoneyVerif') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2 border-t border-gray-150">
          <button @click="isReportModalOpen = false" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">
            {{ appStore.t('closeReport') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight, ChevronLeft, Star, Check, User, MapPin, Package, Sparkles, Heart, ShoppingCart, Scan, ShieldCheck, PackageCheck, CreditCard, Trees, Droplet, Globe, FileText, FlaskConical, Award, ArrowRight } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const qty = ref(1)
const activeImageIndex = ref(0)
const activeDetailTab = ref('overview')
const isCartModalOpen = ref(false)
const isReportModalOpen = ref(false)
const product = ref(null)
const loading = ref(true)

const activeBatch = computed(() => {
  if (product.value?.batches && product.value.batches.length > 0) {
    return product.value.batches[0]
  }
  return null
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString(appStore.lang === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return dateStr
  }
}

const productImages = computed(() => {
  const images = []
  if (product.value?.image_url) {
    images.push(product.value.image_url)
  }
  if (product.value?.specifications?.detail_images && Array.isArray(product.value.specifications.detail_images)) {
    images.push(...product.value.specifications.detail_images)
  }
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800')
  }
  return images
})

const activeImage = computed(() => productImages.value[activeImageIndex.value] || '')

const prevImg = () => {
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--
  } else {
    activeImageIndex.value = productImages.value.length - 1
  }
}

const nextImg = () => {
  if (activeImageIndex.value < productImages.value.length - 1) {
    activeImageIndex.value++
  } else {
    activeImageIndex.value = 0
  }
}

const recommendations = ref([
  {
    name: 'Tram Honey, 500 ml',
    rating: 4.7,
    reviews: 96,
    price: 195000,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Wildflower Honey, 500 ml',
    rating: 4.8,
    reviews: 77,
    price: 215000,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Forest Honey Comb, 300 g',
    rating: 4.6,
    reviews: 42,
    price: 179000,
    image: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=300'
  }
])

const addToCart = () => {
  if (product.value) {
    const item = {
      id: product.value.id,
      name: product.value.name,
      price: parseFloat(product.value.price),
      image_url: product.value.image_url || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
      producer_name: product.value.producer_name || 'Verified Cooperative',
      producer_location: product.value.producer_location || 'Vietnam'
    }
    appStore.addToCart(item, qty.value)
    isCartModalOpen.value = true
  }
}

const buyNow = () => {
  if (product.value) {
    const item = {
      id: product.value.id,
      name: product.value.name,
      price: parseFloat(product.value.price),
      image_url: product.value.image_url || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
      producer_name: product.value.producer_name || 'Verified Cooperative',
      producer_location: product.value.producer_location || 'Vietnam'
    }
    appStore.addToCart(item, qty.value)
    router.push('/checkout')
  }
}

const isWishlisted = computed(() => {
  if (!product.value) return false
  return appStore.wishlist.some(w => parseInt(w.id) === parseInt(product.value.id))
})

const toggleWishlist = () => {
  if (product.value) {
    appStore.toggleWishlist(product.value.id)
  }
}

const activeFaqIndex = ref(null)
const deliveryCheckAddress = ref('12 Nguyễn Trãi, Thanh Xuân')
const deliveryCheckProvince = ref('Hà Nội')
const deliveryCheckDistrict = ref('Thanh Xuân')
const deliveryCheckWard = ref('Khương Đình')
const deliveryCheckPostalCode = ref('100000')
const deliveryCheckLoading = ref(false)
const deliveryCheckChecked = ref(true)

const triggerDeliveryCheck = () => {
  deliveryCheckLoading.value = true
  setTimeout(() => {
    deliveryCheckLoading.value = false
    deliveryCheckChecked.value = true
  }, 1000)
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id
    const data = await appStore.fetchProduct(id)
    product.value = data
  } catch (error) {
    console.error('Failed to load product details:', error)
  } finally {
    loading.value = false
  }
})
</script>
