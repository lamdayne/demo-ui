<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center py-12 lg:py-20 gap-8">
        <div class="w-full md:w-1/2">
          <h1 class="text-4xl lg:text-5xl font-bold text-[#1E4B35] mb-4 leading-tight">Meet Reviewed Producers</h1>
          <p class="text-gray-700 text-lg max-w-lg leading-relaxed">
            We work directly with local farmers and cooperatives who follow good agricultural practices. Every producer is verified, every batch is traceable. Get to know the people behind your food.
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-end">
          <div class="w-full max-w-md h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" alt="Meet Reviewed Producers" class="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl mt-8">
      <!-- Filter Bar -->
      <div class="flex flex-wrap gap-3 mb-6">
        <div class="flex-grow relative min-w-[220px]">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search producers, regions, or products..." class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E4B35] text-sm" />
        </div>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[160px] flex items-center gap-1">
          <option>Region: All Regions</option>
          <option>Ben Tre</option>
          <option>Soc Trang</option>
          <option>Ca Mau</option>
          <option>Lam Dong</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[160px]">
          <option>Product Type: All Types</option>
          <option>Honey</option>
          <option>Rice & Grains</option>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Tea</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[180px]">
          <option>Supporting Records: All</option>
          <option>With Lab Reports</option>
          <option>With Certificates</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E4B35] bg-white min-w-[160px]">
          <option>Featured Status: All</option>
          <option>Featured</option>
          <option>Verified</option>
        </select>
      </div>

      <!-- Results Header with Sort & View Toggle -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm font-medium text-gray-700">6 producers found</p>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select class="border-none font-semibold bg-transparent focus:ring-0 text-sm py-0 pl-1 text-gray-900 focus:outline-none">
              <option>Featured</option>
              <option>Name</option>
              <option>Batches</option>
            </select>
          </div>
          <div class="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button class="p-1.5 bg-white shadow-sm rounded-md text-gray-800"><LayoutGrid class="w-4 h-4" /></button>
            <button class="p-1.5 text-gray-500 hover:text-gray-800 rounded-md"><List class="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <!-- Producers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div v-for="producer in producers" :key="producer.id" class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition flex flex-col h-full group">
          <div class="relative h-48 bg-gray-100 overflow-hidden">
            <img v-if="producer.image" :src="producer.image" :alt="producer.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <Image v-else class="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div v-if="producer.featured" class="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-bold text-[#1E4B35] flex items-center gap-1">
              <Star class="w-3.5 h-3.5 fill-current" /> Featured
            </div>
            <div v-if="producer.verified && !producer.featured" class="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-bold text-green-700 flex items-center gap-1">
              <CheckCircle2 class="w-3.5 h-3.5 text-green-500" /> Verified
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ producer.name }}</h3>
            <div class="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
              <MapPin class="w-4 h-4" /> {{ producer.location }}
            </div>
            <p class="text-sm text-gray-600 mb-5 flex-grow line-clamp-3 leading-relaxed">{{ producer.desc }}</p>

            <div class="space-y-2 mb-5">
              <div>
                <p class="text-xs font-semibold text-[#1E4B35] mb-1">Sample Products</p>
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <Package class="w-4 h-4 text-gray-400" /> {{ producer.products }}
                </div>
              </div>
              <div>
                <p class="text-xs font-semibold text-[#1E4B35] mb-1">Sample Batches</p>
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <FileText class="w-4 h-4 text-gray-400" /> {{ producer.batches }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mt-auto">
              <router-link :to="`/producer/${producer.id}`" class="py-2.5 rounded-lg border border-gray-300 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                View Profile
              </router-link>
              <router-link to="/products" class="py-2.5 rounded-lg bg-[#1E4B35] text-white text-center text-sm font-bold hover:bg-[#163a29] transition shadow-md shadow-[#1E4B35]/20">
                Shop Products
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- More producers note -->
      <div class="text-center mb-16">
        <p class="text-sm text-green-700 font-medium bg-green-50 py-3 px-6 rounded-full inline-flex items-center gap-2">
          <Leaf class="w-4 h-4"/> More producers coming soon. <span class="text-gray-500 font-normal">Check back regularly!</span>
        </p>
      </div>

      <!-- Why work with local producers -->
      <div class="bg-gray-50 rounded-2xl p-10 mb-16">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-10">Why work with local producers</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Verified & Reviewed</h4>
            <p class="text-sm text-gray-600">All producers are verified and regularly reviewed by our team.</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <ShieldCheck class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Traceable & Transparent</h4>
            <p class="text-sm text-gray-600">Every batch is traceable with clear origin and records.</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Users class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Stronger Communities</h4>
            <p class="text-sm text-gray-600">Your purchases help support local livelihoods and fair wages.</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Leaf class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Better for the Planet</h4>
            <p class="text-sm text-gray-600">Encouraging sustainable farming and lower emissions.</p>
          </div>
        </div>
      </div>

      <!-- Producer Story Banner -->
      <div class="flex flex-col md:flex-row gap-8 items-center mb-16 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div class="w-full md:w-2/5 h-64 md:h-80 bg-gray-200 relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140e2b8?auto=format&fit=crop&q=80&w=500" alt="Producer Story" class="w-full h-full object-cover" />
        </div>
        <div class="flex-grow p-8 md:p-10">
          <p class="text-xs font-bold text-[#1E4B35] uppercase tracking-widest mb-3">PRODUCER STORY</p>
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Growing together, for a better future</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            Green Trace connects dedicated producers with conscious customers. Together, we build a food system that is healthy, fair, and sustainable.
          </p>
          <button class="bg-[#1E4B35] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#163a29] transition shadow-md shadow-[#1E4B35]/20">
            Read Our Stories
          </button>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Questions? We're here to help.</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="flex flex-col">
            <button @click="toggleFaq(0)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">How are producers verified?</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 0 }" />
            </button>
            <div v-show="activeFaq === 0" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              We visit each producer physically, verify their environmental practices, and audit their records to ensure compliance with our standards.
            </div>
          </div>
          
          <div class="flex flex-col">
            <button @click="toggleFaq(1)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">What records are required?</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 1 }" />
            </button>
            <div v-show="activeFaq === 1" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              Producers must submit harvest logs, batch extraction logs, laboratory test sheets, and quality assurance logs to complete traceability records.
            </div>
          </div>

          <div class="flex flex-col">
            <button @click="toggleFaq(2)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">How often are reviewed?</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 2 }" />
            </button>
            <div v-show="activeFaq === 2" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              Producers undergo reviews at least once every harvest season, along with periodic spot checks of randomly sampled product batches.
            </div>
          </div>

          <div class="flex flex-col">
            <button @click="toggleFaq(3)" class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl text-left hover:border-[#1E4B35] transition group">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1E4B35]">Can I visit a farm?</span>
              <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform" :class="{ 'rotate-180': activeFaq === 3 }" />
            </button>
            <div v-show="activeFaq === 3" class="text-xs text-gray-500 mt-2 p-3 bg-gray-50 rounded-xl leading-relaxed">
              Yes, many of our partners offer eco-tours and agricultural experiences. Check their individual profiles for visiting hours and instructions.
            </div>
          </div>
        </div>

        <!-- Contact bar -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-6 border border-gray-100 rounded-xl bg-gray-50">
          <div class="flex items-center gap-3 text-gray-700">
            <Mail class="w-5 h-5 text-[#1E4B35]" />
            <span class="text-sm font-medium">Contact our support team</span>
          </div>
          <div class="flex items-center gap-3 text-gray-700">
            <Phone class="w-5 h-5 text-[#1E4B35]" />
            <span class="text-sm font-medium">+84 123 456 789</span>
          </div>
          <div class="flex items-center gap-3 text-gray-700">
            <Clock class="w-5 h-5 text-[#1E4B35]" />
            <span class="text-sm font-medium">Mon – Fri, 8:00 – 17:00 (GMT+7)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Image, Search, Star, CheckCircle2, MapPin, Package, FileText, Leaf, LayoutGrid, List, ShieldCheck, Users, Mail, Phone, Clock, ChevronDown } from 'lucide-vue-next'

