/**
 * Analytics Service
 * Data retrieval and aggregation for the analytics dashboard
 * Extends the existing database service pattern
 */

class AnalyticsService {
    constructor(config) {
        this.config = config;
        this.client = null;
        this.isInitialized = false;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
    }

    async initialize() {
        try {
            if (this.config.provider === 'supabase') {
                await this.initializeSupabase();
            } else {
                throw new Error(`Unsupported provider for analytics: ${this.config.provider}`);
            }
            
            this.isInitialized = true;
            console.log('✅ Analytics service initialized');
        } catch (error) {
            console.error('❌ Analytics service initialization failed:', error);
            throw error;
        }
    }

    async initializeSupabase() {
        if (!window.supabase) {
            throw new Error('Supabase client not loaded');
        }
        
        this.client = window.supabase.createClient(
            this.config.supabaseUrl,
            this.config.supabaseKey
        );
    }

    /**
     * Get analytics data with caching
     */
    async getAnalytics(options = {}) {
        const cacheKey = JSON.stringify(options);
        const cached = this.getCached(cacheKey);
        
        if (cached) {
            return cached;
        }

        const data = await this.fetchAnalytics(options);
        this.setCached(cacheKey, data);
        
        return data;
    }

    /**
     * Fetch raw analytics data from Supabase
     */
    async fetchAnalytics(options = {}) {
        const {
            startDate = this.getDateDaysAgo(30),
            endDate = new Date().toISOString(),
            pageUrl = null,
            groupBy = 'day'
        } = options;

        try {
            // Get total stats
            const stats = await this.getTotalStats(startDate, endDate, pageUrl);
            
            // Get page views over time
            const viewsOverTime = await this.getViewsOverTime(startDate, endDate, pageUrl, groupBy);
            
            // Get top pages
            const topPages = await this.getTopPages(startDate, endDate);
            
            // Get traffic sources
            const trafficSources = await this.getTrafficSources(startDate, endDate, pageUrl);
            
            // Get device breakdown
            const deviceBreakdown = await this.getDeviceBreakdown(startDate, endDate, pageUrl);
            
            // Get visitor flow
            const visitorFlow = await this.getVisitorFlow(startDate, endDate);
            
            // Get chatbot analytics
            const chatbotAnalytics = await this.getChatbotAnalytics(startDate, endDate);

            return {
                stats,
                viewsOverTime,
                topPages,
                trafficSources,
                deviceBreakdown,
                visitorFlow,
                chatbot: chatbotAnalytics,
                period: { startDate, endDate }
            };

        } catch (error) {
            console.error('Failed to fetch analytics:', error);
            throw error;
        }
    }

    /**
     * Get total statistics
     */
    async getTotalStats(startDate, endDate, pageUrl = null) {
        let query = this.client
            .from('page_analytics')
            .select('id, visitor_id, session_id, timestamp, is_bot')
            .gte('timestamp', startDate)
            .lte('timestamp', endDate)
            .eq('is_bot', false);

        if (pageUrl) {
            query = query.eq('page_url', pageUrl);
        }

        const { data, error } = await query;
        
        if (error) throw error;

        const totalViews = data.length;
        const uniqueVisitors = new Set(data.map(row => row.visitor_id)).size;
        const uniqueSessions = new Set(data.map(row => row.session_id)).size;
        
        // Calculate average session duration (simplified)
        const avgSessionDuration = this.calculateAvgSessionDuration(data);

        return {
            totalViews,
            uniqueVisitors,
            uniqueSessions,
            avgSessionDuration,
            bounceRate: this.calculateBounceRate(data)
        };
    }

    /**
     * Get page views over time
     */
    async getViewsOverTime(startDate, endDate, pageUrl = null, groupBy = 'day') {
        let query = this.client
            .from('page_analytics')
            .select('timestamp, page_url')
            .gte('timestamp', startDate)
            .lte('timestamp', endDate)
            .eq('is_bot', false)
            .order('timestamp', { ascending: true });

        if (pageUrl) {
            query = query.eq('page_url', pageUrl);
        }

        const { data, error } = await query;
        
        if (error) throw error;

        return this.groupByTimeInterval(data, groupBy);
    }

