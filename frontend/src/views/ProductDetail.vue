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
          <span class="text-[#1E4B35] font-semibold">{{ product ? product.name : 'U Minh Forest Wild Honey, 500 ml' }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <!-- Main product intro grid -->
      <div class="bg-white rounded-3xl border border-gray-200 p-6 lg:p-8 shadow-sm mb-8">
        <div class="flex flex-col lg:flex-row gap-10">
          
          <!-- Product Images Column -->
          <div class="w-full lg:w-1/2 flex flex-col gap-4">
            <div class="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <img :src="activeImage" alt="Honey main image" class="w-full h-full object-cover" />
              <!-- Carousel Controls -->
              <button @click="prevImg" class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm">
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button @click="nextImg" class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm">
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Thumbnail gallery -->
            <div class="flex gap-3 justify-center">
              <div v-for="(img, idx) in productImages" :key="idx" @click="activeImageIndex = idx" class="w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition relative" :class="activeImageIndex === idx ? 'border-[#1E4B35]' : 'border-transparent'">
                <img :src="img" class="w-full h-full object-cover" />
                <div v-if="idx === 4" class="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm">+2</div>
              </div>
            </div>
          </div>

          <!-- Product Details Column -->
          <div class="w-full lg:w-1/2 flex flex-col justify-between">
            <div v-if="product">
              <span class="bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-2.5 py-1 rounded inline-block mb-3">{{ product.category || 'General' }}</span>
              <h1 class="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{{ product.name }}</h1>
              
              <div class="flex items-center gap-1.5 text-sm mb-4">
                <span class="text-gray-500">{{ appStore.t('by') }}</span>
                <router-link :to="'/producer/' + (product.producer_id || 1)" class="text-[#1E4B35] font-bold underline hover:text-[#163a29]">{{ product.producer_name || appStore.t('verifiedFarm') }}</router-link>
              </div>

              <!-- Rating, Verification -->
              <div class="flex flex-wrap items-center gap-3 text-xs mb-5">
                <div class="flex text-yellow-400">
                  <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
                </div>
                <span class="font-bold text-gray-700">{{ product.rating || '5.0' }}</span>
                <span class="text-gray-400">({{ product.reviews_count || '0' }} {{ appStore.t('reviewsCount') }})</span>
                <span class="bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold border border-green-200 flex items-center gap-1">
                  <Check class="w-3 h-3"/> {{ appStore.t('verifiedProducer') }}
                </span>
              </div>

              <!-- Price -->
              <div class="mb-5">
                <div class="text-3xl font-extrabold text-[#1E4B35]">{{ parseFloat(product.price).toLocaleString() }} VND</div>
                <div class="text-[10px] text-gray-400 mt-0.5">({{ appStore.t('taxIncluded') }})</div>
              </div>

              <p class="text-xs text-gray-600 leading-relaxed mb-6">
                {{ product.description || 'Verified organic agricultural produce sourced directly from eco-friendly local cooperatives.' }}
              </p>

              <!-- Specs Table list -->
              <div class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 mb-6 text-xs text-gray-600">
                <div class="flex items-center gap-2">
                  <User class="w-4 h-4 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.t('producerSpec') }}</span> <span class="font-semibold text-gray-900">{{ product.producer_name || 'Verified Cooperative' }}</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <MapPin class="w-4 h-4 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.t('locationSpec') }}</span> <span class="font-semibold text-gray-900">{{ product.producer_location || 'Vietnam' }}</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <Package class="w-4 h-4 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.t('categorySpec') }}</span> <span class="font-semibold text-gray-900">{{ product.category }}</span></span>
                </div>
                <div class="flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-gray-400" />
                  <span><span class="text-gray-400">{{ appStore.t('packagingSpec') }}</span> <span class="font-semibold text-gray-900">{{ product.specifications?.packaging || 'Standard Pack' }}</span></span>
                </div>
              </div>
            </div>
            <div v-else class="py-12 text-center text-gray-400 text-xs font-semibold">
              {{ appStore.t('loadingDetails') }}
            </div>

            <!-- Actions Row -->
            <div v-if="product">
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center border border-gray-200 rounded-lg h-12 w-32 flex-shrink-0">
                  <button @click="qty > 1 ? qty-- : null" class="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold transition">-</button>
                  <span class="w-12 text-center text-xs font-bold text-gray-900">{{ qty }}</span>
                  <button @click="qty++" class="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold transition">+</button>
                </div>

                <button @click="toggleWishlist" class="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center transition" :class="isWishlisted ? 'border-red-500 text-red-500 hover:bg-red-50' : 'text-gray-500 hover:border-[#1E4B35] hover:text-[#1E4B35]'">
                  <Heart class="w-5 h-5" :class="{ 'fill-current': isWishlisted }" />
                </button>

                <button @click="addToCart" class="flex-grow h-12 border border-[#1E4B35] text-[#1E4B35] font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-50 transition">
                  <ShoppingCart class="w-5 h-5" /> {{ appStore.t('addToCart') }}
                </button>
              </div>
              <router-link to="/checkout" class="w-full h-12 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg font-bold flex items-center justify-center transition shadow shadow-[#1E4B35]/25">
                {{ appStore.t('buyNow') }}
              </router-link>
            </div>

          </div>
        </div>

        <!-- Trust Features Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-center">
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-700">
            <Scan class="w-4 h-4 text-green-600" /> {{ appStore.t('traceableToBatch') }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-700">
            <ShieldCheck class="w-4 h-4 text-green-600" /> {{ appStore.t('verifiedProducer') }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-700">
            <PackageCheck class="w-4 h-4 text-green-600" /> {{ appStore.t('carefullyPacked') }}
          </div>
          <div class="flex items-center justify-center gap-2 text-xs font-bold text-gray-700">
            <CreditCard class="w-4 h-4 text-green-600" /> {{ appStore.t('securePaymentsTitle') }}
          </div>
        </div>
      </div>

      <!-- Why choose / batch preview / delivery columns -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Column 1: Why people choose this product -->
        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <h3 class="font-bold text-gray-900 text-sm">{{ appStore.t('whyPeopleChoose') }}</h3>
          
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0"><Trees class="w-5 h-5 text-green-600"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-0.5">{{ appStore.t('fromForest') }}</h4>
              <p class="text-[10px] text-gray-500 leading-normal">{{ appStore.t('fromForestDesc') }}</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0"><Droplet class="w-5 h-5 text-green-600"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-0.5">{{ appStore.t('rawUnfiltered') }}</h4>
              <p class="text-[10px] text-gray-500 leading-normal">{{ appStore.t('rawUnfilteredDesc') }}</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0"><Globe class="w-5 h-5 text-green-600"/></div>
            <div>
              <h4 class="font-bold text-gray-900 text-xs mb-0.5">{{ appStore.t('traceableTransparent') }}</h4>
              <p class="text-[10px] text-gray-500 leading-normal">{{ appStore.t('traceableTransparentDesc') }}</p>
            </div>
          </div>
        </div>

        <!-- Column 2: Batch record preview -->
        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <h3 class="font-bold text-gray-900 text-sm mb-4">{{ appStore.t('batchRecordPreview') }}</h3>
          
          <div class="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
            <div class="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <span class="text-[9px] text-gray-400 block">{{ appStore.t('batchId') }}</span>
                <span class="font-mono font-bold text-xs text-gray-900">LOT-UMH-2605-001</span>
              </div>
              <span class="bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-200">{{ appStore.t('sampleRecord') }}</span>
            </div>
            
            <div class="text-[10px] space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('harvestDate') }}</span>
                <span class="font-semibold text-gray-700">19 May 2026</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('locationSpec') }}</span>
                <span class="font-semibold text-gray-700">U Minh Forest, Ca Mau</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('speciesSource') }}</span>
                <span class="font-semibold text-gray-700">Melaleuca (Tràm)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">{{ appStore.t('status') }}</span>
                <span class="font-semibold text-gray-700">{{ appStore.t('samplePreviewStatus') }}</span>
              </div>
            </div>
          </div>

          <router-link to="/traceability" class="w-full py-2 border border-gray-300 text-gray-700 text-xs font-bold text-center rounded-lg hover:bg-gray-50 transition mt-4 block">
            {{ appStore.t('viewBatchRecord') }}
          </router-link>
        </div>

        <!-- Column 3: Delivered with care -->
        <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div class="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-[#1E4B35] mb-4">
            <PackageCheck class="w-7 h-7" />
          </div>
          <h4 class="font-bold text-gray-900 text-sm mb-1.5">{{ appStore.t('deliveredWithCare') }}</h4>
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

          <div v-if="activeDetailTab === 'records'" class="text-xs text-gray-600 leading-relaxed max-w-4xl space-y-4">
            <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('activeLabTitle') }}</h4>
            <p class="mb-3">{{ appStore.t('activeLabDesc') }}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('moistureRate') }}</div>
                <div class="font-bold text-base text-[#1E4B35] mt-1">18.5%</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('threshold') }} &lt; 20%</div>
              </div>
              <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('hmfContent') }}</div>
                <div class="font-bold text-base text-[#1E4B35] mt-1">12 mg/kg</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('threshold') }} &lt; 40 mg/kg</div>
              </div>
              <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('diastaseActivity') }}</div>
                <div class="font-bold text-base text-[#1E4B35] mt-1">15.2 DN</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('threshold') }} &gt; 8 DN</div>
              </div>
              <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                <div class="text-gray-400 text-[10px]">{{ appStore.t('antibiotics') }}</div>
                <div class="font-bold text-base text-green-600 mt-1">{{ appStore.t('notDetected') }}</div>
                <div class="text-[9px] text-gray-500 mt-0.5">{{ appStore.t('zeroTolerance') }}</div>
              </div>
            </div>
          </div>

          <div v-if="activeDetailTab === 'shipping'" class="text-xs text-gray-600 leading-relaxed max-w-4xl space-y-3">
            <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('deliveryReturnGuide') }}</h4>
            <p>
              <strong>{{ appStore.t('ecoPackaging') }}</strong> {{ appStore.t('ecoPackagingDesc') }}
            </p>
            <p>
              <strong>{{ appStore.t('shippingTimelines') }}</strong> {{ appStore.t('shippingTimelinesDesc') }}
            </p>
            <p>
              <strong>{{ appStore.t('sevenDayReturns') }}</strong> {{ appStore.t('sevenDayReturnsDesc') }}
            </p>
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
            <p class="text-xs text-gray-400">{{ appStore.t('batchCode') }} LOT-UMH-2605-001</p>
          </div>
        </div>

        <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 space-y-4 text-xs">
          <div class="flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100 pb-2">
            <span>{{ appStore.t('testingFacility') }} Eurofins Agri Testing</span>
            <span>{{ appStore.t('date') }} 22 May 2026</span>
          </div>

          <div class="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('productName') }}</span>
              <span class="font-semibold text-gray-700">U Minh Wild Honey, 500 ml</span>
            </div>
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('manufacturer') }}</span>
              <span class="font-semibold text-gray-700">U Minh Bee Farm Co.</span>
            </div>
            <div>
              <span class="text-gray-400 block text-[9px] uppercase">{{ appStore.t('reportStatus') }}</span>
              <span class="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-150 inline-block mt-0.5">{{ appStore.t('passedVerified') }}</span>
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
                  <span class="font-bold text-[#1E4B35]">18.5%</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('required') }} &le; 20%</span>
                </div>
              </div>
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('hmfContent') }}</span>
                <div class="text-right">
                  <span class="font-bold text-[#1E4B35]">12.0 mg/kg</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('required') }} &le; 40 mg/kg</span>
                </div>
              </div>
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('diastaseActivity') }}</span>
                <div class="text-right">
                  <span class="font-bold text-[#1E4B35]">15.2 DN</span>
                  <span class="text-[9px] text-gray-400 block">{{ appStore.t('required') }} &ge; 8.0 DN</span>
                </div>
              </div>
              <div class="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span class="font-medium text-gray-700">{{ appStore.t('c3c4Sugars') }}</span>
                <div class="text-right">
                  <span class="font-bold text-green-600">{{ appStore.t('notDetected') }}</span>
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
import { useRoute } from 'vue-router'
import { ChevronRight, ChevronLeft, Star, Check, User, MapPin, Package, Sparkles, Heart, ShoppingCart, Scan, ShieldCheck, PackageCheck, CreditCard, Trees, Droplet, Globe, FileText, FlaskConical, Award, ArrowRight } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const appStore = useAppStore()

const qty = ref(1)
const activeImageIndex = ref(0)
const activeDetailTab = ref('overview')
const isCartModalOpen = ref(false)
const isReportModalOpen = ref(false)
const product = ref(null)
const loading = ref(true)

const productImages = computed(() => {
  const images = []
  if (product.value?.image_url) {
    images.push(product.value.image_url)
  }
  if (product.value?.specifications?.detail_images && Array.isArray(product.value.specifications.detail_images)) {
    images.push(...product.value.specifications.detail_images)
  }
  const fallbacks = [
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800'
  ]
  let fallbackIndex = 0
  while (images.length < 4 && fallbackIndex < fallbacks.length) {
    images.push(fallbacks[fallbackIndex++])
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
    appStore.addToCart(product.value, qty.value)
    isCartModalOpen.value = true
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
