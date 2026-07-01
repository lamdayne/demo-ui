<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E4B35]"></div>
        <p class="text-xs text-gray-500 font-semibold">Synchronizing workspace details...</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div class="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-gray-200">
              <img :src="myProducer?.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'" alt="Producer Profile" class="w-full h-full object-cover" />
            </div>
            <h3 class="font-bold text-gray-900 text-base">{{ myProducer?.name }}</h3>
            <span class="bg-green-50 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-green-200 inline-block mt-1">Verified Producer</span>
            <div class="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <MapPin class="w-3.5 h-3.5 text-gray-400" /> {{ myProducer?.location }}
            </div>
            <router-link :to="'/producer/' + myProducer?.id" class="text-xs font-semibold text-[#1E4B35] hover:underline mt-4 block">View Store Profile &rarr;</router-link>
            
            <nav class="space-y-1 mt-6 text-left">
              <button 
                v-for="t in tabs" 
                :key="t.id"
                @click="activeTab = t.id"
                class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition"
                :class="activeTab === t.id ? 'bg-[#1E4B35] text-white shadow' : 'text-gray-700 hover:bg-gray-50'"
              >
                <span class="flex items-center gap-3">
                  <component :is="t.icon" class="w-4 h-4" :class="activeTab === t.id ? 'text-white' : 'text-gray-400'" />
                  {{ t.name }}
                </span>
                <span v-if="t.id === 'messages'" class="text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold px-1" :class="activeTab === t.id ? 'bg-white text-[#1E4B35]' : 'bg-[#1E4B35] text-white'">
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
              <h1 class="text-3xl font-extrabold text-[#1E4B35] leading-none mb-2">Producer Dashboard</h1>
              <p class="text-xs text-gray-500">Welcome back, {{ myProducer?.name }}! Manage products, trace batches, and fulfill orders.</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] text-gray-500 font-semibold shadow-sm">
              <Calendar class="w-3.5 h-3.5 text-gray-400" />
              <span>Data synchronized from Neon DB</span>
            </div>
          </div>

          <!-- TAB 1: OVERVIEW -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Counter Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div @click="activeTab = 'products'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35] mb-2"><Package class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">Total Products</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ products.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">Manage products &rarr;</span>
              </div>

              <div @click="activeTab = 'batches'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 mb-2"><Layers class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">Active Batches</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ batches.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View batches &rarr;</span>
              </div>

              <div @click="activeTab = 'records'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-2"><FileText class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">Documents</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ records.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View records &rarr;</span>
              </div>

              <div @click="activeTab = 'orders'" class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1 cursor-pointer hover:border-[#1E4B35] transition">
                <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2"><ShoppingBag class="w-4 h-4"/></div>
                <div class="text-[10px] text-gray-400 font-semibold uppercase">Total Sales Orders</div>
                <div class="text-2xl font-extrabold text-gray-900 leading-none">{{ orders.length }}</div>
                <span class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View orders &rarr;</span>
              </div>
            </div>

            <!-- Tasks & Analytics Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Tasks -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold text-gray-900 text-sm">Today's Tasks</h3>
                  </div>
                  <div class="space-y-4">
                    <!-- Task 1 -->
                    <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                      <div class="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35] flex-shrink-0"><CloudUpload class="w-5 h-5"/></div>
                      <div class="flex-grow">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-bold text-gray-900 text-xs">Upload next batch record</h4>
                          <span class="bg-red-50 text-red-700 text-[8px] font-bold px-1.5 py-0.5 rounded">High Priority</span>
                        </div>
                        <p class="text-[10px] text-gray-500">Complete your next honey batch record for traceability.</p>
                      </div>
                    </div>

                    <!-- Task 2 -->
                    <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                      <div class="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0"><FlaskConical class="w-5 h-5"/></div>
                      <div class="flex-grow">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-bold text-gray-900 text-xs">Review sample lab report</h4>
                          <span class="bg-yellow-50 text-yellow-700 text-[8px] font-bold px-1.5 py-0.5 rounded">Medium Priority</span>
                        </div>
                        <p class="text-[10px] text-gray-500">Verify water content measurements for recent harvest.</p>
                      </div>
                    </div>

                    <!-- Task 3 -->
                    <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                      <div class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0"><MessageSquare class="w-5 h-5"/></div>
                      <div class="flex-grow">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-bold text-gray-900 text-xs">Respond to customer inquiry</h4>
                          <span class="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Low Priority</span>
                        </div>
                        <p class="text-[10px] text-gray-500">Check inbox for inquiries regarding ST25 rice batch certification.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button @click="activeTab = 'messages'" class="text-xs font-bold text-[#1E4B35] hover:underline pt-4 block text-center border-t border-gray-100 mt-4">View all messages &rarr;</button>
              </div>

              <!-- Analytics Graph -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 class="font-bold text-gray-900 text-sm">Revenue Analytics <span class="text-gray-400 font-normal text-xs">(6-Month Overview)</span></h3>
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div class="p-3 bg-gray-50 rounded-xl">
                    <div class="text-xs font-bold text-gray-400">Total Revenue</div>
                    <div class="text-lg font-extrabold text-green-700 mt-1">{{ stats.totalSales?.toLocaleString() }} VND</div>
                  </div>
                  <div class="p-3 bg-gray-50 rounded-xl">
                    <div class="text-xs font-bold text-gray-400">Avg Orders / Month</div>
                    <div class="text-lg font-extrabold text-[#1E4B35] mt-1">{{ (stats.totalOrders / 6 || 0).toFixed(1) }}</div>
                  </div>
                </div>

                <!-- Custom SVG Bar Chart -->
                <div class="space-y-1 pt-2">
                  <div class="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Monthly Sales Value Distribution</div>
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
                    <span class="w-2 h-2 bg-[#1E4B35] rounded-sm"></span> Current Sales Distribution
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
                    <h3 class="font-bold text-gray-900 text-xs">Products</h3>
                    <button @click="activeTab = 'products'" class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]">Manage all &rarr;</button>
                  </div>
                  <div class="divide-y divide-gray-100">
                    <div v-for="prod in products.slice(0, 3)" :key="prod.id" class="flex items-center justify-between py-2.5">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                          <img :src="prod.image_url" class="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 class="font-bold text-gray-900 text-[10px] leading-tight">{{ prod.name }}</h4>
                          <p class="text-[8px] text-gray-400">{{ prod.category }}</p>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-gray-900 text-[10px]">229,000</div>
                        <span class="bg-green-50 text-green-700 text-[6px] px-1 rounded font-bold border border-green-200">Active</span>
                      </div>
                    </div>
                    <div v-if="products.length === 0" class="text-center py-6 text-xs text-gray-400">
                      No products added yet. Click 'Products' tab to add your first.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Batches -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-gray-900 text-xs">Recent Batches</h3>
                    <button @click="activeTab = 'batches'" class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]">Manage all &rarr;</button>
                  </div>
                  <div class="divide-y divide-gray-100">
                    <div v-for="bat in batches.slice(0, 3)" :key="bat.id" class="flex items-center justify-between py-2.5">
                      <div>
                        <h4 class="font-mono font-bold text-[#1E4B35] text-[10px]">{{ bat.id }}</h4>
                        <p class="text-[8px] text-gray-500">{{ bat.product_name }}</p>
                      </div>
                      <div class="text-right">
                        <span class="bg-green-50 text-green-700 text-[7px] px-1.5 py-0.5 rounded font-bold border border-green-200">{{ bat.status }}</span>
                        <p class="text-[8px] text-gray-400 mt-0.5">{{ new Date(bat.harvest_date).toLocaleDateString() }}</p>
                      </div>
                    </div>
                    <div v-if="batches.length === 0" class="text-center py-6 text-xs text-gray-400">
                      No traceability batches created yet.
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
                  <h3 class="font-bold text-gray-900 text-base">Your Product Catalog</h3>
                  <p class="text-xs text-gray-500">Add, edit, or delete agricultural products sold on Green Trace</p>
                </div>
                <button @click="openAddProduct" class="flex items-center gap-1.5 px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
                  <Plus class="w-4 h-4" /> Add Product
                </button>
              </div>

              <!-- Product Table -->
              <div class="border border-gray-150 rounded-2xl overflow-hidden">
                <div class="grid grid-cols-12 bg-gray-50/75 border-b border-gray-150 px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <div class="col-span-5">Product Details</div>
                  <div class="col-span-3">Category</div>
                  <div class="col-span-2 text-right">Price (VND)</div>
                  <div class="col-span-2 text-right">Actions</div>
                </div>
                <div class="divide-y divide-gray-150">
                  <div v-for="prod in products" :key="prod.id" class="grid grid-cols-12 px-4 py-3.5 text-xs items-center hover:bg-gray-50/30 transition">
                    <div class="col-span-5 flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg overflow-hidden border border-gray-150 flex-shrink-0 bg-gray-50">
                        <img :src="prod.image_url" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-950 text-xs">{{ prod.name }}</h4>
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
                    No products added yet. Click "+ Add Product" to publish your first.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: TRACEABILITY BATCHES (CRUD) -->
          <div v-if="activeTab === 'batches'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="font-bold text-gray-900 text-base">Traceability & Harvest Batches</h3>
                  <p class="text-xs text-gray-500">Record agricultural lot details, test results, and source metrics</p>
                </div>
                <button @click="openAddBatch" class="flex items-center gap-1.5 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-xs font-bold transition">
                  <Plus class="w-4 h-4" /> Create Batch
                </button>
              </div>

              <!-- Batches Table -->
              <div class="border border-gray-150 rounded-2xl overflow-x-auto">
                <table class="w-full text-left text-xs min-w-[800px]">
                  <thead>
                    <tr class="bg-gray-50/75 border-b border-gray-150 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th class="px-4 py-3">Batch ID</th>
                      <th class="px-4 py-3">Product Name</th>
                      <th class="px-4 py-3">Harvest Date</th>
                      <th class="px-4 py-3">Location Source</th>
                      <th class="px-4 py-3">Water</th>
                      <th class="px-4 py-3">Status</th>
                      <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-150">
                    <tr v-for="bat in batches" :key="bat.id" class="hover:bg-gray-50/30 transition">
                      <td class="px-4 py-3 font-mono font-bold text-[#1E4B35]">{{ bat.id }}</td>
                      <td class="px-4 py-3 font-semibold text-gray-900">{{ bat.product_name }}</td>
                      <td class="px-4 py-3 text-gray-600">{{ new Date(bat.harvest_date).toLocaleDateString() }}</td>
                      <td class="px-4 py-3 text-gray-500 max-w-[150px] truncate">{{ bat.location }}</td>
                      <td class="px-4 py-3 font-medium text-gray-700">{{ bat.water_content ? bat.water_content + '%' : '-' }}</td>
                      <td class="px-4 py-3">
                        <span class="bg-green-50 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-green-200">
                          {{ bat.status }}
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
                        No batch traceability records exist yet. Click "+ Create Batch" to seed one.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 4: SUPPORTING RECORDS -->
          <div v-if="activeTab === 'records'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">Supporting Farm Records</h3>
                <p class="text-xs text-gray-500">Upload and link regulatory documents, certificates, and compliance checks</p>
              </div>

              <!-- Upload Drag Zone -->
              <div class="border border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50/50 hover:border-[#1E4B35] transition relative cursor-pointer">
                <input type="file" @change="handleFileUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <CloudUpload class="w-10 h-10 text-[#1E4B35] mx-auto mb-3" />
                <h4 class="font-bold text-gray-900 text-sm">Drag & drop files here to upload</h4>
                <p class="text-xs text-gray-500 mt-1">or <span class="text-[#1E4B35] font-semibold underline">browse directories</span></p>
                <span class="text-[10px] text-gray-400 block mt-2">Supports PDF, JPG, or PNG files up to 10MB</span>
              </div>

              <!-- File List -->
              <div class="mt-6 border border-gray-150 rounded-2xl overflow-hidden">
                <div class="grid grid-cols-12 bg-gray-50/75 border-b border-gray-150 px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <div class="col-span-6">Document Name</div>
                  <div class="col-span-3">Date Added</div>
                  <div class="col-span-3 text-right">Status</div>
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
                        {{ rec.status }}
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
                <h3 class="font-bold text-gray-900 text-base">Invoiced Customer Orders</h3>
                <p class="text-xs text-gray-500">Track and fulfill sales orders containing your farm products</p>
              </div>

              <!-- Orders List -->
              <div class="border border-gray-150 rounded-2xl overflow-hidden divide-y divide-gray-150">
                <div v-for="ord in orders" :key="ord.id" class="p-4 hover:bg-gray-50/20 transition">
                  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Order ID</span>
                      <span class="font-mono font-bold text-[#1E4B35] text-sm">#{{ ord.order_id }}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Customer</span>
                      <span class="font-bold text-gray-900">{{ ord.customer_name }}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date</span>
                      <span class="text-gray-600 font-medium">{{ new Date(ord.created_at).toLocaleDateString() }}</span>
                    </div>
                    <div>
                      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Earned</span>
                      <span class="font-extrabold text-gray-900">{{ (ord.price * ord.quantity).toLocaleString() }} VND</span>
                    </div>
                    <span class="bg-green-50 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-green-200">
                      {{ ord.status }}
                    </span>
                  </div>
                  <div class="bg-gray-50 rounded-xl p-3 text-xs border border-gray-100 flex justify-between items-center">
                    <span class="text-gray-600">Product purchased: <strong class="text-gray-900">{{ ord.product_name }}</strong></span>
                    <span class="text-gray-600">Qty: <strong class="text-gray-900">{{ ord.quantity }}</strong></span>
                  </div>
                </div>
                <div v-if="orders.length === 0" class="text-center py-12 text-xs text-gray-400">
                  No purchase orders have been received yet for your products.
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 6: STORE PROFILE DETAILS -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">Store & Farm Profile</h3>
                <p class="text-xs text-gray-500">Edit information shown to shoppers on public traceability detail views</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Edit Form -->
                <div class="md:col-span-2 space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Farm / Brand Name</label>
                    <input type="text" v-model="myProducer.name" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Location</label>
                    <input type="text" v-model="myProducer.location" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Cover / Profile Image</label>
                    <div class="flex items-center gap-4">
                      <div class="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center relative shadow-inner">
                        <img v-if="myProducer.image_url" :src="myProducer.image_url" class="w-full h-full object-cover" />
                        <span v-else class="text-[10px] text-gray-300">No Image</span>
                      </div>
                      <div class="space-y-1">
                        <button type="button" @click="triggerStoreImageUpload" :disabled="uploadingStoreImage" class="px-3.5 py-2 bg-white border border-gray-300 hover:border-[#1E4B35] text-gray-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5">
                          <CloudUpload class="w-3.5 h-3.5" />
                          {{ uploadingStoreImage ? 'Uploading...' : 'Upload Cover Image' }}
                        </button>
                        <input type="file" ref="storeImageInput" @change="onStoreImageUpload" class="hidden" accept="image/*" />
                        <p class="text-[9px] text-gray-400">JPG, PNG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Slogan / Short Description</label>
                    <input type="text" v-model="myProducer.description" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Detailed Story & History</label>
                    <textarea v-model="myProducer.history" rows="5" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none"></textarea>
                  </div>
                  <button @click="saveProfile" class="flex items-center gap-1.5 px-5 py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
                    <Save class="w-4 h-4" /> Save Profile Details
                  </button>
                </div>

                <!-- Preview card -->
                <div v-if="myProducer" class="bg-gray-50 border border-gray-150 rounded-2xl p-5 h-fit text-center space-y-4">
                  <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Live Store Preview</span>
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
                <h3 class="font-bold text-gray-900 text-base">Customer Inquiries</h3>
                <p class="text-xs text-gray-500">Read and respond to product queries sent by customers on Green Trace</p>
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
                        <span class="text-[9px] text-green-600 font-semibold">&bull; Online</span>
                      </div>
                      <span class="text-[9px] text-gray-400 font-semibold">Inquiry date: May 19, 2026</span>
                    </div>

                    <!-- Conversation bubble -->
                    <div class="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                      <div class="flex flex-col space-y-1 text-left items-start max-w-[80%]">
                        <div class="bg-gray-100 text-gray-800 p-2.5 rounded-2xl text-xs">
                          Hello! Can I purchase ST25 rice in 10kg bags directly, or do you only sell in the default 2kg vacuum packs?
                        </div>
                        <span class="text-[8px] text-gray-400 font-semibold pl-2">10:15 AM</span>
                      </div>
                    </div>
                  </div>

                  <!-- Reply Box -->
                  <div class="flex gap-2">
                    <input type="text" placeholder="Type your response..." class="flex-grow px-3.5 py-2 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                    <button class="px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 8: CONTACT SUPPORT -->
          <div v-if="activeTab === 'support'" class="space-y-6">
            <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div class="mb-6">
                <h3 class="font-bold text-gray-900 text-base">Contact Green Trace Support</h3>
                <p class="text-xs text-gray-500">Need help resolving an issue, batch reviews, or verification questions?</p>
              </div>

              <div class="max-w-xl space-y-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Inquiry Category</label>
                  <select v-model="supportForm.category" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Batch Traceability Review</option>
                    <option>Verification Status</option>
                    <option>Product Listing Help</option>
                    <option>Order & Payout Questions</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Subject</label>
                  <input type="text" v-model="supportForm.subject" placeholder="Summary of the issue" class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Message Details</label>
                  <textarea v-model="supportForm.message" rows="5" placeholder="Explain the problem in detail so our team can assist you..." class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#1E4B35] focus:outline-none"></textarea>
                </div>
                <button @click="submitSupport" class="flex items-center gap-1.5 px-5 py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
                  Submit Support Ticket
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Impact Statement Banner -->
          <div class="bg-[#F0FDF4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div class="md:w-3/5 space-y-4 text-left">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[#1E4B35]"><Leaf class="w-5 h-5"/></div>
              <h3 class="font-bold text-[#1E4B35] text-base">Your Impact with Green Trace</h3>
              <p class="text-green-800 text-[11px] leading-relaxed">
                You are contributing to a transparent, sustainable food system and supporting responsible agriculture in Viet Nam.
              </p>
            </div>
            
            <div class="md:w-2/5 border-t md:border-t-0 md:border-l border-green-200/50 pt-6 md:pt-0 pl-0 md:pl-8 flex flex-col justify-between">
              <p class="text-green-900 text-xs italic font-medium leading-relaxed mb-4">
                "We believe in honest food and healthy ecosystems. Thank you for helping us connect with customers who care about quality and transparency."
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
        <h3 class="font-bold text-gray-900 text-base">{{ editingProduct ? 'Edit Product Details' : 'Add New Product' }}</h3>
        
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-gray-700 mb-1">Product Name</label>
            <input type="text" v-model="productForm.name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">Category</label>
              <select v-model="productForm.category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]">
                <option>Honey</option>
                <option>Rice</option>
                <option>Tea</option>
                <option>Vegetables</option>
                <option>Fruits</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">Price (VND)</label>
              <input type="number" v-model="productForm.price" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Description</label>
            <textarea v-model="productForm.description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]"></textarea>
          </div>
          <!-- Main Image Upload -->
          <div>
            <label class="block font-bold text-gray-700 mb-1">Main Product Image *</label>
            <div class="flex items-center gap-3">
              <div class="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 relative shadow-inner">
                <img v-if="productForm.image_url" :src="productForm.image_url" class="w-full h-full object-cover" />
                <span v-else class="text-[10px] text-gray-300">No Image</span>
              </div>
              <div class="space-y-1">
                <button type="button" @click="triggerMainImageUpload" :disabled="uploadingMainImage" class="px-3 py-1.5 bg-white border border-gray-300 hover:border-[#1E4B35] text-gray-700 text-xs font-bold rounded-lg transition flex items-center gap-1">
                  <CloudUpload class="w-3.5 h-3.5" />
                  {{ uploadingMainImage ? 'Uploading...' : 'Upload Image' }}
                </button>
                <input type="file" ref="mainImageInput" @change="onMainImageUpload" class="hidden" accept="image/*" />
                <p class="text-[9px] text-gray-400">JPG, PNG up to 10MB</p>
              </div>
            </div>
          </div>

          <!-- Detail Images Upload -->
          <div>
            <label class="block font-bold text-gray-700 mb-1">Product Detail Images (Multiple)</label>
            <div class="grid grid-cols-5 gap-2 mb-2">
              <div v-for="(imgUrl, idx) in productForm.specifications?.detail_images || []" :key="idx" class="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img :src="imgUrl" class="w-full h-full object-cover" />
                <button type="button" @click="removeDetailImage(idx)" class="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                  <X class="w-3 h-3" />
                </button>
              </div>
              <button type="button" v-if="(!productForm.specifications?.detail_images || productForm.specifications.detail_images.length < 5)" @click="triggerDetailImageUpload" :disabled="uploadingDetailImage" class="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#1E4B35] hover:text-[#1E4B35] transition">
                <Plus class="w-4 h-4" />
                <span class="text-[8px] mt-0.5">{{ uploadingDetailImage ? '...' : 'Upload' }}</span>
              </button>
              <input type="file" ref="detailImageInput" @change="onDetailImageUpload" class="hidden" accept="image/*" />
            </div>
            <p class="text-[9px] text-gray-400">Upload up to 5 additional detail gallery photos</p>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="productModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
          <button @click="submitProduct" class="px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">Submit Product</button>
        </div>
      </div>
    </div>

    <!-- BATCH ADD/EDIT MODAL -->
    <div v-if="batchModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative space-y-4 border border-gray-100">
        <button @click="batchModalOpen = false" class="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition text-gray-400">
          <X class="w-4 h-4" />
        </button>
        <h3 class="font-bold text-gray-900 text-base">{{ editingBatch ? 'Edit Batch Details' : 'Create Traceability Batch' }}</h3>
        
        <div class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">Batch Code / ID</label>
              <input type="text" v-model="batchForm.id" :disabled="editingBatch !== null" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35] disabled:bg-gray-50 disabled:text-gray-400 font-mono font-bold" />
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">Linked Product</label>
              <select v-model="batchForm.product_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]">
                <option v-for="prod in products" :key="prod.id" :value="prod.id">{{ prod.name }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-gray-700 mb-1">Harvest Date</label>
              <input type="date" v-model="batchForm.harvest_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">Location of Harvest</label>
              <input type="text" v-model="batchForm.location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-gray-700 mb-1">Species / Botanical Source</label>
            <input type="text" v-model="batchForm.species_source" placeholder="e.g. ST25 Rice, Wild Melaleuca Flower Honey" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
          </div>

          <div class="border-t border-gray-150 pt-3 space-y-3">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lab Analysis Specs</span>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block font-medium text-gray-500 mb-0.5">Water Content (%)</label>
                <input type="number" step="0.1" v-model="batchForm.water_content" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
              </div>
              <div>
                <label class="block font-medium text-gray-500 mb-0.5">HMF Content (mg/kg)</label>
                <input type="number" step="0.1" v-model="batchForm.hmf_content" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
              </div>
              <div>
                <label class="block font-medium text-gray-500 mb-0.5">Diastase (Schade)</label>
                <input type="number" step="0.1" v-model="batchForm.diastase_activity" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
              </div>
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">Adulteration / Purity Test Status</label>
              <input type="text" v-model="batchForm.adulteration_test" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E4B35]" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="batchModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
          <button @click="submitBatch" class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-xs font-bold transition">Submit Batch</button>
        </div>
      </div>
    </div>
    <!-- BATCH QR CODE MODAL -->
    <div v-if="qrModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative space-y-4 border border-gray-100 text-center">
        <button @click="qrModalOpen = false" class="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition text-gray-400">
          <X class="w-4 h-4" />
        </button>
        <div class="w-12 h-12 bg-green-50 text-[#1E4B35] rounded-full flex items-center justify-center mx-auto mb-2">
          <QrCode class="w-6 h-6" />
        </div>
        <h3 class="font-bold text-gray-900 text-base">Batch Traceability QR Code</h3>
        <p class="text-xs text-gray-500">Scan this code with a mobile phone to see the full batch harvest and lab testing journey.</p>
        
        <div class="p-4 bg-gray-50 rounded-2xl border border-gray-200 inline-block mx-auto shadow-inner">
          <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(selectedBatchUrl)" class="w-44 h-44 object-contain" />
        </div>
        
        <div class="text-[10px] text-gray-450 font-mono break-all bg-gray-100 py-1.5 px-3 rounded-lg border border-gray-200">
          {{ selectedBatchUrl }}
        </div>
        
        <div class="flex justify-center gap-2 pt-2">
          <button @click="qrModalOpen = false" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition">
            Done
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { 
  MapPin, LayoutDashboard, Package, Layers, FileText, ShoppingBag, 
  Store, MessageSquare, HelpCircle, Calendar, ShieldAlert, CloudUpload, 
  FlaskConical, Award, Leaf, BookOpen, Video, Users, ShieldCheck, Lock,
  Plus, Trash2, Edit, Save, X, ChevronDown, ChevronUp, CheckCircle, AlertCircle, QrCode
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
const messages = ref([
  { id: 1, sender: 'Minh Quan', text: 'Can I purchase ST25 rice in 10kg bags?', date: 'May 19, 10:15 AM', read: false },
  { id: 2, sender: 'Hanh Nguyen', text: 'Does your wild honey contain any added sugars?', date: 'May 18, 04:30 PM', read: true },
  { id: 3, sender: 'Hoang Lam', text: 'I would like to visit your bee farm. Do you host tours?', date: 'May 17, 02:10 PM', read: true }
])

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
    detail_images: []
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

const tabs = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
  { id: 'products', name: 'Products', icon: Package },
  { id: 'batches', name: 'Batches', icon: Layers },
  { id: 'records', name: 'Supporting Records', icon: FileText },
  { id: 'orders', name: 'Orders', icon: ShoppingBag },
  { id: 'profile', name: 'Store Profile', icon: Store },
  { id: 'messages', name: 'Messages', icon: MessageSquare },
  { id: 'support', name: 'Support', icon: HelpCircle }
]

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
    image_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300',
    specifications: {
      detail_images: []
    }
  }
  productModalOpen.value = true
}

