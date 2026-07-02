<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center py-12 lg:py-20 gap-8">
        <div class="w-full md:w-1/2">
          <h1 class="text-4xl lg:text-5xl font-bold text-[#1E4B35] mb-4 leading-tight">{{ t.title }}</h1>
          <p class="text-gray-700 text-lg max-w-lg leading-relaxed">
            {{ t.desc }}
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-end">
          <div class="w-full max-w-md h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
            <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1783002817/734755797_1325279163146746_2847268805525389078_n_c8tlf4.png" alt="Meet Reviewed Producers" class="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl mt-8">
      <!-- Filter Bar -->
      <div class="flex flex-wrap gap-3 mb-6">
        <div class="flex-grow relative min-w-[220px]">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" :placeholder="t.searchPlaceholder" class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E4B35] text-sm" />
        </div>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[160px] flex items-center gap-1">
          <option>{{ t.regionAll }}</option>
          <option>{{ appStore.lang === 'vi' ? 'Bến Tre' : 'Ben Tre' }}</option>
          <option>{{ appStore.lang === 'vi' ? 'Sóc Trăng' : 'Soc Trang' }}</option>
          <option>{{ appStore.lang === 'vi' ? 'Cà Mau' : 'Ca Mau' }}</option>
          <option>{{ appStore.lang === 'vi' ? 'Lâm Đồng' : 'Lam Dong' }}</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[160px]">
          <option>{{ t.productAll }}</option>
          <option>{{ appStore.t('honeyCat') }}</option>
          <option>{{ appStore.t('riceGrainsCat') }}</option>
          <option>{{ appStore.t('fruitsCat') }}</option>
          <option>{{ appStore.t('vegetablesCat') }}</option>
          <option>{{ appStore.lang === 'vi' ? 'Trà' : 'Tea' }}</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[180px]">
          <option>{{ t.recordsAll }}</option>
          <option>{{ t.recordsLab }}</option>
          <option>{{ t.recordsCert }}</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[160px]">
          <option>{{ t.featuredAll }}</option>
          <option>{{ t.featured }}</option>
          <option>{{ t.verified }}</option>
        </select>
      </div>

      <!-- Results Header with Sort & View Toggle -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm font-medium text-gray-700">{{ t.producersFound.replace('{count}', producers.length) }}</p>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ t.sortBy }}</span>
            <select class="border-none font-semibold bg-transparent focus:ring-0 text-sm py-0 pl-1 text-gray-900 focus:outline-none">
              <option>{{ t.sortFeatured }}</option>
              <option>{{ t.sortName }}</option>
              <option>{{ t.sortBatches }}</option>
            </select>
          </div>
          <div class="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button class="p-1.5 bg-white shadow-sm rounded-md text-gray-800"><LayoutGrid class="w-4 h-4" /></button>
            <button class="p-1.5 text-gray-500 hover:text-gray-800 rounded-md"><List class="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <!-- Producers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div v-for="producer in producers" :key="producer.id" class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition flex flex-col h-full group">
          <div class="relative h-48 bg-gray-100 overflow-hidden">
            <img v-if="producer.image" :src="producer.image" :alt="producer.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <Image v-else class="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div v-if="producer.featured" class="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-bold text-[#1E4B35] flex items-center gap-1">
              <Star class="w-3.5 h-3.5 fill-current" /> {{ t.featuredBadge }}
            </div>
            <div v-if="producer.verified && !producer.featured" class="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-bold text-green-700 flex items-center gap-1">
              <CheckCircle2 class="w-3.5 h-3.5 text-green-500" /> {{ t.verifiedBadge }}
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ producer.name }}</h3>
            <div class="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
              <MapPin class="w-4 h-4" /> {{ appStore.localizeAddress(producer.location) }}
            </div>
            <p class="text-sm text-gray-600 mb-5 flex-grow line-clamp-3 leading-relaxed">{{ producer.desc }}</p>

            <div class="space-y-2 mb-5">
              <div>
                <p class="text-xs font-semibold text-[#1E4B35] mb-1">{{ t.sampleProducts }}</p>
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <Package class="w-4 h-4 text-gray-400" /> {{ producer.products }}
                </div>
              </div>
              <div>
                <p class="text-xs font-semibold text-[#1E4B35] mb-1">{{ t.sampleBatches }}</p>
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <FileText class="w-4 h-4 text-gray-400" /> {{ producer.batches }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mt-auto">
              <router-link :to="`/producer/${producer.id}`" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                {{ t.viewProfile }}
              </router-link>
              <router-link to="/products" class="py-2.5 rounded-lg bg-[#1E4B35] text-white text-center text-sm font-bold hover:bg-[#163a29] transition shadow-md shadow-[#1E4B35]/20">
                {{ t.shopProducts }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- More producers note -->
      <div class="text-center mb-16">
        <p class="text-sm text-green-700 font-medium bg-green-50 py-3 px-6 rounded-full inline-flex items-center gap-2">
          <Leaf class="w-4 h-4"/> {{ t.moreProducers }} <span class="text-gray-500 font-normal">{{ t.checkBack }}</span>
        </p>
      </div>

      <!-- Why work with local producers -->
      <div class="bg-gray-50 rounded-2xl p-10 mb-16">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-10">{{ t.whyTitle }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.why1Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.why1Desc }}</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <ShieldCheck class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.why2Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.why2Desc }}</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Users class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.why3Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.why3Desc }}</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Leaf class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.why4Title }}</h4>
            <p class="text-sm text-gray-600">{{ t.why4Desc }}</p>
          </div>
        </div>
      </div>

      <!-- Producer Story Banner -->
      <div class="flex flex-col md:flex-row gap-8 items-center mb-16 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div class="w-full md:w-2/5 h-64 md:h-80 bg-gray-200 relative overflow-hidden">
          <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1783003478/734555016_1342639110533602_5621359612570324386_n_caocha.png" alt="Producer Story" class="w-full h-full object-cover" />
        </div>
        <div class="flex-grow p-8 md:p-10">
          <p class="text-xs font-bold text-[#1E4B35] uppercase tracking-widest mb-3">{{ t.storyTag }}</p>
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{{ t.storyTitle }}</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            {{ t.storyDesc }}
          </p>
          <button class="bg-[#1E4B35] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#163a29] transition shadow-md shadow-[#1E4B35]/20">
            {{ t.readStories }}
          </button>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">{{ t.faqTitle }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="flex flex-col">
            <button @click="toggleFaq(0)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">{{ t.faq1Q }}</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 0 }" />
            </button>
            <div v-show="activeFaq === 0" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              {{ t.faq1A }}
            </div>
          </div>
          
          <div class="flex flex-col">
            <button @click="toggleFaq(1)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">{{ t.faq2Q }}</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 1 }" />
            </button>
            <div v-show="activeFaq === 1" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              {{ t.faq2A }}
            </div>
          </div>

          <div class="flex flex-col">
            <button @click="toggleFaq(2)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">{{ t.faq3Q }}</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 2 }" />
            </button>
            <div v-show="activeFaq === 2" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              {{ t.faq3A }}
            </div>
          </div>

          <div class="flex flex-col">
            <button @click="toggleFaq(3)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">{{ t.faq4Q }}</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 3 }" />
            </button>
            <div v-show="activeFaq === 3" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              {{ t.faq4A }}
            </div>
          </div>
        </div>

        <!-- Contact bar -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-6 border border-gray-100 rounded-xl bg-gray-50">
          <div class="flex items-center gap-3 text-gray-700">
            <Mail class="w-5 h-5 text-[#1E4B35]" />
            <span class="text-sm font-medium">{{ t.contactTeam }}</span>
          </div>
          <div class="flex items-center gap-3 text-gray-700">
            <Phone class="w-5 h-5 text-[#1E4B35]" />
            <span class="text-sm font-medium">+84 123 456 789</span>
          </div>
          <div class="flex items-center gap-3 text-gray-700">
            <Clock class="w-5 h-5 text-[#1E4B35]" />
            <span class="text-sm font-medium">{{ t.workHours }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { Image, Search, Star, CheckCircle2, MapPin, Package, FileText, Leaf, LayoutGrid, List, ShieldCheck, Users, Mail, Phone, Clock, ChevronDown } from 'lucide-vue-next'

const appStore = useAppStore()
const activeFaq = ref(null)
const producers = ref([])

function toggleFaq(index) {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
}

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    title: 'Gặp gỡ các nhà sản xuất đã kiểm duyệt',
    desc: 'Chúng tôi làm việc trực tiếp với nông dân và hợp tác xã địa phương tuân thủ thực hành nông nghiệp tốt. Mỗi nhà sản xuất đều được xác minh, mỗi lô hàng đều có thể truy xuất. Hãy cùng tìm hiểu những người đứng sau sản phẩm của bạn.',
    searchPlaceholder: 'Tìm kiếm nhà sản xuất, vùng miền, hoặc sản phẩm...',
    regionAll: 'Vùng miền: Tất cả',
    productAll: 'Loại sản phẩm: Tất cả',
    recordsAll: 'Tài liệu hỗ trợ: Tất cả',
    recordsLab: 'Có báo cáo kiểm nghiệm',
    recordsCert: 'Có chứng nhận',
    featuredAll: 'Trạng thái nổi bật: Tất cả',
    featured: 'Nổi bật',
    verified: 'Đã xác minh',
    producersFound: 'Tìm thấy {count} nhà sản xuất',
    sortBy: 'Sắp xếp theo:',
    sortFeatured: 'Nổi bật',
    sortName: 'Tên',
    sortBatches: 'Lô hàng',
    featuredBadge: 'Nổi bật',
    verifiedBadge: 'Đã xác minh',
    sampleProducts: 'Sản phẩm mẫu',
    sampleBatches: 'Lô hàng mẫu',
    viewProfile: 'Xem hồ sơ',
    shopProducts: 'Mua sản phẩm',
    moreProducers: 'Thêm nhà sản xuất sẽ sớm ra mắt.',
    checkBack: 'Hãy quay lại thường xuyên!',
    whyTitle: 'Tại sao nên hợp tác với nhà sản xuất địa phương',
    why1Title: 'Đã xác minh & Kiểm duyệt',
    why1Desc: 'Tất cả nhà sản xuất đều được đội ngũ của chúng tôi xác minh và kiểm duyệt định kỳ.',
    why2Title: 'Truy xuất & Minh bạch',
    why2Desc: 'Mỗi lô hàng đều có thể truy xuất nguồn gốc với nguồn gốc và hồ sơ rõ ràng.',
    why3Title: 'Cộng đồng vững mạnh',
    why3Desc: 'Mua hàng của bạn giúp hỗ trợ sinh kế địa phương và mức lương công bằng.',
    why4Title: 'Tốt hơn cho hành tinh',
    why4Desc: 'Khuyến khích canh tác bền vững và giảm thiểu lượng khí thải.',
    storyTag: 'CÂU CHUYỆN NHÀ SẢN XUẤT',
    storyTitle: 'Cùng nhau phát triển vì một tương lai tốt đẹp hơn',
    storyDesc: 'Green Trace kết nối các nhà sản xuất tâm huyết với những khách hàng có ý thức. Cùng nhau, chúng ta xây dựng một hệ thống thực phẩm lành mạnh, công bằng và bền vững.',
    readStories: 'Đọc câu chuyện của chúng tôi',
    faqTitle: 'Câu hỏi thường gặp? Chúng tôi sẵn sàng trợ giúp.',
    faq1Q: 'Nhà sản xuất được xác minh như thế nào?',
    faq1A: 'Chúng tôi đến thăm thực địa từng nhà sản xuất, xác minh thực hành môi trường và kiểm tra hồ sơ của họ để đảm bảo tuân thủ các tiêu chuẩn của chúng tôi.',
    faq2Q: 'Yêu cầu những hồ sơ nào?',
    faq2A: 'Nhà sản xuất phải nộp nhật ký thu hoạch, nhật ký chiết xuất lô hàng, kết quả kiểm nghiệm phòng thí nghiệm và nhật ký đảm bảo chất lượng để hoàn thiện hồ sơ truy xuất nguồn gốc.',
    faq3Q: 'Tần suất kiểm duyệt là bao lâu?',
    faq3A: 'Các nhà sản xuất trải qua kiểm duyệt ít nhất một lần vào mỗi mùa thu hoạch, cùng với các đợt kiểm tra đột xuất ngẫu nhiên các lô sản phẩm mẫu.',
    faq4Q: 'Tôi có thể đến thăm trang trại không?',
    faq4A: 'Có, nhiều đối tác của chúng tôi cung cấp các tour du lịch sinh thái và trải nghiệm nông nghiệp. Hãy xem hồ sơ cá nhân của họ để biết giờ đón khách và hướng dẫn.',
    contactTeam: 'Liên hệ đội ngũ hỗ trợ',
    workHours: 'Thứ 2 – Thứ 6, 8:00 – 17:00 (GMT+7)'
  } : {
    title: 'Meet Reviewed Producers',
    desc: 'We work directly with local farmers and cooperatives who follow good agricultural practices. Every producer is verified, every batch is traceable. Get to know the people behind your food.',
    searchPlaceholder: 'Search producers, regions, or products...',
    regionAll: 'Region: All Regions',
    productAll: 'Product Type: All Types',
    recordsAll: 'Supporting Records: All',
    recordsLab: 'With Lab Reports',
    recordsCert: 'With Certificates',
    featuredAll: 'Featured Status: All',
    featured: 'Featured',
    verified: 'Verified',
    producersFound: '{count} producers found',
    sortBy: 'Sort by:',
    sortFeatured: 'Featured',
    sortName: 'Name',
    sortBatches: 'Batches',
    featuredBadge: 'Featured',
    verifiedBadge: 'Verified',
    sampleProducts: 'Sample Products',
    sampleBatches: 'Sample Batches',
    viewProfile: 'View Profile',
    shopProducts: 'Shop Products',
    moreProducers: 'More producers coming soon.',
    checkBack: 'Check back regularly!',
    whyTitle: 'Why work with local producers',
    why1Title: 'Verified & Reviewed',
    why1Desc: 'All producers are verified and regularly reviewed by our team.',
    why2Title: 'Traceable & Transparent',
    why2Desc: 'Every batch is traceable with clear origin and records.',
    why3Title: 'Stronger Communities',
    why3Desc: 'Your purchases help support local livelihoods and fair wages.',
    why4Title: 'Better for the Planet',
    why4Desc: 'Encouraging sustainable farming and lower emissions.',
    storyTag: 'PRODUCER STORY',
    storyTitle: 'Growing together, for a better future',
    storyDesc: 'Green Trace connects dedicated producers with conscious customers. Together, we build a food system that is healthy, fair, and sustainable.',
    readStories: 'Read Our Stories',
    faqTitle: 'Questions? We\'re here to help.',
    faq1Q: 'How are producers verified?',
    faq1A: 'We visit each producer physically, verify their environmental practices, and audit their records to ensure compliance with our standards.',
    faq2Q: 'What records are required?',
    faq2A: 'Producers must submit harvest logs, batch extraction logs, laboratory test sheets, and quality assurance logs to complete traceability records.',
    faq3Q: 'How often are reviewed?',
    faq3A: 'Producers undergo reviews at least once every harvest season, along with periodic spot checks of randomly sampled product batches.',
    faq4Q: 'Can I visit a farm?',
    faq4A: 'Yes, many of our partners offer eco-tours and agricultural experiences. Check their individual profiles for visiting hours and instructions.',
    contactTeam: 'Contact our support team',
    workHours: 'Mon – Fri, 8:00 – 17:00 (GMT+7)'
  }
})

