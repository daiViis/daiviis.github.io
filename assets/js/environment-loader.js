// Environment Configuration Loader
class EnvironmentLoader {
    constructor() {
        this.config = null;
        this.initialized = false;
    }

    async loadConfig() {
        if (this.initialized && this.config) {
            return this.config;
        }

        try {
            // Detect environment
            const isLocal = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname.includes('local');
            
            const isNetlify = window.location.hostname.includes('netlify.app') ||
                             window.location.hostname.includes('netlify.com');

            // Configuration based on environment
            if (isLocal) {
                this.config = {
                    mode: 'local',
                    useProxy: true, // Use proxy even locally to test production behavior
                    proxyUrl: window.location.origin,
                    geminiKey: null, // Not used when proxy is enabled
                    supabaseUrl: null,
                    supabaseKey: null
                };
            } else if (isNetlify) {
                this.config = {
                    mode: 'netlify',
                    useProxy: true,
                    proxyUrl: window.location.origin,
                    geminiKey: null, // Not used when proxy is enabled
                    supabaseUrl: null,
                    supabaseKey: null
                };
            } else {
                // Production or other environments - use proxy for security
                this.config = {
                    mode: 'production',
                    useProxy: true,
                    proxyUrl: window.location.origin,
                    geminiKey: null,
                    supabaseUrl: null,
                    supabaseKey: null
                };
            }

            this.initialized = true;
            console.log(`🔧 Environment detected: ${this.config.mode} (proxy: ${this.config.useProxy})`);
            
            return this.config;
        } catch (error) {
            console.error('Failed to load environment configuration:', error);
            
            // Fallback configuration
            this.config = {
                mode: 'fallback',
                useProxy: true,
                proxyUrl: window.location.origin,
                geminiKey: null,
                supabaseUrl: null,
                supabaseKey: null
            };
            
            this.initialized = true;
            return this.config;
        }
    }

    isLocal() {
        return this.config?.mode === 'local';
    }

    isProduction() {
        return this.config?.mode === 'production' || this.config?.mode === 'netlify';
    }

    shouldUseProxy() {
        return this.config?.useProxy || true; // Default to proxy for security
    }
}

// Export for use in other scripts
window.EnvironmentLoader = EnvironmentLoader;