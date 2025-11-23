// Ngăn zoom bằng Ctrl + scroll
document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// Ngăn zoom bằng touch
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Scroll Animation với Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Quan sát tất cả các phần tử có class fade-in-up
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Khởi tạo các phần tử đầu tiên ngay lập tức
    const firstSectionElements = document.querySelectorAll('.section-1 .fade-in-up');
    firstSectionElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
    
    // Khởi tạo calendar và countdown
    initCalendar();
    initCountdown();
});

// Initialize calendar
function initCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;
    
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const daysInMonth = 30;
    
    // Add header
    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day header';
        dayEl.textContent = day;
        calendar.appendChild(dayEl);
    });
    
    // Add empty cells for days before month starts
    // November 1, 2025 is Saturday (index 6 in our array)
    for (let i = 0; i < 6; i++) {
        const emptyEl = document.createElement('div');
        emptyEl.className = 'calendar-day';
        calendar.appendChild(emptyEl);
    }
    
    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day number';
        dayEl.textContent = day;
        
        if (day === 30) {
            dayEl.classList.add('highlight');
        }
        
        calendar.appendChild(dayEl);
    }
}

// Countdown Timer
function initCountdown() {
    // Set target date: November 30, 2025 at 17:00
    const targetDate = new Date('2025-11-30T17:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) {
                daysEl.textContent = String(days).padStart(2, '0');
                daysEl.style.animation = 'none';
                setTimeout(() => {
                    daysEl.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
            if (hoursEl) {
                hoursEl.textContent = String(hours).padStart(2, '0');
                hoursEl.style.animation = 'none';
                setTimeout(() => {
                    hoursEl.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
            if (minutesEl) {
                minutesEl.textContent = String(minutes).padStart(2, '0');
                minutesEl.style.animation = 'none';
                setTimeout(() => {
                    minutesEl.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
            if (secondsEl) {
                secondsEl.textContent = String(seconds).padStart(2, '0');
                secondsEl.style.animation = 'none';
                setTimeout(() => {
                    secondsEl.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
        } else {
            // Countdown finished
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scroll behavior
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

// Parallax effect cho một số phần tử - tối ưu với requestAnimationFrame
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.confetti-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
    
    // Bỏ parallax cho wavy-decorations để tránh bug
    const wavyElements = document.querySelectorAll('.wavy-decorations');
    wavyElements.forEach(element => {
        element.style.transform = 'translate3d(0, 0, 0)';
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Add pulse animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Thêm hiệu ứng khi scroll đến từng section - đơn giản hóa để tránh bug
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '1';
    section.style.willChange = 'auto';
});
