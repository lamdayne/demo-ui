<template>
  <div class="bg-white pb-16">
    <!-- Hero Section -->
    <div class="bg-gray-50 relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-green-900/10 to-transparent"></div>
      
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center py-16 lg:py-24">
        <div class="w-full md:w-3/5 pr-4 lg:pr-12">
          <h1 class="text-5xl lg:text-6xl font-bold text-[#1E4B35] leading-tight mb-6" v-html="appStore.t('homeHeroTitle')">
          </h1>
          <p class="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
            {{ appStore.t('homeHeroSubtitle') }}
          </p>
          <div class="flex flex-wrap gap-4 mb-12">
            <router-link to="/products" class="bg-[#1E4B35] text-white px-6 py-3.5 rounded-lg font-bold hover:bg-[#163a29] transition shadow-lg shadow-[#1E4B35]/20">
              {{ appStore.t('shopVerified') }}
            </router-link>
            <router-link to="/traceability" class="bg-white border-2 border-[#1E4B35] text-[#1E4B35] px-6 py-3.5 rounded-lg font-bold hover:bg-green-50 transition">
              {{ appStore.t('exploreBatch') }}
            </router-link>
          </div>
          
          <!-- Stats Bar -->
          <div class="bg-white/80 backdrop-blur border border-white rounded-xl shadow-lg shadow-gray-200/50 p-4 inline-flex flex-wrap divide-x divide-gray-200">
            <div class="px-6 flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                <Package class="w-5 h-5 text-green-700"/>
              </div>
              <div>
                <div class="font-bold text-gray-900 text-lg leading-none">6</div>
                <div class="text-xs text-gray-500 font-medium mt-1">{{ appStore.t('sampleProducts') }}</div>
              </div>
            </div>
            <div class="px-6 flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                <Users class="w-5 h-5 text-green-700"/>
              </div>
              <div>
                <div class="font-bold text-gray-900 text-lg leading-none">6</div>
                <div class="text-xs text-gray-500 font-medium mt-1">{{ appStore.t('sampleProducers') }}</div>
              </div>
            </div>
            <div class="px-6 flex items-center gap-4">
              <div class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                <ClipboardList class="w-5 h-5 text-green-700"/>
              </div>
              <div>
                <div class="font-bold text-gray-900 text-lg leading-none">12</div>
                <div class="text-xs text-gray-500 font-medium mt-1">{{ appStore.t('simulatedBatches') }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-2/5 mt-12 md:mt-0 relative h-80 lg:h-[450px]">
          <div class="w-full h-full bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative">
             <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1783003478/734555016_1342639110533602_5621359612570324386_n_caocha.png" alt="Smiling farmer with fresh produce" class="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl mt-16">
      <!-- Featured Categories -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-[#1E4B35] mb-6">{{ appStore.t('featuredCategoriesLabel') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <router-link 
            v-for="(cat, idx) in categories" 
            :key="idx" 
            :to="'/products?category=' + cat.name"
            class="group cursor-pointer block text-center"
          >
            <div class="bg-gray-100 rounded-2xl aspect-[4/3] mb-3 overflow-hidden relative border border-gray-100">
               <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="flex items-center justify-center gap-2 font-bold text-gray-900 text-sm group-hover:text-[#1E4B35] transition">
              <component :is="cat.icon" class="w-4 h-4" :class="cat.color" /> {{ cat.name }}
            </div>
          </router-link>
        </div>
      </div>

      <!-- Best Sellers -->
      <div class="mb-16">
        <div class="flex justify-between items-end mb-6">
          <h2 class="text-2xl font-bold text-[#1E4B35]">{{ appStore.t('bestSellers') }}</h2>
          <router-link to="/products" class="text-sm font-semibold text-gray-500 hover:text-[#1E4B35] flex items-center gap-1">
            {{ appStore.t('viewAllProducts') }} <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
        </div>
      </div>

      <!-- Middle Banner -->
      <div class="flex flex-col lg:flex-row gap-8 mb-16">
        <!-- Our Story -->
        <div class="lg:w-1/3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-8 relative overflow-hidden flex flex-col items-start justify-center">
           <Leaf class="w-32 h-32 text-green-600/10 absolute -right-4 -bottom-4 transform rotate-12" />
           <h3 class="text-xl font-bold text-[#1E4B35] mb-4 flex items-center gap-2"><Leaf class="w-5 h-5"/> {{ appStore.t('ourStory') }}</h3>
           <p class="text-green-900 text-sm leading-relaxed mb-6 relative z-10">
             {{ appStore.t('homeStoryDesc') }}
           </p>
           <router-link to="/about" class="bg-[#1E4B35] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-[#163a29] transition relative z-10">
             {{ appStore.t('learnMoreAboutUs') }}
           </router-link>
        </div>

        <!-- Gift Bundles -->
        <div class="lg:w-2/3">
          <div class="flex justify-between items-end mb-4">
            <h3 class="text-xl font-bold text-gray-900">{{ appStore.t('giftBundles') }}</h3>
            <router-link to="/products" class="text-sm font-semibold text-gray-500 hover:text-[#1E4B35] flex items-center gap-1">
              {{ appStore.t('viewAllBundles') }} <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="border border-gray-200 rounded-2xl p-4 flex gap-4 hover:shadow-md transition bg-white">
                <div class="w-1/2 bg-gray-100 rounded-xl relative overflow-hidden min-h-[140px]">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=250" alt="Healthy Starter Box" class="w-full h-full object-cover" />
                </div>
                <div class="w-1/2 flex flex-col">
                  <h4 class="font-bold text-gray-900 mb-1 leading-tight">{{ appStore.t('starterBoxTitle') }}</h4>
                  <p class="text-xs text-gray-500 mb-2 leading-snug">{{ appStore.t('starterBoxDesc') }}</p>
                  <ul class="text-[10px] text-gray-600 mb-2 space-y-0.5">
                    <li class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-[#1E4B35] rounded-full"></span> {{ appStore.t('fiveProducts') }}</li>
                    <li class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-[#1E4B35] rounded-full"></span> {{ appStore.t('handpickedGreenTrace') }}</li>
                  </ul>
                  <div class="mt-auto">
                    <div class="font-bold text-[#1E4B35] mb-2 text-base">499,000 VND</div>
                    <button class="w-full py-1.5 border border-[#1E4B35] text-[#1E4B35] rounded-md text-xs font-bold hover:bg-green-50 transition">{{ appStore.t('viewBundle') }}</button>
                  </div>
                </div>
             </div>
             <div class="border border-gray-200 rounded-2xl p-4 flex gap-4 hover:shadow-md transition bg-white">
                <div class="w-1/2 bg-gray-100 rounded-xl relative overflow-hidden min-h-[140px]">
                  <img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=250" alt="Local Gift Selection" class="w-full h-full object-cover" />
                </div>
                <div class="w-1/2 flex flex-col">
                  <h4 class="font-bold text-gray-900 mb-1 leading-tight">{{ appStore.t('giftSelectionTitle') }}</h4>
                  <p class="text-xs text-gray-500 mb-2 leading-snug">{{ appStore.t('giftSelectionDesc') }}</p>
                  <ul class="text-[10px] text-gray-600 mb-2 space-y-0.5">
                    <li class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-[#1E4B35] rounded-full"></span> {{ appStore.t('sixProducts') }}</li>
                    <li class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-[#1E4B35] rounded-full"></span> {{ appStore.t('beautifullyPacked') }}</li>
                  </ul>
                  <div class="mt-auto">
                    <div class="font-bold text-[#1E4B35] mb-2 text-base">699,000 VND</div>
                    <button class="w-full py-1.5 border border-[#1E4B35] text-[#1E4B35] rounded-md text-xs font-bold hover:bg-green-50 transition">{{ appStore.t('viewBundle') }}</button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-center text-[#1E4B35] mb-8">{{ appStore.t('howGreenTraceWorks') }}</h2>
        <div class="flex flex-col md:flex-row justify-between relative max-w-4xl mx-auto">
           <!-- Connecting line for desktop -->
           <div class="hidden md:block absolute top-7 left-[10%] right-[10%] border-t-2 border-dashed border-gray-200 -z-10"></div>
           
           <div class="flex flex-col items-center text-center w-full md:w-1/4 mb-6 md:mb-0 bg-white">
             <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm"><Search class="w-6 h-6"/></div>
             <h4 class="font-bold text-gray-900 mb-1">{{ appStore.t('howItWorksDesc1') }}</h4>
             <p class="text-xs text-gray-500 px-4">{{ appStore.t('howItWorksSub1') }}</p>
           </div>
           
           <div class="flex flex-col items-center text-center w-full md:w-1/4 mb-6 md:mb-0 bg-white">
             <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm"><ClipboardList class="w-6 h-6"/></div>
             <h4 class="font-bold text-gray-900 mb-1">{{ appStore.t('howItWorksDesc2') }}</h4>
             <p class="text-xs text-gray-500 px-4">{{ appStore.t('howItWorksSub2') }}</p>
           </div>
           
           <div class="flex flex-col items-center text-center w-full md:w-1/4 mb-6 md:mb-0 bg-white">
             <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm"><QrCode class="w-6 h-6"/></div>
             <h4 class="font-bold text-gray-900 mb-1">{{ appStore.t('howItWorksDesc3') }}</h4>
             <p class="text-xs text-gray-500 px-4">{{ appStore.t('howItWorksSub3') }}</p>
           </div>
           
           <div class="flex flex-col items-center text-center w-full md:w-1/4 bg-white">
             <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm"><ShoppingBag class="w-6 h-6"/></div>
             <h4 class="font-bold text-gray-900 mb-1">{{ appStore.t('howItWorksDesc4') }}</h4>
             <p class="text-xs text-gray-500 px-4">{{ appStore.t('howItWorksSub4') }}</p>
           </div>
        </div>
      </div>

      <!-- Featured Producers -->
      <div class="mb-16 bg-gray-50 -mx-4 px-4 py-12 rounded-3xl border border-gray-100">
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-end mb-6">
            <h2 class="text-2xl font-bold text-[#1E4B35]">{{ appStore.t('featuredProducers') }}</h2>
            <router-link to="/producers" class="text-sm font-semibold text-gray-500 hover:text-[#1E4B35] flex items-center gap-1">
              {{ appStore.t('viewAllProducers') }} <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <router-link 
               v-for="producer in featuredProducers" 
               :key="producer.id"
               :to="'/producer/' + producer.id"
               class="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4 hover:shadow-md transition text-left cursor-pointer group"
             >
               <div class="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 relative overflow-hidden border border-gray-100">
                 <img :src="producer.image" :alt="producer.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               </div>
               <div class="flex flex-col justify-between flex-grow">
                 <div>
                   <h4 class="font-bold text-gray-900 group-hover:text-[#1E4B35] transition-colors mb-1">{{ producer.name }}</h4>
                   <div class="flex items-center gap-1 text-[10px] text-gray-500 mb-2"><MapPin class="w-3 h-3"/> {{ appStore.localizeAddress(producer.location) }}</div>
                   <p class="text-[10px] text-gray-600 leading-tight line-clamp-2">{{ producer.description }}</p>
                 </div>
                 <div class="bg-green-50 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded w-fit border border-green-200 mt-2">{{ appStore.t('verifiedPartner') }}</div>
               </div>
             </router-link>
          </div>
        </div>
      </div>

      <!-- Batch Traceability Preview -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-[#1E4B35] mb-6">{{ appStore.t('batchTraceabilityPreview') }}</h2>
        <div class="border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center bg-white shadow-sm">
           <div class="flex items-center gap-6 w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 pr-0 lg:pr-6">
              <div class="flex flex-col items-center">
                <div class="w-20 h-20 bg-gray-100 p-2 rounded-lg flex items-center justify-center"><QrCode class="w-12 h-12 text-gray-800"/></div>
                <span class="text-[10px] text-gray-500 mt-2 text-center font-medium" v-html="appStore.t('scanToViewRecord')"></span>
              </div>
              <div class="flex flex-col">
                <h4 class="font-bold text-gray-900 text-lg mb-1">LOT-UMH-2605-001</h4>
                <p class="text-xs text-gray-600 mb-1">U Minh Forest Wild Honey 500 ml</p>
                <p class="text-xs text-gray-600 mb-1">{{ appStore.t('batchProducer') }}: U Minh Bee Farm</p>
                <p class="text-xs text-gray-600 mb-1">{{ appStore.t('batchDate') }}: 10 May 2026</p>
                <p class="text-xs text-gray-500 mt-1 font-semibold text-green-700">{{ appStore.t('batchStatusSample') }}</p>
              </div>
           </div>
           
           <div class="w-full lg:w-2/3 flex flex-col md:flex-row justify-between items-center relative pl-0 lg:pl-6">
              <div class="hidden md:block absolute top-5 left-10 right-10 border-t-2 border-[#1E4B35] -z-10"></div>
              
              <div class="flex flex-col items-center text-center mb-4 md:mb-0 bg-white px-2 relative">
                <div class="w-10 h-10 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-2 shadow relative">
                  <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                  <Hexagon class="w-5 h-5"/>
                </div>
                <div class="text-xs font-bold text-gray-900">{{ appStore.t('hiveCollection') }}</div>
                <div class="text-[10px] text-gray-500">02 May 2026<br/>U Minh Forest</div>
              </div>
              
              <div class="flex flex-col items-center text-center mb-4 md:mb-0 bg-white px-2 relative">
                <div class="w-10 h-10 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-2 shadow relative">
                  <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                  <Droplet class="w-5 h-5"/>
                </div>
                <div class="text-xs font-bold text-gray-900">{{ appStore.t('extraction') }}</div>
                <div class="text-[10px] text-gray-500">03 May 2026<br/>U Minh Facility</div>
              </div>
              
              <div class="flex flex-col items-center text-center mb-4 md:mb-0 bg-white px-2 relative">
                <div class="w-10 h-10 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-2 shadow relative">
                  <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                  <CheckCircle2 class="w-5 h-5"/>
                </div>
                <div class="text-xs font-bold text-gray-900">{{ appStore.t('qualityCheck') }}</div>
                <div class="text-[10px] text-gray-500">05 May 2026<br/>Lab Sample</div>
              </div>
              
              <div class="flex flex-col items-center text-center mb-4 md:mb-0 bg-white px-2 relative">
                <div class="w-10 h-10 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-2 shadow relative">
                  <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                  <Package class="w-5 h-5"/>
                </div>
                <div class="text-xs font-bold text-gray-900">{{ appStore.t('packing') }}</div>
                <div class="text-[10px] text-gray-500">07 May 2026<br/>U Minh Facility</div>
              </div>
              
              <div class="flex flex-col items-center text-center bg-white px-2 relative">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-[#1E4B35] text-[#1E4B35] flex items-center justify-center mb-2 shadow-sm">
                  <Truck class="w-5 h-5"/>
                </div>
                <div class="text-xs font-bold text-gray-900">{{ appStore.t('readyToShip') }}</div>
                <div class="text-[10px] text-gray-500">09 May 2026<br/>Warehouse</div>
              </div>
           </div>
        </div>
        <div class="flex justify-end mt-4">
          <router-link to="/traceability" class="text-sm font-semibold text-[#1E4B35] hover:underline flex items-center gap-1">
             {{ appStore.t('viewFullBatch') }} <ArrowRight class="w-4 h-4"/>
          </router-link>
        </div>
      </div>

      <!-- Testimonial -->
      <div class="bg-[#F0FDF4] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
         <div class="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 relative border-4 border-white shadow">
           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Nguyen Van An" class="w-full h-full object-cover" />
         </div>
         <div>
           <Quote class="w-10 h-10 text-green-300 mb-2 opacity-50" />
           <p class="text-lg text-[#1E4B35] font-medium italic mb-4 leading-relaxed">
             {{ appStore.t('testimonialQuote') }}
           </p>
           <div class="font-bold text-gray-900 text-sm">{{ appStore.t('testimonialAuthor') }}</div>
           <div class="text-xs text-gray-500">{{ appStore.t('testimonialSub') }}</div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Image, Package, Users, ClipboardList, ArrowRight, Leaf, Search, QrCode, ShoppingBag, MapPin, Hexagon, Droplet, CheckCircle2, Truck, Quote, Wheat, Apple, Carrot } from 'lucide-vue-next'
import ProductCard from '@/components/product/ProductCard.vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

const categories = [
  { name: 'Honey', icon: Hexagon, color: 'text-yellow-500', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200' },
  { name: 'Rice', icon: Wheat, color: 'text-green-700', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200' },
  { name: 'Fruit', icon: Apple, color: 'text-green-500', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=200' },
  { name: 'Vegetables', icon: Carrot, color: 'text-orange-500', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=200' },
  { name: 'Tea', icon: Leaf, color: 'text-teal-600', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=200' },
  { name: 'Meat & Eggs', icon: ShoppingBag, color: 'text-red-500', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=200' }
]

const bestSellers = ref([])
const featuredProducers = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // Load products
    const products = await appStore.fetchProducts()
    bestSellers.value = products.slice(0, 4).map(p => ({
      id: p.id,
      name: p.name,
      producer: p.producer_name || 'Green Producer',
      verified: true,
      location: p.producer_location || 'Vietnam',
      badges: ['Batch record available', 'Reviewed sample'],
      price: parseFloat(p.price),
      batch: 'LOT-UMH-2605-001',
      isBundle: false,
      badgeLabel: 'Sample batch record',
      image: p.image_url
    }))

    // Load producers
    const producersList = await appStore.fetchProducers()
    featuredProducers.value = producersList.slice(0, 3).map(p => ({
      id: p.id,
      name: p.name,
      location: p.location || 'Vietnam',
      description: p.description || 'Verified agricultural partner',
      image: p.image_url || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=200'
    }))

    const fallbackProducers = [
      { id: 1, name: 'U Minh Bee Farm', location: 'Ca Mau Province', description: 'Sustainable beekeeping in the U Minh forest.', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200' },
      { id: 2, name: 'Soc Trang Rice Co-op', location: 'Soc Trang Province', description: 'Producing quality rice with community values.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200' },
      { id: 3, name: 'Ben Tre Fruit Co-op', location: 'Ben Tre Province', description: 'Orchards cared for with natural practices.', image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=200' }
    ]
    if (featuredProducers.value.length === 0) {
      featuredProducers.value = fallbackProducers
    }
  } catch (error) {
    console.error('Failed to retrieve home data:', error)
  } finally {
    loading.value = false
  }
})
</script>
