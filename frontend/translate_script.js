const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'src', 'views');

// Helper to replace text
function replaceInFile(fileName, replacements) {
    const filePath = path.join(viewsDir, fileName);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${fileName}`);
}

// CART.VUE
replaceInFile('Cart.vue', [
    ['Your Cart', "{{ appStore.t('shoppingCart') }}"],
    ['Review your items, adjust quantities, and proceed to checkout.', "{{ appStore.t('cartSubtitle') }}"],
    ['All products are traceable.', "{{ appStore.t('allTraceable') }}"],
    ['Verified producers.', "{{ appStore.t('verifiedProducers') }}"],
    ['Secure payments.', "{{ appStore.t('securePayments') }}"],
    ['Product</div>', "{{ appStore.t('productCol') }}</div>"],
    ['Producer & Batch</div>', "{{ appStore.t('producerBatchCol') }}</div>"],
    ['Quantity</div>', "{{ appStore.t('qtyCol') }}</div>"],
    ['Unit Price</div>', "{{ appStore.t('unitPriceCol') }}</div>"],
    ['Subtotal</div>', "{{ appStore.t('subtotalCol') }}</div>"],
    ['>Save for later<', ">{{ appStore.t('saveForLater') }}<"],
    ['Remove</button>', "{{ appStore.t('removeBtn') }}</button>"],
    ['Your shopping cart is empty.', "{{ appStore.t('emptyCart') }}"],
    ['> Save Cart', "> {{ appStore.t('saveCart') }}"],
    ['> Clear Cart', "> {{ appStore.t('clearCart') }}"],
    ['Order Summary', "{{ appStore.t('summary') }}"],
    ['Subtotal ({{ subtotalItems }} items)', "{{ appStore.t('subtotal') }} ({{ subtotalItems }} {{ appStore.t('itemsLabel') }})"],
    ['Standard Shipping', "{{ appStore.t('shipping') }}"],
    ['>FREE<', ">{{ appStore.t('free') }}<"],
    ['Total</span>', "{{ appStore.t('total') }}</span>"],
    ['Taxes included. Final total calculated at checkout.', "{{ appStore.t('taxesIncluded') }}"],
    ['Free standard shipping', "{{ appStore.t('freeShippingTitle') }}"],
    ['for merchandise subtotal from 500,000 VND', "{{ appStore.t('freeShippingDesc') }}"],
    ['Have a promo code?', "{{ appStore.t('havePromoCode') }}"],
    ['Applied</span>', "{{ appStore.t('applied') }}</span>"],
    ['Remove</span>', "{{ appStore.t('removeBtn') }}</span>"],
    ['placeholder="Enter promo code"', ":placeholder=\"appStore.t('promoCode')\""],
    ['> Apply\n                </button>', "> {{ appStore.t('apply') }}\n                </button>"],
    ['Promo code applied!', "{{ appStore.t('promoApplied') }}"],
    ['You saved {{ discountPrice.toLocaleString() }} VND with {{ appliedCoupon.code }}.', "{{ appStore.t('youSaved') }} {{ discountPrice.toLocaleString() }} VND {{ appStore.t('withCode') }} {{ appliedCoupon.code }}."],
    ['Continue Shopping', "{{ appStore.t('continueShopping') }}"],
    ['> Proceed to Checkout', "> {{ appStore.t('proceedToCheckout') }}"],
    ['Secure checkout. Your data is protected.', "{{ appStore.t('secureCheckout') }}"],
    ['Every item includes', "{{ appStore.t('everyItemIncludes') }}"],
    ['Sample Batch Records', "{{ appStore.t('sampleBatchRecords') }}"],
    ['Transparent from farm', "{{ appStore.t('transparentFromFarm') }}"],
    ['to your table', "{{ appStore.t('toYourTable') }}"],
    ['Producers are reviewed', "{{ appStore.t('producersReviewed') }}"],
    ['and verified', "{{ appStore.t('andVerified') }}"],
    ['You may also like', "{{ appStore.t('youMayAlsoLike') }}"],
    ['View all products', "{{ appStore.t('viewAllProducts') }}"],
    ['Add to Cart', "{{ appStore.t('addToCart') }}"],
    ['Secure payments</div>', "{{ appStore.t('securePayments') }}</div>"],
    ['Multiple safe options', "{{ appStore.t('multipleSafeOptions') }}"],
    ['Quality guaranteed', "{{ appStore.t('qualityGuaranteed') }}"],
    ['Carefully selected', "{{ appStore.t('carefullySelected') }}"],
    ['Easy returns', "{{ appStore.t('easyReturns') }}"],
    ['7-day support', "{{ appStore.t('sevenDaySupport') }}"],
    ['Friendly support', "{{ appStore.t('friendlySupport') }}"],
    ["We're here to help", "{{ appStore.t('weAreHereToHelp') }}"]
]);

// CHECKOUT.VUE
replaceInFile('Checkout.vue', [
    ['Checkout', "{{ appStore.t('checkoutTitle') }}"],
    ['1. Contact Information', "{{ appStore.t('contactInfoLabel') }}"],
    ['Email address', "{{ appStore.t('emailAddress') }}"],
    ['Phone number', "{{ appStore.t('phoneNumber') }}"],
    ['2. Shipping Address', "2. {{ appStore.t('shippingAddress') }}"],
    ['Full Name', "{{ appStore.t('fullName') }}"],
    ['Street Address', "{{ appStore.t('streetAddress') }}"],
    ['Province / City', "{{ appStore.t('provinceCity') }}"],
    ['District', "{{ appStore.t('district') }}"],
    ['3. Payment Method', "3. {{ appStore.t('paymentMethod') }}"],
    ['Cash on Delivery (COD)', "{{ appStore.t('codLabel') }}"],
    ['MoMo E-Wallet', "{{ appStore.t('momoLabel') }}"],
    ['Bank Transfer', "{{ appStore.t('bankTransferLabel') }}"],
    ['Additional Notes', "{{ appStore.t('additionalNotes') }}"],
    ['Any special instructions for delivery...', "{{ appStore.t('notesPlaceholder') }}"],
    ['Order Summary', "{{ appStore.t('summary') }}"],
    ['Subtotal', "{{ appStore.t('subtotal') }}"],
    ['Shipping', "{{ appStore.t('shipping') }}"],
    ['Discount', "{{ appStore.t('discount') }}"],
    ['Total', "{{ appStore.t('total') }}"],
    ['> Place Order <', "> {{ appStore.t('placeOrder') }} <"],
    ['Processing...', "{{ appStore.t('processing') }}"],
    ['Order successful!', "{{ appStore.t('orderSuccess') }}"]
]);

// Update translations.js
const transPath = path.join(__dirname, 'src', 'utils', 'translations.js');
let transContent = fs.readFileSync(transPath, 'utf8');

const enInsert = `
    // Extra labels
    cartSubtitle: 'Review your items, adjust quantities, and proceed to checkout.',
    allTraceable: 'All products are traceable.',
    verifiedProducers: 'Verified producers.',
    securePayments: 'Secure payments.',
    productCol: 'Product',
    producerBatchCol: 'Producer & Batch',
    qtyCol: 'Quantity',
    unitPriceCol: 'Unit Price',
    subtotalCol: 'Subtotal',
    saveForLater: 'Save for later',
    removeBtn: 'Remove',
    saveCart: 'Save Cart',
    clearCart: 'Clear Cart',
    itemsLabel: 'items',
    free: 'FREE',
    taxesIncluded: 'Taxes included. Final total calculated at checkout.',
    freeShippingTitle: 'Free standard shipping',
    freeShippingDesc: 'for merchandise subtotal from 500,000 VND',
    havePromoCode: 'Have a promo code?',
    applied: 'Applied',
    promoApplied: 'Promo code applied!',
    youSaved: 'You saved',
    withCode: 'with',
    continueShopping: 'Continue Shopping',
    proceedToCheckout: 'Proceed to Checkout',
    secureCheckout: 'Secure checkout. Your data is protected.',
    everyItemIncludes: 'Every item includes',
    sampleBatchRecords: 'Sample Batch Records',
    transparentFromFarm: 'Transparent from farm',
    toYourTable: 'to your table',
    producersReviewed: 'Producers are reviewed',
    andVerified: 'and verified',
    youMayAlsoLike: 'You may also like',
    addToCart: 'Add to Cart',
    multipleSafeOptions: 'Multiple safe options',
    qualityGuaranteed: 'Quality guaranteed',
    carefullySelected: 'Carefully selected',
    easyReturns: 'Easy returns',
    sevenDaySupport: '7-day support',
    friendlySupport: 'Friendly support',
    weAreHereToHelp: 'We\\'re here to help',
    contactInfoLabel: '1. Contact Information',
    streetAddress: 'Street Address',
    provinceCity: 'Province / City',
    district: 'District',
    codLabel: 'Cash on Delivery (COD)',
    momoLabel: 'MoMo E-Wallet',
    bankTransferLabel: 'Bank Transfer',
    additionalNotes: 'Additional Notes',
    notesPlaceholder: 'Any special instructions for delivery...',
    processing: 'Processing...',
    orderSuccess: 'Order successful!',
`;

const viInsert = `
    // Extra labels
    cartSubtitle: 'Xem lại sản phẩm, điều chỉnh số lượng và tiến hành thanh toán.',
    allTraceable: 'Tất cả sản phẩm đều có thể truy xuất.',
    verifiedProducers: 'Nhà sản xuất đã được xác thực.',
    securePayments: 'Thanh toán bảo mật.',
    productCol: 'Sản phẩm',
    producerBatchCol: 'Nhà sản xuất & Lô',
    qtyCol: 'Số lượng',
    unitPriceCol: 'Đơn giá',
    subtotalCol: 'Thành tiền',
    saveForLater: 'Lưu để mua sau',
    removeBtn: 'Xóa',
    saveCart: 'Lưu giỏ hàng',
    clearCart: 'Xóa giỏ hàng',
    itemsLabel: 'sản phẩm',
    free: 'MIỄN PHÍ',
    taxesIncluded: 'Đã bao gồm thuế. Tổng cuối cùng tính khi thanh toán.',
    freeShippingTitle: 'Miễn phí giao hàng tiêu chuẩn',
    freeShippingDesc: 'cho đơn hàng từ 500.000 VNĐ',
    havePromoCode: 'Bạn có mã giảm giá?',
    applied: 'Đã áp dụng',
    promoApplied: 'Đã áp dụng mã giảm giá!',
    youSaved: 'Bạn đã tiết kiệm',
    withCode: 'với mã',
    continueShopping: 'Tiếp tục mua sắm',
    proceedToCheckout: 'Tiến hành thanh toán',
    secureCheckout: 'Thanh toán bảo mật. Dữ liệu của bạn được an toàn.',
    everyItemIncludes: 'Mỗi sản phẩm đều có',
    sampleBatchRecords: 'Hồ sơ lô hàng mẫu',
    transparentFromFarm: 'Minh bạch từ nông trại',
    toYourTable: 'đến bàn ăn của bạn',
    producersReviewed: 'Nhà sản xuất được đánh giá',
    andVerified: 'và xác thực',
    youMayAlsoLike: 'Có thể bạn sẽ thích',
    addToCart: 'Thêm vào giỏ',
    multipleSafeOptions: 'Nhiều lựa chọn an toàn',
    qualityGuaranteed: 'Đảm bảo chất lượng',
    carefullySelected: 'Được tuyển chọn kỹ lưỡng',
    easyReturns: 'Đổi trả dễ dàng',
    sevenDaySupport: 'Hỗ trợ trong 7 ngày',
    friendlySupport: 'Hỗ trợ tận tình',
    weAreHereToHelp: 'Chúng tôi luôn ở đây để giúp đỡ',
    contactInfoLabel: '1. Thông tin liên hệ',
    streetAddress: 'Địa chỉ đường',
    provinceCity: 'Tỉnh / Thành phố',
    district: 'Quận / Huyện',
    codLabel: 'Thanh toán khi nhận hàng (COD)',
    momoLabel: 'Ví điện tử MoMo',
    bankTransferLabel: 'Chuyển khoản ngân hàng',
    additionalNotes: 'Ghi chú thêm',
    notesPlaceholder: 'Bất kỳ yêu cầu đặc biệt nào cho việc giao hàng...',
    processing: 'Đang xử lý...',
    orderSuccess: 'Đặt hàng thành công!',
`;

// Insert into English translations
transContent = transContent.replace(/agreeVerify: 'By submitting, you agree that Green Trace may verify your details.',/, "agreeVerify: 'By submitting, you agree that Green Trace may verify your details.'," + enInsert);

// Insert into Vietnamese translations
transContent = transContent.replace(/agreeVerify: 'Bằng việc gửi thông tin, bạn đồng ý để Green Trace xác thực các chi tiết trên.',/, "agreeVerify: 'Bằng việc gửi thông tin, bạn đồng ý để Green Trace xác thực các chi tiết trên.'," + viInsert);

fs.writeFileSync(transPath, transContent, 'utf8');
console.log('Translations updated.');
