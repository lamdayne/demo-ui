<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] py-16 relative overflow-hidden">
      <div class="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        <div class="md:w-3/5 pr-8">
          <h1 class="text-4xl lg:text-5xl font-bold text-[#1E4B35] mb-4 leading-tight">Partner With Green Trace</h1>
          <p class="text-gray-700 text-lg mb-8 max-w-lg">
            Join a transparent ecosystem that connects your farm or co-op with customers who value quality, traceability, and trust.
          </p>
          <div class="flex flex-wrap gap-4 text-sm font-bold text-[#1E4B35]">
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <ShieldCheck class="w-5 h-5" /> Build Trust
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Eye class="w-5 h-5" /> Increase Visibility
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <TrendingUp class="w-5 h-5" /> Grow Your Business
            </div>
          </div>
        </div>
        <div class="md:w-2/5 mt-8 md:mt-0 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600" alt="Smiling Farmer" class="w-full h-full object-cover object-center" />
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
      <!-- Prototype Warning Box -->
      <div class="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-6 flex items-start gap-4 shadow-sm mb-12">
        <Leaf class="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
        <div>
          <h3 class="text-green-900 font-bold text-lg mb-1">This is a Prototype Onboarding Flow</h3>
          <p class="text-green-800 text-sm">
            Welcome! This form is a sample inquiry for local producers and cooperatives who are interested in partnering with Green Trace. Please provide accurate information and upload the requested documents. Our team will review your submission and get back to you.
          </p>
        </div>
        <FileText class="w-16 h-16 text-green-700/20 ml-auto hidden md:block" />
      </div>

      <h2 class="text-2xl font-bold text-[#1E4B35] mb-6">Why Partner With Green Trace?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Users class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">Reach More Customers</h4>
            <p class="text-sm text-gray-600 leading-relaxed">Get discovered by conscious buyers through our marketplace and traceability network.</p>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <Sprout class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">Present Your Story</h4>
            <p class="text-sm text-gray-600 leading-relaxed">Share your farming practices and community impact with complete transparency.</p>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-4">
          <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <FileBox class="w-6 h-6 text-[#1E4B35]" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">Organize Batch Information</h4>
            <p class="text-sm text-gray-600 leading-relaxed">Record and manage batches, certificates, and harvest data in one simple place.</p>
          </div>
        </div>
      </div>

      <!-- Main Layout Content -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Registration Form (Left) -->
        <div class="w-full lg:w-[65%]">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-[#1E4B35]">Producer Registration / Partner Inquiry Form</h2>
            <p class="text-gray-600 text-sm">Please fill out all required fields (marked with *).</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div class="space-y-8">
              <!-- 1. Producer Information -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User class="w-5 h-5 text-[#1E4B35]" /> 1. Producer Information
                </h3>
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">Producer Type <span class="text-red-500">*</span></label>
                  <div class="flex flex-wrap gap-6 text-sm text-gray-700">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" checked class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      Individual Producer
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      Cooperative
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      Farm Organization / Association
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="producerType" class="text-[#1E4B35] focus:ring-[#1E4B35]" />
                      Other
                      <input type="text" placeholder="Please specify" class="border-b focus:border-[#1E4B35] outline-none ml-2 px-1 py-0.5 text-xs text-gray-900" />
                    </label>
                  </div>
                </div>
              </div>

              <!-- 2. Business Details -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building class="w-5 h-5 text-[#1E4B35]" /> 2. Business or Co-op Details
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Business / Co-op Name *</label>
                    <input type="text" placeholder="Enter business or co-op name" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div class="flex gap-4">
                    <div class="w-1/3">
                      <label class="block text-sm text-gray-600 mb-1.5">Year Established</label>
                      <input type="text" placeholder="YYYY" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                    </div>
                    <div class="w-2/3">
                      <label class="block text-sm text-gray-600 mb-1.5">Registration / Business Permit No.</label>
                      <input type="text" placeholder="Enter registration number" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Business Type</label>
                    <select class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] bg-white text-gray-900">
                      <option>Sole Proprietorship</option>
                      <option>Partnership</option>
                      <option>Corporation</option>
                      <option>Cooperative</option>
                      <option>Association</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Website or Social Media (Optional)</label>
                    <input type="text" placeholder="https://example.com" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                </div>
              </div>

              <!-- 3. Product Categories -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package class="w-5 h-5 text-[#1E4B35]" /> 3. Product Categories
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <label class="border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1E4B35] transition">
                    <Apple class="w-6 h-6 text-red-500" />
                    <span class="text-sm font-semibold text-gray-900">Fruits</span>
                  </label>
                  <label class="border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1E4B35] transition">
                    <Carrot class="w-6 h-6 text-orange-500" />
                    <span class="text-sm font-semibold text-gray-900">Vegetables</span>
                  </label>
                  <label class="border border-green-500 bg-green-50 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition">
                    <Wheat class="w-6 h-6 text-yellow-600" />
                    <span class="text-sm font-semibold text-green-800">Rice & Grains</span>
                  </label>
                  <label class="border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1E4B35] transition">
                    <Hexagon class="w-6 h-6 text-yellow-500" />
                    <span class="text-sm font-semibold text-gray-900">Honey</span>
                  </label>
                  <label class="border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1E4B35] transition">
                    <Leaf class="w-6 h-6 text-green-600" />
                    <span class="text-sm font-semibold text-gray-900">Tea</span>
                  </label>
                  <label class="border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1E4B35] transition">
                    <Egg class="w-6 h-6 text-amber-700" />
                    <span class="text-sm font-semibold text-gray-900">Meat & Eggs</span>
                  </label>
                  <label class="border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1E4B35] transition col-span-2">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-gray-900">Other:</span>
                      <input type="text" placeholder="Please specify" class="border-b focus:border-[#1E4B35] outline-none px-1 text-xs text-gray-900 bg-transparent w-32" />
                    </div>
                  </label>
                </div>
              </div>

              <!-- 4. Region -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin class="w-5 h-5 text-[#1E4B35]" /> 4. Region
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Country *</label>
                    <select class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] bg-white text-gray-900">
                      <option>Philippines</option>
                      <option>Vietnam</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Region / State / Province *</label>
                    <select class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] bg-white text-gray-900">
                      <option>Benguet</option>
                      <option>Cordillera Administrative Region (CAR)</option>
                      <option>Metro Manila</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">City / Municipality *</label>
                    <select class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] bg-white text-gray-900">
                      <option>La Trinidad</option>
                      <option>Baguio City</option>
                      <option>Itogon</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 5. Contact Person -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User class="w-5 h-5 text-[#1E4B35]" /> 5. Contact Person
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Full Name *</label>
                    <input type="text" placeholder="Enter contact full name" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Position / Role *</label>
                    <input type="text" placeholder="e.g. Farm Manager, Secretary" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Email Address *</label>
                    <input type="email" placeholder="example@email.com" class="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1.5">Phone Number *</label>
                    <div class="flex gap-2">
                      <select class="w-1/3 border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-[#1E4B35] bg-white text-gray-900">
                        <option>+63</option>
                        <option>+84</option>
                      </select>
                      <input type="text" placeholder="912 345 6789" class="w-2/3 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                    </div>
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm text-gray-600 mb-1.5">Alternate Phone (Optional)</label>
                    <div class="flex gap-2 w-1/2">
                      <select class="w-1/3 border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-[#1E4B35] bg-white text-gray-900">
                        <option>+63</option>
                        <option>+84</option>
                      </select>
                      <input type="text" placeholder="912 345 6789" class="w-2/3 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 6. Supporting Information -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UploadCloud class="w-5 h-5 text-[#1E4B35]" /> 6. Supporting Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition">
                    <Upload class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <div class="text-sm font-semibold text-gray-900">Farm Profile / Farm Overview *</div>
                    <div class="text-xs text-gray-500 mt-1">Click to upload or drag & drop</div>
                    <div class="text-[10px] text-gray-400 mt-4">Max file size: 10 MB</div>
                  </div>
                  <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition">
                    <Upload class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <div class="text-sm font-semibold text-gray-900">Sample Certificates (Optional)</div>
                    <div class="text-xs text-gray-500 mt-1">Click to upload or drag & drop</div>
                    <div class="text-[10px] text-gray-400 mt-4">Max file size: 10 MB</div>
                  </div>
                  <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer transition">
                    <Upload class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <div class="text-sm font-semibold text-gray-900">Sample Product List *</div>
                    <div class="text-xs text-gray-500 mt-1">Click to upload or drag & drop</div>
                    <div class="text-[10px] text-gray-400 mt-4">Max file size: 10 MB</div>
                  </div>
                </div>
              </div>

              <!-- 7. Notes -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText class="w-5 h-5 text-[#1E4B35]" /> 7. Notes
                </h3>
                <textarea placeholder="Please share any additional information or comments..." rows="4" class="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#1E4B35] focus:border-[#1E4B35] resize-none"></textarea>
                <div class="text-right text-xs text-gray-400 mt-1">0 / 300</div>
              </div>

              <!-- Submit area -->
              <div class="pt-6 border-t border-gray-100">
                <label class="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" class="rounded border-gray-300 text-[#1E4B35] focus:ring-[#1E4B35] w-5 h-5 mt-0.5" />
                  <span class="text-sm text-gray-700 leading-normal">
                    I confirm that the information provided is true and accurate to the best of my knowledge. <span class="text-red-500">*</span>
                  </span>
                </label>
                <button class="w-full py-4 bg-[#1E4B35] hover:bg-[#163a29] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-[#1E4B35]/20">
                  <Send class="w-4 h-4" /> Submit Sample Inquiry
                </button>
                <p class="text-center text-xs text-gray-500 mt-3">
                  By submitting, you agree that Green Trace may contact you regarding your inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar (Right) -->
        <div class="w-full lg:w-[35%] space-y-6">
          <!-- Required Checklist -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-4">Required Materials Checklist</h3>
            <p class="text-sm text-gray-600 mb-4">Please prepare the following before submitting:</p>
            <ul class="space-y-3">
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Farm or Co-op profile overview</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Valid business or registration documents</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Sample certificates or compliance documents (if available)</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Sample product list with varieties and availability</span>
              </li>
              <li class="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Contact details of the authorized representative</span>
              </li>
            </ul>
          </div>

          <!-- What Happens Next -->
          <div class="bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-[#1E4B35] mb-4">What Happens Next?</h3>
            <div class="relative pl-8 space-y-6">
              <div class="absolute left-3.5 top-2 bottom-2 w-0.5 bg-green-200"></div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <h4 class="font-bold text-gray-900 text-sm">Inquiry Received</h4>
                <p class="text-xs text-gray-600 mt-1">We receive your submission and acknowledge within 2 business days.</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <h4 class="font-bold text-gray-900 text-sm">Review & Evaluation</h4>
                <p class="text-xs text-gray-600 mt-1">Our team reviews your information and documents.</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <h4 class="font-bold text-gray-900 text-sm">Follow-up</h4>
                <p class="text-xs text-gray-600 mt-1">We may contact you for additional details or clarification.</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[35px] w-7 h-7 bg-[#1E4B35] text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <h4 class="font-bold text-gray-900 text-sm">Next Steps</h4>
                <p class="text-xs text-gray-600 mt-1">If approved, we'll guide you through the onboarding process.</p>
              </div>
            </div>
            <div class="mt-6 border-t border-green-200 pt-4 text-center text-xs text-green-800 font-semibold">
              Average review time: 3-5 business days
            </div>
          </div>

          <!-- FAQ Accordion -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div class="space-y-3">
              <div class="border-b border-gray-100 pb-3">
                <button @click="toggleFaq(0)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>Is this a live enrollment?</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 0 }" />
                </button>
                <div v-show="activeFaq === 0" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  No. This is a prototype inquiry form. Submitting does not create an account or guarantee approval.
                </div>
              </div>
              <div class="border-b border-gray-100 pb-3">
                <button @click="toggleFaq(1)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>Can I submit multiple categories?</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 1 }" />
                </button>
                <div v-show="activeFaq === 1" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  Yes, you can check multiple categories that apply to your farm's production.
                </div>
              </div>
              <div class="border-b border-gray-100 pb-3">
                <button @click="toggleFaq(2)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>What file types are accepted?</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 2 }" />
                </button>
                <div v-show="activeFaq === 2" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  We accept PDF, JPG, PNG, and DOCX files up to 10MB each.
                </div>
              </div>
              <div>
                <button @click="toggleFaq(3)" class="w-full flex justify-between items-center text-left font-semibold text-sm text-gray-900 hover:text-[#1E4B35] transition">
                  <span>Do I need to pay to join?</span>
                  <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeFaq === 3 }" />
                </button>
                <div v-show="activeFaq === 3" class="text-xs text-gray-500 mt-2 leading-relaxed">
                  No, joining the Green Trace platform as a producer is completely free.
                </div>
              </div>
            </div>
            <a href="#" class="block text-center text-xs font-bold text-green-700 hover:underline mt-4">View all FAQs</a>
          </div>

          <!-- Need Help -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
            <h3 class="font-bold text-gray-900 mb-1">Need Help?</h3>
            <p class="text-xs text-gray-500 mb-4">We're here to support you.</p>
            <div class="text-sm text-gray-700 space-y-1.5 mb-4 text-left">
              <div class="flex items-center gap-2 justify-center">
                <Mail class="w-4 h-4 text-gray-400" />
                <span class="font-semibold text-gray-900">partners@greentrace.ph</span>
              </div>
              <div class="flex items-center gap-2 justify-center">
                <Phone class="w-4 h-4 text-gray-400" />
                <span class="font-semibold text-gray-900">+63 912 345 6789</span>
              </div>
              <div class="text-center text-[10px] text-gray-400">Hours: Mon-Fri, 8:00 AM - 5:00 PM (PHT)</div>
            </div>
            <button class="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition">
              <MessageSquare class="w-4 h-4 fill-current" /> Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
      
      <!-- Bottom Branding Banner -->
      <div class="mt-16 bg-[#1E4B35] rounded-3xl p-8 lg:p-12 text-white text-center shadow-lg relative overflow-hidden">
        <div class="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 class="text-2xl lg:text-3xl font-extrabold tracking-tight">Together, We Build Trust in Every Harvest</h2>
          <p class="text-green-100 text-sm leading-relaxed max-w-xl mx-auto">
            Your commitment to quality and transparency helps create a better food future for our communities and the planet.
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs font-semibold text-green-200">
            <div class="flex items-center justify-center gap-2">
              <ShieldCheck class="w-5 h-5 text-green-400" /> Transparent
            </div>
            <div class="flex items-center justify-center gap-2">
              <Sprout class="w-5 h-5 text-green-400" /> Sustainable
            </div>
            <div class="flex items-center justify-center gap-2">
              <Users class="w-5 h-5 text-green-400" /> Community-Focused
            </div>
            <div class="flex items-center justify-center gap-2">
              <TrendingUp class="w-5 h-5 text-green-400" /> Future-Ready
            </div>
          </div>
        </div>
        <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Leaf class="w-60 h-60 text-white fill-current" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Leaf, ShieldCheck, Eye, TrendingUp, FileText, Users, Sprout, Building, User, Package, UploadCloud, Upload, CheckCircle2, Apple, Carrot, Wheat, Hexagon, FileBox, Send, Egg, ChevronDown, Mail, Phone, MessageSquare, MapPin } from 'lucide-vue-next'

const activeFaq = ref(0)

function toggleFaq(index) {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
}
</script>
