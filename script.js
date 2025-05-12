// Scripts previos...
        // Rotating Quotes
        const quotes = [
            "La buena comida es el fundamento de la verdadera felicidad.",
            "Cocinar es un arte que alimenta el alma.",
            "Cada plato cuenta una historia de sabor.",
            "La mesa es donde se unen los corazones."
        ];
        let quoteIndex = 0;
        const quoteText = document.getElementById('quoteText');
        function rotateQuote() {
            quoteText.style.animation = 'none';
            setTimeout(() => {
                quoteText.textContent = quotes[quoteIndex];
                quoteText.style.animation = 'fadeInQuote 1s forwards';
                quoteIndex = (quoteIndex + 1) % quotes.length;
            }, 50);
        }
        setInterval(rotateQuote, 5000);
        rotateQuote();
        // Particles Effect
        const canvas = document.getElementById('particlesCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('footer').offsetHeight;
        let particlesArray = [];
        const numberOfParticles = 50;
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.life = 100;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life--;
            }
            draw() {
                ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function initParticles(e) {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const x = e ? e.clientX : Math.random() * canvas.width;
                const y = e ? e.clientY - canvas.offsetTop + window.scrollY : Math.random() * canvas.height;
                particlesArray.push(new Particle(x, y));
            }
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = particlesArray.length - 1; i >= 0; i--) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].life <= 0) {
                    particlesArray.splice(i, 1);
                }
            }
            requestAnimationFrame(animateParticles);
        }

        canvas.addEventListener('mousemove', (e) => {
            initParticles(e);
        });
        // Initial particle animation
        initParticles();
        animateParticles();
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = document.querySelector('footer').offsetHeight;
        });
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
                    // Scripts existentes...
        // Floating button scroll to reservations
        const floatingBtn = document.querySelector('.floating-btn');
        floatingBtn.addEventListener('click', () => {
            document.getElementById('reservations').scrollIntoView({ behavior: 'smooth' });
        });
        // Reservation form logic
        const reservationForm = document.getElementById('reservationForm');
        const reservationType = document.getElementById('reservationType');
        const vipFields = document.querySelectorAll('.vip-fields');
        const tableFields = document.querySelectorAll('.table-fields');
        reservationType.addEventListener('change', (e) => {
            const value = e.target.value;
            
            // Hide all fields initially
            vipFields.forEach(field => {
                field.style.display = 'none';
                field.querySelector('input').disabled = true;
            });
            tableFields.forEach(field => {
                field.style.display = 'none';
                field.querySelector('input, select').disabled = true;
            });
            // Show relevant fields based on selection
            if (value === 'vip') {
                vipFields.forEach(field => {
                    field.style.display = 'block';
                    field.querySelector('input').disabled = false;
                });
            } else if (value === 'mesa') {
                tableFields.forEach(field => {
                    field.style.display = 'block';
                    field.querySelector('input, select').disabled = false;
                });
            }
        });
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);
            // Basic validation
            if (!data.reservationType) {
                alert('Por favor, selecciona un tipo de reserva');
                return;
            }
            if (data.reservationType === 'vip') {
                if (!data.vipGuests || !data.vipTime) {
                    alert('Por favor, completa todos los campos para la reserva VIP');
                    return;
                }
            } else if (data.reservationType === 'mesa') {
                if (!data.tableCount || !data.tableGuests || !data.tableTime) {
                    alert('Por favor, completa todos los campos para la reserva de mesa');
                    return;
                }
            }
            // Aquí podrías enviar los datos a un servidor
            console.log('Reserva enviada:', data);
            alert('¡Reserva realizada con éxito!');
            reservationForm.reset();
            // Reset form visibility
            vipFields.forEach(field => field.style.display = 'none');
            tableFields.forEach(field => field.style.display = 'none');
        });
          // Sample initial images (in a real app, these would come from the server)
          const allImages = [
            {
                id: '1',
                url: 'https://ik.imagekit.io/ajkl5a98u/e9638cd22de73d95ae6bb6ffabdfdb21.jpg?updatedAt=1747087383447',
            },
            {
                id: '2',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/32ee5dcf1a70570f957d06f8297cb8cf/detailed',
            },
            {
                id: '3',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/cabfc1baad3e84ab495dff87966d349e/detailed',
            },
            {
                id: '4',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/af46f892baa57292b9a774d9ef4b7092/detailed',
            },
            {
                id: '5',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/42536e265eaef8983a3646d3d8b49fe1/detailed',
            },
            {
                id: '6',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/352de1f5db87e242766d68951ee778ec/detailed',
            },
            {
                id: '7',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/fe668bdb52e31ee5da9d1761f73f10e0/detailed',
            },
            {
                id: '8',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/896b0c026310362d9a26f997d0f01e6e/detailed',
            },
            // Imágenes adicionales para demostrar la funcionalidad "Mostrar más"
            {
                id: '9',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/70ea534821860c5738de38f1f252a1e4/detailed',
            },
            {
                id: '10',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/91bb863d236b0eadd87c59018bf048ae/detailed',
            },
            {
                id: '11',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/7031cde960de8ddfeda021590ff7c512/detailed',
            },
            {
                id: '12',
                url: 'https://res-console.cloudinary.com/dvj0oozud/media_explorer_thumbnails/7031cde960de8ddfeda021590ff7c512/detailed',
            },
        ];
        const galleryGrid = document.getElementById('galleryGrid');
        const showMoreBtn = document.getElementById('showMoreBtn');
        // Número inicial de imágenes a mostrar
        const initialDisplayCount = 8;
        // Estado para rastrear si se están mostrando todas las imágenes
        let showingAll = false;
        // Función para renderizar el número específico de imágenes
        function renderGallery(images, count) {
            galleryGrid.innerHTML = '';
            // Determinar cuántas imágenes mostrar
            const displayImages = count ? images.slice(0, count) : images;
            displayImages.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.innerHTML = `
                    <img src="${image.url}" alt="Imagen de galería">
                    <div class="gallery-item-overlay">
                    </div>
                `;
                galleryGrid.appendChild(galleryItem);
            });
        }
        // Inicialmente mostrar solo algunas imágenes
        renderGallery(allImages, initialDisplayCount);

        // Manejar el botón "Mostrar más/menos"
        showMoreBtn.addEventListener('click', () => {
            if (showingAll) {
                // Si ya se muestran todas, mostrar solo las iniciales
                renderGallery(allImages, initialDisplayCount);
                showMoreBtn.textContent = '-------------Mostrar más---------------';
            } else {
                // Si no se muestran todas, mostrar todas
                renderGallery(allImages);
                showMoreBtn.textContent = '-------------Mostrar menos---------------';
            }
            // Cambiar el estado
            showingAll = !showingAll;
        });
        // Función para manejar la carga de nuevas imágenes (para uso futuro)
        async function uploadImage(file) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                // Reemplazar con la URL de tu servidor
                const response = await fetch('https://newvix-production.up.railway.app/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (response.ok) {
                    // Agregar la nueva imagen a la galería
                    allImages.push({ id: data.id, url: data.url });
                    
                    // Actualizar la visualización según el estado actual
                    if (showingAll) {
                        renderGallery(allImages);
                    } else {
                        renderGallery(allImages, initialDisplayCount);
                    }
                    alert('Imagen subida con éxito.');
                    return true;
                } else {
                    alert('Error al subir la imagen: ' + data.message);
                    return false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al subir la imagen. Intenta de nuevo.');
                return false;
            }
        }
        // Función para eliminar imágenes (para uso futuro)
        async function deleteImage(id) {
            try {
                // Reemplazar con la URL de tu servidor
                const response = await fetch(`https://newvix-production.up.railway.app/upload`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Eliminar la imagen de la matriz
                    const index = allImages.findIndex(img => img.id === id);
                    if (index !== -1) {
                        allImages.splice(index, 1);
                        
                        // Actualizar la visualización según el estado actual
                        if (showingAll) {
                            renderGallery(allImages);
                        } else {
                            renderGallery(allImages, initialDisplayCount);
                        }
                        
                        alert('Imagen eliminada con éxito.');
                        return true;
                    }
                } else {
                    const data = await response.json();
                    alert('Error al eliminar la imagen: ' + data.message);
                    return false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar la imagen. Intenta de nuevo.');
                return false;
            }
        }
          // HEADER SCROLL EFFECT
          window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
        // BOTÓN CON SONIDO
        const buttons = document.querySelectorAll('.btn');
        const audio = new Audio('https://www.soundjay.com/buttons/glass-clink-1.mp3');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                audio.currentTime = 0;
                audio.play();
            });
        });
        // ANIMACIÓN AL HACER SCROLL
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.add('fade-up');
            observer.observe(item);
        });
        // ESTILOS PARA ANIMACIÓN
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`
            .fade-up {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 1s, transform 1s;
            }
        `, styleSheet.cssRules.length);
        styleSheet.insertRule(`
            .fade-up.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `, styleSheet.cssRules.length);
         // Scroll Effect for Header
         window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
