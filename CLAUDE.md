# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website built with vanilla web technologies featuring advanced interactive animations and a multi-tier email contact system. The website showcases digital skills through animated visualizations and provides seamless user engagement with particle systems, 3D effects, and dynamic content.

## Development Commands

### Local Development Server
```bash
# Primary development server (recommended)
python server.py

# Alternative methods
python -m http.server 8000
npx serve .
php -S localhost:8000
```

The Python server (`server.py`) is preferred as it includes CORS headers for local development. The server starts at `http://localhost:8000` and automatically opens the browser.

### Testing Email Functionality
```bash
# Test PHP email capabilities on servers with PHP support
# Access: http://localhost:8000/test_email.php
```

## Architecture and Structure

### Core Technologies
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (loaded via CDN)
- **Email System**: Triple-fallback approach (EmailJS → PHP → mailto)
- **Animation Engine**: Custom Canvas-based particle systems with WebGL acceleration
- **3D Graphics**: Three.js for advanced visual effects

### File Structure
```
├── index.html              # Main application (single-page website)
├── script.js              # Core application logic and animations
├── send_email.php          # PHP email fallback handler
├── test_email.php          # Email functionality testing utility
├── server.py              # Local development server with CORS
├── privacy-policy.html     # Privacy policy page
├── terms-of-service.html   # Terms of service page
└── README.md              # Project documentation
```

### Key Components Architecture

#### Animation Systems (`script.js`)
- **HeroParticleSystem**: Interactive particle field with mouse tracking
- **Dynamic Code Animation**: Real-time code typing effects with syntax highlighting
- **Skills Network Visualization**: Logical relationship mapping between technologies
- **3D Perspective Effects**: Mouse-driven tilt and rotation animations
- **Scroll-based Animations**: Intersection Observer-powered entrance effects

#### Contact Form System
**Three-tier fallback approach:**
1. **Primary**: EmailJS serverless email service (`service_2uq6kt8`, `template_fryqiz8`)
2. **Secondary**: PHP email handler (`send_email.php`) with proper validation and CORS
3. **Fallback**: Mailto link activation

#### Visual Effects Pipeline
- Canvas-based particle systems with optimized rendering
- GPU-accelerated blur and glow effects
- Responsive 3D transformations
- Dynamic gradient animations
- Real-time mouse interaction tracking

## Development Patterns

### Animation Implementation
- Use `requestAnimationFrame` for smooth 60fps animations
- Implement particle systems with collision detection and avoidance paths
- Apply intersection observers for scroll-triggered animations
- Use CSS transforms with `will-change` for GPU optimization

### Form Handling
- Real-time validation with visual feedback
- Progressive enhancement (works without JavaScript)
- ARIA accessibility attributes for screen readers
- Proper error handling with user-friendly messages

### Responsive Design
- Mobile-first approach with progressive enhancement
- Touch-friendly interaction areas (minimum 44px)
- Reduced motion support via `prefers-reduced-motion`
- High contrast mode support

## EmailJS Configuration

The contact form uses EmailJS with these specific identifiers:
- **Public Key**: `ZugXXK1wLfdxOGV0b`
- **Service ID**: `service_2uq6kt8`
- **Template ID**: `template_fryqiz8`

Template parameters:
- `from_name`: Sender's name
- `from_email`: Sender's email
- `message`: Message content

## Performance Considerations

### Optimization Strategies
- Canvas rendering uses optimized draw calls with object pooling
- Particle systems implement culling for off-screen elements
- CSS animations use `transform` and `opacity` for composite layer acceleration
- JavaScript uses debounced event handlers for scroll/resize events

### Loading Strategy
- Tailwind CSS loaded via CDN for development (consider compilation for production)
- Three.js loaded only when needed
- Progressive image loading with blur-up technique
- Preload critical fonts (Inter, Space Grotesk, Plus Jakarta Sans)

## Deployment Environments

### PHP-Enabled Hosting (Full Functionality)
- 000webhost.com
- InfinityFree.net
- AwardSpace.com

### Static Hosting (EmailJS Only)
- Netlify
- Vercel
- GitHub Pages

### Local Development
- Python server with CORS support
- PHP built-in server for testing email functionality

## Browser Support

- **Modern ES6+ browsers** (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- **Progressive enhancement** for older browsers
- **WebGL support** required for advanced particle effects
- **Canvas 2D** fallback for basic animations

## Security Considerations

### Email Handling
- Server-side validation and sanitization in PHP handler
- CORS headers properly configured
- No sensitive data exposure in client-side code
- Rate limiting should be implemented on production servers

### Content Security
- All external resources loaded via HTTPS
- No inline JavaScript execution
- Proper input validation and escaping

## Git & Version Control
- This is the GitHub repo for this project where we upload the files and changes https://github.com/daiViis/daiviis.github.io-dev
- https://github.com/daiViis/daiviis.github.io this is the public repo for this project where we upload or merge files only with my permission.
- Add and commit automatically whenever an entire task is finished
- Use descriptive commit messages that capture the full scope of changes