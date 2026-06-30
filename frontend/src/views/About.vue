<template>
  <div class="bg-white min-h-screen pb-16">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gray-50 border-b border-gray-100">
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center py-12 lg:py-20 gap-8">
        <div class="w-full md:w-1/2">
          <h1 class="text-4xl lg:text-5xl font-bold text-[#1E4B35] mb-4 leading-tight">About Green Trace</h1>
          <p class="text-gray-700 text-lg max-w-lg leading-relaxed">
            Connecting you with clearer, reviewable product information.
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-end">
          <div class="w-full max-w-md h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" alt="Farmer in green field" class="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl mt-12">
      <!-- Intro with Logo details -->
      <div class="flex flex-col lg:flex-row gap-8 items-center bg-gray-50 border border-gray-100 p-8 rounded-2xl mb-16">
        <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <Leaf class="w-10 h-10 text-[#1E4B35]" />
        </div>
        <div class="space-y-3">
          <p class="text-gray-700 leading-relaxed font-medium">
            Green Trace is an academic prototype that demonstrates how verified agricultural data can be collected, reviewed and presented to help people make clearer purchasing decisions.
          </p>
          <p class="text-gray-600 leading-relaxed text-sm">
            We work with sample producers and sample data to illustrate a practical model for transparency—simple to understand, easy to verify, and built for learning and improvement.
          </p>
        </div>
      </div>

      <!-- Mission, Vision, Core Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <!-- Our Mission -->
        <div class="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Target class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <h3 class="font-bold text-gray-900 text-lg mb-3">Our Mission</h3>
          <p class="text-sm text-gray-600 leading-relaxed flex-grow">
            Make product information clearer, reviewable, and accessible—so consumers can choose with more confidence and producers can grow with trust.
          </p>
        </div>

        <!-- Our Vision -->
        <div class="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Eye class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <h3 class="font-bold text-gray-900 text-lg mb-3">Our Vision</h3>
          <p class="text-sm text-gray-600 leading-relaxed flex-grow">
            A future where transparency is standard for agricultural products, powered by simple technology, shared standards, and a culture of accountability.
          </p>
        </div>

        <!-- Our Core Values -->
        <div class="border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <Heart class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <h3 class="font-bold text-gray-900 text-lg mb-3">Our Core Values</h3>
          <ul class="text-sm text-gray-600 space-y-2 flex-grow">
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Transparency over assumptions</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Evidence over claims</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Fairness for producers and consumers</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Continuous learning and improvement</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Respect for people and nature</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Why Green Trace exists -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Why Green Trace exists</h2>
          <p class="text-sm text-gray-600 mb-6 leading-relaxed">
            Online agricultural products often come with limited information. Photos and descriptions alone are not enough for important choices.
          </p>
          <div class="space-y-4">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Key information gaps:</p>
            <ul class="space-y-2.5 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>Unclear origin and farming practices</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>Limited proof of safety and quality</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>Hard to verify what is real</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>No easy way to track product history</span>
              </li>
              <li class="flex items-start gap-2">
                <Check class="w-4 h-4 text-[#1E4B35] mt-0.5 flex-shrink-0" />
                <span>Difficult to act when issues happen</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Flowchart container -->
        <div class="bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div class="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center w-36">
            <HelpCircle class="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <h4 class="font-bold text-gray-900 text-xs">Too little</h4>
            <p class="text-[10px] text-gray-500 mt-1">information</p>
          </div>
          
          <ArrowRight class="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
          
          <div class="w-24 h-24 rounded-full bg-green-100 border border-green-200 flex flex-col items-center justify-center text-center shadow-inner">
            <Leaf class="w-6 h-6 text-[#1E4B35] mb-1" />
            <span class="text-[10px] font-bold text-[#1E4B35] leading-tight">Information<br/>gap</span>
          </div>

          <ArrowRight class="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />

          <div class="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center w-36">
            <UserX class="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <h4 class="font-bold text-gray-900 text-xs">Harder choices,</h4>
            <p class="text-[10px] text-gray-500 mt-1">lower trust</p>
          </div>
        </div>
      </div>

      <!-- How the model works -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-10">How the model works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
          <!-- Stepper lines -->
          <div class="hidden md:block absolute top-7 left-[15%] right-[15%] border-t-2 border-dashed border-gray-200 -z-10"></div>

          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm">
              <User class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">Producer</h4>
            <p class="text-xs text-gray-500 px-4 leading-relaxed">
              Producers provide data about their farming and products, upload evidence, and create batch records.
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm">
              <ShieldCheck class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">Green Trace Review</h4>
            <p class="text-xs text-gray-500 px-4 leading-relaxed">
              Our team reviews the information, verifies supporting evidence, and records the results on-chain.
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-[#1E4B35] bg-white flex items-center justify-center text-[#1E4B35] mb-3 shadow-sm">
              <Users class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1">Customer</h4>
            <p class="text-xs text-gray-500 px-4 leading-relaxed">
              You can view reviewed information, trace the history, and make choices with more confidence.
            </p>
          </div>
        </div>
      </div>

      <!-- Trust Architecture -->
      <div class="border border-gray-200 rounded-3xl p-8 mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Trust Architecture</h2>
        <p class="text-sm text-gray-500 mb-8">Each product page is backed by a transparent set of data and review steps.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <User class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">1</span>
              <span class="text-xs font-bold text-gray-900">Profile Review</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">We verify the producer's identity, location, and farming practices.</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <ClipboardList class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <span class="text-xs font-bold text-gray-900">Batch Records</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">All key batch details are recorded: harvest, quantity, location, and more.</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <FileText class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">3</span>
              <span class="text-xs font-bold text-gray-900">Certificates</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">Certificates and documents are collected and validated.</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <FlaskConical class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">4</span>
              <span class="text-xs font-bold text-gray-900">Lab Reports</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">Lab tests for safety and quality are reviewed and attached.</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <Lock class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">5</span>
              <span class="text-xs font-bold text-gray-900">Blockchain</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">All records are hashed and time-stamped on blockchain.</p>
          </div>

          <div class="flex flex-col items-center text-center p-4 border border-gray-50 rounded-2xl bg-gray-50/50">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3">
              <Bell class="w-5 h-5 text-gray-400" />
            </div>
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="w-5 h-5 rounded-full bg-[#1E4B35] text-white text-[10px] flex items-center justify-center font-bold">6</span>
              <span class="text-xs font-bold text-gray-900">Recall Workflow</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-snug">If issues are found, we activate recall steps and notify affected users.</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-3 rounded-xl border border-gray-100">
          <Lock class="w-4 h-4 text-green-600" />
          <span>Data integrity is ensured by cryptographic hashing and immutable timestamp references.</span>
        </div>
      </div>

      <!-- What reviewed means explanation box -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-gray-50 border border-gray-200 p-8 rounded-2xl mb-16">
        <div class="lg:col-span-2">
          <h3 class="font-bold text-gray-900 text-lg mb-2">What reviewed means</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            "Reviewed" on Green Trace means our team has checked the submitted information and supporting evidence based on our review standards. It does not mean the product is government certified or officially approved.
          </p>
        </div>
        <div class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <ShieldCheck class="w-5 h-5 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-xs">Reviewed</h4>
            <p class="text-[10px] text-gray-500 mt-0.5">Not government certified</p>
          </div>
        </div>
      </div>

      <!-- Pilot Scope (2026) -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">Pilot Scope (2026)</h2>
        <p class="text-sm text-gray-500 text-center mb-10">Academic demonstration with limited scope and mock inputs.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <ShoppingBag class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-3xl font-extrabold text-[#1E4B35]">6</span>
                <span class="text-xs font-bold text-gray-900">Sample Products</span>
              </div>
              <p class="text-[11px] text-gray-500 mt-1">Six categories with representative items.</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <User class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-3xl font-extrabold text-[#1E4B35]">6</span>
                <span class="text-xs font-bold text-gray-900">Sample Producers</span>
              </div>
              <p class="text-[11px] text-gray-500 mt-1">Six verified sample producer profiles.</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <ClipboardList class="w-7 h-7 text-[#1E4B35]" />
            </div>
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="text-3xl font-extrabold text-[#1E4B35]">12</span>
                <span class="text-xs font-bold text-gray-900">Simulated Batches</span>
              </div>
              <p class="text-[11px] text-gray-500 mt-1">Twelve batches with complete traceability records.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Designed for -->
      <div class="mb-16 bg-gray-50 rounded-2xl p-10">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-10 font-sans">Designed for</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Users class="w-6 h-6 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Consumers</h4>
            <p class="text-xs text-gray-600 leading-relaxed px-4">
              Make clearer choices with access to reviewed information, traceability history, and product updates.
            </p>
          </div>
          
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Leaf class="w-6 h-6 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Producers</h4>
            <p class="text-xs text-gray-600 leading-relaxed px-4">
              Build reputation, access a fair platform, and grow with transparency and ongoing support.
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <GraduationCap class="w-6 h-6 text-[#1E4B35]" />
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Academic Demonstration</h4>
            <p class="text-xs text-gray-600 leading-relaxed px-4">
              Explore a real-world model for traceability that supports research, learning, and innovation.
            </p>
          </div>
        </div>
      </div>

      <!-- Quote banner -->
      <div class="relative rounded-3xl overflow-hidden shadow-lg h-80 flex items-center justify-center">
        <!-- Background Image overlay -->
        <div class="absolute inset-0 bg-[#0B3B24]/90 z-10"></div>
        <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800" alt="Farmer background" class="absolute inset-0 w-full h-full object-cover object-center" />
        
        <div class="relative z-20 text-center px-6 max-w-2xl flex flex-col items-center">
          <p class="text-white text-base lg:text-lg font-medium italic mb-6 leading-relaxed">
            "Every clear record builds a bridge of trust between the field and your table. Green Trace is a small step toward a food system that is healthy, fair, transparent, and better for people and the planet."
          </p>
          <!-- Carousel indicators -->
          <div class="flex gap-2">
            <span class="w-2 h-2 rounded-full bg-white"></span>
            <span class="w-2 h-2 rounded-full bg-white/40"></span>
            <span class="w-2 h-2 rounded-full bg-white/40"></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Leaf, Target, Eye, Heart, CheckCircle2, Check, ArrowRight, HelpCircle, UserX, User, ShieldCheck, Users, ClipboardList, FileText, FlaskConical, Lock, Bell, ShoppingBag, GraduationCap } from 'lucide-vue-next'
</script>
