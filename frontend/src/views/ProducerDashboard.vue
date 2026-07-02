<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E4B35]"></div>
        <p class="text-xs text-gray-500 font-semibold">{{ t.syncText }}</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div class="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-gray-200">
              <img :src="myProducer?.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'" alt="Producer Profile" class="w-full h-full object-cover" />
            </div>
            <h3 class="font-bold text-gray-900 text-base">{{ myProducer?.name }}</h3>
            <span class="bg-green-50 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-green-200 inline-block mt-1">{{ t.verifiedProducer }}</span>
            <div class="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <MapPin class="w-3.5 h-3.5 text-gray-400" /> {{ myProducer?.location }}
            </div>
            <router-link :to="'/producer/' + myProducer?.id" class="text-xs font-semibold text-[#1E4B35] hover:underline mt-4 block" v-html="t.viewStoreProfile"></router-link>
            
            <nav class="space-y-1 mt-6 text-left">
              <button 
                v-for="tb in tabs" 
                :key="tb.id"
                @click="activeTab = tb.id"
                class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition"
                :class="activeTab === tb.id ? 'bg-[#1E4B35] text-white shadow' : 'text-gray-700 hover:bg-gray-50'"
              >
                <span class="flex items-center gap-3">
                  <component :is="tb.icon" class="w-4 h-4" :class="activeTab === tb.id ? 'text-white' : 'text-gray-400'" />
                  {{ tb.name }}
                </span>
                <span v-if="tb.id === 'messages'" class="text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold px-1" :class="activeTab === tb.id ? 'bg-white text-[#1E4B35]' : 'bg-[#1E4B35] text-white'">
                  3
                </span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-6">
          
          <!-- Top Header Slogan & Time -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 class="text-3xl font-extrabold text-[#1E4B35] leading-none mb-2">{{ t.dashboardTitle }}</h1>
              <p class="text-xs text-gray-500">{{ t.welcomeBack.replace('{name}', myProducer?.name || '') }}</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] text-gray-500 font-semibold shadow-sm">
              <Calendar class="w-3.5 h-3.5 text-gray-400" />
              <span>{{ t.dataSyncDb }}</span>
            </div>
          </div>

          <!-- TAB 1: OVERVIEW -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Counter Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div @click="activeTab = 'products'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35] mb-2"><Package class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">{{ t.totalProducts }}</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ products.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block" v-html="t.manageProducts"></span>
              </div>

              <div @click="activeTab = 'batches'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 mb-2"><Layers class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">{{ t.activeBatches }}</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ batches.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block" v-html="t.viewBatches"></span>
              </div>

              <div @click="activeTab = 'records'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-2"><FileText class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">{{ t.documents }}</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ records.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block" v-html="t.viewRecords"></span>
              </div>

              <div @click="activeTab = 'orders'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2"><ShoppingBag class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">{{ t.totalOrders }}</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ orders.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block" v-html="t.viewOrders"></span>
              </div>
            </div>

            <!-- Tasks & Analytics Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Tasks -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold text-gray-900 text-sm">{{ t.todaysTasks }}</h3>
                  </div>
                  <div class="space-y-4">
                    <!-- Task 1 -->
                    <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                      <div class="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35] flex-shrink-0"><CloudUpload class="w-5 h-5"/></div>
                      <div class="flex-grow">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-bold text-gray-900 text-xs">{{ t.task1Title }}</h4>
                          <span class="bg-red-50 text-red-700 text-[8px] font-bold px-1.5 py-0.5 rounded">{{ t.task1Priority }}</span>
                        </div>
                        <p class="text-[10px] text-gray-500">{{ t.task1Desc }}</p>
                      </div>
                    </div>

                    <!-- Task 2 -->
                    <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                      <div class="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0"><FlaskConical class="w-5 h-5"/></div>
                      <div class="flex-grow">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-bold text-gray-900 text-xs">{{ t.task2Title }}</h4>
                          <span class="bg-yellow-50 text-yellow-700 text-[8px] font-bold px-1.5 py-0.5 rounded">{{ t.task2Priority }}</span>
                        </div>
                        <p class="text-[10px] text-gray-500">{{ t.task2Desc }}</p>
                      </div>
                    </div>

                    <!-- Task 3 -->
                    <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                      <div class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0"><MessageSquare class="w-5 h-5"/></div>
                      <div class="flex-grow">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-bold text-gray-900 text-xs">{{ t.task3Title }}</h4>
                          <span class="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded">{{ t.task3Priority }}</span>
                        </div>
                        <p class="text-[10px] text-gray-500">{{ t.task3Desc }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button @click="activeTab = 'messages'" class="text-xs font-bold text-[#1E4B35] hover:underline pt-4 block text-center border-t border-gray-100 mt-4" v-html="t.viewAllMessages"></button>
              </div>

              <!-- Analytics Graph -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 class="font-bold text-gray-900 text-sm">{{ t.revenueAnalytics }} <span class="text-gray-400 font-normal text-xs">{{ t.sixMonthOverview }}</span></h3>
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div class="p-3 bg-gray-50 rounded-xl">
                    <div class="text-xs font-bold text-gray-400">{{ t.totalRevenue }}</div>
                    <div class="text-lg font-extrabold text-green-700 mt-1">{{ stats.totalSales?.toLocaleString() }} VND</div>
                  </div>
                  <div class="p-3 bg-gray-50 rounded-xl">
                    <div class="text-xs font-bold text-gray-400">{{ t.avgOrdersMonth }}</div>
                    <div class="text-lg font-extrabold text-[#1E4B35] mt-1">{{ (stats.totalOrders / 6 || 0).toFixed(1) }}</div>
                  </div>
                </div>

                <!-- Custom SVG Bar Chart -->
                <div class="space-y-1 pt-2">
                  <div class="text-[9px] font-bold text-gray-500 uppercase tracking-wide">{{ t.monthlySalesValue }}</div>
                  <div class="h-28 flex items-end justify-between pt-6 border-b border-gray-100">
                    <div v-for="(item, idx) in stats.salesChartData" :key="idx" class="w-8 flex flex-col items-center gap-1">
                      <div 
                        class="w-5 rounded-t transition-all duration-300 hover:bg-[#1E4B35]"
                        :class="idx === 5 ? 'bg-[#1E4B35]' : 'bg-green-100'"
                        :style="{ height: `${Math.max(10, Math.min(80, (item.value / (stats.totalSales || 1)) * 80))}px` }"
                      ></div>
                      <span class="text-[8px] text-gray-400 font-bold">{{ item.label }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 pt-2 text-[8px] font-bold text-gray-500 justify-end">
                    <span class="w-2 h-2 bg-[#1E4B35] rounded-sm"></span> {{ t.currentSalesDist }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Products & Batches Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Recent Products -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-gray-900 text-xs">{{ t.productsTabTitle }}</h3>
                    <button @click="activeTab = 'products'" class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]" v-html="t.manageAll"></button>
                  </div>
                  <div class="divide-y divide-gray-100">
                    <div v-for="prod in products.slice(0, 3)" :key="prod.id" class="flex items-center justify-between py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                          <img :src="prod.image_url" class="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 class="font-bold text-gray-900 text-[10px] leading-tight">{{ (appStore.lang === 'en' && prod.specifications?.name_en) ? prod.specifications.name_en : prod.name }}</h4>
                          <p class="text-[8px] text-gray-400">{{ prod.category }}</p>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-gray-900 text-[10px]">{{ prod.price?.toLocaleString() }}</div>
                        <span class="bg-green-50 text-green-700 text-[6px] px-1 rounded font-bold border border-green-200">{{ appStore.lang === 'vi' ? 'Hoạt động' : 'Active' }}</span>
                      </div>
                    </div>
                    <div v-if="products.length === 0" class="text-center py-6 text-xs text-gray-400">
                      {{ t.noProductsAdded }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Batches -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-gray-900 text-xs">{{ t.recentBatches }}</h3>
                    <button @click="activeTab = 'batches'" class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]" v-html="t.manageAll"></button>
                  </div>
                  <div class="divide-y divide-gray-100">
                    <div v-for="bat in batches.slice(0, 3)" :key="bat.id" class="flex items-center justify-between py-2.5">
                      <div>
                        <h4 class="font-mono font-bold text-[#1E4B35] text-[10px]">{{ bat.id }}</h4>
                        <p class="text-[8px] text-gray-500">{{ bat.product_name }}</p>
                      </div>
                      <div class="text-right">
                        <span class="bg-green-50 text-green-700 text-[7px] px-1.5 py-0.5 rounded font-bold border border-green-200">{{ bat.status === 'Passed / Verified' && appStore.lang === 'vi' ? 'Đã đạt / Xác minh' : bat.status }}</span>
                        <p class="text-[8px] text-gray-400 mt-0.5">{{ new Date(bat.harvest_date).toLocaleDateString() }}</p>
                      </div>
                    </div>
                    <div v-if="batches.length === 0" class="text-center py-6 text-xs text-gray-400">
                      {{ t.noBatchesCreated }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: PRODUCTS CATALOG (CRUD) -->
          <div v-if="activeTab === 'products'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="font-bold text-gray-900 text-base">{{ t.yourProductCatalog }}</h3>
                  <p class="text-xs text-gray-500">{{ t.productCatalogDesc }}</p>
                </div>
                <button @click="openAddProduct" class="flex items-center gap-1.5 px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
                  <Plus class="w-4 h-4" /> {{ t.addProductBtn }}
                </button>
              </div>

              <!-- Product Table -->
              <div class="border border-gray-150 rounded-2xl overflow-hidden">
                <div class="grid grid-cols-12 bg-gray-50/75 border-b border-gray-150 px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <div class="col-span-5">{{ t.productDetailsCol }}</div>
                  <div class="col-span-3">{{ t.categoryCol }}</div>
                  <div class="col-span-2 text-right">{{ t.priceCol }}</div>
                  <div class="col-span-2 text-right">{{ t.actionsCol }}</div>
                </div>
                <div class="divide-y divide-gray-150">
                  <div v-for="prod in paginatedProducts" :key="prod.id" class="grid grid-cols-12 px-4 py-3.5 text-xs items-center hover:bg-gray-50/30 transition">
                    <div class="col-span-5 flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg overflow-hidden border border-gray-150 flex-shrink-0 bg-gray-50">
                        <img :src="prod.image_url" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-950 text-xs">{{ (appStore.lang === 'en' && prod.specifications?.name_en) ? prod.specifications.name_en : prod.name }}</h4>
                        <p class="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{{ prod.description }}</p>
                      </div>
                    </div>
                    <div class="col-span-3">
                      <span class="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">{{ prod.category }}</span>
                    </div>
                    <div class="col-span-2 text-right font-extrabold text-gray-900">
                      {{ prod.price?.toLocaleString() }}
                    </div>
                    <div class="col-span-2 flex items-center justify-end gap-2">
                      <button @click="openEditProduct(prod)" class="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-gray-50 transition">
                        <Edit class="w-4 h-4" />
                      </button>
                      <button @click="deleteProduct(prod.id)" class="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-50 transition">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div v-if="products.length === 0" class="text-center py-10 text-xs text-gray-400">
                    {{ t.noProductsAddedCatalog }}
                  </div>
                </div>
              </div>

              <!-- Pagination for Products -->
              <div v-if="totalPagesProducts > 1" class="flex justify-center border-t border-gray-150 pt-5 mt-5">
                <div class="flex items-center gap-2">
                  <button 
                    :disabled="productsCurrentPage === 1" 
                    @click="productsCurrentPage--"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft class="w-4 h-4" />
                  </button>
                  
                  <button 
                    v-for="page in totalPagesProducts" 
                    :key="page"
                    @click="productsCurrentPage = page"
                    class="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition"
                    :class="productsCurrentPage === page ? 'bg-[#1E4B35] text-white shadow' : 'text-gray-700 hover:bg-gray-100'"
                  >
                    {{ page }}
                  </button>

                  <button 
                    :disabled="productsCurrentPage === totalPagesProducts" 
                    @click="productsCurrentPage++"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: TRACEABILITY BATCHES (CRUD) -->
          <div v-if="activeTab === 'batches'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="font-bold text-gray-900 text-base">{{ t.traceabilityHarvestBatches }}</h3>
                  <p class="text-xs text-gray-500">{{ t.batchDesc }}</p>
                </div>
                <button @click="openAddBatch" class="flex items-center gap-1.5 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-xs font-bold transition">
                  <Plus class="w-4 h-4" /> {{ t.createBatchBtn }}
                </button>
              </div>

              <!-- Batches Table -->
              <div class="border border-gray-150 rounded-2xl overflow-x-auto">
                <table class="w-full text-left text-xs min-w-[800px]">
                  <thead>
                    <tr class="bg-gray-50/75 border-b border-gray-150 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th class="px-4 py-3">{{ t.batchIdCol }}</th>
                      <th class="px-4 py-3">{{ t.productNameCol }}</th>
                      <th class="px-4 py-3">{{ t.harvestDateCol }}</th>
                      <th class="px-4 py-3">{{ t.locationSourceCol }}</th>
                      <th class="px-4 py-3">{{ t.waterCol }}</th>
                      <th class="px-4 py-3">{{ t.statusCol }}</th>
                      <th class="px-4 py-3 text-right">{{ t.actionsCol }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-150">
                    <tr v-for="bat in paginatedBatches" :key="bat.id" class="hover:bg-gray-50/30 transition">
                      <td class="px-4 py-3 font-mono font-bold text-[#1E4B35]">{{ bat.id }}</td>
                      <td class="px-4 py-3 font-semibold text-gray-900">{{ bat.product_name }}</td>
                      <td class="px-4 py-3 text-gray-600">{{ new Date(bat.harvest_date).toLocaleDateString() }}</td>
                      <td class="px-4 py-3 text-gray-500 max-w-[150px] truncate">{{ bat.location }}</td>
                      <td class="px-4 py-3 font-medium text-gray-700">{{ bat.water_content ? bat.water_content + '%' : '-' }}</td>
                      <td class="px-4 py-3">
                        <span class="bg-green-50 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-green-200">
                          {{ bat.status === 'Passed / Verified' && appStore.lang === 'vi' ? 'Đã đạt / Xác minh' : bat.status }}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-right flex items-center justify-end gap-1.5">
                        <button @click="openQrModal(bat)" title="View QR Code" class="p-1.5 text-gray-450 hover:text-green-700 rounded hover:bg-gray-50 transition">
                          <QrCode class="w-4 h-4" />
                        </button>
                        <button @click="openEditBatch(bat)" class="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-gray-50 transition">
                          <Edit class="w-4 h-4" />
                        </button>
                        <button @click="deleteBatch(bat.id)" class="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-50 transition">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr v-if="batches.length === 0">
                      <td colspan="7" class="text-center py-10 text-xs text-gray-400">
                        {{ t.noBatchesCatalog }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination for Batches -->
              <div v-if="totalPagesBatches > 1" class="flex justify-center border-t border-gray-150 pt-5 mt-5">
                <div class="flex items-center gap-2">
                  <button 
                    :disabled="batchesCurrentPage === 1" 
                    @click="batchesCurrentPage--"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft class="w-4 h-4" />
                  </button>
                  
                  <button 
                    v-for="page in totalPagesBatches" 
                    :key="page"
                    @click="batchesCurrentPage = page"
                    class="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition"
                    :class="batchesCurrentPage === page ? 'bg-[#1E4B35] text-white shadow' : 'text-gray-700 hover:bg-gray-100'"
                  >
                    {{ page }}
                  </button>

                  <button 
                    :disabled="batchesCurrentPage === totalPagesBatches" 
                    @click="batchesCurrentPage++"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 4: SUPPORTING RECORDS -->
          <div v-if="activeTab === 'records'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">{{ t.supportingFarmRecords }}</h3>
                <p class="text-xs text-gray-500">{{ t.recordsDesc }}</p>
              </div>

              <!-- Upload Drag Zone -->
              <div class="border border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50/50 hover:border-[#1E4B35] transition relative cursor-pointer">
                <input type="file" @change="handleFileUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <CloudUpload class="w-10 h-10 text-[#1E4B35] mx-auto mb-3" />
                <h4 class="font-bold text-gray-900 text-sm">{{ t.dragDropText }}</h4>
                <p class="text-xs text-gray-500 mt-1">or <span class="text-[#1E4B35] font-semibold underline">{{ t.orBrowse }}</span></p>
                <span class="text-[10px] text-gray-400 block mt-2">{{ t.supportFilesFormat }}</span>
              </div>

              <!-- File List -->
              <div class="mt-6 border border-gray-150 rounded-2xl overflow-hidden">
                <div class="grid grid-cols-12 bg-gray-50/75 border-b border-gray-150 px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <div class="col-span-6">{{ t.docNameCol }}</div>
                  <div class="col-span-3">{{ t.dateAddedCol }}</div>
                  <div class="col-span-3 text-right">{{ t.statusCol }}</div>
                </div>
                <div class="divide-y divide-gray-150">
                  <div v-for="rec in records" :key="rec.id" class="grid grid-cols-12 px-4 py-3 text-xs items-center hover:bg-gray-50/20 transition">
                    <div class="col-span-6 flex items-center gap-2">
                      <FileText class="w-4 h-4 text-gray-400" />
                      <span class="font-semibold text-gray-800">{{ rec.name }}</span>
                    </div>
                    <div class="col-span-3 text-gray-500">{{ rec.date }}</div>
                    <div class="col-span-3 text-right">
                      <span class="bg-green-50 text-green-700 text-[9px] px-2 py-0.5 rounded font-bold border border-green-200">
                        {{ rec.status === 'Passed / Verified' ? t.statusPassed : rec.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 5: SALES ORDERS -->
          <div v-if="activeTab === 'orders'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">{{ t.orderInvoiced }}</h3>
                <p class="text-xs text-gray-500">{{ t.orderDesc }}</p>
              </div>

              <!-- Orders List -->
              <div class="border border-gray-150 rounded-2xl overflow-hidden divide-y divide-gray-150">
                <div v-for="ord in orders" :key="ord.id" class="p-4 hover:bg-gray-50/20 transition">
                  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{{ t.orderIdCol }}</span>
                      <span class="font-mono font-bold text-[#1E4B35] text-sm">#{{ ord.order_id }}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{{ t.customerCol }}</span>
                      <span class="font-bold text-gray-900">{{ ord.customer_name }}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{{ t.dateCol }}</span>
                      <span class="text-gray-600 font-medium">{{ new Date(ord.created_at).toLocaleDateString() }}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{{ t.totalEarnedCol }}</span>
                      <span class="font-extrabold text-gray-900">{{ (ord.price * ord.quantity).toLocaleString() }} VND</span>
                    </div>
                    <div class="flex items-center">
                      <select 
                        :value="ord.status" 
                        @change="changeOrderStatus(ord.order_id, $event.target.value)"
                        class="bg-green-50 text-[#1E4B35] text-xs px-2.5 py-1 rounded-lg font-bold border border-green-200 focus:outline-none focus:ring-1 focus:ring-[#1E4B35] cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div class="bg-gray-50 rounded-xl p-3 text-xs border border-gray-100 flex justify-between items-center">
                    <span class="text-gray-600">{{ t.productPurchased }} <strong class="text-gray-900">{{ ord.product_name }}</strong></span>
                    <span class="text-gray-600">{{ t.qty }} <strong class="text-gray-900">{{ ord.quantity }}</strong></span>
                  </div>
                </div>
                <div v-if="orders.length === 0" class="text-center py-12 text-xs text-gray-400">
                  {{ t.noOrdersReceived }}
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 6: STORE PROFILE DETAILS -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">{{ t.storeFarmProfile }}</h3>
                <p class="text-xs text-gray-500">{{ t.storeDesc }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Edit Form -->
                <div class="md:col-span-2 space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.farmBrandName }}</label>
                    <input type="text" v-model="myProducer.name" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.location }}</label>
                    <input type="text" v-model="myProducer.location" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.coverProfileImg }}</label>
                    <div class="flex items-center gap-4">
                      <div class="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center relative shadow-inner">
                        <img v-if="myProducer.image_url" :src="myProducer.image_url" class="w-full h-full object-cover" />
                        <span v-else class="text-[10px] text-gray-300">{{ t.noImage }}</span>
                      </div>
                      <div class="space-y-1">
                        <button type="button" @click="triggerStoreImageUpload" :disabled="uploadingStoreImage" class="px-3.5 py-2 bg-white border border-gray-300 hover:border-[#1E4B35] text-gray-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5">
                          <CloudUpload class="w-3.5 h-3.5" />
                          {{ uploadingStoreImage ? t.uploading : t.uploadCoverBtn }}
                        </button>
                        <input type="file" ref="storeImageInput" @change="onStoreImageUpload" class="hidden" accept="image/*" />
                        <p class="text-[9px] text-gray-400">{{ t.jpgPngMax }}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.sloganShortDesc }}</label>
                    <input type="text" v-model="myProducer.description" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.detailedStoryHistory }}</label>
                    <textarea v-model="myProducer.history" rows="5" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none"></textarea>
                  </div>
                  
                  <div class="border-t pt-5 mt-6 space-y-4">
                    <h4 class="font-bold text-gray-900 text-sm mb-3 flex items-center gap-1.5">
                      <span class="w-1.5 h-3 bg-[#1E4B35] rounded-full"></span>
                      {{ appStore.lang === 'vi' ? 'Chi tiết hồ sơ đối tác (Song ngữ Anh - Việt)' : 'Partner Profile Details (Bilingual English - Vietnamese)' }}
                    </h4>
                    
                    <div class="space-y-4">
                      <!-- Farm Name Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Tên Farm (Tiếng Anh)' : 'Farm Name (English)' }}</label>
                          <input type="text" v-model="myProducer.details.farm_name_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Tên Farm (Tiếng Việt)' : 'Farm Name (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.farm_name_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Location Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Địa điểm (Tiếng Anh)' : 'Location (English)' }}</label>
                          <input type="text" v-model="myProducer.details.location_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Địa điểm (Tiếng Việt)' : 'Location (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.location_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Hero Description Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Mô tả nổi bật (Tiếng Anh)' : 'Hero Description (English)' }}</label>
                          <textarea v-model="myProducer.details.hero_desc_en" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none"></textarea>
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Mô tả nổi bật (Tiếng Việt)' : 'Hero Description (Vietnamese)' }}</label>
                          <textarea v-model="myProducer.details.hero_desc_vi" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none"></textarea>
                        </div>
                      </div>

                      <!-- Profile Status Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Trạng thái hồ sơ (Tiếng Anh)' : 'Profile Status (English)' }}</label>
                          <input type="text" v-model="myProducer.details.status_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Trạng thái hồ sơ (Tiếng Việt)' : 'Profile Status (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.status_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Established / Experience Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Năm thành lập (Tiếng Anh)' : 'Established (English)' }}</label>
                          <input type="text" v-model="myProducer.details.established_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Năm thành lập (Tiếng Việt)' : 'Established (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.established_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Kinh nghiệm (Tiếng Anh)' : 'Experience (English)' }}</label>
                          <input type="text" v-model="myProducer.details.experience_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Kinh nghiệm (Tiếng Việt)' : 'Experience (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.experience_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Portfolio / Batches / Records Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Danh mục sản phẩm (Tiếng Anh)' : 'Product Portfolio (English)' }}</label>
                          <input type="text" v-model="myProducer.details.portfolio_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Danh mục sản phẩm (Tiếng Việt)' : 'Product Portfolio (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.portfolio_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Lô hàng mẫu (Tiếng Anh)' : 'Sample Batches (English)' }}</label>
                          <input type="text" v-model="myProducer.details.batches_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Lô hàng mẫu (Tiếng Việt)' : 'Sample Batches (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.batches_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Hồ sơ hỗ trợ (Tiếng Anh)' : 'Supporting Records (English)' }}</label>
                          <input type="text" v-model="myProducer.details.records_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Hồ sơ hỗ trợ (Tiếng Việt)' : 'Supporting Records (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.records_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Main Product Groups Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Nhóm sản phẩm chính (Tiếng Anh)' : 'Main Product Groups (English)' }}</label>
                          <input type="text" v-model="myProducer.details.groups_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Nhóm sản phẩm chính (Tiếng Việt)' : 'Main Product Groups (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.groups_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Producer Model Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Mô hình hoạt động (Tiếng Anh)' : 'Producer Model (English)' }}</label>
                          <input type="text" v-model="myProducer.details.model_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Mô hình hoạt động (Tiếng Việt)' : 'Producer Model (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.model_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <!-- Key Practices 1, 2, 3 Translations -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phương thức cốt lõi 1 (Tiếng Anh)' : 'Key Practice 1 (English)' }}</label>
                          <input type="text" v-model="myProducer.details.practice_1_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phương thức cốt lõi 1 (Tiếng Việt)' : 'Key Practice 1 (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.practice_1_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phương thức cốt lõi 2 (Tiếng Anh)' : 'Key Practice 2 (English)' }}</label>
                          <input type="text" v-model="myProducer.details.practice_2_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phương thức cốt lõi 2 (Tiếng Việt)' : 'Key Practice 2 (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.practice_2_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phương thức cốt lõi 3 (Tiếng Anh)' : 'Key Practice 3 (English)' }}</label>
                          <input type="text" v-model="myProducer.details.practice_3_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                        <div>
                          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">{{ appStore.lang === 'vi' ? 'Phương thức cốt lõi 3 (Tiếng Việt)' : 'Key Practice 3 (Vietnamese)' }}</label>
                          <input type="text" v-model="myProducer.details.practice_3_vi" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button @click="saveProfile" class="flex items-center gap-1.5 px-5 py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
                    <Save class="w-4 h-4" /> {{ t.saveProfileBtn }}
                  </button>
                </div>

                <!-- Preview card -->
                <div v-if="myProducer" class="bg-gray-50 border border-gray-150 rounded-2xl p-5 h-fit text-center space-y-4">
                  <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">{{ t.liveStorePreview }}</span>
                  <div class="relative w-20 h-20 rounded-full overflow-hidden mx-auto border border-gray-200">
                    <img :src="myProducer.image_url" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-sm">{{ myProducer.name }}</h4>
                    <p class="text-[10px] text-gray-500 mt-1 flex items-center justify-center gap-1">
                      <MapPin class="w-3 h-3 text-gray-400" /> {{ myProducer.location }}
                    </p>
                  </div>
                  <p class="text-[10px] text-gray-600 italic mt-2 border-t border-gray-200/50 pt-3">
                    "{{ myProducer.description }}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 7: MESSAGES CHAT INBOX -->
          <div v-if="activeTab === 'messages'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">{{ t.customerInquiries }}</h3>
                <p class="text-xs text-gray-500">{{ t.inquiriesDesc }}</p>
              </div>

              <!-- Message Inbox -->
              <div class="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-2xl overflow-hidden min-h-[400px]">
                <!-- Senders List -->
                <div class="border-r border-gray-200 divide-y divide-gray-100 bg-gray-50/50">
                  <div v-for="msg in messages" :key="msg.id" class="p-4 cursor-pointer hover:bg-gray-150/20 transition flex justify-between items-start">
                    <div>
                      <h4 class="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                        {{ msg.sender }}
                        <span v-if="!msg.read" class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      </h4>
                      <p class="text-[10px] text-gray-500 line-clamp-1 mt-1">{{ msg.text }}</p>
                    </div>
                    <span class="text-[8px] text-gray-400 font-bold whitespace-nowrap">{{ msg.date.split(',')[0] }}</span>
                  </div>
                </div>

                <!-- Chat Details pane -->
                <div class="md:col-span-2 flex flex-col justify-between p-6 bg-white space-y-4">
                  <div class="space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <h4 class="font-bold text-xs text-gray-900">Minh Quan</h4>
                        <span class="text-[9px] text-green-600 font-semibold">&bull; {{ t.online }}</span>
                      </div>
                      <span class="text-[9px] text-gray-400 font-semibold">{{ t.inquiryDate.replace('{date}', 'May 19, 2026') }}</span>
                    </div>

                    <!-- Conversation bubble -->
                    <div class="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                      <div class="flex flex-col space-y-1 text-left items-start max-w-[80%]">
                        <div class="bg-gray-100 text-gray-800 p-2.5 rounded-2xl text-xs">
                          {{ appStore.lang === 'vi' ? 'Chào bạn! Tôi có thể mua trực tiếp gạo ST25 loại túi 10kg trực tiếp không, hay bạn chỉ bán túi hút chân không 2kg mặc định?' : 'Hello! Can I purchase ST25 rice in 10kg bags directly, or do you only sell in the default 2kg vacuum packs?' }}
                        </div>
                        <span class="text-[8px] text-gray-400 font-semibold pl-2">10:15 AM</span>
                      </div>
                    </div>
                  </div>

                  <!-- Reply Box -->
                  <div class="flex gap-2">
                    <input type="text" :placeholder="t.typeResponse" class="flex-grow px-3.5 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                    <button class="px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">{{ t.sendBtn }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 8: CONTACT SUPPORT -->
          <div v-if="activeTab === 'support'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">{{ t.contactSupportTitle }}</h3>
                <p class="text-xs text-gray-500">{{ t.supportDesc }}</p>
              </div>

              <div class="max-w-xl space-y-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.inquiryCategory }}</label>
                  <select v-model="supportForm.category" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none">
                    <option>{{ appStore.lang === 'en' ? 'General Inquiry' : 'Yêu cầu chung' }}</option>
                    <option>{{ appStore.lang === 'en' ? 'Batch Traceability Review' : 'Đánh giá truy xuất nguồn gốc lô hàng' }}</option>
                    <option>{{ appStore.lang === 'en' ? 'Verification Status' : 'Trạng thái xác minh' }}</option>
                    <option>{{ appStore.lang === 'en' ? 'Product Listing Help' : 'Trợ giúp niêm yết sản phẩm' }}</option>
                    <option>{{ appStore.lang === 'en' ? 'Order & Payout Questions' : 'Câu hỏi về đơn hàng & thanh toán' }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.subject }}</label>
                  <input type="text" v-model="supportForm.subject" :placeholder="appStore.lang === 'en' ? 'Summary of the issue' : 'Tóm tắt vấn đề'" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">{{ t.messageDetails }}</label>
                  <textarea v-model="supportForm.message" rows="5" :placeholder="appStore.lang === 'en' ? 'Explain the problem in detail so our team can assist you...' : 'Giải thích chi tiết vấn đề để đội ngũ của chúng tôi có thể hỗ trợ bạn...'" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none"></textarea>
                </div>
                <button @click="submitSupport" class="flex items-center gap-1.5 px-5 py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
                  <Save class="w-4 h-4" /> {{ t.submitTicketBtn }}
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Impact Statement Banner -->
          <div class="bg-[#F0FDF4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div class="md:w-3/5 space-y-4 text-left">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[#1E4B35]"><Leaf class="w-5 h-5"/></div>
              <h3 class="font-bold text-[#1E4B35] text-base">{{ t.yourImpactTitle }}</h3>
              <p class="text-green-800 text-[11px] leading-relaxed">
                {{ t.yourImpactDesc }}
              </p>
            </div>
            
            <div class="md:w-2/5 border-t md:border-t-0 md:border-l border-green-200/50 pt-6 md:pt-0 pl-0 md:pl-8 flex flex-col justify-between">
              <p class="text-green-900 text-xs italic font-medium leading-relaxed mb-4">
                {{ t.quoteText }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- PRODUCT ADD/EDIT MODAL -->
    <div v-if="productModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative space-y-4 border border-gray-100">
        <button @click="productModalOpen = false" class="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition text-gray-400">
          <X class="w-4 h-4" />
        </button>
        <h3 class="font-bold text-gray-900 text-base">{{ editingProduct ? t.editProductDetails : t.addNewProduct }}</h3>
        
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-gray-700 mb-1">{{ t.productName }}</label>
            <input type="text" v-model="productForm.name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ appStore.lang === 'vi' ? 'Tên tiếng Anh' : 'English Name' }}</label>
              <input type="text" v-model="productForm.specifications.name_en" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ appStore.lang === 'vi' ? 'Quy cách' : 'Specification / Size' }}</label>
              <input type="text" v-model="productForm.specifications.size" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.category }}</label>
              <select v-model="productForm.category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]">
                <option>Honey</option>
                <option>Rice</option>
                <option>Tea</option>
                <option>Vegetables</option>
                <option>Fruits</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.priceVnd }}</label>
              <input type="number" v-model="productForm.price" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">{{ t.description }}</label>
            <textarea v-model="productForm.description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]"></textarea>
          </div>
          <!-- Main Image Upload -->
          <div>
            <label class="block font-bold text-gray-700 mb-1">{{ t.mainProductImg }}</label>
            <div class="flex items-center gap-3">
              <div class="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 relative shadow-inner">
                <img v-if="productForm.image_url" :src="productForm.image_url" class="w-full h-full object-cover" />
                <span v-else class="text-[10px] text-gray-300">{{ t.noImage }}</span>
              </div>
              <div class="space-y-1">
                <button type="button" @click="triggerMainImageUpload" :disabled="uploadingMainImage" class="px-3 py-1.5 bg-white border border-gray-300 hover:border-[#1E4B35] text-gray-700 text-xs font-bold rounded-lg transition flex items-center gap-1">
                  <CloudUpload class="w-3.5 h-3.5" />
                  {{ uploadingMainImage ? t.uploading : t.upload }}
                </button>
                <input type="file" ref="mainImageInput" @change="onMainImageUpload" class="hidden" accept="image/*" />
                <p class="text-[9px] text-gray-400">{{ t.jpgPngMax }}</p>
              </div>
            </div>
          </div>

          <!-- Detail Images Upload -->
          <div>
            <label class="block font-bold text-gray-700 mb-1">{{ t.detailImages }}</label>
            <div class="grid grid-cols-5 gap-2 mb-2">
              <div v-for="(imgUrl, idx) in productForm.specifications?.detail_images || []" :key="idx" class="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img :src="imgUrl" class="w-full h-full object-cover" />
                <button type="button" @click="removeDetailImage(idx)" class="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                  <X class="w-3 h-3" />
                </button>
              </div>
              <button type="button" v-if="(!productForm.specifications?.detail_images || productForm.specifications.detail_images.length < 5)" @click="triggerDetailImageUpload" :disabled="uploadingDetailImage" class="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#1E4B35] hover:text-[#1E4B35] transition">
                <Plus class="w-4 h-4" />
                <span class="text-[8px] mt-0.5">{{ uploadingDetailImage ? '...' : t.upload }}</span>
              </button>
              <input type="file" ref="detailImageInput" @change="onDetailImageUpload" class="hidden" accept="image/*" />
            </div>
            <p class="text-[9px] text-gray-400">{{ t.galleryPhotosDesc }}</p>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="productModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition">{{ t.cancel }}</button>
          <button @click="submitProduct" class="px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">{{ t.submitProduct }}</button>
        </div>
      </div>
    </div>

    <!-- BATCH ADD/EDIT MODAL -->
    <div v-if="batchModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative space-y-4 border border-gray-100">
        <button @click="batchModalOpen = false" class="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition text-gray-400">
          <X class="w-4 h-4" />
        </button>
        <h3 class="font-bold text-gray-900 text-base">{{ editingBatch ? t.editBatchDetails : t.createTraceBatch }}</h3>
        
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.batchCodeId }}</label>
              <input type="text" v-model="batchForm.id" :disabled="editingBatch !== null" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35] disabled:bg-gray-50 disabled:text-gray-400 font-mono font-bold" />
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.linkedProduct }}</label>
              <select v-model="batchForm.product_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]">
                <option v-for="prod in products" :key="prod.id" :value="prod.id">{{ prod.name }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.harvestDate }}</label>
              <input type="date" v-model="batchForm.harvest_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.locationHarvest }}</label>
              <input type="text" v-model="batchForm.location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">{{ t.speciesBotanical }}</label>
            <input type="text" v-model="batchForm.species_source" placeholder="e.g. ST25 Rice, Wild Melaleuca Flower Honey" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
          </div>

          <div class="border-t border-gray-150 pt-3 space-y-3">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{{ t.labAnalysisSpecs }}</span>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block font-medium text-gray-500 mb-0.5">{{ t.waterContentPct }}</label>
                <input type="number" step="0.1" v-model="batchForm.water_content" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
              </div>
              <div>
                <label class="block font-medium text-gray-500 mb-0.5">{{ t.hmfContent }}</label>
                <input type="number" step="0.1" v-model="batchForm.hmf_content" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
              </div>
              <div>
                <label class="block font-medium text-gray-500 mb-0.5">{{ t.diastaseActivity }}</label>
                <input type="number" step="0.1" v-model="batchForm.diastase_activity" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
              </div>
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">{{ t.adulterationPurity }}</label>
              <input type="text" v-model="batchForm.adulteration_test" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="batchModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition">{{ t.cancel }}</button>
          <button @click="submitBatch" class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-xs font-bold transition">{{ t.submitBatchBtn }}</button>
        </div>
      </div>
    </div>
    <!-- BATCH QR CODE MODAL -->
    <div v-if="qrModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-3xl p-6 w-full max-sm shadow-2xl relative space-y-4 border border-gray-100 text-center">
        <button @click="qrModalOpen = false" class="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition text-gray-400">
          <X class="w-4 h-4" />
        </button>
        <div class="w-12 h-12 bg-green-50 text-[#1E4B35] rounded-full flex items-center justify-center mx-auto mb-2">
          <QrCode class="w-6 h-6" />
        </div>
        <h3 class="font-bold text-gray-900 text-base">{{ t.batchQrTitle }}</h3>
        <p class="text-xs text-gray-500">{{ t.batchQrDesc }}</p>
        
        <div class="p-4 bg-gray-50 rounded-2xl border border-gray-200 inline-block mx-auto shadow-inner">
          <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(selectedBatchUrl)" class="w-44 h-44 object-contain" />
        </div>
        
        <div class="text-[10px] text-gray-450 font-mono break-all bg-gray-100 py-1.5 px-3 rounded-lg border border-gray-200">
          {{ selectedBatchUrl }}
        </div>
        
        <div class="flex justify-center gap-2 pt-2">
          <button @click="qrModalOpen = false" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
            {{ t.done }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { 
  MapPin, LayoutDashboard, Package, Layers, FileText, ShoppingBag, 
  Store, MessageSquare, HelpCircle, Calendar, ShieldAlert, CloudUpload, 
  FlaskConical, Award, Leaf, BookOpen, Video, Users, ShieldCheck, Lock,
  Plus, Trash2, Edit, Save, X, ChevronDown, ChevronUp, CheckCircle, AlertCircle, QrCode, ChevronLeft, ChevronRight
} from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const activeTab = ref('overview')
const loading = ref(true)
const myProducer = ref(null)
const stats = ref({})

// Data Lists
const products = ref([])
const batches = ref([])
const orders = ref([])
const records = ref([
  { id: 1, name: 'VietGAP Certificate 2026.pdf', type: 'Certificate', date: '2026-05-10', status: 'Passed / Verified' },
  { id: 2, name: 'Lab Report LOT-UMH-2605-001.pdf', type: 'Lab Report', date: '2026-05-17', status: 'Passed / Verified' }
])

// Pagination state
const productsPerPage = ref(5)
const productsCurrentPage = ref(1)

const batchesPerPage = ref(5)
const batchesCurrentPage = ref(1)

const totalPagesProducts = computed(() => {
  return Math.ceil(products.value.length / productsPerPage.value) || 1
})

const paginatedProducts = computed(() => {
  const start = (productsCurrentPage.value - 1) * productsPerPage.value
  return products.value.slice(start, start + productsPerPage.value)
})

const totalPagesBatches = computed(() => {
  return Math.ceil(batches.value.length / batchesPerPage.value) || 1
})

const paginatedBatches = computed(() => {
  const start = (batchesCurrentPage.value - 1) * batchesPerPage.value
  return batches.value.slice(start, start + batchesPerPage.value)
})

watch(products, () => {
  if (productsCurrentPage.value > totalPagesProducts.value) {
    productsCurrentPage.value = Math.max(1, totalPagesProducts.value)
  }
}, { deep: true })

watch(batches, () => {
  if (batchesCurrentPage.value > totalPagesBatches.value) {
    batchesCurrentPage.value = Math.max(1, totalPagesBatches.value)
  }
}, { deep: true })

const messages = computed(() => {
  const isVi = appStore.lang === 'vi'
  return [
    { id: 1, sender: 'Minh Quan', text: isVi ? 'Tôi có thể mua trực tiếp gạo ST25 loại túi 10kg không?' : 'Can I purchase ST25 rice in 10kg bags?', date: 'May 19, 10:15 AM', read: false },
    { id: 2, sender: 'Hanh Nguyen', text: isVi ? 'Mật ong rừng của bạn có pha thêm đường không?' : 'Does your wild honey contain any added sugars?', date: 'May 18, 04:30 PM', read: true },
    { id: 3, sender: 'Hoang Lam', text: isVi ? 'Tôi muốn tham quan trại ong của bạn. Bạn có tổ chức tour không?' : 'I would like to visit your bee farm. Do you host tours?', date: 'May 17, 02:10 PM', read: true }
  ]
})

// Forms & Modals
const productModalOpen = ref(false)
const editingProduct = ref(null)
const productForm = ref({
  name: '',
  description: '',
  price: 0,
  category: 'Honey',
  image_url: '',
  specifications: {
    detail_images: [],
    name_en: '',
    size: '',
    batch: ''
  }
})

// Image Upload State
const uploadingMainImage = ref(false)
const uploadingDetailImage = ref(false)
const uploadingStoreImage = ref(false)
const mainImageInput = ref(null)
const detailImageInput = ref(null)
const storeImageInput = ref(null)

// QR Code State
const qrModalOpen = ref(false)
const selectedBatchUrl = ref('')

const batchModalOpen = ref(false)
const editingBatch = ref(null)
const batchForm = ref({
  id: '',
  product_id: '',
  harvest_date: '',
  location: '',
  species_source: '',
  status: 'Passed / Verified',
  water_content: 14.5,
  hmf_content: 8.0,
  diastase_activity: 10.5,
  adulteration_test: 'Negative / Pure'
})

const supportForm = ref({
  subject: '',
  category: 'General Inquiry',
  message: ''
})

const tabs = computed(() => {
  const isVi = appStore.lang === 'vi'
  return [
    { id: 'overview', name: isVi ? 'Tổng quan' : 'Overview', icon: LayoutDashboard },
    { id: 'products', name: isVi ? 'Sản phẩm' : 'Products', icon: Package },
    { id: 'batches', name: isVi ? 'Lô hàng' : 'Batches', icon: Layers },
    { id: 'records', name: isVi ? 'Tài liệu hỗ trợ' : 'Supporting Records', icon: FileText },
    { id: 'orders', name: isVi ? 'Đơn hàng' : 'Orders', icon: ShoppingBag },
    { id: 'profile', name: isVi ? 'Hồ sơ cửa hàng' : 'Store Profile', icon: Store },
    { id: 'messages', name: isVi ? 'Tin nhắn' : 'Messages', icon: MessageSquare },
    { id: 'support', name: isVi ? 'Hỗ trợ' : 'Support', icon: HelpCircle }
  ]
})

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    syncText: 'Đang đồng bộ hóa thông tin chi tiết...',
    verifiedProducer: 'Nhà sản xuất đã xác minh',
    viewStoreProfile: 'Xem hồ sơ cửa hàng &rarr;',
    dashboardTitle: 'Bảng điều khiển Nhà sản xuất',
    welcomeBack: 'Chào mừng trở lại, {name}! Quản lý sản phẩm, truy xuất lô hàng và hoàn thành đơn hàng.',
    dataSyncDb: 'Dữ liệu được đồng bộ từ Neon DB',
    totalProducts: 'Tổng số sản phẩm',
    manageProducts: 'Quản lý sản phẩm &rarr;',
    activeBatches: 'Lô hàng hoạt động',
    viewBatches: 'Xem lô hàng &rarr;',
    documents: 'Tài liệu',
    viewRecords: 'Xem hồ sơ &rarr;',
    totalOrders: 'Tổng đơn hàng',
    viewOrders: 'Xem đơn hàng &rarr;',
    todaysTasks: 'Nhiệm vụ hôm nay',
    task1Title: 'Tải lên nhật ký lô hàng tiếp theo',
    task1Priority: 'Ưu tiên cao',
    task1Desc: 'Hoàn thành nhật ký lô hàng mật ong tiếp theo để truy xuất nguồn gốc.',
    task2Title: 'Xem xét báo cáo kiểm nghiệm mẫu',
    task2Priority: 'Ưu tiên trung bình',
    task2Desc: 'Xác minh các phép đo hàm lượng nước cho đợt thu hoạch gần đây.',
    task3Title: 'Phản hồi yêu cầu của khách hàng',
    task3Priority: 'Ưu tiên thấp',
    task3Desc: 'Kiểm tra hộp thư để biết các yêu cầu liên quan đến chứng nhận lô gạo ST25.',
    viewAllMessages: 'Xem tất cả tin nhắn &rarr;',
    revenueAnalytics: 'Phân tích doanh thu',
    sixMonthOverview: '(Tổng quan 6 tháng)',
    totalRevenue: 'Tổng doanh thu',
    avgOrdersMonth: 'Đơn hàng trung bình / Tháng',
    monthlySalesValue: 'Phân bổ giá trị doanh số hàng tháng',
    currentSalesDist: 'Phân bổ doanh số hiện tại',
    productsTabTitle: 'Sản phẩm',
    manageAll: 'Quản lý tất cả &rarr;',
    noProductsAdded: 'Chưa có sản phẩm nào được thêm. Nhấp vào tab \'Sản phẩm\' để thêm sản phẩm đầu tiên.',
    recentBatches: 'Lô hàng gần đây',
    noBatchesCreated: 'Chưa có lô hàng truy xuất nguồn gốc nào được tạo.',
    yourProductCatalog: 'Danh mục sản phẩm của bạn',
    productCatalogDesc: 'Thêm, sửa hoặc xóa các sản phẩm nông nghiệp được bán trên Green Trace',
    addProductBtn: 'Thêm sản phẩm',
    productDetailsCol: 'Chi tiết sản phẩm',
    categoryCol: 'Danh mục',
    priceCol: 'Giá (VND)',
    actionsCol: 'Hành động',
    noProductsAddedCatalog: 'Chưa có sản phẩm nào được thêm. Nhấp "+ Thêm sản phẩm" để đăng sản phẩm đầu tiên.',
    traceabilityHarvestBatches: 'Truy xuất nguồn gốc & Lô hàng thu hoạch',
    batchDesc: 'Ghi lại chi tiết lô nông nghiệp, kết quả kiểm nghiệm và các chỉ số nguồn gốc',
    createBatchBtn: 'Tạo lô hàng',
    batchIdCol: 'Mã lô hàng',
    productNameCol: 'Tên sản phẩm',
    harvestDateCol: 'Ngày thu hoạch',
    locationSourceCol: 'Nguồn địa điểm',
    waterCol: 'Nước',
    statusCol: 'Trạng thái',
    noBatchesCatalog: 'Chưa có hồ sơ truy xuất nguồn gốc lô hàng nào. Nhấp "+ Tạo lô hàng" để bắt đầu.',
    supportingFarmRecords: 'Tài liệu trang trại hỗ trợ',
    recordsDesc: 'Tải lên và liên kết các tài liệu quy định, chứng nhận và kiểm tra tuân thủ',
    dragDropText: 'Kéo & thả tập tin vào đây để tải lên',
    orBrowse: 'hoặc duyệt thư mục',
    supportFilesFormat: 'Hỗ trợ tập tin PDF, JPG hoặc PNG tối đa 10MB',
    docNameCol: 'Tên tài liệu',
    dateAddedCol: 'Ngày thêm',
    statusPassed: 'Đã đạt / Xác minh',
    orderInvoiced: 'Đơn hàng của khách hàng',
    orderDesc: 'Theo dõi và hoàn thành đơn hàng chứa sản phẩm từ trang trại của bạn',
    orderIdCol: 'Mã đơn hàng',
    customerCol: 'Khách hàng',
    dateCol: 'Ngày',
    totalEarnedCol: 'Tổng doanh thu',
    productPurchased: 'Sản phẩm đã mua:',
    qty: 'Số lượng:',
    noOrdersReceived: 'Chưa nhận được đơn đặt hàng nào cho sản phẩm của bạn.',
    storeFarmProfile: 'Hồ sơ Cửa hàng & Trang trại',
    storeDesc: 'Chỉnh sửa thông tin hiển thị cho người mua hàng trên các lượt xem chi tiết truy xuất nguồn gốc công khai',
    farmBrandName: 'Tên Trang trại / Thương hiệu',
    location: 'Địa điểm',
    coverProfileImg: 'Ảnh bìa / Ảnh đại diện',
    noImage: 'Không có ảnh',
    uploadCoverBtn: 'Tải lên ảnh bìa',
    uploading: 'Đang tải lên...',
    jpgPngMax: 'JPG, PNG tối đa 10MB',
    sloganShortDesc: 'Khẩu hiệu / Mô tả ngắn',
    detailedStoryHistory: 'Câu chuyện chi tiết & Lịch sử',
    saveProfileBtn: 'Lưu chi tiết hồ sơ',
    liveStorePreview: 'Bản xem trước trực tiếp',
    customerInquiries: 'Yêu cầu của khách hàng',
    inquiriesDesc: 'Đọc và phản hồi các câu hỏi về sản phẩm do khách hàng gửi trên Green Trace',
    online: 'Trực tuyến',
    inquiryDate: 'Ngày yêu cầu: {date}',
    typeResponse: 'Nhập câu trả lời của bạn...',
    sendBtn: 'Gửi',
    contactSupportTitle: 'Liên hệ Hỗ trợ Green Trace',
    supportDesc: 'Cần hỗ trợ giải quyết sự cố, đánh giá lô hàng hoặc các câu hỏi xác minh?',
    inquiryCategory: 'Danh mục yêu cầu',
    subject: 'Tiêu đề',
    messageDetails: 'Chi tiết tin nhắn',
    submitTicketBtn: 'Gửi phiếu hỗ trợ',
    yourImpactTitle: 'Tác động của bạn với Green Trace',
    yourImpactDesc: 'Bạn đang góp phần xây dựng một hệ thống thực phẩm minh bạch, bền vững và hỗ trợ nông nghiệp có trách nhiệm tại Việt Nam.',
    quoteText: '"Chúng tôi tin tưởng vào thực phẩm trung thực và hệ sinh thái lành mạnh. Cảm ơn bạn đã giúp chúng tôi kết nối với những khách hàng quan tâm đến chất lượng và tính minh bạch."',
    editProductDetails: 'Chỉnh sửa chi tiết sản phẩm',
    addNewProduct: 'Thêm sản phẩm mới',
    productName: 'Tên sản phẩm',
    category: 'Danh mục',
    priceVnd: 'Giá (VND)',
    description: 'Mô tả',
    mainProductImg: 'Ảnh sản phẩm chính *',
    detailImages: 'Ảnh chi tiết sản phẩm (Nhiều ảnh)',
    upload: 'Tải lên',
    galleryPhotosDesc: 'Tải lên tối đa 5 ảnh thư viện chi tiết bổ sung',
    cancel: 'Hủy',
    submitProduct: 'Gửi sản phẩm',
    editBatchDetails: 'Chỉnh sửa chi tiết lô hàng',
    createTraceBatch: 'Tạo lô hàng truy xuất nguồn gốc',
    batchCodeId: 'Mã / ID lô hàng',
    linkedProduct: 'Sản phẩm liên kết',
    harvestDate: 'Ngày thu hoạch',
    locationHarvest: 'Địa điểm thu hoạch',
    speciesBotanical: 'Loài / Nguồn thực vật',
    labAnalysisSpecs: 'Thông số phân tích phòng thí nghiệm',
    waterContentPct: 'Hàm lượng nước (%)',
    hmfContent: 'Hàm lượng HMF (mg/kg)',
    diastaseActivity: 'Hoạt tính Diastase (Schade)',
    adulterationPurity: 'Trạng thái kiểm tra độ tinh khiết / tạp chất',
    submitBatchBtn: 'Gửi lô hàng',
    batchQrTitle: 'Mã QR truy xuất nguồn gốc lô hàng',
    batchQrDesc: 'Quét mã này bằng điện thoại di động để xem toàn bộ hành trình thu hoạch và kiểm nghiệm của lô hàng.',
    done: 'Hoàn tất'
  } : {
    syncText: 'Synchronizing workspace details...',
    verifiedProducer: 'Verified Producer',
    viewStoreProfile: 'View Store Profile &rarr;',
    dashboardTitle: 'Producer Dashboard',
    welcomeBack: 'Welcome back, {name}! Manage products, trace batches, and fulfill orders.',
    dataSyncDb: 'Data synchronized from Neon DB',
    totalProducts: 'Total Products',
    manageProducts: 'Manage products &rarr;',
    activeBatches: 'Active Batches',
    viewBatches: 'View batches &rarr;',
    documents: 'Documents',
    viewRecords: 'View records &rarr;',
    totalOrders: 'Total Sales Orders',
    viewOrders: 'View orders &rarr;',
    todaysTasks: 'Today\'s Tasks',
    task1Title: 'Upload next batch record',
    task1Priority: 'High Priority',
    task1Desc: 'Complete your next honey batch record for traceability.',
    task2Title: 'Review sample lab report',
    task2Priority: 'Medium Priority',
    task2Desc: 'Verify water content measurements for recent harvest.',
    task3Title: 'Respond to customer inquiry',
    task3Priority: 'Low Priority',
    task3Desc: 'Check inbox for inquiries regarding ST25 rice batch certification.',
    viewAllMessages: 'View all messages &rarr;',
    revenueAnalytics: 'Revenue Analytics',
    sixMonthOverview: '(6-Month Overview)',
    totalRevenue: 'Total Revenue',
    avgOrdersMonth: 'Avg Orders / Month',
    monthlySalesValue: 'Monthly Sales Value Distribution',
    currentSalesDist: 'Current Sales Distribution',
    productsTabTitle: 'Products',
    manageAll: 'Manage all &rarr;',
    noProductsAdded: 'No products added yet. Click \'Products\' tab to add your first.',
    recentBatches: 'Recent Batches',
    noBatchesCreated: 'No traceability batches created yet.',
    yourProductCatalog: 'Your Product Catalog',
    productCatalogDesc: 'Add, edit, or delete agricultural products sold on Green Trace',
    addProductBtn: 'Add Product',
    productDetailsCol: 'Product Details',
    categoryCol: 'Category',
    priceCol: 'Price (VND)',
    actionsCol: 'Actions',
    noProductsAddedCatalog: 'No products added yet. Click "+ Add Product" to publish your first.',
    traceabilityHarvestBatches: 'Traceability & Harvest Batches',
    batchDesc: 'Record agricultural lot details, test results, and source metrics',
    createBatchBtn: 'Create Batch',
    batchIdCol: 'Batch ID',
    productNameCol: 'Product Name',
    harvestDateCol: 'Harvest Date',
    locationSourceCol: 'Location Source',
    waterCol: 'Water',
    statusCol: 'Status',
    noBatchesCatalog: 'No batch traceability records exist yet. Click "+ Create Batch" to seed one.',
    supportingFarmRecords: 'Supporting Farm Records',
    recordsDesc: 'Upload and link regulatory documents, certificates, and compliance checks',
    dragDropText: 'Drag & drop files here to upload',
    orBrowse: 'or browse directories',
    supportFilesFormat: 'Supports PDF, JPG, or PNG files up to 10MB',
    docNameCol: 'Document Name',
    dateAddedCol: 'Date Added',
    statusPassed: 'Passed / Verified',
    orderInvoiced: 'Invoiced Customer Orders',
    orderDesc: 'Track and fulfill sales orders containing your farm products',
    orderIdCol: 'Order ID',
    customerCol: 'Customer',
    dateCol: 'Date',
    totalEarnedCol: 'Total Earned',
    productPurchased: 'Product purchased:',
    qty: 'Qty:',
    noOrdersReceived: 'No purchase orders have been received yet for your products.',
    storeFarmProfile: 'Store & Farm Profile',
    storeDesc: 'Edit information shown to shoppers on public traceability detail views',
    farmBrandName: 'Farm / Brand Name',
    location: 'Location',
    coverProfileImg: 'Cover / Profile Image',
    noImage: 'No Image',
    uploadCoverBtn: 'Upload Cover Image',
    uploading: 'Uploading...',
    jpgPngMax: 'JPG, PNG up to 10MB',
    sloganShortDesc: 'Slogan / Short Description',
    detailedStoryHistory: 'Detailed Story & History',
    saveProfileBtn: 'Save Profile Details',
    liveStorePreview: 'Live Store Preview',
    customerInquiries: 'Customer Inquiries',
    inquiriesDesc: 'Read and respond to product queries sent by customers on Green Trace',
    online: 'Online',
    inquiryDate: 'Inquiry date: {date}',
    typeResponse: 'Type your response...',
    sendBtn: 'Send',
    contactSupportTitle: 'Contact Green Trace Support',
    supportDesc: 'Need help resolving an issue, batch reviews, or verification questions?',
    inquiryCategory: 'Inquiry Category',
    subject: 'Subject',
    messageDetails: 'Message Details',
    submitTicketBtn: 'Submit Support Ticket',
    yourImpactTitle: 'Your Impact with Green Trace',
    yourImpactDesc: 'You are contributing to a transparent, sustainable food system and supporting responsible agriculture in Viet Nam.',
    quoteText: '"We believe in honest food and healthy ecosystems. Thank you for helping us connect with customers who care about quality and transparency."',
    editProductDetails: 'Edit Product Details',
    addNewProduct: 'Add New Product',
    productName: 'Product Name',
    category: 'Category',
    priceVnd: 'Price (VND)',
    description: 'Description',
    mainProductImg: 'Main Product Image *',
    detailImages: 'Product Detail Images (Multiple)',
    upload: 'Upload',
    galleryPhotosDesc: 'Upload up to 5 additional detail gallery photos',
    cancel: 'Cancel',
    submitProduct: 'Submit Product',
    editBatchDetails: 'Edit Batch Details',
    createTraceBatch: 'Create Traceability Batch',
    batchCodeId: 'Batch Code / ID',
    linkedProduct: 'Linked Product',
    harvestDate: 'Harvest Date',
    locationHarvest: 'Location of Harvest',
    speciesBotanical: 'Species / Botanical Source',
    labAnalysisSpecs: 'Lab Analysis Specs',
    waterContentPct: 'Water Content (%)',
    hmfContent: 'HMF Content (mg/kg)',
    diastaseActivity: 'Diastase (Schade)',
    adulterationPurity: 'Adulteration / Purity Test Status',
    submitBatchBtn: 'Submit Batch',
    batchQrTitle: 'Batch Traceability QR Code',
    batchQrDesc: 'Scan this code with a mobile phone to see the full batch harvest and lab testing journey.',
    done: 'Done'
  }
})

