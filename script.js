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
                url: 'https://scontent.fsti4-2.fna.fbcdn.net/v/t1.15752-9/487927526_1232860858438053_8141390768176812605_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=idOrQw-9cukQ7kNvgGYdNUL&_nc_oc=AdmvP_96r38kL-sA7zN9vo3ksZE5g_O0JfKa7j4qALfCKje_0o9YxRmmBqS8X094eN0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-2.fna&oh=03_Q7cD1wF7mH-bQEsjQ2B6UiA1Ud4ymEtlivSEr3tTXRxvoMUg2Q&oe=68128C68',
            },
            {
                id: '2',
                url: 'https://scontent.fsti4-2.fna.fbcdn.net/v/t1.15752-9/486077711_1749224788991546_4637335780605827922_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_ohc=wRyWU2ck3FoQ7kNvgHrtxAC&_nc_oc=AdlDsfRG9GrIpZS-VgYhOCs9kG8KOlARyXphr2oCKGm30-BCmEUDRM_xB6NYUfkkacw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-2.fna&oh=03_Q7cD1wFZe_BG_6eGb23PMllX_6xrpi08MUs0U_-TnlZLrRnGkQ&oe=68128E11',
            },
            {
                id: '3',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/487315454_652914520688346_2227927152907344746_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_ohc=3uIZ-PBMKhgQ7kNvgGw5Suz&_nc_oc=Adnoe2cGdHKsfmId02GgsfEcvUrdhnSqcz3RpRtD9L_cYl397VdWmL5e8ff4IFQzMW0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wGtUY9LkHVLr4qGcolHjBRA7GUQIfXhgvbmiAL7KOJ9dA&oe=6812BD8C',
            },
            {
                id: '4',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/485851288_1358659775449918_8880893658861414679_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=mohZIXQjRkoQ7kNvgFioiil&_nc_oc=AdkIvylB-5TGlRrrLrn7asKTY8220J-xNHS-jkVx6dRdZ2qhWdike5-z6dtqUfs4MwA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wEj3lJTrxXSBCTlie1rlQt4nrRp5x6QAf466wFL9RZxeg&oe=681271C4',
            },
            {
                id: '5',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/486629088_675328861669850_5684012561883170950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Xj1eXutG1scQ7kNvgErg92G&_nc_oc=AdkHDlDTIvqtYY_tHH5ja_bq565otbzpMU1jlmOTHpGGakL9MiHrTq67i02xKulxYCw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wHeQEF_VbJRdhX0OB9bfz8UfVTTvnd2c7BPrwio87yyhw&oe=68129096',
            },
            {
                id: '6',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/487238227_3976218842648795_4919784416065885810_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=vZ86IKefldkQ7kNvgFvIa9m&_nc_oc=AdmkvcUQQK99nZqvu5RtHKLYzr8YjODvA7ll8QGv6ROzsfo-Kc7l3e382m8ggzMnA9k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wE2ydyU_7ISPhj0EhbDiRpNiKSU072dxunKcZnnVrZZAQ&oe=68126813',
            },
            {
                id: '7',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/486671451_1011579276974212_28491419855389840_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_ohc=VNxBP610dGMQ7kNvgGzMvVa&_nc_oc=Adkwjuk-3fsFO9M2Y0-4Wv5yhlS_22xdu9e7nz62uvS-Udljso6HOxmmwieDfgx53dM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wE2RcqAtbZTj1OTlCMeyE67KdUHnqzVgGMNoKzTXtSEVg&oe=68128C81',
            },
            {
                id: '8',
                url: 'https://scontent.fsti4-2.fna.fbcdn.net/v/t1.15752-9/486400032_1020639233272741_6004581235218350141_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=zHngs_zIKqMQ7kNvgFw583K&_nc_oc=AdkT2Cju4KSXxJJ-p79GZgjxjfY7erWM7sOr1mcjmNLyFICIkNGcVPTtHRCaGgl8Ej4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-2.fna&oh=03_Q7cD1wFL39psUAoMsCh5twq2CcVcMuXHt3szuzaoPgOv6t9jhg&oe=6812921D',
            },
            // Imágenes adicionales para demostrar la funcionalidad "Mostrar más"
            {
                id: '9',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/482129829_635844389302382_8622363058993890593_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_ohc=NemmuAA0iDMQ7kNvgEnPKMu&_nc_oc=AdkJRPs_I5RjUcHcigXhxOXetDeVctcZPIWeQhl08irn2SqhtaIfO6StCOwNKbivOw8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wF9ELazAOYjWgekOHx67weoUTGVZydxZBdW87lu82uxLg&oe=6812B5F6',
            },
            {
                id: '10',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/486687119_1179210113833063_5610340728650530170_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_ohc=AyPqyLZrrMcQ7kNvgHoqB-l&_nc_oc=AdmQVVt4kNCn2Ho54Enzs91lHflg6xW5wPCBfSFINLtQj9Z1Wt1sgPOJepQ8u7uRwus&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wG2b3UAPSNIewxs3fXeN5qHpa9qjbZU4yK6p8UlylEGCg&oe=6812A98B',
            },
            {
                id: '11',
                url: 'https://scontent.fsti4-2.fna.fbcdn.net/v/t1.15752-9/486767365_679900791128851_8125130459888196308_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Ja3JcUlSkhgQ7kNvgEzOViE&_nc_oc=AdmeVCULye06406PJYmdb4lxlY85aSORb1WA3wfJ_y1n0Y_ArskBf46jx3DiDvx-l4I&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-2.fna&oh=03_Q7cD1wEIBD5dbbTppb97PwTjDQQnmlo_nRlz3QlH5traMtzKNA&oe=6812899E',
            },
            {
                id: '12',
                url: 'https://scontent.fsti4-1.fna.fbcdn.net/v/t1.15752-9/482529392_961287839533048_1985366117252387580_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_ohc=qz0oT7o0e7sQ7kNvgFkfXzH&_nc_oc=AdkMxTSDspGsTfyY5lJYRFgNCAAX6w6r58SNULeh4kCZowHwnmLQp93scOxVwQCJnvI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsti4-1.fna&oh=03_Q7cD1wHAaWHJ1GWUajMOQL55eePeHHa_660HF84yGPNV1PoJSg&oe=68129698',
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
