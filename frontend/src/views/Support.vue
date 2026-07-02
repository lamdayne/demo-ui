<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Hero Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 max-w-6xl py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-4 max-w-xl">
          <h1 class="text-4xl font-extrabold text-[#1E4B35] leading-tight">{{ t.title }}</h1>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ t.subtitle }}
          </p>
          
          <!-- Search Bar -->
          <div class="flex gap-2 pt-2">
            <div class="relative flex-grow">
              <input type="text" :placeholder="t.searchPlaceholder" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#1E4B35]" />
              <Search class="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            </div>
            <button class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-6 py-3 rounded-lg text-xs font-bold transition">{{ t.searchBtn }}</button>
          </div>

          <!-- Popular Searches -->
          <div class="flex flex-wrap gap-2 pt-2 items-center text-[10px] text-gray-500">
            <span class="font-bold">{{ t.popularTitle }}</span>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">{{ t.popTrack }}</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">{{ t.popBatch }}</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">{{ t.popReturn }}</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">{{ t.popAccount }}</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">{{ t.popBecomeProducer }}</button>
          </div>
        </div>

        <div class="w-full md:w-auto flex justify-center flex-shrink-0">
          <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg relative bg-gray-100">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Support Agent" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-12">
      <!-- Browse Help Topics -->
      <div class="mb-16">
        <h2 class="text-xl font-bold text-gray-900 mb-8">{{ t.topicsTitle }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <!-- Topic 1 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><ShoppingCart class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">{{ t.t1Title }}</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">{{ t.t1Desc }}</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">{{ t.viewArticles }}</button>
          </div>

          <!-- Topic 2 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><ShieldCheck class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">{{ t.t2Title }}</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">{{ t.t2Desc }}</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">{{ t.viewArticles }}</button>
          </div>

          <!-- Topic 3 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><User class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">{{ t.t3Title }}</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">{{ t.t3Desc }}</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">{{ t.viewArticles }}</button>
          </div>

          <!-- Topic 4 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><Truck class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">{{ t.t4Title }}</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">{{ t.t4Desc }}</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">{{ t.viewArticles }}</button>
          </div>

          <!-- Topic 5 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><Lock class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">{{ t.t5Title }}</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">{{ t.t5Desc }}</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">{{ t.viewArticles }}</button>
          </div>

          <!-- Topic 6 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><Users class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">{{ t.t6Title }}</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">{{ t.t6Desc }}</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">{{ t.viewArticles }}</button>
          </div>
        </div>
      </div>

      <!-- FAQ Accordion / Visual Graphics Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <!-- FAQ Accordion -->
        <div class="lg:col-span-7 space-y-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">{{ t.faqTitle }}</h2>
            <a href="#" class="text-xs font-bold text-gray-500 hover:text-[#1E4B35]">{{ t.viewAllArticles }}</a>
          </div>

          <div class="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
            <!-- FAQ Item 1 (Open) -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 1 ? null : 1" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>{{ t.faq1Q }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 1 }" />
              </button>
              <div v-show="openFaqIndex === 1" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                {{ t.faq1A }}
              </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 2 ? null : 2" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>{{ t.faq2Q }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 2 }" />
              </button>
              <div v-show="openFaqIndex === 2" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                {{ t.faq2A }}
              </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 3 ? null : 3" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>{{ t.faq3Q }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 3 }" />
              </button>
              <div v-show="openFaqIndex === 3" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                {{ t.faq3A }}
              </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 4 ? null : 4" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>{{ t.faq4Q }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 4 }" />
              </button>
              <div v-show="openFaqIndex === 4" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                {{ t.faq4A }}
              </div>
            </div>

            <!-- FAQ Item 5 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 5 ? null : 5" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>{{ t.faq5Q }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 5 }" />
              </button>
              <div v-show="openFaqIndex === 5" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                {{ t.faq5A }}
              </div>
            </div>

            <!-- FAQ Item 6 -->
            <div>
              <button @click="openFaqIndex = openFaqIndex === 6 ? null : 6" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>{{ t.faq6Q }}</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 6 }" />
              </button>
              <div v-show="openFaqIndex === 6" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                {{ t.faq6A }}
              </div>
            </div>
          </div>
        </div>

        <!-- Info Graphic Box -->
        <div class="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center h-full">
          <div class="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
            <ScanLine class="w-16 h-16 text-[#1E4B35] animate-pulse" />
          </div>
          <h4 class="font-bold text-gray-900 text-sm mb-4 leading-normal max-w-xs">
            {{ t.graphicText }}
          </h4>
          <div class="space-y-3.5 text-left w-full max-w-[240px] text-xs text-gray-700">
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.graphicCheck1 }}</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.graphicCheck2 }}</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.graphicCheck3 }}</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.graphicCheck4 }}</div>
          </div>
        </div>
      </div>

      <!-- Contact Forms / Demo Support Channels -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <!-- Contact Form -->
        <div class="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 class="text-xl font-bold text-gray-900 mb-1">{{ t.contactTitle }} <span class="text-xs text-gray-400 font-normal">{{ t.demoChannel }}</span></h2>
          <p class="text-xs text-gray-500 mb-4">{{ t.contactDesc }}</p>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelName }}</label>
                <input type="text" required class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelEmail }}</label>
                <input type="email" required class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelTopic }}</label>
                <select class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35] bg-white text-gray-700">
                  <option>{{ appStore.lang === 'en' ? 'Select a topic' : 'Chọn một chủ đề' }}</option>
                  <option>Traceability Inquiry</option>
                  <option>Order & Checkout Help</option>
                  <option>Producer Account Support</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelRef }}</label>
                <input type="text" placeholder="e.g., LOT-UMH-2605-001" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]" />
              </div>
            </div>

            <div>
              <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelMessage }}</label>
              <textarea required rows="4" :placeholder="appStore.lang === 'en' ? 'How can we help you?' : 'Chúng tôi có thể giúp gì cho bạn?'" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]"></textarea>
            </div>

            <div class="flex items-start gap-2 pt-2">
              <input type="checkbox" required id="democheck" class="mt-0.5 rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35]" />
              <label for="democheck" class="text-[10px] text-gray-500 leading-snug">
                {{ t.demoCheckText }}
              </label>
            </div>

            <button type="submit" class="w-full py-3 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">{{ t.sendMsgBtn }}</button>
          </form>

          <div class="flex items-center justify-center gap-1.5 text-[9px] text-gray-400 pt-2">
            <Lock class="w-3 h-3"/> {{ t.infoSecured }}
          </div>
        </div>

        <!-- Demo support channels list -->
        <div class="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-1">{{ t.demoChannelsTitle }}</h2>
            <p class="text-[10px] text-gray-400 leading-relaxed mb-6">
              {{ t.demoChannelsDesc }}
            </p>

            <div class="space-y-4">
              <div class="flex items-center justify-between border-b border-gray-50 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Mail class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">{{ t.inqGeneral }}</h4>
                    <p class="text-[9px] text-gray-500">{{ t.inqGeneralDesc }}</p>
                  </div>
                </div>
                <span class="font-bold text-[#1E4B35] text-xs">greentracevietnam@gmail.com</span>
              </div>

              <div class="flex items-center justify-between border-b border-gray-50 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Mail class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">{{ t.custSupport }}</h4>
                    <p class="text-[9px] text-gray-500">{{ t.custSupportDesc }}</p>
                  </div>
                </div>
                <span class="font-bold text-[#1E4B35] text-xs">greentracevietnam@gmail.com</span>
              </div>

              <div class="flex items-center justify-between border-b border-gray-50 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Mail class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">{{ t.forProducers }}</h4>
                    <p class="text-[9px] text-gray-500">{{ t.forProducersDesc }}</p>
                  </div>
                </div>
                <span class="font-bold text-[#1E4B35] text-xs">greentracevietnam@gmail.com</span>
              </div>

              <div class="flex items-center justify-between pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Phone class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">{{ t.phoneDemo }}</h4>
                    <p class="text-[9px] text-gray-500">{{ t.phoneDesc }}</p>
                  </div>
                </div>
                <span class="font-bold text-gray-900 text-xs">0797931176</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Chat, Report Batch, Help Center row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-green-50 text-[#1E4B35] rounded-full flex items-center justify-center mx-auto"><MessageSquare class="w-6 h-6"/></div>
            <h3 class="font-bold text-gray-900 text-sm">{{ t.liveChatTitle }} <span class="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded">{{ t.demoLabel }}</span></h3>
            <p class="text-xs text-gray-500 leading-normal">{{ t.liveChatDesc }}</p>
          </div>
          <button @click="startLiveChat" class="w-full py-2 border border-gray-300 hover:border-[#1E4B35] text-gray-700 hover:text-[#1E4B35] rounded-lg text-xs font-bold transition mt-6">
            {{ t.startChatBtn }}
          </button>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto"><AlertTriangle class="w-6 h-6"/></div>
            <h3 class="font-bold text-gray-900 text-sm">{{ t.reportConcernTitle }}</h3>
            <p class="text-xs text-gray-500 leading-normal">{{ t.reportConcernDesc }}</p>
          </div>
          <button @click="reportConcern" class="w-full py-2 border border-gray-300 hover:border-yellow-600 text-gray-700 hover:text-yellow-600 rounded-lg text-xs font-bold transition mt-6">
            {{ t.reportIssueBtn }}
          </button>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto"><BookOpen class="w-6 h-6"/></div>
            <h3 class="font-bold text-gray-900 text-sm">{{ t.resourceHubTitle }}</h3>
            <p class="text-xs text-gray-500 leading-normal">{{ t.resourceHubDesc }}</p>
          </div>
          <button class="w-full py-2 border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-lg text-xs font-bold transition mt-6">
            {{ t.visitCenterBtn }}
          </button>
        </div>
      </div>

      <!-- Bottom policies row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-gray-150 rounded-xl bg-white mb-8 text-center text-xs font-bold text-gray-700">
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><Truck class="w-4 h-4 text-gray-400"/> {{ t.shipPolicy }}</a>
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><RotateCw class="w-4 h-4 text-gray-400"/> {{ t.returnPolicy }}</a>
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><Shield class="w-4 h-4 text-gray-400"/> {{ t.privPolicy }}</a>
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><Flag class="w-4 h-4 text-gray-400"/> {{ t.reportIssueFooter }}</a>
      </div>

      <!-- Academic Prototype Note -->
      <div class="bg-green-50 border border-green-200 rounded-3xl p-6 flex gap-4 items-start shadow-sm">
        <Leaf class="w-6 h-6 text-[#1E4B35] flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-bold text-[#1E4B35] text-sm mb-1.5">{{ t.protoTitle }}</h4>
          <p class="text-green-800 text-[11px] leading-relaxed">
            {{ t.protoDesc }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { Search, ChevronDown, ShoppingCart, ShieldCheck, User, Truck, Lock, Users, MessageSquare, AlertTriangle, BookOpen, RotateCw, Shield, Flag, Leaf, ScanLine, Phone, Mail, Check } from 'lucide-vue-next'

const appStore = useAppStore()
const openFaqIndex = ref(1)

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    title: 'Hỗ trợ & Liên hệ',
    subtitle: 'Chúng tôi sẵn sàng trợ giúp. Tìm câu trả lời, tìm hiểu thêm về truy xuất nguồn gốc và liên hệ với đội ngũ của chúng tôi.',
    searchPlaceholder: 'Tìm kiếm sự trợ giúp về đơn hàng, truy xuất nguồn gốc, tài khoản và trả hàng',
    searchBtn: 'Tìm kiếm',
    popularTitle: 'Tìm kiếm phổ biến:',
    popTrack: 'Theo dõi đơn hàng',
    popBatch: 'Hồ sơ lô hàng',
    popReturn: 'Trả lại sản phẩm',
    popAccount: 'Hỗ trợ tài khoản',
    popBecomeProducer: 'Trở thành nhà sản xuất',
    topicsTitle: 'Duyệt theo chủ đề hỗ trợ',
    t1Title: 'Đơn hàng & Thanh toán',
    t1Desc: 'Trợ giúp về đặt hàng, thanh toán, hóa đơn và khuyến mãi.',
    t2Title: 'Truy xuất & Nhật ký lô hàng',
    t2Desc: 'Hiểu về truy xuất nguồn gốc lô hàng, chứng nhận và kết quả kiểm nghiệm mẫu.',
    t3Title: 'Câu hỏi cho nhà sản xuất',
    t3Desc: 'Tài liệu dành cho nhà sản xuất về quy trình tham gia, tiêu chuẩn và thực hành tốt nhất.',
    t4Title: 'Vận chuyển & Trả hàng',
    t4Desc: 'Thời gian giao hàng, chính sách vận chuyển và quy trình trả hàng.',
    t5Title: 'Tài khoản & Bảo mật',
    t5Desc: 'Quản lý tài khoản, cài đặt bảo mật và quyền riêng tư.',
    t6Title: 'Hợp tác với chúng tôi',
    t6Desc: 'Hợp tác, đơn đặt hàng số lượng lớn và cơ hội làm việc cùng nhau.',
    viewArticles: 'Xem bài viết &rarr;',
    faqTitle: 'Câu hỏi thường gặp',
    viewAllArticles: 'Xem tất cả bài viết &rarr;',
    faq1Q: 'Mẫu đã duyệt (Reviewed Sample) có nghĩa là gì?',
    faq1A: 'Mẫu đã duyệt có nghĩa là đội ngũ của chúng tôi đã xác minh thông tin lô hàng, kiểm tra chất lượng và các hồ sơ hỗ trợ như báo cáo phòng thí nghiệm và chi tiết nhà sản xuất. Nó không đảm bảo chứng nhận nhưng cho biết lô hàng đã vượt qua đánh giá nội bộ của chúng tôi.',
    faq2Q: 'Làm thế nào để tôi xem hồ sơ lô hàng?',
    faq2A: 'Bạn có thể tra cứu bất kỳ lô hàng nào bằng cách nhập số Lot của nó (ví dụ: LOT-UMH-2605-001) vào thanh tìm kiếm tra cứu truy xuất nguồn gốc trên trang Truy xuất nguồn gốc.',
    faq3Q: 'Tôi có thể yêu cầu trả hàng trong bản thử nghiệm này không?',
    faq3A: 'Vì đây là bản thử nghiệm học thuật, các yêu cầu trả hàng thương mại được mô phỏng. Bạn có thể nhấp vào nút "Yêu cầu trả hàng (Demo)" trên trang Đơn hàng của bạn để xem quy trình hoạt động.',
    faq4Q: 'Làm thế nào nhà sản xuất có thể tham gia Green Trace?',
    faq4A: 'Nhà sản xuất có thể truy cập trang "Hợp tác với chúng tôi", đọc các hướng dẫn xác minh của chúng tôi và gửi mẫu đơn đăng ký mô phỏng.',
    faq5Q: 'Green Trace có sẵn ở quốc gia của tôi không?',
    faq5A: 'Giai đoạn thử nghiệm hiện tại (2026) tập trung vào các tỉnh thành đại diện tại Việt Nam, như Cà Mau, Bến Tre và Sóc Trăng.',
    faq6Q: 'Làm thế nào để bảo vệ dữ liệu cá nhân của tôi?',
    faq6A: 'Tất cả dữ liệu được xử lý theo Chính sách bảo mật nghiêm ngặt của chúng tôi, và hồ sơ tài khoản khách hàng được mã hóa an toàn để đảm bảo bảo vệ dữ liệu.',
    graphicText: 'Green Trace giúp bạn đưa ra lựa chọn tự tin bằng cách kết nối bạn với các hồ sơ đã xác minh từ trang trại đến bàn ăn.',
    graphicCheck1: 'Nhà sản xuất đã xác minh',
    graphicCheck2: 'Hồ sơ minh bạch',
    graphicCheck3: 'Thực hành bền vững',
    graphicCheck4: 'Quyết định tốt hơn',
    contactTitle: 'Liên hệ với đội ngũ của chúng tôi',
    demoChannel: '(Kênh Demo)',
    contactDesc: 'Sử dụng mẫu dưới đây để gửi tin nhắn cho chúng tôi. Đội ngũ của chúng tôi sẽ phản hồi qua email.',
    labelName: 'Họ và tên *',
    labelEmail: 'Địa chỉ Email *',
    labelTopic: 'Chủ đề *',
    labelRef: 'Mã tham chiếu đơn hàng hoặc lô hàng (tùy chọn)',
    labelMessage: 'Tin nhắn *',
    demoCheckText: 'Tôi hiểu đây là một kênh demo / đề xuất thử nghiệm và không phải là một hoạt động thương mại trực tiếp.',
    sendMsgBtn: 'Gửi tin nhắn',
    infoSecured: 'Thông tin của bạn chỉ được sử dụng để phản hồi yêu cầu.',
    demoChannelsTitle: 'Kênh hỗ trợ demo',
    demoChannelsDesc: 'Đây là các kênh email demo / đề xuất thử nghiệm. Thời gian phản hồi mục tiêu trong tương lai: 1-2 ngày làm việc.',
    inqGeneral: 'Yêu cầu chung',
    inqGeneralDesc: 'Cho các câu hỏi về mô hình Green Trace',
    custSupport: 'Hỗ trợ khách hàng',
    custSupportDesc: 'Cho các vấn đề đơn hàng & trợ giúp demo',
    forProducers: 'Dành cho nhà sản xuất',
    forProducersDesc: 'Cho xác minh & đăng ký lô hàng',
    phoneDemo: 'Điện thoại (Demo)',
    phoneDesc: 'Thứ 2-Thứ 6, 9:00 SA – 5:00 CH (ICT)',
    liveChatTitle: 'Demo Chat trực tuyến',
    liveChatDesc: 'Trò chuyện với đội ngũ của chúng tôi về đơn hàng, truy xuất nguồn gốc hoặc tài khoản.',
    startChatBtn: 'Bắt đầu chat',
    reportConcernTitle: 'Báo cáo mối ngại về lô hàng',
    reportConcernDesc: 'Báo cáo vấn đề về chất lượng, hồ sơ hoặc thông tin không chính xác.',
    reportIssueBtn: 'Báo cáo vấn đề',
    resourceHubTitle: 'Trung tâm tài nguyên hỗ trợ',
    resourceHubDesc: 'Hướng dẫn, bài viết và video để giúp bạn tìm hiểu thêm.',
    visitCenterBtn: 'Tới trung tâm hỗ trợ',
    shipPolicy: 'Chính sách vận chuyển',
    returnPolicy: 'Chính sách trả hàng',
    privPolicy: 'Chính sách bảo mật',
    reportIssueFooter: 'Báo cáo sự cố',
    protoTitle: 'Nền tảng này là một mô hình thử nghiệm học thuật.',
    protoDesc: 'Green Trace là dự án học tập của sinh viên được thiết kế để trình diễn tính truy xuất nguồn gốc và sự minh bạch trong chuỗi cung ứng nông nghiệp. Đây không phải là dịch vụ thương mại trực tiếp. Các tính năng và dữ liệu được mô phỏng cho mục đích giáo dục.',
    demoLabel: 'Thử nghiệm',
    demoFormSubmit: 'Cảm ơn bạn đã gửi tin nhắn! Đây là bản gửi thử nghiệm.',
    demoChatSubmit: 'Đang kết nối bạn với bộ phận hỗ trợ...',
    demoConcernSubmit: 'Vui lòng điền thông tin lô hàng cần báo cáo...'
  } : {
    title: 'Support & Contact',
    subtitle: 'We\'re here to help. Find answers, learn more about traceability, and get in touch with our team.',
    searchPlaceholder: 'Search for help with orders, traceability, accounts, and returns',
    searchBtn: 'Search',
    popularTitle: 'Popular searches:',
    popTrack: 'Track my order',
    popBatch: 'Batch record',
    popReturn: 'Return a product',
    popAccount: 'Account help',
    popBecomeProducer: 'Become a producer',
    topicsTitle: 'Browse help topics',
    t1Title: 'Orders & Checkout',
    t1Desc: 'Help with ordering, payments, invoices, and promotions.',
    t2Title: 'Traceability & Batch Records',
    t2Desc: 'Understand batch traceability, certifications, and sample lab reports.',
    t3Title: 'Producer Questions',
    t3Desc: 'Resources for producers about onboarding, standards, and best practices.',
    t4Title: 'Shipping & Returns',
    t4Desc: 'Delivery timelines, shipping policy, and return process.',
    t5Title: 'Account & Security',
    t5Desc: 'Manage your account, security settings, and privacy.',
    t6Title: 'Partner With Us',
    t6Desc: 'Partnership, bulk orders, and collaboration opportunities.',
    viewArticles: 'View articles &rarr;',
    faqTitle: 'Frequently asked questions',
    viewAllArticles: 'View all articles &rarr;',
    faq1Q: 'What does Reviewed Sample mean?',
    faq1A: 'Reviewed Sample means our team has verified the batch information, quality checks, and supporting records such as lab reports and producer details. It does not guarantee a certification but indicates the batch has passed our internal review.',
    faq2Q: 'How do I view a batch record?',
    faq2A: 'You can look up any batch by entering its Lot number (e.g., LOT-UMH-2605-001) in the Traceability lookup search bar on the Traceability page.',
    faq3Q: 'Can I request a return in this prototype?',
    faq3A: 'As this is an academic prototype, commercial return requests are simulated. You can click the "Request Return (Demo)" button on your Orders page to see how the workflow operates.',
    faq4Q: 'How can producers join Green Trace?',
    faq4A: 'Producers can visit the "Partner With Us" page, read our verification guidelines, and submit a simulation onboarding application form.',
    faq5Q: 'Is Green Trace available in my country?',
    faq5A: 'The current pilot phase (2026) is centered on representative provinces in Vietnam, such as Ca Mau, Ben Tre, and Soc Trang.',
    faq6Q: 'How do you protect my personal data?',
    faq6A: 'All data is handled according to our strict Privacy Policies, and customer account files are encrypted securely to ensure data protection.',
    graphicText: 'Green Trace helps you make confident choices by connecting you to verified records from farm to table.',
    graphicCheck1: 'Verified producers',
    graphicCheck2: 'Transparent records',
    graphicCheck3: 'Sustainable practices',
    graphicCheck4: 'Better decisions',
    contactTitle: 'Contact our team',
    demoChannel: '(Demo channel)',
    contactDesc: 'Use the form below to send us a message. Our team will respond via email.',
    labelName: 'Full name *',
    labelEmail: 'Email address *',
    labelTopic: 'Topic *',
    labelRef: 'Order or Batch Reference (optional)',
    labelMessage: 'Message *',
    demoCheckText: 'I understand this is a demo / proposed pilot channel and not a live commercial operation.',
    sendMsgBtn: 'Send Message',
    infoSecured: 'Your information is used only to respond to your request.',
    demoChannelsTitle: 'Demo support channels',
    demoChannelsDesc: 'These are demo / proposed pilot email channels. Target response time for the future pilot: 1-2 business days.',
    inqGeneral: 'General inquiries',
    inqGeneralDesc: 'For questions about Green Trace model',
    custSupport: 'Customer support',
    custSupportDesc: 'For mock order issues & help',
    forProducers: 'For producers',
    forProducersDesc: 'For verification & batch onboarding',
    phoneDemo: 'Phone (Demo)',
    phoneDesc: 'Mon-Fri, 9:00 AM – 5:00 PM (ICT)',
    liveChatTitle: 'Live chat demo',
    liveChatDesc: 'Chat with our team about orders, traceability, or account help.',
    startChatBtn: 'Start Live Chat',
    reportConcernTitle: 'Report a batch concern',
    reportConcernDesc: 'Report an issue about quality, records, or incorrect information.',
    reportIssueBtn: 'Report an Issue',
    resourceHubTitle: 'Help center resource hub',
    resourceHubDesc: 'Guides, articles, and videos to help you learn more.',
    visitCenterBtn: 'Visit Help Center',
    shipPolicy: 'Shipping Policy',
    returnPolicy: 'Return Policy',
    privPolicy: 'Privacy Policy',
    reportIssueFooter: 'Report an Issue',
    protoTitle: 'This platform is an academic prototype.',
    protoDesc: 'Green Trace is a student learning project designed to demonstrate traceability and transparency in agricultural supply chains. This is not a live commercial service. Features and data are simulated for educational purposes.',
    demoLabel: 'Demo',
    demoFormSubmit: 'Thank you for your message! This is a demo submission.',
    demoChatSubmit: 'Simulated Live Chat: Connecting you to support...',
    demoConcernSubmit: 'Simulated Concern form: Please enter batch info...'
  }
})

const submitForm = () => {
  appStore.triggerToast(t.value.demoFormSubmit)
}

const startLiveChat = () => {
  appStore.triggerToast(t.value.demoChatSubmit)
}

const reportConcern = () => {
  appStore.triggerToast(t.value.demoConcernSubmit)
}
</script>