const loadData = async () => {
  loading.value = true
  try {
    // 1. Fetch all producers to locate the current logged-in user's profile
    const producersList = await appStore.fetchProducers()
    myProducer.value = producersList.find(p => p.user_id === appStore.user?.id)
    
    if (!myProducer.value) {
      appStore.triggerToast('Producer profile not found. Please onboard first.')
      router.push('/partner')
      return
    }

    myProducer.value.details = myProducer.value.details || {}

    // 2. Fetch stats
    stats.value = await appStore.fetchProducerStats()

    // 3. Fetch products
    products.value = await appStore.fetchProducts('', '', myProducer.value.id)

    // 4. Fetch batches
    batches.value = await appStore.fetchBatches(myProducer.value.id)

    // 5. Fetch orders (Recent items sold)
    orders.value = stats.value.recentOrders || []
  } catch (error) {
    console.error('Failed to load producer data:', error)
    appStore.triggerToast('Error loading producer dashboard.')
  } finally {
    loading.value = false
  }
}

// Product CRUD
const openAddProduct = () => {
  editingProduct.value = null
  productForm.value = {
    name: '',
    description: '',
    price: 0,
    category: 'Honey',
    image_url: '',
    specifications: {
      detail_images: [],
      name_en: '',
      size: '',
      batch: ''
    }
  }
  productModalOpen.value = true
}

