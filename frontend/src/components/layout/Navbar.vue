<template>
  <header class="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
    <!-- Regular Topbar -->
    <div class="bg-[#0B3B24] text-white text-xs py-2">
      <div class="container mx-auto px-4 flex justify-between items-center max-w-6xl">
        <div class="flex items-center gap-2 opacity-90">
          <Leaf class="w-3 h-3" />
          <span>{{ appStore.t('navPrototype') }}</span>
        </div>
        <div class="text-center flex-grow hidden md:block opacity-90">
          <span v-if="route.path === '/cart'">{{ appStore.t('navCartMsg') }}</span>
          <span v-else-if="route.path.startsWith('/producer/')">{{ appStore.t('navProducerMsg') }}</span>
          <span v-else>{{ appStore.t('navDefaultMsg') }}</span>
        </div>
        <button @click="appStore.toggleLanguage()" class="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition opacity-90 focus:outline-none">
          <Globe class="w-3 h-3 text-white" />
          <span class="font-bold text-[10px] uppercase tracking-wider">{{ appStore.lang === 'en' ? 'EN' : 'VI' }}</span>
        </button>
      </div>
    </div>
    
    <!-- Main Navigation -->
    <div class="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1782962604/94b91564-4854-4699-b10c-8c875f14c868.png" alt="Green Trace Logo" class="h-20 w-auto object-contain" />
      </router-link>

      <!-- Desktop Menu -->
      <nav class="hidden lg:flex items-center gap-8 font-medium text-gray-700 text-sm">
        <router-link to="/" class="hover:text-[#1E4B35] transition">{{ appStore.t('home') }}</router-link>
        <router-link to="/about" class="hover:text-[#1E4B35] transition">{{ appStore.t('about') }}</router-link>
        <router-link to="/products" class="hover:text-[#1E4B35] transition">{{ appStore.t('shop') }}</router-link>
        <!-- Traceability Dropdown -->
        <div class="relative group">
          <button class="hover:text-[#1E4B35] transition flex items-center gap-1 py-2 text-gray-700">
            <span>{{ appStore.t('traceability') }}</span>
            <ChevronDown class="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E4B35] transition-colors" />
          </button>
          <div class="absolute left-0 top-full w-56 bg-white border border-gray-150 rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
            <router-link to="/traceability" class="block px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-[#1E4B35] font-bold">
              {{ appStore.t('batchTraceability') }}
            </router-link>
            <router-link to="/certificates" class="block px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-[#1E4B35] font-bold">
              {{ appStore.t('certificates') }}
            </router-link>
          </div>
        </div>
        <router-link to="/producers" class="hover:text-[#1E4B35] transition">{{ appStore.t('producers') }}</router-link>
        <router-link to="/support" class="hover:text-[#1E4B35] transition">{{ appStore.t('support') }}</router-link>
        <router-link to="/partner" class="hover:text-[#1E4B35] transition">{{ appStore.t('partnerWithUs') }}</router-link>
      </nav>

      <!-- Icons -->
      <div class="flex items-center gap-5 text-gray-700">
        <div class="relative flex items-center gap-2">
          <input 
            v-if="showSearchInput"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            :placeholder="appStore.t('searchProducts')"
            class="pl-3 pr-8 py-1.5 border border-gray-200 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] w-36 md:w-48 transition-all duration-300 bg-gray-50 text-gray-800"
          />
          <button @click="toggleSearch" class="hover:text-[#1E4B35] transition p-1">
            <Search class="w-5 h-5" />
          </button>
        </div>
        <router-link to="/account" class="hover:text-[#1E4B35] transition">
          <User class="w-5 h-5" />
        </router-link>
        <router-link to="/cart" class="hover:text-[#1E4B35] transition relative">
          <ShoppingCart class="w-5 h-5" />
          <span v-if="cartCount > 0" class="absolute -top-1.5 -right-2 bg-[#1E4B35] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{{ cartCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Leaf, Globe, ChevronDown, Search, User, ShoppingCart, X } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const showSearchInput = ref(false)
const searchQuery = ref('')

const toggleSearch = () => {
  if (showSearchInput.value && searchQuery.value.trim()) {
    performSearch()
  } else {
    showSearchInput.value = !showSearchInput.value
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value.trim() } })
    searchQuery.value = ''
    showSearchInput.value = false
  }
}

const cartCount = computed(() => {
  return appStore.cart.reduce((sum, item) => sum + item.quantity, 0)
})
</script>
