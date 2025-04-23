// Custom cursor with inner dot
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor dot position immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth cursor animation
function animateCursor() {
    // Smooth movement for the main cursor
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Smooth movement for the follower
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect with profile image
const navbar = document.querySelector('.navbar');
const navProfileImage = document.querySelector('.nav-profile-image');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down past the hero section
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        navProfileImage.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        navProfileImage.classList.remove('visible');
    }
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Form validation and animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Certification and Project cards animation
const cards = document.querySelectorAll('.certification-card, .project-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

cards.forEach(card => {
    cardObserver.observe(card);
});

// Project image hover effect
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Submit form
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            submitBtn.textContent = 'Message Sent!';
            contactForm.reset();
            
            // Redirect to thank you page after 2 seconds
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        submitBtn.textContent = 'Error! Try Again';
        console.error('Error:', error);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
});

// Intersection Observer for fade-in animations
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

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill items hover effect
document.querySelectorAll('.skill-items span').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.1)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
    });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('timeline-visible');
        }
    });
}, {
    threshold: 0.5
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add CSS classes for animations
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation class to hero section
    document.querySelector('.hero').classList.add('animate');
    
    // Add hover effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});

// Cursor hover effects
document.querySelectorAll('a, button, .btn').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Certificate Modal Functionality
function openCertificateModal(imageSrc) {
    if (imageSrc === '#') return; // Skip if no image source
    
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImage');
    
    modal.style.display = "block";
    modalImg.src = imageSrc;
    
    // Close modal when clicking the close button
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
    
    // Close modal when clicking outside the image
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = "none";
        }
    });
}

// Project Showcase Data
const projectData = {
    'web3': {
        title: 'Web3 Platform Development',
        description: 'Developed an innovative Web3 platform during HackIndia 2024, featuring secure user authentication, dynamic profile management, and an advanced crypto analysis dashboard. The platform enables users to securely manage their digital assets and analyze cryptocurrency trends.',
        tech: ['Web3', 'Blockchain', 'DApps', 'React', 'Node.js', 'Solidity'],
        media: [
            { type: 'image', src: 'images/hackindia.jpeg', alt: 'Dashboard View' },
            { type: 'image', src: 'images/projects/web3/auth.png', alt: 'Authentication' },
            { type: 'video', src: 'images/sample.mp4', alt: 'Platform Demo' }
        ],
        links: [
            { icon: 'fab fa-github', text: 'View Code', url: '#' }
        ]
    },
    'iffco': {
        title: 'IFFCO Web Application',
        description: 'Built a comprehensive web application during internship at IFFCO, implementing secure login/signup system, user profile management, and CRUD operations. The application streamlines internal processes and improves data management efficiency.',
        tech: ['Node.js', 'MySQL', 'Express.js', 'React', 'Bootstrap'],
        media: [
            { type: 'image', src: 'images/projects/iffco/login.png', alt: 'Login Page' },
            { type: 'image', src: 'images/projects/iffco/dashboard.png', alt: 'Dashboard' },
            { type: 'video', src: 'images/projects/iffco/features.mp4', alt: 'Features Demo' }
        ],
        links: [
            { icon: 'fab fa-github', text: 'View Code', url: '#' }
        ]
    },
    'ai-chatbot': {
        title: 'AI-Powered Chatbot',
        description: 'Developed an intelligent chatbot using natural language processing and machine learning algorithms to provide automated customer support and information retrieval. The chatbot can understand user queries, provide relevant responses, and learn from interactions.',
        tech: ['Python', 'NLP', 'Machine Learning', 'TensorFlow', 'NLTK'],
        media: [
            { type: 'image', src: 'images/projects/chatbot/interface.png', alt: 'Chat Interface' },
            { type: 'image', src: 'images/projects/chatbot/architecture.png', alt: 'System Architecture' },
            { type: 'video', src: 'images/projects/chatbot/demo.mp4', alt: 'Chatbot Demo' }
        ],
        links: [
            { icon: 'fab fa-github', text: 'View Code', url: '#' }
        ]
    }
};

