<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Header & Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-4">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">{{ appStore.lang === 'en' ? 'Home' : 'Trang chủ' }}</router-link>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-gray-400">{{ appStore.lang === 'en' ? 'Traceability' : 'Truy xuất' }}</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#1E4B35] font-semibold">{{ appStore.lang === 'en' ? 'Batch Traceability' : 'Truy xuất nguồn gốc lô hàng' }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-[#1E4B35] mb-2">{{ appStore.lang === 'en' ? 'Batch Traceability' : 'Truy xuất nguồn gốc lô hàng' }}</h1>
        <p class="text-gray-600">{{ appStore.lang === 'en' ? 'See the journey of this batch from farm to you.' : 'Xem hành trình của lô hàng này từ trang trại đến bạn.' }}</p>
      </div>

      <!-- Look up a batch search block -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex-shrink-0">
          <h3 class="font-bold text-gray-900 text-lg mb-1 flex items-center gap-1.5">
            {{ appStore.lang === 'en' ? 'Look up a batch' : 'Tra cứu lô hàng' }} <Info class="w-4 h-4 text-gray-400 cursor-pointer" />
          </h3>
          <p class="text-xs text-gray-500">{{ appStore.lang === 'en' ? 'Enter a batch or lot number' : 'Nhập mã lô hoặc số lô' }}</p>
        </div>
        <div class="flex flex-grow max-w-xl w-full gap-3">
          <input type="text" v-model="searchId" @keyup.enter="handleSearch" class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] font-mono text-gray-900" />
          <button @click="handleSearch" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-6 py-3 rounded-lg font-bold transition">{{ appStore.lang === 'en' ? 'Search' : 'Tìm kiếm' }}</button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm mb-8">
        <div class="inline-block w-8 h-8 border-4 border-[#1E4B35] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-600 font-medium">{{ appStore.lang === 'en' ? 'Retrieving batch records and lab analyses...' : 'Đang truy xuất hồ sơ lô hàng và kết quả kiểm nghiệm...' }}</p>
      </div>

      <!-- Empty State (no search yet) -->
      <div v-else-if="!hasSearched" class="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center shadow-sm mb-8">
        <div class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <Search class="w-8 h-8 text-[#1E4B35]" />
        </div>
        <h3 class="font-bold text-gray-900 text-lg mb-2">{{ appStore.lang === 'en' ? 'Enter a Batch ID to begin' : 'Nhập mã lô hàng để bắt đầu' }}</h3>
        <p class="text-sm text-gray-500 max-w-md mx-auto">{{ appStore.lang === 'en' ? 'Type a batch or lot number in the search box above and press Search to view its full traceability report.' : 'Nhập mã lô hoặc số lô vào ô tìm kiếm phía trên và nhấn Tìm kiếm để xem báo cáo truy xuất đầy đủ.' }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMsg" class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-sm mb-8">
        <Info class="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 class="font-bold text-red-900 text-lg mb-1">{{ appStore.lang === 'en' ? 'Lookup Failed' : 'Tra cứu thất bại' }}</h3>
        <p class="text-red-700 text-sm">{{ errorMsg }}</p>
      </div>

      <template v-else-if="batchData">
        <!-- Batch Overview Card -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Product Details -->
          <div class="lg:col-span-5 flex gap-5">
            <div class="w-28 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
              <img :src="batchData.product_image" :alt="batchData.product_name" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col justify-center">
              <span class="text-xs text-gray-500 font-medium">{{ appStore.lang === 'en' ? 'Product' : 'Sản phẩm' }}</span>
              <h4 class="font-bold text-gray-900 text-lg leading-tight mb-1.5">{{ batchData.product_name }}</h4>
              <div class="text-sm text-gray-600 mb-2">
                <span class="font-semibold text-gray-900">{{ appStore.lang === 'en' ? 'Producer:' : 'Nhà sản xuất:' }}</span> {{ batchData.producer_name }}
              </div>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-700">{{ appStore.lang === 'en' ? 'Batch' : 'Lô' }} {{ batchData.id }}</span>
                <span class="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                  <Check class="w-3 h-3"/> {{ batchData.status || (appStore.lang === 'en' ? 'Verified Sample' : 'Mẫu đã xác thực') }}
                </span>
              </div>
            </div>
          </div>

          <!-- Explanation Column -->
          <div class="lg:col-span-4 border-t lg:border-t-0 lg:border-l lg:border-r border-gray-100 pt-6 lg:pt-0 px-0 lg:px-6">
            <h4 class="font-bold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
              {{ appStore.lang === 'en' ? 'What this means' : 'Ý nghĩa của điều này' }} <CheckCircle2 class="w-4 h-4 text-green-600" />
            </h4>
            <p class="text-xs text-gray-600 leading-relaxed">
              {{ appStore.lang === 'en' ? 'This batch has been reviewed for key records and quality checks by our team. It is not a government certification or a guarantee, but it helps you choose with more confidence.' : 'Lô hàng này đã được đội ngũ của chúng tôi kiểm tra hồ sơ và chất lượng. Đây không phải chứng nhận của chính phủ hay lời bảo đảm, nhưng nó giúp bạn tự tin lựa chọn.' }}
            </p>
          </div>

          <!-- QR Code Column -->
          <div class="lg:col-span-3 flex flex-col items-center text-center">
            <span class="text-xs text-gray-500 font-semibold mb-2">{{ appStore.lang === 'en' ? 'Scan to view this batch' : 'Quét để xem lô hàng này' }}</span>
            <div class="w-24 h-24 bg-white p-1 rounded-lg flex items-center justify-center border border-gray-200 shadow-inner">
              <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(windowLocationOrigin + '/traceability?batch=' + batchData.id)" class="w-full h-full object-contain" />
            </div>
            <div class="text-[10px] text-gray-400 font-mono mt-2 break-all max-w-[180px]">{{ batchData.id }}<br/>{{ windowLocationOrigin }}/traceability?batch={{ batchData.id }}</div>
          </div>
        </div>

        <!-- Batch Journey Timeline -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <h3 class="font-bold text-gray-900 text-lg mb-8">{{ appStore.lang === 'en' ? 'Batch Journey Timeline' : 'Dòng thời gian hành trình lô hàng' }}</h3>
          <div class="flex flex-col md:flex-row justify-between relative max-w-4xl mx-auto pb-6">
            <!-- Connective line -->
            <div class="hidden md:block absolute top-7 left-[8%] right-[8%] border-t-2 border-[#1E4B35] -z-10"></div>

            <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
              <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
                <Hexagon class="w-6 h-6"/>
              </div>
              <h4 class="font-bold text-gray-900 text-sm">{{ appStore.lang === 'en' ? 'Harvest / Collection' : 'Thu hoạch / Thu gom' }}</h4>
              <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">{{ appStore.lang === 'en' ? 'Collected at location: ' : 'Thu hoạch tại: ' }}{{ appStore.localizeAddress(batchData.location || 'Local apiary') }}</p>
              <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">{{ new Date(batchData.harvest_date).toLocaleDateString() }}</span>
            </div>

            <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
              <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
                <Droplet class="w-6 h-6"/>
              </div>
              <h4 class="font-bold text-gray-900 text-sm">{{ appStore.lang === 'en' ? 'Testing Parameters' : 'Chỉ số kiểm nghiệm' }}</h4>
              <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">{{ appStore.lang === 'en' ? 'Water content: ' : 'Độ ẩm: ' }}{{ batchData.water_content || 'N/A' }}%</p>
              <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">{{ appStore.lang === 'en' ? 'Passed Analysis' : 'Đạt phân tích' }}</span>
            </div>

            <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
              <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
                <CheckCircle2 class="w-6 h-6"/>
              </div>
              <h4 class="font-bold text-gray-900 text-sm">{{ appStore.lang === 'en' ? 'Quality Check' : 'Kiểm tra chất chất lượng' }}</h4>
              <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">{{ appStore.lang === 'en' ? 'HMF Content: ' : 'Hàm lượng HMF: ' }}{{ batchData.hmf_content || 'N/A' }} mg/kg</p>
              <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">{{ appStore.lang === 'en' ? 'Tested Pure' : 'Kiểm nghiệm nguyên chất' }}</span>
            </div>

            <div class="flex flex-col items-center text-center mb-6 md:mb-0 relative">
              <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
                <Package class="w-6 h-6"/>
              </div>
              <h4 class="font-bold text-gray-900 text-sm">{{ appStore.lang === 'en' ? 'Pure Test' : 'Xác minh nguyên chất' }}</h4>
              <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">{{ appStore.lang === 'en' ? 'Adulteration test: ' : 'Kiểm tra pha trộn: ' }}{{ batchData.adulteration_test || 'Negative' }}</p>
              <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">{{ appStore.lang === 'en' ? 'Verified' : 'Đã xác thực' }}</span>
            </div>

            <div class="flex flex-col items-center text-center relative">
              <div class="w-14 h-14 rounded-full bg-[#1E4B35] text-white flex items-center justify-center mb-3 shadow relative">
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"><Check class="w-2.5 h-2.5 text-white"/></span>
                <Truck class="w-6 h-6"/>
              </div>
              <h4 class="font-bold text-gray-900 text-sm">{{ appStore.lang === 'en' ? 'Ready to Ship' : 'Sẵn sàng giao' }}</h4>
              <p class="text-[11px] text-gray-500 mt-1 max-w-[130px] leading-tight">{{ appStore.lang === 'en' ? 'Cleared for distribution by producer.' : 'Đã cho phép phân phối bởi nhà sản xuất.' }}</p>
              <span class="text-[10px] font-bold text-[#1E4B35] mt-2 block">{{ appStore.lang === 'en' ? 'Available' : 'Có sẵn' }}</span>
            </div>
          </div>
        </div>

        <!-- Product Summary & Producer Summary grids -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Product Summary -->
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div class="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
              <Package class="w-5 h-5 text-[#1E4B35]" />
              <h3 class="font-bold text-gray-900 text-base">{{ appStore.lang === 'en' ? 'Product Summary' : 'Tóm tắt sản phẩm' }}</h3>
            </div>
            <div class="flex items-center gap-6 mb-6">
              <div class="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img :src="batchData.product_image" :alt="batchData.product_name" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm">{{ batchData.product_name }}</h4>
                <p class="text-xs text-gray-500 mt-0.5">{{ appStore.lang === 'en' ? 'Price: ' : 'Giá: ' }}{{ parseFloat(batchData.product_price).toLocaleString() }} VND</p>
              </div>
            </div>
            <div class="space-y-3 text-sm text-gray-700">
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Species Source' : 'Loại nguồn gốc' }}</span>
                <span class="font-semibold text-gray-900">{{ batchData.species_source || 'Wild honeybee' }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Batch / Lot No.' : 'Mã lô / Batch' }}</span>
                <span class="font-mono font-semibold text-gray-900">{{ batchData.id }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Harvest Date' : 'Ngày thu hoạch' }}</span>
                <span class="font-semibold text-gray-900">{{ new Date(batchData.harvest_date).toLocaleDateString() }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Diastase Activity' : 'Hoạt độ Diastase' }}</span>
                <span class="font-semibold text-gray-900">{{ batchData.diastase_activity || 'N/A' }} DN</span>
              </div>
              <div class="flex justify-between py-1.5">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Location Origin' : 'Nguồn gốc xuất xứ' }}</span>
                <span class="font-semibold text-gray-900">{{ appStore.localizeAddress(batchData.location) }}</span>
              </div>
            </div>
          </div>

          <!-- Producer Summary -->
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div class="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
              <User class="w-5 h-5 text-[#1E4B35]" />
              <h3 class="font-bold text-gray-900 text-base">{{ appStore.lang === 'en' ? 'Producer Summary' : 'Tóm tắt nhà sản xuất' }}</h3>
            </div>
            <div class="flex items-center gap-6 mb-6">
              <div class="w-20 h-20 rounded-full overflow-hidden border border-white shadow">
                <img :src="batchData.producer_image || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=150'" :alt="batchData.producer_name" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm">{{ batchData.producer_name }}</h4>
                <p class="text-xs text-gray-500 mt-0.5">{{ appStore.lang === 'en' ? 'Location: ' : 'Địa chỉ: ' }}{{ appStore.localizeAddress(batchData.producer_location) }}</p>
              </div>
            </div>
            <div class="space-y-3 text-sm text-gray-700">
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Origin Province' : 'Tỉnh thành xuất xứ' }}</span>
                <span class="font-semibold text-gray-900">{{ appStore.localizeAddress(batchData.producer_location) }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Producer Code' : 'Mã nhà sản xuất' }}</span>
                <span class="font-semibold text-gray-900">PRD-{{ batchData.producer_name.replace(/\s+/g, '-').toUpperCase() }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-50">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Traceability Verification' : 'Xác minh truy xuất' }}</span>
                <span class="font-semibold text-green-700">{{ appStore.lang === 'en' ? 'Active' : 'Hoạt động' }}</span>
              </div>
              <div class="flex justify-between py-1.5">
                <span class="text-gray-500">{{ appStore.lang === 'en' ? 'Status' : 'Trạng thái' }}</span>
                <span class="font-semibold text-green-700">{{ appStore.lang === 'en' ? 'Verified Producer' : 'Nhà sản xuất đã xác minh' }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Supporting Records -->
      <div class="mb-8">
        <h3 class="font-bold text-gray-900 text-lg mb-6">{{ appStore.lang === 'en' ? 'Supporting Records' : 'Tài liệu hỗ trợ' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <FileText class="w-6 h-6 text-[#1E4B35]" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">{{ appStore.lang === 'en' ? 'Sample Batch Record' : 'Nhật ký lô hàng mẫu' }}</h4>
                <p class="text-xs text-gray-500 leading-normal">{{ appStore.lang === 'en' ? 'Details of collection, extraction, processing and packing.' : 'Chi tiết về thu hoạch, chiết xuất, chế biến và đóng gói.' }}</p>
              </div>
            </div>
            <a href="#" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5">
              {{ appStore.lang === 'en' ? 'View Record' : 'Xem hồ sơ' }} <ExternalLink class="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <FlaskConical class="w-6 h-6 text-[#1E4B35]" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">{{ appStore.lang === 'en' ? 'Sample Lab Report' : 'Kết quả kiểm nghiệm mẫu' }}</h4>
                <p class="text-xs text-gray-500 leading-normal">{{ appStore.lang === 'en' ? 'Lab analysis for key quality and safety parameters.' : 'Phân tích phòng thí nghiệm cho các chỉ số chất lượng & an toàn.' }}</p>
              </div>
            </div>
            <a href="#" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5">
              {{ appStore.lang === 'en' ? 'View Report' : 'Xem báo cáo' }} <ExternalLink class="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div class="flex gap-4 items-start mb-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <User class="w-6 h-6 text-[#1E4B35]" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">{{ appStore.lang === 'en' ? 'Producer Profile Reviewed' : 'Hồ sơ nhà sản xuất đã kiểm duyệt' }}</h4>
                <p class="text-xs text-gray-500 leading-normal">{{ appStore.lang === 'en' ? 'Information about the farm, practices and facilities.' : 'Thông tin về trang trại, phương thức canh tác và cơ sở vật chất.' }}</p>
              </div>
            </div>
            <router-link to="/producer/1" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5">
              {{ appStore.lang === 'en' ? 'View Profile' : 'Xem hồ sơ' }} <ExternalLink class="w-4 h-4 text-gray-400" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Explanations Block -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-4">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-2">{{ appStore.lang === 'en' ? 'What "Reviewed" Means' : 'Ý nghĩa của "Đã kiểm duyệt"' }}</h4>
            <ul class="space-y-2 text-xs text-gray-600 list-disc pl-4">
              <li>{{ appStore.lang === 'en' ? 'Our team checks the records and sample results provided by the producer.' : 'Đội ngũ của chúng tôi kiểm tra các hồ sơ và kết quả mẫu do nhà sản xuất cung cấp.' }}</li>
              <li>{{ appStore.lang === 'en' ? 'We verify that key steps and dates are consistent.' : 'Chúng tôi xác minh các bước chính và ngày tháng đồng nhất.' }}</li>
              <li>{{ appStore.lang === 'en' ? 'Reviewed does not mean government certification.' : 'Đã kiểm duyệt không có nghĩa là chứng nhận của chính phủ.' }}</li>
              <li>{{ appStore.lang === 'en' ? 'This is not a guarantee of absolute truth or future performance.' : 'Đây không phải cam kết về sự thật tuyệt đối hay kết quả tương lai.' }}</li>
            </ul>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-4">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Leaf class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-sm mb-2">{{ appStore.lang === 'en' ? 'What This Means For You' : 'Điều này có ý nghĩa gì với bạn' }}</h4>
            <ul class="space-y-2 text-xs text-gray-600 list-disc pl-4">
              <li>{{ appStore.lang === 'en' ? 'You can see how this batch was made and checked.' : 'Bạn có thể xem lô hàng này được tạo ra và kiểm tra như thế nào.' }}</li>
              <li>{{ appStore.lang === 'en' ? 'It helps you choose with more confidence.' : 'Nó giúp bạn lựa chọn tự tin hơn.' }}</li>
              <li>{{ appStore.lang === 'en' ? 'Product quality can still vary naturally.' : 'Chất lượng sản phẩm vẫn có thể thay đổi tự nhiên.' }}</li>
              <li>{{ appStore.lang === 'en' ? 'If you have questions, we are here to help.' : 'Nếu bạn có câu hỏi, chúng tôi sẵn sàng trợ giúp.' }}</li>
            </ul>
          </div>
        </div>
      </div>


      <!-- Testimonial Community Quote -->
      <div class="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div class="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow">
          <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1783097251/228b9e5c-dd57-4d45-9af9-930c8b4505be.png" alt="Nguyen Van An" class="w-full h-full object-cover" />
        </div>
        <div>
          <Quote class="w-8 h-8 text-green-300 mb-1 opacity-50" />
          <p class="text-base text-[#1E4B35] font-medium italic mb-2 leading-relaxed">
            {{ appStore.lang === 'en' ? 'We believe openness builds trust. Thank you for supporting real producers.' : 'Chúng tôi tin tưởng sự cởi mở xây dựng lòng tin. Cảm ơn bạn đã hỗ trợ những nhà sản xuất chân chính.' }}
          </p>
          <div class="font-bold text-gray-900 text-xs">Trương Nữ Thuỳ Duyên</div>
          <div class="text-[10px] text-gray-500">{{ appStore.lang === 'en' ? 'Green Trace Community' : 'Cộng đồng Green Trace' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight, Info, Check, Search, QrCode, Hexagon, Droplet, CheckCircle2, Package, Truck, User, ArrowRight, FileText, FlaskConical, ExternalLink, ShieldCheck, Leaf, ArrowLeft, HelpCircle, Share2, Quote } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const windowLocationOrigin = ref(window.location.origin)

// Only pre-fill if a batch query param is present in the URL
const searchId = ref(route.query.batch || '')
const batchData = ref(null)
const loading = ref(false)
const errorMsg = ref('')
const hasSearched = ref(false)

async function loadBatch(id) {
  if (!id) return
  loading.value = true
  errorMsg.value = ''
  batchData.value = null
  try {
    const data = await appStore.fetchBatch(id)
    batchData.value = data
    appStore.addTraceabilityLog(data)
  } catch (err) {
    batchData.value = null
    errorMsg.value = err.message || (appStore.lang === 'en' ? 'Batch not found. Please verify the Batch ID.' : 'Không tìm thấy lô hàng. Vui lòng kiểm tra lại mã lô.')
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  if (!searchId.value.trim()) return
  hasSearched.value = true
  router.replace({ query: { batch: searchId.value.trim() } })
  loadBatch(searchId.value.trim())
}

onMounted(() => {
  // Only auto-load if a batch ID is in the URL
  if (route.query.batch) {
    hasSearched.value = true
    loadBatch(route.query.batch)
  }
})

watch(() => route.query.batch, (newBatch) => {
  if (newBatch) {
    searchId.value = newBatch
    hasSearched.value = true
    loadBatch(newBatch)
  }
})
</script>
