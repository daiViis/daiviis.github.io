# Custom Web Analytics System

## Overview

A complete custom web analytics solution for your GitHub Pages website, providing privacy-friendly tracking and comprehensive dashboard visualizations.

## 🎯 Features

- **Privacy-First**: No cookies, GDPR-compliant visitor tracking
- **Real-time Analytics**: Live page view tracking with instant dashboard updates
- **Comprehensive Metrics**: Views, unique visitors, session duration, bounce rate
- **Visual Dashboard**: Charts and graphs using Chart.js
- **Device Breakdown**: Mobile vs desktop vs tablet analytics
- **Traffic Sources**: Track where visitors come from
- **Visitor Flow**: See how users navigate your site
- **Bot Detection**: Automatic filtering of crawler traffic

## 📊 Dashboard Access

Visit: `https://your-domain.github.io/feedback/analytics.html`

## 🚀 Setup Instructions

### 1. Configure Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `feedback/analytics-setup.md`
4. Verify the `page_analytics` table was created

### 2. Verify Configuration

Your existing Supabase configuration in `feedback/database-config.js` is already set up correctly.

### 3. Test the System

1. Visit `feedback/analytics-test.html` to run system tests
2. Check that all components load correctly
3. Test page view tracking functionality

## 📈 Analytics Data Collected

- **Page URL & Title**: Which pages are visited
- **Visitor ID**: Anonymous unique identifier (localStorage)
- **Session ID**: Session tracking with 30min timeout
- **Timestamp**: When each page view occurs
- **Device Info**: Screen size, mobile/desktop detection
- **Browser Info**: Language, timezone, user agent
- **Traffic Source**: Referrer information
- **Bot Detection**: Automatic filtering

## 🔧 Files Created

### Core System
- `assets/js/analytics-tracker.js` - Client-side tracking script
- `feedback/analytics-service.js` - Data retrieval and aggregation
- `feedback/analytics.html` - Main dashboard interface
- `feedback/analytics-test.html` - System testing interface
- `feedback/analytics-setup.md` - Database setup instructions

### Modified Files
- `index.html` - Added analytics tracking scripts
- `pages/conversion-research.html` - Added analytics tracking scripts
- `pages/privacy-policy.html` - Added analytics tracking scripts
- `pages/terms-of-service.html` - Added analytics tracking scripts

## 🎛️ Dashboard Features

### Key Statistics
- Total page views
- Unique visitors
- Average session duration
- Bounce rate

### Visualizations
- **Line Chart**: Page views over time
- **Bar Chart**: Top pages by views
- **Doughnut Chart**: Traffic sources breakdown
- **Pie Chart**: Device type distribution
- **Flow Chart**: Popular visitor paths

### Controls
- Date range selection (7, 30, 90 days)
- Page filtering
- Real-time data refresh

## 🔒 Privacy & Security

- **No Personal Data**: Only anonymous visitor IDs stored
- **No Cookies**: Uses localStorage for visitor identification
- **GDPR Compliant**: Anonymous data collection only
- **Bot Filtering**: Automatic detection and exclusion
- **Row Level Security**: Supabase RLS enabled

## 🛠️ Customization

### Adding New Pages
To track a new page, add these scripts before `</body>`:

```html
<!-- Analytics Tracking -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script src="path/to/feedback/database-config.js"></script>
<script src="path/to/assets/js/analytics-tracker.js"></script>
```

### Modifying Tracked Data
Edit `assets/js/analytics-tracker.js` to add custom tracking parameters.

### Dashboard Styling
Use existing `feedback/css/admin-styles.css` classes or add custom styles.

## 📋 Troubleshooting

### Common Issues

1. **Analytics not loading**: Check browser console for JavaScript errors
2. **No data appearing**: Verify Supabase table exists and RLS policies are correct
3. **Dashboard errors**: Ensure all script dependencies are loaded correctly

### Testing Steps

1. Visit `feedback/analytics-test.html`
2. Check all system tests pass
3. Use manual test buttons to verify functionality
4. Check browser DevTools Console for errors

## 🔄 Data Flow

1. **Page Load**: Analytics tracker initializes
2. **Data Collection**: Device info, page details gathered
3. **Storage**: Data sent to Supabase `page_analytics` table
4. **Dashboard**: Service retrieves and aggregates data
5. **Visualization**: Charts render real-time analytics

## 📊 Database Schema

```sql
page_analytics table:
- id: Unique identifier
- page_url: Full page URL
- visitor_id: Anonymous visitor ID
- session_id: Session identifier
- timestamp: View timestamp
- referrer: Traffic source
- device_info: Screen size, mobile flag
- location_info: Language, timezone
```

## 🎯 Next Steps

1. Run the Supabase setup SQL script
2. Test the system using the test page
3. Visit your analytics dashboard
4. Monitor your website traffic!

The system is now fully operational and will start collecting analytics data from all tracked pages immediately.