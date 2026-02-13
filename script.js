// Mobile Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('active');
        }

        //  toggleTheme = function() {
        //     document.body.classList.toggle('light-mode');
        // }

        let light = localStorage.getItem('light-mode')
        const themeToggle = document.getElementById("themeToggle");

        const enablelight = () => {
        document.body.classList.add('light-mode')
        localStorage.setItem('light-mode', 'active')
        };

        const disablelight = () => {
        document.body.classList.remove('light-mode');
        localStorage.setItem('light-mode', null);
        };

        if(light === 'active') enablelight();

        themeToggle.addEventListener ("click", () => {
        light = localStorage.getItem('light-mode');
        light !== 'active' ? enablelight() : disablelight();
        });


        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Project Filtering
        function filterProjects(category) {
            const cards = document.querySelectorAll('.project-card');
            const buttons = document.querySelectorAll('.filter-btn');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Form Submission
        function handleSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;

            alert(`Thank you, ${name}! Your message about "${subject}" has been received. I'll get back to you at ${email} soon!`);
            
            // Reset form
            event.target.reset();
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('mobileMenu');
            const toggle = document.querySelector('.menu-toggle');
            
            if (!menu.contains(event.target) && !toggle.contains(event.target)) {
                menu.classList.remove('active');
            }
        });

        // Add scroll effect to navbar
        let lastScroll = 0;
        const nav = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });

        // Add transition to nav
        nav.style.transition = 'transform 0.3s ease';

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.project-card, .stat-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });