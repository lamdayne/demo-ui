<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] py-16 relative overflow-hidden">
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        <div class="md:w-3/5 pr-8">
          <h1 class="text-4xl lg:text-5xl font-bold text-[#1E4B35] mb-4 leading-tight">{{ appStore.t('onboardingIntro') }}</h1>
          <p class="text-gray-700 text-lg mb-8 max-w-lg">
            {{ appStore.t('onboardingDesc') }}
          </p>
          <div class="flex flex-wrap gap-4 text-sm font-bold text-[#1E4B35]">
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <ShieldCheck class="w-5 h-5" /> {{ appStore.t('buildTrust') }}
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Eye class="w-5 h-5" /> {{ appStore.t('increaseVisibility') }}
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <TrendingUp class="w-5 h-5" /> {{ appStore.t('growYourBusiness') }}
            </div>
          </div>
        </div>
        <div class="md:w-2/5 mt-8 md:mt-0 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" alt="Smiling Farmer" class="w-full h-full object-cover object-center" />
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
      <!-- Prototype Warning Box -->
      <div class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-6 flex items-start gap-4 shadow-sm mb-12">
        <Leaf class="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
        <div>
          <h3 class="text-green-900 font-bold text-lg mb-1">{{ appStore.t('prototypeTitle') }}</h3>
          <p class="text-green-800 text-sm">
            {{ appStore.t('prototypeDesc') }}
          </p>
        </div>
        <FileText class="w-16 h-16 text-green-700/20 ml-auto hidden md:block" />
      </div>

      <h2 class="text-2xl font-bold text-[#1E4B35] mb-6">{{ appStore.t('whyPartner') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Users class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">{{ appStore.t('reachMoreCustomers') }}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ appStore.t('reachMoreCustomersDesc') }}</p>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Sprout class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">{{ appStore.t('presentStory') }}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ appStore.t('presentStoryDesc') }}</p>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <FileBox class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">{{ appStore.t('organizeBatch') }}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ appStore.t('organizeBatchDesc') }}</p>
          </div>
        </div>
      </div>

      <!-- Main Layout Content -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Registration Form (Left) -->
        <div class="w-full lg:w-[65%]">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-[#1E4B35]">{{ appStore.t('producerRegistration') }}</h2>
            <p class="text-gray-600 text-sm">{{ appStore.t('fillForm') }}</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div class="space-y-8">
              <!-- 1. Producer Information -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User class="w-5 h-5 text-[#1E4B35]" /> {{ appStore.t('onboardingForm') }}
                </h3>
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">{{ appStore.t('producerType') }}</label>
                  <div class="flex flex-wrap gap-6 text-sm text-gray-700">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" checked class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      {{ appStore.t('individualProducer') }}
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      {{ appStore.t('cooperative') }}
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      {{ appStore.t('farmOrg') }}
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      {{ appStore.t('other') }}
                      <input type="text" :placeholder="appStore.t('pleaseSpecify')" class="border-b focus:border-[#1E4B35] outline-none ml-2 px-1 py-0.5 text-xs text-gray-900" />
                    </label>
                  </div>
                </div>
              </div>

              <!-- 2. Business Details -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building class="w-5 h-5 text-[#1E4B35]" /> 2. {{ appStore.t('businessName').replace(' *', '') }} & {{ appStore.t('location').replace(' *', '').replace('(Province, Country)', '') }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="col-span-2">
                    <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('businessName') }}</label>
                    <input type="text" v-model="name" :placeholder="appStore.t('businessName').replace(' *', '')" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('location') }}</label>
                    <input type="text" v-model="locationStr" :placeholder="appStore.t('location').replace(' *', '')" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('shortSlogan') }}</label>
                    <input type="text" v-model="description" :placeholder="appStore.t('shortSlogan').replace(' *', '')" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm text-gray-600 mb-1.5">{{ appStore.t('coverPhoto') }}</label>
                    <div class="flex items-center gap-4">
                      <div class="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 relative shadow-inner">
                        <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-xs">{{ appStore.t('noImage') }}</div>
                      </div>
                      <div class="space-y-2">
                        <button type="button" @click="triggerUpload" :disabled="uploading" class="px-4 py-2 bg-white border border-gray-300 hover:border-[#1E4B35] text-gray-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5">
                          <Upload class="w-3.5 h-3.5" />
                          {{ uploading ? appStore.t('uploadingMsg') : appStore.t('uploadBtn') }}
                        </button>
                        <input type="file" ref="fileInput" @change="onImageUpload" class="hidden" accept="image/*" />
                        <p class="text-[10px] text-gray-400">JPG, PNG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3. Product Categories -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package class="w-5 h-5 text-[#1E4B35]" /> {{ appStore.t('categories') }}
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div 
                    @click="toggleCategory('Honey')"
                    :class="[
                      'border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition select-none',
                      selectedCategories.includes('Honey') 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-[#1E4B35]'
                    ]"
                  >
                    <Hexagon class="w-6 h-6 text-yellow-500" />
                    <span :class="['text-sm font-semibold', selectedCategories.includes('Honey') ? 'text-[#1E4B35]' : 'text-gray-900']">{{ appStore.t('honeyCat') }}</span>
                  </div>
                  <div 
                    @click="toggleCategory('Rice & Grains')"
                    :class="[
                      'border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition select-none',
                      selectedCategories.includes('Rice & Grains') 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-[#1E4B35]'
                    ]"
                  >
                    <Wheat class="w-6 h-6 text-yellow-600" />
                    <span :class="['text-sm font-semibold', selectedCategories.includes('Rice & Grains') ? 'text-[#1E4B35]' : 'text-gray-900']">{{ appStore.t('riceGrainsCat') }}</span>
                  </div>
                  <div 
                    @click="toggleCategory('Fruits')"
                    :class="[
                      'border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition select-none',
                      selectedCategories.includes('Fruits') 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-[#1E4B35]'
                    ]"
                  >
                    <Apple class="w-6 h-6 text-red-500" />
                    <span :class="['text-sm font-semibold', selectedCategories.includes('Fruits') ? 'text-[#1E4B35]' : 'text-gray-900']">{{ appStore.t('fruitsCat') }}</span>
                  </div>
                  <div 
                    @click="toggleCategory('Vegetables')"
                    :class="[
                      'border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition select-none',
                      selectedCategories.includes('Vegetables') 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-[#1E4B35]'
                    ]"
                  >
                    <Carrot class="w-6 h-6 text-orange-500" />
                    <span :class="['text-sm font-semibold', selectedCategories.includes('Vegetables') ? 'text-[#1E4B35]' : 'text-gray-900']">{{ appStore.t('vegetablesCat') }}</span>
                  </div>
                </div>
              </div>

              <!-- 4. Story & Bio -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText class="w-5 h-5 text-[#1E4B35]" /> {{ appStore.t('historyStory') }}
                </h3>
                <textarea v-model="history" :placeholder="appStore.t('farmStoryPlaceholder')" rows="4" class="w-full border border-gray-300 rounded-xl p-4 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] resize-none"></textarea>
              </div>

              <!-- Submit area -->
              <div class="pt-6 border-t border-gray-100">
                <label class="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" v-model="termsAccepted" class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5 mt-0.5" />
                  <span class="text-sm text-gray-700 leading-normal">
                    {{ appStore.t('termsAccept') }} <span class="text-red-500">*</span>
                  </span>
                </label>
                <button @click="submitOnboard" class="w-full py-4 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-[#1E4B35]/20">
                  <Send class="w-4 h-4" /> {{ appStore.t('registerSubmit') }}
                </button>
                <p class="text-center text-xs text-gray-500 mt-3">
                  {{ appStore.t('agreeVerify') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar (Right) -->
        <div class="w-full lg:w-[35%] space-y-6">
          <!-- Required Checklist -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-4">{{ appStore.t('checklistTitle') }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ appStore.t('checklistDesc') }}</p>
            <ul class="space-y-3">
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{{ appStore.t('check1') }}</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{{ appStore.t('check2') }}</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{{ appStore.t('check3') }}</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{{ appStore.t('check4') }}</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{{ appStore.t('check5') }}</span>
              </li>
            </ul>
          </div>

          <!-- What Happens Next -->
          <div class="bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-[#1E4B35] mb-4">{{ appStore.t('nextTitle') }}</h3>
            <div class="relative pl-8 space-y-6">
              <div class="absolute left-3.5 top-2 bottom-2 w-0.5 bg-green-200"></div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('next1Title') }}</h4>
                <p class="text-xs text-gray-600 mt-1">{{ appStore.t('next1Desc') }}</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('next2Title') }}</h4>
                <p class="text-xs text-gray-600 mt-1">{{ appStore.t('next2Desc') }}</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('next3Title') }}</h4>
                <p class="text-xs text-gray-600 mt-1">{{ appStore.t('next3Desc') }}</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <h4 class="font-bold text-gray-900 text-sm">{{ appStore.t('next4Title') }}</h4>
                <p class="text-xs text-gray-600 mt-1">{{ appStore.t('next4Desc') }}</p>
              </div>
            </div>
            <div class="mt-6 border-t border-green-200 pt-4 text-center text-xs text-green-800 font-semibold">
              {{ appStore.t('reviewTime') }}
            </div>
          </div>

          <!-- FAQ Accordion -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-4">{{ appStore.t('faqTitle') }}</h3>
            <div class="space-y-3">
              <div class="border-b border-gray-100 pb-3">
                <button @click="toggleFaq(0)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>{{ appStore.t('faqQ1') }}</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 0 }" />
                </button>
                <div v-show="activeFaq === 0" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  {{ appStore.t('faqA1') }}
                </div>
              </div>
              <div class="border-b border-gray-100 pb-3">
                <button @click="toggleFaq(1)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>{{ appStore.t('faqQ2') }}</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 1 }" />
                </button>
                <div v-show="activeFaq === 1" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  {{ appStore.t('faqA2') }}
                </div>
              </div>
              <div class="border-b border-gray-100 pb-3">
                <button @click="toggleFaq(2)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>{{ appStore.t('faqQ3') }}</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 2 }" />
                </button>
                <div v-show="activeFaq === 2" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  {{ appStore.t('faqA3') }}
                </div>
              </div>
              <div>
                <button @click="toggleFaq(3)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>{{ appStore.t('faqQ4') }}</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 3 }" />
                </button>
                <div v-show="activeFaq === 3" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  {{ appStore.t('faqA4') }}
                </div>
              </div>
            </div>
            <a href="#" class="block text-center text-xs font-bold text-green-700 hover:underline mt-4">{{ appStore.t('viewAllFaq') }}</a>
          </div>

          <!-- Need Help -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
            <h3 class="font-bold text-gray-900 mb-1">{{ appStore.t('needHelp') }}</h3>
            <p class="text-xs text-gray-500 mb-4">{{ appStore.t('hereToSupport') }}</p>
            <div class="text-sm text-gray-700 space-y-1.5 mb-4 text-left">
              <div class="flex items-center gap-2 justify-center">
                <Mail class="w-4 h-4 text-gray-400" />
                <span class="font-semibold text-gray-900">greentracevietnam@gmail.com</span>
              </div>
              <div class="flex items-center gap-2 justify-center">
                <Phone class="w-4 h-4 text-gray-400" />
                <span class="font-semibold text-gray-900">0797931176</span>
              </div>
              <div class="text-center text-[10px] text-gray-400">{{ appStore.t('hoursLabel') }}</div>
            </div>
            <button class="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition">
              <MessageSquare class="w-4 h-4 fill-current" /> {{ appStore.t('chatWhatsApp') }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Bottom Branding Banner -->
      <div class="mt-16 bg-[#1E4B35] rounded-3xl p-8 lg:p-12 text-white text-center shadow-lg relative overflow-hidden">
        <div class="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 class="text-2xl lg:text-3xl font-extrabold tracking-tight">{{ appStore.t('bannerTitle') }}</h2>
          <p class="text-green-100 text-sm leading-relaxed max-w-xl mx-auto">
            {{ appStore.t('bannerDesc') }}
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs font-semibold text-green-200">
            <div class="flex items-center justify-center gap-2">
              <ShieldCheck class="w-5 h-5 text-green-400" /> {{ appStore.t('bannerTransparent') }}
            </div>
            <div class="flex items-center justify-center gap-2">
              <Sprout class="w-5 h-5 text-green-400" /> {{ appStore.t('bannerSustainable') }}
            </div>
            <div class="flex items-center justify-center gap-2">
              <Users class="w-5 h-5 text-green-400" /> {{ appStore.t('bannerCommunity') }}
            </div>
            <div class="flex items-center justify-center gap-2">
              <TrendingUp class="w-5 h-5 text-green-400" /> {{ appStore.t('bannerFuture') }}
            </div>
          </div>
        </div>
        <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Leaf class="w-60 h-60 text-white fill-current" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { Leaf, ShieldCheck, Eye, TrendingUp, FileText, Users, Sprout, Building, User, Package, UploadCloud, Upload, CheckCircle2, Apple, Carrot, Wheat, Hexagon, FileBox, Send, Egg, ChevronDown, Mail, Phone, MessageSquare, MapPin } from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const activeFaq = ref(0)
function toggleFaq(index) {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
}

// Form state
const name = ref('')
const locationStr = ref('')
const description = ref('')
const history = ref('')
const imageUrl = ref('')
const selectedCategories = ref(['Honey'])

function toggleCategory(cat) {
  const index = selectedCategories.value.indexOf(cat)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(cat)
  }
}

