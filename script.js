// Hero Particle System
class HeroParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.particleCount = 50;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${200 + Math.random() * 60}, 80%, 70%)`
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary checks
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Add some damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.2;
                    this.ctx.strokeStyle = '#3b82f6';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Dynamic Typing Code Animation
const codeSnippets = [
    [
        'const magic = () => {',
        '  return "Digital Reality";',
        '};',
        '',
        'magic(); // ✨'
    ],
    [
        '@keyframes gradientShift {',
        '  0% { position: "0% 50%" }',
        '  100% { position: "200% 50%" }',
        '}'
    ],
    [
        'function createWonder() {',
        '  const pixels = [];',
        '  for(let i = 0; i < ∞; i++) {',
        '    pixels.push(new Dream());',
        '  }',
        '  return pixels;',
        '}'
    ],
    [
        'background: linear-gradient(',
        '  to-r,',
        '  from-dreams,',
        '  via-code,',
        '  to-reality',
        ');'
    ],
    [
        '// Where imagination meets code',
        'if (creativity === unlimited) {',
        '  buildMagic();',
        '}',
        '',
        '// Let\'s create something epic'
    ],
    [
        'transform: translateX(-100%)',
        '         → translateX(100%)',
        '         → infinite();',
        '',
        '/* Seamless dreams */'
    ],
    [
        'animation: {',
        '  duration: "4s",',
        '  timing: "linear",',
        '  iteration: "infinite",',
        '  magic: true',
        '}'
    ],
    [
        'export const digitalMagic = {',
        '  create: () => "✨",',
        '  inspire: () => "🎨",',
        '  transform: () => "🚀"',
        '};'
    ]
];

let currentSnippetIndex = 0;
let isTyping = false;

function typeCode(elementId, lines, callback) {
    if (isTyping) return;
    isTyping = true;
    
    const element = document.getElementById(elementId);
    if (!element) {
        isTyping = false;
        return;
    }
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';
    
    function typeNextChar() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            
            if (charIndex < currentLine.length) {
                currentText += currentLine[charIndex];
                element.innerHTML = currentText + '<span class="animate-pulse">|</span>';
                charIndex++;
                setTimeout(typeNextChar, Math.random() * 50 + 30);
            } else {
                currentText += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeNextChar, 200);
            }
        } else {
            element.innerHTML = currentText;
            setTimeout(() => {
                // Erase text character by character
                eraseText(element, currentText, callback);
            }, 3000);
        }
    }
    
    typeNextChar();
}

function eraseText(element, text, callback) {
    // Remove HTML tags for character counting
    const textOnly = text.replace(/<[^>]*>/g, '');
    let currentLength = textOnly.length;
    
    function eraseNextChar() {
        if (currentLength > 0) {
            currentLength--;
            // Reconstruct text with HTML, but cut to current length
            const lines = text.split('<br>');
            let charCount = 0;
            let result = '';
            
            for (let i = 0; i < lines.length; i++) {
                const lineTextOnly = lines[i].replace(/<[^>]*>/g, '');
                if (charCount + lineTextOnly.length <= currentLength) {
                    result += lines[i];
                    charCount += lineTextOnly.length;
                    if (i < lines.length - 1) result += '<br>';
                } else {
                    // Partial line
                    const remainingChars = currentLength - charCount;
                    if (remainingChars > 0) {
                        // Reconstruct partial line with HTML tags
                        let partialLine = '';
                        let tempCharCount = 0;
                        let tempResult = '';
                        
                        for (let j = 0; j < lines[i].length; j++) {
                            if (lines[i][j] === '<') {
                                // Find end of tag
                                let tagEnd = lines[i].indexOf('>', j);
                                if (tagEnd !== -1) {
                                    tempResult += lines[i].substring(j, tagEnd + 1);
                                    j = tagEnd;
                                    continue;
                                }
                            }
                            if (tempCharCount < remainingChars) {
                                tempResult += lines[i][j];
                                tempCharCount++;
                            } else {
                                break;
                            }
                        }
                        result += tempResult;
                    }
                    break;
                }
            }
            
            element.innerHTML = result + '<span class="animate-pulse">|</span>';
            setTimeout(eraseNextChar, Math.random() * 30 + 20);
        } else {
            element.innerHTML = '';
            isTyping = false;
            if (callback) callback();
        }
    }
    
    eraseNextChar();
}

function startCodeAnimation() {
    const codeElements = [
        'codeLine1', 'codeLine2', 'codeLine3', 'codeLine4',
        'codeLine5', 'codeLine6', 'codeLine7', 'codeLine8'
    ];
    
    function animateNextSnippet() {
        const randomElement = codeElements[Math.floor(Math.random() * codeElements.length)];
        const randomSnippet = codeSnippets[currentSnippetIndex % codeSnippets.length];
        
        typeCode(randomElement, randomSnippet, () => {
            currentSnippetIndex++;
            setTimeout(animateNextSnippet, Math.random() * 2000 + 1000);
        });
    }
    
    // Start multiple typing animations with delays
    setTimeout(animateNextSnippet, 500);
    setTimeout(animateNextSnippet, 2000);
    setTimeout(animateNextSnippet, 4000);
}

// Start animation when page loads
document.addEventListener('DOMContentLoaded', startCodeAnimation);

// Calculate 2D distance-based blur from center
function applyDistanceBlur() {
    const codeElements = [
        { id: 'codeLine1', x: 5, y: 8 },
        { id: 'codeLine2', x: 90, y: 18 },
        { id: 'codeLine3', x: 15, y: 28 },
        { id: 'codeLine4', x: 80, y: 38 },
        { id: 'codeLine5', x: 8, y: 48 },
        { id: 'codeLine6', x: 95, y: 58 },
        { id: 'codeLine7', x: 25, y: 68 },
        { id: 'codeLine8', x: 85, y: 78 }
    ];
    
    const symbols = [
        { selector: '.animate-float', positions: [
            { x: 88, y: 15 },  // &lt;/&gt;
            { x: 8, y: 55 },   // { }
            { x: 95, y: 35 },  // →
            { x: 3, y: 25 },   // [ ]
            { x: 75, y: 65 }   // ( )
        ]}
    ];
    
    const centerX = 50;
    const centerY = 50;
    
    // Apply blur to code lines
    codeElements.forEach(element => {
        const el = document.getElementById(element.id);
        if (el) {
            // Calculate distance from center (0-100 range)
            const distanceX = Math.abs(element.x - centerX);
            const distanceY = Math.abs(element.y - centerY);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Convert distance to blur - constant blur regardless of position
            const constantBlur = 1.5; // Fixed blur amount
            
            el.style.filter = `blur(${constantBlur}px)`;
            
            // Adjust glow based on distance for visual interest
            const maxDistance = Math.sqrt(50 * 50 + 50 * 50);
            const normalizedDistance = distance / maxDistance;
            const glowIntensity = Math.max(20, (1 - normalizedDistance) * 40);
            el.style.textShadow = `0 0 ${glowIntensity}px currentColor70, 0 0 ${glowIntensity/2}px currentColor90, 0 0 ${glowIntensity/4}px currentColor`;
        }
    });
    
    // Apply blur to symbols
    const symbolElements = document.querySelectorAll('.animate-float');
    symbolElements.forEach((el, index) => {
        if (symbols[0].positions[index]) {
            const pos = symbols[0].positions[index];
            const distanceX = Math.abs(pos.x - centerX);
            const distanceY = Math.abs(pos.y - centerY);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Constant blur for symbols too
            const constantBlur = 1.2;
            el.style.filter = `blur(${constantBlur}px)`;
            
            // Adjust glow based on distance
            const maxDistance = Math.sqrt(50 * 50 + 50 * 50);
            const normalizedDistance = distance / maxDistance;
            const glowIntensity = Math.max(16, (1 - normalizedDistance) * 32);
            el.style.textShadow = `0 0 ${glowIntensity}px currentColor60, 0 0 ${glowIntensity/2}px currentColor80, 0 0 ${glowIntensity/4}px currentColor`;
        }
    });
}

// Apply distance blur when page loads
document.addEventListener('DOMContentLoaded', applyDistanceBlur);

// EmailJS Contact Form Handler - Serverless email functionality
// Initialize EmailJS
emailjs.init("ZugXXK1wLfdxOGV0b");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        formMessage.classList.add('hidden');
        
        // Get form data
        const formData = new FormData(form);
        
        // Prepare EmailJS template parameters
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Send email via EmailJS
        emailjs.send('service_2uq6kt8', 'template_fryqiz8', templateParams)
        .then(function(response) {
            // Success message
            formMessage.innerHTML = '<p class="text-green-400">✨ Message sent successfully! I\'ll get back to you soon.</p>';
            formMessage.classList.remove('hidden');
            
            // Reset form
            form.reset();
        })
        .catch(function(error) {
            console.log('Error:', error);
            
            // Error message
            let errorMsg = 'Failed to send message. ';
            if (error.status === 400) {
                errorMsg += 'Invalid email configuration. ';
            } else if (error.status === 403) {
                errorMsg += 'Service not authorized. ';
            }
            errorMsg += 'Please contact me directly at david.cit1999@gmail.com';
            
            formMessage.innerHTML = '<p class="text-red-400">❌ ' + errorMsg + '</p>';
            formMessage.classList.remove('hidden');
        })
        .finally(function() {
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
        });
    });
});

// Smooth scrolling for navigation links
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

// 3D Skills Streams Mouse Tracking
const skillStreams = document.querySelectorAll('.skill-stream');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Calculate rotation based on mouse position across whole viewport
    const rotateY = (x - 0.5) * 20; // Max ±10 degrees
    const rotateX = -(y - 0.5) * 10; // Max ±5 degrees
    
    // Apply same transform to all streams
    skillStreams.forEach(stream => {
        stream.style.transform = `rotateX(${15 + rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Reset perspective when mouse leaves viewport
document.addEventListener('mouseleave', () => {
    skillStreams.forEach(stream => {
        stream.style.transform = 'rotateX(15deg) rotateY(0deg)';
    });
});


// Static gradient background
document.body.style.background = `
    radial-gradient(circle at 50% 50%, 
        rgba(107, 114, 128, 0.05) 0%, 
        rgba(75, 85, 99, 0.03) 25%, 
        rgba(55, 65, 81, 0.03) 50%, 
        #0a0a0a 100%)
`;

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideInUp');
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Continuous scrolling streams animation
function initializeStreams() {
    const streams = [
        { id: 'stream1', direction: 1, speed: 0.8 },   // right
        { id: 'stream2', direction: -1, speed: 0.8 },  // left  
        { id: 'stream3', direction: 1, speed: 0.8 }    // right
    ];
    
    streams.forEach(stream => {
        const element = document.getElementById(stream.id);
        if (!element) return;
        
        const originalChildren = Array.from(element.children);
        
        // Create a very long seamless stream
        const totalCopies = 100;
        for (let i = 0; i < totalCopies; i++) {
            originalChildren.forEach(child => {
                const clone = child.cloneNode(true);
                element.appendChild(clone);
            });
        }
        
        // Set initial position far from view bounds
        let position = stream.direction > 0 ? -2000 : 2000;
        
        function animate() {
            position += stream.direction * stream.speed;
            
            // Only reset when very far outside viewport
            const viewportWidth = window.innerWidth;
            if (stream.direction > 0 && position > viewportWidth + 5000) {
                position = -5000;
            } else if (stream.direction < 0 && position < -viewportWidth - 5000) {
                position = 5000;
            }
            
            element.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Initialize streams when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeStreams();
    initializeParticleField();
    initializeSkillsAnimations();
});



// Add scroll animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-slideInUp {
        animation: slideInUp 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Modern Skills Animation System
function initializeSkillsAnimations() {
    // Animate progress bars on scroll
    const observeProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 300);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '50px'
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    };
    
    // Animate progress rings on scroll
    const observeProgressRings = () => {
        const progressRings = document.querySelectorAll('.skill-progress-ring');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ring = entry.target;
                    const progressPercent = ring.getAttribute('data-progress');
                    const circle = ring.querySelector('.progress-circle');
                    
                    if (circle && progressPercent) {
                        const radius = parseFloat(circle.getAttribute('r'));
                        const circumference = 2 * Math.PI * radius;
                        const dashOffset = circumference - (progressPercent / 100) * circumference;
                        
                        setTimeout(() => {
                            circle.style.strokeDashoffset = dashOffset;
                            circle.style.transition = 'stroke-dashoffset 2s ease-out';
                        }, 500);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '50px'
        });
        
        progressRings.forEach(ring => observer.observe(ring));
    };
    
    // Filter functionality for skills
    const initializeFilters = () => {
        const filterButtons = document.querySelectorAll('.skill-filter');
        const skillCards = document.querySelectorAll('.skill-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button and ARIA attributes
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                
                // Filter skill cards
                skillCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Animate in
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease-out';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.transition = 'all 0.3s ease-out';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Announce filter change to screen readers
                const announcement = `Showing ${filter === 'all' ? 'all' : filter} skills`;
                const announcer = document.createElement('div');
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.className = 'sr-only';
                announcer.textContent = announcement;
                document.body.appendChild(announcer);
                
                // Clean up announcer after announcement
                setTimeout(() => {
                    document.body.removeChild(announcer);
                }, 1000);
            });
            
            // Add keyboard navigation for filter buttons
            button.addEventListener('keydown', (e) => {
                const currentIndex = Array.from(filterButtons).indexOf(button);
                let targetButton = null;
                
                switch(e.key) {
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        targetButton = filterButtons[currentIndex > 0 ? currentIndex - 1 : filterButtons.length - 1];
                        break;
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        targetButton = filterButtons[currentIndex < filterButtons.length - 1 ? currentIndex + 1 : 0];
                        break;
                    case 'Home':
                        e.preventDefault();
                        targetButton = filterButtons[0];
                        break;
                    case 'End':
                        e.preventDefault();
                        targetButton = filterButtons[filterButtons.length - 1];
                        break;
                }
                
                if (targetButton) {
                    targetButton.focus();
                    targetButton.click();
                }
            });
        });
    };
    
    // Tilt effect removed - cards no longer move on mouse interaction
    
    // Initialize all animations
    observeProgressBars();
    observeProgressRings();
    initializeFilters();
}

