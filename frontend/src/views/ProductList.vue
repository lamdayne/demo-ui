<template>
  <div class="bg-white min-h-screen pb-16">
    <div class="container mx-auto px-4 pt-8">
      <!-- Search Bar -->
      <div class="relative w-full max-w-4xl mx-auto mb-8">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          v-model="searchInput" 
          @keyup.enter="loadProducts" 
          class="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-transparent text-lg text-gray-900" 
          :placeholder="appStore.t('searchProducts')"
        />
        <X 
          v-if="searchInput" 
          @click="clearSearch" 
          class="absolute right-32 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" 
        />
        <button 
          @click="loadProducts" 
          class="absolute right-2 top-2 bottom-2 bg-[#1E4B35] text-white px-6 rounded-md font-medium hover:bg-[#1E4B35]/90 transition"
        >
          {{ appStore.t('searchBtn') }}
        </button>
      </div>

      <!-- Results Header -->
      <div class="flex items-end justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-[#1E4B35] mb-2">{{ appStore.t('searchResults') }}</h1>
          <p class="text-gray-900 text-lg">{{ appStore.t('showingResults') }} <strong>"{{ searchInput || activeCategory || appStore.t('allProducts') }}"</strong></p>
        </div>
        <p class="text-sm font-semibold text-gray-900">{{ products.length }} {{ appStore.t('resultsFound') }}</p>
      </div>

      <!-- Categories Tabs -->
      <div class="flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 mb-8">
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="cat in ['All Products', 'Rice', 'Fruits', 'Honey', 'Tea', 'Bundles']" 
            :key="cat"
            @click="selectCategory(cat)"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="activeCategory === cat ? 'bg-[#1E4B35] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'"
          >
            {{ getCategoryLabel(cat) }}
          </button>
        </div>
        <div class="flex items-center gap-4 mt-4 lg:mt-0">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 font-medium">{{ appStore.t('sortBy') }}</span>
            <select v-model="selectedSortOrder" class="border-none bg-transparent font-medium text-gray-900 focus:ring-0 cursor-pointer py-0 pl-1 pr-6">
              <option value="relevance">{{ appStore.t('relevance') }}</option>
              <option value="priceLowHigh">{{ appStore.t('priceLowHigh') }}</option>
              <option value="priceHighLow">{{ appStore.t('priceHighLow') }}</option>
            </select>
          </div>
          <div class="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button class="p-1.5 bg-white shadow-sm rounded-md text-gray-800"><LayoutGrid class="w-4 h-4" /></button>
            <button class="p-1.5 text-gray-500 hover:text-gray-800 rounded-md"><List class="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filter -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-gray-900 text-lg">{{ appStore.t('refineResults') }}</h3>
            <button @click="clearAllFilters" class="text-sm text-[#1E4B35] font-medium hover:underline">{{ appStore.t('clearAll') }}</button>
          </div>
          
          <div class="space-y-6">
            <!-- Category -->
            <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-3 cursor-pointer">
                <h4 class="font-bold text-gray-900">{{ appStore.t('category') }}</h4>
                <ChevronUp class="w-4 h-4" />
              </div>
              <div class="space-y-2.5">
                <label v-for="cat in ['All Products', 'Rice', 'Bundles', 'Fruits', 'Honey', 'Tea', 'Vegetables', 'Meat & Eggs']" :key="cat" class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" :checked="activeCategory === cat" @change="selectCategory(cat)" class="rounded-full border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" name="sidebar-category" />
                  <span class="text-sm font-medium" :class="activeCategory === cat ? 'text-[#1E4B35] font-bold' : 'text-gray-600'">
                    {{ getCategoryLabel(cat) }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Producer -->
            <div class="border-t pt-4" v-if="availableProducers.length > 0">
              <div class="flex justify-between items-center mb-3 cursor-pointer">
                <h4 class="font-bold text-gray-900">{{ appStore.t('producer') }}</h4>
                <ChevronUp class="w-4 h-4" />
              </div>
              <div class="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                <label v-for="prod in availableProducers" :key="prod.name" class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" :checked="selectedProducers.includes(prod.name)" @change="toggleProducer(prod.name)" class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                  <span class="text-sm font-medium" :class="selectedProducers.includes(prod.name) ? 'text-gray-900 font-bold' : 'text-gray-600'">{{ prod.name }} ({{ prod.count }})</span>
                </label>
              </div>
            </div>

            <!-- Region -->
            <div class="border-t pt-4" v-if="availableLocations.length > 0">
              <div class="flex justify-between items-center mb-3 cursor-pointer">
                <h4 class="font-bold text-gray-900">{{ appStore.t('region') }}</h4>
                <ChevronUp class="w-4 h-4" />
              </div>
              <div class="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                <label v-for="loc in availableLocations" :key="loc.name" class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" :checked="selectedLocations.includes(loc.name)" @change="toggleLocation(loc.name)" class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4" />
                  <span class="text-sm font-medium" :class="selectedLocations.includes(loc.name) ? 'text-gray-900 font-bold' : 'text-gray-600'">{{ loc.name }} ({{ loc.count }})</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <main class="w-full flex-grow">
          <!-- Loading State -->
          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            <div v-for="n in 6" :key="n" class="bg-gray-50 rounded-xl h-96 animate-pulse border border-gray-200"></div>
          </div>
          <!-- Products Grid -->
          <div v-else-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
          </div>
          <!-- Empty State -->
          <div v-else class="text-center py-16 border border-dashed rounded-2xl border-gray-250 bg-gray-50 mb-12">
            <Leaf class="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ appStore.t('noProductsFound') }}</h3>
            <p class="text-sm text-gray-500">{{ appStore.t('tryAdjusting') }}</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center border-t border-gray-200 pt-8">
            <div class="flex items-center gap-2">
              <button 
                :disabled="currentPage === 1" 
                @click="currentPage--"
                class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="currentPage = page"
                class="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition"
                :class="currentPage === page ? 'bg-[#1E4B35] text-white' : 'text-gray-700 hover:bg-gray-100'"
              >
                {{ page }}
              </button>

              <button 
                :disabled="currentPage === totalPages" 
                @click="currentPage++"
                class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      <!-- No results tips + Recommended searches -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8 mb-12">
        <div class="flex gap-4">
          <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <ImageIcon class="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 mb-2">{{ appStore.t('noResultsTips') }}</h3>
            <ul class="text-sm text-gray-600 space-y-1.5 mb-3">
              <li class="flex items-start gap-1.5">{{ appStore.t('tip1') }}</li>
              <li class="flex items-start gap-1.5">{{ appStore.t('tip2') }}</li>
              <li class="flex items-start gap-1.5">{{ appStore.t('tip3') }}</li>
            </ul>
            <button class="border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">{{ appStore.t('clearAllFilters') }}</button>
          </div>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 mb-3">{{ appStore.t('recommendedSearches') }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in recommendedTags" :key="tag" class="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:border-[#1E4B35] hover:text-[#1E4B35] cursor-pointer transition">{{ tag }}</span>
          </div>
        </div>
      </div>

      <!-- Need help CTA -->
      <div class="bg-[#1E4B35] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <ImageIcon class="w-10 h-10 text-white/40" />
          </div>
          <div>
            <h3 class="font-bold text-white text-xl mb-1">{{ appStore.t('needHelpFinding') }}</h3>
            <p class="text-green-100 text-sm">{{ appStore.t('ourTeamIsHere') }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button class="bg-white text-[#1E4B35] font-bold px-6 py-3 rounded-lg hover:bg-green-50 transition flex items-center gap-2">
            <MessageCircle class="w-5 h-5" /> {{ appStore.t('contactSupport') }}
          </button>
          <a href="#" class="text-green-200 text-sm font-medium hover:text-white flex items-center gap-1">{{ appStore.t('visitSupportCenter') }} <ArrowRight class="w-3 h-3" /></a>
        </div>
      </div>

      <!-- Bottom Trust Bar -->
      <div class="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200 shadow-sm">
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><Leaf class="w-5 h-5 text-[#1E4B35]" /></div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ appStore.t('fullyTraceable') }}</div>
            <div class="text-xs text-gray-500">{{ appStore.t('traceableDesc') }}</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><CheckCircle2 class="w-5 h-5 text-[#1E4B35]" /></div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ appStore.t('verifiedProducersTitle') }}</div>
            <div class="text-xs text-gray-500">{{ appStore.t('verifiedProducersDesc') }}</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><FlaskConical class="w-5 h-5 text-[#1E4B35]" /></div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ appStore.t('qualityAssured') }}</div>
            <div class="text-xs text-gray-500">{{ appStore.t('qualityAssuredDesc') }}</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><Lock class="w-5 h-5 text-[#1E4B35]" /></div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ appStore.t('securePaymentsTitle') }}</div>
            <div class="text-xs text-gray-500">{{ appStore.t('securePaymentsDesc') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, X, ChevronUp, ChevronLeft, ChevronRight, LayoutGrid, List, Leaf, CheckCircle2, FlaskConical, Lock, MessageCircle, ArrowRight, Image as ImageIcon } from 'lucide-vue-next'
import ProductCard from '@/components/product/ProductCard.vue'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const appStore = useAppStore()

const getCategoryLabel = (cat) => {
  switch(cat) {
    case 'All Products': return appStore.t('allProducts')
    case 'Rice': return appStore.t('riceGrainsCat')
    case 'Fruits': return appStore.t('fruitsCat')
    case 'Honey': return appStore.t('honeyCat')
    case 'Tea': return appStore.lang === 'vi' ? 'Trà' : 'Tea'
    case 'Bundles': return appStore.lang === 'vi' ? 'Combo' : 'Bundles'
    case 'Vegetables': return appStore.t('vegetablesCat')
    case 'Meat & Eggs': return appStore.lang === 'vi' ? 'Thịt & Trứng' : 'Meat & Eggs'
    default: return cat
  }
}

const recommendedTags = ['ST25 rice', 'ST25 5kg', 'Organic rice', 'Ben Tre Green', 'Premium rice', 'Brown rice', 'Rice bundles', 'Rice gift set']

const products = ref([])
const loading = ref(true)

const searchInput = ref(route.query.search || '')
const activeCategory = ref(route.query.category || 'All Products')

const selectedProducers = ref([])
const selectedLocations = ref([])
const selectedSortOrder = ref('relevance')
const currentPage = ref(1)
const itemsPerPage = ref(6)

const loadProducts = async () => {
  loading.value = true
  currentPage.value = 1
  try {
    const list = await appStore.fetchProducts(activeCategory.value, searchInput.value)
    products.value = list.map(p => ({
      id: p.id,
      name: p.name,
      specifications: p.specifications || {},
      producer: p.producer_name || 'Green Producer',
      verified: true,
      location: p.producer_location || 'Vietnam',
      badges: ['Batch record available', 'Reviewed sample'],
      price: parseFloat(p.price),
      batch: p.latest_batch_id || null,
      isBundle: false,
      image: p.image_url
    }))
  } catch (error) {
    console.error('Failed to load products:', error)
  } finally {
    loading.value = false
  }
}

const selectCategory = (cat) => {
  activeCategory.value = cat
  loadProducts()
}

const clearSearch = () => {
  searchInput.value = ''
  loadProducts()
}

const availableProducers = computed(() => {
  const counts = {}
  products.value.forEach(p => {
    const name = p.producer || 'Green Producer'
    counts[name] = (counts[name] || 0) + 1
  })
  return Object.entries(counts).map(([name, count]) => ({ name, count }))
})

const availableLocations = computed(() => {
  const counts = {}
  products.value.forEach(p => {
    const loc = p.location || 'Vietnam'
    counts[loc] = (counts[loc] || 0) + 1
  })
  return Object.entries(counts).map(([name, count]) => ({ name, count }))
})

const toggleProducer = (name) => {
  const idx = selectedProducers.value.indexOf(name)
  if (idx > -1) {
    selectedProducers.value.splice(idx, 1)
  } else {
    selectedProducers.value.push(name)
  }
  currentPage.value = 1
}

const toggleLocation = (loc) => {
  const idx = selectedLocations.value.indexOf(loc)
  if (idx > -1) {
    selectedLocations.value.splice(idx, 1)
  } else {
    selectedLocations.value.push(loc)
  }
  currentPage.value = 1
}

const clearAllFilters = () => {
  selectedProducers.value = []
  selectedLocations.value = []
  selectedSortOrder.value = 'relevance'
  searchInput.value = ''
  activeCategory.value = 'All Products'
  currentPage.value = 1
  loadProducts()
}

const filteredProducts = computed(() => {
  let list = [...products.value]

  if (selectedProducers.value.length > 0) {
    list = list.filter(p => selectedProducers.value.includes(p.producer))
  }

  if (selectedLocations.value.length > 0) {
    list = list.filter(p => selectedLocations.value.includes(p.location))
  }

  if (selectedSortOrder.value === 'priceLowHigh') {
    list.sort((a, b) => a.price - b.price)
  } else if (selectedSortOrder.value === 'priceHighLow') {
    list.sort((a, b) => b.price - a.price)
  }

  return list
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredProducts.value.slice(start, start + itemsPerPage.value)
})

onMounted(loadProducts)

watch(() => route.query.category, (newVal) => {
  activeCategory.value = newVal || 'All Products'
  loadProducts()
})

watch(() => route.query.search, (newVal) => {
  searchInput.value = newVal || ''
  loadProducts()
})
</script>