const staticProducers = computed(() => {
  const isVi = appStore.lang === 'vi'
  return [
    {
      id: 1,
      name: isVi ? 'Yên Nhi Farm' : 'Yen Nhi Farm',
      location: isVi ? 'Ninh Thuận, Việt Nam' : 'Ninh Thuan, Vietnam',
      desc: isVi ? 'Chuyên cung cấp nho xanh, nho đỏ, táo xanh, măng tây và các đặc sản vùng biển từ tỉnh Ninh Thuận.' : 'Specializing in grapes, jujubes, asparagus and coastal delicacies from Ninh Thuan province.',
      products: isVi ? 'Nho xanh, Nho đỏ, Táo xanh, Măng tây, Tỏi, Mật ong, Mực lá' : 'Green Grapes, Red Grapes, Green Jujubes, Asparagus, Garlic, Wildflower Honey, Fresh Squid',
      batches: 12,
      featured: true,
      image: 'https://images.unsplash.com/photo-1530079037460-5de57d8bfc0e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: isVi ? 'Ngọc Hiếu Farm' : 'Ngoc Hieu Farm',
      location: isVi ? 'Bà Rịa–Vũng Tàu, Việt Nam' : 'Ba Ria - Vung Tau, Vietnam',
      desc: isVi ? 'Được trồng trên đất ven biển, chuyên cung cấp bưởi da xanh, ổi hồng, dưa lưới nhà màng, hải sản tươi và các loại thịt hữu cơ.' : 'Grown in coastal soils, offering premium pomelo, guava, greenhouse melon, fresh seafood, and organic meats.',
      products: isVi ? 'Bưởi da xanh, Ổi hồng, Dưa lưới, Tiêu đen, Hàu sữa, Tôm sú' : 'Green-Skin Pomelo, Pink Guava, Greenhouse Melon, Black Pepper, Fresh Oysters, Tiger Prawns',
      batches: 12,
      verified: true,
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      name: isVi ? 'Cẩm Nhung Farm' : 'Cam Nhung Farm',
      location: isVi ? 'Trà Vinh, Việt Nam' : 'Tra Vinh, Vietnam',
      desc: isVi ? 'Dừa sáp, dừa xiêm, khoai lang mật Trà Vinh, gạo thơm ST24 và các nguyên liệu đặc sản Khmer.' : 'Wax coconut, young coconut, Tra Vinh sweet potatoes, ST24 fragrant rice and specialty Khmer ingredients.',
      products: isVi ? 'Dừa sáp, Dừa xiêm, Mật hoa dừa, Khoai lang mật, Gạo ST24, Tôm khô' : 'Wax Coconut, Young Coconut, Coconut Blossom Nectar, Sweet Potatoes, ST24 Rice, Dried Shrimp',
      batches: 12,
      featured: true,
      image: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 4,
      name: isVi ? 'Bích Tuyền Farm' : 'Bich Tuyen Farm',
      location: isVi ? 'Tiền Giang, Việt Nam' : 'Tien Giang, Vietnam',
      desc: isVi ? 'Trái cây nhiệt đới nổi tiếng của Đồng bằng sông Cửu Long bao gồm xoài cát Hòa Lộc, sầu riêng Ri6 và vú sữa.' : 'Famous tropical fruits of Mekong Delta including Hoa Loc mango, Ri6 durian, and star apples.',
      products: isVi ? 'Xoài cát Hòa Lộc, Sầu riêng Ri6, Vú sữa Lò Rèn, Khóm Tân Phước' : 'Hoa Loc Mangoes, Ri6 Durian, Lo Ren Star Apples, Tan Phuoc Pineapple',
      batches: 12,
      verified: true,
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 5,
      name: isVi ? 'Thủy Hạnh Farm' : 'Thuy Hanh Farm',
      location: isVi ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam',
      desc: isVi ? 'Rau thủy canh đô thị và thực phẩm tươi hằng ngày dành cho gia đình thành thị.' : 'Urban hydroponic greens and fresh everyday food for city households.',
      products: isVi ? 'Xà lách Butterhead, Cải bó xôi non, Cải kale tươi, Rau mầm tổng hợp, Trứng gà farm' : 'Butterhead Lettuce, Baby Spinach, Fresh Kale, Mixed Microgreens, Fresh Farm Eggs',
      batches: 10,
      verified: true,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400'
    }
  ]
})

