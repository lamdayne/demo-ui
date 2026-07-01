import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { translations } from '../utils/translations';

export const useAppStore = defineStore('app', () => {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
  
  const lang = ref(localStorage.getItem('gt_lang') || 'vi');

  function toggleLanguage() {
    lang.value = lang.value === 'en' ? 'vi' : 'en';
    localStorage.setItem('gt_lang', lang.value);
  }

  function t(key) {
    return translations[lang.value]?.[key] || key;
  }

  const token = ref(localStorage.getItem('gt_token') || '');
  const user = ref(JSON.parse(localStorage.getItem('gt_user')) || null);
  const cart = ref(JSON.parse(localStorage.getItem('gt_cart')) || []);
  const wishlist = ref([]);
  const notifications = ref([]);
  const orders = ref([]);

  // Toast Notification state
  const toastMessage = ref('');
  const showToast = ref(false);

  function triggerToast(message) {
    toastMessage.value = message;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3500);
  }

  // Sync token session
  watch(token, (newVal) => {
    if (newVal) localStorage.setItem('gt_token', newVal);
    else localStorage.removeItem('gt_token');
  });

  // Sync profile session
  watch(user, (newVal) => {
    if (newVal) localStorage.setItem('gt_user', JSON.stringify(newVal));
    else localStorage.removeItem('gt_user');
  });

  // Sync shopping cart items
  watch(cart, (newVal) => {
    localStorage.setItem('gt_cart', JSON.stringify(newVal));
  }, { deep: true });

  // Main HTTP wrapper
  async function apiCall(endpoint, method = 'GET', body = null, requireAuth = true) {
    const headers = {};
    
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (requireAuth && token.value) {
      headers['Authorization'] = `Bearer ${token.value}`;
    }

    const config = {
      method,
      headers
    };

    if (body) {
      config.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (err) {
      console.error(`API Call failed (${endpoint}):`, err.message);
      throw err;
    }
  }

  // Authentication endpoints
  async function login(email, password) {
    const data = await apiCall('/auth/login', 'POST', { email, password }, false);
    token.value = data.token;
    user.value = data.user;
    await fetchWishlist();
    await fetchNotifications();
    return data;
  }

  async function register(name, email, password, phone, role) {
    const data = await apiCall('/auth/register', 'POST', { name, email, password, phone, role }, false);
    token.value = data.token;
    user.value = data.user;
    return data;
  }

  function logout() {
    token.value = '';
    user.value = null;
    wishlist.value = [];
    notifications.value = [];
    orders.value = [];
  }

  async function fetchProfile() {
    if (!token.value) return;
    const data = await apiCall('/auth/profile', 'GET');
    user.value = data.user;
  }

  async function updateProfile(profileData) {
    const data = await apiCall('/auth/profile', 'PUT', profileData);
    user.value = data.user;
    return data;
  }

  async function changePassword(currentPassword, newPassword) {
    return await apiCall('/auth/change-password', 'POST', { current_password: currentPassword, new_password: newPassword });
  }

  // Shipping Addresses endpoints
  async function fetchAddresses() {
    const data = await apiCall('/auth/addresses', 'GET');
    return data.addresses;
  }

  async function addAddress(addressData) {
    return await apiCall('/auth/addresses', 'POST', addressData);
  }

  async function updateAddress(id, addressData) {
    return await apiCall(`/auth/addresses/${id}`, 'PUT', addressData);
  }

  async function deleteAddress(id) {
    return await apiCall(`/auth/addresses/${id}`, 'DELETE');
  }

  // Products catalog endpoints
  async function fetchProducts(category = '', search = '', producerId = '') {
    let url = '/products';
    const params = [];
    if (category && category !== 'All Products' && category !== 'All') {
      params.push(`category=${encodeURIComponent(category)}`);
    }
    if (search) {
      params.push(`search=${encodeURIComponent(search)}`);
    }
    if (producerId) {
      params.push(`producer_id=${encodeURIComponent(producerId)}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    const data = await apiCall(url, 'GET', null, false);
    return data.products;
  }

  async function fetchProduct(id) {
    const data = await apiCall(`/products/${id}`, 'GET', null, false);
    return data.product;
  }

  async function createProduct(productData) {
    return await apiCall('/products', 'POST', productData);
  }

  async function updateProduct(id, productData) {
    return await apiCall(`/products/${id}`, 'PUT', productData);
  }

  async function deleteProduct(id) {
    return await apiCall(`/products/${id}`, 'DELETE');
  }

  // Batches CRUD
  async function fetchBatches(producerId = '') {
    let url = '/traceability';
    if (producerId) {
      url += `?producer_id=${encodeURIComponent(producerId)}`;
    }
    const data = await apiCall(url, 'GET', null, false);
    return data.batches;
  }

  async function updateBatch(id, batchData) {
    return await apiCall(`/traceability/${encodeURIComponent(id)}`, 'PUT', batchData);
  }

  async function deleteBatch(id) {
    return await apiCall(`/traceability/${encodeURIComponent(id)}`, 'DELETE');
  }

  async function updateProducerProfile(profileData) {
    return await apiCall('/producers/profile', 'PUT', profileData);
  }

  // Farm Producers endpoints
  async function fetchProducers(location = '') {
    let url = '/producers';
    if (location) {
      url += `?location=${encodeURIComponent(location)}`;
    }
    const data = await apiCall(url, 'GET', null, false);
    return data.producers;
  }

  async function fetchProducer(id) {
    const data = await apiCall(`/producers/${id}`, 'GET', null, false);
    return data.producer;
  }

  async function onboardProducer(producerData) {
    const data = await apiCall('/producers/onboard', 'POST', producerData);
    await fetchProfile();
    return data;
  }

  async function fetchProducerStats() {
    const data = await apiCall('/producers/dashboard/stats', 'GET');
    return data.stats;
  }

  // Stepper Verification & Traceability endpoints
  async function fetchBatch(batchId) {
    const data = await apiCall(`/traceability/${encodeURIComponent(batchId)}`, 'GET', null, false);
    return data.batch;
  }

  async function createBatch(batchData) {
    return await apiCall('/traceability', 'POST', batchData);
  }

  // Wishlist actions
  async function fetchWishlist() {
    if (!token.value) return;
    const data = await apiCall('/wishlist', 'GET');
    wishlist.value = data.wishlist;
  }

  async function toggleWishlist(productId) {
    if (!token.value) {
      alert('Please log in to save items to your wishlist.');
      return;
    }
    const exists = wishlist.value.some(w => parseInt(w.id) === parseInt(productId));
    if (exists) {
      await apiCall(`/wishlist/${productId}`, 'DELETE');
      wishlist.value = wishlist.value.filter(w => parseInt(w.id) !== parseInt(productId));
    } else {
      await apiCall('/wishlist', 'POST', { product_id: productId });
      await fetchWishlist();
    }
  }

  // Cart Local state management
  function addToCart(product, quantity = 1) {
    const existing = cart.value.find(item => parseInt(item.id) === parseInt(product.id));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({ ...product, quantity });
    }
    triggerToast(`Added "${product.name}" to cart successfully!`);
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter(item => parseInt(item.id) !== parseInt(productId));
  }

  function updateCartQuantity(productId, quantity) {
    const item = cart.value.find(item => parseInt(item.id) === parseInt(productId));
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
  }

  function clearCart() {
    cart.value = [];
  }

  // Order submission endpoints
  async function placeOrder(orderPayload, secondaryPaymentMethod) {
    let shippingAddress = '';
    let paymentMethod = 'MoMo';
    let notes = '';

    if (typeof orderPayload === 'object' && orderPayload !== null) {
      shippingAddress = orderPayload.address || orderPayload.shipping_address || '';
      paymentMethod = orderPayload.payment_method || 'MoMo';
      notes = orderPayload.notes || '';
    } else {
      shippingAddress = orderPayload;
      paymentMethod = secondaryPaymentMethod || 'MoMo';
    }

    const items = cart.value.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const total_price = (orderPayload && orderPayload.total_price !== undefined) 
      ? orderPayload.total_price 
      : cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
      total_price,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      notes,
      items
    };

    const data = await apiCall('/orders', 'POST', orderData);
    clearCart();
    return data.order;
  }

  async function fetchOrders() {
    if (!token.value) return;
    const data = await apiCall('/orders', 'GET');
    orders.value = data.orders;
  }

  async function fetchOrder(id) {
    const data = await apiCall(`/orders/${id}`, 'GET');
    return data.order;
  }

  // Notifications inbox endpoints
  async function fetchNotifications() {
    if (!token.value) return;
    const data = await apiCall('/notifications', 'GET');
    notifications.value = data.notifications;
  }

  async function markNotificationRead(id) {
    await apiCall(`/notifications/${id}/read`, 'PUT');
    notifications.value = notifications.value.map(n => n.id === id ? { ...n, is_read: true } : n);
  }

  // Contact support form endpoint
  async function submitSupport(ticketData) {
    return await apiCall('/support', 'POST', ticketData, false);
  }

  // Admin Operations
  async function fetchAdminStats() {
    const data = await apiCall('/admin/stats', 'GET');
    return data.stats;
  }

  async function fetchAdminUsers() {
    const data = await apiCall('/admin/users', 'GET');
    return data.users;
  }

  async function updateAdminUserRole(id, role) {
    return await apiCall(`/admin/users/${id}/role`, 'PUT', { role });
  }

  async function deleteAdminUser(id) {
    return await apiCall(`/admin/users/${id}`, 'DELETE');
  }

  async function fetchAdminProducers() {
    const data = await apiCall('/admin/producers', 'GET');
    return data.producers;
  }

  async function updateAdminProducerVerification(id, verified) {
    return await apiCall(`/admin/producers/${id}/verify`, 'PUT', { verified });
  }

  async function fetchAdminOrders() {
    const data = await apiCall('/admin/orders', 'GET');
    return data.orders;
  }

  async function updateAdminOrderStatus(id, status) {
    return await apiCall(`/admin/orders/${id}/status`, 'PUT', { status });
  }

  async function fetchAdminCoupons() {
    const data = await apiCall('/admin/coupons', 'GET');
    return data.coupons;
  }

  async function createAdminCoupon(couponData) {
    return await apiCall('/admin/coupons', 'POST', couponData);
  }

  async function deleteAdminCoupon(id) {
    return await apiCall(`/admin/coupons/${id}`, 'DELETE');
  }

  async function validateCouponCode(code, orderValue) {
    const data = await apiCall(`/admin/coupons/validate/${encodeURIComponent(code)}?order_value=${orderValue}`, 'GET');
    return data.coupon;
  }

  // Image Upload helper
  async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const data = await apiCall('/upload', 'POST', formData);
    return data.url;
  }

  // Initialize session data on store creation
  if (token.value) {
    fetchProfile().catch(() => logout());
    fetchWishlist().catch(() => {});
    fetchNotifications().catch(() => {});
  }

  return {
    API_BASE,
    lang,
    toggleLanguage,
    t,
    token,
    user,
    cart,
    wishlist,
    notifications,
    orders,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    changePassword,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchBatches,
    updateBatch,
    deleteBatch,
    updateProducerProfile,
    fetchProducers,
    fetchProducer,
    onboardProducer,
    fetchProducerStats,
    fetchBatch,
    createBatch,
    fetchWishlist,
    toggleWishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    fetchOrders,
    fetchOrder,
    fetchNotifications,
    markNotificationRead,
    submitSupport,
    uploadImage,
    toastMessage,
    showToast,
    triggerToast,
    fetchAdminStats,
    fetchAdminUsers,
    updateAdminUserRole,
    deleteAdminUser,
    fetchAdminProducers,
    updateAdminProducerVerification,
    fetchAdminOrders,
    updateAdminOrderStatus,
    fetchAdminCoupons,
    createAdminCoupon,
    deleteAdminCoupon,
    validateCouponCode
  };
});
