# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development Server
- `python server.py` - Start local HTTP server on port 8000 with CORS headers
- `python -m http.server 8000` - Alternative HTTP server (basic)
- `php -S localhost:8000` - PHP development server (if PHP available)

### Testing Email Functionality
- `test_email.php` - Test script to verify PHP mail() function works on server
- Contact form has 3-tier fallback: PHP mail → Netlify forms → mailto

## Architecture Overview

### Frontend Structure
- **Single Page Application**: Vanilla HTML/CSS/JS with no build process
- **Styling Framework**: Tailwind CSS via CDN with custom theme extensions
- **JavaScript Architecture**: Modular functions in single `script.js` file
- **Responsive Design**: Mobile-first approach with breakpoint-specific animations

### Key Components

#### Animation Systems
1. **Dynamic Code Typing**: Real-time code snippet animation with erase/retype cycle
2. **Neural Network Canvas**: Interactive skills visualization with mouse tracking
3. **Particle Field**: Dynamic floating particles with mouse interaction
4. **3D Mouse Tracking**: Parallax and rotation effects based on cursor position

#### Contact Form System
Multi-layered email handling:
1. **EmailJS Integration**: Serverless email via EmailJS service (primary)
2. **PHP Fallback**: `send_email.php` for traditional web hosting
3. **Mailto Fallback**: Client email application as last resort

### Technical Implementation Details

#### Performance Optimizations
- Neural network uses pre-calculated paths to avoid expensive collision detection
- Canvas animations use `requestAnimationFrame` for smooth 60fps rendering
- Particle interactions are distance-based to reduce computation

#### Skills Data Structure
```javascript
skillsData = {
  core: [...],        // HTML, CSS, JS
  frameworks: [...],  // React, TypeScript, Tailwind
  backend: [...],     // Node.js
  tools: [...],       // Git, Pack (bundling tools)
  advanced: [...]     // LLM, Photoshop
}
```

Connections define logical relationships between technologies with types:
- `foundation`: Core dependencies
- `dependency`: Direct technical requirements  
- `evolution`: Language/framework progressions
- `workflow`: Development process tools

#### Mouse Interaction Zones
- Canvas hover triggers glow effects and connection highlighting
- Particle field responds within 100px radius
- Code elements have distance-based blur effects

## File Purposes

- `index.html` - Complete single-page website with inline Tailwind config
- `script.js` - All JavaScript functionality (animations, interactions, form handling)
- `send_email.php` - Server-side email processing with error handling
- `server.py` - Local development server with CORS support
- `EMAILJS_SETUP.md` - Setup guide for EmailJS configuration (Czech language)
- `test_email.php` - Email functionality testing script

## Deployment Considerations

### Static Hosting (Recommended)
Works on Netlify, Vercel, GitHub Pages - uses EmailJS for contact form

### PHP Hosting
Upload all files to PHP-enabled hosting - uses `send_email.php` for contact form

### Local Development
Use `python server.py` for best local experience with proper CORS headers
- git repo for this project is https://github.com/daiViis/daiviis.github.io