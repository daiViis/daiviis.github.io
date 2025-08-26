// Modern portfolio website script with enhanced functionality

// EmailJS configuration
emailjs.init("ZugXXK1wLfdxOGV0b");

// Global state
let skillsNetworkInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initMobileMenu();
    initContactForm();
    initMessageCounter();
    initSkillsNetwork();
    initCompanyLogoAnimations();
    initCodeEditor();
    initStickyNavbar();
    initLocalTime();
    
    console.log('🚀 Portfolio website loaded successfully');
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Trigger animation after element is visible
        setTimeout(() => {
            mobileMenu.classList.add('show');
        }, 10);
    }
    
    // Function to close mobile menu
    function closeMobileMenuFunc() {
        mobileMenu.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        
        // Hide element after animation completes
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
    mobileMenuBackdrop.addEventListener('click', closeMobileMenuFunc);
    
    // Close menu when clicking on navigation links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuFunc);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenuFunc();
        }
    });
}

// Company logo hover animations
function initCompanyLogoAnimations() {
    document.querySelectorAll('.company-logo').forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.filter = 'grayscale(0%) opacity(1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'grayscale(100%) opacity(0.6)';
        });
    });
}

// Skills Network Visualization (simplified for new design)
function initSkillsNetwork() {
    const canvas = document.getElementById('skillsCanvas');
    if (!canvas || skillsNetworkInitialized) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight || 400;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simple skills visualization
    const skills = [
        { name: 'React', x: 0.2, y: 0.3, color: '#61DAFB' },
        { name: 'TypeScript', x: 0.8, y: 0.2, color: '#3178C6' },
        { name: 'Node.js', x: 0.3, y: 0.7, color: '#339933' },
        { name: 'Python', x: 0.7, y: 0.8, color: '#3776AB' },
        { name: 'HTML5', x: 0.5, y: 0.4, color: '#E34F26' },
        { name: 'CSS3', x: 0.6, y: 0.6, color: '#1572B6' }
    ];
    
    let animationFrame;
    let time = 0;
    
    function animate() {
        time += 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < skills.length; i++) {
            for (let j = i + 1; j < skills.length; j++) {
                const skill1 = skills[i];
                const skill2 = skills[j];
                const x1 = skill1.x * canvas.width;
                const y1 = skill1.y * canvas.height;
                const x2 = skill2.x * canvas.width;
                const y2 = skill2.y * canvas.height;
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
        
        // Draw skill nodes
        skills.forEach((skill, index) => {
            const x = skill.x * canvas.width + Math.sin(time + index) * 10;
            const y = skill.y * canvas.height + Math.cos(time + index) * 10;
            
            // Draw node
            ctx.fillStyle = skill.color;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw label
            ctx.fillStyle = '#374151';
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(skill.name, x, y - 15);
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    skillsNetworkInitialized = true;
}

// Interactive Code Editor
function initCodeEditor() {
    const codeEditor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    if (!codeEditor || !lineNumbers) return;
    
    const STORAGE_KEY = 'heroCodeEditor_content';
    
    // Save content to localStorage
    function saveContent() {
        const content = codeEditor.innerHTML;
        localStorage.setItem(STORAGE_KEY, content);
    }
    
    // Load content from localStorage
    function loadContent() {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent) {
            codeEditor.innerHTML = savedContent;
        }
    }
    
    // Update line numbers based on content
    function updateLineNumbers() {
        const text = codeEditor.innerText || codeEditor.textContent || '';
        const lines = text.split('\n');
        // Filter out empty trailing lines that browsers sometimes add
        let lineCount = lines.length;
        if (lines[lines.length - 1] === '') {
            lineCount = Math.max(1, lineCount - 1);
        }
        
        lineNumbers.innerHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.textContent = i;
            lineDiv.className = 'leading-relaxed';
            lineNumbers.appendChild(lineDiv);
        }
    }
    
    // Add cursor behavior
    codeEditor.addEventListener('focus', function() {
        // Remove any existing cursor elements
        const existingCursors = document.querySelectorAll('.code-cursor');
        existingCursors.forEach(cursor => cursor.remove());
    });
    
    codeEditor.addEventListener('blur', function() {
        // Add blinking cursor when not focused
        if (!document.querySelector('.code-cursor')) {
            const cursor = document.createElement('span');
            cursor.className = 'code-cursor animate-pulse bg-white w-2 h-4 ml-1 inline-block';
            cursor.style.animation = 'pulse 1s infinite';
            this.appendChild(cursor);
        }
    });
    
    // Handle input changes
    codeEditor.addEventListener('input', function() {
        setTimeout(() => {
            updateLineNumbers();
            saveContent();
        }, 10);
    });
    
    // Handle key events
    codeEditor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            // Insert 4 spaces instead of tab
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const tabNode = document.createTextNode('    ');
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    
    // Handle key up events for immediate updates
    codeEditor.addEventListener('keyup', function(e) {
        if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
            setTimeout(() => {
                updateLineNumbers();
                saveContent();
            }, 10);
        }
    });
    
    // Handle paste events
    codeEditor.addEventListener('paste', function() {
        setTimeout(() => {
            updateLineNumbers();
            saveContent();
        }, 50);
    });
    
    // Initial setup
    loadContent(); // Load saved content first
    updateLineNumbers();
    codeEditor.blur();
}

// Message character counter functionality
function initMessageCounter() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const charLimit = parseInt(document.getElementById('char-limit').textContent);
    
    if (!messageTextarea) return;
    
    // Update character and word counts
    function updateCounts() {
        const text = messageTextarea.value || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        
        charCount.textContent = text.length;
        wordCount.textContent = words;
        
        // Update color based on limit
        const messageCountElement = document.getElementById('message-count');
        if (text.length > charLimit * 0.9) {
            messageCountElement.classList.add('text-red-500');
            messageCountElement.classList.remove('text-gray-500');
        } else {
            messageCountElement.classList.remove('text-red-500');
            messageCountElement.classList.add('text-gray-500');
        }
    }
    
    // Textarea event listeners
    messageTextarea.addEventListener('input', updateCounts);
    messageTextarea.addEventListener('paste', () => setTimeout(updateCounts, 0));
    
    // Initial setup
    updateCounts();
}

