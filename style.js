        // Modal Functions
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
        }

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const wilaya = document.getElementById('wilaya').value;
            const phone = document.getElementById('phone').value;

            console.log('Order submitted:', {
                firstName,
                lastName,
                wilaya,
                phone
            });

            document.getElementById('successMessage').style.display = 'block';
            form.style.display = 'none';

            setTimeout(() => {
                closeModal();
                form.style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
            }, 2000);
        });

        function switchLanguage(lang) {
            // Update active button
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // Hide all nav and show selected
            document.querySelectorAll('.nav-content').forEach(nav => nav.classList.add('hidden'));
            document.getElementById(`nav-${lang}`).classList.remove('hidden');

            // Update page direction and language
            document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;

            // Update all dynamic content
            updateContent(lang);
        }

        function updateContent(lang) {
            const texts = {
                ar: {
                    'logo-text': 'تايم لوكس',
                    'featured-label': 'ساعة مميزة',
                    'hero-title': 'برستيج رويال الذهبية',
                    'hero-description': 'ساعة فاخرة من الذهب عيار 18 قيراط مع حركة سويسرية أوتوماتيكية',
                    'price-label': 'السعر',
                    'cta-btn': 'اطلب الآن',
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
                    'hero-title': 'Prestige Royal Or',
                    'hero-description': 'Montre de luxe en or 18 carats avec mouvement suisse automatique',
                    'price-label': 'Prix',
                    'cta-btn': 'Commander Maintenant',
                    'collection-title': 'Notre Collection Prestigieuse',
                    'collection-subtitle': 'Pièces Horaires Exclusives',
                    'footer-text': '© 2025 Time Luxe. Tous droits réservés.',
                    'modal-title': 'Formulaire de Commande',
                    'label-first-name': 'Prénom',
                    'label-last-name': 'Nom',
                    'label-wilaya': 'Wilaya',
                    'label-phone': 'Téléphone',
                    'submit-btn': 'Confirmer la Commande',
                    'success-text': 'Votre commande a été reçue avec succès!'
                },
                en: {
                    'logo-text': 'Time Luxe',
                    'featured-label': 'Featured Watch',
                    'hero-title': 'Prestige Royal Gold',
                    'hero-description': 'Luxury watch in 18 karat gold with Swiss automatic movement',
                    'price-label': 'Price',
                    'cta-btn': 'Order Now',
                    'collection-title': 'Our Prestigious Collection',
                    'collection-subtitle': 'Exclusive Timepieces',
                    'footer-text': '© 2025 Time Luxe. All rights reserved.',
                    'modal-title': 'Order Form',
                    'label-first-name': 'First Name',
                    'label-last-name': 'Last Name',
                    'label-wilaya': 'Wilaya',
                    'label-phone': 'Phone',
                    'submit-btn': 'Confirm Order',
                    'success-text': 'Your order has been received successfully!'
                }
            };

            // Update static texts
            for (let id in texts[lang]) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = texts[lang][id];
                }
            }

            // Update all data attributes
            document.querySelectorAll('[data-ar]').forEach(elem => {
                if (lang === 'ar') {
                    elem.textContent = elem.getAttribute('data-ar');
                } else if (lang === 'fr') {
                    elem.textContent = elem.getAttribute('data-fr');
                } else {
                    elem.textContent = elem.getAttribute('data-en');
                }
            });

            // Update modal direction
            const modalContent = document.querySelector('.modal-content');
            if (lang === 'ar') {
                modalContent.dir = 'rtl';
            } else {
                modalContent.dir = 'ltr';
            }
        }