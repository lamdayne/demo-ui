<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-3">
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">Home</router-link>
          <ChevronRight class="w-3 h-3" />
          <span class="text-[#1E4B35] font-semibold">My Account</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-1">My Account</h1>
        <p class="text-sm text-gray-500">Manage your profile, orders, addresses, and preferences.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <nav class="space-y-1">
              <button @click="activeTab = 'overview'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'overview' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <LayoutDashboard class="w-4 h-4" /> Overview
              </button>
              <button @click="activeTab = 'profile'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'profile' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <User class="w-4 h-4" /> Profile Details
              </button>
              <button @click="activeTab = 'addresses'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'addresses' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <MapPin class="w-4 h-4" /> Addresses
              </button>
              <button @click="activeTab = 'payments'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'payments' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <CreditCard class="w-4 h-4" /> Payment Methods
              </button>
              <button @click="activeTab = 'wishlist'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'wishlist' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <Heart class="w-4 h-4" /> Wishlist
              </button>
              <button @click="activeTab = 'traceability'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'traceability' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <ShieldCheck class="w-4 h-4" /> Traceability History
              </button>
              <router-link to="/orders" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                <Package class="w-4 h-4 text-gray-400" /> My Orders
              </router-link>
              <button @click="activeTab = 'notifications'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'notifications' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <Bell class="w-4 h-4" /> Notifications
              </button>
              <button @click="activeTab = 'security'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'security' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <Lock class="w-4 h-4" /> Security
              </button>
              <router-link to="/support" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                <HelpCircle class="w-4 h-4 text-gray-400" /> Support
              </router-link>
              <router-link to="/producer-dashboard" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                <Store class="w-4 h-4 text-gray-400" /> Producer Dashboard
              </router-link>
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition">
                <LogOut class="w-4 h-4 text-red-500" /> Log Out
              </button>
            </nav>
          </div>

          <!-- Need Help card -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 class="font-bold text-gray-900 text-sm">Need help?</h4>
            <p class="text-xs text-gray-500 leading-relaxed">Our support team is here to help you with anything you need.</p>
            <router-link to="/support" class="w-full py-2 bg-[#1E4B35] text-white rounded-lg text-xs font-bold text-center hover:bg-[#163a29] transition block">
              Contact Support
            </router-link>
            <router-link to="/support" class="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold text-center hover:bg-gray-50 transition block">
              Visit Help Center &rarr;
            </router-link>
          </div>
        </div>

        <!-- Main Account Content -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Profile Header Card (Shown on Overview & Profile tabs) -->
          <div v-if="activeTab === 'overview' || activeTab === 'profile'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex flex-col md:flex-row items-center gap-5">
              <div class="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                <img :src="profileData.photo" alt="Nguyen Van An" class="w-full h-full object-cover" />
                <button @click="triggerPhotoUpload" class="absolute bottom-0 inset-x-0 bg-black/50 text-white py-1 text-[9px] font-bold text-center hover:bg-black/75 transition">
                  <Camera class="w-3 h-3 mx-auto" />
                </button>
              </div>
              <div class="text-center md:text-left space-y-1.5">
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ profileData.name }}</h3>
                  <span class="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-green-200">Demo Account</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><Mail class="w-3.5 h-3.5" /> {{ profileData.email }}</div>
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><Phone class="w-3.5 h-3.5" /> {{ profileData.phone }}</div>
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><MapPin class="w-3.5 h-3.5" /> {{ profileData.city }}, {{ profileData.country }}</div>
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><Calendar class="w-3.5 h-3.5" /> Member since May 10, 2026</div>
                </div>
              </div>
            </div>
            <button @click="activeTab = 'profile'" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
              Edit Profile
            </button>
          </div>

          <!-- TAB CONTENT: OVERVIEW -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Quick Stats Row -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><ClipboardList class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ appStore.orders.length }}</div>
                  <router-link to="/orders" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center">Recent Orders &rarr;</router-link>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><MapPin class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ addressesList.length }}</div>
                  <button @click="activeTab = 'addresses'" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center">Manage addresses &rarr;</button>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Heart class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ wishlist.length }}</div>
                  <button @click="activeTab = 'wishlist'" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center">View wishlist &rarr;</button>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><ShieldCheck class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ traceHistory.length }}</div>
                  <button @click="activeTab = 'traceability'" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center">View history &rarr;</button>
                </div>
              </div>
            </div>

            <!-- Profile Summary & Default Address Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Profile details overview -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-gray-900 text-sm">Profile Details</h3>
                  <button @click="activeTab = 'profile'" class="text-xs font-bold text-[#1E4B35] hover:underline">Edit</button>
                </div>
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between border-b border-gray-50 pb-1.5">
                    <span class="text-gray-400">Full Name</span>
                    <span class="font-semibold text-gray-700">{{ profileData.name }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-50 pb-1.5">
                    <span class="text-gray-400">Email Address</span>
                    <span class="font-semibold text-gray-700">{{ profileData.email }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-50 pb-1.5">
                    <span class="text-gray-400">Phone Number</span>
                    <span class="font-semibold text-gray-700">{{ profileData.phone }}</span>
                  </div>
                </div>
              </div>

              <!-- Default shipping address overview -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-gray-900 text-sm">Default Address</h3>
                    <button @click="activeTab = 'addresses'" class="text-xs font-bold text-[#1E4B35] hover:underline">Manage</button>
                  </div>
                  <div v-if="defaultAddress" class="space-y-1.5 text-xs text-gray-600">
                    <h4 class="font-bold text-gray-900">{{ defaultAddress.recipient }}</h4>
                    <p class="leading-relaxed">
                      {{ defaultAddress.street }}<br/>
                      {{ defaultAddress.city }}, {{ defaultAddress.country }}<br/>
                      Phone: {{ defaultAddress.phone }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Orders section -->
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-gray-900 text-sm">Recent Orders</h3>
                <router-link to="/orders" class="text-xs font-bold text-gray-500 hover:text-[#1E4B35] flex items-center">View all orders &rarr;</router-link>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px]">
                      <th class="py-3 px-2">Order ID</th>
                      <th class="py-3 px-2">Date</th>
                      <th class="py-3 px-2">Items</th>
                      <th class="py-3 px-2">Total</th>
                      <th class="py-3 px-2">Status</th>
                      <th class="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="appStore.orders.length === 0">
                      <td colspan="6" class="text-center py-8 text-gray-400 font-medium">No recent orders found.</td>
                    </tr>
                    <tr v-for="order in appStore.orders.slice(0, 3)" :key="order.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td class="py-4 px-2 font-bold text-[#1E4B35] flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <Package class="w-4 h-4 text-gray-400" />
                        </div>
                        GT-{{ order.id }}
                      </td>
                      <td class="py-4 px-2 text-gray-600">{{ new Date(order.created_at).toLocaleDateString() }}</td>
                      <td class="py-4 px-2 text-gray-600">{{ order.items?.length || 0 }} items</td>
                      <td class="py-4 px-2 font-bold text-gray-900">{{ parseFloat(order.total_price).toLocaleString() }} VND</td>
                      <td class="py-4 px-2">
                        <span class="bg-green-50 text-green-700 px-2 py-0.5 rounded font-semibold text-[10px] border border-green-200">{{ order.status }}</span>
                      </td>
                      <td class="py-4 px-2 text-right">
                        <router-link to="/orders" class="px-3 py-1 border border-gray-300 rounded text-[10px] font-bold text-gray-700 hover:bg-gray-100 transition inline-block">View Order</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: PROFILE DETAILS -->
          <div v-if="activeTab === 'profile'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div class="border-b border-gray-100 pb-3">
              <h3 class="font-bold text-gray-900 text-sm">Edit Profile Information</h3>
              <p class="text-xs text-gray-500">Update your details to keep your account current.</p>
            </div>
            
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Full Name</label>
                  <input type="text" v-model="profileData.name" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                  <input type="email" v-model="profileData.email" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                  <input type="text" v-model="profileData.phone" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Date of Birth</label>
                  <input type="text" v-model="profileData.dob" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">City</label>
                  <input type="text" v-model="profileData.city" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Country</label>
                  <input type="text" v-model="profileData.country" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" />
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" @click="activeTab = 'overview'" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">Save Changes</button>
              </div>
            </form>
          </div>

          <!-- TAB CONTENT: ADDRESSES -->
          <div v-if="activeTab === 'addresses'" class="space-y-6">
            <div class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div>
                <h3 class="font-bold text-gray-900 text-sm">Delivery Addresses</h3>
                <p class="text-xs text-gray-500 mt-0.5">Manage addresses where your traceable products are shipped.</p>
              </div>
              <button @click="openAddAddressModal" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1">
                + Add Address
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(addr, idx) in addressesList" :key="idx" class="bg-white border rounded-2xl p-5 shadow-sm flex flex-col justify-between" :class="addr.isDefault ? 'border-[#1E4B35] ring-1 ring-[#1E4B35]/25' : 'border-gray-200'">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span v-if="addr.isDefault" class="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200">Default Shipping</span>
                    <span v-else class="text-[9px] text-gray-400 font-bold uppercase">{{ addr.label }}</span>
                    <button @click="deleteAddress(idx)" class="text-gray-400 hover:text-red-500 text-xs font-bold">Remove</button>
                  </div>
                  <h4 class="font-bold text-gray-900 text-sm">{{ addr.recipient }}</h4>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {{ addr.street }}<br/>
                    {{ addr.city }}, {{ addr.country }}<br/>
                    Phone: {{ addr.phone }}
                  </p>
                </div>
                <div v-if="!addr.isDefault" class="pt-4 mt-4 border-t border-gray-100">
                  <button @click="setDefaultAddress(idx)" class="text-[10px] font-bold text-[#1E4B35] hover:underline">Set as Default Address</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: PAYMENT METHODS -->
          <div v-if="activeTab === 'payments'" class="space-y-6">
            <div class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div>
                <h3 class="font-bold text-gray-900 text-sm">Saved Payment Methods</h3>
                <p class="text-xs text-gray-500 mt-0.5">Manage your wallets and cards connected to Green Trace.</p>
              </div>
              <button @click="simulatedAction('add_payment')" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                + Add Payment Method
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Method 1: VNPay -->
              <div class="bg-white border border-[#1E4B35] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200">Default Method</span>
                    <span class="text-[9px] text-green-600 font-bold uppercase bg-green-100 px-2 py-0.5 rounded">Linked</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">VNP</div>
                    <div>
                      <h4 class="font-bold text-gray-900 text-sm">VNPay Wallet</h4>
                      <p class="text-xs text-gray-500">Connected via +84 *** *** 678</p>
                    </div>
                  </div>
                </div>
                <div class="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                  <button @click="simulatedAction('unlink')" class="text-[10px] font-bold text-red-500 hover:underline">Disconnect Wallet</button>
                </div>
              </div>

              <!-- Method 2: Visa -->
              <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-[9px] text-gray-400 font-bold uppercase">Credit Card</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center border border-gray-100"><CreditCard class="w-5 h-5"/></div>
                    <div>
                      <h4 class="font-bold text-gray-900 text-sm">Visa Card ending in 4321</h4>
                      <p class="text-xs text-gray-500">Expires 12 / 2029</p>
                    </div>
                  </div>
                </div>
                <div class="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                  <button @click="simulatedAction('make_default')" class="text-[10px] font-bold text-[#1E4B35] hover:underline">Set as Default</button>
                  <button @click="simulatedAction('remove_card')" class="text-[10px] font-bold text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: WISHLIST -->
          <div v-if="activeTab === 'wishlist'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">My Wishlist</h3>
              <p class="text-xs text-gray-500 mt-0.5">Your saved traceable items list.</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="item in wishlist" :key="item.id" class="group border border-gray-150 rounded-xl overflow-hidden bg-white hover:shadow-md transition flex flex-col justify-between">
                <div class="relative aspect-square overflow-hidden bg-gray-50">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button @click="removeFromWishlist(item.id)" class="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-red-50 transition">
                    <Heart class="w-4 h-4 fill-current" />
                  </button>
                </div>
                <div class="p-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs line-clamp-2 leading-tight mb-1">{{ item.name }}</h4>
                    <p class="text-[10px] text-gray-500 mb-2 flex items-center gap-1"><User class="w-3 h-3"/> {{ item.producer }}</p>
                  </div>
                  <div class="mt-auto">
                    <div class="font-bold text-[#1E4B35] text-xs mb-2">{{ item.price.toLocaleString() }} VND</div>
                    <button @click="simulatedAction('add_cart')" class="w-full py-1.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded text-[10px] font-bold transition flex items-center justify-center gap-1">
                      <ShoppingCart class="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: TRACEABILITY HISTORY -->
          <div v-if="activeTab === 'traceability'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">Traceability History</h3>
              <p class="text-xs text-gray-500 mt-0.5">Logs of all QR code batch verification reports you have visited.</p>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px]">
                    <th class="py-3 px-2">Batch / Lot ID</th>
                    <th class="py-3 px-2">Product</th>
                    <th class="py-3 px-2">Producer</th>
                    <th class="py-3 px-2">Viewed On</th>
                    <th class="py-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="trace in traceHistory" :key="trace.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td class="py-4 px-2 font-mono font-bold text-gray-900">{{ trace.id }}</td>
                    <td class="py-4 px-2 text-gray-700 font-medium flex items-center gap-2">
                      <div class="w-8 h-8 rounded overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                        <img :src="trace.image" class="w-full h-full object-cover" />
                      </div>
                      {{ trace.product }}
                    </td>
                    <td class="py-4 px-2 text-gray-600">{{ trace.producer }}</td>
                    <td class="py-4 px-2 text-gray-500">{{ trace.date }}</td>
                    <td class="py-4 px-2 text-right">
                      <router-link to="/traceability" class="px-3 py-1 bg-green-50 text-[#1E4B35] rounded text-[10px] font-bold hover:bg-[#1E4B35] hover:text-white transition inline-block">
                        View Traceability
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB CONTENT: NOTIFICATIONS -->
          <div v-if="activeTab === 'notifications'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">Notifications Center</h3>
              <p class="text-xs text-gray-500 mt-0.5">Manage updates on deliveries and new certified batches.</p>
            </div>

            <!-- List -->
            <div class="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              <div v-for="notif in notificationsList" :key="notif.id" class="p-4 flex gap-3 hover:bg-gray-50 transition">
                <div class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" :class="notif.isRead ? 'bg-transparent' : 'bg-[#1E4B35]'"></div>
                <div class="flex-grow space-y-1">
                  <div class="font-bold text-xs text-gray-900">{{ notif.title }}</div>
                  <p class="text-[10px] text-gray-500">{{ notif.message }}</p>
                  <span class="text-[9px] text-gray-400 block pt-0.5">{{ notif.time }}</span>
                </div>
              </div>
            </div>

            <!-- Toggles -->
            <div class="space-y-4 pt-4 border-t border-gray-100">
              <h4 class="font-bold text-gray-900 text-xs">Email Preference Alerts</h4>
              <div class="flex justify-between items-center text-xs">
                <div>
                  <div class="font-bold text-gray-700">Order Dispatches</div>
                  <p class="text-[10px] text-gray-400">Receive emails when your batch departs shipping warehouses.</p>
                </div>
                <input type="checkbox" checked class="text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4 rounded" />
              </div>
              <div class="flex justify-between items-center text-xs">
                <div>
                  <div class="font-bold text-gray-700">Purity Lab Results Releases</div>
                  <p class="text-[10px] text-gray-400">Receive alerts when laboratory batch reports are attached to your purchased products.</p>
                </div>
                <input type="checkbox" checked class="text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4 rounded" />
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: SECURITY -->
          <div v-if="activeTab === 'security'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">Security & Password</h3>
              <p class="text-xs text-gray-500 mt-0.5">Manage options to protect your identity.</p>
            </div>

            <form @submit.prevent="saveSecurity" class="space-y-4 border-b border-gray-100 pb-6">
              <h4 class="font-bold text-gray-900 text-xs">Change Password</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Current Password</label>
                  <input type="password" v-model="changePasswordForm.current" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">New Password</label>
                  <input type="password" v-model="changePasswordForm.newPass" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Confirm Password</label>
                  <input type="password" v-model="changePasswordForm.confirm" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
              </div>
              <div class="flex justify-end pt-2">
                <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">Update Password</button>
              </div>
            </form>

            <div class="flex justify-between items-center text-xs">
              <div>
                <div class="font-bold text-gray-800">Two-Factor Authentication (2FA)</div>
                <p class="text-[10px] text-gray-500">Provide secondary phone confirmation codes upon logins.</p>
              </div>
              <button @click="simulatedAction('2fa')" class="px-3.5 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">Enable 2FA</button>
            </div>
          </div>

          <!-- Bottom Features Row (Always shown at account bottom) -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-gray-150 rounded-2xl">
            <div class="flex items-center gap-3">
              <Lock class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">Secure Payments</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">Multiple safe options</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Sprout class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">Quality Guaranteed</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">Carefully selected</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <RefreshCw class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">Easy Returns</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">7-day support</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Headphones class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">Friendly Support</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">We're here to help</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ADD ADDRESS MODAL -->
    <div v-if="isAddressModalOpen" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-100">
        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 class="font-bold text-gray-900 text-base">Add New Address</h3>
          <button @click="isAddressModalOpen = false" class="text-gray-400 hover:text-gray-600 font-bold text-lg">&times;</button>
        </div>

        <form @submit.prevent="saveNewAddress" class="space-y-3 text-xs">
          <div>
            <label class="font-bold text-gray-500 block mb-1">Recipient Name</label>
            <input type="text" v-model="newAddressForm.recipient" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. Nguyen Van An" required />
          </div>
          <div>
            <label class="font-bold text-gray-500 block mb-1">Street Address</label>
            <input type="text" v-model="newAddressForm.street" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 123 Le Loi Street" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-gray-500 block mb-1">City</label>
              <input type="text" v-model="newAddressForm.city" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. Ho Chi Minh City" required />
            </div>
            <div>
              <label class="font-bold text-gray-500 block mb-1">Country</label>
              <input type="text" v-model="newAddressForm.country" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. Vietnam" required />
            </div>
          </div>
          <div>
            <label class="font-bold text-gray-500 block mb-1">Phone Number</label>
            <input type="text" v-model="newAddressForm.phone" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. +84 912 345 678" required />
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="is_default" v-model="newAddressForm.isDefault" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
            <label for="is_default" class="text-gray-600 font-semibold cursor-pointer">Set as default shipping address</label>
          </div>

          <div class="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" @click="isAddressModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg font-bold transition">Add Address</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { ChevronRight, LayoutDashboard, User, MapPin, CreditCard, Heart, ShieldCheck, Package, Bell, Lock, HelpCircle, Camera, Mail, Phone, Calendar, ClipboardList, ShoppingCart, Key, Sprout, RefreshCw, Headphones, Store, LogOut } from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const activeTab = ref('overview')

function handleLogout() {
  appStore.logout()
  router.push('/login')
}

// Check if user is logged in
onMounted(async () => {
  if (!appStore.token) {
    router.push('/login')
    return
  }
  // Load data
  try {
    await appStore.fetchProfile()
    await loadAddresses()
    await appStore.fetchWishlist()
    await appStore.fetchOrders()
  } catch (err) {
    console.error('Error loading account data:', err)
  }
})

// Profile bindings
const profileData = computed(() => {
  return {
    name: appStore.user?.name || 'Nguyen Van An',
    email: appStore.user?.email || 'an.nguyen@example.demo',
    phone: appStore.user?.phone || '+84 912 345 678',
    dob: appStore.user?.dob || '15/08/1988',
    city: appStore.user?.city || 'Ho Chi Minh City',
    country: appStore.user?.country || 'Vietnam',
    photo: appStore.user?.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  }
})

// Addresses management
const addressesList = ref([])
async function loadAddresses() {
  try {
    const list = await appStore.fetchAddresses()
    addressesList.value = list.map(addr => ({
      id: addr.id,
      recipient: addr.recipient,
      street: addr.street,
      city: addr.city,
      country: addr.country,
      phone: addr.phone,
      isDefault: addr.is_default,
      label: addr.label || 'Home'
    }))
  } catch (err) {
    console.error(err)
  }
}

const defaultAddress = computed(() => addressesList.value.find(addr => addr.isDefault))

// Wishlist
const wishlist = computed(() => {
  return appStore.wishlist.map(item => ({
    id: item.id,
    name: item.name,
    producer: item.producer_name || 'Verified Farm',
    price: parseFloat(item.price),
    image: item.image_url
  }))
})

// Traceability history (mocked or loaded if desired)
const traceHistory = ref([
  {
    id: 'LOT-UMH-2605-001',
    product: 'U Minh Forest Wild Honey 500 ml',
    producer: 'U Minh Bee Farm',
    date: 'May 20, 2026',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'LOT-ST25-2605-002',
    product: 'ST25 Premium Rice 2 kg',
    producer: 'Ben Tre Green Co-op',
    date: 'May 19, 2026',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=100'
  }
])

// Notifications
const notificationsList = computed(() => {
  return appStore.notifications.map(notif => ({
    id: notif.id,
    title: notif.title,
    message: notif.message,
    time: new Date(notif.created_at).toLocaleDateString(),
    isRead: notif.is_read
  }))
})

// Modals / forms
const isAddressModalOpen = ref(false)
const newAddressForm = ref({ recipient: '', street: '', city: '', country: '', phone: '', isDefault: false })
const changePasswordForm = ref({ current: '', newPass: '', confirm: '' })

async function saveProfile() {
  try {
    await appStore.updateProfile({
      name: profileData.value.name,
      phone: profileData.value.phone,
      dob: profileData.value.dob,
      city: profileData.value.city,
      country: profileData.value.country,
      image_url: profileData.value.photo
    })
    alert('Profile updated successfully!')
    activeTab.value = 'overview'
  } catch (err) {
    alert(err.message || 'Failed to update profile')
  }
}

function openAddAddressModal() {
  newAddressForm.value = { recipient: '', street: '', city: '', country: '', phone: '', isDefault: false }
  isAddressModalOpen.value = true
}

async function saveNewAddress() {
  try {
    await appStore.addAddress({
      recipient: newAddressForm.value.recipient,
      street: newAddressForm.value.street,
      city: newAddressForm.value.city,
      country: newAddressForm.value.country,
      phone: newAddressForm.value.phone,
      is_default: newAddressForm.value.isDefault,
      label: 'Home'
    })
    isAddressModalOpen.value = false
    await loadAddresses()
    alert('Address added successfully!')
  } catch (err) {
    alert(err.message || 'Failed to add address')
  }
}

async function deleteAddress(idx) {
  if (confirm('Are you sure you want to delete this address?')) {
    try {
      const address = addressesList.value[idx]
      await appStore.deleteAddress(address.id)
      await loadAddresses()
      alert('Address deleted successfully!')
    } catch (err) {
      alert(err.message || 'Failed to delete address')
    }
  }
}

async function setDefaultAddress(idx) {
  try {
    const address = addressesList.value[idx]
    await appStore.updateAddress(address.id, {
      is_default: true
    })
    await loadAddresses()
    alert('Default address updated!')
  } catch (err) {
    alert(err.message || 'Failed to set default address')
  }
}

async function removeFromWishlist(id) {
  try {
    await appStore.toggleWishlist(id)
    alert('Removed from wishlist.')
  } catch (err) {
    alert(err.message || 'Failed to remove from wishlist')
  }
}

async function saveSecurity() {
  if (changePasswordForm.value.newPass !== changePasswordForm.value.confirm) {
    alert('Passwords do not match!')
    return
  }
  try {
    await appStore.changePassword(changePasswordForm.value.current, changePasswordForm.value.newPass)
    alert('Password changed successfully!')
    changePasswordForm.value = { current: '', newPass: '', confirm: '' }
  } catch (err) {
    alert(err.message || 'Failed to change password')
  }
}

async function triggerPhotoUpload() {
  const newUrl = prompt('Enter image URL to change profile picture:', profileData.value.photo)
  if (newUrl) {
    try {
      await appStore.updateProfile({
        image_url: newUrl
      })
      alert('Photo updated!')
    } catch (err) {
      alert('Failed to update photo')
    }
  }
}

function simulatedAction(type) {
  alert(`Simulated action: ${type}`)
}
</script>
