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

    // Menu navigation functionality
    const menuBtns = document.querySelectorAll('.menu-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const gridWrapper = document.querySelector('.grid-wrapper');

    const menuImgs = {
        "starters": ["img/New_hummingbird_food_pics/breakfast_hash.jpg", 'img/New_hummingbird_food_pics/burger_1.jpg', 'img/New_hummingbird_food_pics/burger_2.jpg'],
        "soups-and-salads": ['img/New_hummingbird_food_pics/wrap.jpg', 'img/New_hummingbird_food_pics/eggs_benedict.jpg', 'img/New_hummingbird_food_pics/chicken_tenders.jpg'],
        "pub-grub": ['img/New_hummingbird_food_pics/shrimp salad.jpg', 'img/New_hummingbird_food_pics/burger_3.jpg', 'img/New_hummingbird_food_pics/eggs_benedict.jpg'],
        "pan-pizza": ['img/New_hummingbird_food_pics/chicken_tenders.jpg', 'img/New_hummingbird_food_pics/Nachos.jpg', 'img/New_hummingbird_food_pics/breakfast_hash.jpg'],
        "specialty-burgers": ['img/New_hummingbird_food_pics/wrap.jpg', 'img/New_hummingbird_food_pics/eggs_benedict.jpg', 'img/New_hummingbird_food_pics/chicken_tenders.jpg'],
        "hand-helds": ['img/New_hummingbird_food_pics/wrap.jpg', 'img/New_hummingbird_food_pics/eggs_benedict.jpg', 'img/New_hummingbird_food_pics/chicken_tenders.jpg'],
    }

    // Function to create image grid for a section
    function createImageGrid(sectionId) {
        const grid = document.createElement('div');
        grid.className = 'menu-grid';
        grid.id = `${sectionId}-grid`;

        // Create three grid items
        for (let i = 0; i < 3; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            
            // Alternate layouts based on section
            switch(sectionId) {
                case 'starters':
                case 'pub-grub':
                case 'specialty-burgers':
                    // Layout 1: Large first image, two smaller images below
                    if (i === 0) {
                        gridItem.classList.add('large');
                    }
                    break;
                case 'soups-and-salads':
                case 'pan-pizza':
                case 'hand-helds':
                    // Layout 2: Two smaller images on top, large image below
                    if (i === 2) {
                        gridItem.classList.add('large');
                    }
                    break;
            }

            const img = document.createElement('img');
            img.src = menuImgs[sectionId][i];
            img.alt = `Menu item ${i + 1}`;

            gridItem.appendChild(img);
            grid.appendChild(gridItem);
        }

        return grid;
    }

    // Function to handle menu section switching
    function switchMenuSection(sectionId) {
        // Update menu sections
        menuSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        // Update menu grids
        const existingGrid = document.querySelector('.menu-grid.active');
        if (existingGrid) {
            existingGrid.classList.remove('active');
        }

        let newGrid = document.getElementById(`${sectionId}-grid`);
        if (!newGrid) {
            newGrid = createImageGrid(sectionId);
            gridWrapper.appendChild(newGrid);
        }
        newGrid.classList.add('active');

        // Update active states for both desktop and mobile buttons
        menuBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
            }
        });

        mobileMenuBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === sectionId) {
                btn.classList.add('active');
            }
        });
    }

    // Desktop menu button click handlers
    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            switchMenuSection(sectionId);
        });
    });

    // Mobile menu button click handlers
    mobileMenuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-target');
            switchMenuSection(sectionId);
            mobileMenu.classList.remove('active');
            mobileMenuIcon.classList.remove('rotated');
        });
    });

    // Initialize with the first section active
    if (menuSections.length > 0) {
        switchMenuSection(menuSections[0].id);
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