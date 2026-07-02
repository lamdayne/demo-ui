<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">{{ t.home }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <router-link to="/traceability" class="hover:text-[#1E4B35]">{{ t.traceability }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">{{ t.title }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-1">{{ t.title }}</h1>
      <p class="text-xs text-gray-500 mb-8">{{ t.subtitle }}</p>

      <!-- Search & Filters -->
      <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4 mb-8">
        <!-- Search bar -->
        <div class="flex gap-2">
          <div class="relative flex-grow">
            <input type="text" :placeholder="t.searchPlaceholder" class="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#1E4B35]" />
            <Search class="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
          <button class="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition flex items-center gap-1.5"><RotateCw class="w-3.5 h-3.5 text-gray-400"/> {{ t.clearAll }}</button>
        </div>

        <!-- Filter Selects -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelProduct }}</label>
            <select class="border border-gray-300 rounded-lg p-2 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#1E4B35]">
              <option>{{ t.allProducts }}</option>
              <option>U Minh Forest Wild Honey 500 ml</option>
              <option>ST25 Premium Rice 2 kg</option>
              <option>Lotus Tea 200 g</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelProducer }}</label>
            <select class="border border-gray-300 rounded-lg p-2 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#1E4B35]">
              <option>{{ t.allProducers }}</option>
              <option>U Minh Bee Farm</option>
              <option>Soc Trang Rice Co-op</option>
              <option>Lotus Lake Tea Co-op</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelRecordType }}</label>
            <select class="border border-gray-300 rounded-lg p-2 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#1E4B35]">
              <option>{{ t.allTypes }}</option>
              <option>{{ t.recordLabReport }}</option>
              <option>{{ t.recordBatchRecord }}</option>
              <option>{{ t.recordProducerProfile }}</option>
              <option>{{ t.recordSupportingRecord }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelRegion }}</label>
            <select class="border border-gray-300 rounded-lg p-2 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#1E4B35]">
              <option>{{ t.allRegions }}</option>
              <option>Ca Mau</option>
              <option>Soc Trang</option>
              <option>Dong Thap</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[9px] font-bold text-gray-400 uppercase">{{ t.labelStatus }}</label>
            <select class="border border-gray-300 rounded-lg p-2 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#1E4B35]">
              <option>{{ t.allStatus }}</option>
              <option>{{ t.reviewedSample }}</option>
              <option>{{ t.previewSample }}</option>
            </select>
          </div>
        </div>

        <!-- Sort, grid toggle row -->
        <div class="flex justify-between items-center border-t border-gray-100 pt-4 text-xs">
          <button class="font-bold text-gray-500 hover:text-[#1E4B35] flex items-center gap-1">{{ t.moreFilters }} <ChevronDown class="w-3.5 h-3.5"/></button>
          
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5">
              <span class="text-gray-400 text-[10px]">{{ t.sortBy }}</span>
              <select class="border border-gray-300 rounded-lg px-2.5 py-1 text-xs bg-white text-gray-700 focus:outline-none">
                <option>{{ t.newestFirst }}</option>
                <option>{{ t.oldestFirst }}</option>
                <option>{{ t.alphabetical }}</option>
              </select>
            </div>
            
            <div class="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
              <button class="p-1.5 bg-gray-100 text-gray-700 border-r border-gray-200"><List class="w-4 h-4"/></button>
              <button class="p-1.5 text-gray-400 hover:text-gray-700"><Grid class="w-4 h-4"/></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Columns Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <!-- Records List (Left Column) -->
        <div class="lg:col-span-8 space-y-6">
          <div class="text-xs text-gray-400 font-bold mb-4">{{ t.showingRecords }}</div>
          
          <!-- Record 1 -->
          <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div class="w-16 h-16 rounded-2xl bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0">
              <FlaskConical class="w-8 h-8" />
            </div>
            <div class="flex-grow space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{{ t.recordLabReport }}</span>
                <span class="bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-200">{{ t.reviewedSample }}</span>
              </div>
              <h3 class="font-extrabold text-gray-900 text-sm">{{ t.doc1 }}</h3>
              <div class="text-[10px] text-gray-500 leading-normal">
                {{ t.producerLabel }}<router-link to="/producer/1" class="font-semibold hover:underline">U Minh Bee Farm</router-link><br/>
                {{ t.productLabel }}U Minh Forest Wild Honey 500 ml<br/>
                {{ t.testsReviewedLabel }}Moisture, HMF, Antibiotic screen
              </div>
              <div class="flex flex-wrap gap-1.5 pt-1 text-[8px] font-bold text-gray-600">
                <span class="bg-gray-100 px-2 py-0.5 rounded">Moisture</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">HMF</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Antibiotic Screen</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0 flex flex-col justify-between h-20 items-end">
              <span class="text-[10px] text-gray-400">May 10, 2026</span>
              <button @click="openPreview('report')" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition">
                {{ t.previewSampleBtn }} <FileText class="w-3.5 h-3.5 text-gray-400"/>
              </button>
            </div>
          </div>

          <!-- Record 2 -->
          <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div class="w-16 h-16 rounded-2xl bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0">
              <ClipboardList class="w-8 h-8" />
            </div>
            <div class="flex-grow space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{{ t.recordBatchRecord }}</span>
                <span class="bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-200">{{ t.reviewedSample }}</span>
              </div>
              <h3 class="font-extrabold text-gray-900 text-sm">{{ t.doc2 }}</h3>
              <div class="text-[10px] text-gray-500 leading-normal">
                {{ t.producerLabel }}Soc Trang Rice Co-op<br/>
                {{ t.productLabel }}ST25 Premium Rice 2 kg<br/>
                Details: Harvest, processing, storage, and packing summary
              </div>
              <div class="flex flex-wrap gap-1.5 pt-1 text-[8px] font-bold text-gray-600">
                <span class="bg-gray-100 px-2 py-0.5 rounded">Harvest</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Processing</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Storage</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Packing</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0 flex flex-col justify-between h-20 items-end">
              <span class="text-[10px] text-gray-400">May 07, 2026</span>
              <button @click="openPreview('batch')" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition">
                {{ t.viewRecordBtn }} <ExternalLink class="w-3.5 h-3.5 text-gray-400"/>
              </button>
            </div>
          </div>

          <!-- Record 3 -->
          <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div class="w-16 h-16 rounded-2xl bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0">
              <Users class="w-8 h-8" />
            </div>
            <div class="flex-grow space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{{ t.recordProducerProfile }}</span>
                <span class="bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-200">{{ t.reviewedSample }}</span>
              </div>
              <h3 class="font-extrabold text-gray-900 text-sm">{{ t.doc3 }}</h3>
              <div class="text-[10px] text-gray-500 leading-normal">
                {{ t.labelRegion }}: Ca Mau, Viet Nam<br/>
                Highlights: Farm practices, sustainability actions, beekeeping methods, community engagement
              </div>
              <div class="flex flex-wrap gap-1.5 pt-1 text-[8px] font-bold text-gray-600">
                <span class="bg-gray-100 px-2 py-0.5 rounded">Bee Farm</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Sustainability</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Community</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0 flex flex-col justify-between h-20 items-end">
              <span class="text-[10px] text-gray-400">May 03, 2026</span>
              <router-link to="/producer/1" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition">
                {{ t.viewProfileBtn }} <ExternalLink class="w-3.5 h-3.5 text-gray-400"/>
              </router-link>
            </div>
          </div>

          <!-- Record 4 -->
          <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div class="w-16 h-16 rounded-2xl bg-green-50 text-[#1E4B35] flex items-center justify-center flex-shrink-0">
              <FileText class="w-8 h-8" />
            </div>
            <div class="flex-grow space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{{ t.recordSupportingRecord }}</span>
                <span class="bg-blue-50 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-blue-200">{{ t.previewSample }}</span>
              </div>
              <h3 class="font-extrabold text-gray-900 text-sm">{{ t.doc4 }}</h3>
              <div class="text-[10px] text-gray-500 leading-normal">
                {{ t.producerLabel }}Ben Tre Green Co-op<br/>
                Record type: Farm harvest log<br/>
                Details: Harvest date, quantity, field location, notes
              </div>
              <div class="flex flex-wrap gap-1.5 pt-1 text-[8px] font-bold text-gray-600">
                <span class="bg-gray-100 px-2 py-0.5 rounded">Harvest Log</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Quantity</span>
                <span class="bg-gray-100 px-2 py-0.5 rounded">Field Location</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0 flex flex-col justify-between h-20 items-end">
              <span class="text-[10px] text-gray-400">May 01, 2026</span>
              <button @click="openPreview('supporting')" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition">
                {{ t.previewSampleBtn }} <FileText class="w-3.5 h-3.5 text-gray-400"/>
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar Guides (Right Column) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Guide Card 1 -->
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 class="font-bold text-gray-900 text-sm flex items-center gap-1.5"><ShieldCheck class="w-5 h-5 text-green-600" /> {{ t.archTitle }}</h4>
            <p class="text-[11px] text-gray-500 leading-relaxed">
              {{ t.archDesc1 }}
            </p>
            <p class="text-[11px] text-gray-500 leading-relaxed">
              {{ t.archDesc2 }}
            </p>
            <div class="space-y-2.5 text-[10px] text-gray-700 pt-2 border-t border-gray-100">
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.archCheck1 }}</div>
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.archCheck2 }}</div>
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.archCheck3 }}</div>
              <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> {{ t.archCheck4 }}</div>
            </div>
            
            <div class="relative pt-4 flex justify-end opacity-20">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200" alt="leaf decoration" class="w-16 h-16 object-contain pointer-events-none" />
            </div>
          </div>

          <!-- Need Help card -->
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
            <h4 class="font-bold text-gray-900 text-sm">{{ t.helpTitle }}</h4>
            
            <div class="w-20 h-20 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Support agent" class="w-full h-full object-cover" />
            </div>
            
            <p class="text-[11px] text-gray-500 leading-normal max-w-[200px]">
              {{ t.helpDesc }}
            </p>
            
            <router-link to="/support" class="w-full py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">
              {{ t.contactSupport }}
            </router-link>
            <router-link to="/support" class="text-[10px] font-bold text-gray-500 hover:text-[#1E4B35]">
              {{ t.visitSupportCenter }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Document Preview Gallery Section -->
      <div class="bg-white border border-gray-200 rounded-3xl p-6 lg:p-8 shadow-sm mb-12">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-gray-900 text-base">{{ t.galleryTitle }}</h3>
          <button @click="openGallery" class="text-xs font-bold text-[#1E4B35] hover:underline">{{ t.galleryLink }}</button>
        </div>

        <!-- Carousel -->
        <div class="relative flex items-center justify-center gap-6">
          <button @click="prevDoc" class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition flex-shrink-0">
            <ChevronLeft class="w-5 h-5" />
          </button>
          
          <div class="flex-grow max-w-xl border border-gray-200 rounded-2xl p-6 bg-gray-50 text-center font-mono shadow-sm select-none relative overflow-hidden h-44 flex flex-col justify-between">
            <div class="text-[8px] text-gray-400 tracking-wider font-sans uppercase">{{ t.mockDocPreview }}</div>
            <div class="text-xs font-bold text-gray-700 py-3 uppercase border-y border-dashed border-gray-200">
              {{ activeDocName }}
              <span class="block text-[8px] font-normal text-gray-400 mt-1 uppercase">{{ t.sampleDocDemo }}</span>
            </div>
            <div class="text-[9px] text-green-700 font-bold uppercase tracking-wider font-sans">{{ t.verifiedSystem }}</div>
          </div>

          <button @click="nextDoc" class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition flex-shrink-0">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <div class="flex justify-center gap-1.5 mt-6">
          <button v-for="(doc, idx) in documents" :key="idx" @click="activeDocIndex = idx" class="w-2.5 h-2.5 rounded-full transition" :class="activeDocIndex === idx ? 'bg-[#1E4B35]' : 'bg-gray-200'"></button>
        </div>
      </div>

      <!-- Record Categories -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <FlaskConical class="w-6 h-6 text-[#1E4B35]"/>
          <h4 class="font-bold text-gray-900 text-xs">{{ t.recordLabReport }}</h4>
          <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.lang === 'en' ? 'Sample lab test results for products purity & quality.' : 'Kết quả kiểm nghiệm mẫu cho chất lượng và độ thuần khiết.' }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <ClipboardList class="w-6 h-6 text-[#1E4B35]"/>
          <h4 class="font-bold text-gray-900 text-xs">{{ t.recordBatchRecord }}</h4>
          <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.lang === 'en' ? 'Processing, harvesting, and packing details logs.' : 'Nhật ký chi tiết về thu hoạch, chế biến và đóng gói.' }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <Users class="w-6 h-6 text-[#1E4B35]"/>
          <h4 class="font-bold text-gray-900 text-xs">{{ t.recordProducerProfile }}</h4>
          <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.lang === 'en' ? 'Details about farming locations & community impacts.' : 'Thông tin vị trí trang trại & tác động cộng đồng.' }}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <FileText class="w-6 h-6 text-[#1E4B35]"/>
          <h4 class="font-bold text-gray-900 text-xs">{{ t.recordSupportingRecord }}</h4>
          <p class="text-[10px] text-gray-500 leading-relaxed">{{ appStore.lang === 'en' ? 'Field details reports, harvest logs, and receipts.' : 'Báo cáo chi tiết cánh đồng, nhật ký thu hoạch và biên lai.' }}</p>
        </div>
      </div>

      <!-- View all categories footer link -->
      <div class="text-center mb-12">
        <a href="#" class="text-xs font-bold text-[#1E4B35] hover:underline">{{ appStore.lang === 'en' ? 'View all record types &rarr;' : 'Xem tất cả các loại hồ sơ &rarr;' }}</a>
      </div>

      <!-- Important note and Contact footer bar -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
        <!-- Important note -->
        <div class="md:col-span-7 bg-[#FFFBEB] border border-amber-200 rounded-3xl p-6 shadow-sm space-y-2.5">
          <h4 class="font-bold text-amber-900 text-sm flex items-center gap-1.5"><AlertTriangle class="w-5 h-5 text-amber-500" /> {{ t.importantNoteTitle }}</h4>
          <p class="text-amber-800 text-[11px] leading-relaxed">
            {{ t.importantNoteDesc }}
          </p>
          <a href="#" class="text-[10px] font-bold text-amber-900 hover:underline block pt-1.5">{{ t.learnMoreTerms }}</a>
        </div>

        <!-- Question Support Bar -->
        <div class="md:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full space-y-4">
          <div class="flex gap-3">
            <Leaf class="w-5 h-5 text-[#1E4B35] flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-bold text-gray-900 text-xs">{{ t.questionTitle }}</h4>
              <p class="text-[10px] text-gray-500 leading-normal mt-1">{{ t.questionDesc }}</p>
            </div>
          </div>
          
          <router-link to="/support" class="w-full py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold text-center block transition">
            {{ t.contactSupportTeam }}
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { ChevronRight, Search, RotateCw, ChevronDown, List, Grid, FlaskConical, ClipboardList, Users, FileText, ExternalLink, ShieldCheck, Check, ChevronLeft, AlertTriangle, Leaf } from 'lucide-vue-next'

