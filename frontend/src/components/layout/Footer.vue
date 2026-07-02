<template>
  <footer class="bg-white pt-16 border-t border-gray-100">
    <div class="container mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2 pr-8">
          <router-link to="/" class="flex items-center gap-2 mb-4">
            <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1782962604/94b91564-4854-4699-b10c-8c875f14c868.png" alt="Green Trace Logo" class="h-20 w-auto object-contain" />
          </router-link>
          <p class="text-sm text-gray-600 mb-4 leading-relaxed">
            {{ appStore.t('footerBrandDesc1') }}
          </p>
          <p class="text-sm text-gray-600 mb-6 leading-relaxed">
            {{ appStore.t('footerBrandDesc2') }}
          </p>
          <div class="flex gap-3 text-[#1E4B35]">
            <a href="#" class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-[#1E4B35] hover:text-white transition-colors">
              <Facebook class="w-4 h-4 fill-current" />
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-[#1E4B35] hover:text-white transition-colors">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-[#1E4B35] hover:text-white transition-colors">
              <Youtube class="w-4 h-4" />
            </a>
            <a href="#" class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center hover:bg-[#1E4B35] hover:text-white transition-colors">
              <Linkedin class="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
        
        <!-- Explore -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">{{ appStore.t('footerExplore') }}</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerShopAll') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerNewArrivals') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerBestSellers') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerFeaturedCategories') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerGiftBundles') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerOurStory') }}</a></li>
          </ul>
        </div>
        
        <!-- Support -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">{{ appStore.t('footerSupport') }}</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerHelpCenter') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerShippingDelivery') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerReturnsRefunds') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerPayments') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerContactUs') }}</a></li>
          </ul>
        </div>
        
        <!-- Legal -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">{{ appStore.t('footerLegal') }}</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerTermsUse') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerPrivacyPolicy') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerCookiePolicy') }}</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">{{ appStore.t('footerShippingPolicy') }}</a></li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">{{ appStore.t('footerContactTitle') }}</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <Mail class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">greentracevietnam@gmail.com</span>
            </li>
            <li class="flex items-start gap-3">
              <Phone class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">0797931176</span>
            </li>
            <li class="flex items-start gap-3">
              <Clock class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">{{ appStore.lang === 'en' ? 'Mon-Fri, 9:00 AM - 5:00 PM (ICT)' : 'Thứ 2 - Thứ 6, 9:00 SA - 5:00 CH (ICT)' }}</span>
            </li>
            <li class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">{{ appStore.lang === 'en' ? 'TP.HCM, Vietnam' : 'TP.HCM, Việt Nam' }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="bg-[#0B3B24] text-white py-4 text-sm font-medium">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <p>{{ appStore.t('footerBottomLeft') }}</p>
        <p>{{ appStore.t('footerBottomRight') }}</p>
        <button class="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowUp class="w-4 h-4" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Leaf, Facebook, Instagram, Youtube, Linkedin, Mail, Phone, Clock, MapPin, ArrowUp } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
</script>