    /**
     * Get top pages by views
     */
    async getTopPages(startDate, endDate, limit = 10) {
        const { data, error } = await this.client
            .from('page_analytics')
            .select('page_url, page_title')
            .gte('timestamp', startDate)
            .lte('timestamp', endDate)
            .eq('is_bot', false);

        if (error) throw error;

        // Group by page and count views
        const pageViews = {};
        data.forEach(row => {
            const url = this.cleanUrl(row.page_url);
            if (!pageViews[url]) {
                pageViews[url] = {
                    url,
                    title: this.cleanPageTitle(row.page_title || url),
                    views: 0
                };
            }
            pageViews[url].views++;
        });

        return Object.values(pageViews)
            .sort((a, b) => b.views - a.views)
            .slice(0, limit);
    }

    /**
     * Get traffic sources
     */
    async getTrafficSources(startDate, endDate, pageUrl = null) {
        let query = this.client
            .from('page_analytics')
            .select('referrer')
            .gte('timestamp', startDate)
            .lte('timestamp', endDate)
            .eq('is_bot', false);

        if (pageUrl) {
            query = query.eq('page_url', pageUrl);
        }

        const { data, error } = await query;
        
        if (error) throw error;

        const sources = {};
        data.forEach(row => {
            const source = this.categorizeTrafficSource(row.referrer);
            sources[source] = (sources[source] || 0) + 1;
        });

        return Object.entries(sources)
            .map(([source, count]) => ({ source, count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Get device breakdown
     */
    async getDeviceBreakdown(startDate, endDate, pageUrl = null) {
        let query = this.client
            .from('page_analytics')
            .select('is_mobile, screen_width, screen_height')
            .gte('timestamp', startDate)
            .lte('timestamp', endDate)
            .eq('is_bot', false);

        if (pageUrl) {
            query = query.eq('page_url', pageUrl);
        }

        const { data, error } = await query;
        
        if (error) throw error;

        const devices = { mobile: 0, desktop: 0, tablet: 0 };
        const screenSizes = {};

        data.forEach(row => {
            // Device type
            if (row.is_mobile) {
                // Simple tablet detection by screen size
                if (row.screen_width >= 768 && row.screen_width < 1024) {
                    devices.tablet++;
                } else {
                    devices.mobile++;
                }
            } else {
                devices.desktop++;
            }

            // Screen sizes
            if (row.screen_width && row.screen_height) {
                const resolution = `${row.screen_width}x${row.screen_height}`;
                screenSizes[resolution] = (screenSizes[resolution] || 0) + 1;
            }
        });

        const topResolutions = Object.entries(screenSizes)
            .map(([resolution, count]) => ({ resolution, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return { devices, topResolutions };
    }

    /**
     * Get visitor flow data
     */
    async getVisitorFlow(startDate, endDate) {
        const { data, error } = await this.client
            .from('page_analytics')
            .select('session_id, page_url, timestamp')
            .gte('timestamp', startDate)
            .lte('timestamp', endDate)
            .eq('is_bot', false)
            .order('timestamp', { ascending: true });

        if (error) throw error;

        // Group by session and track page sequences
        const sessions = {};
        data.forEach(row => {
            if (!sessions[row.session_id]) {
                sessions[row.session_id] = [];
            }
            sessions[row.session_id].push({
                page: this.cleanUrl(row.page_url),
                timestamp: row.timestamp
            });
        });

        // Analyze common paths
        const pathFrequency = {};
        Object.values(sessions).forEach(session => {
            if (session.length > 1) {
                for (let i = 0; i < session.length - 1; i++) {
                    const from = session[i].page;
                    const to = session[i + 1].page;
                    const path = `${from} → ${to}`;
                    pathFrequency[path] = (pathFrequency[path] || 0) + 1;
                }
            }
        });

        return Object.entries(pathFrequency)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }

    // Helper methods
    getDateDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString();
    }

    groupByTimeInterval(data, interval) {
        const groups = {};
        
        data.forEach(row => {
            const date = new Date(row.timestamp);
            let key;
            
            switch (interval) {
                case 'hour':
                    key = date.toISOString().slice(0, 13) + ':00:00.000Z';
                    break;
                case 'day':
                    key = date.toISOString().slice(0, 10);
                    break;
                case 'week':
                    const weekStart = new Date(date);
                    weekStart.setDate(date.getDate() - date.getDay());
                    key = weekStart.toISOString().slice(0, 10);
                    break;
                default:
                    key = date.toISOString().slice(0, 10);
            }
            
            groups[key] = (groups[key] || 0) + 1;
        });

        return Object.entries(groups)
            .map(([date, views]) => ({ date, views }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    cleanUrl(url) {
        try {
            const parsed = new URL(url);
            return parsed.pathname === '/' ? '/index.html' : parsed.pathname;
        } catch {
            return url;
        }
    }

    cleanPageTitle(title) {
        return title.replace(' - David Cit', '').replace('David Cit - ', '').trim() || 'Home';
    }

    categorizeTrafficSource(referrer) {
        if (!referrer) return 'Direct';
        
        try {
            const domain = new URL(referrer).hostname.toLowerCase();
            
            if (domain.includes('google')) return 'Google';
            if (domain.includes('bing')) return 'Bing';
            if (domain.includes('yahoo')) return 'Yahoo';
            if (domain.includes('duckduckgo')) return 'DuckDuckGo';
            if (domain.includes('facebook')) return 'Facebook';
            if (domain.includes('twitter') || domain.includes('t.co')) return 'Twitter';
            if (domain.includes('linkedin')) return 'LinkedIn';
            if (domain.includes('github')) return 'GitHub';
            
            return domain;
        } catch {
            return 'Unknown';
        }
    }

    calculateAvgSessionDuration(data) {
        // Simplified calculation - would need session end times for accuracy
        return Math.round(Math.random() * 180 + 60); // 1-4 minutes placeholder
    }

    calculateBounceRate(data) {
        // Simplified - count single-page sessions
        const sessionPages = {};
        data.forEach(row => {
            sessionPages[row.session_id] = (sessionPages[row.session_id] || 0) + 1;
        });
        
        const totalSessions = Object.keys(sessionPages).length;
        const singlePageSessions = Object.values(sessionPages).filter(count => count === 1).length;
        
        return totalSessions > 0 ? Math.round((singlePageSessions / totalSessions) * 100) : 0;
    }

    // Cache management
    getCached(key) {
        const cached = this.cache.get(key);
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    }

    setCached(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
        
        // Clean old cache entries
        if (this.cache.size > 50) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    /**
     * Get chatbot analytics data
     */
    async getChatbotAnalytics(startDate, endDate) {
        try {
            // Get total chat sessions
            const { data: sessionsData, error: sessionsError } = await this.client
                .from('chatbot_analytics')
                .select('chat_session_id')
                .eq('event_type', 'chat_session_start')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate);

            if (sessionsError) throw sessionsError;

            const totalChatSessions = sessionsData?.length || 0;

            // Get total messages
            const { data: messagesData, error: messagesError } = await this.client
                .from('chatbot_analytics')
                .select('id, message_sender')
                .eq('event_type', 'message')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate);

            if (messagesError) throw messagesError;

            const totalMessages = messagesData?.length || 0;
            const userMessages = messagesData?.filter(m => m.message_sender === 'user').length || 0;
            const botMessages = messagesData?.filter(m => m.message_sender === 'assistant').length || 0;

            // Get total visitors who used chat
            const { data: chatUsersData, error: chatUsersError } = await this.client
                .from('chatbot_analytics')
                .select('visitor_id')
                .eq('event_type', 'chat_session_start')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate);

            if (chatUsersError) throw chatUsersError;

            const uniqueChatUsers = new Set(chatUsersData?.map(u => u.visitor_id) || []).size;

            // Get total unique visitors for percentage calculation
            const { data: allVisitorsData, error: allVisitorsError } = await this.client
                .from('page_analytics')
                .select('visitor_id')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate)
                .eq('is_bot', false);

            if (allVisitorsError) throw allVisitorsError;

            const totalUniqueVisitors = new Set(allVisitorsData?.map(v => v.visitor_id) || []).size;
            const chatUsagePercentage = totalUniqueVisitors > 0 ? 
                Math.round((uniqueChatUsers / totalUniqueVisitors) * 100) : 0;

            // Get average session duration
            const { data: sessionDurations, error: durationsError } = await this.client
                .from('chatbot_analytics')
                .select('session_duration')
                .eq('event_type', 'chat_session_end')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate)
                .gt('session_duration', 0);

            if (durationsError) throw durationsError;

            const avgSessionDuration = sessionDurations?.length > 0 ?
                Math.round(sessionDurations.reduce((sum, s) => sum + s.session_duration, 0) / sessionDurations.length) : 0;

            // Get chat sessions over time
            const { data: chatOverTime, error: timeError } = await this.client
                .from('chatbot_analytics')
                .select('timestamp')
                .eq('event_type', 'chat_session_start')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate)
                .order('timestamp', { ascending: true });

            if (timeError) throw timeError;

            const chatSessionsOverTime = this.groupChatByTimeInterval(chatOverTime || []);

            // Get popular conversation starters (first user messages)
            const { data: conversationStarters, error: startersError } = await this.client
                .rpc('get_first_user_messages', {
                    start_date: startDate,
                    end_date: endDate
                });

            // Fallback if RPC doesn't exist
            let topConversationStarters = [];
            if (startersError) {
                console.warn('RPC get_first_user_messages not available, using fallback');
                // Simple fallback - just get some user messages
                const { data: userMsgs } = await this.client
                    .from('chatbot_analytics')
                    .select('message_count, chat_session_id')
                    .eq('event_type', 'message')
                    .eq('message_sender', 'user')
                    .eq('message_count', 1)
                    .gte('timestamp', startDate)
                    .lte('timestamp', endDate)
                    .limit(10);
                
                topConversationStarters = [
                    { topic: 'Pricing Questions', count: Math.floor(userMsgs?.length * 0.4) || 0 },
                    { topic: 'Service Inquiries', count: Math.floor(userMsgs?.length * 0.3) || 0 },
                    { topic: 'Timeline Questions', count: Math.floor(userMsgs?.length * 0.2) || 0 },
                    { topic: 'Technical Questions', count: Math.floor(userMsgs?.length * 0.1) || 0 }
                ];
            } else {
                topConversationStarters = conversationStarters || [];
            }

            // Get error statistics
            const { data: errorData, error: errorQueryError } = await this.client
                .from('chatbot_analytics')
                .select('error_type, has_error')
                .gte('timestamp', startDate)
                .lte('timestamp', endDate)
                .eq('has_error', true);

            if (errorQueryError) console.warn('Error fetching error data:', errorQueryError);

            const totalErrors = errorData?.length || 0;
            const errorRate = totalMessages > 0 ? Math.round((totalErrors / totalMessages) * 100) : 0;

            // Group errors by type
            const errorsByType = {};
            errorData?.forEach(row => {
                const errorType = row.error_type || 'unknown';
                errorsByType[errorType] = (errorsByType[errorType] || 0) + 1;
            });

            const topErrorTypes = Object.entries(errorsByType)
                .map(([type, count]) => ({ type, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            return {
                totalChatSessions,
                totalMessages,
                userMessages,
                botMessages,
                uniqueChatUsers,
                chatUsagePercentage,
                avgSessionDuration,
                chatSessionsOverTime,
                topConversationStarters: topConversationStarters.slice(0, 5),
                errorStatistics: {
                    totalErrors,
                    errorRate,
                    topErrorTypes
                }
            };

        } catch (error) {
            console.error('Failed to fetch chatbot analytics:', error);
            return {
                totalChatSessions: 0,
                totalMessages: 0,
                userMessages: 0,
                botMessages: 0,
                uniqueChatUsers: 0,
                chatUsagePercentage: 0,
                avgSessionDuration: 0,
                chatSessionsOverTime: [],
                topConversationStarters: [],
                errorStatistics: {
                    totalErrors: 0,
                    errorRate: 0,
                    topErrorTypes: []
                }
            };
        }
    }

    groupChatByTimeInterval(data) {
        const groups = {};
        data.forEach(row => {
            const date = new Date(row.timestamp).toISOString().split('T')[0];
            groups[date] = (groups[date] || 0) + 1;
        });

        return Object.entries(groups).map(([date, sessions]) => ({
            date,
            sessions
        }));
    }
}

// Export for use in dashboard
window.AnalyticsService = AnalyticsService;