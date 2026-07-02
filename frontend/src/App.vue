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

    <!-- Global Custom Confirm Dialog -->
    <Transition name="fade-slide">
      <div 
        v-if="appStore.confirmDialog && appStore.confirmDialog.show" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      >
        <div class="bg-white border border-gray-150 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
          <div class="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <HelpCircle class="w-6 h-6" />
          </div>
          <div class="space-y-1">
            <h4 class="font-bold text-gray-950 text-lg">{{ appStore.lang === 'vi' ? 'Xác nhận hành động' : 'Confirm Action' }}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ appStore.confirmDialog.message }}</p>
          </div>
          <div class="flex gap-3 pt-2">
            <button 
              @click="appStore.handleConfirmResponse(false)" 
              class="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition"
            >
              {{ appStore.lang === 'vi' ? 'Hủy' : 'Cancel' }}
            </button>
            <button 
              @click="appStore.handleConfirmResponse(true)" 
              class="flex-1 py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white font-bold rounded-xl text-sm transition shadow-sm"
            >
              {{ appStore.lang === 'vi' ? 'Xác nhận' : 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { useAppStore } from '@/stores/appStore'
import { Check, HelpCircle } from 'lucide-vue-next'

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