const openEditProduct = (prod) => {
  editingProduct.value = prod
  const specs = prod.specifications || {}
  if (!specs.detail_images) {
    specs.detail_images = []
  }
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
      appStore.triggerToast('Product updated successfully!')
    } else {
      await appStore.createProduct(productForm.value)
      appStore.triggerToast('Product created successfully!')
    }
    productModalOpen.value = false
    await loadData()
  } catch (error) {
    appStore.triggerToast(error.message || 'Failed to submit product.')
  }
}

const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await appStore.deleteProduct(id)
    appStore.triggerToast('Product deleted successfully!')
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
      appStore.triggerToast('Batch updated successfully!')
    } else {
      await appStore.createBatch(batchForm.value)
      appStore.triggerToast('Batch created successfully!')
    }
    batchModalOpen.value = false
    await loadData()
  } catch (error) {
    appStore.triggerToast(error.message || 'Failed to submit batch.')
  }
}

const deleteBatch = async (id) => {
  if (!confirm('Are you sure you want to delete this batch?')) return
  try {
    await appStore.deleteBatch(id)
    appStore.triggerToast('Batch deleted successfully!')
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
  appStore.triggerToast('Document uploaded and saved successfully!')
}

// Store Profile Save
const saveProfile = async () => {
  try {
    await appStore.updateProducerProfile({
      name: myProducer.value.name,
      location: myProducer.value.location,
      description: myProducer.value.description,
      history: myProducer.value.history,
      image_url: myProducer.value.image_url
    })
    appStore.triggerToast('Store profile updated successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to update store profile.')
  }
}

// Support ticket submit
const submitSupport = async () => {
  try {
    await appStore.submitSupport(supportForm.value)
    appStore.triggerToast('Support ticket created successfully!')
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
    appStore.triggerToast('Product main image uploaded successfully!')
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
    appStore.triggerToast('Detail gallery image uploaded!')
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
    appStore.triggerToast('Store cover image uploaded successfully!')
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
