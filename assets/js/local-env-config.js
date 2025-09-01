// Local Environment Configuration for file:// protocol
// This file allows file:// protocol to use your .env credentials
// It only runs locally and won't affect production

// Only set config for local development (file:// protocol or localhost)
if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.LOCAL_ENV_CONFIG = {
        // Set to 'local' for direct API calls, 'proxy' for Netlify functions
        ENVIRONMENT_MODE: 'local',
        
        // API credentials (same as your .env file)
        GEMINI_API_KEY: 'AIzaSyA2BT_gK8j33wCPfyTfqFOaGjo7OCAiJec',
        SUPABASE_URL: 'https://ciulpbxkwcbzoshlzmvb.supabase.co',
        SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdWxwYnhrd2Niem9zaGx6bXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyOTY4NTcsImV4cCI6MjA3MTg3Mjg1N30.UvoAL-i_Xv-h_OKfa8NN2CoClGBfQYHv1vNeu0elERo',
        
        // Netlify proxy URL (for proxy mode)
        NETLIFY_PROXY_URL: 'https://radiant-dodol-0c0bca.netlify.app'
    };
    console.log('🔧 Local environment config loaded for local development');
} else {
    console.log('🌐 Production environment - no local config needed');
}