<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Hero Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 max-w-6xl py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-4 max-w-xl">
          <h1 class="text-4xl font-extrabold text-[#1E4B35] leading-tight">Support & Contact</h1>
          <p class="text-gray-600 text-sm leading-relaxed">
            We're here to help. Find answers, learn more about traceability, and get in touch with our team.
          </p>
          
          <!-- Search Bar -->
          <div class="flex gap-2 pt-2">
            <div class="relative flex-grow">
              <input type="text" placeholder="Search for help with orders, traceability, accounts, and returns" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#1E4B35]" />
              <Search class="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            </div>
            <button class="bg-[#1E4B35] hover:bg-[#163a29] text-white px-6 py-3 rounded-lg text-xs font-bold transition">Search</button>
          </div>

          <!-- Popular Searches -->
          <div class="flex flex-wrap gap-2 pt-2 items-center text-[10px] text-gray-500">
            <span class="font-bold">Popular searches:</span>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">Track my order</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">Batch record</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">Return a product</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">Account help</button>
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition">Become a producer</button>
          </div>
        </div>

        <div class="w-full md:w-auto flex justify-center flex-shrink-0">
          <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg relative bg-gray-100">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Support Agent" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl pt-12">
      <!-- Browse Help Topics -->
      <div class="mb-16">
        <h2 class="text-xl font-bold text-gray-900 mb-8">Browse help topics</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <!-- Topic 1 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><ShoppingCart class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">Orders & Checkout</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">Help with ordering, payments, invoices, and promotions.</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">View articles &rarr;</button>
          </div>

          <!-- Topic 2 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><ShieldCheck class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">Traceability & Batch Records</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">Understand batch traceability, certifications, and sample lab reports.</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">View articles &rarr;</button>
          </div>

          <!-- Topic 3 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><User class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">Producer Questions</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">Resources for producers about onboarding, standards, and best practices.</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">View articles &rarr;</button>
          </div>

          <!-- Topic 4 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><Truck class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">Shipping & Returns</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">Delivery timelines, shipping policy, and return process.</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">View articles &rarr;</button>
          </div>

          <!-- Topic 5 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><Lock class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">Account & Security</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">Manage your account, security settings, and privacy.</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">View articles &rarr;</button>
          </div>

          <!-- Topic 6 -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col justify-between hover:shadow-md transition">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-full bg-green-50 text-[#1E4B35] flex items-center justify-center mx-auto"><Users class="w-5 h-5"/></div>
              <h3 class="font-bold text-gray-900 text-xs">Partner With Us</h3>
              <p class="text-[9px] text-gray-500 leading-relaxed">Partnership, bulk orders, and collaboration opportunities.</p>
            </div>
            <button class="text-[10px] font-bold text-[#1E4B35] hover:underline mt-4 flex items-center justify-center gap-0.5">View articles &rarr;</button>
          </div>
        </div>
      </div>

      <!-- FAQ Accordion / Visual Graphics Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <!-- FAQ Accordion -->
        <div class="lg:col-span-7 space-y-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Frequently asked questions</h2>
            <a href="#" class="text-xs font-bold text-gray-500 hover:text-[#1E4B35]">View all articles &rarr;</a>
          </div>

          <div class="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
            <!-- FAQ Item 1 (Open) -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 1 ? null : 1" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>What does Reviewed Sample mean?</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 1 }" />
              </button>
              <div v-show="openFaqIndex === 1" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                Reviewed Sample means our team has verified the batch information, quality checks, and supporting records such as lab reports and producer details. It does not guarantee a certification but indicates the batch has passed our internal review.
              </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 2 ? null : 2" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>How do I view a batch record?</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 2 }" />
              </button>
              <div v-show="openFaqIndex === 2" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                You can look up any batch by entering its Lot number (e.g., LOT-UMH-2605-001) in the Traceability lookup search bar on the Traceability page.
              </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 3 ? null : 3" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>Can I request a return in this prototype?</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 3 }" />
              </button>
              <div v-show="openFaqIndex === 3" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                As this is an academic prototype, commercial return requests are simulated. You can click the "Request Return (Demo)" button on your Orders page to see how the workflow operates.
              </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 4 ? null : 4" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>How can producers join Green Trace?</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 4 }" />
              </button>
              <div v-show="openFaqIndex === 4" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                Producers can visit the "Partner With Us" page, read our verification guidelines, and submit a simulation onboarding application form.
              </div>
            </div>

            <!-- FAQ Item 5 -->
            <div class="border-b border-gray-100">
              <button @click="openFaqIndex = openFaqIndex === 5 ? null : 5" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>Is Green Trace available in my country?</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 5 }" />
              </button>
              <div v-show="openFaqIndex === 5" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                The current pilot phase (2026) is centered on representative provinces in Vietnam, such as Ca Mau, Ben Tre, and Soc Trang.
              </div>
            </div>

            <!-- FAQ Item 6 -->
            <div>
              <button @click="openFaqIndex = openFaqIndex === 6 ? null : 6" class="w-full px-5 py-4 text-left font-bold text-gray-900 text-xs flex justify-between items-center">
                <span>How do you protect my personal data?</span>
                <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': openFaqIndex === 6 }" />
              </button>
              <div v-show="openFaqIndex === 6" class="px-5 pb-4 text-[11px] text-gray-600 leading-relaxed">
                All data is handled according to our strict Privacy Policies, and customer account files are encrypted securely to ensure data protection.
              </div>
            </div>
          </div>
        </div>

        <!-- Info Graphic Box -->
        <div class="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center h-full">
          <div class="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
            <ScanLine class="w-16 h-16 text-[#1E4B35] animate-pulse" />
          </div>
          <h4 class="font-bold text-gray-900 text-sm mb-4 leading-normal max-w-xs">
            Green Trace helps you make confident choices by connecting you to verified records from farm to table.
          </h4>
          <div class="space-y-3.5 text-left w-full max-w-[240px] text-xs text-gray-700">
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> Verified producers</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> Transparent records</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> Sustainable practices</div>
            <div class="flex items-center gap-2"><Check class="w-4 h-4 text-green-600"/> Better decisions</div>
          </div>
        </div>
      </div>

      <!-- Contact Forms / Demo Support Channels -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <!-- Contact Form -->
        <div class="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 class="text-xl font-bold text-gray-900 mb-1">Contact our team <span class="text-xs text-gray-400 font-normal">(Demo channel)</span></h2>
          <p class="text-xs text-gray-500 mb-4">Use the form below to send us a message. Our team will respond via email.</p>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">Full name *</label>
                <input type="text" required class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]" />
              </div>
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">Email address *</label>
                <input type="email" required class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">Topic *</label>
                <select class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35] bg-white text-gray-700">
                  <option>Select a topic</option>
                  <option>Traceability Inquiry</option>
                  <option>Order & Checkout Help</option>
                  <option>Producer Account Support</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div>
                <label class="text-[9px] font-bold text-gray-400 uppercase">Order or Batch Reference (optional)</label>
                <input type="text" placeholder="e.g., LOT-UMH-2605-001" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]" />
              </div>
            </div>

            <div>
              <label class="text-[9px] font-bold text-gray-400 uppercase">Message *</label>
              <textarea required rows="4" placeholder="How can we help you?" class="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-[#1E4B35]"></textarea>
            </div>

            <div class="flex items-start gap-2 pt-2">
              <input type="checkbox" required id="democheck" class="mt-0.5 rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35]" />
              <label for="democheck" class="text-[10px] text-gray-500 leading-snug">
                I understand this is a demo / proposed pilot channel and not a live commercial operation.
              </label>
            </div>

            <button type="submit" class="w-full py-3 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-lg text-xs font-bold transition">Send Message</button>
          </form>

          <div class="flex items-center justify-center gap-1.5 text-[9px] text-gray-400 pt-2">
            <Lock class="w-3 h-3"/> Your information is used only to respond to your request.
          </div>
        </div>

        <!-- Demo support channels list -->
        <div class="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-1">Demo support channels</h2>
            <p class="text-[10px] text-gray-400 leading-relaxed mb-6">
              These are demo / proposed pilot email channels. Target response time for the future pilot: 1-2 business days.
            </p>

            <div class="space-y-4">
              <div class="flex items-center justify-between border-b border-gray-50 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Mail class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">General inquiries</h4>
                    <p class="text-[9px] text-gray-500">For questions about Green Trace model</p>
                  </div>
                </div>
                <span class="font-bold text-[#1E4B35] text-xs">info@greentrace.demo</span>
              </div>

              <div class="flex items-center justify-between border-b border-gray-50 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Mail class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">Customer support</h4>
                    <p class="text-[9px] text-gray-500">For mock order issues & help</p>
                  </div>
                </div>
                <span class="font-bold text-[#1E4B35] text-xs">support@greentrace.demo</span>
              </div>

              <div class="flex items-center justify-between border-b border-gray-50 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Mail class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">For producers</h4>
                    <p class="text-[9px] text-gray-500">For verification & batch onboarding</p>
                  </div>
                </div>
                <span class="font-bold text-[#1E4B35] text-xs">producers@greentrace.demo</span>
              </div>

              <div class="flex items-center justify-between pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#1E4B35]"><Phone class="w-4 h-4"/></div>
                  <div>
                    <h4 class="font-bold text-gray-900 text-xs">Phone (Demo)</h4>
                    <p class="text-[9px] text-gray-500">Mon-Fri, 9:00 AM – 5:00 PM (ICT)</p>
                  </div>
                </div>
                <span class="font-bold text-gray-900 text-xs">+84 123 456 789</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Chat, Report Batch, Help Center row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-green-50 text-[#1E4B35] rounded-full flex items-center justify-center mx-auto"><MessageSquare class="w-6 h-6"/></div>
            <h3 class="font-bold text-gray-900 text-sm">Live chat demo <span class="bg-gray-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Demo</span></h3>
            <p class="text-xs text-gray-500 leading-normal">Chat with our team about orders, traceability, or account help.</p>
          </div>
          <button @click="startLiveChat" class="w-full py-2 border border-gray-300 hover:border-[#1E4B35] text-gray-700 hover:text-[#1E4B35] rounded-lg text-xs font-bold transition mt-6">
            Start Live Chat
          </button>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto"><AlertTriangle class="w-6 h-6"/></div>
            <h3 class="font-bold text-gray-900 text-sm">Report a batch concern</h3>
            <p class="text-xs text-gray-500 leading-normal">Report an issue about quality, records, or incorrect information.</p>
          </div>
          <button @click="reportConcern" class="w-full py-2 border border-gray-300 hover:border-yellow-600 text-gray-700 hover:text-yellow-600 rounded-lg text-xs font-bold transition mt-6">
            Report an Issue
          </button>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between">
          <div class="space-y-3">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto"><BookOpen class="w-6 h-6"/></div>
            <h3 class="font-bold text-gray-900 text-sm">Help center resource hub</h3>
            <p class="text-xs text-gray-500 leading-normal">Guides, articles, and videos to help you learn more.</p>
          </div>
          <button class="w-full py-2 border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-lg text-xs font-bold transition mt-6">
            Visit Help Center
          </button>
        </div>
      </div>

      <!-- Bottom policies row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-gray-150 rounded-xl bg-white mb-8 text-center text-xs font-bold text-gray-700">
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><Truck class="w-4 h-4 text-gray-400"/> Shipping Policy</a>
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><RotateCw class="w-4 h-4 text-gray-400"/> Return Policy</a>
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><Shield class="w-4 h-4 text-gray-400"/> Privacy Policy</a>
        <a href="#" class="flex items-center justify-center gap-2 hover:text-[#1E4B35] transition"><Flag class="w-4 h-4 text-gray-400"/> Report an Issue</a>
      </div>

      <!-- Academic Prototype Note -->
      <div class="bg-green-50 border border-green-200 rounded-3xl p-6 flex gap-4 items-start shadow-sm">
        <Leaf class="w-6 h-6 text-[#1E4B35] flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-bold text-[#1E4B35] text-sm mb-1.5">This platform is an academic prototype.</h4>
          <p class="text-green-800 text-[11px] leading-relaxed">
            Green Trace is a student learning project designed to demonstrate traceability and transparency in agricultural supply chains. This is not a live commercial service. Features and data are simulated for educational purposes.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, ChevronDown, ShoppingCart, ShieldCheck, User, Truck, Lock, Users, MessageSquare, AlertTriangle, BookOpen, RotateCw, Shield, Flag, Leaf, ScanLine, Phone, Mail, Check } from 'lucide-vue-next'

const openFaqIndex = ref(1)

const submitForm = () => {
  alert('Thank you for your message! This is a demo submission.')
}

const startLiveChat = () => {
  alert('Simulated Live Chat: Connecting you to support...')
}

const reportConcern = () => {
  alert('Simulated Concern form: Please enter batch info...')
}
</script>
