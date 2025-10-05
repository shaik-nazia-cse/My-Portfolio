// Mobile Menu Toggler
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Scroll sections active link and animations
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.header .navbar a');
const skillsSection = document.querySelector('#skills');

// Function to start the skills animation
const startSkillsAnimation = () => {
    // Technical Skills (Progress Bars)
    document.querySelectorAll('.skills-column:first-child .bar span').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });

    // Professional Skills (Radial Bars)
    document.querySelectorAll('.radial-bar').forEach(radialBar => {
        const percentValue = parseInt(radialBar.getAttribute('data-percent'));
        const circle = radialBar.querySelector('.progress-circle');
        const percentText = radialBar.querySelector('.percent');

        // Circumference for r=45 is 2 * pi * 45 ≈ 282.74
        const circumference = 282.74; 
        const offset = circumference - (percentValue / 100) * circumference;
        
        // Set the stroke-dashoffset to animate the circle
        circle.style.strokeDashoffset = offset + 'px';

        // Animate the percentage text
        let count = 0;
        const speed = 15; // Animation speed in ms
        const counter = setInterval(() => {
            if (count === percentValue) {
                clearInterval(counter);
            } else {
                count++;
                percentText.textContent = count + '%';
            }
        }, speed);
    });
};

// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');

            // Specific logic for skills section
            if (entry.target.id === 'skills') {
                startSkillsAnimation();
                // Optionally stop observing the skills section once animated
                // observer.unobserve(entry.target); 
            }
        } else {
            // Optional: Remove class when scrolling away if you want it to re-animate
            // entry.target.classList.remove('show-animate');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the section is visible

sections.forEach(sec => {
    observer.observe(sec);
});

// Window scroll for sticky header and active link (retains original logic)
window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.header .navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky header
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when clicking a nav link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Word-Changing Animation for Home Section (retains original logic)
const dynamicText = document.querySelector('.text-animate h3');
const words = ["Frontend Developer", "UI/UX Designer", "Web Developer", "Backend Developer"];
let wordIndex = 0;
let letterIndex = 0;

const typingEffect = () => {
    const currentWord = words[wordIndex];
    if (letterIndex < currentWord.length) {
        dynamicText.textContent += currentWord.charAt(letterIndex);
        letterIndex++;
        setTimeout(typingEffect, 100);
    } else {
        setTimeout(deletingEffect, 1500);
    }
}

const deletingEffect = () => {
    const currentWord = words[wordIndex];
    if (letterIndex > 0) {
        dynamicText.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(deletingEffect, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typingEffect, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect on load
    setTimeout(typingEffect, 1000);
    
    // Set 'Home' as active link on initial load
    document.querySelector('.header .navbar a[href*="home"]').classList.add('active');
});

// Portfolio Filter (retains original logic)
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons and add to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            // Apply a small animation before hiding/showing
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // Wait for fade-out before setting display: none
            }
        });
    });
});