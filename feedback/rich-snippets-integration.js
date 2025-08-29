// Rich Snippets Integration for Customer Feedback System
// This script updates the main site's Rich Snippets based on collected feedback data

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        minReviewsForUpdate: 1,  // Minimum reviews needed to update ratings (reduced from 3)
        defaultRating: 5.0,      // Fallback rating if no feedback data
        defaultReviewCount: 1,   // Updated fallback review count
        updateOnPageLoad: true,   // Whether to update on page load
        debugMode: true         // Enable debugging to see what's happening
    };
    
    // Main integration function
    function initRichSnippetsIntegration() {
        if (CONFIG.updateOnPageLoad) {
            document.addEventListener('DOMContentLoaded', updateRichSnippets);
        }
        
        // Expose global function for manual updates
        window.updateRichSnippetsFromFeedback = updateRichSnippets;
        
        log('Rich Snippets feedback integration initialized');
    }
    
    // Update Rich Snippets based on feedback data
    async function updateRichSnippets() {
        try {
            // Only use database data, no localStorage fallback
            const feedbackData = await getDatabaseFeedbackData();
            
            if (feedbackData && feedbackData.history && feedbackData.history.length > 0) {
                const aggregatedData = calculateAggregateData(feedbackData);
                
                if (aggregatedData.shouldUpdate) {
                    updateStructuredData(aggregatedData);
                    updateDisplayElements(aggregatedData);
                    log('Rich Snippets updated with database feedback data', aggregatedData);
                    return;
                }
            }
            
            // If no database data, use defaults
            log('No database feedback data available. Using defaults.');
            updateWithDefaults();
            
        } catch (error) {
            console.error('Error updating Rich Snippets from database:', error);
            // If database fails, use defaults instead of localStorage
            updateWithDefaults();
        }
    }
    
    // Get feedback data from database (Supabase)
    async function getDatabaseFeedbackData() {
        try {
            // Check if we have database access
            if (!window.DATABASE_CONFIG || !window.DATABASE_CONFIG.enabled || 
                window.DATABASE_CONFIG.provider !== 'supabase' || !window.supabase) {
                return null;
            }

            // Initialize Supabase client
            const supabaseClient = window.supabase.createClient(
                window.DATABASE_CONFIG.supabaseUrl,
                window.DATABASE_CONFIG.supabaseKey
            );

            // Fetch all feedback submissions
            const { data, error } = await supabaseClient
                .from('feedback_submissions')
                .select('average_rating, created_at, share_permission, customer_name, comments')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) {
                console.error('Database query error:', error);
                return null;
            }

            if (!data || data.length === 0) {
                return { history: [], storedRating: null, storedCount: null };
            }

            // Calculate aggregate statistics
            const totalRating = data.reduce((sum, item) => sum + parseFloat(item.average_rating), 0);
            const avgRating = totalRating / data.length;

            log(`Loaded ${data.length} feedback submissions from database`);

            return {
                history: data,
                storedRating: avgRating,
                storedCount: data.length,
                source: 'database'
            };
        } catch (error) {
            console.error('Error fetching database feedback:', error);
            return null;
        }
    }

    // localStorage functions removed - database only integration
    // Rich Snippets now only use real database data for consistent ratings across all visitors
    
    // Calculate aggregate rating and review data
    function calculateAggregateData(feedbackData) {
        const { history, storedRating, storedCount } = feedbackData;
        
        // Use stored data if available and meets minimum threshold
        if (storedRating && storedCount && storedCount >= CONFIG.minReviewsForUpdate) {
            return {
                ratingValue: storedRating,
                reviewCount: storedCount,
                shouldUpdate: true,
                source: 'stored_feedback'
            };
        }
        
        // Calculate from history if we have enough reviews
        if (history.length >= CONFIG.minReviewsForUpdate) {
            const totalRating = history.reduce((sum, feedback) => {
                return sum + parseFloat(feedback.average_rating || feedback.overall_rating || 4);
            }, 0);
            
            const averageRating = (totalRating / history.length);
            
            return {
                ratingValue: Math.round(averageRating * 10) / 10, // Round to 1 decimal
                reviewCount: history.length,
                shouldUpdate: true,
                source: 'calculated_feedback'
            };
        }
        
        // Not enough data, use defaults
        return {
            ratingValue: CONFIG.defaultRating,
            reviewCount: CONFIG.defaultReviewCount,
            shouldUpdate: false,
            source: 'defaults'
        };
    }
    
    // Update structured data (JSON-LD) in the page
    function updateStructuredData(data) {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        
        scripts.forEach(script => {
            try {
                const jsonData = JSON.parse(script.textContent);
                
                // Handle array of structured data
                if (Array.isArray(jsonData)) {
                    jsonData.forEach(item => updateStructuredDataItem(item, data));
                    script.textContent = JSON.stringify(jsonData, null, 2);
                } else {
                    // Handle single structured data object
                    if (updateStructuredDataItem(jsonData, data)) {
                        script.textContent = JSON.stringify(jsonData, null, 2);
                    }
                }
            } catch (error) {
                log('Error updating structured data script:', error);
            }
        });
    }
    
    // Update individual structured data item
    function updateStructuredDataItem(item, data) {
        let updated = false;
        
        // Update LocalBusiness or Organization with aggregateRating
        if ((item['@type'] === 'LocalBusiness' || item['@type'] === 'Organization') && item.aggregateRating) {
            item.aggregateRating.ratingValue = data.ratingValue.toString();
            item.aggregateRating.reviewCount = data.reviewCount.toString();
            updated = true;
            log('Updated structured data aggregateRating');
        }
        
        // Update direct aggregateRating objects
        if (item['@type'] === 'AggregateRating') {
            item.ratingValue = data.ratingValue.toString();
            item.reviewCount = data.reviewCount.toString();
            updated = true;
            log('Updated AggregateRating structured data');
        }
        
        return updated;
    }
    
    // Update display elements on the page
    function updateDisplayElements(data) {
        // Update rating value displays
        const ratingElements = document.querySelectorAll('#ratingValue, .rating-value, [data-rating-value]');
        ratingElements.forEach(el => {
            el.textContent = data.ratingValue.toFixed(1);
            log(`Updated rating display element: ${data.ratingValue}`);
        });
        
        // Update review count displays  
        const countElements = document.querySelectorAll('#reviewCount, .review-count, [data-review-count]');
        countElements.forEach(el => {
            el.textContent = `${data.reviewCount} reviews`;
            log(`Updated review count display element: ${data.reviewCount}`);
        });
        
        // Update star displays
        updateStarDisplays(data.ratingValue);
        
        // Trigger rating widget update if it exists
        if (typeof generateStars === 'function') {
            generateStars(data.ratingValue);
            log('Triggered generateStars function');
        }
    }
    
    // Update star rating displays
    function updateStarDisplays(rating) {
        const starContainers = document.querySelectorAll('#starsContainer, .stars-container, [data-stars-container]');
        
        starContainers.forEach(container => {
            container.innerHTML = generateStarsHTML(rating);
        });
    }
    
    // Generate stars HTML
    function generateStarsHTML(rating) {
        let starsHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const starWrapper = document.createElement('span');
            starWrapper.className = 'relative text-xs';
            
            if (i <= Math.floor(rating)) {
                // Full star
                starWrapper.innerHTML = '<span class="text-yellow-400">★</span>';
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                // Partial star
                const percentage = Math.round((rating % 1) * 100);
                starWrapper.innerHTML = `
                    <span class="text-gray-300">★</span>
                    <span class="absolute inset-0 text-yellow-400" style="width: ${percentage}%; overflow: hidden;">★</span>
                `;
            } else {
                // Empty star
                starWrapper.innerHTML = '<span class="text-gray-300">★</span>';
            }
            
            starsHTML += starWrapper.outerHTML;
        }
        
        return starsHTML;
    }
    
    // Fallback to default behavior
    function updateWithDefaults() {
        const data = {
            ratingValue: CONFIG.defaultRating,
            reviewCount: CONFIG.defaultReviewCount,
            shouldUpdate: true,
            source: 'fallback'
        };
        
        updateDisplayElements(data);
        log('Updated with fallback defaults');
    }
    
    // Utility function for logging
    function log(message, data) {
        if (CONFIG.debugMode) {
            if (data) {
                console.log(`[RichSnippets] ${message}`, data);
            } else {
                console.log(`[RichSnippets] ${message}`);
            }
        }
    }
    
    // API for external use
    window.RichSnippetsFeedback = {
        update: updateRichSnippets,
        getDatabaseData: getDatabaseFeedbackData,
        config: CONFIG,
        enableDebug: function() { CONFIG.debugMode = true; },
        disableDebug: function() { CONFIG.debugMode = false; }
    };
    
    // Initialize on load
    initRichSnippetsIntegration();
    
})();