<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
    <div class="relative aspect-[4/3] bg-gray-50 overflow-hidden">
      <!-- Product Image Link -->
      <router-link :to="'/product/' + product.id" class="block w-full h-full">
        <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div v-else class="w-full h-full flex items-center justify-center">
          <Image class="w-12 h-12 text-gray-300" />
        </div>
      </router-link>

      <!-- Badges Top Left -->
      <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
        <span v-if="product.topMatch" class="bg-[#1E4B35] text-white text-xs font-semibold px-2.5 py-1 rounded-md">Top Match</span>
        <span v-if="product.isBundle" class="bg-[#1E4B35] text-white text-xs font-semibold px-2.5 py-1 rounded-md">Bundle</span>
      </div>

      <!-- Badge Top Right -->
      <div v-if="product.badgeLabel" class="absolute top-3 right-3 z-10 bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
        <CheckCircle2 class="w-3 h-3 text-green-500" /> {{ product.badgeLabel }}
      </div>

      <!-- Favorite Button -->
      <button 
        v-if="!product.badgeLabel" 
        @click="appStore.toggleWishlist(product.id)"
        class="absolute top-3 right-3 z-10 w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center transition-colors"
        :class="appStore.wishlist.some(item => item.id === product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
      >
        <Heart class="w-4 h-4" />
      </button>
    </div>
    
    <div class="p-5 flex flex-col flex-grow">
      <h3 class="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
        <router-link :to="'/product/' + product.id" class="hover:text-[#1E4B35] transition-colors">
          {{ product.name }}
        </router-link>
      </h3>
      
      <div class="flex items-center gap-1.5 text-sm mb-1 text-gray-700">
        <User class="w-4 h-4 text-green-600" />
        <span class="font-medium">{{ product.producer }}</span>
        <CheckCircle2 v-if="product.verified" class="w-3.5 h-3.5 text-green-600 fill-green-600/20" />
      </div>
      
      <div class="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <MapPin class="w-4 h-4" />
        <span>{{ product.location }}</span>
      </div>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-if="product.badges && product.badges.includes('Organic')" class="inline-flex items-center gap-1 bg-green-50 text-green-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-green-200">
          <Leaf class="w-3 h-3" /> Organic
        </span>
        <span v-if="product.badges && product.badges.includes('Raw')" class="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-amber-200">
          <Leaf class="w-3 h-3" /> Raw
        </span>
        <span v-if="product.badges && product.badges.includes('Lab Test')" class="inline-flex items-center gap-1 bg-blue-50 text-blue-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-200">
          <FlaskConical class="w-3 h-3" /> Lab Test
        </span>
        <span v-if="product.badges && product.badges.includes('VietGAP')" class="inline-flex items-center gap-1 bg-teal-50 text-teal-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-teal-200">
          <ShieldCheck class="w-3 h-3" /> VietGAP
        </span>
      </div>

      <div class="mt-auto pt-2">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-lg font-bold text-gray-900">{{ product.price.toLocaleString() }} VND</span>
        </div>
        <p v-if="product.batch" class="text-xs text-gray-500 mb-4">Batch: {{ product.batch }}</p>
        <p v-else-if="product.saveDesc" class="text-xs text-gray-500 mb-4">{{ product.saveDesc }}</p>
        
        <button 
          v-if="!product.isBundle" 
          @click="appStore.addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image, producer_name: product.producer }, 1)"
          class="w-full py-2.5 rounded-lg border border-[#1E4B35] text-[#1E4B35] font-semibold flex items-center justify-center gap-2 hover:bg-[#1E4B35] hover:text-white transition-colors"
        >
          <ShoppingCart class="w-4 h-4" /> Add to Cart
        </button>
        <router-link 
          v-else 
          :to="'/product/' + product.id"
          class="w-full py-2.5 rounded-lg border border-[#1E4B35] text-[#1E4B35] font-semibold flex items-center justify-center gap-2 hover:bg-[#1E4B35] hover:text-white transition-colors text-center"
        >
          View Bundle
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Heart, User, CheckCircle2, MapPin, Leaf, FlaskConical, ShieldCheck, ShoppingCart, Image } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
