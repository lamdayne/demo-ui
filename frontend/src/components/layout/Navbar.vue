<template>
  <header class="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
    <!-- Onboarding Topbar (Partner page) -->
    <div v-if="route.path === '/partner'" class="bg-[#0B3B24] text-white text-xs py-2.5 px-4">
      <div class="container mx-auto flex justify-between items-center relative max-w-6xl">
        <div class="flex items-center gap-2 opacity-90">
          <Leaf class="w-3.5 h-3.5 text-white" />
          <span class="font-semibold">Prototype Onboarding Flow – For Local Producers & Co-ops</span>
        </div>
        <div class="hidden md:block opacity-90 text-center">
          This is a sample data collection form. Submitting does not create a live account.
        </div>
        <button class="hover:opacity-80 transition">
          <X class="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
    
    <!-- Regular Topbar -->
    <div v-else class="bg-[#0B3B24] text-white text-xs py-2">
      <div class="container mx-auto px-4 flex justify-between items-center max-w-6xl">
        <div class="flex items-center gap-2 opacity-90">
          <Leaf class="w-3 h-3" />
          <span>Academic Prototype – Sample Data – 2026</span>
        </div>
        <div class="text-center flex-grow hidden md:block opacity-90">
          <span v-if="route.path === '/cart'">Curated traceable marketplace for traceable agricultural products</span>
          <span v-else-if="route.path.startsWith('/producer/')">Curated B2C marketplace for traceable agricultural products</span>
          <span v-else>Curated traceable agricultural products</span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition opacity-90">
          <Globe class="w-3 h-3" />
          <span>English</span>
          <ChevronDown class="w-3 h-3" />
        </div>
      </div>
    </div>
    
    <!-- Main Navigation -->
    <div class="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <div class="text-[#1E4B35]">
          <Leaf class="w-8 h-8 fill-current" />
        </div>
        <span class="text-2xl font-bold text-[#1E4B35] tracking-tight">Green Trace</span>
      </router-link>

      <!-- Desktop Menu -->
      <nav class="hidden lg:flex items-center gap-8 font-medium text-gray-700 text-sm">
        <router-link to="/" class="hover:text-[#1E4B35] transition">Home</router-link>
        <router-link to="/about" class="hover:text-[#1E4B35] transition">About</router-link>
        <router-link to="/products" class="hover:text-[#1E4B35] transition">Shop</router-link>
        <!-- Traceability Dropdown -->
        <div class="relative group">
          <button class="hover:text-[#1E4B35] transition flex items-center gap-1 py-2 text-gray-700">
            <span>Traceability</span>
            <ChevronDown class="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E4B35] transition-colors" />
          </button>
          <div class="absolute left-0 top-full w-56 bg-white border border-gray-150 rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
            <router-link to="/traceability" class="block px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-[#1E4B35] font-bold">
              Batch Traceability
            </router-link>
            <router-link to="/certificates" class="block px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-[#1E4B35] font-bold">
              Certificates & Lab Reports
            </router-link>
          </div>
        </div>
        <router-link to="/producers" class="hover:text-[#1E4B35] transition">Producers</router-link>
        <router-link to="/support" class="hover:text-[#1E4B35] transition">Support</router-link>
        <router-link to="/partner" class="hover:text-[#1E4B35] transition">Partner With Us</router-link>
      </nav>

      <!-- Icons -->
      <div class="flex items-center gap-5 text-gray-700">
        <button class="hover:text-[#1E4B35] transition">
          <Search class="w-5 h-5" />
        </button>
        <router-link to="/account" class="hover:text-[#1E4B35] transition">
          <User class="w-5 h-5" />
        </router-link>
        <router-link to="/cart" class="hover:text-[#1E4B35] transition relative">
          <ShoppingCart class="w-5 h-5" />
          <span class="absolute -top-1.5 -right-2 bg-[#1E4B35] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { Leaf, Globe, ChevronDown, Search, User, ShoppingCart, X } from 'lucide-vue-next'

const route = useRoute()
</script>
