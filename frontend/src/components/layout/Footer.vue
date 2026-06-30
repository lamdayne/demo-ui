<template>
  <footer class="bg-white pt-16 border-t border-gray-100">
    <div class="container mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2 pr-8">
          <router-link to="/" class="flex items-center gap-2 mb-4">
            <div class="text-[#1E4B35]">
              <Leaf class="w-6 h-6 fill-current" />
            </div>
            <span class="text-xl font-bold text-[#1E4B35] tracking-tight">Green Trace</span>
          </router-link>
          <p class="text-sm text-gray-600 mb-4 leading-relaxed">
            Connecting you with verified agricultural products from local producers. Review samples, understand their journey, and buy with confidence.
          </p>
          <p class="text-sm text-gray-600 mb-6 leading-relaxed">
            Together for a healthier, more sustainable future.
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
          <h3 class="font-bold text-gray-900 mb-4">Explore</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Shop All Products</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">New Arrivals</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Best Sellers</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Featured Categories</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Gift Bundles</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Our Story</a></li>
          </ul>
        </div>
        
        <!-- Support -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">Support</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Help Center</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Shipping & Delivery</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Returns & Refunds</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Payments</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Contact Us</a></li>
          </ul>
        </div>
        
        <!-- Legal -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">Legal</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Terms of Use</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Privacy Policy</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Cookie Policy</a></li>
            <li><a href="#" class="text-sm text-gray-600 hover:text-[#1E4B35] transition">Shipping Policy</a></li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">Contact</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <Mail class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">hello@greentrace.demo</span>
            </li>
            <li class="flex items-start gap-3">
              <Phone class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">+84 912 345 678</span>
            </li>
            <li class="flex items-start gap-3">
              <Clock class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">Mon - Fri, 8:00 - 18:00 (GMT+7)</span>
            </li>
            <li class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-[#1E4B35] mt-0.5" />
              <span class="text-sm text-gray-600">Ben Tre, Vietnam</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="bg-[#0B3B24] text-white py-4 text-sm font-medium">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <p>© 2026 Green Trace – Academic Prototype</p>
        <p>Proudly connecting local producers and real food lovers.</p>
        <button class="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition">
          <ArrowUp class="w-4 h-4" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Leaf, Facebook, Instagram, Youtube, Linkedin, Mail, Phone, Clock, MapPin, ArrowUp } from 'lucide-vue-next'
</script>