// Additional styles for new skills section
const skillsStyles = `
    /* Glassmorphism effects */
    .skill-card {
        transition: all 0.3s ease;
        will-change: transform;
    }
    
    .skill-card:hover {
        transform: translateY(-8px);
    }
    
    /* Progress ring animations */
    .skill-progress-ring .progress-circle {
        stroke-dashoffset: inherit;
        transition: stroke-dashoffset 0s;
    }
    
    /* Filter button animations */
    .skill-filter.active {
        background: linear-gradient(135deg, rgb(59 130 246 / 0.3), rgb(147 51 234 / 0.3)) !important;
        color: rgb(96 165 250) !important;
        border-color: rgb(59 130 246 / 0.5) !important;
        box-shadow: 0 0 20px rgb(59 130 246 / 0.3);
    }
    
    /* Pulse animation for aurora background */
    @keyframes pulse-slow {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
    }
    
    .animate-pulse-slow {
        animation: pulse-slow 8s ease-in-out infinite;
    }
    
    /* Gradient shimmer effect */
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    .skill-card:hover .shimmer {
        animation: shimmer 2s ease-in-out infinite;
    }
    
    /* Hover glow effects */
    .skill-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        border-radius: inherit;
    }
    
    .skill-card:hover::before {
        opacity: 1;
    }
    
    /* Screen reader only content */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    /* Focus styles for accessibility */
    .skill-filter:focus,
    .skill-card:focus {
        outline: 2px solid rgb(59 130 246);
        outline-offset: 2px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .skill-card,
        .progress-fill,
        .progress-circle,
        .skill-filter,
        .animate-pulse-slow {
            animation: none !important;
            transition: none !important;
        }
        
        .skill-card:hover {
            transform: none !important;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .skill-card {
            border-width: 2px;
            border-color: rgb(255 255 255 / 0.8);
        }
        
        .skill-filter {
            border-width: 2px;
        }
    }
    
    /* Enhanced visual effects */
    .skill-card {
        box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    
    .skill-card:hover {
        box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 50px rgba(59, 130, 246, 0.15);
        transform: translateY(-12px) scale(1.02);
    }
    
    /* Typography improvements */
    .skill-card h3 {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        letter-spacing: -0.025em;
    }
    
    /* Better contrast for smaller cards */
    .skill-card:not(.core):not([class*="xl:col-span-6"]):not([class*="xl:col-span-2"]) {
        border-width: 2px;
    }
    
    .skill-card:not(.core):not([class*="xl:col-span-6"]):not([class*="xl:col-span-2"]):hover {
        border-width: 2px;
        border-color: rgba(255, 255, 255, 0.3);
    }
    
    /* Progress ring glow effects */
    .skill-progress-ring svg circle:last-child {
        filter: drop-shadow(0 0 6px currentColor);
    }
    
    /* Animated background patterns */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .skill-card .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    /* Mobile responsiveness improvements */
    @media (max-width: 768px) {
        .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .skill-card {
            padding: 1.5rem !important;
            transform: none !important;
        }
        
        .skill-card:hover {
            transform: translateY(-4px) !important;
        }
        
        .skill-card.core {
            col-span: 1 !important;
            row-span: 1 !important;
        }
        
        /* Stack AI card content vertically on mobile */
        .skill-card[class*="xl:col-span-6"] .flex {
            flex-direction: column;
            text-align: center;
        }
        
        .skill-card[class*="xl:col-span-6"] .ml-8 {
            margin-left: 0;
            margin-top: 2rem;
        }
    }
`;

