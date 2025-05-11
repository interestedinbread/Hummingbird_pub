document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation functionality
    const menuBtns = document.querySelectorAll('.menu-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menuGrids = document.querySelectorAll('.menu-grid');

    // Function to handle menu section switching
    function switchMenuSection(sectionId) {
        menuSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        menuGrids.forEach(grid => {
            grid.classList.remove('active');
            if (grid.id === `${sectionId}-grid`) {
                grid.classList.add('active');
            }
        });

        // Update active states for both desktop and mobile buttons
        menuBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
            }
        });

        mobileMenuBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId) {
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
            const sectionId = btn.getAttribute('data-section');
            switchMenuSection(sectionId);
            mobileMenu.classList.remove('active');
            mobileMenuIcon.classList.remove('rotated');
        });
    });

    // Mobile menu icon click handler
    mobileMenuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuIcon.classList.toggle('rotated');
    });

    // Initialize with the first section active
    if (menuSections.length > 0) {
        switchMenuSection(menuSections[0].id);
    }
}); 