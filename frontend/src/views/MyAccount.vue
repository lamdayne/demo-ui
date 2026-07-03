<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Breadcrumbs -->
    <div class="border-b border-gray-200 bg-white">
      <div class="container mx-auto px-4 max-w-6xl py-3">
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <router-link to="/" class="hover:text-[#1E4B35]">{{ t.home }}</router-link>
          <ChevronRight class="w-3 h-3" />
          <span class="text-[#1E4B35] font-semibold">{{ t.myAccount }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-1">{{ t.myAccount }}</h1>
        <p class="text-sm text-gray-500">{{ t.subTitle }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <nav class="space-y-1">
              <button @click="activeTab = 'overview'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'overview' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <LayoutDashboard class="w-4 h-4" /> {{ sidebarTabs.overview }}
              </button>
              <button @click="activeTab = 'profile'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'profile' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <User class="w-4 h-4" /> {{ sidebarTabs.profile }}
              </button>
              <button @click="activeTab = 'addresses'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'addresses' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <MapPin class="w-4 h-4" /> {{ sidebarTabs.addresses }}
              </button>
              <button @click="activeTab = 'payments'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'payments' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <CreditCard class="w-4 h-4" /> {{ sidebarTabs.payments }}
              </button>
              <button @click="activeTab = 'wishlist'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'wishlist' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <Heart class="w-4 h-4" /> {{ sidebarTabs.wishlist }}
              </button>
              <button @click="activeTab = 'traceability'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'traceability' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <ShieldCheck class="w-4 h-4" /> {{ sidebarTabs.traceability }}
              </button>
              <router-link to="/orders" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                <Package class="w-4 h-4 text-gray-400" /> {{ sidebarTabs.orders }}
              </router-link>
              <button @click="activeTab = 'notifications'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'notifications' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <Bell class="w-4 h-4" /> {{ sidebarTabs.notifications }}
              </button>
              <button @click="activeTab = 'security'" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition" :class="activeTab === 'security' ? 'bg-green-50 text-[#1E4B35]' : 'text-gray-700 hover:bg-gray-50'">
                <Lock class="w-4 h-4" /> {{ sidebarTabs.security }}
              </button>
              <router-link to="/support" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                <HelpCircle class="w-4 h-4 text-gray-400" /> {{ sidebarTabs.support }}
              </router-link>
              <router-link v-if="appStore.user?.role === 'producer' || appStore.user?.role === 'admin'" to="/producer-dashboard" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                <Store class="w-4 h-4 text-gray-400" /> {{ sidebarTabs.producerDashboard }}
              </router-link>
              <router-link v-if="appStore.user?.role === 'admin'" to="/admin" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-[#1E4B35] hover:bg-green-50 transition">
                <ShieldCheck class="w-4 h-4 text-[#1E4B35]" /> {{ sidebarTabs.admin }}
              </router-link>
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition">
                <LogOut class="w-4 h-4 text-red-500" /> {{ sidebarTabs.logout }}
              </button>
            </nav>
          </div>

          <!-- Need Help card -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 class="font-bold text-gray-900 text-sm">{{ t.needHelp }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ t.needHelpDesc }}</p>
            <router-link to="/support" class="w-full py-2 bg-[#1E4B35] text-white rounded-lg text-xs font-bold text-center hover:bg-[#163a29] transition block">
              {{ t.contactSupport }}
            </router-link>
            <router-link to="/support" class="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold text-center hover:bg-gray-50 transition block" v-html="t.visitHelpCenter"></router-link>
          </div>
        </div>

        <!-- Main Account Content -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Profile Header Card (Shown on Overview & Profile tabs) -->
          <div v-if="activeTab === 'overview' || activeTab === 'profile'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex flex-col md:flex-row items-center gap-5">
              <div class="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                <img :src="profileData.photo" alt="Profile avatar" class="w-full h-full object-cover" />
                <button @click="triggerPhotoUpload" class="absolute bottom-0 inset-x-0 bg-black/50 text-white py-1 text-[9px] font-bold text-center hover:bg-black/75 transition">
                  <Camera class="w-3 h-3 mx-auto" />
                </button>
                <input 
                  type="file" 
                  ref="avatarFileInput" 
                  accept="image/*" 
                  class="hidden" 
                  @change="handleAvatarUpload" 
                />
              </div>
              <div class="text-center md:text-left space-y-1.5">
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ profileData.name }}</h3>
                  <span class="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded font-semibold border border-green-200">{{ t.demoAccount }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><Mail class="w-3.5 h-3.5" /> {{ profileData.email }}</div>
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><Phone class="w-3.5 h-3.5" /> {{ profileData.phone }}</div>
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><MapPin class="w-3.5 h-3.5" /> {{ profileData.city }}, {{ profileData.country }}</div>
                  <div class="flex items-center gap-1.5 justify-center md:justify-start"><Calendar class="w-3.5 h-3.5" /> {{ t.memberSince }}</div>
                </div>
              </div>
            </div>
            <button @click="activeTab = 'profile'" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
              {{ t.editProfileBtn }}
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
                  <router-link to="/orders" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center" v-html="t.recentOrdersLink"></router-link>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><MapPin class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ addressesList.length }}</div>
                  <button @click="activeTab = 'addresses'" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center" v-html="t.manageAddressesLink"></button>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Heart class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ wishlist.length }}</div>
                  <button @click="activeTab = 'wishlist'" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center" v-html="t.viewWishlistLink"></button>
                </div>
              </div>

              <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><ShieldCheck class="w-5 h-5"/></div>
                <div>
                  <div class="text-base font-extrabold text-gray-900">{{ traceHistory.length }}</div>
                  <button @click="activeTab = 'traceability'" class="text-[10px] text-gray-500 hover:text-[#1E4B35] font-semibold flex items-center" v-html="t.viewHistoryLink"></button>
                </div>
              </div>
            </div>

            <!-- Profile Summary & Default Address Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Profile details overview -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-gray-900 text-sm">{{ t.profileDetails }}</h3>
                  <button @click="activeTab = 'profile'" class="text-xs font-bold text-[#1E4B35] hover:underline">{{ t.edit }}</button>
                </div>
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between border-b border-gray-50 pb-1.5">
                    <span class="text-gray-400">{{ t.fullName }}</span>
                    <span class="font-semibold text-gray-700">{{ profileData.name }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-50 pb-1.5">
                    <span class="text-gray-400">{{ t.emailAddress }}</span>
                    <span class="font-semibold text-gray-700">{{ profileData.email }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-50 pb-1.5">
                    <span class="text-gray-400">{{ t.phoneNumber }}</span>
                    <span class="font-semibold text-gray-700">{{ profileData.phone }}</span>
                  </div>
                </div>
              </div>

              <!-- Default shipping address overview -->
              <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-gray-900 text-sm">{{ t.defaultAddress }}</h3>
                    <button @click="activeTab = 'addresses'" class="text-xs font-bold text-[#1E4B35] hover:underline">{{ t.manage }}</button>
                  </div>
                  <div v-if="defaultAddress" class="space-y-1.5 text-xs text-gray-600">
                    <h4 class="font-bold text-gray-900">{{ defaultAddress.recipient }}</h4>
                    <p class="leading-relaxed">
                      {{ defaultAddress.street }}<br/>
                      {{ defaultAddress.city }}, {{ defaultAddress.country }}<br/>
                      {{ t.phoneLabel }}: {{ defaultAddress.phone }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Orders section -->
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-gray-900 text-sm">{{ t.recentOrders }}</h3>
                <router-link to="/orders" class="text-xs font-bold text-gray-500 hover:text-[#1E4B35] flex items-center" v-html="t.viewAllOrders"></router-link>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px]">
                      <th class="py-3 px-2">{{ t.orderIdCol }}</th>
                      <th class="py-3 px-2">{{ t.dateCol }}</th>
                      <th class="py-3 px-2">{{ t.itemsCol }}</th>
                      <th class="py-3 px-2">{{ t.totalCol }}</th>
                      <th class="py-3 px-2">{{ t.statusCol }}</th>
                      <th class="py-3 px-2 text-right">{{ t.actionsCol }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="appStore.orders.length === 0">
                      <td colspan="6" class="text-center py-8 text-gray-400 font-medium">{{ t.noRecentOrders }}</td>
                    </tr>
                    <tr v-for="order in appStore.orders.slice(0, 3)" :key="order.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td class="py-4 px-2 font-bold text-[#1E4B35] flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <Package class="w-4 h-4 text-gray-400" />
                        </div>
                        GT-{{ order.id }}
                      </td>
                      <td class="py-4 px-2 text-gray-600">{{ new Date(order.created_at).toLocaleDateString() }}</td>
                      <td class="py-4 px-2 text-gray-600">{{ t.itemsCount.replace('{count}', (order.items?.length || 0).toString()) }}</td>
                      <td class="py-4 px-2 font-bold text-gray-900">{{ parseFloat(order.total_price).toLocaleString() }} VND</td>
                      <td class="py-4 px-2">
                        <span class="bg-green-50 text-green-700 px-2 py-0.5 rounded font-semibold text-[10px] border border-green-200">
                          {{ order.status === 'Completed' && appStore.lang === 'vi' ? 'Đã hoàn thành' : order.status }}
                        </span>
                      </td>
                      <td class="py-4 px-2 text-right">
                        <router-link to="/orders" class="px-3 py-1 border border-gray-300 rounded text-[10px] font-bold text-gray-700 hover:bg-gray-100 transition inline-block">{{ t.viewOrder }}</router-link>
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
              <h3 class="font-bold text-gray-900 text-sm">{{ t.editProfileInfo }}</h3>
              <p class="text-xs text-gray-500">{{ t.updateDetailsDesc }}</p>
            </div>
            
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.fullName }}</label>
                  <input type="text" v-model="profileData.name" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.emailAddress }}</label>
                  <input type="email" v-model="profileData.email" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.phoneNumber }}</label>
                  <input type="text" v-model="profileData.phone" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.dateOfBirth }}</label>
                  <input type="text" v-model="profileData.dob" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.city }}</label>
                  <input type="text" v-model="profileData.city" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.country }}</label>
                  <input type="text" v-model="profileData.country" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" />
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" @click="activeTab = 'overview'" class="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50">{{ t.cancel }}</button>
                <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">{{ t.saveChanges }}</button>
              </div>
            </form>
          </div>

          <!-- TAB CONTENT: ADDRESSES -->
          <div v-if="activeTab === 'addresses'" class="space-y-6">
            <div class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div>
                <h3 class="font-bold text-gray-900 text-sm">{{ t.deliveryAddresses }}</h3>
                <p class="text-xs text-gray-500 mt-0.5">{{ t.deliveryAddressesDesc }}</p>
              </div>
              <button @click="openAddAddressModal" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1">
                {{ t.addAddressBtn }}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(addr, idx) in addressesList" :key="idx" class="bg-white border rounded-2xl p-5 shadow-sm flex flex-col justify-between" :class="addr.isDefault ? 'border-[#1E4B35] ring-1 ring-[#1E4B35]/25' : 'border-gray-200'">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span v-if="addr.isDefault" class="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200">{{ t.defaultShipping }}</span>
                    <span v-else class="text-[9px] text-gray-400 font-bold uppercase">{{ addr.label }}</span>
                    <button @click="deleteAddress(idx)" class="text-gray-400 hover:text-red-500 text-xs font-bold">{{ t.remove }}</button>
                  </div>
                  <h4 class="font-bold text-gray-900 text-sm">{{ addr.recipient }}</h4>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {{ addr.street }}<br/>
                    {{ addr.city }}, {{ addr.country }}<br/>
                    {{ t.phoneLabel }}: {{ addr.phone }}
                  </p>
                </div>
                <div v-if="!addr.isDefault" class="pt-4 mt-4 border-t border-gray-100">
                  <button @click="setDefaultAddress(idx)" class="text-[10px] font-bold text-[#1E4B35] hover:underline">{{ t.setAsDefault }}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: PAYMENT METHODS -->
          <div v-if="activeTab === 'payments'" class="space-y-6">
            <div class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div>
                <h3 class="font-bold text-gray-900 text-sm">{{ t.savedPaymentMethods }}</h3>
                <p class="text-xs text-gray-500 mt-0.5">{{ t.paymentDesc }}</p>
              </div>
              <button @click="simulatedAction('add_payment')" class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                {{ t.addPaymentBtn }}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Method 1: VNPay -->
              <div class="bg-white border border-[#1E4B35] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200">{{ t.defaultMethod }}</span>
                    <span class="text-[9px] text-green-600 font-bold uppercase bg-green-100 px-2 py-0.5 rounded">{{ t.linked }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">VNP</div>
                    <div>
                      <h4 class="font-bold text-gray-900 text-sm">{{ t.vnpayWallet }}</h4>
                      <p class="text-xs text-gray-500">{{ t.connectedVia.replace('{phone}', '+84 *** *** 678') }}</p>
                    </div>
                  </div>
                </div>
                <div class="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                  <button @click="simulatedAction('unlink')" class="text-[10px] font-bold text-red-500 hover:underline">{{ t.disconnectWallet }}</button>
                </div>
              </div>

              <!-- Method 2: Visa -->
              <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-[9px] text-gray-400 font-bold uppercase">{{ t.creditCard }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center border border-gray-100"><CreditCard class="w-5 h-5"/></div>
                    <div>
                      <h4 class="font-bold text-gray-900 text-sm">{{ t.visaEnding.replace('{digits}', '4321') }}</h4>
                      <p class="text-xs text-gray-500">{{ t.expires.replace('{date}', '12 / 2029') }}</p>
                    </div>
                  </div>
                </div>
                <div class="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                  <button @click="simulatedAction('make_default')" class="text-[10px] font-bold text-[#1E4B35] hover:underline">{{ t.setAsDefault }}</button>
                  <button @click="simulatedAction('remove_card')" class="text-[10px] font-bold text-red-500 hover:underline">{{ t.delete }}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: WISHLIST -->
          <div v-if="activeTab === 'wishlist'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">{{ t.myWishlist }}</h3>
              <p class="text-xs text-gray-500 mt-0.5">{{ t.wishlistDesc }}</p>
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
                      <ShoppingCart class="w-3 h-3" /> {{ t.addToCart }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: TRACEABILITY HISTORY -->
          <div v-if="activeTab === 'traceability'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">{{ t.traceHistoryTitle }}</h3>
              <p class="text-xs text-gray-500 mt-0.5">{{ t.traceHistoryDesc }}</p>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-gray-100 text-gray-400 font-bold uppercase text-[9px]">
                    <th class="py-3 px-2">{{ t.batchLotId }}</th>
                    <th class="py-3 px-2">{{ t.product }}</th>
                    <th class="py-3 px-2">{{ t.producer }}</th>
                    <th class="py-3 px-2">{{ t.viewedOn }}</th>
                    <th class="py-3 px-2 text-right">{{ t.actionsCol }}</th>
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
                        {{ t.viewTraceability }}
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
              <h3 class="font-bold text-gray-900 text-sm">{{ t.notificationsCenter }}</h3>
              <p class="text-xs text-gray-500 mt-0.5">{{ t.notifDesc }}</p>
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
              <h4 class="font-bold text-gray-900 text-xs">{{ t.emailPreference }}</h4>
              <div class="flex justify-between items-center text-xs">
                <div>
                  <div class="font-bold text-gray-700">{{ t.orderDispatches }}</div>
                  <p class="text-[10px] text-gray-400">{{ t.orderDispatchesDesc }}</p>
                </div>
                <input type="checkbox" checked class="text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4 rounded" />
              </div>
              <div class="flex justify-between items-center text-xs">
                <div>
                  <div class="font-bold text-gray-700">{{ t.purityLabReleases }}</div>
                  <p class="text-[10px] text-gray-400">{{ t.purityLabReleasesDesc }}</p>
                </div>
                <input type="checkbox" checked class="text-[#1E4B35] focus:ring-[#1E4B35] w-4 h-4 rounded" />
              </div>
            </div>
          </div>

          <!-- TAB CONTENT: SECURITY -->
          <div v-if="activeTab === 'security'" class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 text-sm">{{ t.securityPassword }}</h3>
              <p class="text-xs text-gray-500 mt-0.5">{{ t.securityDesc }}</p>
            </div>

            <form @submit.prevent="saveSecurity" class="space-y-4 border-b border-gray-100 pb-6">
              <h4 class="font-bold text-gray-900 text-xs">{{ t.changePassword }}</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.currentPassword }}</label>
                  <input type="password" v-model="changePasswordForm.current" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.newPassword }}</label>
                  <input type="password" v-model="changePasswordForm.newPass" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
                <div>
                  <label class="text-[10px] font-bold text-gray-400 uppercase">{{ t.confirmPassword }}</label>
                  <input type="password" v-model="changePasswordForm.confirm" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E4B35]" required />
                </div>
              </div>
              <div class="flex justify-end pt-2">
                <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">{{ t.updatePassword }}</button>
              </div>
            </form>

            <div class="flex justify-between items-center text-xs">
              <div>
                <div class="font-bold text-gray-800">{{ t.twoFactorAuth }}</div>
                <p class="text-[10px] text-gray-500">{{ t.twoFactorAuthDesc }}</p>
              </div>
              <button @click="simulatedAction('2fa')" class="px-3.5 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">{{ t.enable2fa }}</button>
            </div>
          </div>

          <!-- Bottom Features Row (Always shown at account bottom) -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-gray-150 rounded-2xl">
            <div class="flex items-center gap-3 text-left">
              <Lock class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">{{ t.securePayments }}</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">{{ t.securePaymentsDesc }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-left">
              <Sprout class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">{{ t.qualityGuaranteed }}</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">{{ t.qualityGuaranteedDesc }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-left">
              <RefreshCw class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">{{ t.easyReturns }}</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">{{ t.easyReturnsDesc }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-left">
              <Headphones class="w-6 h-6 text-[#1E4B35] flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">{{ t.friendlySupport }}</h4>
                <p class="text-[9px] text-gray-500 mt-0.5">{{ t.friendlySupportDesc }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ADD ADDRESS MODAL -->
    <div v-if="isAddressModalOpen" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-100 text-left">
        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 class="font-bold text-gray-900 text-base">{{ t.addNewAddress }}</h3>
          <button @click="isAddressModalOpen = false" class="text-gray-400 hover:text-gray-600 font-bold text-lg">&times;</button>
        </div>

        <form @submit.prevent="saveNewAddress" class="space-y-3 text-xs">
          <div>
            <label class="font-bold text-gray-500 block mb-1">{{ t.recipientName }}</label>
            <input type="text" v-model="newAddressForm.recipient" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. Nguyen Van An" required />
          </div>
          <div>
            <label class="font-bold text-gray-500 block mb-1">{{ t.streetAddress }}</label>
            <input type="text" v-model="newAddressForm.street" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. 123 Le Loi Street" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-gray-500 block mb-1">{{ t.city }}</label>
              <input type="text" v-model="newAddressForm.city" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. Ho Chi Minh City" required />
            </div>
            <div>
              <label class="font-bold text-gray-500 block mb-1">{{ t.country }}</label>
              <input type="text" v-model="newAddressForm.country" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. Vietnam" required />
            </div>
          </div>
          <div>
            <label class="font-bold text-gray-500 block mb-1">{{ t.phoneNumber }}</label>
            <input type="text" v-model="newAddressForm.phone" class="w-full border border-gray-300 rounded-lg p-2.5" placeholder="e.g. +84 912 345 678" required />
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="is_default" v-model="newAddressForm.isDefault" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
            <label for="is_default" class="text-gray-600 font-semibold cursor-pointer">{{ t.setDefaultShippingCheckbox }}</label>
          </div>

          <div class="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button type="button" @click="isAddressModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700">{{ t.cancel }}</button>
            <button type="submit" class="px-5 py-2 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg font-bold transition">{{ t.addAddressBtn }}</button>
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
const avatarFileInput = ref(null)

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

const sidebarTabs = computed(() => {
  const isVi = appStore.lang === 'vi'
  return {
    overview: isVi ? 'Tổng quan' : 'Overview',
    profile: isVi ? 'Thông tin hồ sơ' : 'Profile Details',
    addresses: isVi ? 'Địa chỉ' : 'Addresses',
    payments: isVi ? 'Phương thức thanh toán' : 'Payment Methods',
    wishlist: isVi ? 'Yêu thích' : 'Wishlist',
    traceability: isVi ? 'Lịch sử truy xuất' : 'Traceability History',
    orders: isVi ? 'Đơn hàng của tôi' : 'My Orders',
    notifications: isVi ? 'Thông báo' : 'Notifications',
    security: isVi ? 'Bảo mật' : 'Security',
    support: isVi ? 'Hỗ trợ' : 'Support',
    producerDashboard: isVi ? 'Kênh nhà sản xuất' : 'Producer Dashboard',
    admin: isVi ? 'Bảng quản trị' : 'Admin Control Panel',
    logout: isVi ? 'Đăng xuất' : 'Log Out'
  }
})

const t = computed(() => {
  return appStore.lang === 'vi' ? {
    home: 'Trang chủ',
    myAccount: 'Tài khoản của tôi',
    subTitle: 'Quản lý hồ sơ, đơn hàng, địa chỉ và tùy chọn của bạn.',
    needHelp: 'Cần hỗ trợ?',
    needHelpDesc: 'Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn với bất kỳ điều gì bạn cần.',
    contactSupport: 'Liên hệ Hỗ trợ',
    visitHelpCenter: 'Truy cập Trung tâm trợ giúp &rarr;',
    demoAccount: 'Tài khoản thử nghiệm',
    memberSince: 'Thành viên từ 10 tháng 5, 2026',
    editProfileBtn: 'Chỉnh sửa hồ sơ',
    recentOrdersLink: 'Đơn hàng gần đây &rarr;',
    manageAddressesLink: 'Quản lý địa chỉ &rarr;',
    viewWishlistLink: 'Xem danh sách yêu thích &rarr;',
    viewHistoryLink: 'Xem lịch sử &rarr;',
    profileDetails: 'Chi tiết hồ sơ',
    edit: 'Sửa',
    fullName: 'Họ và tên',
    emailAddress: 'Địa chỉ email',
    phoneNumber: 'Số điện thoại',
    defaultAddress: 'Địa chỉ mặc định',
    manage: 'Quản lý',
    phoneLabel: 'Điện thoại',
    recentOrders: 'Đơn hàng gần đây',
    viewAllOrders: 'Xem tất cả đơn hàng &rarr;',
    orderIdCol: 'Mã đơn hàng',
    dateCol: 'Ngày',
    itemsCol: 'Sản phẩm',
    totalCol: 'Tổng tiền',
    statusCol: 'Trạng thái',
    actionsCol: 'Hành động',
    noRecentOrders: 'Không tìm thấy đơn hàng nào gần đây.',
    itemsCount: '{count} sản phẩm',
    viewOrder: 'Xem đơn hàng',
    editProfileInfo: 'Chỉnh sửa thông tin hồ sơ',
    updateDetailsDesc: 'Cập nhật chi tiết để giữ cho tài khoản của bạn luôn mới nhất.',
    dateOfBirth: 'Ngày sinh',
    city: 'Thành phố',
    country: 'Quốc gia',
    cancel: 'Hủy',
    saveChanges: 'Lưu thay đổi',
    deliveryAddresses: 'Địa chỉ giao hàng',
    deliveryAddressesDesc: 'Quản lý địa chỉ giao các sản phẩm có thể truy xuất nguồn gốc của bạn.',
    addAddressBtn: '+ Thêm địa chỉ',
    defaultShipping: 'Địa chỉ mặc định',
    remove: 'Xóa',
    setAsDefault: 'Đặt làm mặc định',
    savedPaymentMethods: 'Phương thức thanh toán đã lưu',
    paymentDesc: 'Quản lý ví và thẻ được kết nối với Green Trace.',
    addPaymentBtn: '+ Thêm phương thức thanh toán',
    defaultMethod: 'Phương thức mặc định',
    linked: 'Đã liên kết',
    vnpayWallet: 'Ví VNPay',
    connectedVia: 'Đã kết nối qua {phone}',
    disconnectWallet: 'Ngắt kết nối ví',
    creditCard: 'Thẻ tín dụng',
    visaEnding: 'Thẻ Visa đuôi {digits}',
    expires: 'Hết hạn {date}',
    delete: 'Xóa',
    myWishlist: 'Danh sách yêu thích của tôi',
    wishlistDesc: 'Danh sách các mặt hàng có thể truy xuất nguồn gốc đã lưu của bạn.',
    addToCart: 'Thêm vào giỏ',
    traceHistoryTitle: 'Lịch sử truy xuất nguồn gốc',
    traceHistoryDesc: 'Nhật ký của tất cả các báo cáo xác minh lô hàng bằng mã QR bạn đã truy cập.',
    batchLotId: 'Mã lô hàng',
    product: 'Sản phẩm',
    producer: 'Nhà sản xuất',
    viewedOn: 'Xem lúc',
    viewTraceability: 'Xem truy xuất',
    notificationsCenter: 'Trung tâm thông báo',
    notifDesc: 'Quản lý cập nhật về giao hàng và các lô hàng mới được chứng nhận.',
    emailPreference: 'Cảnh báo tùy chọn email',
    orderDispatches: 'Giao hàng',
    orderDispatchesDesc: 'Nhận email khi lô hàng của bạn bắt đầu vận chuyển.',
    purityLabReleases: 'Công bộ kết quả kiểm nghiệm độ tinh khiết',
    purityLabReleasesDesc: 'Nhận cảnh báo khi báo cáo kiểm nghiệm của phòng thí nghiệm được đính kèm vào sản phẩm bạn đã mua.',
    securityPassword: 'Bảo mật & Mật khẩu',
    securityDesc: 'Quản lý các tùy chọn để bảo vệ danh tính của bạn.',
    changePassword: 'Đổi mật khẩu',
    currentPassword: 'Mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu',
    updatePassword: 'Cập nhật mật khẩu',
    twoFactorAuth: 'Xác thực hai yếu tố (2FA)',
    twoFactorAuthDesc: 'Cung cấp mã xác nhận điện thoại phụ khi đăng nhập.',
    enable2fa: 'Bật 2FA',
    securePayments: 'Thanh toán an toàn',
    securePaymentsDesc: 'Nhiều lựa chọn an toàn',
    qualityGuaranteed: 'Đảm bảo chất lượng',
    qualityGuaranteedDesc: 'Được tuyển chọn kỹ lưỡng',
    easyReturns: 'Trả hàng dễ dàng',
    easyReturnsDesc: 'Hỗ trợ trong 7 ngày',
    friendlySupport: 'Hỗ trợ thân thiện',
    friendlySupportDesc: 'Chúng tôi luôn ở đây',
    addNewAddress: 'Thêm địa chỉ mới',
    recipientName: 'Tên người nhận',
    streetAddress: 'Địa chỉ đường phố',
    setDefaultShippingCheckbox: 'Đặt làm địa chỉ giao hàng mặc định'
  } : {
    home: 'Home',
    myAccount: 'My Account',
    subTitle: 'Manage your profile, orders, addresses, and preferences.',
    needHelp: 'Need help?',
    needHelpDesc: 'Our support team is here to help you with anything you need.',
    contactSupport: 'Contact Support',
    visitHelpCenter: 'Visit Help Center &rarr;',
    demoAccount: 'Demo Account',
    memberSince: 'Member since May 10, 2026',
    editProfileBtn: 'Edit Profile',
    recentOrdersLink: 'Recent Orders &rarr;',
    manageAddressesLink: 'Manage addresses &rarr;',
    viewWishlistLink: 'View wishlist &rarr;',
    viewHistoryLink: 'View history &rarr;',
    profileDetails: 'Profile Details',
    edit: 'Edit',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    defaultAddress: 'Default Address',
    manage: 'Manage',
    phoneLabel: 'Phone',
    recentOrders: 'Recent Orders',
    viewAllOrders: 'View all orders &rarr;',
    orderIdCol: 'Order ID',
    dateCol: 'Date',
    itemsCol: 'Items',
    totalCol: 'Total',
    statusCol: 'Status',
    actionsCol: 'Actions',
    noRecentOrders: 'No recent orders found.',
    itemsCount: '{count} items',
    viewOrder: 'View Order',
    editProfileInfo: 'Edit Profile Information',
    updateDetailsDesc: 'Update your details to keep your account current.',
    dateOfBirth: 'Date of Birth',
    city: 'City',
    country: 'Country',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    deliveryAddresses: 'Delivery Addresses',
    deliveryAddressesDesc: 'Manage addresses where your traceable products are shipped.',
    addAddressBtn: '+ Add Address',
    defaultShipping: 'Default Shipping',
    remove: 'Remove',
    setAsDefault: 'Set as Default Address',
    savedPaymentMethods: 'Saved Payment Methods',
    paymentDesc: 'Manage your wallets and cards connected to Green Trace.',
    addPaymentBtn: '+ Add Payment Method',
    defaultMethod: 'Default Method',
    linked: 'Linked',
    vnpayWallet: 'VNPay Wallet',
    connectedVia: 'Connected via {phone}',
    disconnectWallet: 'Disconnect Wallet',
    creditCard: 'Credit Card',
    visaEnding: 'Visa Card ending in {digits}',
    expires: 'Expires {date}',
    delete: 'Delete',
    myWishlist: 'My Wishlist',
    wishlistDesc: 'Your saved traceable items list.',
    addToCart: 'Add to Cart',
    traceHistoryTitle: 'Traceability History',
    traceHistoryDesc: 'Logs of all QR code batch verification reports you have visited.',
    batchLotId: 'Batch / Lot ID',
    product: 'Product',
    producer: 'Producer',
    viewedOn: 'Viewed On',
    viewTraceability: 'View Traceability',
    notificationsCenter: 'Notifications Center',
    notifDesc: 'Manage updates on deliveries and new certified batches.',
    emailPreference: 'Email Preference Alerts',
    orderDispatches: 'Order Dispatches',
    orderDispatchesDesc: 'Receive emails when your batch departs shipping warehouses.',
    purityLabReleases: 'Purity Lab Results Releases',
    purityLabReleasesDesc: 'Receive alerts when laboratory batch reports are attached to your purchased products.',
    securityPassword: 'Security & Password',
    securityDesc: 'Manage options to protect your identity.',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    updatePassword: 'Update Password',
    twoFactorAuth: 'Two-Factor Authentication (2FA)',
    twoFactorAuthDesc: 'Provide secondary phone confirmation codes upon logins.',
    enable2fa: 'Enable 2FA',
    securePayments: 'Secure Payments',
    securePaymentsDesc: 'Multiple safe options',
    qualityGuaranteed: 'Quality Guaranteed',
    qualityGuaranteedDesc: 'Carefully selected',
    easyReturns: 'Easy Returns',
    easyReturnsDesc: '7-day support',
    friendlySupport: 'Friendly Support',
    friendlySupportDesc: 'We\'re here to help',
    addNewAddress: 'Add New Address',
    recipientName: 'Recipient Name',
    streetAddress: 'Street Address',
    setDefaultShippingCheckbox: 'Set as default shipping address'
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
    photo: appStore.user?.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
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
    appStore.triggerToast(appStore.lang === 'vi' ? 'Cập nhật hồ sơ thành công!' : 'Profile updated successfully!')
    activeTab.value = 'overview'
  } catch (err) {
    appStore.triggerToast(err.message || 'Failed to update profile')
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
    appStore.triggerToast(appStore.lang === 'vi' ? 'Thêm địa chỉ thành công!' : 'Address added successfully!')
  } catch (err) {
    appStore.triggerToast(err.message || 'Failed to add address')
  }
}

async function deleteAddress(idx) {
  const confirmMsg = appStore.lang === 'vi' ? 'Bạn có chắc chắn muốn xóa địa chỉ này?' : 'Are you sure you want to delete this address?'
  if (await appStore.triggerConfirm(confirmMsg)) {
    try {
      const address = addressesList.value[idx]
      await appStore.deleteAddress(address.id)
      await loadAddresses()
      appStore.triggerToast(appStore.lang === 'vi' ? 'Đã xóa địa chỉ thành công!' : 'Address deleted successfully!')
    } catch (err) {
      appStore.triggerToast(err.message || 'Failed to delete address')
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
    appStore.triggerToast(appStore.lang === 'vi' ? 'Đã cập nhật địa chỉ mặc định!' : 'Default address updated!')
  } catch (err) {
    appStore.triggerToast(err.message || 'Failed to set default address')
  }
}

async function removeFromWishlist(id) {
  try {
    await appStore.toggleWishlist(id)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Đã xóa khỏi danh sách yêu thích.' : 'Removed from wishlist.')
  } catch (err) {
    appStore.triggerToast(err.message || 'Failed to remove from wishlist')
  }
}

async function saveSecurity() {
  if (changePasswordForm.value.newPass !== changePasswordForm.value.confirm) {
    appStore.triggerToast(appStore.lang === 'vi' ? 'Mật khẩu phải trùng khớp!' : 'Passwords do not match!')
    return
  }
  try {
    await appStore.changePassword(changePasswordForm.value.current, changePasswordForm.value.newPass)
    appStore.triggerToast(appStore.lang === 'vi' ? 'Đổi mật khẩu thành công!' : 'Password changed successfully!')
    changePasswordForm.value = { current: '', newPass: '', confirm: '' }
  } catch (err) {
    appStore.triggerToast(err.message || 'Failed to change password')
  }
}

function triggerPhotoUpload() {
  if (avatarFileInput.value) {
    avatarFileInput.value.click()
  }
}

async function handleAvatarUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  try {
    const url = await appStore.uploadImage(file)
    await appStore.updateProfile({
      photo: url
    })
    // Immediately update the local user object so profileData computed re-renders
    if (appStore.user) {
      appStore.user.photo = url
    }
    appStore.triggerToast(appStore.lang === 'vi' ? 'Đã cập nhật ảnh đại diện!' : 'Photo updated!')
  } catch (err) {
    appStore.triggerToast(appStore.lang === 'vi' ? 'Không thể cập nhật ảnh!' : 'Failed to update photo')
  }
}

function simulatedAction(type) {
  appStore.triggerToast(`Simulated action: ${type}`)
}
</script>
