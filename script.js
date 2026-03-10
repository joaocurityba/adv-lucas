// Initialize Lucide icons
lucide.createIcons();

// Smooth scroll function
window.scrollToId = function(id) {
    closeMobileMenu();
    // Ensure we give time for menu to close
    setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
}

// Mobile menu toggle
const toggle = document.getElementById("mobile-toggle");
const menu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
let isOpen = false;

function closeMobileMenu() {
    if (!menu || !toggle) return;
    isOpen = false;
    menu.classList.add("-translate-y-full");
    menu.classList.remove("translate-y-0");
    toggle.innerHTML = `<i data-lucide="menu"></i>`;
    lucide.createIcons();
}

if(toggle && menu) {
    toggle.addEventListener("click", () => {
        isOpen = !isOpen;
        if(isOpen) {
            menu.classList.remove("-translate-y-full");
            menu.classList.add("translate-y-0");
            // Change icon to X (we can re-init inside)
            toggle.innerHTML = `<i data-lucide="x"></i>`;
        } else {
            menu.classList.add("-translate-y-full");
            menu.classList.remove("translate-y-0");
            toggle.innerHTML = `<i data-lucide="menu"></i>`;
        }
        lucide.createIcons();
    });

    // Close menu when clicking any item inside the mobile overlay
    menu.querySelectorAll("button, a").forEach((item) => {
        item.addEventListener("click", () => {
            closeMobileMenu();
        });
    });
}

// Shrink nav on scroll
const nav = document.getElementById("navbar");
let lastScrollY = window.scrollY;
const scrollDelta = 6;

if (nav) {
    nav.style.top = "0";
    nav.style.willChange = "top";
}

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if(window.scrollY > 50){
        nav.classList.add("py-4");
        nav.classList.remove("py-8");
    } else {
        nav.classList.add("py-8");
        nav.classList.remove("py-4");
    }

    // Hide/show navbar by scroll direction on all screen sizes.
    if (currentScrollY <= 10) {
        nav.style.top = "0";
    } else if (currentScrollY > lastScrollY + scrollDelta) {
        nav.style.top = "-130px";
        closeMobileMenu();
    } else if (currentScrollY < lastScrollY - scrollDelta) {
        nav.style.top = "0";
    }

    lastScrollY = currentScrollY;
});

// Advanced scroll reveal based on Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".reveal, .reveal-x, .reveal-scale");
    hiddenElements.forEach((el) => observer.observe(el));
    
    // Auto-reveal hero instantly
    setTimeout(() => {
        document.getElementById("hero-reveal")?.classList.add("active");
        observer.unobserve(document.getElementById("hero-reveal"));
    }, 100);
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());
