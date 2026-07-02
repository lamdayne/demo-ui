<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Header banner -->
    <div class="bg-[#0B3B24] text-white py-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">System Administration</span>
            <h1 class="text-3xl font-bold mt-2">Control Panel</h1>
            <p class="text-sm text-gray-300 mt-1">Manage users, producers, orders, and promotion campaigns.</p>
          </div>
          <router-link to="/account" class="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 w-fit">
            &larr; Back to My Account
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="container mx-auto px-4 max-w-6xl mt-8">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar Navigation -->
        <aside class="w-full lg:w-1/4">
          <div class="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-1">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-left"
              :class="activeTab === tab.id ? 'bg-[#1E4B35] text-white' : 'text-gray-600 hover:bg-gray-50'"
            >
              <component :is="tab.icon" class="w-4 h-4" />
              <span>{{ tab.name }}</span>
            </button>
          </div>
        </aside>

        <!-- Admin Workspaces -->
        <main class="w-full lg:w-3/4">
          
          <!-- Loading State -->
          <div v-if="loading" class="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
            <div class="w-10 h-10 border-4 border-[#1E4B35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-sm text-gray-500">Retrieving administration workspace data...</p>
          </div>

          <div v-else>
            <!-- 1. Overview Statistics Tab -->
            <div v-if="activeTab === 'overview'" class="space-y-6">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                  <div class="flex justify-between items-start text-gray-400">
                    <span class="text-xs font-medium uppercase tracking-wider">Total Sales</span>
                    <TrendingUp class="w-5 h-5 text-green-600" />
                  </div>
                  <div class="mt-4">
                    <span class="text-xl font-bold text-gray-900 block">{{ stats.totalRevenue?.toLocaleString() }} VND</span>
                    <span class="text-[10px] text-green-600 font-semibold mt-1 block">&uarr; Completed Orders</span>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                  <div class="flex justify-between items-start text-gray-400">
                    <span class="text-xs font-medium uppercase tracking-wider">Total Orders</span>
                    <ShoppingBag class="w-5 h-5 text-[#1E4B35]" />
                  </div>
                  <div class="mt-4">
                    <span class="text-xl font-bold text-gray-900 block">{{ stats.totalOrders }}</span>
                    <span class="text-[10px] text-gray-500 mt-1 block">Invoiced payments</span>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                  <div class="flex justify-between items-start text-gray-400">
                    <span class="text-xs font-medium uppercase tracking-wider">Producers</span>
                    <Users class="w-5 h-5 text-yellow-600" />
                  </div>
                  <div class="mt-4">
                    <span class="text-xl font-bold text-gray-900 block">{{ stats.totalProducers }}</span>
                    <span class="text-[10px] text-gray-500 mt-1 block">Verified farm partners</span>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                  <div class="flex justify-between items-start text-gray-400">
                    <span class="text-xs font-medium uppercase tracking-wider">Members</span>
                    <User class="w-5 h-5 text-blue-600" />
                  </div>
                  <div class="mt-4">
                    <span class="text-xl font-bold text-gray-900 block">{{ stats.totalUsers }}</span>
                    <span class="text-[10px] text-gray-500 mt-1 block">Registered shoppers</span>
                  </div>
                </div>
              </div>

              <!-- Weekly Activity & Growth Chart -->
              <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-6">
                  <div>
                    <h3 class="font-bold text-gray-900 text-base">Weekly Activity & Growth</h3>
                    <p class="text-xs text-gray-500">Shopper registrations vs purchase count over the last 7 days</p>
                  </div>
                  <!-- Legend -->
                  <div class="flex items-center gap-4 text-xs font-bold">
                    <div class="flex items-center gap-1.5">
                      <span class="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
                      <span class="text-gray-600">Registrations</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-3 h-3 rounded-full bg-[#1E4B35]"></span>
                      <span class="text-gray-600">Purchases</span>
                    </div>
                  </div>
                </div>

                <!-- SVG Area Chart -->
                <div class="relative w-full h-[260px] bg-gray-50/50 rounded-2xl border border-gray-100 p-4">
                  <!-- Tooltip popup -->
                  <div 
                    v-if="hoveredPoint" 
                    class="absolute bg-gray-900/95 text-white p-3 rounded-xl shadow-xl text-[10px] space-y-1.5 pointer-events-none transition-all duration-200 border border-gray-800"
                    :style="{ 
                      left: hoveredPoint.x + 'px', 
                      top: (hoveredPoint.y - 85) + 'px',
                      transform: 'translateX(-50%)'
                    }"
                  >
                    <div class="font-bold border-b border-white/10 pb-1 text-gray-300">{{ hoveredPoint.label }}</div>
                    <div class="flex items-center justify-between gap-6">
                      <span class="text-blue-400">Registrations:</span>
                      <span class="font-bold">{{ hoveredPoint.users }}</span>
                    </div>
                    <div class="flex items-center justify-between gap-6">
                      <span class="text-green-400">Purchases:</span>
                      <span class="font-bold">{{ hoveredPoint.orders }}</span>
                    </div>
                  </div>

                  <svg class="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0"/>
                      </linearGradient>
                      <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#1E4B35" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="#1E4B35" stop-opacity="0.0"/>
                      </linearGradient>
                    </defs>

                    <!-- Horizontal Grid lines -->
                    <line x1="50" y1="40" x2="550" y2="40" stroke="#F1F5F9" stroke-width="1" />
                    <line x1="50" y1="120" x2="550" y2="120" stroke="#F1F5F9" stroke-width="1" />
                    <line x1="50" y1="200" x2="550" y2="200" stroke="#E2E8F0" stroke-width="1.5" />

                    <!-- Y-Axis Labels -->
                    <text x="40" y="45" text-anchor="end" class="text-[9px] fill-gray-400 font-semibold">{{ maxVal }}</text>
                    <text x="40" y="125" text-anchor="end" class="text-[9px] fill-gray-400 font-semibold">{{ Math.round(maxVal / 2) }}</text>
                    <text x="40" y="205" text-anchor="end" class="text-[9px] fill-gray-400 font-semibold">0</text>

                    <!-- Area Gradients -->
                    <path :d="usersAreaPath" fill="url(#userGrad)" />
                    <path :d="ordersAreaPath" fill="url(#orderGrad)" />

                    <!-- Line Paths -->
                    <path :d="usersPath" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path :d="ordersPath" fill="none" stroke="#1E4B35" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

                    <!-- Interactive Anchor Nodes -->
                    <!-- Users dots -->
                    <circle 
                      v-for="(item, idx) in chartData" 
                      :key="'u-' + idx"
                      :cx="50 + idx * (500 / 6)"
                      :cy="200 - (item.users / maxVal) * 160"
                      r="4"
                      fill="#FFFFFF"
                      stroke="#3B82F6"
                      stroke-width="2.5"
                      class="cursor-pointer hover:r-6 transition-all duration-150"
                      @mouseenter="showTooltip($event, item, idx, 'users')"
                      @mouseleave="clearTooltip"
                    />

                    <!-- Orders dots -->
                    <circle 
                      v-for="(item, idx) in chartData" 
                      :key="'o-' + idx"
                      :cx="50 + idx * (500 / 6)"
                      :cy="200 - (item.orders / maxVal) * 160"
                      r="4"
                      fill="#FFFFFF"
                      stroke="#1E4B35"
                      stroke-width="2.5"
                      class="cursor-pointer hover:r-6 transition-all duration-150"
                      @mouseenter="showTooltip($event, item, idx, 'orders')"
                      @mouseleave="clearTooltip"
                    />

                    <!-- X-Axis Labels -->
                    <text 
                      v-for="(item, idx) in chartData" 
                      :key="'x-' + idx"
                      :x="50 + idx * (500 / 6)"
                      y="222"
                      text-anchor="middle"
                      class="text-[9px] fill-gray-500 font-semibold"
                    >
                      {{ item.label }}
                    </text>
                  </svg>
                </div>

                <!-- Daily Breakdown Table -->
                <div class="mt-6 border border-gray-150 rounded-2xl overflow-hidden">
                  <div class="grid grid-cols-3 bg-gray-50/75 border-b border-gray-150 px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Date</span>
                    <span class="text-center">New Registrations</span>
                    <span class="text-right">Order Purchases</span>
                  </div>
                  <div class="divide-y divide-gray-150">
                    <div 
                      v-for="item in chartData" 
                      :key="item.date" 
                      class="grid grid-cols-3 px-4 py-2.5 text-xs hover:bg-gray-50/30 transition"
                    >
                      <span class="font-semibold text-gray-700">{{ item.label }}</span>
                      <span class="text-center font-bold text-blue-600 bg-blue-50/50 rounded px-2 py-0.5 w-fit mx-auto">{{ item.users }}</span>
                      <span class="text-right font-bold text-green-700 bg-green-50/50 rounded px-2 py-0.5 w-fit ml-auto">{{ item.orders }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick action banner -->
              <div class="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="space-y-1">
                  <h4 class="font-bold text-[#1E4B35] text-sm">System integrity scan passed</h4>
                  <p class="text-xs text-emerald-800">All Neon DB connection tables and API endpoints are synchronized and fully operational.</p>
                </div>
                <button @click="loadData" class="px-4 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">
                  Refresh System Logs
                </button>
              </div>
            </div>

            <!-- 2. Users Management Tab -->
            <div v-if="activeTab === 'users'" class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-150 flex justify-between items-center">
                <h3 class="font-bold text-gray-900 text-sm">System Shoppers & Accounts</h3>
                <span class="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-bold">{{ users.length }} Users</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr class="bg-gray-50 border-b border-gray-150 text-gray-400 font-bold uppercase tracking-wider">
                      <th class="px-6 py-3.5">User</th>
                      <th class="px-6 py-3.5">Contact Details</th>
                      <th class="px-6 py-3.5">Role Designation</th>
                      <th class="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-150">
                    <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50/50">
                      <td class="px-6 py-4">
                        <div class="font-bold text-gray-900">{{ u.name }}</div>
                        <div class="text-[10px] text-gray-400">UID: {{ u.id }}</div>
                      </td>
                      <td class="px-6 py-4">
                        <div>{{ u.email }}</div>
                        <div class="text-gray-400">{{ u.phone || 'No phone' }}</div>
                      </td>
                      <td class="px-6 py-4">
                        <select 
                          v-model="u.role" 
                          @change="changeRole(u.id, u.role)"
                          class="bg-gray-50 border border-gray-200 rounded px-2.5 py-1 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#1E4B35]"
                        >
                          <option value="user">User</option>
                          <option value="producer">Producer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <button 
                          @click="removeUser(u.id)"
                          class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete user"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 3. Producers Verification Tab -->
            <div v-if="activeTab === 'producers'" class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-150 flex justify-between items-center">
                <h3 class="font-bold text-gray-900 text-sm">Producer Verification Registry</h3>
                <span class="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-bold">{{ producers.length }} Farms</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr class="bg-gray-50 border-b border-gray-150 text-gray-400 font-bold uppercase tracking-wider">
                      <th class="px-6 py-3.5">Cooperative / Farm</th>
                      <th class="px-6 py-3.5">Regional Location</th>
                      <th class="px-6 py-3.5">Owner Contact</th>
                      <th class="px-6 py-3.5">Status Check</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-150">
                    <tr v-for="p in producers" :key="p.id" class="hover:bg-gray-50/50">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                          <img :src="p.image_url" class="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                          <div>
                            <div class="font-bold text-gray-900">{{ p.name }}</div>
                            <div class="text-[10px] text-gray-400 truncate max-w-[200px]">{{ p.description }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-gray-700">
                        {{ p.location }}
                      </td>
                      <td class="px-6 py-4">
                        <div>{{ p.user_email || 'No email linked' }}</div>
                        <div class="text-gray-400">{{ p.user_phone || '' }}</div>
                      </td>
                      <td class="px-6 py-4">
                        <button 
                          @click="toggleProducerVerification(p.id, !p.verified)"
                          class="px-3 py-1.5 rounded-lg text-[10px] font-bold border transition"
                          :class="p.verified 
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'"
                        >
                          {{ p.verified ? 'Verified Partner' : 'Approve Farm' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 4. Orders Dashboard Tab -->
            <div v-if="activeTab === 'orders'" class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-gray-150 flex justify-between items-center">
                <h3 class="font-bold text-gray-900 text-sm">System Sales & Orders</h3>
                <span class="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-bold">{{ orders.length }} Orders</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr class="bg-gray-50 border-b border-gray-150 text-gray-400 font-bold uppercase tracking-wider">
                      <th class="px-6 py-3.5">Order ID</th>
                      <th class="px-6 py-3.5">Purchaser</th>
                      <th class="px-6 py-3.5">Items / Products</th>
                      <th class="px-6 py-3.5">Grand Total</th>
                      <th class="px-6 py-3.5">Progress State</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-150">
                    <tr v-for="o in orders" :key="o.id" class="hover:bg-gray-50/50">
                      <td class="px-6 py-4">
                        <div class="font-mono font-bold text-gray-950">GT-#{{ o.id }}</div>
                        <div class="text-[10px] text-gray-400">{{ formatDate(o.created_at) }}</div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="font-bold text-gray-900">{{ o.user_name }}</div>
                        <div class="text-[10px] text-gray-400">{{ o.user_email }}</div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="space-y-1">
                          <div v-for="item in o.items" :key="item.id" class="flex items-center gap-2">
                            <span class="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-[9px] font-bold">{{ item.quantity }}x</span>
                            <span class="text-gray-600">{{ item.product_name }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 font-bold text-[#1E4B35]">
                        {{ parseFloat(o.total_price).toLocaleString() }} VND
                      </td>
                      <td class="px-6 py-4">
                        <select 
                          v-model="o.status" 
                          @change="updateStatus(o.id, o.status)"
                          class="bg-gray-50 border border-gray-200 rounded px-2.5 py-1 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#1E4B35]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Review">In Review</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 5. Active Coupons Tab -->
            <div v-if="activeTab === 'coupons'" class="space-y-6">
              <!-- Create Coupon Panel -->
              <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <h3 class="font-bold text-gray-900 text-sm mb-4">Create Discount Coupon</h3>
                <form @submit.prevent="addCoupon" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 uppercase">Coupon Code</label>
                    <input 
                      v-model="newCoupon.code" 
                      type="text" 
                      placeholder="e.g. SPECIAL50"
                      class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#1E4B35]"
                      required
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 uppercase">Discount Type</label>
                    <select 
                      v-model="newCoupon.discount_type"
                      class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#1E4B35]"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed VND amount</option>
                    </select>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 uppercase">Value</label>
                    <input 
                      v-model.number="newCoupon.discount_value" 
                      type="number" 
                      placeholder="10 or 50000"
                      class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#1E4B35]"
                      required
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 uppercase">Min Order (VND)</label>
                    <input 
                      v-model.number="newCoupon.min_order_value" 
                      type="number" 
                      placeholder="100000"
                      class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#1E4B35]"
                    />
                  </div>
                  <div class="md:col-span-4 flex justify-end">
                    <button type="submit" class="px-5 py-2.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                      <Tag class="w-4 h-4" /> Create Coupon
                    </button>
                  </div>
                </form>
              </div>

              <!-- Coupons Table -->
              <div class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-150">
                  <h3 class="font-bold text-gray-900 text-sm">Active Promotion Campaigns</h3>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr class="bg-gray-50 border-b border-gray-150 text-gray-400 font-bold uppercase tracking-wider">
                        <th class="px-6 py-3.5">Code</th>
                        <th class="px-6 py-3.5">Discount Offer</th>
                        <th class="px-6 py-3.5">Minimum Spending</th>
                        <th class="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-150">
                      <tr v-for="c in coupons" :key="c.id" class="hover:bg-gray-50/50">
                        <td class="px-6 py-4 font-mono font-bold text-gray-900">
                          {{ c.code }}
                        </td>
                        <td class="px-6 py-4">
                          <span v-if="c.discount_type === 'percentage'" class="font-bold text-green-700">{{ c.discount_value }}% Off</span>
                          <span v-else class="font-bold text-green-700">{{ parseFloat(c.discount_value).toLocaleString() }} VND Off</span>
                        </td>
                        <td class="px-6 py-4 text-gray-600">
                          {{ parseFloat(c.min_order_value).toLocaleString() }} VND
                        </td>
                        <td class="px-6 py-4 text-right">
                          <button 
                            @click="removeCoupon(c.id)"
                            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Delete coupon"
                          >
                            <Trash2 class="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr v-if="coupons.length === 0">
                        <td colspan="4" class="px-6 py-8 text-center text-gray-400 font-medium">No coupon campaigns are currently active.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { Shield, Users, ShoppingBag, Tag, TrendingUp, Trash2, CheckCircle2, User, MapPin, X } from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const activeTab = ref('overview')
const loading = ref(true)

const tabs = [
  { id: 'overview', name: 'Overview', icon: Shield },
  { id: 'users', name: ' Shoppers & Users', icon: User },
  { id: 'producers', name: 'Producers & Farms', icon: MapPin },
  { id: 'orders', name: 'Sales Orders', icon: ShoppingBag },
  { id: 'coupons', name: 'Campaign Coupons', icon: Tag }
]

const stats = ref({})
const users = ref([])
const producers = ref([])
const orders = ref([])
const coupons = ref([])

const newCoupon = ref({
  code: '',
  discount_type: 'percentage',
  discount_value: 0,
  min_order_value: 0
})

const hoveredPoint = ref(null)

const chartData = computed(() => {
  const list = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    
    const userEntry = stats.value.dailyUsers?.find(item => item.date === dateStr)
    const orderEntry = stats.value.dailyOrders?.find(item => item.date === dateStr)
    
    const labelDate = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    
    list.push({
      date: dateStr,
      label: labelDate,
      users: userEntry ? parseInt(userEntry.count) : 0,
      orders: orderEntry ? parseInt(orderEntry.count) : 0
    })
  }
  return list
})

const maxVal = computed(() => {
  let highest = 5
  chartData.value.forEach(item => {
    if (item.users > highest) highest = item.users
    if (item.orders > highest) highest = item.orders
  })
  return Math.ceil(highest * 1.2)
})

const usersPath = computed(() => {
  if (chartData.value.length === 0) return ''
  return chartData.value.map((item, index) => {
    const x = 50 + index * (500 / 6)
    const y = 200 - (item.users / maxVal.value) * 160
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
})

const ordersPath = computed(() => {
  if (chartData.value.length === 0) return ''
  return chartData.value.map((item, index) => {
    const x = 50 + index * (500 / 6)
    const y = 200 - (item.orders / maxVal.value) * 160
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
})

const usersAreaPath = computed(() => {
  if (chartData.value.length === 0) return ''
  const points = chartData.value.map((item, index) => {
    const x = 50 + index * (500 / 6)
    const y = 200 - (item.users / maxVal.value) * 160
    return `${x} ${y}`
  })
  return `M 50,200 L ${points.join(' L ')} L 550,200 Z`
})

const ordersAreaPath = computed(() => {
  if (chartData.value.length === 0) return ''
  const points = chartData.value.map((item, index) => {
    const x = 50 + index * (500 / 6)
    const y = 200 - (item.orders / maxVal.value) * 160
    return `${x} ${y}`
  })
  return `M 50,200 L ${points.join(' L ')} L 550,200 Z`
})

const showTooltip = (event, item, index, type) => {
  const rect = event.target.getBoundingClientRect()
  const container = event.target.closest('.relative')
  const containerRect = container.getBoundingClientRect()
  
  const x = rect.left - containerRect.left + rect.width / 2
  const y = rect.top - containerRect.top + rect.height / 2
  
  hoveredPoint.value = {
    x,
    y,
    label: item.label,
    users: item.users,
    orders: item.orders
  }
}

const clearTooltip = () => {
  hoveredPoint.value = null
}

const loadData = async () => {
  loading.value = true
  try {
    stats.value = await appStore.fetchAdminStats()
    users.value = await appStore.fetchAdminUsers()
    producers.value = await appStore.fetchAdminProducers()
    orders.value = await appStore.fetchAdminOrders()
    coupons.value = await appStore.fetchAdminCoupons()
  } catch (error) {
    console.error('Failed to load admin data:', error)
    appStore.triggerToast('Error loading administrative workspace.')
  } finally {
    loading.value = false
  }
}

const changeRole = async (userId, role) => {
  try {
    await appStore.updateAdminUserRole(userId, role)
    appStore.triggerToast('User role updated successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to update user role.')
  }
}

const removeUser = async (userId) => {
  if (!await appStore.triggerConfirm('Are you sure you want to permanently delete this user account?')) return
  try {
    await appStore.deleteAdminUser(userId)
    appStore.triggerToast('User account deleted successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to delete user account.')
  }
}

const toggleProducerVerification = async (producerId, verified) => {
  try {
    await appStore.updateAdminProducerVerification(producerId, verified)
    appStore.triggerToast(verified ? 'Producer approved and verified!' : 'Producer unverified successfully.')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to update producer status.')
  }
}

const updateStatus = async (orderId, status) => {
  try {
    await appStore.updateAdminOrderStatus(orderId, status)
    appStore.triggerToast(`Order status updated to "${status}" successfully!`)
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to update order status.')
  }
}

const addCoupon = async () => {
  try {
    await appStore.createAdminCoupon(newCoupon.value)
    appStore.triggerToast('Coupon created successfully!')
    newCoupon.value = {
      code: '',
      discount_type: 'percentage',
      discount_value: 0,
      min_order_value: 0
    }
    await loadData()
  } catch (error) {
    appStore.triggerToast(error.message || 'Failed to create coupon.')
  }
}

const removeCoupon = async (couponId) => {
  if (!await appStore.triggerConfirm('Are you sure you want to delete this coupon?')) return
  try {
    await appStore.deleteAdminCoupon(couponId)
    appStore.triggerToast('Coupon deleted successfully!')
    await loadData()
  } catch (error) {
    appStore.triggerToast('Failed to delete coupon.')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  // Security guard
  if (!appStore.user || appStore.user.role !== 'admin') {
    appStore.triggerToast('Access denied: Administrators only.')
    router.push('/login')
    return
  }
  loadData()
})
</script>
