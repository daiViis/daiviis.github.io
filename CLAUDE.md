# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development Server
```bash
python server.py
```
Starts a local HTTP server at http://localhost:8000 with CORS headers enabled for testing the contact form functionality.

### Alternative Local Servers
```bash
# Python built-in server (basic functionality)
python -m http.server 8000

# Node.js serve (if available)
npx serve .

# PHP built-in server (enables PHP contact form)
php -S localhost:8000
```

### Testing Contact Form
```bash
php test_email.php
```
Test script to verify PHP mail functionality on the server.

## Architecture Overview

This is a modern single-page portfolio website built with vanilla web technologies, featuring a three-tier contact form system and interactive skills visualization.

### Core Components

1. **HeroParticleSystem** (`script.js:1-130`)
   - Canvas-based particle animation system
   - Mouse interaction with particle attraction
   - Responsive to window resize events

2. **SkillsNetwork** (`script.js:978-1200+`)
   - Interactive network visualization of technical skills
   - Logical connections between related technologies
   - Filterable skills arsenal display
   - Canvas-based rendering with smooth animations

3. **Contact Form System** (Three-tier fallback)
   - Primary: EmailJS integration (`script.js` - emailjs functions)
   - Secondary: PHP handler (`send_email.php`)
   - Fallback: Native mailto links

### Key Architecture Patterns

- **Vanilla JavaScript Classes**: No framework dependencies, using ES6+ class syntax
- **Canvas Animation Systems**: Multiple canvas-based visualizations with optimized rendering
- **Progressive Enhancement**: Contact form degrades gracefully across different hosting environments
- **Responsive Design**: Tailwind CSS with custom responsive breakpoints

### File Structure Importance

```
├── index.html          # Single-page application entry point
├── script.js          # All interactive functionality (2000+ lines)
├── send_email.php     # Server-side contact form handler
├── server.py          # Development server with CORS support
└── test_email.php     # Email functionality testing utility
```

## Contact Form Implementation Details

The contact form uses a sophisticated fallback system:

1. **EmailJS Service**: Serverless email delivery (primary method)
   - Service ID: `service_2uq6kt8`
   - Template ID: `template_fryqiz8`
   - User ID: `ZugXXK1wLfdxOGV0b`

2. **PHP Handler**: Server-side processing with comprehensive error handling
   - CORS-enabled for cross-origin requests
   - Input validation and sanitization
   - Plain text email format for maximum compatibility

3. **Mailto Fallback**: Opens user's default email client as final resort

## Skills Network System

The interactive skills visualization (`initializeSkillsNetwork()`) creates a logical network of technical capabilities:

- **Layered Architecture**: Core → Frameworks → Tools → Advanced
- **Connection Types**: foundation, dependency, evolution, runtime, framework, styling, workflow, bundling, automation, generation, design
- **Dynamic Interactions**: Hover effects, connection highlighting, responsive positioning

## Development Notes

- **No Build Process**: Direct file serving, no compilation required
- **No Testing Framework**: Manual testing via browser and PHP test script
- **No Linting Setup**: Code follows vanilla JS standards
- **Dependencies**: Only EmailJS via CDN and Tailwind CSS via CDN

## Deployment Considerations

- **Static Hosting**: Works on Netlify, Vercel, GitHub Pages (EmailJS only)
- **PHP Hosting**: Full functionality on PHP-enabled servers
- **Local Development**: Python server recommended for testing contact form

## Browser Compatibility

- Modern browsers with ES6+ support required
- Canvas API dependency for animations
- Fetch API for contact form submission

# Important to remember

## GIT & Version Control
- This is the REPO on GitHub for this project: https://github.com/daiViis/daiviis.github.io-dev. Upload only into 'dev' branch.
- Always create small yet relevant notes about recent changes for push. Use bullets to make it look organize.
- Ask for PUSH from @.claude/push-to-repo command after every change in the project.