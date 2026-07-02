<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <router-link to="/" class="inline-flex items-center gap-2 mb-4">
        <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1782962604/94b91564-4854-4699-b10c-8c875f14c868.png" alt="Green Trace Logo" class="h-20 w-auto object-contain" />
      </router-link>
      <h2 class="text-center text-3xl font-extrabold text-gray-900">{{ appStore.t('signInTitle') }}</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/register" class="font-bold text-[#1E4B35] hover:text-[#163a29] underline">
          {{ appStore.t('registerNewAccount') }}
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg border border-gray-150 sm:rounded-2xl sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Error Alert -->
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <AlertCircle class="h-5 h-5 text-red-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 font-medium">{{ errorMessage }}</p>
              </div>
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
                autocomplete="email"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-sm"
                :placeholder="appStore.t('emailPlaceholder')"
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
                autocomplete="current-password"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4B35] focus:border-[#1E4B35] text-sm"
                :placeholder="appStore.t('passwordPlaceholder')"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-[#1E4B35] focus:ring-[#1E4B35] border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-xs text-gray-900 font-semibold">
                {{ appStore.t('rememberMe') }}
              </label>
            </div>

            <div class="text-xs">
              <a href="#" class="font-bold text-[#1E4B35] hover:text-[#163a29] underline">
                {{ appStore.t('forgotPassword') }}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#1E4B35] hover:bg-[#163a29] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E4B35] transition duration-150 disabled:opacity-50"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <Loader2 class="animate-spin w-4 h-4" /> {{ appStore.t('signingIn') }}
              </span>
              <span v-else>{{ appStore.t('signInBtn') }}</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-250"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 bg-white text-gray-500 font-medium">{{ appStore.t('demoCredentials') }}</span>
            </div>
          </div>

          <div class="mt-4 text-center text-xs text-gray-500 bg-gray-50 rounded-xl p-3 border border-dashed border-gray-200">
            <p><strong>Customer:</strong> customer@gmail.com / password</p>
            <p class="mt-1"><strong>Producer:</strong> producer@gmail.com / password</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { Leaf, Mail, Lock, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const appStore = useAppStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await appStore.login(email.value, password.value)
    if (data.success) {
      if (data.user.role === 'producer') {
        router.push('/producer-dashboard')
      } else {
        router.push('/account')
      }
    }
  } catch (err) {
    errorMessage.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>