const openEditProduct = (prod) => {
  editingProduct.value = prod
  const specs = JSON.parse(JSON.stringify(prod.specifications || {}))
  if (!specs.detail_images) {
    specs.detail_images = []
  }
  if (!specs.name_en) specs.name_en = ''
  if (!specs.size) specs.size = ''
  if (!specs.batch) specs.batch = ''
  productForm.value = {
    name: prod.name,
    description: prod.description,
    price: prod.price,
    category: prod.category,
    image_url: prod.image_url,
    specifications: specs
  }
  productModalOpen.value = true
}

const submitProduct = async () => {
  try {
    if (editingProduct.value) {
      await appStore.updateProduct(editingProduct.value.id, productForm.value)
      appStore.triggerToast(appStore.lang === 'vi' ? 'Cập nhật sản phẩm thành công!' : 'Product updated successfully!')
    } else {
      await appStore.createProduct(productForm.value)
      appStore.triggerToast(appStore.lang === 'vi' ? 'Tạo sản phẩm thành công!' : 'Product created successfully!')
    }
    productModalOpen.value = false
    await loadData()
  } catch (error) {
    appStore.triggerToast(error.message || 'Failed to submit product.')
  }
}

const changeOrderStatus = async (orderId, newStatus) => {
  try {
    await appStore.updateOrderStatus(orderId, newStatus)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Cập nhật trạng thái đơn hàng thành công!' : 'Order status updated successfully!')
    await loadData()
  } catch (error) {
    console.error('Failed to update order status:', error)
    appStore.triggerToast(error.message || 'Failed to update order status.')
  }
}

