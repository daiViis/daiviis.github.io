# 🚀 Supabase Database Setup Guide

## Step 1: Create Supabase Account & Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"** and sign up (free)
3. **Create a new project:**
   - Organization: Create new or use existing
   - Name: `feedback-system` (or your choice)
   - Database Password: Create a strong password
   - Region: Choose closest to your users
   - Pricing Plan: **Free** (perfect for feedback system)

## Step 2: Create the Database Table

1. **Go to your Supabase dashboard**
2. **Click "SQL Editor"** in the left sidebar
3. **Click "New Query"**
4. **Copy and paste this SQL code:**

```sql
-- Create feedback_submissions table
CREATE TABLE feedback_submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Customer Information
  customer_name VARCHAR(255),
  customer_website VARCHAR(255),
  customer_ref VARCHAR(255),
  
  -- Ratings (1-5 scale)
  process_rating INTEGER CHECK (process_rating >= 1 AND process_rating <= 5),
  product_rating INTEGER CHECK (product_rating >= 1 AND product_rating <= 5),
  recommendation_rating INTEGER CHECK (recommendation_rating >= 1 AND recommendation_rating <= 5),
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  average_rating DECIMAL(3,1),
  
  -- Comments and Permissions
  comments TEXT,
  share_permission BOOLEAN DEFAULT FALSE,
  
  -- Meta Information
  submission_date VARCHAR(50),
  submission_time VARCHAR(50),
  page_url TEXT,
  user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_customer_ref ON feedback_submissions(customer_ref);
CREATE INDEX idx_created_at ON feedback_submissions(created_at);
CREATE INDEX idx_average_rating ON feedback_submissions(average_rating);
CREATE INDEX idx_share_permission ON feedback_submissions(share_permission);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for feedback submission)
CREATE POLICY "Allow public inserts" ON feedback_submissions
    FOR INSERT WITH CHECK (true);

-- Create policy to allow public reads (for displaying ratings)
CREATE POLICY "Allow public reads" ON feedback_submissions
    FOR SELECT USING (true);

-- Insert a test record to verify everything works
INSERT INTO feedback_submissions (
    customer_name,
    customer_website,
    customer_ref,
    process_rating,
    product_rating,
    recommendation_rating,
    overall_rating,
    average_rating,
    comments,
    share_permission,
    submission_date,
    submission_time,
    page_url
) VALUES (
    'Test Customer',
    'example.com',
    'TEST_001',
    5,
    5,
    5,
    5,
    5.0,
    'This is a test feedback entry to verify the database setup.',
    true,
    '2025-08-27',
    '12:00:00',
    'https://yoursite.com/feedback/'
);
```

5. **Click "RUN"** to execute the SQL
6. **Verify success:** You should see "Success. No rows returned"

## Step 3: Get Your API Credentials

1. **Go to "Settings"** in the left sidebar
2. **Click "API"**
3. **Copy these two values:**
   - **Project URL** (starts with `https://`)
   - **Project API keys → anon public** (starts with `eyJ`)

## Step 4: Configure Your Website

1. **Open** `feedback/database-config.js` in your website
2. **Replace the placeholder values:**

```javascript
// Replace these with your actual Supabase credentials
supabaseUrl: 'https://your-project.supabase.co', // Your Project URL
supabaseKey: 'your-anon-key-here', // Your anon/public key
```

**Example:**
```javascript
supabaseUrl: 'https://abcdefghijk.supabase.co',
supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMjE2MDAsImV4cCI6MjAwODg5NzYwMH0.example',
```

## Step 5: Test the Setup

1. **Go to your feedback page:** `yoursite.com/feedback/`
2. **You should see:** "✅ Database connected successfully" message
3. **Submit test feedback** with high ratings
4. **Check Supabase dashboard:**
   - Go to "Table Editor"
   - Click "feedback_submissions"
   - You should see your test submission!

## Step 6: Verify Rich Snippets Update

1. **Go to your main website** (`yoursite.com`)
2. **The star ratings should now reflect real database data**
3. **All visitors will see the same ratings**

## 🔧 Troubleshooting

### "Database connection failed" error:
- ✅ Double-check your URL and API key
- ✅ Make sure URL starts with `https://`
- ✅ Make sure API key is the **anon/public** key (not service_role)
- ✅ Check browser console for detailed error messages

### "Failed to save feedback" error:
- ✅ Verify the SQL table was created correctly
- ✅ Check that RLS policies were applied
- ✅ Try the test insert SQL again

### Ratings not updating on main site:
- ✅ Clear browser cache and reload
- ✅ Check browser console for errors
- ✅ Verify Rich Snippets integration script is loaded

## 📊 Viewing Your Feedback Data

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor" 
3. Click "feedback_submissions"
4. View all submissions in a spreadsheet format

### Option 2: Export Data
1. In Table Editor, click the export button
2. Download as CSV for analysis in Excel/Google Sheets

### Option 3: SQL Queries
Use the SQL Editor to run custom queries:

```sql
-- Get average rating by month
SELECT 
    DATE_TRUNC('month', created_at) as month,
    AVG(average_rating) as avg_rating,
    COUNT(*) as submission_count
FROM feedback_submissions 
GROUP BY month 
ORDER BY month DESC;

-- Get all shareable testimonials
SELECT customer_name, customer_website, comments, average_rating, created_at
FROM feedback_submissions 
WHERE share_permission = true 
ORDER BY average_rating DESC, created_at DESC;

-- Get ratings breakdown
SELECT 
    process_rating,
    product_rating, 
    recommendation_rating,
    COUNT(*) as count
FROM feedback_submissions
GROUP BY process_rating, product_rating, recommendation_rating
ORDER BY count DESC;
```

## 🎯 Next Steps

Once setup is complete:
- ✅ All feedback will be stored permanently in Supabase
- ✅ Your star ratings will be consistent for all visitors
- ✅ You can analyze trends and export data
- ✅ You can build additional features (admin dashboard, reports, etc.)

## 💰 Free Tier Limits

Supabase free tier includes:
- ✅ 500MB database storage (thousands of feedback submissions)
- ✅ 50,000 monthly requests (way more than you'll need)
- ✅ No time limit (free forever)

**You're all set!** 🚀