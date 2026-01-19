window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

gsap.registerPlugin(ScrollTrigger);

const points = document.querySelectorAll(".point");
const car = document.querySelector(".car-icon");

gsap.to(car, {
    scrollTrigger: {
        trigger: ".highway-wrapper",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: self => {
            const progress = self.progress;
            const totalHeight = document.querySelector(".highway-wrapper").offsetHeight;
            car.style.top = `${progress * (totalHeight - 30)}px`;
        }
    }
});

points.forEach((pt, i) => {
    ScrollTrigger.create({
        trigger: pt,
        start: "top 75%",
        onEnter: () => pt.classList.add("active")
    });
});




// contact form js
// ADD THIS WHOLE WRAPPER so the form exists before we query it
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();       // you already had this ✅
    e.stopPropagation();      // ADD THIS to stop other handlers (like Web3Forms script) from running

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alertBox.innerHTML = `
        <div class="alert alert-success">
          Thank you! We received your message and will contact you soon.
        </div>
      `;
      form.reset();
    } else {
      alertBox.innerHTML = `
        <div class="alert alert-danger">
          Something went wrong. Please try again.
        </div>
      `;
    }

    return false; // ADD THIS as an extra guard against default submission
  });

});
// end of contact js

document.addEventListener('DOMContentLoaded', () => {
    const concierge = document.getElementById('concierge-widget');

    // --- Function to toggle Fullscreen Menu ---
    window.toggleMenu = function () {
        const menu = document.getElementById('fullscreenMenu');
        menu.classList.toggle('menu-open');
        if (menu.classList.contains("menu-open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    // --- Function to toggle Concierge Chatbot ---
    window.toggleConcierge = function () {
        concierge.classList.toggle('concierge-minimized');

        // Toggle the correct icon display based on state
        const headerTitle = concierge.querySelector('.header-title');
        const chatIcon = concierge.querySelector('.concierge-header i');

        if (concierge.classList.contains('concierge-minimized')) {
            // Minimized state: Hide title and show only large chat icon
            if (headerTitle) headerTitle.style.display = 'none';
            if (chatIcon) chatIcon.style.display = 'block';
        } else {
            // Open state: Show title and minus icon
            concierge.querySelector('#concierge-toggle-icon').innerHTML = '<i class="fas fa-minus"></i>';
            if (headerTitle) headerTitle.style.display = 'inline';
            if (chatIcon) chatIcon.style.display = 'inline-block';
        }
    }

    // --- Function to show Concierge (called by CTA button) ---
    window.showConcierge = function () {
        concierge.classList.remove('concierge-minimized');
        concierge.querySelector('#concierge-toggle-icon').innerHTML = '<i class="fas fa-minus"></i>';
        const headerTitle = concierge.querySelector('.header-title');
        const chatIcon = concierge.querySelector('.concierge-header i');
        if (headerTitle) headerTitle.style.display = 'inline';
        if (chatIcon) chatIcon.style.display = 'inline-block';
    }

    // --- Animated Stat Counter Logic ---
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.animated-stat');
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 100;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(interval);
                            stat.textContent = target.toLocaleString() + (target === 100 ? '+' : '+'); // Adds '+' to 100
                        } else {
                            stat.textContent = Math.ceil(current).toLocaleString();
                        }
                    }, 20); // Speed of animation
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const statObserver = new IntersectionObserver(animateStats, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    const statCard = document.getElementById('heroStatCard');
    if (statCard) {
        statObserver.observe(statCard);
    }

    // --- Form Submission Handling (Placeholder) ---
    const enquireForm = document.getElementById('contactForm');
    enquireForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = document.getElementById('enquiry-feedback');
        feedback.classList.remove('d-none', 'text-danger', 'text-success');

        const name = document.getElementById('enquiryName').value;
        const phone = document.getElementById('enquiryPhone').value;

        // Simple validation/feedback
        if (name && phone) {
            feedback.textContent = `Thank you, ${name}! Your request has been sent. An expert will call you shortly on ${phone}.`;
            feedback.classList.add('text-success');
            enquireForm.reset();
        } else {
            feedback.textContent = 'Please fill out your Name and Phone Number.';
            feedback.classList.add('text-danger');
        }
    });
    // The CSS takes care of the minimized visual state.
    concierge.classList.add('concierge-minimized');

    // Delayed appearance logic
    setTimeout(() => {
        // 1. Remove the minimized class to trigger the smooth slide-up/open animation
        concierge.classList.remove('concierge-minimized');

        // 2. Ensure the display state inside the header is correct (open)
        window.showConcierge();
    }, 5000); // 10000 milliseconds = 10 seconds
});
// maginifier.js
const modal = document.getElementById("layoutModal");
const layoutImage = document.getElementById("layoutImage");
const magnifier = document.getElementById("magnifier");
const zoom = 2.5;

function openLayoutModal(el) {
    layoutImage.src = el.src;
    modal.classList.add("show");
}

function closeLayoutModal() {
    modal.classList.remove("show");
    magnifier.style.display = "none";
}

layoutImage.addEventListener("mousemove", e => {
    const rect = layoutImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    magnifier.style.display = "block";
    magnifier.style.left = x - 75 + "px";
    magnifier.style.top = y - 75 + "px";
    magnifier.style.backgroundImage = `url(${layoutImage.src})`;
    magnifier.style.backgroundSize = layoutImage.width * zoom + "px " + layoutImage.height * zoom + "px";
    magnifier.style.backgroundPosition = `-${x * zoom - 75}px -${y * zoom - 75}px`;
});

layoutImage.addEventListener("mouseleave", () => magnifier.style.display = "none");

