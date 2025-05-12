const dishDetails = {
                    "Nachos BBQ": { calories: "450 kcal", time: "15 min", rating: "4.6" },
                    "Dip de Espinaca": { calories: "320 kcal", time: "10 min", rating: "4.8" },
                    "Chicken Egg Rolls": { calories: "380 kcal", time: "20 min", rating: "4.7" },
                    "Ensalada Caprese": { calories: "250 kcal", time: "10 min", rating: "4.5" },
                    "Lubina al Horno": { calories: "450 kcal", time: "35 min", rating: "4.6" },
                    "Risotto de Langosta": { calories: "620 kcal", time: "45 min", rating: "4.9" },
                    "Ravioli de Trufa": { calories: "480 kcal", time: "30 min", rating: "4.7" },
                    "Costillas BBQ": { calories: "780 kcal", time: "40 min", rating: "4.8" },
                    "Filete de Wagyu": { calories: "720 kcal", time: "25 min", rating: "4.9" },
                    "Rack de Cordero": { calories: "650 kcal", time: "40 min", rating: "4.8" },
                    "Cochinillo Confitado": { calories: "780 kcal", time: "60 min", rating: "4.7" },
                    "Chuletón Angus": { calories: "850 kcal", time: "30 min", rating: "4.9" },
                    "Coulant de Chocolate": { calories: "420 kcal", time: "20 min", rating: "4.8" },
                    "Tarta de Limón": { calories: "340 kcal", time: "25 min", rating: "4.6" },
                    "Crème Brûlée": { calories: "380 kcal", time: "30 min", rating: "4.7" },
                    "Cheesecake New York": { calories: "450 kcal", time: "25 min", rating: "4.8" }
                };
        
                const searchInput = document.getElementById('searchInput');
                const filterButtons = document.querySelectorAll('.filter-btn');
                const menuItems = document.querySelectorAll('.menu-item');
                const modal = document.getElementById('menuModal');
                const closeModal = document.querySelector('.close-modal');
        
                // Filter and Search
                function filterMenu(searchTerm, filter) {
                    document.querySelectorAll('.menu-section').forEach(section => {
                        const category = section.dataset.category;
                        const items = section.querySelectorAll('.menu-item');
                        let sectionVisible = false;
        
                        items.forEach(item => {
                            const title = item.querySelector('h3').textContent.toLowerCase();
                            const tags = item.dataset.tags.toLowerCase();
                            const matchesSearch = title.includes(searchTerm) || tags.includes(searchTerm);
                            const matchesFilter = filter === 'all' || filter === category;
        
                            if (matchesSearch && matchesFilter) {
                                item.style.display = 'block';
                                sectionVisible = true;
                            } else {
                                item.style.display = 'none';
                            }
                        });
        
                        section.style.display = sectionVisible ? 'block' : 'none';
                    });
                }
        
                searchInput.addEventListener('input', () => {
                    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
                    filterMenu(searchInput.value.toLowerCase(), activeFilter);
                });
        
                filterButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        filterButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        filterMenu(searchInput.value.toLowerCase(), btn.dataset.filter);
                    });
                });
        
                // Modal Functionality
                menuItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const title = item.querySelector('h3').textContent;
                        const details = dishDetails[title] || {};
        
                        document.getElementById('modalImg').src = item.querySelector('img').src;
                        document.getElementById('modalTitle').textContent = title;
                        document.getElementById('modalPrice').textContent = item.querySelector('.menu-item-price').textContent;
                        document.getElementById('modalDesc').textContent = item.querySelector('p').textContent;
                        document.getElementById('modalCalories').textContent = details.calories || 'N/A';
                        document.getElementById('modalTime').textContent = details.time || 'N/A';
                        document.getElementById('modalRating').textContent = details.rating || 'N/A';
        
                        modal.classList.add('active');
                    });
                });
        
                closeModal.addEventListener('click', () => modal.classList.remove('active'));
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.classList.remove('active');
                });
                // Para manejar la clase scrolled en el header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Para el menú móvil
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace (opcional)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
    });
});
