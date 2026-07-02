<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <router-link to="/" class="inline-flex items-center gap-2 mb-4">
        <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1782962604/94b91564-4854-4699-b10c-8c875f14c868.png" alt="Green Trace Logo" class="h-20 w-auto object-contain" />
      </router-link>
      <h2 class="text-center text-3xl font-extrabold text-gray-900">{{ appStore.t('createNewAccount') }}</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/login" class="font-bold text-[#1E4B35] hover:text-[#163a29] underline">
          {{ appStore.t('signInExisting') }}
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg border border-gray-150 sm:rounded-2xl sm:px-10">
        <form class="space-y-5" @submit.prevent="handleRegister">
          <!-- Error Alert -->
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <AlertCircle class="h-5 w-5 text-red-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 font-medium">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700">{{ appStore.t('fullName') }}</label>
            <div class="mt-1.5 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-sm"
                :placeholder="appStore.t('fullNamePlaceholder')"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700">{{ appStore.t('emailAddress') }}</label>
            <div class="mt-1.5 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-sm"
                :placeholder="appStore.t('emailPlaceholder')"
              />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700">{{ appStore.t('phoneNumber') }}</label>
            <div class="mt-1.5 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-sm"
                :placeholder="appStore.t('phonePlaceholder')"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700">{{ appStore.t('passwordLabel') }}</label>
            <div class="mt-1.5 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-sm"
                :placeholder="appStore.t('passwordPlaceholder')"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">{{ appStore.t('accountRole') }}</label>
            <div class="grid grid-cols-2 gap-3">
              <label
                class="border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer text-center transition"
                :class="role === 'customer' ? 'border-2 border-[#1E4B35] bg-green-50/50 text-[#1E4B35]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              >
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  v-model="role"
                  class="sr-only"
                />
                <User class="w-5 h-5 mb-1" />
                <span class="text-xs font-bold">{{ appStore.t('customerRoleLabel') }}</span>
                <span class="text-[9px] opacity-75 mt-0.5">{{ appStore.t('customerRoleDesc') }}</span>
              </label>

              <label
                class="border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer text-center transition"
                :class="role === 'producer' ? 'border-2 border-[#1E4B35] bg-green-50/50 text-[#1E4B35]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              >
                <input
                  type="radio"
                  name="role"
                  value="producer"
                  v-model="role"
                  class="sr-only"
                />
                <Store class="w-5 h-5 mb-1" />
                <span class="text-xs font-bold">{{ appStore.t('producerRoleLabel') }}</span>
                <span class="text-[9px] opacity-75 mt-0.5">{{ appStore.t('producerRoleDesc') }}</span>
              </label>
            </div>
          </div>

          <div class="flex items-start mt-2">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-[#1E4B35] focus:ring-[#1E4B35] border-gray-300 rounded"
              />
            </div>
            <div class="ml-2 text-xs">
              <label for="terms" class="font-medium text-gray-700">
                {{ appStore.t('agreeTerms') }}
                <a href="#" class="font-bold text-[#1E4B35] hover:text-[#163a29] underline">{{ appStore.t('termsOfService') }}</a>
                {{ appStore.t('andLabel') }}
                <a href="#" class="font-bold text-[#1E4B35] hover:text-[#163a29] underline">{{ appStore.t('privacyPolicy') }}</a>.
              </label>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#1E4B35] hover:bg-[#163a29] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E4B35] transition duration-150 disabled:opacity-50"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <Loader2 class="animate-spin w-4 h-4" /> {{ appStore.t('creatingAccount') }}
              </span>
              <span v-else>{{ appStore.t('registerBtn') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { Leaf, User, Mail, Phone, Lock, Store, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const role = ref('customer')
const acceptTerms = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleRegister() {
  if (!acceptTerms.value) {
    errorMessage.value = appStore.t('acceptTermsErr')
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await appStore.register(
      name.value,
      email.value,
      password.value,
      phone.value,
      role.value
    )
    if (data.success) {
      if (role.value === 'producer') {
        router.push('/producer-dashboard')
      } else {
        router.push('/account')
      }
    }
  } catch (err) {
    errorMessage.value = err.message || 'Registration failed. Please check details or email already in use.'
  } finally {
    loading.value = false
  }
}
</script>