const activeFaq = ref(null)

function toggleFaq(index) {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
}

const producers = [
  {
    id: 1,
    name: 'U Minh Bee Farm',
    location: 'U Minh District, Ca Mau',
    desc: 'Natural honey from pristine melaleuca forests. Sustainable beekeeping with care for the environment.',
    products: 'Honey, Beeswax, Propolis',
    batches: 8,
    featured: true,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Soc Trang Rice Co-op',
    location: 'Soc Trang Province',
    desc: 'Working together to grow high-quality rice with responsible farming and fair practices.',
    products: 'Rice, Rice Flour, Rice Bran',
    batches: 12,
    verified: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Ben Tre Fruit Co-op',
    location: 'Ben Tre Province',
    desc: 'Orchards under fair trade standards. Fresh, seasonal fruits you can trust.',
    products: 'Pomelo, Coconut, Dragon Fruit',
    batches: 10,
    featured: true,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Da Lat Clean Greens Farm',
    location: 'Da Lat, Lam Dong',
    desc: 'Pesticide-smart greenhouse vegetables grown with care and quality control.',
    products: 'Lettuce, Kale, Baby Spinach',
    batches: 9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    name: 'Lotus Lake Tea Co-op',
    location: 'Bao Loc, Lam Dong',
    desc: 'Hand-picked tea leaves crafted with time-honored methods and clean water.',
    products: 'Green Tea, Oolong Tea, Herbal Tea',
    batches: 7,
    verified: true,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    name: 'Thanh An Farm',
    location: 'Tien Giang Province',
    desc: 'Mixed farming that protects soil health and supports local communities.',
    products: 'Banana, Lemongrass, Turmeric',
    batches: 6,
    verified: true,
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400'
  }
]
</script>