const deleteProduct = async (id) => {
  const confirmMsg = appStore.lang === 'vi' ? 'Bạn có chắc chắn muốn xóa sản phẩm này không?' : 'Are you sure you want to delete this product?'
  if (!await appStore.triggerConfirm(confirmMsg)) return
  try {
    await appStore.deleteProduct(id)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Xóa sản phẩm thành công!' : 'Product deleted successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to delete product.')
  }
}

// Batch CRUD
const openAddBatch = () => {
  editingBatch.value = null
  batchForm.value = {
    id: `LOT-${myProducer.value.name.substring(0, 3).toUpperCase()}-${new Date().toISOString().slice(2, 4)}${new Date().toISOString().slice(5, 7)}-00${batches.value.length + 1}`,
    product_id: products.value[0]?.id || '',
    harvest_date: new Date().toISOString().split('T')[0],
    location: myProducer.value.location || '',
    species_source: '',
    status: 'Passed / Verified',
    water_content: 14.5,
    hmf_content: 8.0,
    diastase_activity: 10.5,
    adulteration_test: 'Negative / Pure'
  }
  batchModalOpen.value = true
}

const openEditBatch = (bat) => {
  editingBatch.value = bat
  batchForm.value = {
    id: bat.id,
    product_id: bat.product_id,
    harvest_date: bat.harvest_date ? bat.harvest_date.split('T')[0] : '',
    location: bat.location,
    species_source: bat.species_source,
    status: bat.status,
    water_content: bat.water_content,
    hmf_content: bat.hmf_content,
    diastase_activity: bat.diastase_activity,
    adulteration_test: bat.adulteration_test
  }
  batchModalOpen.value = true
}