// Add the new styles to the document
const skillsStyleSheet = document.createElement('style');
skillsStyleSheet.textContent = skillsStyles;
document.head.appendChild(skillsStyleSheet);

// Neural Network Canvas Animation
function initializeSkillsNetwork() {
    const container = document.getElementById('skillsNetwork');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        if (canvas.width < 400) canvas.width = 400;
        if (canvas.height < 300) canvas.height = 300;
        
        initializeNetwork();
    }
    
    setTimeout(() => {
        resizeCanvas();
    }, 100);
    
    window.addEventListener('resize', resizeCanvas);
    
    // Comprehensive Digital Arsenal with logical relationships
    const skillsData = {
        // Core layer - fundamental technologies
        core: [
            { name: 'JS', color: 'rgba(240, 219, 79, 0.9)', x: 0.5, y: 0.35, size: 18 },
            { name: 'CSS', color: 'rgba(41, 101, 241, 0.9)', x: 0.25, y: 0.45, size: 16 },
            { name: 'HTML', color: 'rgba(227, 79, 38, 0.9)', x: 0.75, y: 0.45, size: 15 }
        ],
        // Framework layer - built on core
        frameworks: [
            { name: 'React', color: 'rgba(97, 218, 251, 0.9)', x: 0.5, y: 0.15, size: 20 },
            { name: 'TS', color: 'rgba(49, 120, 198, 0.9)', x: 0.2, y: 0.25, size: 16 },
            { name: 'TW', color: 'rgba(56, 178, 172, 0.9)', x: 0.8, y: 0.25, size: 15 }
        ],
        // Backend layer
        backend: [
            { name: 'Node', color: 'rgba(104, 160, 99, 0.9)', x: 0.5, y: 0.75, size: 18 }
        ],
        // Tools layer
        tools: [
            { name: 'Git', color: 'rgba(240, 81, 51, 0.9)', x: 0.15, y: 0.65, size: 14 },
            { name: 'Pack', color: 'rgba(139, 92, 246, 0.9)', x: 0.85, y: 0.65, size: 14 }
        ],
        // AI/Design layer
        advanced: [
            { name: 'LLM', color: 'rgba(168, 85, 247, 0.9)', x: 0.15, y: 0.85, size: 16 },
            { name: 'PS', color: 'rgba(49, 168, 255, 0.9)', x: 0.85, y: 0.85, size: 15 }
        ]
    };
    
    // Define logical connections between skills
    const connections = [
        // HTML as foundation - connects to core web technologies
        { from: 'HTML', to: 'JS', strength: 0.9, type: 'foundation' },
        { from: 'HTML', to: 'CSS', strength: 0.9, type: 'foundation' },
        { from: 'HTML', to: 'React', strength: 0.8, type: 'structure' },
        
        // Core connections
        { from: 'JS', to: 'React', strength: 0.9, type: 'dependency' },
        { from: 'JS', to: 'TS', strength: 0.8, type: 'evolution' },
        { from: 'JS', to: 'Node', strength: 0.9, type: 'runtime' },
        { from: 'CSS', to: 'TW', strength: 0.8, type: 'framework' },
        { from: 'CSS', to: 'React', strength: 0.6, type: 'styling' },
        
        // Framework connections
        { from: 'React', to: 'TS', strength: 0.7, type: 'enhancement' },
        { from: 'React', to: 'TW', strength: 0.6, type: 'styling' },
        
        // Git version control - essential for all development
        { from: 'Git', to: 'HTML', strength: 0.6, type: 'workflow' },
        { from: 'Git', to: 'JS', strength: 0.7, type: 'workflow' },
        { from: 'Git', to: 'CSS', strength: 0.6, type: 'workflow' },
        { from: 'Git', to: 'React', strength: 0.7, type: 'workflow' },
        { from: 'Git', to: 'Node', strength: 0.6, type: 'workflow' },
        
        // Build tools
        { from: 'Pack', to: 'React', strength: 0.7, type: 'bundling' },
        { from: 'Pack', to: 'TS', strength: 0.6, type: 'bundling' },
        { from: 'Pack', to: 'CSS', strength: 0.5, type: 'bundling' },
        
        // Advanced connections
        { from: 'LLM', to: 'JS', strength: 0.4, type: 'automation' },
        { from: 'LLM', to: 'HTML', strength: 0.3, type: 'generation' },
        { from: 'PS', to: 'CSS', strength: 0.5, type: 'design' },
        { from: 'PS', to: 'HTML', strength: 0.4, type: 'design' },
        { from: 'PS', to: 'TW', strength: 0.4, type: 'design' }
    ];
    
    const nodes = [];
    const allSkills = [];
    
    function initializeNetwork() {
        nodes.length = 0;
        allSkills.length = 0;
        
        // Create skill nodes with logical positioning
        Object.values(skillsData).flat().forEach(skill => {
            const node = {
                name: skill.name,
                x: skill.x * canvas.width,
                y: skill.y * canvas.height,
                targetX: skill.x * canvas.width,
                targetY: skill.y * canvas.height,
                vx: 0,
                vy: 0,
                radius: skill.size,
                color: skill.color,
                opacity: 0.8,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.008, // Much slower pulse
                glowIntensity: 0,
                connections: [],
                type: 'skill'
            };
            
            nodes.push(node);
            allSkills.push(node);
        });
        
        // Build connection network with pre-calculated paths
        connections.forEach(conn => {
            const fromNode = allSkills.find(n => n.name === conn.from);
            const toNode = allSkills.find(n => n.name === conn.to);
            
            if (fromNode && toNode) {
                // Calculate collision-free path once at initialization
                const pathPoints = calculateAvoidancePath(fromNode, toNode, allSkills);
                
                fromNode.connections.push({
                    target: toNode,
                    strength: conn.strength,
                    type: conn.type,
                    pathPoints: pathPoints
                });
            }
        });
    }
    
    initializeNetwork();
    
    // Function to calculate path that avoids other nodes
    function calculateAvoidancePath(startNode, endNode, allNodes) {
        const path = [{ x: startNode.x, y: startNode.y }];
        const target = { x: endNode.x, y: endNode.y };
        
        // Check if direct path intersects with any nodes
        const obstacles = allNodes.filter(node => 
            node !== startNode && node !== endNode && 
            isLineIntersectingCircle(startNode, endNode, node, node.radius + 15)
        );
        
        if (obstacles.length === 0) {
            // Direct path is clear
            path.push(target);
            return path;
        }
        
        // Find best detour point
        const midX = (startNode.x + endNode.x) / 2;
        const midY = (startNode.y + endNode.y) / 2;
        
        // Try different detour angles
        const angles = [Math.PI/3, -Math.PI/3, Math.PI/2, -Math.PI/2];
        let bestDetour = null;
        let minObstacles = Infinity;
        
        for (const angle of angles) {
            const detourDistance = 80;
            const detourX = midX + Math.cos(angle) * detourDistance;
            const detourY = midY + Math.sin(angle) * detourDistance;
            
            // Count obstacles for this detour
            const detourObstacles = allNodes.filter(node =>
                node !== startNode && node !== endNode && (
                    isLineIntersectingCircle(startNode, { x: detourX, y: detourY }, node, node.radius + 15) ||
                    isLineIntersectingCircle({ x: detourX, y: detourY }, endNode, node, node.radius + 15)
                )
            ).length;
            
            if (detourObstacles < minObstacles) {
                minObstacles = detourObstacles;
                bestDetour = { x: detourX, y: detourY };
            }
        }
        
        if (bestDetour) {
            path.push(bestDetour);
        }
        
        path.push(target);
        return path;
    }
    
    // Helper function to check line-circle intersection
    function isLineIntersectingCircle(lineStart, lineEnd, circle, radius) {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const fx = lineStart.x - circle.x;
        const fy = lineStart.y - circle.y;
        
        const a = dx * dx + dy * dy;
        const b = 2 * (fx * dx + fy * dy);
        const c = fx * fx + fy * fy - radius * radius;
        
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) return false;
        
        const discriminantSqrt = Math.sqrt(discriminant);
        const t1 = (-b - discriminantSqrt) / (2 * a);
        const t2 = (-b + discriminantSqrt) / (2 * a);
        
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
    }
    
    let mouseX = 0, mouseY = 0;
    
    // Mouse tracking
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update nodes positions first
        nodes.forEach(node => {
            // Gentle breathing motion around target position
            const breathingX = Math.sin(Date.now() * 0.0005 + node.x * 0.01) * 2;
            const breathingY = Math.cos(Date.now() * 0.0007 + node.y * 0.01) * 1.5;
            
            node.x = node.targetX + breathingX;
            node.y = node.targetY + breathingY;
            
            // Mouse interaction
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const force = (120 - distance) / 120;
                node.glowIntensity = Math.min(1, node.glowIntensity + 0.02);
                
                // Gentle repulsion
                node.targetX -= dx * 0.0008 * force;
                node.targetY -= dy * 0.0008 * force;
            } else {
                node.glowIntensity = Math.max(0, node.glowIntensity - 0.01);
                
                // Return to original position
                const originalX = (Object.values(skillsData).flat().find(s => s.name === node.name)?.x || 0.5) * canvas.width;
                const originalY = (Object.values(skillsData).flat().find(s => s.name === node.name)?.y || 0.5) * canvas.height;
                
                node.targetX += (originalX - node.targetX) * 0.002;
                node.targetY += (originalY - node.targetY) * 0.002;
            }
            
            // Update pulse
            node.pulse += node.pulseSpeed;
        });
        
        // Draw logical connections FIRST (behind nodes)
        nodes.forEach(node => {
            node.connections.forEach(conn => {
                const target = conn.target;
                
                // Base connection opacity based on strength
                const baseOpacity = conn.strength * 0.5;
                const hoverBoost = (node.glowIntensity + target.glowIntensity) * 0.4;
                const connectionOpacity = baseOpacity + hoverBoost;
                
                // Connection color based on type
                let connectionColor = node.color;
                if (conn.type === 'foundation') {
                    connectionColor = 'rgba(255, 215, 0, '; // Gold for foundation
                } else if (conn.type === 'dependency') {
                    connectionColor = 'rgba(255, 255, 255, ';
                } else if (conn.type === 'evolution') {
                    connectionColor = 'rgba(168, 85, 247, ';
                } else if (conn.type === 'framework') {
                    connectionColor = 'rgba(56, 178, 172, ';
                } else if (conn.type === 'workflow') {
                    connectionColor = 'rgba(240, 81, 51, '; // Git orange
                } else if (conn.type === 'structure') {
                    connectionColor = 'rgba(227, 79, 38, '; // HTML orange
                }
                
                // Draw main connection using pre-calculated path
                const pathPoints = conn.pathPoints;
                
                // Line thickness based on strength and hover
                const baseThickness = conn.strength * 3;
                const hoverThickness = hoverBoost * 2;
                const lineWidth = baseThickness + hoverThickness;
                
                if (pathPoints.length > 2) {
                    // Draw smooth curved path
                    ctx.beginPath();
                    ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
                    
                    for (let i = 1; i < pathPoints.length - 1; i++) {
                        const cp1 = pathPoints[i];
                        const cp2 = pathPoints[i + 1];
                        ctx.quadraticCurveTo(cp1.x, cp1.y, cp2.x, cp2.y);
                    }
                    
                    // Elegant gradient
                    const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                    gradient.addColorStop(0, node.color.replace('0.9', String(connectionOpacity * 0.8)));
                    gradient.addColorStop(0.5, connectionColor + (connectionOpacity * 0.9) + ')');
                    gradient.addColorStop(1, target.color.replace('0.9', String(connectionOpacity * 0.8)));
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = lineWidth;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                } else {
                    // Direct connection
                    const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                    gradient.addColorStop(0, node.color.replace('0.9', String(connectionOpacity * 0.8)));
                    gradient.addColorStop(0.5, connectionColor + (connectionOpacity * 0.9) + ')');
                    gradient.addColorStop(1, target.color.replace('0.9', String(connectionOpacity * 0.8)));
                    
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = lineWidth;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
                
                // Subtle connection strength indicators (dots at strategic points)
                if (conn.strength > 0.7) {
                    const segments = Math.floor(conn.strength * 5);
                    for (let i = 1; i <= segments; i++) {
                        const progress = i / (segments + 1);
                        const dotX = node.x + (target.x - node.x) * progress;
                        const dotY = node.y + (target.y - node.y) * progress;
                        
                        ctx.beginPath();
                        ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = connectionColor + (connectionOpacity * 0.6) + ')';
                        ctx.fill();
                    }
                }
                
                // Connection type indicator (small text)
                if (node.glowIntensity > 0.3 || target.glowIntensity > 0.3) {
                    const midX = (node.x + target.x) / 2;
                    const midY = (node.y + target.y) / 2;
                    
                    ctx.font = '10px Arial';
                    ctx.fillStyle = `rgba(255, 255, 255, ${connectionOpacity * 0.9})`;
                    ctx.textAlign = 'center';
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                    ctx.shadowBlur = 3;
                    ctx.fillText(conn.type, midX, midY - 5);
                    ctx.shadowBlur = 0;
                }
            });
        });
        
        // Draw nodes SECOND (on top of connections)
        nodes.forEach(node => {
            const pulseOpacity = node.opacity + Math.sin(node.pulse) * 0.1;
            
            // Draw node with enhanced glow
            const glowRadius = node.radius + node.glowIntensity * 8;
            
            // Outer glow
            const gradient = ctx.createRadialGradient(node.x, node.y, node.radius, node.x, node.y, glowRadius);
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, node.color.replace('0.9', '0'));
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Main node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color.replace('0.9', String(pulseOpacity));
            ctx.fill();
            
            // Inner highlight
            ctx.beginPath();
            ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + node.glowIntensity * 0.3})`;
            ctx.fill();
            
            // Skill text
            ctx.font = `bold ${14 + node.glowIntensity * 4}px Arial`;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.95})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctx.shadowBlur = 6;
            ctx.fillText(node.name, node.x, node.y);
            ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Dynamic Particle Field
function initializeParticleField() {
    const container = document.getElementById('particleField');
    if (!container) return;
    
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full animate-particle-float pointer-events-none';
        
        const size = Math.random() * 6 + 2;
        const hue = Math.random() * 60 + 200; // Blue to purple
        const opacity = Math.random() * 0.4 + 0.1;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                hsla(${hue}, 80%, 70%, ${opacity}) 0%, 
                hsla(${hue}, 60%, 50%, ${opacity * 0.5}) 50%,
                transparent 100%);
            box-shadow: 0 0 ${size * 2}px hsla(${hue}, 80%, 70%, ${opacity * 0.8});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-duration: ${8 + Math.random() * 4}s;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        container.appendChild(particle);
        particles.push(particle);
    }
    
    // Mouse interaction with particles
    let mouseX = 0, mouseY = 0;
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        particles.forEach(particle => {
            const particleRect = particle.getBoundingClientRect();
            const particleX = particleRect.left + particleRect.width / 2 - rect.left;
            const particleY = particleRect.top + particleRect.height / 2 - rect.top;
            
            const dx = mouseX - particleX;
            const dy = mouseY - particleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.style.transform = `translate(${dx * force * 0.3}px, ${dy * force * 0.3}px) scale(${1 + force * 0.5})`;
                particle.style.filter = `brightness(${1 + force})`;
            } else {
                particle.style.transform = '';
                particle.style.filter = '';
            }
        });
    });
    
    container.addEventListener('mouseleave', () => {
        particles.forEach(particle => {
            particle.style.transform = '';
            particle.style.filter = '';
        });
    });
}

// ===========================
// Enhanced Navigation System
// ===========================

// Navigation elements
const mainNav = document.getElementById('mainNav');
const progressBar = document.getElementById('progressBar');
const navBrand = document.getElementById('navBrand');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

// Navigation state
let isMobileMenuOpen = false;
let currentSection = 'hero';

// Initialize navigation functionality
function initNavigation() {
    // Scroll progress bar
    window.addEventListener('scroll', updateScrollProgress);
    
    // Section detection
    window.addEventListener('scroll', detectActiveSection);
    
    // Mobile menu functionality
    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay?.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize active section highlighting
    updateActiveNavLink();
}

// Update scroll progress bar
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset;
    const progress = (scrollTop / scrollHeight) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // Show/hide brand logo based on scroll
    if (navBrand) {
        if (scrollTop > 100) {
            navBrand.style.opacity = '1';
            navBrand.style.transform = 'translateX(0)';
        } else {
            navBrand.style.opacity = '0';
            navBrand.style.transform = 'translateX(-1rem)';
        }
    }
}

// Detect active section
function detectActiveSection() {
    const sections = ['hero', 'about', 'skills', 'contact'];
    const scrollTop = window.pageYOffset + 150; // Offset for nav height
    
    let newActiveSection = 'hero';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                newActiveSection = sectionId;
            }
        }
    });
    
    if (newActiveSection !== currentSection) {
        currentSection = newActiveSection;
        updateActiveNavLink();
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const activeBackground = document.querySelector('.nav-active-bg');
    
    // Update desktop nav
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === currentSection) {
            link.classList.add('active');
            
            // Animate active background
            if (activeBackground) {
                const linkRect = link.getBoundingClientRect();
                const containerRect = link.parentElement.getBoundingClientRect();
                const leftOffset = linkRect.left - containerRect.left - 8; // Adjust for padding
                
                activeBackground.style.left = `${leftOffset}px`;
                activeBackground.style.width = `${linkRect.width + 16}px`;
                activeBackground.style.opacity = '1';
            }
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update mobile nav indicators
    mobileNavLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        const indicator = link.querySelector('span span');
        
        if (section === currentSection) {
            indicator?.style.setProperty('opacity', '1');
        } else {
            indicator?.style.setProperty('opacity', '0');
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    if (isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    isMobileMenuOpen = true;
    
    if (mobileMenu) {
        mobileMenu.style.transform = 'translateX(0)';
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.style.opacity = '1';
        mobileMenuOverlay.style.pointerEvents = 'all';
    }
    
    // Animate menu icon
    if (menuIcon && closeIcon) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close mobile menu
function closeMobileMenu() {
    isMobileMenuOpen = false;
    
    if (mobileMenu) {
        mobileMenu.style.transform = 'translateX(100%)';
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.style.opacity = '0';
        mobileMenuOverlay.style.pointerEvents = 'none';
    }
    
    // Animate menu icon
    if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Magnetic button effect for nav links
function addMagneticEffect() {
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        link.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
        });
    });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    addMagneticEffect();
    initAboutSectionEffects();
    initContactSectionEffects();
    initFooterEffects();
    
    // Initialize Hero Particle System
    const heroCanvas = document.getElementById('heroParticles');
    if (heroCanvas) {
        new HeroParticleSystem(heroCanvas);
    }
    
    
    // Initialize entrance animations
    initEntranceAnimations();
});


// Enhanced Entrance Animations
function initEntranceAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for entrance animations
    const animatedElements = document.querySelectorAll('.animate-fade-in-up');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
}

// ===========================
// Enhanced About Section Effects
// ===========================

// Initialize About Section Particles and Interactions
function initAboutSectionEffects() {
    createAboutParticles();
    initCardTiltEffects();
    initScrollRevealAnimations();
}

// Create floating particles for about section
function createAboutParticles() {
    const container = document.getElementById('aboutParticles');
    if (!container) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-blue-400 rounded-full opacity-30';
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animation = 'particleFloat 8s ease-in-out infinite';
        
        // Random color variation
        const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400'];
        particle.className = particle.className.replace('bg-blue-400', colors[Math.floor(Math.random() * colors.length)]);
        
        container.appendChild(particle);
    }
}

// 3D Tilt effect for cards
function initCardTiltEffects() {
    const cards = document.querySelectorAll('.perspective-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * -10; // Max 10 degrees
            const rotateY = (mouseX / rect.width) * 10;   // Max 10 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Scroll reveal animations
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for scroll reveal
    document.querySelectorAll('.perspective-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Stagger the animation
    const cards = document.querySelectorAll('.perspective-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
}

// ===========================
// Enhanced Contact Section Effects
// ===========================

// Initialize Contact Section Effects
function initContactSectionEffects() {
    createContactOrbs();
    initFloatingLabels();
    initInputGlowEffects();
    initFormValidation();
    initSocialLinkEffects();
}

// Create floating orbs for contact section
function createContactOrbs() {
    const container = document.getElementById('contactOrbs');
    if (!container) return;
    
    const orbCount = 8;
    
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'absolute rounded-full opacity-20 animate-pulse-slow';
        
        // Random size between 8px and 24px
        const size = Math.random() * 16 + 8;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        
        // Random positioning
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        orb.style.animationDelay = `${Math.random() * 6}s`;
        
        // Random color
        const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-green-400'];
        orb.classList.add(colors[Math.floor(Math.random() * colors.length)]);
        
        // Add floating animation
        orb.style.animation = `particleFloat ${8 + Math.random() * 4}s ease-in-out infinite`;
        
        container.appendChild(orb);
    }
}

// Enhanced floating labels functionality
function initFloatingLabels() {
    const inputs = document.querySelectorAll('.floating-input');
    
    inputs.forEach(input => {
        // Handle existing values on page load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Handle input events
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Handle focus events
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// Input glow effects
function initInputGlowEffects() {
    const inputGroups = document.querySelectorAll('.floating-input-group');
    
    inputGroups.forEach(group => {
        const input = group.querySelector('.floating-input');
        const glow = group.querySelector('.input-glow');
        
        if (input && glow) {
            input.addEventListener('focus', function() {
                glow.style.opacity = '0.3';
                glow.style.boxShadow = `0 0 20px ${getInputColor(this)}, 0 0 40px ${getInputColor(this)}`;
            });
            
            input.addEventListener('blur', function() {
                glow.style.opacity = '0';
                glow.style.boxShadow = 'none';
            });
        }
    });
}

// Get input color based on focus color
function getInputColor(input) {
    if (input.classList.contains('focus:border-blue-400')) return '#60a5fa';
    if (input.classList.contains('focus:border-purple-400')) return '#a78bfa';
    if (input.classList.contains('focus:border-pink-400')) return '#f472b6';
    return '#60a5fa'; // default blue
}

// Enhanced form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.floating-input-group');
    
    // Remove existing validation classes
    fieldGroup.classList.remove('field-valid', 'field-invalid');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && value === '') {
        fieldGroup.classList.add('field-invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            fieldGroup.classList.add('field-invalid');
            return false;
        }
    }
    
    // If we get here, field is valid
    if (value !== '') {
        fieldGroup.classList.add('field-valid');
    }
    
    return true;
}


// Social link hover effects
function initSocialLinkEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'absolute inset-0 rounded-2xl bg-white/20 animate-ping';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

// ===========================
// Enhanced Footer Effects
// ===========================

// Initialize Footer Effects
function initFooterEffects() {
    initBackToTop();
    initNewsletterSignup();
    initAnimatedCounters();
    initFooterLinkEffects();
}

// Back to Top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'all';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add pulse animation
        backToTopBtn.classList.add('animate-pulse');
        setTimeout(() => {
            backToTopBtn.classList.remove('animate-pulse');
        }, 1000);
    });
    
    // Initialize as hidden
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
}

// Newsletter signup functionality
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('footer form, footer .flex.flex-col');
    if (!newsletterForm) return;
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeBtn = newsletterForm.querySelector('button');
    
    if (!emailInput || !subscribeBtn) return;
    
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (!email || !isValidEmail(email)) {
            // Add error animation
            emailInput.classList.add('border-red-400');
            emailInput.style.animation = 'shake 0.5s ease-in-out';
            
            setTimeout(() => {
                emailInput.classList.remove('border-red-400');
                emailInput.style.animation = '';
            }, 1000);
            return;
        }
        
        // Show loading state
        subscribeBtn.innerHTML = `
            <svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Subscribing...
        `;
        subscribeBtn.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            subscribeBtn.innerHTML = `
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Subscribed!
            `;
            subscribeBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            subscribeBtn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-500');
            
            emailInput.value = '';
            
            // Reset after 3 seconds
            setTimeout(() => {
                subscribeBtn.innerHTML = 'Subscribe ✨';
                subscribeBtn.disabled = false;
                subscribeBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                subscribeBtn.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-500');
            }, 3000);
        }, 2000);
    });
}

// Animated counters for stats
function initAnimatedCounters() {
    const counters = document.querySelectorAll('#projectCount, #clientCount');
    
    const animateCounter = (element, target) => {
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                element.textContent = target + '+';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = element.id === 'projectCount' ? 50 : 25;
                
                // Only animate once
                if (!element.hasAttribute('data-animated')) {
                    element.setAttribute('data-animated', 'true');
                    animateCounter(element, targetValue);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Footer link hover effects
function initFooterLinkEffects() {
    const footerLinks = document.querySelectorAll('footer a');
    
    footerLinks.forEach(link => {
        // Skip if already has special handling
        if (link.closest('.social-link') || link.closest('.nav-link')) return;
        
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(4px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Tech stack tags hover effect
    const techTags = document.querySelectorAll('footer span[class*="bg-"]');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}