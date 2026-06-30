import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAppStore = defineStore('app', () => {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

  const token = ref(localStorage.getItem('gt_token') || '');
  const user = ref(JSON.parse(localStorage.getItem('gt_user')) || null);
  const cart = ref(JSON.parse(localStorage.getItem('gt_cart')) || []);
  const wishlist = ref([]);
  const notifications = ref([]);
  const orders = ref([]);

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
  async function fetchProducts(category = '', search = '') {
    let url = '/products';
    const params = [];
    if (category && category !== 'All Products' && category !== 'All') {
      params.push(`category=${encodeURIComponent(category)}`);
    }
    if (search) {
      params.push(`search=${encodeURIComponent(search)}`);
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

    const total_price = cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
    uploadImage
  };
});
