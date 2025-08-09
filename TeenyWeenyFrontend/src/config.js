// TeenyWeenyURL Configuration
// This file handles environment-specific URLs

const config = {
  // API base URL
  apiUrl: import.meta.env.VITE_API_URL || window.location.origin,

  // App base URL for generating short URLs
  appUrl: import.meta.env.VITE_APP_URL || window.location.origin,

  // Development defaults
  development: {
    apiUrl: "http://localhost:5140",
    appUrl: "http://localhost:5140",
  },

  // Production will use window.location.origin by default
  // or environment variables if set
};

export default config;
