# Analytics System - Supabase Setup

## Required Supabase Table Schema

Run this SQL in your Supabase SQL Editor to create the analytics table:

```sql
-- Create page_analytics table for tracking website visits
CREATE TABLE IF NOT EXISTS page_analytics (
    id SERIAL PRIMARY KEY,
    page_url VARCHAR(500) NOT NULL,
    page_title VARCHAR(200),
    visitor_id VARCHAR(100) NOT NULL,
    session_id VARCHAR(100) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    referrer VARCHAR(500),
    user_agent TEXT,
    screen_width INTEGER,
    screen_height INTEGER,
    viewport_width INTEGER,
    viewport_height INTEGER,
    language VARCHAR(10),
    timezone VARCHAR(50),
    is_mobile BOOLEAN DEFAULT FALSE,
    is_bot BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_analytics_page_url ON page_analytics(page_url);
CREATE INDEX IF NOT EXISTS idx_page_analytics_visitor_id ON page_analytics(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_analytics_timestamp ON page_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_analytics_session_id ON page_analytics(session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT for anonymous users (for tracking)
CREATE POLICY "Allow anonymous insert" ON page_analytics
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow SELECT for authenticated users (for dashboard)
CREATE POLICY "Allow authenticated select" ON page_analytics
    FOR SELECT TO authenticated
    USING (true);

-- Optional: Create policy to allow SELECT for anon users (if dashboard is public)
CREATE POLICY "Allow anonymous select" ON page_analytics
    FOR SELECT TO anon
    USING (true);

-- Create chatbot_analytics table for tracking chatbot interactions
CREATE TABLE IF NOT EXISTS chatbot_analytics (
    id SERIAL PRIMARY KEY,
    visitor_id VARCHAR(100) NOT NULL,
    session_id VARCHAR(100) NOT NULL,
    chat_session_id VARCHAR(100) NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'chat_session_start', 'message', 'chat_session_end'
    message_sender VARCHAR(20), -- 'user' or 'assistant'
    message_length INTEGER,
    message_count INTEGER DEFAULT 0,
    session_duration INTEGER DEFAULT 0, -- in seconds
    end_reason VARCHAR(50), -- 'user_action', 'chat_reset', 'page_unload', 'tab_hidden'
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    page_url VARCHAR(500),
    user_agent TEXT,
    language VARCHAR(10),
    timezone VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for chatbot analytics
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_visitor_id ON chatbot_analytics(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_chat_session_id ON chatbot_analytics(chat_session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_timestamp ON chatbot_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_event_type ON chatbot_analytics(event_type);

-- Enable Row Level Security (RLS) for chatbot analytics
ALTER TABLE chatbot_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT for anonymous users (for tracking)
CREATE POLICY "Allow anonymous insert chatbot" ON chatbot_analytics
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow SELECT for authenticated users (for dashboard)
CREATE POLICY "Allow authenticated select chatbot" ON chatbot_analytics
    FOR SELECT TO authenticated
    USING (true);

-- Optional: Create policy to allow SELECT for anon users (if dashboard is public)
CREATE POLICY "Allow anonymous select chatbot" ON chatbot_analytics
    FOR SELECT TO anon
    USING (true);

-- Create RPC function to get first user messages for conversation starter analysis
CREATE OR REPLACE FUNCTION get_first_user_messages(start_date timestamptz, end_date timestamptz)
RETURNS TABLE(topic text, count bigint) AS $$
BEGIN
    RETURN QUERY
    WITH first_messages AS (
        SELECT 
            chat_session_id,
            ROW_NUMBER() OVER (PARTITION BY chat_session_id ORDER BY timestamp) as rn
        FROM chatbot_analytics 
        WHERE 
            event_type = 'message' 
            AND message_sender = 'user'
            AND timestamp >= start_date 
            AND timestamp <= end_date
    ),
    message_analysis AS (
        SELECT 
            CASE 
                WHEN message_length > 100 THEN 'Detailed Questions'
                WHEN message_length > 50 THEN 'Service Inquiries'
                WHEN message_length > 20 THEN 'Quick Questions'
                ELSE 'Greetings'
            END as topic_category
        FROM chatbot_analytics c
        JOIN first_messages fm ON c.chat_session_id = fm.chat_session_id
        WHERE fm.rn = 1 AND c.event_type = 'message' AND c.message_sender = 'user'
    )
    SELECT 
        topic_category as topic,
        COUNT(*) as count
    FROM message_analysis
    GROUP BY topic_category
    ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the above SQL script
4. Verify both tables (`page_analytics` and `chatbot_analytics`) were created in Table Editor

## Page Analytics Table Structure

- **id**: Unique identifier for each page view
- **page_url**: Full URL of the visited page
- **page_title**: Title of the page
- **visitor_id**: Anonymous unique identifier for visitor (stored in localStorage)
- **session_id**: Session identifier (30min timeout)
- **timestamp**: When the page view occurred
- **referrer**: Where the visitor came from
- **user_agent**: Browser and device information
- **screen_width/height**: Screen resolution
- **viewport_width/height**: Browser viewport size
- **language**: Browser language
- **timezone**: User's timezone
- **is_mobile**: Whether visitor is on mobile device
- **is_bot**: Bot detection flag
- **created_at**: Record creation timestamp

## Chatbot Analytics Table Structure

- **id**: Unique identifier for each chatbot event
- **visitor_id**: Anonymous unique identifier for visitor (matches page analytics)
- **session_id**: Session identifier (matches page analytics)
- **chat_session_id**: Unique identifier for each chat session
- **event_type**: Type of event ('chat_session_start', 'message', 'chat_session_end')
- **message_sender**: Who sent the message ('user' or 'assistant')
- **message_length**: Length of the message in characters
- **message_count**: Number of messages in the session so far
- **session_duration**: Duration of chat session in seconds
- **end_reason**: Reason session ended ('user_action', 'chat_reset', 'page_unload', 'tab_hidden')
- **timestamp**: When the event occurred
- **page_url**: URL where the chat occurred
- **user_agent**: Browser and device information
- **language**: Browser language
- **timezone**: User's timezone
- **created_at**: Record creation timestamp

## RPC Functions

- **get_first_user_messages(start_date, end_date)**: Analyzes first user messages to categorize conversation starters

## Policies

Both tables use Row Level Security with policies that:
- Allow anonymous users to INSERT tracking data
- Allow SELECT queries for the dashboard (adjust based on your needs)

## Next Steps

After creating both tables, the analytics trackers will automatically start saving data:
- Page analytics data from the analytics tracker
- Chatbot analytics data from the FAQ chatbot

The analytics dashboard will then display comprehensive statistics from both data sources.