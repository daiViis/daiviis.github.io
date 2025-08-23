# David's Portfolio Website

A modern, responsive portfolio website featuring animated backgrounds, interactive elements, and a contact form system.

## Project Overview

This is a single-page portfolio website built with vanilla web technologies. The site showcases professional skills through interactive visualizations and provides multiple contact methods for visitors.

## Core Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Animated Background**: Dynamic code typing animation in the background
- **Interactive Skills Display**: Filterable skills arsenal with network visualization
- **Contact Form System**: Multi-tier fallback email system
- **Modern UI Elements**: Glassmorphism effects and smooth animations
- **Performance Optimized**: Efficient rendering and minimal resource usage

## Page Structure

The website consists of a single HTML page (`index.html`) with the following sections:

1. **Header Section**: Navigation menu and main title
2. **Hero Section**: Introduction with animated background
3. **Skills Section**: Interactive skills network with filterable arsenal display
4. **Contact Section**: Multi-fallback contact form
5. **Footer Section**: Additional links and information

### Additional Pages

- **Privacy Policy** (`privacy-policy.html`): Data handling and privacy information
- **Terms of Service** (`terms-of-service.html`): Terms and conditions for website usage

## Contact Form Implementation

The contact form implements a three-tier fallback system:

1. **Primary**: EmailJS serverless email service for reliable delivery
2. **Secondary**: PHP email handler (`send_email.php`) for web servers with PHP support
3. **Fallback**: Mailto link that opens the user's default email client

## Development Setup

### Local Development Server

The project includes a Python development server for local testing:

```bash
python server.py
```

This will start a local server at `http://localhost:8000`

### Alternative Development Methods

```bash
# Python 3 built-in server
python -m http.server 8000

# Node.js serve package
npx serve .

# PHP built-in server
php -S localhost:8000
```

### Direct File Access

Opening `index.html` directly in a browser will work, but the contact form will use the mailto fallback method.

## Deployment

### PHP-Enabled Hosting

For full functionality including the PHP email handler:

- **000webhost.com**: Free hosting with PHP support
- **InfinityFree.net**: Free PHP hosting service
- **AwardSpace.com**: Free PHP hosting with email support

### Static Hosting

For platforms without PHP support:

- **Netlify**: Drag-and-drop deployment with automatic form handling
- **Vercel**: GitHub integration with automatic deployments
- **GitHub Pages**: Repository-based hosting for static content (uses master branch)

## File Structure

```
david-cit/
├── index.html          # Main website page
├── script.js          # JavaScript functionality and animations
├── send_email.php     # PHP email processing script (fallback)
├── server.py          # Local development server
├── test_email.php     # Email testing utility
├── privacy-policy.html # Privacy policy page
├── terms-of-service.html # Terms of service page
├── CLAUDE.md          # Development notes
├── EMAILJS_SETUP.md   # EmailJS service configuration
└── README.md          # Project documentation
```

## Technical Specifications

- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES6+)
- **Styling Framework**: Tailwind CSS via CDN
- **Animation System**: CSS keyframes with JavaScript timing control
- **Email Processing**: EmailJS serverless service with PHP mail() fallback
- **Browser Support**: Modern browsers with ES6+ support
- **Performance**: Optimized canvas rendering and GPU-accelerated effects

## Performance Considerations

- The skills network visualization uses optimized rendering for smooth interactions
- Blur effects are GPU-accelerated where browser support allows
- Tailwind CSS is loaded via CDN for development; consider compiling for production
- Form submissions include proper loading states and error handling

## Contact Information

For questions about this project or collaboration opportunities:

**Email**: david.cit1999@gmail.com

---

*Last updated: August 2025*