// Enhanced Contact Form with Three-Tier Fallback System
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const messageContent = formData.get('message').trim();
        
        // Validation
        if (!name || !email || !messageContent) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Primary: EmailJS (serverless)
            await sendViaEmailJS(name, email, messageContent);
            
        } catch (emailJSError) {
            console.error('EmailJS failed:', emailJSError);
            showMessage('Failed to send message. Please try again or contact me directly.', 'error');
            setLoadingState(false);
        }
    });
    
    // Primary method: EmailJS
    async function sendViaEmailJS(name, email, messageContent) {
        const messagePlain = stripHTML(messageContent);
        
        const templateParams = {
            from_name: name,
            from_email: email,
            message: messagePlain,
            message_html: messageContent
        };
        
        const response = await emailjs.send('service_2uq6kt8', 'template_fryqiz8', templateParams);
        
        showMessage('Thank you for contacting me, I will answer as soon as possible.', 'success');
        form.reset();
        updateCharacterCount();
        setLoadingState(false);
        
        return response;
    }
    
    // Secondary method: PHP handler
    async function sendViaPHP(name, email, messageContent) {
        const response = await fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: stripHTML(messageContent),
                message_html: messageContent
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('✨ Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            document.getElementById('richTextEditor').innerHTML = '';
            updateCharacterCount();
        } else {
            throw new Error(result.error || 'PHP handler failed');
        }
        
        setLoadingState(false);
        return result;
    }
    
    // Fallback method: mailto
    function sendViaMailto(name, email, messageContent) {
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`From: ${name} (${email})\\n\\nMessage:\\n${stripHTML(messageContent)}`);
        const mailtoLink = `mailto:david.cit1999@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        
        showMessage('Opening your email client... If it doesn\'t open automatically, please email me directly at david.cit1999@gmail.com', 'info');
        setLoadingState(false);
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function stripHTML(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    function setLoadingState(loading) {
        const submitText = submitBtn.querySelector('.submit-text');
        const loadingText = submitBtn.querySelector('.loading-text');
        const arrowIcon = submitBtn.querySelector('.arrow-icon');
        
        if (loading) {
            submitBtn.disabled = true;
            if (arrowIcon) {
                arrowIcon.textContent = '⟳';
                arrowIcon.classList.add('animate-spin');
            }
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        } else {
            submitBtn.disabled = false;
            if (arrowIcon) {
                arrowIcon.textContent = '→';
                arrowIcon.classList.remove('animate-spin');
            }
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }
    
    function showMessage(message, type) {
        statusMessage.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800', 'bg-blue-100', 'text-blue-800');
        
        switch(type) {
            case 'success':
                statusMessage.classList.add('bg-green-100', 'text-green-800');
                break;
            case 'error':
                statusMessage.classList.add('bg-red-100', 'text-red-800');
                break;
            case 'info':
                statusMessage.classList.add('bg-blue-100', 'text-blue-800');
                break;
        }
        
        statusMessage.textContent = message;
        
        // Auto hide success messages
        if (type === 'success') {
            setTimeout(() => {
                statusMessage.classList.add('hidden');
            }, 5000);
        }
    }
    
    function updateCharacterCount() {
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');
        if (charCount) charCount.textContent = '0';
        if (wordCount) wordCount.textContent = '0';
    }
}

// Intersection Observer for animations (optional enhancement)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations on load
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Sticky navbar functionality
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    const logoText = document.getElementById('logoText');
    let isScrolled = false;

    if (!navbar || !logoText) return;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeScrolled = scrollTop > 50;

        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            
            if (isScrolled) {
                navbar.classList.add('navbar-scrolled');
                logoText.style.opacity = '0';
                logoText.style.transform = 'scale(0.8)';
            } else {
                navbar.classList.remove('navbar-scrolled');
                logoText.style.opacity = '1';
                logoText.style.transform = 'scale(1)';
            }
        }
    }

    // Add scroll listener
    window.addEventListener('scroll', updateNavbar, { passive: true });
    
    // Initial check
    updateNavbar();
}

// Local time functionality for Czech Republic
function initLocalTime() {
    const timeElement = document.getElementById('localTime');
    if (!timeElement) return;
    
    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Europe/Prague',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const timeString = now.toLocaleTimeString('en-US', options);
        timeElement.textContent = timeString;
    }
    
    // Update immediately
    updateTime();
    
    // Update every minute
    setInterval(updateTime, 60000);
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms`);
    }
});