const submitBatch = async () => {
  try {
    if (editingBatch.value) {
      await appStore.updateBatch(editingBatch.value.id, batchForm.value)
      appStore.triggerToast(appStore.lang === 'vi' ? 'Cập nhật lô hàng thành công!' : 'Batch updated successfully!')
    } else {
      await appStore.createBatch(batchForm.value)
      appStore.triggerToast(appStore.lang === 'vi' ? 'Tạo lô hàng thành công!' : 'Batch created successfully!')
    }
    batchModalOpen.value = false
    await loadData()
  } catch (error) {
    appStore.triggerToast(error.message || 'Failed to submit batch.')
  }
}

const deleteBatch = async (id) => {
  const confirmMsg = appStore.lang === 'vi' ? 'Bạn có chắc chắn muốn xóa lô hàng này không?' : 'Are you sure you want to delete this batch?'
  if (!await appStore.triggerConfirm(confirmMsg)) return
  try {
    await appStore.deleteBatch(id)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Xóa lô hàng thành công!' : 'Batch deleted successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to delete batch.')
  }
}

// Supporting Records Upload Simulation
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  records.value.push({
    id: records.value.length + 1,
    name: file.name,
    type: file.name.endsWith('.pdf') ? 'Lab Report' : 'Certificate',
    date: new Date().toISOString().split('T')[0],
    status: 'Passed / Verified'
  })
  appStore.triggerToast(appStore.lang === 'vi' ? 'Tài liệu đã được tải lên và lưu thành công!' : 'Document uploaded and saved successfully!')
}