// Chart.js setup
const ctx = document.getElementById('investmentChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Investment Growth (₹ Cr)',
            data: [20, 40, 55, 60, 75, 95, 110],
            borderColor: 'rgba(0, 255, 255, 0.9)',
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#f5e399',
            tension: 0.4,
            fill: {
                target: 'origin',
                above: 'rgba(209,170,68,0.08)',
            }
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    }
});

// pause button js
const pauseBtn = document.getElementById('pauseBtn');
const reviewsSection = document.querySelector('.reviews');
let paused = false;


pauseBtn.addEventListener('click', () => {
    paused = !paused;
    if (paused) {
        reviewsSection.classList.add('paused');
        pauseBtn.textContent = 'Resume';
    } else {
        reviewsSection.classList.remove('paused');
        pauseBtn.textContent = 'Pause';
    }
});

// slider js

class AccordionSlider {
    constructor() {
        this.slides = document.querySelectorAll(".slide");
        this.prevBtn = document.querySelector(".nav-prev");
        this.nextBtn = document.querySelector(".nav-next");
        this.currentIndex = -1;
        this.autoplayInterval = null;
        this.autoplayDelay = 4000; // 4 seconds per slide

        this.init();
    }

    init() {
        this.slides.forEach((slide, index) => {
            slide.addEventListener("click", () => this.setActiveSlide(index));
        });

        this.prevBtn.addEventListener("click", () => this.previousSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.previousSlide();
            if (e.key === "ArrowRight") this.nextSlide();
        });

        // ✅ Activate first slide on load
        this.setActiveSlide(0);

        // ✅ Start autoplay
        this.startAutoplay();

        // ✅ Pause autoplay on hover
        this.addHoverPause();
    }

    setActiveSlide(index) {
        if (this.currentIndex === index) {
            this.slides.forEach((slide) => slide.classList.remove("active"));
            this.currentIndex = -1;
        } else {
            this.slides.forEach((slide) => slide.classList.remove("active"));
            this.slides[index].classList.add("active");
            this.currentIndex = index;
        }
    }

    nextSlide() {
        const nextIndex =
            this.currentIndex === -1 ? 0 : (this.currentIndex + 1) % this.slides.length;
        this.setActiveSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex =
            this.currentIndex === -1
                ? this.slides.length - 1
                : (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.setActiveSlide(prevIndex);
    }

    // ✅ AUTOPLAY
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
    }

    // ✅ HOVER-PAUSE
    addHoverPause() {
        const sliderContainer = document.querySelector(".accordion-slider");

        sliderContainer.addEventListener("mouseenter", () => {
            this.stopAutoplay();
        });

        sliderContainer.addEventListener("mouseleave", () => {
            this.startAutoplay();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AccordionSlider();
});

//rotating carousel
const carousel = document.getElementById("rotating-carousel");
const cards = carousel.querySelectorAll(".rotating-card");
let currentCardIndex = 0;
const totalCards = cards.length;
let rotationInterval = null;
let isPopupOpen = false;

// Dynamische stappen en afstand op basis van scherm
function getResponsiveSettings() {
    const width = window.innerWidth;

    if (width <= 400) return { rotationStep: 45, radius: 160 }; // Zeer compact
    if (width <= 600) return { rotationStep: 50, radius: 200 }; // Mobiel
    if (width <= 768) return { rotationStep: 60, radius: 260 }; // Tablet
    return { rotationStep: 72, radius: 350 }; // Desktop
}

function setCardPositions() {
    const { rotationStep, radius } = getResponsiveSettings();
    cards.forEach((card, i) => {
        const rotateY = i * rotationStep;
        const angleRad = (rotateY * Math.PI) / 180;
        const x = Math.sin(angleRad) * radius;
        const z = Math.cos(angleRad) * radius;
        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`;
    });
    rotateCarousel(); // herbereken rotatiehoek bij aanpassing
    updateCardSize();
}

function updateCardSize() {
    cards.forEach((card, i) => {
        if (i === currentCardIndex) {
            card.style.transform += " scale(1.2)";
            card.style.zIndex = "1";
        } else {
            card.style.transform = card.style.transform.replace(" scale(1.2)", "");
            card.style.zIndex = "0";
        }
    });
}

function rotateCarousel() {
    const { rotationStep } = getResponsiveSettings();
    const rotateDeg = -rotationStep * currentCardIndex;
    carousel.style.transform = `rotateY(${rotateDeg}deg)`;
}

function startRotation() {
    if (rotationInterval || isPopupOpen) return;
    rotationInterval = setInterval(() => {
        currentCardIndex = (currentCardIndex + 1) % totalCards;
        setCardPositions();
    }, 1400);
}

function stopRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
    }
}

carousel.addEventListener("mouseover", () => {
    if (!isPopupOpen) stopRotation();
});

carousel.addEventListener("mouseout", () => {
    if (!isPopupOpen) startRotation();
});

carousel.addEventListener("touchstart", () => {
    if (!isPopupOpen) stopRotation();
});

carousel.addEventListener("touchend", () => {
    if (!isPopupOpen) startRotation();
});

function showPopup(cardId) {
    const popup = document.getElementById(`popup-${cardId}`);
    if (popup) {
        popup.classList.add("show");
        isPopupOpen = true;
        stopRotation();
    }
}

function closePopup() {
    document.querySelectorAll(".popup").forEach((popup) => {
        popup.classList.remove("show");
    });
    isPopupOpen = false;
    startRotation();
}

cards.forEach((card) => {
    card.addEventListener("click", () => {
        const cardId = card.dataset.id;
        showPopup(cardId);
    });
});

// Init + resize support
setCardPositions();
startRotation();

window.addEventListener("resize", () => {
    setCardPositions(); // opnieuw positioneren bij vensterverandering
});

