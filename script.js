document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuContainer = document.querySelector('.menu-sections');
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    const mobileMenuSections = document.querySelectorAll('.menu-section');

    if (mobileMenuIcon && mobileMenu) {
        mobileMenuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu icon clicked'); // Debug log
            mobileMenu.classList.toggle('active');
            mobileMenuIcon.classList.toggle('rotated');
        });
    }

    // Handle mobile menu button clicks
    mobileMenuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            mobileMenuBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide all menu sections
            mobileMenuSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the corresponding menu section
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Close the mobile menu
            mobileMenu.classList.remove('active');
            mobileMenuIcon.classList.remove('rotated');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 70) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Logo click handler
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', function() {
        // Check if we're on the menu page
        if (window.location.pathname.includes('menu.html')) {
            window.location.href = 'index.html';
        } else {
            // On homepage, scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // CTA button click to navigate to menu
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = 'menu.html';
        });
    }

    // Handle all navigation links
    const navLinks = document.querySelectorAll('a[href]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal links
            if (this.href.startsWith(window.location.origin)) {
                e.preventDefault();
                
                // Special handling for about link
                if (this.getAttribute('href').includes('#about')) {
                    if (window.location.pathname.includes('index.html')) {
                        // If already on index page, smooth scroll to about section
                        const aboutSection = document.querySelector('#about');
                        if (aboutSection) {
                            aboutSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        // If on another page, navigate to index.html#about
                        window.location.href = 'index.html#about';
                    }
                } else {
                    // Handle other internal links normally
                    window.location.href = this.href;
                }
            }
        });
    });

    // Menu section switching
    const menuButtons = document.querySelectorAll('.menu-btn');
    const desktopMenuSections = document.querySelectorAll('.menu-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all sections and buttons
            desktopMenuSections.forEach(section => section.classList.remove('active'));
            menuButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show the corresponding menu section
            const sectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Grid transition effect
    const grids = document.querySelectorAll('.menu-grid');
    let currentGrid = 0;

    // Only run grid switching on menu page
    if (grids.length > 0) {
        function switchGrid() {
            grids[currentGrid].classList.remove('active');
            currentGrid = (currentGrid + 1) % grids.length;
            grids[currentGrid].classList.add('active');
        }

        // Switch grids every 5 seconds
        setInterval(switchGrid, 5000);
    }

    // Initialize Swiper only if it exists
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}); 