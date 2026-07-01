<template>
  <div class="min-h-screen flex flex-col font-sans relative">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />

    <!-- Global Floating Toast Notification -->
    <Transition name="fade-slide">
      <div 
        v-if="appStore.showToast" 
        class="fixed bottom-6 right-6 bg-[#0B3B24] border border-green-800 text-white py-3.5 px-5 rounded-2xl shadow-2xl z-[9999] flex items-center gap-3 min-w-[280px] max-w-sm"
      >
        <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
          <Check class="w-4 h-4" />
        </div>
        <div class="flex-grow">
          <p class="text-xs font-semibold leading-relaxed">{{ appStore.toastMessage }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { useAppStore } from '@/stores/appStore'
import { Check } from 'lucide-vue-next'

const appStore = useAppStore()
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
