// Modern Portfolio Application JavaScript - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Animation
    const initLoadingScreen = () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initPageAnimations();
                }, 500);
            }, 2000);
        } else {
            initPageAnimations();
        }
    };

    // Enhanced Theme Management
    const initTheme = () => {
        // Set dark theme by default for the premium design
        document.documentElement.setAttribute('data-color-scheme', 'dark');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.onclick = function(e) {
                e.preventDefault();
                const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            };
        }
    };
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-toggle__icon');
            if (icon) {
                icon.textContent = theme === 'dark' ? '🌙' : '☀️';
            }
        }
    };

    // Enhanced Navigation System
    const initNavigation = () => {
        const nav = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav__link');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        // Scroll effect for navbar
        const handleScroll = () => {
            if (window.scrollY > 100) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Smooth scroll navigation with enhanced easing
        navLinks.forEach(link => {
            link.onclick = function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const navHeight = nav?.offsetHeight || 0;
                        const targetPosition = targetElement.offsetTop - navHeight - 20;
                        
                        smoothScrollTo(targetPosition, 800);

                        // Update active nav
                        navLinks.forEach(navLink => navLink.classList.remove('active'));
                        this.classList.add('active');

                        // Close mobile menu
                        if (navMenu && navToggle) {
                            navMenu.classList.remove('active');
                            navToggle.classList.remove('active');
                        }
                    }
                }
            };
        });

        // Enhanced mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.onclick = function(e) {
                e.preventDefault();
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            };

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }

        // Update active nav on scroll with intersection observer
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    };

    // Enhanced smooth scrolling function
    const smoothScrollTo = (targetPosition, duration = 600) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Enhanced Typing Animation
    const initTypingAnimation = () => {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const text = "Pratham Jain V S";
        let index = 0;
        typingElement.textContent = '';

        const typeWriter = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 120 + Math.random() * 80); // Variable typing speed
            } else {
                // Add blinking cursor animation
                setTimeout(() => {
                    typingElement.style.borderRight = '2px solid #00d4ff';
                    typingElement.style.animation = 'blink 1s infinite';
                }, 500);
            }
        };

        setTimeout(typeWriter, 1500);
    };

    // Advanced Scroll Animations
    const initScrollAnimations = () => {
        const animateElements = document.querySelectorAll('.section-animate');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            scrollObserver.observe(element);
        });

        // Parallax effect for floating shapes
        const floatingShapes = document.querySelectorAll('.shape');
        const handleParallax = () => {
            const scrollY = window.pageYOffset;
            floatingShapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrollY * speed);
                shape.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.1}deg)`;
            });
        };

        window.addEventListener('scroll', throttle(handleParallax, 16));
    };

    // Enhanced Skills Animation
    const initSkillsAnimation = () => {
        const skillsSection = document.getElementById('skills');
        const progressRings = document.querySelectorAll('.progress-ring__circle');
        const programmingCards = document.querySelectorAll('.programming-card');
        
        let skillsAnimated = false;

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillsAnimated = true;
                    animateSkills();
                }
            });
        }, { threshold: 0.3 });

        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }

        const animateSkills = () => {
            // Animate circular progress bars
            progressRings.forEach((ring, index) => {
                setTimeout(() => {
                    const progress = parseInt(ring.style.getPropertyValue('--progress') || '0');
                    const circumference = 2 * Math.PI * 36;
                    const offset = circumference - (progress / 100) * circumference;
                    
                    ring.style.strokeDasharray = circumference;
                    ring.style.strokeDashoffset = circumference;
                    ring.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                    
                    setTimeout(() => {
                        ring.style.strokeDashoffset = offset;
                    }, 100);
                }, index * 150);
            });

            // Stagger animation for programming cards
            programmingCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        };

        // Initialize card states
        programmingCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
    };

    // Project System with Enhanced Filtering
    const projectsData = [
        {
            id: 0,
            title: "RTL Design using Verilog HDL",
            status: "Ongoing",
            description: "Comprehensive digital system design project implementing complex RTL architectures using Verilog HDL. Features advanced verification methodologies and FPGA optimization techniques.",
            technologies: ["Verilog", "SystemVerilog", "ModelSim", "Vivado", "FPGA"],
            category: "digital",
            highlights: [
                "Advanced RTL design patterns and methodologies",
                "Comprehensive testbench development and verification", 
                "FPGA synthesis optimization and timing analysis",
                "Industry-standard design flow implementation"
            ],
            githubUrl: "https://github.com/pratham-jain/rtl-design"
        },
        {
            id: 1,
            title: "Line Follower Robot Champion",
            status: "Completed",
            award: "🏆 1st Place - Hack-a-Maze 2024",
            description: "Award-winning autonomous navigation system with advanced sensor fusion and real-time control algorithms. Showcased exceptional performance in competitive robotics environment.",
            technologies: ["C++", "Arduino", "PID Control", "Sensor Fusion"],
            category: "systems",
            highlights: [
                "Champion robotics solution with advanced algorithms",
                "Real-time PID control implementation and tuning", 
                "Multi-sensor fusion for precise navigation",
                "Competition-winning autonomous decision making"
            ],
            githubUrl: "https://github.com/pratham-jain/line-follower"
        },
        {
            id: 2,
            title: "Python Automation Suite",
            status: "Completed",
            company: "Samsung SIC India",
            description: "Industrial-grade automation solution developed during Samsung internship. Streamlined complex workflows and improved operational efficiency through intelligent scripting.",
            technologies: ["Python", "Automation", "API Integration", "Data Processing"],
            category: "software", 
            highlights: [
                "Enterprise-level workflow automation solutions",
                "Intelligent task scheduling and optimization",
                "Seamless API integration and data processing",
                "Performance monitoring and analytics systems"
            ],
            githubUrl: "https://github.com/pratham-jain/automation-suite"
        }
    ];

    const initProjects = () => {
        // Enhanced filter functionality with smooth transitions
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.onclick = function() {
                const filter = this.getAttribute('data-filter');
                filterProjects(filter);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            };
        });

        // Modal functionality
        const detailButtons = document.querySelectorAll('.project-details-btn');
        detailButtons.forEach(button => {
            button.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const projectId = parseInt(this.getAttribute('data-project'));
                showProjectModal(projectId);
            };
        });

        // Modal controls
        const modal = document.getElementById('project-modal');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const modalClose = document.getElementById('modal-close');

        if (modalBackdrop) {
            modalBackdrop.onclick = hideProjectModal;
        }
        if (modalClose) {
            modalClose.onclick = hideProjectModal;
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                hideProjectModal();
            }
        });
    };

    const filterProjects = (filter) => {
        const projectCards = document.querySelectorAll('.project-card');
        
        // First fade out all cards
        projectCards.forEach(card => {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
        });
        
        setTimeout(() => {
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, index * 100);
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300);
    };

    const showProjectModal = (projectId) => {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalBody) return;

        const highlightsHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');
        const techHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            ${project.award ? `<div class="status status--success" style="margin: 16px 0; padding: 8px 16px; background: rgba(16, 185, 129, 0.2); color: #10B981; border-radius: 20px; display: inline-block;">${project.award}</div>` : ''}
            <div class="status ${project.status === 'Ongoing' ? 'status--warning' : 'status--success'}" style="margin: 12px 0; padding: 8px 16px; background: ${project.status === 'Ongoing' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}; color: ${project.status === 'Ongoing' ? '#F59E0B' : '#10B981'}; border-radius: 20px; display: inline-block;">${project.status}</div>
            <p style="margin-top: 20px; line-height: 1.8; color: var(--color-gray-300);">${project.description}</p>
            
            <h3 style="margin: 32px 0 16px 0; font-size: 1.25rem; color: #00d4ff;">Key Highlights</h3>
            <ul class="modal-features">${highlightsHTML}</ul>
            
            <h3 style="margin: 32px 0 16px 0; font-size: 1.25rem; color: #00d4ff;">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;">
                ${techHTML}
            </div>
            
            ${project.company ? `<p style="margin: 20px 0; padding: 12px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; color: #8B5CF6;"><strong>Company:</strong> ${project.company}</p>` : ''}
            
            <div style="margin-top: 32px; display: flex; gap: 16px; flex-wrap: wrap;">
                <a href="${project.githubUrl}" target="_blank" class="btn btn--primary">View on GitHub</a>
                <button class="btn btn--outline" onclick="hideProjectModal()">Close</button>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            modal.querySelector('.modal__content').style.transform = 'scale(1)';
        }, 10);
    };

    const hideProjectModal = () => {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    // Make hideProjectModal globally accessible
    window.hideProjectModal = hideProjectModal;

    // Enhanced Back to Top functionality
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            backToTopBtn.onclick = function(e) {
                e.preventDefault();
                smoothScrollTo(0, 800);
            };

            const toggleBackToTop = () => {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            };

            window.addEventListener('scroll', throttle(toggleBackToTop, 100));
        }
    };

    // Interactive Elements Enhancement
    const initInteractiveElements = () => {
        // Enhanced button ripple effect
        const rippleButtons = document.querySelectorAll('.btn--primary');
        rippleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.className = 'btn__ripple';
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Enhanced hover effects for cards
        const hoverCards = document.querySelectorAll('.glass-card, .programming-card, .tool-card, .domain-card, .achievement-card, .contact-card');
        hoverCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Animate skill progress rings on hover
        const programmingCards = document.querySelectorAll('.programming-card');
        programmingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const ring = this.querySelector('.progress-ring__circle');
                if (ring) {
                    const currentOffset = ring.style.strokeDashoffset;
                    ring.style.strokeDashoffset = '0';
                    setTimeout(() => {
                        ring.style.strokeDashoffset = currentOffset;
                    }, 200);
                }
            });
        });
    };

    // Performance Utilities
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Page Animation Initialization
    const initPageAnimations = () => {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__description, .hero__buttons, .hero__social');
        heroElements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.8s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 + (index * 150));
            }
        });

        // Start typing animation after hero animations
        setTimeout(() => {
            initTypingAnimation();
        }, 1000);
    };

    // Responsive handling
    const handleResize = debounce(() => {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Initialize all functionality
    const init = () => {
        initLoadingScreen();
        initTheme();
        initNavigation();
        initScrollAnimations();
        initSkillsAnimation();
        initProjects();
        initBackToTop();
        initInteractiveElements();

        // Add CSS for dynamic styles
        addDynamicStyles();
        
        console.log('🚀 Premium Portfolio initialized successfully');
    };

    // Add dynamic CSS styles
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { border-color: #00d4ff; }
                51%, 100% { border-color: transparent; }
            }
            
            .programming-card,
            .tool-card,
            .domain-card,
            .achievement-card,
            .contact-card,
            .glass-card {
                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .project-card {
                transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .btn {
                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .social-link {
                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
        `;
        document.head.appendChild(style);
    };

    // Error handling
    window.addEventListener('error', (e) => {
        console.warn('Portfolio error caught:', e.error);
    });

    // Initialize the application
    init();
});

// Additional utility functions for global access
window.smoothScrollTo = (targetPosition, duration = 600) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};