// Project Showcase Modal Functionality
function openProjectShowcase(projectId) {
    const modal = document.getElementById('projectShowcaseModal');
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Update modal content
    document.querySelector('.project-showcase-title').textContent = project.title;
    document.querySelector('.project-showcase-description').textContent = project.description;
    
    // Update tech tags
    const techContainer = document.querySelector('.project-showcase-tech');
    techContainer.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Update media items with click handlers
    const mediaContainer = document.querySelector('.project-showcase-media');
    mediaContainer.innerHTML = project.media.map(item => {
        if (item.type === 'image') {
            return `<div class="project-showcase-item" onclick="openProjectMedia('${item.src}', 'image', event)">
                <img src="${item.src}" alt="${item.alt}" onerror="this.src='images/placeholder.png'">
            </div>`;
        } else {
            return `<div class="project-showcase-item" data-type="video" onclick="openProjectMedia('${item.src}', 'video', event)">
                <video>
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>`;
        }
    }).join('');
    
    // Update links
    const linksContainer = document.querySelector('.project-showcase-links');
    linksContainer.innerHTML = project.links.map(link => 
        `<a href="${link.url}" target="_blank" class="btn primary">
            <i class="${link.icon}"></i> ${link.text}
        </a>`
    ).join('');
    
    // Show modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    // Close modal when clicking the close button
    const closeBtn = document.getElementsByClassName('project-showcase-close')[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    
    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    
    // Close modal with Escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Project Media Modal Functionality
function openProjectMedia(src, type, event) {
    // Prevent event bubbling
    event.stopPropagation();
    
    const modal = document.getElementById('projectMediaModal');
    const modalImage = document.getElementById('modalProjectImage');
    const modalVideo = document.getElementById('modalProjectVideo');
    
    // Hide both initially
    modalImage.style.display = 'none';
    modalVideo.style.display = 'none';
    
    if (type === 'image') {
        modalImage.src = src;
        modalImage.style.display = 'block';
    } else {
        modalVideo.src = src;
        modalVideo.style.display = 'block';
        // Reset video to start
        modalVideo.currentTime = 0;
    }
    
    // Show modal
    modal.style.display = "block";
    
    // Close modal when clicking the close button
    const closeBtn = document.getElementsByClassName('close-media-modal')[0];
    const closeHandler = function() {
        modal.style.display = "none";
        if (type === 'video') {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
        closeBtn.removeEventListener('click', closeHandler);
    };
    closeBtn.addEventListener('click', closeHandler);
    
    // Close modal when clicking outside
    const outsideClickHandler = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            if (type === 'video') {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
            modal.removeEventListener('click', outsideClickHandler);
        }
    };
    modal.addEventListener('click', outsideClickHandler);
    
    // Close modal with Escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
            if (type === 'video') {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Particle System
const particlesContainer = document.getElementById('particles-container');
const profileContainer = document.querySelector('.profile-container');
let particles = [];

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Random size
    const size = Math.random() * 4 + 2;
    
    // Random animation duration
    const duration = Math.random() * 3 + 2;
    
    // Set particle properties
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    
    // Add to container
    particlesContainer.appendChild(particle);
    particles.push(particle);
    
    // Remove after animation
    setTimeout(() => {
        particle.remove();
        particles = particles.filter(p => p !== particle);
    }, duration * 1000);
}

// Create particles on profile hover
profileContainer.addEventListener('mouseenter', () => {
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }
    
    // Continue creating particles while hovering
    const particleInterval = setInterval(() => {
        if (particles.length < 50) {
            createParticle();
        }
    }, 200);
    
    // Store interval ID to clear later
    profileContainer.dataset.particleInterval = particleInterval;
});

// Stop creating particles when mouse leaves
profileContainer.addEventListener('mouseleave', () => {
    clearInterval(profileContainer.dataset.particleInterval);
});

// Handle window resize
window.addEventListener('resize', () => {
    particles.forEach(particle => {
        particle.remove();
    });
    particles = [];
});

// Certifications Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const certificationCards = document.querySelectorAll('.certification-card');
    const cardWidth = certificationCards[0].offsetWidth;
    const gap = 20;
    let currentPosition = 0;
    let autoScrollInterval;
    let isTransitioning = false;

    // Clone first and last cards for infinite scroll
    const firstCard = certificationCards[0].cloneNode(true);
    const lastCard = certificationCards[certificationCards.length - 1].cloneNode(true);
    carouselTrack.appendChild(firstCard);
    carouselTrack.insertBefore(lastCard, certificationCards[0]);

    // Set initial position
    currentPosition = cardWidth + gap;
    carouselTrack.style.transform = `translateX(-${currentPosition}px)`;

    // Auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (!isTransitioning) {
                moveNext();
            }
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentPosition += cardWidth + gap;
        carouselTrack.style.transition = 'transform 0.5s ease';
        carouselTrack.style.transform = `translateX(-${currentPosition}px)`;

        // Check if we've reached the end
        if (currentPosition >= (certificationCards.length + 1) * (cardWidth + gap)) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentPosition = cardWidth + gap;
                carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
                setTimeout(() => {
                    carouselTrack.style.transition = 'transform 0.5s ease';
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function movePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentPosition -= cardWidth + gap;
        carouselTrack.style.transition = 'transform 0.5s ease';
        carouselTrack.style.transform = `translateX(-${currentPosition}px)`;

        // Check if we've reached the beginning
        if (currentPosition <= 0) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentPosition = certificationCards.length * (cardWidth + gap);
                carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
                setTimeout(() => {
                    carouselTrack.style.transition = 'transform 0.5s ease';
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        movePrev();
        startAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        moveNext();
        startAutoScroll();
    });

    // Start auto-scroll
    startAutoScroll();

    // Pause auto-scroll on hover
    carouselTrack.addEventListener('mouseenter', stopAutoScroll);
    carouselTrack.addEventListener('mouseleave', startAutoScroll);

    // Certificate Modal
    const certificateModal = document.querySelector('.certificate-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.querySelector('.certificate-modal-content img');

    // Open certificate modal
    document.querySelectorAll('.certification-card').forEach(card => {
        card.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').src;
            modalImage.src = imageSrc;
            certificateModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close certificate modal
    closeModal.addEventListener('click', () => {
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    certificateModal.addEventListener('click', (e) => {
        if (e.target === certificateModal) {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (certificateModal.style.display === 'flex' && e.key === 'Escape') {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Projects Carousel
document.addEventListener('DOMContentLoaded', function() {
    const projectsCarouselTrack = document.querySelector('.projects-carousel .carousel-track');
    const projectsPrevBtn = document.querySelector('.projects-carousel .carousel-btn.prev');
    const projectsNextBtn = document.querySelector('.projects-carousel .carousel-btn.next');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCardWidth = projectCards[0].offsetWidth;
    const projectGap = 32; // 2rem in pixels
    let projectCurrentPosition = 0;
    let projectAutoScrollInterval;
    let isProjectTransitioning = false;

    // Clone first and last cards for infinite scroll
    const firstProjectCard = projectCards[0].cloneNode(true);
    const lastProjectCard = projectCards[projectCards.length - 1].cloneNode(true);
    projectsCarouselTrack.appendChild(firstProjectCard);
    projectsCarouselTrack.insertBefore(lastProjectCard, projectCards[0]);

    // Set initial position to show first two cards
    projectCurrentPosition = projectCardWidth + projectGap;
    projectsCarouselTrack.style.transform = `translateX(-${projectCurrentPosition}px)`;

    // Auto-scroll functionality
    function startProjectAutoScroll() {
        projectAutoScrollInterval = setInterval(() => {
            if (!isProjectTransitioning) {
                moveProjectNext();
            }
        }, 4000);
    }

    function stopProjectAutoScroll() {
        clearInterval(projectAutoScrollInterval);
    }

    function moveProjectNext() {
        if (isProjectTransitioning) return;
        isProjectTransitioning = true;
        
        projectCurrentPosition += projectCardWidth + projectGap;
        projectsCarouselTrack.style.transition = 'transform 0.5s ease';
        projectsCarouselTrack.style.transform = `translateX(-${projectCurrentPosition}px)`;

        // Check if we've reached the end
        if (projectCurrentPosition >= (projectCards.length + 1) * (projectCardWidth + projectGap)) {
            setTimeout(() => {
                projectsCarouselTrack.style.transition = 'none';
                projectCurrentPosition = projectCardWidth + projectGap;
                projectsCarouselTrack.style.transform = `translateX(-${projectCurrentPosition}px)`;
                setTimeout(() => {
                    projectsCarouselTrack.style.transition = 'transform 0.5s ease';
                    isProjectTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isProjectTransitioning = false;
            }, 500);
        }
    }

    function moveProjectPrev() {
        if (isProjectTransitioning) return;
        isProjectTransitioning = true;
        
        projectCurrentPosition -= projectCardWidth + projectGap;
        projectsCarouselTrack.style.transition = 'transform 0.5s ease';
        projectsCarouselTrack.style.transform = `translateX(-${projectCurrentPosition}px)`;

        // Check if we've reached the beginning
        if (projectCurrentPosition <= 0) {
            setTimeout(() => {
                projectsCarouselTrack.style.transition = 'none';
                projectCurrentPosition = projectCards.length * (projectCardWidth + projectGap);
                projectsCarouselTrack.style.transform = `translateX(-${projectCurrentPosition}px)`;
                setTimeout(() => {
                    projectsCarouselTrack.style.transition = 'transform 0.5s ease';
                    isProjectTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isProjectTransitioning = false;
            }, 500);
        }
    }

    // Event listeners for navigation buttons
    projectsPrevBtn.addEventListener('click', () => {
        stopProjectAutoScroll();
        moveProjectPrev();
        startProjectAutoScroll();
    });

    projectsNextBtn.addEventListener('click', () => {
        stopProjectAutoScroll();
        moveProjectNext();
        startProjectAutoScroll();
    });

    // Start auto-scroll
    startProjectAutoScroll();

    // Pause auto-scroll on hover
    projectsCarouselTrack.addEventListener('mouseenter', stopProjectAutoScroll);
    projectsCarouselTrack.addEventListener('mouseleave', startProjectAutoScroll);
}); 