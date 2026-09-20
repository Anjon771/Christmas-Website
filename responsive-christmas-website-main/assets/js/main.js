/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',
    slidesPerView: "auto",
    centeredSlides: true,
    
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
        992: {
          spaceBetween: 80,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
      // reset: true
    })

    sr.reveal(`.home__img, .new__container, .footer__container`)
    sr.reveal(`.home__data`, {delay: 500})
    sr.reveal(`.giving__content, .gift__card`,{interval: 100})
    sr.reveal(`.celebrate__data, .message__form, .footer__img1`,{origin: 'left'})
    sr.reveal(`.celebrate__img, .message__img, .footer__img2`,{origin: 'right'})
}

/*==================== CHRISTMAS COUNTDOWN TIMER ====================*/
function initChristmasCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let xmas = new Date(currentYear, 11, 25, 0, 0, 0); // Dec 25

        // If today is past Christmas this year, count to next year's Christmas
        if (now.getTime() > xmas.getTime()) {
            xmas = new Date(currentYear + 1, 11, 25, 0, 0, 0);
        }

        const diff = xmas.getTime() - now.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}
initChristmasCountdown();

/*==================== TOAST NOTIFICATIONS ====================*/
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    let iconClass = 'bx-check-circle';
    if (type === 'heart') iconClass = 'bx-heart';
    if (type === 'cart') iconClass = 'bx-shopping-bag';
    if (type === 'info') iconClass = 'bx-info-circle';

    toast.innerHTML = `
        <i class='bx ${iconClass} toast__icon'></i>
        <div class="toast__content">
            <span class="toast__message">${message}</span>
        </div>
        <i class='bx bx-x toast__close'></i>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast__close').addEventListener('click', () => {
        toast.style.animation = 'toastOut .3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'toastOut .3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3600);
}

/*==================== SNOWFALL CANVAS EFFECT ====================*/
const snowCanvas = document.getElementById('snow-canvas');
const snowBtn = document.getElementById('snow-button');
let snowCtx = null;
let snowflakes = [];
let snowAnimId = null;
let snowActive = true;

if (snowCanvas) {
    snowCtx = snowCanvas.getContext('2d');
    
    function resizeSnow() {
        snowCanvas.width = window.innerWidth;
        snowCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeSnow);
    resizeSnow();

    const flakeCount = 55;
    for (let i = 0; i < flakeCount; i++) {
        snowflakes.push({
            x: Math.random() * snowCanvas.width,
            y: Math.random() * snowCanvas.height,
            radius: Math.random() * 2.8 + 1,
            speed: Math.random() * 1.2 + 0.5,
            wind: Math.random() * 0.6 - 0.3,
            opacity: Math.random() * 0.6 + 0.3
        });
    }

    function renderSnow() {
        if (!snowActive) return;
        snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
        snowCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';

        snowflakes.forEach(flake => {
            snowCtx.beginPath();
            snowCtx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            snowCtx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            snowCtx.fill();

            flake.y += flake.speed;
            flake.x += flake.wind;

            if (flake.y > snowCanvas.height) {
                flake.y = -5;
                flake.x = Math.random() * snowCanvas.width;
            }
            if (flake.x > snowCanvas.width) flake.x = 0;
            if (flake.x < 0) flake.x = snowCanvas.width;
        });

        snowAnimId = requestAnimationFrame(renderSnow);
    }
    renderSnow();

    if (snowBtn) {
        snowBtn.addEventListener('click', () => {
            snowActive = !snowActive;
            snowBtn.classList.toggle('active', snowActive);
            if (snowActive) {
                renderSnow();
                showToast('Snowfall effect enabled ❄️', 'info');
            } else {
                if (snowAnimId) cancelAnimationFrame(snowAnimId);
                snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
                showToast('Snowfall effect paused', 'info');
            }
        });
    }
}

/*==================== CONFETTI CELEBRATION FX ====================*/
const confettiCanvas = document.getElementById('confetti-canvas');
let confettiCtx = null;
let confettiParticles = [];
let confettiAnimId = null;

if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfetti);
    resizeConfetti();

    function fireConfetti(startX = window.innerWidth / 2, startY = window.innerHeight / 2) {
        const colors = ['#dc2626', '#16a34a', '#fbbf24', '#ffffff', '#38bdf8', '#f43f5e'];
        for (let i = 0; i < 90; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 8 + 3;
            confettiParticles.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 2,
                size: Math.random() * 7 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: Math.random() * 10 - 5,
                opacity: 1,
                gravity: 0.18
            });
        }
        if (!confettiAnimId) renderConfetti();
    }

    function renderConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles = confettiParticles.filter(p => p.opacity > 0);

        confettiParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.012;

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate((p.rotation * Math.PI) / 180);
            confettiCtx.fillStyle = p.color;
            confettiCtx.globalAlpha = Math.max(0, p.opacity);
            confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            confettiCtx.restore();
        });

        if (confettiParticles.length > 0) {
            confettiAnimId = requestAnimationFrame(renderConfetti);
        } else {
            confettiAnimId = null;
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }
}

/*==================== WEB AUDIO JINGLE BELL CHIME ====================*/
const musicBtn = document.getElementById('music-button');
let audioCtx = null;
let isPlayingMelody = false;

function playHolidayJingle() {
    if (isPlayingMelody) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        isPlayingMelody = true;
        if (musicBtn) musicBtn.classList.add('active');

        // Jingle Bells notes (Frequency in Hz, duration in seconds)
        // E5, E5, E5,  E5, E5, E5,  E5, G5, C5, D5, E5
        const notes = [
            { f: 659.25, d: 0.22, pause: 0.08 }, // E
            { f: 659.25, d: 0.22, pause: 0.08 }, // E
            { f: 659.25, d: 0.44, pause: 0.16 }, // E
            { f: 659.25, d: 0.22, pause: 0.08 }, // E
            { f: 659.25, d: 0.22, pause: 0.08 }, // E
            { f: 659.25, d: 0.44, pause: 0.16 }, // E
            { f: 659.25, d: 0.22, pause: 0.08 }, // E
            { f: 783.99, d: 0.22, pause: 0.08 }, // G
            { f: 523.25, d: 0.30, pause: 0.08 }, // C
            { f: 587.33, d: 0.20, pause: 0.08 }, // D
            { f: 659.25, d: 0.65, pause: 0.20 }, // E
        ];

        let curTime = audioCtx.currentTime + 0.05;

        notes.forEach(note => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.f, curTime);

            // Shimmer / harmonic chime effect
            gain.gain.setValueAtTime(0, curTime);
            gain.gain.linearRampToValueAtTime(0.18, curTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, curTime + note.d);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(curTime);
            osc.stop(curTime + note.d);

            curTime += note.d + note.pause;
        });

        const totalDuration = (curTime - audioCtx.currentTime) * 1000;
        setTimeout(() => {
            isPlayingMelody = false;
            if (musicBtn) musicBtn.classList.remove('active');
        }, totalDuration);

        showToast('Playing Christmas Jingle Bells chime 🔔', 'info');
    } catch (e) {
        console.warn('Audio playback error:', e);
        isPlayingMelody = false;
        if (musicBtn) musicBtn.classList.remove('active');
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', playHolidayJingle);
}

/*==================== WISHLIST & CART STATE ====================*/
let wishlist = JSON.parse(localStorage.getItem('holiday_wishlist') || '[]');
let cart = JSON.parse(localStorage.getItem('holiday_cart') || '[]');
let discountApplied = false;

function saveState() {
    localStorage.setItem('holiday_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('holiday_cart', JSON.stringify(cart));
    updateBadges();
    renderWishlist();
    renderCart();
    syncHeartIcons();
}

function updateBadges() {
    const wishBadge = document.getElementById('wishlist-badge');
    const cartBadge = document.getElementById('cart-badge');
    
    if (wishBadge) {
        wishBadge.textContent = wishlist.length;
        wishBadge.classList.toggle('active', wishlist.length > 0);
    }
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.classList.toggle('active', totalItems > 0);
    }
}

function syncHeartIcons() {
    // Synchronize heart icons in DOM to match wishlist state
    document.querySelectorAll('[data-id]').forEach(card => {
        const id = card.getAttribute('data-id');
        const icon = card.querySelector('.gift__icon, .new__icon');
        if (icon) {
            const inWish = wishlist.some(item => item.id === id);
            if (inWish) {
                icon.classList.remove('bx-heart');
                icon.classList.add('bxs-heart');
                icon.style.color = 'var(--first-color)';
            } else {
                icon.classList.remove('bxs-heart');
                icon.classList.add('bx-heart');
                icon.style.color = '';
            }
        }
    });
}

/*==================== WISHLIST DRAWER ====================*/
const wishlistBtn = document.getElementById('wishlist-button');
const wishlistDrawer = document.getElementById('wishlist-drawer');
const wishlistBackdrop = document.getElementById('wishlist-backdrop');
const closeWishlistBtn = document.getElementById('close-wishlist');
const moveAllCartBtn = document.getElementById('move-all-cart-btn');

function openWishlist() {
    if (wishlistDrawer) wishlistDrawer.classList.add('active');
    if (wishlistBackdrop) wishlistBackdrop.classList.add('active');
    renderWishlist();
}

function closeWishlist() {
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistBackdrop) wishlistBackdrop.classList.remove('active');
}

if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlist);
if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlist);
if (wishlistBackdrop) wishlistBackdrop.addEventListener('click', closeWishlist);

function toggleWishlist(product) {
    const idx = wishlist.findIndex(item => item.id === product.id);
    if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast(`Removed "${product.title}" from Wishlist`, 'info');
    } else {
        wishlist.push(product);
        showToast(`Saved "${product.title}" to Wishlist! ❤️`, 'heart');
    }
    saveState();
}

function renderWishlist() {
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="drawer-empty">
                <i class='bx bx-heart drawer-empty-icon'></i>
                <h4 style="font-size: var(--h3-font-size); color: var(--title-color); margin-bottom: .25rem;">Your Wishlist is Empty</h4>
                <p style="font-size: var(--small-font-size); color: var(--text-color);">Click the heart icon on any holiday gift to save it for later!</p>
            </div>
        `;
        if (moveAllCartBtn) moveAllCartBtn.style.display = 'none';
        return;
    }

    if (moveAllCartBtn) moveAllCartBtn.style.display = 'block';

    container.innerHTML = wishlist.map(item => `
        <div class="drawer-item" data-id="${item.id}">
            <img src="${item.img}" alt="${item.title}" class="drawer-item-img">
            <div class="drawer-item-info">
                <h4 class="drawer-item-title">${item.title}</h4>
                <span class="drawer-item-price">$${item.price}</span>
                <button class="drawer-item-action-btn add-to-bag-from-wish" data-id="${item.id}">
                    <i class='bx bx-shopping-bag'></i> Add to Gift Bag
                </button>
            </div>
            <button class="drawer-item-remove remove-wish-item" data-id="${item.id}" title="Remove">
                <i class='bx bx-trash'></i>
            </button>
        </div>
    `).join('');

    container.querySelectorAll('.remove-wish-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            wishlist = wishlist.filter(item => item.id !== id);
            saveState();
            showToast('Item removed from wishlist', 'info');
        });
    });

    container.querySelectorAll('.add-to-bag-from-wish').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = wishlist.find(p => p.id === id);
            if (item) {
                addToCart(item);
                wishlist = wishlist.filter(p => p.id !== id);
                saveState();
            }
        });
    });
}

