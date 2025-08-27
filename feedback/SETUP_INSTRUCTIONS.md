# Customer Feedback System Setup Instructions

## Overview
This feedback system collects customer ratings and comments, then integrates with your existing EmailJS setup to send structured feedback data.

## EmailJS Template Setup

### ✅ Feedback Template Configured
The system is now configured to use your dedicated feedback template:
- **Template ID**: `template_wi5yknj`
- **Service ID**: `service_2uq6kt8` 
- **Template Location**: `emailjs-feedback-template.html`

The system automatically tries the feedback template first, and falls back to the contact template if there are any issues.

### Option 2: Modify Existing Template (Quick Start)
If you want to use your existing contact form template temporarily:
1. The system will send feedback data using contact form fields
2. Parameters are mapped as follows:
   - `from_name` → Customer name
   - `from_email` → "feedback@yoursite.com" 
   - `message` → Formatted feedback with all ratings and comments
   - `project_type` → "Customer Feedback"

## Template Parameters
The feedback system sends these parameters to EmailJS:

### Customer Information
- `customer_name` - Customer's name (optional)
- `customer_company` - Customer's company (optional)
- `customer_ref` - Customer reference ID from URL parameter

### Ratings (1-5 scale)
- `process_rating` - Development process satisfaction
- `product_rating` - Final product quality rating
- `recommendation_rating` - Likelihood to recommend
- `overall_rating` - Overall experience rating
- `average_rating` - Calculated average of all ratings

### Comments & Meta
- `comments` - Customer's additional feedback
- `submission_date` - Date of submission
- `submission_time` - Time of submission
- `page_url` - URL where feedback was submitted from

## Configuration Steps

### 1. EmailJS Setup
- Service ID: `service_2uq6kt8` (already configured)
- Public Key: `ZugXXK1wLfdxOGV0b` (already configured)
- Template ID: Update in `feedback.js` if using new template

### 2. URL Parameters for Customer Identification
Customers can be directed to the feedback page with URL parameters:
- `yoursite.com/feedback/?customer=PROJECT123`
- `yoursite.com/feedback/?ref=CLIENT_NAME`
- `yoursite.com/feedback/?id=UNIQUE_ID`

### 3. Rich Snippets Integration
The system automatically:
- Stores feedback in localStorage
- Calculates running averages
- Can update main site ratings (see integration instructions)

### 4. Preventing Duplicate Submissions
- Uses localStorage to track submissions per customer reference
- Allows resubmission after 30 days
- Shows appropriate messages for duplicate attempts

## Usage Instructions

### For Customers
1. Send customers the link: `yoursite.com/feedback/?customer=THEIR_REF`
2. They complete 3 rating questions + overall rating
3. Optional comment section
4. Thank you page with summary

### For You
1. Receive formatted email with all feedback data
2. Data is stored locally for Rich Snippets integration
3. Can analyze trends and improvements needed

## Customization Options

### 1. Questions
Edit the questions in `feedback/index.html`:
- Lines 45-55: Development process question
- Lines 58-68: Product satisfaction question  
- Lines 71-81: Recommendation question

### 2. Styling
All styling uses Tailwind CSS and can be customized:
- Star ratings: Modify CSS in `<style>` section
- Colors: Update Tailwind classes throughout
- Layout: Modify grid and spacing classes

### 3. Email Template
Customize `emailjs-feedback-template.html`:
- Add your branding
- Modify sections and styling
- Add additional fields if needed

## Integration with Main Site

### Option 1: Manual Updates
1. Review feedback emails regularly
2. Calculate new average ratings
3. Update Rich Snippets in `index.html` manually

### Option 2: Automated Updates (Advanced)
The JavaScript stores data in localStorage:
```javascript
// Get current site ratings
const avgRating = localStorage.getItem('site_average_rating');
const reviewCount = localStorage.getItem('site_review_count');

// Use these to update Rich Snippets dynamically
```

## Troubleshooting

### Common Issues
1. **EmailJS not sending**: Check service ID and template ID
2. **Stars not working**: Ensure JavaScript is loaded properly
3. **Styles broken**: Verify Tailwind CSS is loaded
4. **Duplicate prevention not working**: Check localStorage permissions

### Testing
1. Test with different customer references
2. Verify email delivery
3. Check localStorage data storage
4. Test on mobile devices

## Security Considerations
- No sensitive data is collected
- All data is sent via EmailJS (encrypted)
- Rate limiting prevents spam
- Input validation prevents XSS

## ✅ Database Integration Complete!

**Supabase** has been implemented as your database solution.

## Quick Setup Steps:

### 1. **Database Setup** (5 minutes)
- Follow instructions in `SUPABASE_SETUP.md`
- Create free Supabase account
- Copy-paste the SQL schema
- Get your API credentials

### 2. **Configure Your Site**
- Edit `feedback/database-config.js`
- Add your Supabase URL and API key
- That's it! 🎉

## What You Get:

### ✅ **Centralized Storage**
- All feedback stored in one database
- Every visitor sees the same ratings
- No more localStorage inconsistencies

### ✅ **Admin Dashboard** 
- View all submissions at `/feedback/admin-dashboard.html`
- Filter by rating, date, shareable status
- Export to CSV for analysis

### ✅ **Rich Snippets Integration**
- Automatically fetches real data from database
- Updates Google search results
- Consistent ratings for all users

### ✅ **Robust System**
- Database-first, localStorage fallback
- Email notifications still work
- Handles errors gracefully

## 🚀 Ready to Deploy!
Once you complete the Supabase setup, your feedback system will be enterprise-ready with real database storage!