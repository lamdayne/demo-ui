<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Breadcrumb -->
    <div class="container mx-auto px-4 max-w-6xl py-4">
      <div class="text-sm text-gray-500 flex items-center gap-2">
        <router-link to="/" class="hover:text-[#1E4B35]">{{ t.home }}</router-link>
        <ChevronRight class="w-3.5 h-3.5" />
        <router-link to="/producers" class="hover:text-[#1E4B35]">{{ t.producers }}</router-link>
        <ChevronRight class="w-3.5 h-3.5" />
        <span class="text-[#1E4B35] font-semibold">{{ producer?.name || (appStore.lang === 'vi' ? 'Trang trại Ong U Minh' : 'U Minh Bee Farm') }}</span>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-12">
      <div class="flex flex-col lg:flex-row bg-[#1E4B35] text-white rounded-3xl overflow-hidden shadow-xl">
        <!-- Left Hero Content -->
        <div class="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">{{ producer?.name || (appStore.lang === 'vi' ? 'Trang trại Ong U Minh' : 'U Minh Bee Farm') }}</h1>
            <div class="flex items-center gap-1.5 text-green-300 text-sm font-semibold mb-6">
              <MapPin class="w-4 h-4 fill-current" />
              <span>{{ producer?.location || (appStore.lang === 'vi' ? 'Cà Mau, Việt Nam' : 'Ca Mau, Viet Nam') }}</span>
            </div>
            <p class="text-green-50 text-base leading-relaxed mb-8 max-w-xl">
              {{ producer?.description || (appStore.lang === 'vi' ? 'Thu hoạch mật ong rừng tự nhiên từ rừng tràm U Minh với sự tôn trọng thiên nhiên và đàn ong.' : 'Harvesting wild honey from the melaleuca forests of U Minh with respect for nature and bee colonies.') }}
            </p>
            <div class="flex flex-wrap gap-4 mb-8">
              <router-link to="/products" class="bg-white text-[#1E4B35] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-50 transition shadow-md">
                <ShoppingCart class="w-5 h-5" />
                <span>{{ t.shopProducts }}</span>
              </router-link>
              <a href="#records" class="border border-white/40 bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition">
                <FileText class="w-5 h-5" />
                <span>{{ t.viewBatchRecords }}</span>
              </a>
            </div>
          </div>
          <!-- Hero Badges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Home class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">{{ t.familyFarm }}</span>
              <span class="text-xs font-bold text-white">{{ t.est2002 }}</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Sun class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">{{ t.sustainable }}</span>
              <span class="text-xs font-bold text-white">{{ t.beekeeping }}</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Trees class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">{{ t.forestFriendly }}</span>
              <span class="text-xs font-bold text-white">{{ t.practices }}</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Users class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">{{ t.localCommunity }}</span>
              <span class="text-xs font-bold text-white">{{ t.partner }}</span>
            </div>
          </div>
        </div>
        <!-- Right Hero Image -->
        <div class="w-full lg:w-[45%] h-64 lg:h-auto min-h-[350px] relative overflow-hidden">
          <img :src="producer?.image_url || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800'" :alt="producer?.name || 'Beekeeper'" class="w-full h-full object-cover object-center" />
          <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1E4B35] via-transparent to-transparent opacity-60 lg:opacity-100"></div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards (3 Columns) -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
            <img :src="producer?.image_url || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200'" alt="Producer image" class="w-full h-full object-cover" />
          </div>
          <div class="text-left">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ t.sampleProducts }}</span>
            <div class="text-3xl font-extrabold text-[#1E4B35] my-0.5">{{ productsList.length }}</div>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ t.sampleProductsDesc }}</p>
            <router-link to="/products" class="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1">
              {{ t.viewProducts }} <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=200" alt="Honey bottle" class="w-full h-full object-cover" />
          </div>
          <div class="text-left">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ t.sampleBatches }}</span>
            <div class="text-3xl font-extrabold text-[#1E4B35] my-0.5">2</div>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ t.sampleBatchesDesc }}</p>
            <a href="#batches" class="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1">
              {{ t.viewBatches }} <ArrowRight class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-20 h-20 bg-[#F0FDF4] rounded-xl flex-shrink-0 flex items-center justify-center text-green-600">
            <ClipboardList class="w-10 h-10" />
          </div>
          <div class="text-left">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ t.supportingRecords }}</span>
            <div class="text-3xl font-extrabold text-[#1E4B35] my-0.5">3</div>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ t.supportingRecordsDesc }}</p>
            <a href="#records" class="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1">
              {{ t.viewRecords }} <ArrowRight class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Producer Story Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 rounded-3xl p-8 lg:p-10">
        <!-- Story Text (Left) -->
        <div class="lg:col-span-5 space-y-5 text-left">
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">{{ t.producerStory }}</h2>
          <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {{ producer?.history || (appStore.lang === 'vi' ? 'Sâu trong rừng U Minh, Cà Mau, nơi các kênh rạch len lỏi qua những hàng cây tràm và vùng đất ngập nước theo mùa, ong tìm thấy nguồn mật hoa dồi dào từ hoa tràm hoang dã. Trang trại Ong U Minh được thành lập bởi ông Nguyễn Văn An, người học nghề nuôi ong từ cha mình và tiếp tục truyền lại cho thế hệ sau.\n\nTrang trại di chuyển các đàn ong một cách tự nhiên theo các mùa hoa nở, tránh hóa chất và để lại đủ mật cho ong. Điều này giúp bảo vệ các bầy ong, hỗ trợ đa dạng sinh học và giữ cho rừng luôn khỏe mạnh lâu dài.\n\nBằng cách hợp tác với Green Trace, Trang trại Ong U Minh chia sẻ sự minh bạch trong từng hũ mật ong—để bạn có thể yên tâm thưởng thức.' : 'Deep in the U Minh forest of Ca Mau, where the canals weave through melaleuca trees and seasonally flooded wetlands, bees find abundant nectar from wild flowers. U Minh Bee Farm was founded by Mr. Nguyen Van An, who learned beekeeping from his father and continues to pass it down to the next generation.\n\nThe farm migrates hives naturally with the blooming seasons, avoids chemicals, and leaves enough honey for the bees. This helps protect colonies, supports biodiversity, and keeps the forest healthy for the long term.\n\nBy working with Green Trace, U Minh Bee Farm shares transparency in every jar of honey—so you can enjoy it with confidence.') }}
          </p>
          <button class="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm transition">
            <MapPin class="w-4 h-4 text-green-600" />
            <span>{{ t.viewFarmLocation }}</span>
          </button>
        </div>
        <!-- Story Image (Middle) -->
        <div class="lg:col-span-4 h-80 rounded-2xl overflow-hidden shadow-sm">
          <img src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=600" alt="Beekeepers working" class="w-full h-full object-cover" />
        </div>
        <!-- Story Stats (Right) -->
        <div class="lg:col-span-3 space-y-6 text-left">
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Calendar class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">{{ t.twentyYears }}</h4>
              <p class="text-xs text-gray-500">{{ t.experience }}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Home class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">{{ t.oneFiftyHives }}</h4>
              <p class="text-xs text-gray-500">{{ t.managedNaturally }}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Leaf class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">{{ t.forestFriendly }}</h4>
              <p class="text-xs text-gray-500">{{ t.noChemicals }}</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Users class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">{{ t.localImpact }}</h4>
              <p class="text-xs text-gray-500">{{ t.supportsFamilies }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Verification checklist banner -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="bg-[#F8FAF9] border border-green-100 rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-left">
        <div class="z-10">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            {{ t.whyReviewed }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{{ t.reviewCheck1 }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{{ t.reviewCheck2 }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{{ t.reviewCheck3 }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>{{ t.reviewCheck4 }}</span>
            </div>
          </div>
        </div>
        <div class="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center opacity-80 z-0">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200" alt="leaf decoration" class="w-full h-full object-contain pointer-events-none" />
        </div>
      </div>
    </div>

    <!-- Products Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-16 text-left">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">{{ t.productsFrom.replace('{name}', producer?.name || (appStore.lang === 'vi' ? 'Trang trại Ong U Minh' : 'U Minh Bee Farm')) }}</h2>
        <router-link to="/products" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          {{ t.viewAllProducts }} <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <template v-if="productsList.length > 0">
          <div v-for="prod in productsList" :key="prod.id" class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            <div class="relative aspect-[4/3] bg-gray-50 overflow-hidden">
              <img :src="prod.image_url || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400'" :alt="prod.name" class="w-full h-full object-cover" />
              <div class="absolute top-3 right-3 z-10 bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                <CheckCircle2 class="w-3 h-3 text-green-500" /> {{ t.sampled }}
              </div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="font-bold text-gray-900 text-base leading-tight mb-2">
                {{ prod.name }}
              </h3>
              <p class="text-xs text-gray-500 mb-4 flex-grow line-clamp-3">
                {{ prod.description }}
              </p>
              <div class="flex justify-between items-center mt-auto">
                <span class="text-base font-extrabold text-gray-900">{{ parseFloat(prod.price).toLocaleString() }} VND</span>
                <router-link :to="`/product/${prod.id}`" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition">
                  {{ t.viewProduct }}
                </router-link>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- Single Product Card -->
          <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            <div class="relative aspect-[4/3] bg-gray-50 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400" alt="Wild Honey" class="w-full h-full object-cover" />
              <div class="absolute top-3 right-3 z-10 bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                <CheckCircle2 class="w-3 h-3 text-green-500" /> {{ t.sampled }}
              </div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="font-bold text-gray-900 text-base leading-tight mb-2">
                {{ appStore.lang === 'vi' ? 'Mật ong rừng U Minh 500 ml' : 'U Minh Forest Wild Honey 500 ml' }}
              </h3>
              <p class="text-xs text-gray-500 mb-4 flex-grow">
                {{ appStore.lang === 'vi' ? 'Mật ong tự nhiên nguyên chất, không qua lọc được thu hoạch từ hoa rừng tràm tại rừng U Minh.' : 'Raw, unfiltered honey harvested from wild flowers in the U Minh forest.' }}
              </p>
              <div class="flex justify-between items-center mt-auto">
                <span class="text-base font-extrabold text-gray-900">229,000 VND</span>
                <router-link to="/product/1" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition">
                  {{ t.viewProduct }}
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Recent Sample Batches -->
    <div id="batches" class="container mx-auto px-4 max-w-6xl mb-16 text-left">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">{{ t.recentSampleBatches }}</h2>
        <a href="#batches" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          {{ t.viewAllBatches }} <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Batch 1 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
          <div class="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200" alt="Wild Honey" class="w-full h-full object-cover" />
            <div class="absolute bottom-1 right-1 bg-green-600 text-white text-[9px] px-1 rounded-sm">{{ t.sampled }}</div>
          </div>
          <div class="flex-grow">
            <h4 class="font-extrabold text-gray-900 text-base mb-1">UMH-HNY-2026-001</h4>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
              <div>{{ t.productCol }}:</div>
              <div class="font-semibold text-gray-700">{{ appStore.lang === 'vi' ? 'Mật ong U Minh 500ml' : 'U Minh Honey 500ml' }}</div>
              <div>{{ t.sampledCol }}:</div>
              <div class="text-gray-700">10 May 2026</div>
              <div>{{ t.statusCol }}:</div>
              <div class="font-semibold text-green-600 flex items-center gap-1">
                {{ t.testCompleted }} <CheckCircle2 class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          <button class="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition self-center">
            {{ t.viewBatch }}
          </button>
        </div>
        <!-- Batch 2 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
          <div class="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200" alt="Wild Honey" class="w-full h-full object-cover" />
          </div>
          <div class="flex-grow">
            <h4 class="font-extrabold text-gray-900 text-base mb-1">UMH-HNY-2026-002</h4>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
              <div>{{ t.productCol }}:</div>
              <div class="font-semibold text-gray-700">{{ appStore.lang === 'vi' ? 'Mật ong U Minh 500ml' : 'U Minh Honey 500ml' }}</div>
              <div>{{ t.sampledCol }}:</div>
              <div class="text-gray-700">28 May 2026</div>
              <div>{{ t.statusCol }}:</div>
              <div class="font-semibold text-green-600 flex items-center gap-1">
                {{ t.testCompleted }} <CheckCircle2 class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          <button class="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition self-center">
            {{ t.viewBatch }}
          </button>
        </div>
      </div>
    </div>

    <!-- Supporting Records -->
    <div id="records" class="container mx-auto px-4 max-w-6xl mb-16 text-left">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">{{ t.supportingRecords }}</h2>
        <a href="#records" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          {{ t.viewAllRecords }} <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Record 1 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              <FileText class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-base leading-snug">{{ t.reviewedProfile }}</h4>
              <p class="text-xs text-[#1E4B35] font-semibold mt-1">{{ t.farmProfile }}</p>
            </div>
          </div>
          <div class="border-t pt-4 text-xs text-gray-500 space-y-1 mb-6">
            <div class="flex justify-between">
              <span>{{ t.reviewedOn }}:</span>
              <span class="font-medium text-gray-800">03 May 2026</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t.reviewedBy }}:</span>
              <span class="font-medium text-gray-800">{{ t.greenTraceTeam }}</span>
            </div>
          </div>
          <button class="w-full py-2.5 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            {{ t.viewRecord }}
          </button>
        </div>
        <!-- Record 2 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-green-600">
              <CheckSquare class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-base leading-snug">{{ t.sampleBatchRecords }}</h4>
              <p class="text-xs text-[#1E4B35] font-semibold mt-1">{{ t.twoSampleRecords }}</p>
            </div>
          </div>
          <div class="border-t pt-4 text-xs text-gray-500 space-y-1 mb-6">
            <div class="flex justify-between">
              <span>{{ t.collectedDocumented }}</span>
              <span class="font-medium text-green-600">{{ t.verifiedCheck }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t.sampling }}:</span>
              <span class="font-medium text-gray-800">{{ t.independent }}</span>
            </div>
          </div>
          <button class="w-full py-2.5 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            {{ t.viewRecord }}
          </button>
        </div>
        <!-- Record 3 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-blue-600">
              <FlaskConical class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-base leading-snug">{{ t.sampleLabReport }}</h4>
              <p class="text-xs text-[#1E4B35] font-semibold mt-1">{{ t.twoLabReports }}</p>
            </div>
          </div>
          <div class="border-t pt-4 text-xs text-gray-500 space-y-1 mb-6">
            <div class="flex justify-between">
              <span>{{ t.qualityPurityTested }}</span>
              <span class="font-medium text-blue-600 font-semibold">{{ t.passed }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t.laboratory }}:</span>
              <span class="font-medium text-gray-800">{{ t.thirdParty }}</span>
            </div>
          </div>
          <button class="w-full py-2.5 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            {{ t.viewRecord }}
          </button>
        </div>
      </div>
    </div>

    <!-- Farm Moments Gallery -->
    <div class="container mx-auto px-4 max-w-6xl mb-16 text-left">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">{{ t.farmMoments }}</h2>
        <a href="#" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          {{ t.viewGallery }} <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group">
          <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400" alt="Moment 1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group">
          <img src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=400" alt="Moment 2" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group">
          <img src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=400" alt="Moment 3" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Moment 4" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group">
          <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400" alt="Moment 5" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      </div>
    </div>

    <!-- Testimonial Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-16 text-left">
      <div class="bg-green-50/50 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 relative">
        <div class="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Linh Tran" class="w-full h-full object-cover" />
        </div>
        <div class="flex-grow space-y-4">
          <p class="text-gray-700 text-lg italic leading-relaxed">
            "{{ t.testimonialQuote }}"
          </p>
          <div>
            <h4 class="font-bold text-gray-900 text-base">{{ t.testimonialAuthor }}</h4>
            <p class="text-xs text-gray-500">{{ t.testimonialOrg }}</p>
          </div>
        </div>
        <div class="absolute right-8 bottom-6 opacity-30 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200" alt="leaf decoration" class="w-20 h-20 object-contain" />
        </div>
      </div>
    </div>

    <!-- Trust Features Bar -->
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200 shadow-sm text-left">
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Sprout class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ t.traceable }}</div>
            <div class="text-xs text-gray-500">{{ t.fromForestToTable }}</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <CheckCircle2 class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ t.independentlyVerified }}</div>
            <div class="text-xs text-gray-500">{{ t.samplesRecords }}</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Leaf class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ t.sustainable }}</div>
            <div class="text-xs text-gray-500">{{ t.peoplePlanetFirst }}</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">{{ t.transparent }}</div>
            <div class="text-xs text-gray-500">{{ t.clearInformation }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { ChevronRight, MapPin, ShoppingCart, FileText, Home, Sun, Trees, Users, ArrowRight, ClipboardList, Calendar, Leaf, CheckCircle2, CheckSquare, FlaskConical, Sprout } from 'lucide-vue-next'

const route = useRoute()
const appStore = useAppStore()

const producer = ref(null)
const productsList = ref([])

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    home: 'Trang chủ',
    producers: 'Nhà sản xuất',
    shopProducts: 'Mua sản phẩm',
    viewBatchRecords: 'Xem nhật ký lô hàng',
    familyFarm: 'Trang trại gia đình',
    est2002: 'Thành lập 2002',
    sustainable: 'Bền vững',
    beekeeping: 'Nuôi ong',
    forestFriendly: 'Thân thiện với rừng',
    practices: 'Phương thức',
    localCommunity: 'Cộng đồng địa phương',
    partner: 'Đối tác',
    sampleProducts: 'Sản phẩm mẫu',
    sampleProductsDesc: 'Các sản phẩm được tuyển chọn kỹ lưỡng từ nhà sản xuất này.',
    viewProducts: 'Xem sản phẩm',
    sampleBatches: 'Lô hàng mẫu',
    sampleBatchesDesc: 'Mẫu thử được thu thập và gửi đi kiểm nghiệm độc lập.',
    viewBatches: 'Xem lô hàng',
    supportingRecords: 'Tài liệu hỗ trợ',
    supportingRecordsDesc: 'Hồ sơ, báo cáo kiểm nghiệm và tài liệu đã được xem xét.',
    viewRecords: 'Xem tài liệu',
    producerStory: 'Câu chuyện nhà sản xuất',
    viewFarmLocation: 'Xem vị trí trang trại',
    twentyYears: '20+ Năm',
    experience: 'Kinh nghiệm nuôi ong',
    oneFiftyHives: '150+ Đàn ong',
    managedNaturally: 'Quản lý tự nhiên',
    noChemicals: 'Không sử dụng hóa chất',
    localImpact: 'Tác động địa phương',
    supportsFamilies: 'Hỗ trợ các gia đình địa phương',
    whyReviewed: 'Tại sao Green Trace đánh giá hồ sơ này',
    reviewCheck1: 'Hoàn thành chuyến tham quan thực tế và xác minh tại chỗ',
    reviewCheck2: 'Mẫu lô hàng được thu thập và kiểm nghiệm bởi phòng thí nghiệm độc lập',
    reviewCheck3: 'Phương thức nuôi ong được đánh giá về tính bền vững',
    reviewCheck4: 'Xem xét các hồ sơ và tài liệu hỗ trợ liên quan',
    productsFrom: 'Sản phẩm từ {name}',
    viewAllProducts: 'Xem tất cả sản phẩm',
    sampled: 'Đã lấy mẫu',
    viewProduct: 'Xem sản phẩm',
    recentSampleBatches: 'Lô hàng mẫu gần đây',
    viewAllBatches: 'Xem tất cả lô hàng',
    productCol: 'Sản phẩm',
    sampledCol: 'Đã lấy mẫu',
    statusCol: 'Trạng thái',
    testCompleted: 'Kiểm nghiệm hoàn tất',
    viewBatch: 'Xem lô hàng',
    reviewedProfile: 'Hồ sơ nhà sản xuất đã xem xét',
    farmProfile: 'Hồ sơ Trang trại Ong U Minh',
    reviewedOn: 'Xem xét vào',
    reviewedBy: 'Đánh giá bởi',
    greenTraceTeam: 'Đội ngũ Green Trace',
    viewRecord: 'Xem hồ sơ',
    sampleBatchRecords: 'Hồ sơ lô hàng mẫu',
    twoSampleRecords: '2 hồ sơ lô hàng mẫu',
    collectedDocumented: 'Đã thu thập & lập tài liệu',
    verifiedCheck: 'Đã xác minh ✔',
    sampling: 'Lấy mẫu',
    independent: 'Độc lập',
    sampleLabReport: 'Báo cáo kiểm nghiệm mẫu',
    twoLabReports: 'Có sẵn 2 báo cáo kiểm nghiệm',
    qualityPurityTested: 'Đã kiểm tra chất lượng & độ tinh khiết',
    passed: 'Đã đạt',
    laboratory: 'Phòng thí nghiệm',
    thirdParty: 'Bên thứ ba',
    farmMoments: 'Khoảnh khắc trang trại',
    viewGallery: 'Xem thư viện ảnh',
    testimonialQuote: 'Chúng tôi đã làm việc với Trang trại Ong U Minh hơn một năm. Mật ong của họ luôn giữ được độ tinh khiết và hương vị thơm ngon, chúng tôi đánh giá cao cam kết của họ đối với rừng tràm và các đàn ong.',
    testimonialAuthor: '– Linh Trần, Người mua',
    testimonialOrg: 'Hợp tác xã Thực phẩm Tự nhiên, Hà Nội',
    traceable: 'Truy xuất nguồn gốc',
    fromForestToTable: 'Từ rừng tràm đến bàn ăn',
    independentlyVerified: 'Xác minh độc lập',
    samplesRecords: 'Mẫu thử & hồ sơ',
    peoplePlanetFirst: 'Con người & hành tinh là trên hết',
    transparent: 'Minh bạch',
    clearInformation: 'Thông tin rõ ràng'
  } : {
    home: 'Home',
    producers: 'Producers',
    shopProducts: 'Shop Products',
    viewBatchRecords: 'View Batch Records',
    familyFarm: 'Family Farm',
    est2002: 'Est. 2002',
    sustainable: 'Sustainable',
    beekeeping: 'Beekeeping',
    forestFriendly: 'Forest Friendly',
    practices: 'Practices',
    localCommunity: 'Local Community',
    partner: 'Partner',
    sampleProducts: 'Sample Products',
    sampleProductsDesc: 'Carefully selected products from this producer.',
    viewProducts: 'View Products',
    sampleBatches: 'Sample Batches',
    sampleBatchesDesc: 'Independently sampled and submitted.',
    viewBatches: 'View Batches',
    supportingRecords: 'Supporting Records',
    supportingRecordsDesc: 'Profiles, lab reports and documents reviewed.',
    viewRecords: 'View Records',
    producerStory: 'Producer Story',
    viewFarmLocation: 'View Farm Location',
    twentyYears: '20+ Years',
    experience: 'Beekeeping Experience',
    oneFiftyHives: '150+ Hives',
    managedNaturally: 'Managed Naturally',
    noChemicals: 'No chemicals used',
    localImpact: 'Local Impact',
    supportsFamilies: 'Supports local families',
    whyReviewed: 'Why Green Trace reviewed this profile',
    reviewCheck1: 'Physical visit and on-site verification completed',
    reviewCheck2: 'Sample batches collected and tested by independent labs',
    reviewCheck3: 'Beekeeping practices assessed for sustainability',
    reviewCheck4: 'Supporting documents and records reviewed',
    productsFrom: 'Products from {name}',
    viewAllProducts: 'View all products',
    sampled: 'Sampled',
    viewProduct: 'View Product',
    recentSampleBatches: 'Recent Sample Batches',
    viewAllBatches: 'View all batches',
    productCol: 'Product',
    sampledCol: 'Sampled',
    statusCol: 'Status',
    testCompleted: 'Test Completed',
    viewBatch: 'View Batch',
    reviewedProfile: 'Reviewed Producer Profile',
    farmProfile: 'U Minh Bee Farm Profile',
    reviewedOn: 'Reviewed on',
    reviewedBy: 'Reviewed by',
    greenTraceTeam: 'Green Trace Team',
    viewRecord: 'View Record',
    sampleBatchRecords: 'Sample Batch Records',
    twoSampleRecords: '2 sample batch records',
    collectedDocumented: 'Collected & documented',
    verifiedCheck: 'Verified ✔',
    sampling: 'Sampling',
    independent: 'Independent',
    sampleLabReport: 'Sample Lab Report',
    twoLabReports: '2 lab reports available',
    qualityPurityTested: 'Quality & purity tested',
    passed: 'Passed',
    laboratory: 'Laboratory',
    thirdParty: 'Third-party',
    farmMoments: 'Farm Moments',
    viewGallery: 'View gallery',
    testimonialQuote: 'We\'ve worked with U Minh Bee Farm for over a year. Their honey is consistently pure and delicious, and we love their commitment to the forest and the bees.',
    testimonialAuthor: '– Linh Tran, Buyer',
    testimonialOrg: 'Natural Foods Co-op, Ha Noi',
    traceable: 'Traceable',
    fromForestToTable: 'From forest to table',
    independentlyVerified: 'Independently Verified',
    samplesRecords: 'Samples & records',
    peoplePlanetFirst: 'People & planet first',
    transparent: 'Transparent',
    clearInformation: 'Clear information'
  }
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