onMounted(async () => {
  try {
    const list = await appStore.fetchProducers()
    if (list && list.length > 0) {
      producers.value = list.map(p => {
        const staticP = staticProducers.value.find(sp => sp.id === p.id)
        const details = p.details || {}
        
        const name = (appStore.lang === 'en' && details.farm_name_en) ? details.farm_name_en : ((appStore.lang === 'vi' && details.farm_name_vi) ? details.farm_name_vi : (staticP ? staticP.name : p.name))
        const location = (appStore.lang === 'en' && details.location_en) ? details.location_en : ((appStore.lang === 'vi' && details.location_vi) ? details.location_vi : (staticP ? staticP.location : p.location))
        const desc = (appStore.lang === 'en' && details.hero_desc_en) ? details.hero_desc_en : ((appStore.lang === 'vi' && details.hero_desc_vi) ? details.hero_desc_vi : (staticP ? staticP.desc : p.description))
        
        return {
          id: p.id,
          name,
          location,
          desc,
          products: staticP ? staticP.products : (appStore.lang === 'vi' ? 'Mật ong, Ngũ cốc, Trà' : 'Honey, Grains, Tea'),
          batches: staticP ? staticP.batches : 5,
          featured: p.id % 2 === 1,
          verified: true,
          image: p.image_url || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400'
        }
      })
    } else {
      producers.value = staticProducers.value
    }
  } catch (err) {
    console.error('Error fetching producers:', err)
    producers.value = staticProducers.value
  }
})
</script>
