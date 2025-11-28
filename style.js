// متغير عام لحفظ بيانات المنتج الحالي
let currentProduct = {
    name: "ساعة كاسيو A159W",
    price: "25000"
};

// ==================== Modal Functions ====================
const modal = document.getElementById('orderModal');
const form = document.getElementById('orderForm');

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    form.reset();
    document.getElementById('successMessage').style.display = 'none';
    form.style.display = 'block';
}

// إغلاق النموذج عند الضغط خارجه
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// ==================== Language Switcher ====================
function switchLanguage(lang) {
    // تحديث الزر النشط
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // إظهار القائمة المناسبة
    document.querySelectorAll('.nav-content').forEach(nav => nav.classList.add('hidden'));
    document.getElementById(`nav-${lang}`).classList.remove('hidden');

    // تحديث اتجاه الصفحة واللغة
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // تحديث المحتوى
    updateContent(lang);
}

function updateContent(lang) {
    const texts = {
        ar: {
            'logo-text': 'تايم لوكس',
            'featured-label': 'ساعة مميزة',
            'hero-title': 'ساعة كاسيو A159W',
            'hero-description': 'أضف لمسة من الأناقة الكلاسيكية مع ساعة Casio A159 المتوفرة باللون الفضي و الذهبي.ساعة عملية بتصميم رجالي/نسائي، تجمع بين الشكل الكلاسيكي والأداء الممتاز',
            'price-label': 'السعر',
            'cta-btn': 'اطلب الآن',
            'cta-btn-discover':'اكتشف الان',
            'collection-title': 'مجموعتنا الفاخرة',
            'collection-subtitle': 'قطع زمنية حصرية',
            'footer-text': '© 2025 تايم لوكس. جميع الحقوق محفوظة.',
            'modal-title': 'نموذج الطلب',
            'label-first-name': 'الاسم',
            'label-last-name': 'اللقب',
            'label-wilaya': 'الولاية',
            'label-phone': 'رقم الهاتف',
            'submit-btn': 'تأكيد الطلب',
            'success-text': 'تم استقبال طلبك بنجاح!'
        },
        fr: {
            'logo-text': 'Time Luxe',
            'featured-label': 'Montre Vedette',
            'hero-title': 'Casio A159',
            'hero-description': 'Ajoutez une touche d\'élégance classique avec la montre Casio A159 disponible en argent et or. Une montre pratique au design mixte, alliant style classique et performance exceptionnelle.',
            'price-label': 'Prix',
            'cta-btn': 'Commander',
            'cta-btn-discover':'Découvrir',
            'collection-title': 'Notre Collection',
            'collection-subtitle': 'Pièces Exclusives',
            'footer-text': '© 2025 Time Luxe. Tous droits réservés.',
            'modal-title': 'Formulaire',
            'label-first-name': 'Prénom',
            'label-last-name': 'Nom',
            'label-wilaya': 'Wilaya',
            'label-phone': 'Téléphone',
            'submit-btn': 'Confirmer',
            'success-text': 'Commande reçue!'
        }
    };

    // تحديث النصوص الثابتة
    for (let id in texts[lang]) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = texts[lang][id];
        }
    }

    // تحديث السمات data
    document.querySelectorAll('[data-ar]').forEach(elem => {
        if (lang === 'ar') {
            elem.textContent = elem.getAttribute('data-ar');
        } else if (lang === 'fr') {
            elem.textContent = elem.getAttribute('data-fr');
        }
    });

    // تحديث اتجاه النموذج
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    }
}

// ==================== Product Details ====================
document.querySelectorAll(".detail-btn").forEach((button) => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent.replace(' DZD', '').trim();
        const productImg = productCard.querySelector('.product-image img').src;
        const productDesc = productCard.querySelector('.product-description').textContent;

        // احفظ البيانات في localStorage
        const productData = {
            name: productName,
            price: productPrice,
            img: productImg,
            desc: productDesc
        };

        localStorage.setItem("productDetails", JSON.stringify(productData));
        
        // اذهب لصفحة التفاصيل
        window.location.href = "details.html";
    });
});

// ==================== Form Submit ====================
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const wilaya = document.getElementById('wilaya').value;

    // التحقق من ملء جميع الحقول
    if (!firstName || !lastName || !phone || !wilaya) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }

    // إرسال البيانات عبر EmailJS
    emailjs.send("service_w63c2wc", "template_wxy850h", {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        wilaya: wilaya,
        product_name: currentProduct.name,
        product_price: currentProduct.price
    })
    .then(function(response) {
        console.log("تم الإرسال بنجاح!", response.status, response.text);
        
        // إخفاء النموذج وعرض رسالة النجاح
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // إغلاق النموذج بعد ثانيتين
        setTimeout(() => {
            closeModal();
            form.style.display = 'block';
        }, 2000);

    }, function(error) {
        console.log("فشل الإرسال", error);
        alert('حدث خطأ في إرسال الطلب. حاول من جديد.');
    });
});