const appStore = useAppStore()
const activeDocIndex = ref(0)

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    home: 'Trang chủ',
    traceability: 'Truy xuất',
    title: 'Chứng nhận & Báo cáo kiểm nghiệm',
    subtitle: 'Xem các kết quả kiểm nghiệm đã duyệt, nhật ký lô hàng và tài liệu hỗ trợ. Tất cả tài liệu là dữ liệu mẫu phục vụ trình diễn học thuật.',
    searchPlaceholder: 'Tìm kiếm theo từ khóa, mã tài liệu, sản phẩm hoặc nhà sản xuất...',
    clearAll: 'Xóa tất cả',
    labelProduct: 'Sản phẩm',
    labelProducer: 'Nhà sản xuất',
    labelRecordType: 'Loại tài liệu',
    labelRegion: 'Vùng miền',
    labelStatus: 'Trạng thái',
    allProducts: 'Tất cả sản phẩm',
    allProducers: 'Tất cả nhà sản xuất',
    allTypes: 'Tất cả các loại',
    allRegions: 'Tất cả các vùng',
    allStatus: 'Tất cả trạng thái',
    moreFilters: 'Thêm bộ lọc',
    sortBy: 'Sắp xếp theo',
    newestFirst: 'Mới nhất',
    oldestFirst: 'Cũ nhất',
    alphabetical: 'Theo bảng chữ cái',
    showingRecords: 'Hiển thị 4 trên 4 tài liệu',
    recordLabReport: 'Báo cáo kiểm nghiệm',
    recordBatchRecord: 'Nhật ký lô hàng',
    recordProducerProfile: 'Hồ sơ nhà sản xuất',
    recordSupportingRecord: 'Tài liệu hỗ trợ',
    reviewedSample: 'Mẫu đã duyệt',
    previewSample: 'Mẫu xem trước',
    producerLabel: 'Nhà sản xuất: ',
    productLabel: 'Sản phẩm: ',
    testsReviewedLabel: 'Các kiểm nghiệm chính đã duyệt: ',
    previewSampleBtn: 'Xem mẫu',
    viewRecordBtn: 'Xem nhật ký',
    viewProfileBtn: 'Xem hồ sơ',
    dateLabel: 'Ngày',
    archTitle: 'Ý nghĩa của đã kiểm duyệt',
    archDesc1: 'Các hồ sơ được nhãn "Mẫu đã duyệt" đã được kiểm tra trong quy trình thử nghiệm Green Trace.',
    archDesc2: 'Đội ngũ của chúng tôi xác minh rằng các tài liệu đầy đủ và nhất quán với thông tin đã gửi.',
    archCheck1: 'Kiểm tra tính đầy đủ của dữ liệu',
    archCheck2: 'Đối chiếu chéo giữa các hồ sơ',
    archCheck3: 'Không có bảo đảm hoặc chứng nhận chính thức',
    archCheck4: 'Chỉ dành cho trình diễn học thuật',
    helpTitle: 'Cần trợ giúp tìm kiếm tài liệu?',
    helpDesc: 'Đội ngũ hỗ trợ của chúng tôi có thể hướng dẫn bạn duyệt qua kho hồ sơ.',
    contactSupport: 'Liên hệ hỗ trợ',
    visitSupportCenter: 'Tới trung tâm hỗ trợ &rarr;',
    galleryTitle: 'Thư viện xem trước tài liệu',
    galleryLink: 'Xem tất cả mẫu &rarr;',
    mockDocPreview: 'Xem trước tài liệu mẫu',
    sampleDocDemo: 'Tài liệu mẫu — Chỉ phục vụ trình diễn học thuật',
    verifiedSystem: 'Hệ thống Green Trace đã xác thực',
    importantNoteTitle: 'Lưu ý quan trọng',
    importantNoteDesc: 'Tất cả tài liệu trên nền tảng này là các hồ sơ mẫu được cung cấp cho mục đích trình diễn học thuật trong dự án thử nghiệm Green Trace. Chúng không phải là chứng nhận chính thức và không được sử dụng cho các mục đích pháp lý, hành chính hoặc thương mại.',
    learnMoreTerms: 'Tìm hiểu thêm trong Điều khoản sử dụng của chúng tôi &rarr;',
    questionTitle: 'Câu hỏi về hồ sơ hoặc cách kiểm duyệt?',
    questionDesc: 'Chúng tôi sẵn sàng giúp bạn hiểu rõ hơn về quy trình kiểm duyệt và các loại hồ sơ.',
    contactSupportTeam: 'Liên hệ Đội ngũ Hỗ trợ',
    doc1: 'Báo cáo kiểm nghiệm mẫu — Mật ong rừng U Minh',
    doc2: 'Nhật ký lô hàng mẫu — Gạo cao cấp ST25',
    doc3: 'Hồ sơ nhà sản xuất đã kiểm duyệt — Trang trại ong U Minh',
    doc4: 'Tài liệu hỗ trợ mẫu — Bưởi da xanh Bến Tre'
  } : {
    home: 'Home',
    traceability: 'Traceability',
    title: 'Certificates & Lab Reports',
    subtitle: 'Browse reviewed lab results, batch records, and supporting documents. All files are sample records for academic demonstration only.',
    searchPlaceholder: 'Search by keyword, record ID, product, or producer...',
    clearAll: 'Clear all',
    labelProduct: 'Product',
    labelProducer: 'Producer',
    labelRecordType: 'Record Type',
    labelRegion: 'Region',
    labelStatus: 'Status',
    allProducts: 'All Products',
    allProducers: 'All Producers',
    allTypes: 'All Types',
    allRegions: 'All Regions',
    allStatus: 'All Status',
    moreFilters: 'More filters',
    sortBy: 'Sort by',
    newestFirst: 'Newest first',
    oldestFirst: 'Oldest first',
    alphabetical: 'Alphabetical',
    showingRecords: 'Showing 4 of 4 records',
    recordLabReport: 'Lab Report',
    recordBatchRecord: 'Batch Record',
    recordProducerProfile: 'Producer Profile',
    recordSupportingRecord: 'Supporting Record',
    reviewedSample: 'Reviewed Sample',
    previewSample: 'Preview Sample',
    producerLabel: 'Producer: ',
    productLabel: 'Product: ',
    testsReviewedLabel: 'Key tests reviewed: ',
    previewSampleBtn: 'Preview Sample',
    viewRecordBtn: 'View Record',
    viewProfileBtn: 'View Profile',
    dateLabel: 'Date',
    archTitle: 'What reviewed means',
    archDesc1: 'Records labeled as "Reviewed Sample" have been checked within the Green Trace prototype workflow.',
    archDesc2: 'Our team verifies that the documents are complete and consistent with submitted information.',
    archCheck1: 'Data completeness checked',
    archCheck2: 'Cross-checked within the records',
    archCheck3: 'No official guarantee or certification',
    archCheck4: 'For academic demonstration only',
    helpTitle: 'Need help finding a record?',
    helpDesc: 'Our support team can guide you through our record repository.',
    contactSupport: 'Contact Support',
    visitSupportCenter: 'Visit Support Center &rarr;',
    galleryTitle: 'Document Preview Gallery',
    galleryLink: 'View all previews &rarr;',
    mockDocPreview: 'Mock Document Preview',
    sampleDocDemo: 'Sample Document &mdash; Academic Demonstration Only',
    verifiedSystem: 'Green Trace System Verified',
    importantNoteTitle: 'Important Note',
    importantNoteDesc: 'All documents on this platform are sample records provided for academic demonstration within the Green Trace prototype. They are not official certificates and must not be used for regulatory, legal, or commercial certification purposes.',
    learnMoreTerms: 'Learn more in our Terms of Use &rarr;',
    questionTitle: 'Questions about records or how they\'re reviewed?',
    questionDesc: 'We\'re here to help you understand our review process and record types.',
    contactSupportTeam: 'Contact Support Team',
    doc1: 'Sample Lab Report — U Minh Forest Wild Honey',
    doc2: 'Sample Batch Record — ST25 Premium Rice',
    doc3: 'Reviewed Producer Profile — U Minh Bee Farm',
    doc4: 'Sample Supporting Record — Ben Tre Green Pomelo'
  }
})

const documents = computed(() => [
  t.value.doc1,
  t.value.doc2,
  t.value.doc3,
  t.value.doc4
])

const activeDocName = computed(() => documents.value[activeDocIndex.value])

const prevDoc = () => {
  if (activeDocIndex.value > 0) {
    activeDocIndex.value--
  } else {
    activeDocIndex.value = documents.value.length - 1
  }
}

const nextDoc = () => {
  if (activeDocIndex.value < documents.value.length - 1) {
    activeDocIndex.value++
  } else {
    activeDocIndex.value = 0
  }
}

const openPreview = (type) => {
  appStore.triggerToast(`Opening modal preview for ${type} sample file...`)
}

const openGallery = () => {
  appStore.triggerToast('Opening all mock previews list...')
}
</script>