if (moveAllCartBtn) {
    moveAllCartBtn.addEventListener('click', () => {
        if (wishlist.length === 0) return;
        wishlist.forEach(item => {
            const exist = cart.find(c => c.id === item.id);
            if (exist) exist.quantity += 1;
            else cart.push({ ...item, quantity: 1 });
        });
        const count = wishlist.length;
        wishlist = [];
        saveState();
        closeWishlist();
        openCart();
        showToast(`Moved ${count} items to Gift Bag! 🎁`, 'cart');
    });
}

/*==================== CART / GIFT BAG DRAWER ====================*/
const cartBtn = document.getElementById('cart-button');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const closeCartBtn = document.getElementById('close-cart');
const applyCouponBtn = document.getElementById('apply-coupon-btn');
const couponInput = document.getElementById('cart-coupon');
const checkoutBtn = document.getElementById('checkout-btn');

function openCart() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartBackdrop) cartBackdrop.classList.add('active');
    renderCart();
}

function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartBackdrop) cartBackdrop.classList.remove('active');
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: Number(product.price),
            img: product.img,
            quantity: 1
        });
    }
    saveState();
    showToast(`Added "${product.title}" to Gift Bag! 🛍️`, 'cart');
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-footer');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="drawer-empty">
                <i class='bx bx-shopping-bag drawer-empty-icon'></i>
                <h4 style="font-size: var(--h3-font-size); color: var(--title-color); margin-bottom: .25rem;">Your Gift Bag is Empty</h4>
                <p style="font-size: var(--small-font-size); color: var(--text-color);">Explore our holiday catalog to add gifts, treats & decorations!</p>
            </div>
        `;
        if (footer) footer.style.display = 'none';
        return;
    }

    if (footer) footer.style.display = 'block';

    container.innerHTML = cart.map(item => `
        <div class="drawer-item" data-id="${item.id}">
            <img src="${item.img}" alt="${item.title}" class="drawer-item-img">
            <div class="drawer-item-info">
                <h4 class="drawer-item-title">${item.title}</h4>
                <span class="drawer-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <div class="drawer-item-qty">
                    <button class="drawer-qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="drawer-qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
            </div>
            <button class="drawer-item-remove remove-cart-item" data-id="${item.id}" title="Remove">
                <i class='bx bx-trash'></i>
            </button>
        </div>
    `).join('');

    // Quantity buttons
    container.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(c => c.id === id);
            if (item) {
                if (item.quantity > 1) item.quantity -= 1;
                else cart = cart.filter(c => c.id !== id);
                saveState();
            }
        });
    });

    container.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(c => c.id === id);
            if (item) {
                item.quantity += 1;
                saveState();
            }
        });
    });

    container.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart = cart.filter(c => c.id !== id);
            saveState();
            showToast('Item removed from gift bag', 'info');
        });
    });

    // Summary calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = discountApplied ? subtotal * 0.25 : 0;
    const total = subtotal - discount;

    const subtotalEl = document.getElementById('cart-subtotal');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountRow && discountEl) {
        if (discountApplied) {
            discountRow.style.display = 'flex';
            discountEl.textContent = `-$${discount.toFixed(2)}`;
        } else {
            discountRow.style.display = 'none';
        }
    }
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (code === 'SANTA25' || code === 'MERRY' || code === 'XMAS2026') {
            discountApplied = true;
            renderCart();
            showToast('Promo code applied: 25% Holiday Discount! 🏷️', 'success');
        } else if (!code) {
            showToast('Please enter a promo code like "SANTA25"', 'info');
        } else {
            showToast('Invalid promo code. Try "SANTA25"!', 'info');
        }
    });
}

/*==================== CHECKOUT MODAL ====================*/
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutDoneBtn = document.getElementById('checkout-done-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your gift bag is empty!', 'info');
            return;
        }
        closeCart();
        if (checkoutModal) checkoutModal.classList.add('active');
        if (typeof fireConfetti === 'function') {
            fireConfetti(window.innerWidth / 2, window.innerHeight * 0.4);
        }
        // Clear cart on successful order
        cart = [];
        discountApplied = false;
        saveState();
    });
}

function closeCheckout() {
    if (checkoutModal) checkoutModal.classList.remove('active');
}
if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
if (checkoutDoneBtn) checkoutDoneBtn.addEventListener('click', closeCheckout);
if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckout();
    });
}

/*==================== GIFT FILTER & SEARCH ====================*/
const giftPills = document.querySelectorAll('.gift__pill');
const giftSearchInput = document.getElementById('gift-search-input');
const giftContainer = document.getElementById('gift-container');

let activeFilter = 'all';
let searchQuery = '';

function applyGiftFilters() {
    const cards = document.querySelectorAll('.gift__card');
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const price = Number(card.getAttribute('data-price'));
        const title = (card.getAttribute('data-title') || '').toLowerCase();

        let matchesFilter = true;
        if (activeFilter === 'all') matchesFilter = true;
        else if (activeFilter === 'under25') matchesFilter = price < 25;
        else matchesFilter = category === activeFilter;

        const matchesSearch = title.includes(searchQuery.toLowerCase());

        if (matchesFilter && matchesSearch) {
            card.style.display = 'grid';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    let emptyMsg = document.getElementById('gift-empty-msg');
    if (visibleCount === 0) {
        if (!emptyMsg && giftContainer) {
            emptyMsg = document.createElement('div');
            emptyMsg.id = 'gift-empty-msg';
            emptyMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 2rem 1rem; color: var(--text-color);';
            emptyMsg.innerHTML = `
                <i class='bx bx-search-alt' style="font-size: 2.5rem; color: var(--first-color); margin-bottom: .5rem; display: block;"></i>
                <p style="font-size: var(--normal-font-size); font-weight: var(--font-semi-bold);">No gifts match your search</p>
                <span style="font-size: var(--small-font-size);">Try searching for "gingerbread", "tree", "hat", or change filters.</span>
            `;
            giftContainer.appendChild(emptyMsg);
        }
    } else if (emptyMsg) {
        emptyMsg.remove();
    }
}

giftPills.forEach(pill => {
    pill.addEventListener('click', () => {
        giftPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.getAttribute('data-filter');
        applyGiftFilters();
    });
});

if (giftSearchInput) {
    giftSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        applyGiftFilters();
    });
}

/*==================== PRODUCT ACTIONS (GIFT CARDS & SWIPER) ====================*/
function setupProductCards() {
    // Gift Cards
    document.querySelectorAll('.gift__card').forEach(card => {
        const id = card.getAttribute('data-id');
        const title = card.getAttribute('data-title');
        const price = card.getAttribute('data-price');
        const img = card.getAttribute('data-img');
        const desc = card.getAttribute('data-desc');
        const badge = card.getAttribute('data-badge');

        const product = { id, title, price, img, desc, badge };

        // Heart Wishlist
        const heartBtn = card.querySelector('.gift__icon');
        if (heartBtn) {
            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWishlist(product);
            });
        }

        // Add to Bag Button
        const addBtn = card.querySelector('.gift__btn-add');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product);
            });
        }

        // Quick View Button
        const viewBtn = card.querySelector('.gift__btn-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openQuickView(product);
            });
        }
    });

    // New Gifts Swiper Cards
    document.querySelectorAll('.new__card').forEach(card => {
        const id = card.getAttribute('data-id');
        const title = card.getAttribute('data-title');
        const price = card.getAttribute('data-price');
        const img = card.getAttribute('data-img');
        const desc = card.getAttribute('data-desc');

        const product = { id, title, price, img, desc, badge: 'New Arrival' };

        // Heart Wishlist
        const heartBtn = card.querySelector('.new__button');
        if (heartBtn) {
            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWishlist(product);
            });
        }

        // Add to Bag Button
        const addBtn = card.querySelector('.new__add-bag-btn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product);
            });
        }
    });
}
setupProductCards();

/*==================== QUICK VIEW MODAL ====================*/
const quickViewModal = document.getElementById('quickview-modal');
const closeQuickViewBtn = document.getElementById('close-quickview');
const qvAddCartBtn = document.getElementById('qv-add-cart');
let currentQuickProduct = null;

function openQuickView(product) {
    currentQuickProduct = product;
    const badgeEl = document.getElementById('qv-badge');
    const imgEl = document.getElementById('qv-img');
    const titleEl = document.getElementById('qv-title');
    const descEl = document.getElementById('qv-desc');
    const priceEl = document.getElementById('qv-price');

    if (badgeEl) badgeEl.textContent = product.badge || 'Festive Choice';
    if (imgEl) {
        imgEl.src = product.img;
        imgEl.alt = product.title;
    }
    if (titleEl) titleEl.textContent = product.title;
    if (descEl) descEl.textContent = product.desc || 'Premium handcrafted holiday collection item.';
    if (priceEl) priceEl.textContent = `$${product.price}`;

    if (quickViewModal) quickViewModal.classList.add('active');
}

function closeQuickView() {
    if (quickViewModal) quickViewModal.classList.remove('active');
}

if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickView);
if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) closeQuickView();
    });
}
if (qvAddCartBtn) {
    qvAddCartBtn.addEventListener('click', () => {
        if (currentQuickProduct) {
            addToCart(currentQuickProduct);
            closeQuickView();
        }
    });
}

/*==================== POSTCARD GENERATOR & WISHES ====================*/
const wishesForm = document.getElementById('wishes-form');
const presetChips = document.querySelectorAll('.message__preset-chip');
const msgText = document.getElementById('msg-text');
const msgTo = document.getElementById('msg-to');
const msgFrom = document.getElementById('msg-from');
const previewCardBtn = document.getElementById('btn-preview-card');
const postcardModal = document.getElementById('postcard-modal');
const closePostcardBtn = document.getElementById('close-postcard');
const pcCopyBtn = document.getElementById('pc-copy-btn');
const pcBurstBtn = document.getElementById('pc-burst-btn');

presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const greeting = chip.getAttribute('data-greeting');
        if (msgText) msgText.value = `${greeting} May the holiday season bring peace, health, and happiness into your home.`;
    });
});

function openPostcardModal() {
    const to = (msgTo && msgTo.value.trim()) || 'Beloved Family & Friends';
    const from = (msgFrom && msgFrom.value.trim()) || "Santa's Secret Helper";
    const text = (msgText && msgText.value.trim()) || 'Merry Christmas and Happy New Year! Wishing you warmth, joy and festive celebrations.';

    const pcTo = document.getElementById('pc-to');
    const pcFrom = document.getElementById('pc-from');
    const pcMsg = document.getElementById('pc-message');

    if (pcTo) pcTo.textContent = `To: ${to}`;
    if (pcFrom) pcFrom.textContent = `With holiday love, ${from}`;
    if (pcMsg) pcMsg.textContent = text;

    if (postcardModal) postcardModal.classList.add('active');
    if (typeof fireConfetti === 'function') {
        fireConfetti(window.innerWidth / 2, window.innerHeight * 0.45);
    }
}

function closePostcardModal() {
    if (postcardModal) postcardModal.classList.remove('active');
}

if (previewCardBtn) previewCardBtn.addEventListener('click', openPostcardModal);
if (closePostcardBtn) closePostcardBtn.addEventListener('click', closePostcardModal);
if (postcardModal) {
    postcardModal.addEventListener('click', (e) => {
        if (e.target === postcardModal) closePostcardModal();
    });
}

if (pcCopyBtn) {
    pcCopyBtn.addEventListener('click', () => {
        const text = document.getElementById('pc-message')?.textContent || '';
        const to = document.getElementById('pc-to')?.textContent || '';
        const from = document.getElementById('pc-from')?.textContent || '';
        const fullGreeting = `${to}\n\n${text}\n\n${from} 🎄`;

        navigator.clipboard.writeText(fullGreeting).then(() => {
            showToast('Holiday postcard copied to clipboard! 📋', 'success');
        }).catch(() => {
            showToast('Could not copy automatically', 'info');
        });
    });
}

if (pcBurstBtn) {
    pcBurstBtn.addEventListener('click', () => {
        if (typeof fireConfetti === 'function') {
            fireConfetti(window.innerWidth / 2, window.innerHeight * 0.5);
            showToast('Holiday cheer unleashed! 🥳', 'success');
        }
    });
}

if (wishesForm) {
    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const recipient = (msgTo && msgTo.value.trim()) || 'your recipient';
        showToast(`Holiday blessing sent to ${recipient}! 📬✨`, 'success');
        if (typeof fireConfetti === 'function') {
            fireConfetti(window.innerWidth / 2, window.innerHeight * 0.5);
        }
        wishesForm.reset();
        if (msgText) msgText.value = 'Merry Christmas and Happy New Year! Wishing you and your loved ones peace, warmth, and boundless joy in the coming year.';
    });
}

/*==================== FAQ MODAL & ACCORDION ====================*/
const faqModal = document.getElementById('faq-modal');
const closeFaqBtn = document.getElementById('close-faq');
const footerFaqLink = document.getElementById('footer-faq-link');
const footerSupportLink = document.getElementById('footer-support-link');
const footerShippingLink = document.getElementById('footer-shipping-link');
const footerDiscountsLink = document.getElementById('footer-discounts-link');

function openFaqModal() {
    if (faqModal) faqModal.classList.add('active');
}
function closeFaqModal() {
    if (faqModal) faqModal.classList.remove('active');
}

if (footerFaqLink) footerFaqLink.addEventListener('click', (e) => { e.preventDefault(); openFaqModal(); });
if (footerSupportLink) footerSupportLink.addEventListener('click', (e) => { e.preventDefault(); openFaqModal(); });
if (footerShippingLink) footerShippingLink.addEventListener('click', (e) => { e.preventDefault(); openFaqModal(); });
if (footerDiscountsLink) footerDiscountsLink.addEventListener('click', (e) => { 
    e.preventDefault(); 
    openCart(); 
    showToast('Use promo code "SANTA25" for 25% discount! 🎁', 'info');
});

if (closeFaqBtn) closeFaqBtn.addEventListener('click', closeFaqModal);
if (faqModal) {
    faqModal.addEventListener('click', (e) => {
        if (e.target === faqModal) closeFaqModal();
    });
}

// Accordion collapse/expand
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    }
});

// Initialize badges and heart state on load
updateBadges();
syncHeartIcons();
