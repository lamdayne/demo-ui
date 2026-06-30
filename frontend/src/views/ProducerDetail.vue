<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Breadcrumb -->
    <div class="container mx-auto px-4 max-w-6xl py-4">
      <div class="text-sm text-gray-500 flex items-center gap-2">
        <router-link to="/" class="hover:text-[#1E4B35]">Home</router-link>
        <ChevronRight class="w-3.5 h-3.5" />
        <router-link to="/producers" class="hover:text-[#1E4B35]">Producers</router-link>
        <ChevronRight class="w-3.5 h-3.5" />
        <span class="text-[#1E4B35] font-semibold">U Minh Bee Farm</span>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-12">
      <div class="flex flex-col lg:flex-row bg-[#1E4B35] text-white rounded-3xl overflow-hidden shadow-xl">
        <!-- Left Hero Content -->
        <div class="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">U Minh Bee Farm</h1>
            <div class="flex items-center gap-1.5 text-green-300 text-sm font-semibold mb-6">
              <MapPin class="w-4 h-4 fill-current" />
              <span>Ca Mau, Viet Nam</span>
            </div>
            <p class="text-green-50 text-base leading-relaxed mb-8 max-w-xl">
              Harvesting wild honey from the melaleuca forests of U Minh with respect for nature and bee colonies. Our family has kept bees here for over 20 years, following traditional methods and caring for the forest they rely on.
            </p>
            <div class="flex flex-wrap gap-4 mb-8">
              <router-link to="/products" class="bg-white text-[#1E4B35] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-50 transition shadow-md">
                <ShoppingCart class="w-5 h-5" />
                <span>Shop Products</span>
              </router-link>
              <a href="#records" class="border border-white/40 bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition">
                <FileText class="w-5 h-5" />
                <span>View Batch Records</span>
              </a>
            </div>
          </div>
          <!-- Hero Badges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Home class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">Family Farm</span>
              <span class="text-xs font-bold text-white">Est. 2002</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Sun class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">Sustainable</span>
              <span class="text-xs font-bold text-white">Beekeeping</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Trees class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">Forest Friendly</span>
              <span class="text-xs font-bold text-white">Practices</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Users class="w-5 h-5 text-green-300" />
              </div>
              <span class="text-[10px] text-green-200">Local Community</span>
              <span class="text-xs font-bold text-white">Partner</span>
            </div>
          </div>
        </div>
        <!-- Right Hero Image -->
        <div class="w-full lg:w-[45%] h-64 lg:h-auto min-h-[350px] relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800" alt="U Minh Beekeeper" class="w-full h-full object-cover object-center" />
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
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200" alt="Honey jar" class="w-full h-full object-cover" />
          </div>
          <div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Sample Products</span>
            <div class="text-3xl font-extrabold text-[#1E4B35] my-0.5">1</div>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">Carefully selected products from this producer.</p>
            <router-link to="/products" class="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1">
              View Products <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=200" alt="Honey bottle" class="w-full h-full object-cover" />
          </div>
          <div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Sample Batches</span>
            <div class="text-3xl font-extrabold text-[#1E4B35] my-0.5">2</div>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">Independently sampled and submitted.</p>
            <a href="#batches" class="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1">
              View Batches <ArrowRight class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
          <div class="w-20 h-20 bg-[#F0FDF4] rounded-xl flex-shrink-0 flex items-center justify-center text-green-600">
            <ClipboardList class="w-10 h-10" />
          </div>
          <div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Supporting Records</span>
            <div class="text-3xl font-extrabold text-[#1E4B35] my-0.5">3</div>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">Profiles, lab reports and documents reviewed.</p>
            <a href="#records" class="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1">
              View Records <ArrowRight class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Producer Story Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 rounded-3xl p-8 lg:p-10">
        <!-- Story Text (Left) -->
        <div class="lg:col-span-5 space-y-5">
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">Producer Story</h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            Deep in the U Minh forest of Ca Mau, where the canals weave through melaleuca trees and seasonally flooded wetlands, bees find abundant nectar from wild flowers. U Minh Bee Farm was founded by Mr. Nguyen Van An, who learned beekeeping from his father and continues to pass it down to the next generation.
          </p>
          <p class="text-gray-600 text-sm leading-relaxed">
            The farm migrates hives naturally with the blooming seasons, avoids chemicals, and leaves enough honey for the bees. This helps protect colonies, supports biodiversity, and keeps the forest healthy for the long term.
          </p>
          <p class="text-gray-600 text-sm leading-relaxed">
            By working with Green Trace, U Minh Bee Farm shares transparency in every jar of honey—so you can enjoy it with confidence.
          </p>
          <button class="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm transition">
            <MapPin class="w-4 h-4 text-green-600" />
            <span>View Farm Location</span>
          </button>
        </div>
        <!-- Story Image (Middle) -->
        <div class="lg:col-span-4 h-80 rounded-2xl overflow-hidden shadow-sm">
          <img src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=600" alt="Beekeepers working" class="w-full h-full object-cover" />
        </div>
        <!-- Story Stats (Right) -->
        <div class="lg:col-span-3 space-y-6">
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Calendar class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">20+ Years</h4>
              <p class="text-xs text-gray-500">Beekeeping Experience</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Home class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">150+ Hives</h4>
              <p class="text-xs text-gray-500">Managed Naturally</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Leaf class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">Forest Friendly</h4>
              <p class="text-xs text-gray-500">No chemicals used</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 text-green-600">
              <Users class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-extrabold text-gray-900 text-lg leading-tight">Local Impact</h4>
              <p class="text-xs text-gray-500">Supports local families</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Verification checklist banner -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="bg-[#F8FAF9] border border-green-100 rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div class="z-10">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Why Green Trace reviewed this profile
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Physical visit and on-site verification completed</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Sample batches collected and tested by independent labs</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Beekeeping practices assessed for sustainability</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 class="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Supporting documents and records reviewed</span>
            </div>
          </div>
        </div>
        <div class="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center opacity-80 z-0">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200" alt="leaf decoration" class="w-full h-full object-contain pointer-events-none" />
        </div>
      </div>
    </div>

    <!-- Products Section -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Products from U Minh Bee Farm</h2>
        <router-link to="/products" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          View all products <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Single Product Card -->
        <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
          <div class="relative aspect-[4/3] bg-gray-50 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400" alt="Wild Honey" class="w-full h-full object-cover" />
            <div class="absolute top-3 right-3 z-10 bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
              <CheckCircle2 class="w-3 h-3 text-green-500" /> Sampled
            </div>
          </div>
          <div class="p-5 flex flex-col flex-grow">
            <h3 class="font-bold text-gray-900 text-base leading-tight mb-2">
              U Minh Forest Wild Honey 500 ml
            </h3>
            <p class="text-xs text-gray-500 mb-4 flex-grow">
              Raw, unfiltered honey harvested from wild flowers in the U Minh forest.
            </p>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-base font-extrabold text-gray-900">229,000 VND</span>
              <button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition">
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Sample Batches -->
    <div id="batches" class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Recent Sample Batches</h2>
        <a href="#batches" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          View all batches <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Batch 1 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-5 hover:shadow-md transition">
          <div class="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=200" alt="Wild Honey" class="w-full h-full object-cover" />
            <div class="absolute bottom-1 right-1 bg-green-600 text-white text-[9px] px-1 rounded-sm">Sampled</div>
          </div>
          <div class="flex-grow">
            <h4 class="font-extrabold text-gray-900 text-base mb-1">UMH-HNY-2026-001</h4>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
              <div>Product:</div>
              <div class="font-semibold text-gray-700">U Minh Honey 500ml</div>
              <div>Sampled:</div>
              <div class="text-gray-700">10 May 2026</div>
              <div>Status:</div>
              <div class="font-semibold text-green-600 flex items-center gap-1">
                Test Completed <CheckCircle2 class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          <button class="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition self-center">
            View Batch
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
              <div>Product:</div>
              <div class="font-semibold text-gray-700">U Minh Honey 500ml</div>
              <div>Sampled:</div>
              <div class="text-gray-700">28 May 2026</div>
              <div>Status:</div>
              <div class="font-semibold text-green-600 flex items-center gap-1">
                Test Completed <CheckCircle2 class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          <button class="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition self-center">
            View Batch
          </button>
        </div>
      </div>
    </div>

    <!-- Supporting Records -->
    <div id="records" class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Supporting Records</h2>
        <a href="#records" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          View all records <ArrowRight class="w-4 h-4" />
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
              <h4 class="font-bold text-gray-900 text-base leading-snug">Reviewed Producer Profile</h4>
              <p class="text-xs text-[#1E4B35] font-semibold mt-1">U Minh Bee Farm Profile</p>
            </div>
          </div>
          <div class="border-t pt-4 text-xs text-gray-500 space-y-1 mb-6">
            <div class="flex justify-between">
              <span>Reviewed on:</span>
              <span class="font-medium text-gray-800">03 May 2026</span>
            </div>
            <div class="flex justify-between">
              <span>Reviewed by:</span>
              <span class="font-medium text-gray-800">Green Trace Team</span>
            </div>
          </div>
          <button class="w-full py-2.5 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            View Record
          </button>
        </div>
        <!-- Record 2 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-green-600">
              <CheckSquare class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-base leading-snug">Sample Batch Records</h4>
              <p class="text-xs text-[#1E4B35] font-semibold mt-1">2 sample batch records</p>
            </div>
          </div>
          <div class="border-t pt-4 text-xs text-gray-500 space-y-1 mb-6">
            <div class="flex justify-between">
              <span>Collected & documented</span>
              <span class="font-medium text-green-600">Verified ✔</span>
            </div>
            <div class="flex justify-between">
              <span>Sampling:</span>
              <span class="font-medium text-gray-800">Independent</span>
            </div>
          </div>
          <button class="w-full py-2.5 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            View Records
          </button>
        </div>
        <!-- Record 3 -->
        <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-blue-600">
              <FlaskConical class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-base leading-snug">Sample Lab Report</h4>
              <p class="text-xs text-[#1E4B35] font-semibold mt-1">2 lab reports available</p>
            </div>
          </div>
          <div class="border-t pt-4 text-xs text-gray-500 space-y-1 mb-6">
            <div class="flex justify-between">
              <span>Quality & purity tested</span>
              <span class="font-medium text-blue-600 font-semibold">Passed</span>
            </div>
            <div class="flex justify-between">
              <span>Laboratory:</span>
              <span class="font-medium text-gray-800">Third-party</span>
            </div>
          </div>
          <button class="w-full py-2.5 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            View Reports
          </button>
        </div>
      </div>
    </div>

    <!-- Farm Moments Gallery -->
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Farm Moments</h2>
        <a href="#" class="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
          View gallery <ArrowRight class="w-4 h-4" />
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
    <div class="container mx-auto px-4 max-w-6xl mb-16">
      <div class="bg-green-50/50 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 relative">
        <div class="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Linh Tran" class="w-full h-full object-cover" />
        </div>
        <div class="flex-grow space-y-4">
          <p class="text-gray-700 text-lg italic leading-relaxed">
            "We've worked with U Minh Bee Farm for over a year. Their honey is consistently pure and delicious, and we love their commitment to the forest and the bees."
          </p>
          <div>
            <h4 class="font-bold text-gray-900 text-base">– Linh Tran, Buyer</h4>
            <p class="text-xs text-gray-500">Natural Foods Co-op, Ha Noi</p>
          </div>
        </div>
        <div class="absolute right-8 bottom-6 opacity-30 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200" alt="leaf decoration" class="w-20 h-20 object-contain" />
        </div>
      </div>
    </div>

    <!-- Trust Features Bar -->
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200 shadow-sm">
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Sprout class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Traceable</div>
            <div class="text-xs text-gray-500">From forest to table</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <CheckCircle2 class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Independently Verified</div>
            <div class="text-xs text-gray-500">Samples & records</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <Leaf class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Sustainable</div>
            <div class="text-xs text-gray-500">People & planet first</div>
          </div>
        </div>
        <div class="flex-1 flex justify-center items-center gap-3 py-3 md:py-0 text-gray-700">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <div class="font-bold text-sm text-gray-900">Transparent</div>
            <div class="text-xs text-gray-500">Clear information</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight, MapPin, ShoppingCart, FileText, Home, Sun, Trees, Users, ArrowRight, ClipboardList, Calendar, Leaf, CheckCircle2, CheckSquare, FlaskConical, Sprout } from 'lucide-vue-next'
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
