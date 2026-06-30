<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <div class="container mx-auto px-4 max-w-6xl pt-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div class="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-gray-200">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="U Minh Bee Farm Owner" class="w-full h-full object-cover" />
            </div>
            <h3 class="font-bold text-gray-900 text-base">U Minh Bee Farm</h3>
            <span class="bg-green-50 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-green-200 inline-block mt-1">Verified Producer</span>
            <div class="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <MapPin class="w-3.5 h-3.5 text-gray-400" /> Ca Mau, Viet Nam
            </div>
            <router-link to="/producer/1" class="text-xs font-semibold text-[#1E4B35] hover:underline mt-4 block">View Store Profile &rarr;</router-link>
            
            <nav class="space-y-1 mt-6 text-left">
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold bg-[#1E4B35] text-white shadow transition">
                <LayoutDashboard class="w-4 h-4" /> Overview
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <Package class="w-4 h-4 text-gray-400" /> Products
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <Layers class="w-4 h-4 text-gray-400" /> Batches
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <FileText class="w-4 h-4 text-gray-400" /> Supporting Records
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <ShoppingBag class="w-4 h-4 text-gray-400" /> Orders
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <Store class="w-4 h-4 text-gray-400" /> Store Profile
              </button>
              <button class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <span class="flex items-center gap-3"><MessageSquare class="w-4 h-4 text-gray-400" /> Messages</span>
                <span class="bg-[#1E4B35] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold px-1">3</span>
              </button>
              <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <HelpCircle class="w-4 h-4 text-gray-400" /> Support
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Top Header Slogan & Time -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 class="text-3xl font-extrabold text-[#1E4B35] leading-none mb-2">Producer Dashboald Demo</h1>
              <p class="text-xs text-gray-500">Welcome back, U Minh Bee Farm! Here's your operational overview.</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] text-gray-500 font-semibold shadow-sm">
              <Calendar class="w-3.5 h-3.5 text-gray-400" />
              <span>Data as of May 19, 2026 10:30 AM (GMT+7)</span>
            </div>
          </div>

          <!-- Counter Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1">
              <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35] mb-2"><Package class="w-4 h-4"/></div>
              <div class="text-[10px] text-gray-400 font-semibold uppercase">Sample Products</div>
              <div class="text-2xl font-extrabold text-gray-900 leading-none">3</div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View products &rarr;</button>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1">
              <div class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 mb-2"><FileText class="w-4 h-4"/></div>
              <div class="text-[10px] text-gray-400 font-semibold uppercase">Draft Batches</div>
              <div class="text-2xl font-extrabold text-gray-900 leading-none">2</div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View batches &rarr;</button>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1">
              <div class="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mb-2"><ShieldAlert class="w-4 h-4"/></div>
              <div class="text-[10px] text-gray-400 font-semibold uppercase">Records Awaiting Review</div>
              <div class="text-2xl font-extrabold text-gray-900 leading-none">1</div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View records &rarr;</button>
            </div>

            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-1">
              <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2"><ShoppingBag class="w-4 h-4"/></div>
              <div class="text-[10px] text-gray-400 font-semibold uppercase">Sample Orders</div>
              <div class="text-2xl font-extrabold text-gray-900 leading-none">3</div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-2 block">View orders &rarr;</button>
            </div>
          </div>

          <!-- Tasks & Analytics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Tasks -->
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center mb-6">
                  <h3 class="font-bold text-gray-900 text-sm">Today's Tasks</h3>
                  <button class="text-xs font-semibold text-gray-400 hover:text-[#1E4B35]">View all tasks &rarr;</button>
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
                      <span class="text-[8px] font-semibold text-gray-400 mt-2 block">Due: May 20, 2026</span>
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
                      <p class="text-[10px] text-gray-500">Reply to a question about your LOT-UMH-2605-001.</p>
                      <span class="text-[8px] font-semibold text-gray-400 mt-2 block">Due: May 21, 2026</span>
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
                      <p class="text-[10px] text-gray-500">Reply to a question about your U Minh Forest Wild Honey.</p>
                      <span class="text-[8px] font-semibold text-gray-400 mt-2 block">Due: May 22, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
              <button class="text-xs font-bold text-[#1E4B35] hover:underline pt-4 block text-center border-t border-gray-100 mt-4">View all messages &rarr;</button>
            </div>

            <!-- Analytics Graph -->
            <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 class="font-bold text-gray-900 text-sm">Demo Analytics <span class="text-gray-400 font-normal text-xs">(30-Day Overview)</span></h3>
              <div class="grid grid-cols-4 gap-2 text-center">
                <div class="p-2 bg-gray-50 rounded-lg">
                  <div class="text-[10px] font-bold text-gray-900">1,248</div>
                  <div class="text-[8px] text-green-600 font-semibold">+18.6%</div>
                  <div class="text-[7px] text-gray-400 font-medium">Views</div>
                </div>
                <div class="p-2 bg-gray-50 rounded-lg">
                  <div class="text-[10px] font-bold text-gray-900">464,700</div>
                  <div class="text-[8px] text-green-600 font-semibold">+22.3%</div>
                  <div class="text-[7px] text-gray-400 font-medium">Order Value</div>
                </div>
                <div class="p-2 bg-gray-50 rounded-lg">
                  <div class="text-[10px] font-bold text-gray-900">5</div>
                  <div class="text-[8px] text-green-600 font-semibold">+40.0%</div>
                  <div class="text-[7px] text-gray-400 font-medium">Batches</div>
                </div>
                <div class="p-2 bg-gray-50 rounded-lg">
                  <div class="text-[10px] font-bold text-gray-900">7</div>
                  <div class="text-[8px] text-green-600 font-semibold">+16.7%</div>
                  <div class="text-[7px] text-gray-400 font-medium">Inquiries</div>
                </div>
              </div>

              <!-- Bar Chart mockup -->
              <div class="space-y-1">
                <div class="text-[9px] font-bold text-gray-500">Order Value (VND) Over Time (Demo)</div>
                <div class="h-32 flex items-end justify-between pt-6 border-b border-gray-200">
                  <div class="w-8 flex flex-col items-center gap-1.5">
                    <div class="w-5 bg-green-200 rounded-t h-12 hover:bg-[#1E4B35] transition"></div>
                    <span class="text-[8px] text-gray-400 font-bold">Apr 20</span>
                  </div>
                  <div class="w-8 flex flex-col items-center gap-1.5">
                    <div class="w-5 bg-green-200 rounded-t h-8 hover:bg-[#1E4B35] transition"></div>
                    <span class="text-[8px] text-gray-400 font-bold">Apr 27</span>
                  </div>
                  <div class="w-8 flex flex-col items-center gap-1.5">
                    <div class="w-5 bg-[#1E4B35] rounded-t h-20 hover:bg-[#1E4B35] transition"></div>
                    <span class="text-[8px] text-gray-400 font-bold">May 4</span>
                  </div>
                  <div class="w-8 flex flex-col items-center gap-1.5">
                    <div class="w-5 bg-green-200 rounded-t h-16 hover:bg-[#1E4B35] transition"></div>
                    <span class="text-[8px] text-gray-400 font-bold">May 11</span>
                  </div>
                  <div class="w-8 flex flex-col items-center gap-1.5">
                    <div class="w-5 bg-green-200 rounded-t h-24 hover:bg-[#1E4B35] transition"></div>
                    <span class="text-[8px] text-gray-400 font-bold">May 18</span>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 pt-2 text-[8px] font-bold text-gray-500 justify-end">
                  <span class="w-2.5 h-2.5 bg-[#1E4B35] rounded-sm"></span> Order Value (VND)
                </div>
              </div>
            </div>
          </div>

          <!-- Products, Batches & Orders Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Your Products -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-gray-900 text-xs">Your Products <span class="text-gray-400 font-normal">(Sample)</span></h3>
                  <button class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]">View all &rarr;</button>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center justify-between border-b border-gray-50 pb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900 text-[10px] leading-tight">U Minh Forest Wild Honey</h4>
                        <p class="text-[8px] text-gray-400">500 ml</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 text-[10px]">229,000</div>
                      <span class="bg-green-50 text-green-700 text-[7px] px-1 rounded font-bold border border-green-200">Active</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between border-b border-gray-50 pb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900 text-[10px] leading-tight">ST25 Premium Rice</h4>
                        <p class="text-[8px] text-gray-400">2 kg</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 text-[10px]">139,000</div>
                      <span class="bg-green-50 text-green-700 text-[7px] px-1 rounded font-bold border border-green-200">Active</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-900 text-[10px] leading-tight">Lotus Tea</h4>
                        <p class="text-[8px] text-gray-400">200 g</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 text-[10px]">115,000</div>
                      <span class="bg-green-50 text-green-700 text-[7px] px-1 rounded font-bold border border-green-200">Active</span>
                    </div>
                  </div>
                </div>
              </div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-3 border-t border-gray-50 mt-3 text-center block w-full">Manage all products &rarr;</button>
            </div>

            <!-- Recent Batches -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-gray-900 text-xs">Recent Batches</h3>
                  <button class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]">View all &rarr;</button>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center justify-between border-b border-gray-50 pb-2">
                    <div>
                      <h4 class="font-mono font-bold text-[#1E4B35] text-[10px]">LOT-UMH-2605-001</h4>
                      <p class="text-[8px] text-gray-500">U Minh Honey 500ml</p>
                    </div>
                    <div class="text-right">
                      <span class="bg-yellow-50 text-yellow-700 text-[7px] px-1 rounded font-bold border border-yellow-200">Draft</span>
                      <p class="text-[8px] text-gray-400 mt-1">May 17, 2026</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between border-b border-gray-50 pb-2">
                    <div>
                      <h4 class="font-mono font-bold text-[#1E4B35] text-[10px]">LOT-ST25-2605-002</h4>
                      <p class="text-[8px] text-gray-500">ST25 Rice 2kg</p>
                    </div>
                    <div class="text-right">
                      <span class="bg-blue-50 text-blue-700 text-[7px] px-1 rounded font-bold border border-blue-200">Under Review</span>
                      <p class="text-[8px] text-gray-400 mt-1">May 16, 2026</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pb-2">
                    <div>
                      <h4 class="font-mono font-bold text-[#1E4B35] text-[10px]">LOT-LTGT-2605-003</h4>
                      <p class="text-[8px] text-gray-500">Lotus Tea 200g</p>
                    </div>
                    <div class="text-right">
                      <span class="bg-green-50 text-green-700 text-[7px] px-1 rounded font-bold border border-green-200">Reviewed</span>
                      <p class="text-[8px] text-gray-400 mt-1">May 15, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-3 border-t border-gray-50 mt-3 text-center block w-full">Manage all batches &rarr;</button>
            </div>

            <!-- Recent Orders Card -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-gray-900 text-xs">Recent Orders <span class="text-gray-400 font-normal">(Sample)</span></h3>
                  <button class="text-[9px] font-bold text-gray-400 hover:text-[#1E4B35]">View all &rarr;</button>
                </div>
                <div class="space-y-2 text-xs text-gray-700">
                  <div class="flex justify-between py-1 border-b border-gray-50">
                    <span class="text-gray-400">Order ID</span>
                    <span class="font-bold text-[#1E4B35]">GT-2026-0519-001</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-gray-50">
                    <span class="text-gray-400">Customer</span>
                    <span class="font-semibold text-gray-900">GreenLoving Co.</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-gray-50">
                    <span class="text-gray-400">Order Date</span>
                    <span class="text-gray-600 font-medium">May 19, 2026</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-gray-50">
                    <span class="text-gray-400">Total Amount</span>
                    <span class="font-extrabold text-gray-900">464,700 VND</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-gray-50">
                    <span class="text-gray-400">Items</span>
                    <span class="text-gray-600 font-medium">3 items</span>
                  </div>
                  <div class="flex justify-between py-1">
                    <span class="text-gray-400">Status</span>
                    <span class="bg-green-50 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-green-200">Confirmed</span>
                  </div>
                </div>
              </div>
              <button class="w-full py-2 border border-gray-300 rounded text-[9px] font-bold text-gray-700 hover:bg-gray-100 transition mt-4">
                View Order Details
              </button>
            </div>
          </div>

          <!-- Quick Upload, Store Summary & Support Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Quick Upload -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-gray-900 text-xs mb-1">Quick Upload – Supporting Records</h3>
                <p class="text-[9px] text-gray-400 mb-4">Upload documents that support product traceability and compliance.</p>
                
                <div class="border border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#1E4B35] hover:bg-green-50/20 transition space-y-1.5 mb-4">
                  <CloudUpload class="w-6 h-6 text-[#1E4B35] mx-auto" />
                  <div class="text-[10px] font-bold text-gray-900">Drag & drop files here</div>
                  <div class="text-[9px] text-gray-500">or <span class="text-[#1E4B35] underline">click to browse</span></div>
                  <div class="text-[8px] text-gray-400">PDF, JPG, PNG up to 10MB each</div>
                </div>

                <div class="space-y-2">
                  <span class="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Common Record Types</span>
                  <div class="grid grid-cols-2 gap-2 text-[9px] font-semibold text-gray-700">
                    <div class="flex items-center gap-1.5"><FileText class="w-3.5 h-3.5 text-gray-400"/> Batch Record</div>
                    <div class="flex items-center gap-1.5"><FlaskConical class="w-3.5 h-3.5 text-gray-400"/> Lab Report</div>
                    <div class="flex items-center gap-1.5"><User class="w-3.5 h-3.5 text-gray-400"/> Producer Profile</div>
                    <div class="flex items-center gap-1.5"><ShieldCheck class="w-3.5 h-3.5 text-gray-400"/> Certificate</div>
                  </div>
                </div>
              </div>
              <button class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-3 border-t border-gray-50 mt-3 text-center block w-full">View all record types &rarr;</button>
            </div>

            <!-- Store Summary -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between text-center">
              <div>
                <h3 class="font-bold text-gray-900 text-xs mb-4">Store / Profile Summary</h3>
                <div class="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
                </div>
                <h4 class="font-bold text-gray-900 text-sm">U Minh Bee Farm</h4>
                <span class="bg-green-50 text-green-700 text-[8px] px-2 py-0.5 rounded-full font-bold border border-green-200 inline-block mt-0.5">Verified Producer</span>
                
                <div class="text-[10px] text-gray-600 mt-4 space-y-1.5 text-left pl-6">
                  <div class="flex items-center gap-2"><MapPin class="w-3.5 h-3.5 text-gray-400"/> Ca Mau, Viet Nam</div>
                  <div class="flex items-center gap-2"><Calendar class="w-3.5 h-3.5 text-gray-400"/> Member since: May 18, 2026</div>
                  <div class="flex items-center gap-2"><Award class="w-3.5 h-3.5 text-gray-400"/> 20+ Years Experience</div>
                  <div class="flex items-center gap-2"><Leaf class="w-3.5 h-3.5 text-gray-400"/> 150+ Hives • Forest Friendly</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-50">
                <router-link to="/producer/1" class="py-1.5 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded text-[10px] font-bold transition">View Store Profile</router-link>
                <button class="py-1.5 border border-gray-300 rounded text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition">Edit Profile</button>
              </div>
            </div>

            <!-- Support & Help -->
            <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-gray-900 text-xs mb-1">Support & Help</h3>
                <p class="text-[9px] text-gray-400 mb-4">Need help managing your farm or using Green Trace?</p>
                
                <div class="space-y-3">
                  <div class="flex items-start gap-2.5 p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                    <BookOpen class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 class="font-bold text-gray-900 text-[10px]">Producer Guide</h4>
                      <p class="text-[8px] text-gray-500">Step-by-step platform guide</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-2.5 p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                    <Video class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 class="font-bold text-gray-900 text-[10px]">Training & Webinars</h4>
                      <p class="text-[8px] text-gray-500">Join upcoming training sessions</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-2.5 p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                    <HelpCircle class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 class="font-bold text-gray-900 text-[10px]">Contact Support</h4>
                      <p class="text-[8px] text-gray-500">Get help from our support team</p>
                    </div>
                  </div>
                </div>
              </div>
              <router-link to="/support" class="text-[9px] font-bold text-[#1E4B35] hover:underline pt-3 border-t border-gray-50 mt-3 text-center block w-full">Visit Help Center &rarr;</router-link>
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
              <div class="flex gap-6 pt-2">
                <div>
                  <div class="text-base font-extrabold text-[#1E4B35]">20+</div>
                  <div class="text-[8px] text-green-700 font-bold uppercase">Years Experience</div>
                </div>
                <div>
                  <div class="text-base font-extrabold text-[#1E4B35]">150+</div>
                  <div class="text-[8px] text-green-700 font-bold uppercase">Hives Managed</div>
                </div>
                <div>
                  <div class="text-base font-extrabold text-[#1E4B35]">100%</div>
                  <div class="text-[8px] text-green-700 font-bold uppercase">Forest Friendly</div>
                </div>
              </div>
            </div>
            
            <div class="md:w-2/5 border-t md:border-t-0 md:border-l border-green-200/50 pt-6 md:pt-0 pl-0 md:pl-8 flex flex-col justify-between">
              <p class="text-green-900 text-xs italic font-medium leading-relaxed mb-4">
                "We believe in honest honey and healthy forests. Thank you for helping us connect with customers who care about quality and transparency."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full overflow-hidden border border-white shadow flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="font-bold text-gray-900 text-xs leading-none">Nguyen Van An</div>
                  <span class="text-[8px] text-gray-500 font-semibold block mt-0.5">Owner, U Minh Bee Farm</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Simulated Warns Foot -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <ShieldCheck class="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">Note</h4>
                <p class="text-[9px] text-gray-500 mt-0.5 leading-snug">All values, metrics, and records shown on this dashboard are simulated for academic demonstration purposes only and do not represent real data.</p>
              </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <Lock class="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 text-xs">Your data is protected</h4>
                <p class="text-[9px] text-gray-500 mt-0.5 leading-snug">We use industry-standard security and follow strict privacy policies to protect your information.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin, LayoutDashboard, Package, Layers, FileText, ShoppingBag, Store, MessageSquare, HelpCircle, Calendar, ShieldAlert, CloudUpload, FlaskConical, Award, Leaf, BookOpen, Video, Users, ShieldCheck, Lock } from 'lucide-vue-next'
</script>
