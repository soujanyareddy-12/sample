document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu View Toggle Logic ---
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-item");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("open");
            
            // Animation for Hamburger conversion to 'X'
            const bars = menuToggle.querySelectorAll(".bar");
            if(menuToggle.classList.contains("open")) {
                bars[0].style.transform = "rotate(-45deg) translate(-5px, 5px)";
                bars[1].style.opacity = "0";
                bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });

        // Close Mobile Menu overlay if user selects a location node
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                const bars = menuToggle.querySelectorAll(".bar");
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            });
        });
    }

    // --- 2. Scroll Intersection Highlight Engine ---
    const sections = document.querySelectorAll("section");
    
    const scrollObserverOptions = {
        root: null,
        threshold: 0.3, // Detect element visibility when 30% entered
        rootMargin: "-70px 0px 0px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute("id");
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${activeId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, scrollObserverOptions);

    sections.forEach(section => scrollObserver.observe(section));

    // --- 3. Dynamic Review Peer Logs Carousel ---
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-indicators .dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentSlideIndex = 0;

    function renderSlideState(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            renderSlideState(currentSlideIndex);
        });

        prevBtn.addEventListener("click", () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            renderSlideState(currentSlideIndex);
        });

        dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                currentSlideIndex = parseInt(e.target.getAttribute("data-index"));
                renderSlideState(currentSlideIndex);
            });
        });

        // Optional automated log cycle (every 8 seconds)
        setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            renderSlideState(currentSlideIndex);
        }, 8000);
    }
});