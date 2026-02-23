// بيانات المنتجات مع التصنيفات والتجار (Multi-vendor)
const products = [
    { id: 1, category: 'electronics', name: "آيفون 15 برو - تيتانيوم", price: 4500, vendor: "أبل الإمارات", img: "images/p1.webp" },
    { id: 2, category: 'electronics', name: "سماعات سوني WH-1000XM5", price: 1200, vendor: "سوني ستور", img: "images/p2.webp" },
    { id: 3, category: 'fashion', name: "تيشيرت قطني رياضي", price: 90, vendor: "نايكي الرسمي", img: "images/p3.webp" },
    { id: 4, category: 'home', name: "ماكينة قهوة نيسبريسو", price: 650, vendor: "نستله ستور", img: "images/p4.webp" },
    { id: 5, category: 'electronics', name: "ساعة سامسونج جالاكسي 6", price: 850, vendor: "سامسونج الإمارات", img: "images/p5.webp" },
    { id: 6, category: 'supermarket', name: "عبوة زيت زيتون بكر ممتاز", price: 45, vendor: "مزارع الطبيعة", img: "images/p6.webp" }
];

let cart = [];
function renderProducts(items) {
    const display = document.getElementById('product-display');
    if(!display) return;
    display.innerHTML = '';
    
    items.forEach(product => {
        display.innerHTML += `
            <div class="product-card">
                <!-- هذا الجزء هو الذي سيفتح صفحة التفاصيل عند الضغط عليه -->
                <div onclick="window.location.href='product-details.html?id=${product.id}'" style="cursor:pointer">
                    <span class="vendor-tag">بواسطة: ${product.vendor}</span>
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                </div>

                <!-- زر الإضافة للسلة يبقى مستقلاً -->
                <div class="price-box">
                    <span class="price">${product.price} درهم</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">أضف إلى السلة</button>
                </div>
            </div>
        `;
    });
}
// تصفية المنتجات حسب التصنيف
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// إضافة المنتج للسلة
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    // إشعار بسيط
    alert(`تم إضافة ${product.name} للسلة`);
}

// تحديث واجهة السلة
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4 style="font-size:12px; margin:0;">${item.name}</h4>
                    <span style="color:var(--vorq-blue)">${item.price} درهم</span>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:11px;">حذف</button>
                </div>
            </div>
        `;
    });
    
    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// فتح وإغلاق السلة
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// البحث عن المنتجات
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
});

// التشغيل الأولي
window.onload = () => renderProducts(products);


