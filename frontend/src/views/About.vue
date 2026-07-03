<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gray-50 border-b border-gray-100">
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center py-12 lg:py-20 gap-8">
        <div class="w-full md:w-1/2">
          <h1 class="text-4xl lg:text-5xl font-bold text-[#1E4B35] mb-4 leading-tight">{{ t.heroTitle }}</h1>
          <p class="text-gray-700 text-lg max-w-lg leading-relaxed">
            {{ t.heroSubtitle }}
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-end">
          <div class="w-full max-w-md h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" alt="Farmer in green field" class="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl mt-12">
      <!-- Intro with Logo details -->
      <div class="flex flex-col lg:flex-row gap-8 items-center bg-gray-50 border border-gray-100 p-8 rounded-2xl mb-16">
        <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <Leaf class="w-10 h-10 text-[#1E4B35]" />
        </div>
        <div class="space-y-3">
          <p class="text-gray-700 leading-relaxed font-medium">
            {{ t.intro1 }}
          </p>
          <p class="text-gray-600 leading-relaxed text-sm">
            {{ t.intro2 }}
          </p>
        </div>
      </div>

      <!-- Mission, Vision, Core Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <!-- Our Mission -->
        <div class="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Target class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <h3 class="font-bold text-gray-900 text-lg mb-3">{{ t.missionTitle }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed flex-grow">
            {{ t.missionDesc }}
          </p>
        </div>

        <!-- Our Vision -->
        <div class="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Eye class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <h3 class="font-bold text-gray-900 text-lg mb-3">{{ t.visionTitle }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed flex-grow">
            {{ t.visionDesc }}
          </p>
        </div>

        <!-- Our Core Values -->
        <div class="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Heart class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <h3 class="font-bold text-gray-900 text-lg mb-4">{{ t.valuesTitle }}</h3>
          <ul class="space-y-3 flex-grow">
            <li class="border-l-4 border-[#1E4B35] pl-3">
              <div class="font-bold text-gray-900 text-sm">Transparency &amp; Accountability</div>
              <div class="text-xs text-gray-500">Minh bạch &amp; Trách nhiệm giải trình</div>
            </li>
            <li class="border-l-4 border-[#1E4B35] pl-3">
              <div class="font-bold text-gray-900 text-sm">Safety</div>
              <div class="text-xs text-gray-500">An toàn</div>
            </li>
            <li class="border-l-4 border-[#1E4B35] pl-3">
              <div class="font-bold text-gray-900 text-sm">Sustainability</div>
              <div class="text-xs text-gray-500">Bền vững</div>
            </li>
            <li class="border-l-4 border-[#1E4B35] pl-3">
              <div class="font-bold text-gray-900 text-sm">Innovation</div>
              <div class="text-xs text-gray-500">Đổi mới</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Why Green Trace exists -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ t.existsTitle }}</h2>
          <p class="text-sm text-gray-600 mb-6 leading-relaxed">
            {{ t.existsDesc }}
          </p>
          <div class="space-y-4">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">{{ t.gapsTitle }}</p>
            <ul class="space-y-2.5 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>{{ t.gap1 }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>{{ t.gap2 }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>{{ t.gap3 }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>{{ t.gap4 }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>{{ t.gap5 }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Flowchart container -->
        <div class="bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div class="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center w-36">
            <HelpCircle class="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <h4 class="font-bold text-gray-900 text-xs">{{ t.flowTooLittle }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ t.flowInfo }}</p>
          </div>
          
          <ArrowRight class="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
          
          <div class="w-24 h-24 rounded-full bg-green-100 border border-green-200 flex flex-col items-center justify-center text-center shadow-inner">
            <Leaf class="w-6 h-6 text-[#1E4B35] mb-1" />
            <span class="text-[10px] font-bold text-[#1E4B35] leading-tight" style="white-space: pre-line;">{{ t.flowGap }}</span>
          </div>

          <ArrowRight class="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />

          <div class="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center w-36">
            <UserX class="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <h4 class="font-bold text-gray-900 text-xs">{{ t.flowHardChoice }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ t.flowLowTrust }}</p>
          </div>
        </div>
      </div>

      <!-- How the model works -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-10">{{ t.worksTitle }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
          <!-- Stepper lines -->
          <div class="hidden md:block absolute top-7 left-[15%] right-[15%] border-t-2 border-dashed border-gray-200 -z-10"></div>

          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm">
              <User class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">{{ t.step1Title }}</h4>
            <p class="text-xs text-gray-500 px-4 leading-relaxed">
              {{ t.step1Desc }}
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm">
              <ShieldCheck class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">{{ t.step2Title }}</h4>
            <p class="text-xs text-gray-500 px-4 leading-relaxed">
              {{ t.step2Desc }}
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm">
              <Users class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">{{ t.step3Title }}</h4>
            <p class="text-xs text-gray-500 px-4 leading-relaxed">
              {{ t.step3Desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Trust Architecture -->
      <div class="border border-gray-200 rounded-3xl p-8 mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ t.archTitle }}</h2>
        <p class="text-sm text-gray-500 mb-8">{{ t.archSubtitle }}</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <User class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">1</span>
              <span class="text-xs font-bold text-gray-900">{{ t.arch1 }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">{{ t.arch1Desc }}</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <ClipboardList class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <span class="text-xs font-bold text-gray-900">{{ t.arch2 }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">{{ t.arch2Desc }}</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <FileText class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">3</span>
              <span class="text-xs font-bold text-gray-900">{{ t.arch3 }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">{{ t.arch3Desc }}</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <FlaskConical class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">4</span>
              <span class="text-xs font-bold text-gray-900">{{ t.arch4 }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">{{ t.arch4Desc }}</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <Lock class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">5</span>
              <span class="text-xs font-bold text-gray-900">{{ t.arch5 }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">{{ t.arch5Desc }}</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <Bell class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">6</span>
              <span class="text-xs font-bold text-gray-900">{{ t.arch6 }}</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">{{ t.arch6Desc }}</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-3 rounded-xl border border-gray-100">
          <Lock class="w-4 h-4 text-green-600" />
          <span>{{ t.integrityText }}</span>
        </div>
      </div>

      <!-- What reviewed means explanation box -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-gray-50 border border-gray-200 p-8 rounded-2xl mb-16">
        <div class="lg:col-span-2">
          <h3 class="font-bold text-gray-900 text-lg mb-2">{{ t.reviewedTitle }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ t.reviewedDesc }}
          </p>
        </div>
        <div class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <ShieldCheck class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-xs">{{ t.reviewedBadge }}</h4>
            <p class="text-[10px] text-gray-500 mt-0.5">{{ t.reviewedBadgeSub }}</p>
          </div>
        </div>
      </div>

      <!-- Pilot Scope (2026) -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">{{ t.scopeTitle }}</h2>
        <p class="text-sm text-gray-500 text-center mb-10">{{ t.scopeSubtitle }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <ShoppingBag class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-3xl font-extrabold text-[#1E4B35]">{{ t.scopeProdVal }}</span>
                <span class="text-xs font-bold text-gray-900">{{ t.scopeProdLbl }}</span>
              </div>
              <p class="text-[11px] text-gray-500 mt-1">{{ t.scopeProdDesc }}</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <User class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-3xl font-extrabold text-[#1E4B35]">{{ t.scopeProducerVal }}</span>
                <span class="text-xs font-bold text-gray-900">{{ t.scopeProducerLbl }}</span>
              </div>
              <p class="text-[11px] text-gray-500 mt-1">{{ t.scopeProducerDesc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Designed for -->
      <div class="mb-16 bg-gray-50 rounded-2xl p-10">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-10 font-sans">{{ t.designTitle }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Users class="w-6 h-6 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.designConsumers }}</h4>
            <p class="text-xs text-gray-600 leading-relaxed px-4">
              {{ t.designConsumersDesc }}
            </p>
          </div>
          
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Leaf class="w-6 h-6 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.designProducers }}</h4>
            <p class="text-xs text-gray-600 leading-relaxed px-4">
              {{ t.designProducersDesc }}
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <GraduationCap class="w-6 h-6 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">{{ t.designAcademic }}</h4>
            <p class="text-xs text-gray-600 leading-relaxed px-4">
              {{ t.designAcademicDesc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quote banner -->
      <div class="relative rounded-3xl overflow-hidden shadow-lg h-80 flex items-center justify-center">
        <!-- Background Image overlay -->
        <div class="absolute inset-0 bg-[#0B3B24]/90 z-10"></div>
        <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800" alt="Farmer background" class="absolute inset-0 w-full h-full object-cover object-center" />
        
        <div class="relative z-20 text-center px-6 max-w-2xl flex flex-col items-center">
          <p class="text-white text-base lg:text-lg font-medium italic mb-6 leading-relaxed">
            {{ t.quoteText }}
          </p>
          <!-- Carousel indicators -->
          <div class="flex gap-2">
            <span class="w-2 h-2 rounded-full bg-white"></span>
            <span class="w-2 h-2 rounded-full bg-white/40"></span>
            <span class="w-2 h-2 rounded-full bg-white/40"></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { Leaf, Target, Eye, Heart, CheckCircle2, Check, ArrowRight, HelpCircle, UserX, User, ShieldCheck, Users, ClipboardList, FileText, FlaskConical, Lock, Bell, ShoppingBag, GraduationCap } from 'lucide-vue-next'

const appStore = useAppStore()

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    heroTitle: 'Về Green Trace',
    heroSubtitle: 'Kết nối bạn với thông tin sản phẩm minh bạch, có thể kiểm duyệt.',
    intro1: 'Green Trace là một mô hình thử nghiệm học thuật nhằm trình diễn cách thức thu thập, kiểm duyệt và trình bày dữ liệu nông nghiệp đã xác thực, giúp người tiêu dùng đưa ra quyết định mua sắm rõ ràng hơn.',
    intro2: 'Chúng tôi làm việc với các nhà sản xuất mẫu và dữ liệu mô phỏng để minh họa một mô hình thực tế cho sự minh bạch—dễ hiểu, dễ xác minh, đồng thời được xây dựng để học hỏi và cải tiến không ngừng.',
    missionTitle: 'Sứ mệnh',
    missionDesc: 'Sứ mệnh của Green Trace là làm cho thương mại thực phẩm hữu cơ trở nên minh bạch và có trách nhiệm hơn bằng cách kết nối các đối tác nhà cung cấp đủ tiêu chuẩn với người tiêu dùng thông qua thông tin truy xuất nguồn gốc có cấu trúc, giao dịch kỹ thuật số dễ tiếp cận và dịch vụ hoàn thiện của bên thứ ba.',
    visionTitle: 'Tầm nhìn',
    visionDesc: 'Green Trace hướng đến trở thành một chợ kỹ thuật số đáng tin cậy cho thực phẩm hữu cơ có thể truy xuất nguồn gốc tại Việt Nam và phát triển một mô hình có thể mở rộng để sau này áp dụng cho các thị trường Đông Nam Á được lựa chọn sau khi thiết lập nền tảng trong nước khả thi.',
    valuesTitle: 'Giá trị cốt lõi (TSSI)',
    val1: 'Minh bạch hơn giả định',
    val2: 'Bằng chứng hơn tuyên bố',
    val3: 'Công bằng cho nhà sản xuất và người tiêu dùng',
    val4: 'Học hỏi và cải tiến liên tục',
    val5: 'Tôn trọng con người và thiên nhiên',
    existsTitle: 'Tại sao Green Trace tồn tại',
    existsDesc: 'Nông sản trực tuyến thường đi kèm với thông tin hạn chế. Chỉ hình ảnh và mô tả là không đủ cho những lựa chọn quan trọng.',
    gapsTitle: 'KHOẢNG TRỐNG THÔNG TIN CHÍNH:',
    gap1: 'Nguồn gốc và phương thức canh tác không rõ ràng',
    gap2: 'Giới hạn bằng chứng về an toàn và chất lượng',
    gap3: 'Khó xác minh thông tin thực tế',
    gap4: 'Không có cách nào dễ dàng để theo dõi lịch sử sản phẩm',
    gap5: 'Khó khăn khi xử lý nếu có sự cố xảy ra',
    flowTooLittle: 'Quá ít',
    flowInfo: 'thông tin',
    flowGap: 'Khoảng trống\nthông tin',
    flowHardChoice: 'Khó lựa chọn,',
    flowLowTrust: 'giảm lòng tin',
    worksTitle: 'Mô hình hoạt động như thế nào',
    step1Title: 'Nhà sản xuất',
    step1Desc: 'Cung cấp dữ liệu về canh tác và sản phẩm, tải lên bằng chứng và tạo nhật ký lô hàng.',
    step2Title: 'Đội ngũ Green Trace',
    step2Desc: 'Kiểm duyệt thông tin, xác minh bằng chứng hỗ trợ và ghi nhận kết quả.',
    step3Title: 'Khách hàng',
    step3Desc: 'Xem thông tin đã kiểm duyệt, truy xuất lịch sử và tự tin đưa ra lựa chọn.',
    archTitle: 'Kiến trúc Niềm tin',
    archSubtitle: 'Mỗi trang sản phẩm được hỗ trợ bởi một tập dữ liệu minh bạch và các bước kiểm duyệt rõ ràng.',
    arch1: 'Kiểm duyệt Hồ sơ',
    arch1Desc: 'Xác minh danh tính, địa điểm và phương thức canh tác của nhà sản xuất.',
    arch2: 'Nhật ký Lô hàng',
    arch2Desc: 'Ghi nhận chi tiết lô hàng: thu hoạch, sản lượng, vị trí, v.v.',
    arch3: 'Chứng nhận',
    arch3Desc: 'Thu thập và xác thực các chứng nhận và tài liệu.',
    arch4: 'Kiểm nghiệm',
    arch4Desc: 'Xem xét và đính kèm các kiểm nghiệm chất lượng và an toàn.',
    arch5: 'Blockchain',
    arch5Desc: 'Băm và gắn nhãn thời gian cho tất cả các bản ghi trên blockchain.',
    arch6: 'Quy trình Thu hồi',
    arch6Desc: 'Kích hoạt các bước thu hồi và thông báo cho người dùng nếu phát hiện sự cố.',
    integrityText: 'Tính toàn vẹn dữ liệu được đảm bảo bằng mã hóa hash và tham chiếu mốc thời gian bất biến.',
    reviewedTitle: 'Ý nghĩa của "Đã kiểm duyệt"',
    reviewedDesc: '"Đã kiểm duyệt" trên Green Trace có nghĩa là đội ngũ của chúng tôi đã kiểm tra thông tin và bằng chứng dựa trên tiêu chuẩn kiểm duyệt của mình. Nó không có nghĩa là sản phẩm đã được chính phủ cấp phép hay phê duyệt chính thức.',
    reviewedBadge: 'Đã kiểm duyệt',
    reviewedBadgeSub: 'Không phải chứng nhận của CP',
    scopeTitle: 'Quy mô thử nghiệm (2026)',
    scopeSubtitle: 'Trình diễn học thuật với phạm vi giới hạn và dữ liệu mô phỏng.',
    scopeProdVal: '50+',
    scopeProdLbl: 'Sản phẩm mẫu',
    scopeProdDesc: 'Nhiều danh mục với các mặt hàng đại diện.',
    scopeProducerVal: '5+',
    scopeProducerLbl: 'Nhà sản xuất mẫu',
    scopeProducerDesc: 'Hồ sơ nhà sản xuất mẫu đã xác minh.',
    scopeBatchVal: '12',
    scopeBatchLbl: 'Lô hàng mô phỏng',
    scopeBatchDesc: 'Mười hai lô hàng với hồ sơ truy xuất nguồn gốc đầy đủ.',
    designTitle: 'Thiết kế dành cho',
    designConsumers: 'Người tiêu dùng',
    designConsumersDesc: 'Đưa ra lựa chọn rõ ràng hơn với thông tin đã kiểm duyệt, lịch sử truy xuất và cập nhật sản phẩm.',
    designProducers: 'Nhà sản xuất',
    designProducersDesc: 'Xây dựng uy tín, tiếp cận nền tảng công bằng và phát triển nhờ sự minh bạch và hỗ trợ liên tục.',
    designAcademic: 'Trình diễn học thuật',
    designAcademicDesc: 'Khám phá mô hình truy xuất nguồn gốc thực tế hỗ trợ nghiên cứu, học tập và đổi mới.',
    quoteText: '"Mỗi ghi chép rõ ràng sẽ xây dựng một nhịp cầu niềm tin giữa cánh đồng và bàn ăn của bạn. Green Trace là một bước đi nhỏ hướng tới một hệ thống thực phẩm lành mạnh, công bằng, minh bạch và tốt hơn cho con người cũng như hành tinh của chúng ta."'
  } : {
    heroTitle: 'About Green Trace',
    heroSubtitle: 'Connecting you with clearer, reviewable product information.',
    intro1: 'Green Trace is an academic prototype that demonstrates how verified agricultural data can be collected, reviewed and presented to help people make clearer purchasing decisions.',
    intro2: 'We work with sample producers and sample data to illustrate a practical model for transparency—simple to understand, easy to verify, and built for learning and improvement.',
    missionTitle: 'Our Mission',
    missionDesc: 'Green Trace\'s mission is to make organic food commerce more transparent and accountable by connecting qualified supplier partners with consumers through structured traceability information, accessible digital transactions and coordinated third-party fulfillment.',
    visionTitle: 'Our Vision',
    visionDesc: 'Green Trace aims to become a trusted digital marketplace for traceable organic food in Vietnam and to develop a scalable model that may later be adapted to selected Southeast Asian markets after establishing a viable domestic foundation.',
    valuesTitle: 'Core Values (TSSI)',
    val1: 'Transparency over assumptions',
    val2: 'Evidence over claims',
    val3: 'Fairness for producers and consumers',
    val4: 'Continuous learning and improvement',
    val5: 'Respect for people and nature',
    existsTitle: 'Why Green Trace exists',
    existsDesc: 'Online agricultural products often come with limited information. Photos and descriptions alone are not enough for important choices.',
    gapsTitle: 'Key information gaps:',
    gap1: 'Unclear origin and farming practices',
    gap2: 'Limited proof of safety and quality',
    gap3: 'Hard to verify what is real',
    gap4: 'No easy way to track product history',
    gap5: 'Difficult to act when issues happen',
    flowTooLittle: 'Too little',
    flowInfo: 'information',
    flowGap: 'Information\ngap',
    flowHardChoice: 'Harder choices,',
    flowLowTrust: 'lower trust',
    worksTitle: 'How the model works',
    step1Title: 'Producer',
    step1Desc: 'Producers provide data about their farming and products, upload evidence, and create batch records.',
    step2Title: 'Green Trace Review',
    step2Desc: 'Our team reviews the information, verifies supporting evidence, and records the results on-chain.',
    step3Title: 'Customer',
    step3Desc: 'You can view reviewed information, trace the history, and make choices with more confidence.',
    archTitle: 'Trust Architecture',
    archSubtitle: 'Each product page is backed by a transparent set of data and review steps.',
    arch1: 'Profile Review',
    arch1Desc: 'We verify the producer\'s identity, location, and farming practices.',
    arch2: 'Batch Records',
    arch2Desc: 'All key batch details are recorded: harvest, quantity, location, and more.',
    arch3: 'Certificates',
    arch3Desc: 'Certificates and documents are collected and validated.',
    arch4: 'Lab Reports',
    arch4Desc: 'Lab tests for safety and quality are reviewed and attached.',
    arch5: 'Blockchain',
    arch5Desc: 'All records are hashed and time-stamped on blockchain.',
    arch6: 'Recall Workflow',
    arch6Desc: 'If issues are found, we activate recall steps and notify affected users.',
    integrityText: 'Data integrity is ensured by cryptographic hashing and immutable timestamp references.',
    reviewedTitle: 'What reviewed means',
    reviewedDesc: '"Reviewed" on Green Trace means our team has checked the submitted information and supporting evidence based on our review standards. It does not mean the product is government certified or officially approved.',
    reviewedBadge: 'Reviewed',
    reviewedBadgeSub: 'Not government certified',
    scopeTitle: 'Pilot Scope (2026)',
    scopeSubtitle: 'Academic demonstration with limited scope and mock inputs.',
    scopeProdVal: '50+',
    scopeProdLbl: 'Sample Products',
    scopeProdDesc: 'Multiple categories with representative items.',
    scopeProducerVal: '5+',
    scopeProducerLbl: 'Sample Producers',
    scopeProducerDesc: 'Verified sample producer profiles.',
    scopeBatchVal: '12',
    scopeBatchLbl: 'Simulated Batches',
    scopeBatchDesc: 'Twelve batches with complete traceability records.',
    designTitle: 'Designed for',
    designConsumers: 'Consumers',
    designConsumersDesc: 'Make clearer choices with access to reviewed information, traceability history, and product updates.',
    designProducers: 'Producers',
    designProducersDesc: 'Build reputation, access a fair platform, and grow with transparency and ongoing support.',
    designAcademic: 'Academic Demonstration',
    designAcademicDesc: 'Explore a real-world model for traceability that supports research, learning, and innovation.',
    quoteText: '"Every clear record builds a bridge of trust between the field and your table. Green Trace is a small step toward a food system that is healthy, fair, transparent, and better for people and the planet."'
  }
})
</script>
