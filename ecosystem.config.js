/**
 * PM2 Ecosystem Configuration
 * Production-ready process management with clustering and auto-restart
 */

module.exports = {
  apps: [{
    // Application name
    name: 'vidbuilder',
    
    // Entry point
    script: './server.js',
    
    // Cluster mode - use all CPU cores for high availability
    instances: 'max', // or specify number: 2, 4, etc.
    exec_mode: 'cluster',
    
    // Environment variables
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      NODE_OPTIONS: '--max-old-space-size=4096', // 4GB memory limit
      UV_THREADPOOL_SIZE: 128 // Increase thread pool for file operations
    },
    
    // Logging
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Auto-restart configuration
    autorestart: true,
    max_memory_restart: '2G', // Restart if memory exceeds 2GB
    
    // Watch mode (disable in production)
    watch: false,
    ignore_watch: [
      'node_modules',
      'output',
      'temp',
      'uploads',
      'logs',
      '.git'
    ],
    
    // Restart limits
    max_restarts: 10,
    min_uptime: '10s',
    
    // Graceful shutdown (increased for long video generation)
    kill_timeout: 30000,      // 30 seconds - allow graceful shutdown
    wait_ready: true,
    listen_timeout: 30000,    // 30 seconds
    
    // Advanced options
    instance_var: 'INSTANCE_ID',
    
    // Cron restart (optional - restart daily at 3 AM)
    // cron_restart: '0 3 * * *',
    
    // Source map support
    source_map_support: true,
    
    // Interpreter args
    node_args: '--max-old-space-size=4096'
  }]
};