// Store Profile Save
const saveProfile = async () => {
  try {
    await appStore.updateProducerProfile({
      name: myProducer.value.name,
      location: myProducer.value.location,
      description: myProducer.value.description,
      history: myProducer.value.history,
      image_url: myProducer.value.image_url,
      details: myProducer.value.details
    })
    appStore.triggerToast(appStore.lang === 'vi' ? 'Hồ sơ cửa hàng đã được cập nhật thành công!' : 'Store profile updated successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to update store profile.')
  }
}

// Support ticket submit
const submitSupport = async () => {
  try {
    await appStore.submitSupport(supportForm.value)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Tạo phiếu hỗ trợ thành công!' : 'Support ticket created successfully!')
    supportForm.value = {
      subject: '',
      category: 'General Inquiry',
      message: ''
    }
  } catch (error) {
    appStore.triggerToast('Failed to submit support ticket.')
  }
}

// Product image upload helpers
const triggerMainImageUpload = () => {
  mainImageInput.value.click()
}

const onMainImageUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  uploadingMainImage.value = true
  try {
    const url = await appStore.uploadImage(file)
    productForm.value.image_url = url
    appStore.triggerToast(appStore.lang === 'vi' ? 'Tải lên ảnh chính sản phẩm thành công!' : 'Product main image uploaded successfully!')
  } catch (err) {
    console.error(err)
    appStore.triggerToast('Failed to upload main image.')
  } finally {
    uploadingMainImage.value = false
  }
}