const uploading = ref(false)
const fileInput = ref(null)
const termsAccepted = ref(false)

function triggerUpload() {
  fileInput.value.click()
}

async function onImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  uploading.value = true
  try {
    const url = await appStore.uploadImage(file)
    imageUrl.value = url
    appStore.triggerToast(appStore.t('partnerUploadSuccess'))
  } catch (err) {
    console.error(err)
    appStore.triggerToast(appStore.t('partnerUploadFailed'))
  } finally {
    uploading.value = false
  }
}

async function submitOnboard() {
  if (!appStore.user) {
    appStore.triggerToast(appStore.t('partnerLoginRequired'))
    router.push('/login')
    return
  }
  if (!name.value.trim() || !locationStr.value.trim() || !description.value.trim()) {
    appStore.triggerToast(appStore.t('partnerFillRequired'))
    return
  }
  if (!termsAccepted.value) {
    appStore.triggerToast(appStore.t('partnerAcceptTerms'))
    return
  }

  try {
    const res = await appStore.onboardProducer({
      name: name.value.trim(),
      location: locationStr.value.trim(),
      description: description.value.trim(),
      history: history.value.trim(),
      image_url: imageUrl.value.trim() || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600'
    })
    appStore.triggerToast(appStore.t('partnerSuccess'))
    // Update user role to producer in local state
    appStore.user.role = 'producer'
    router.push('/producer-dashboard')
  } catch (err) {
    console.error(err)
    appStore.triggerToast(err.message || appStore.t('partnerError'))
  }
}
</script>