const triggerDetailImageUpload = () => {
  detailImageInput.value.click()
}

const onDetailImageUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  uploadingDetailImage.value = true
  try {
    const url = await appStore.uploadImage(file)
    if (!productForm.value.specifications) {
      productForm.value.specifications = {}
    }
    if (!productForm.value.specifications.detail_images) {
      productForm.value.specifications.detail_images = []
    }
    productForm.value.specifications.detail_images.push(url)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Đã tải lên ảnh thư viện chi tiết!' : 'Detail gallery image uploaded!')
  } catch (err) {
    console.error(err)
    appStore.triggerToast('Failed to upload detail image.')
  } finally {
    uploadingDetailImage.value = false
  }
}

const removeDetailImage = (idx) => {
  if (productForm.value.specifications?.detail_images) {
    productForm.value.specifications.detail_images.splice(idx, 1)
  }
}

const openQrModal = (bat) => {
  const origin = window.location.origin
  selectedBatchUrl.value = `${origin}/traceability?batch=${bat.id}`
  qrModalOpen.value = true
}

const triggerStoreImageUpload = () => {
  storeImageInput.value.click()
}

const onStoreImageUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  uploadingStoreImage.value = true
  try {
    const url = await appStore.uploadImage(file)
    myProducer.value.image_url = url
    appStore.triggerToast(appStore.lang === 'vi' ? 'Tải lên ảnh bìa cửa hàng thành công!' : 'Store cover image uploaded successfully!')
  } catch (err) {
    console.error(err)
    appStore.triggerToast('Failed to upload store cover image.')
  } finally {
    uploadingStoreImage.value = false
  }
}

onMounted(() => {
  if (!appStore.user || (appStore.user.role !== 'producer' && appStore.user.role !== 'admin')) {
    appStore.triggerToast('Access denied: Producer Dashboard is for partner farms.')
    router.push('/login')
    return
  }
  loadData()
})
</script>
