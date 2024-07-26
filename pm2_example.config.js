const NODE_ENV = process.env.NODE_ENV || 'development'
const CHAIN = 'example'

module.exports = {
  apps: [
    {
      name: 'xxx_admin_' + CHAIN,
      script: 'admin.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: NODE_ENV,
        chain: CHAIN,
      },
    },
    {
      name: 'xxx_app_' + CHAIN,
      script: 'app.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: NODE_ENV,
        CHAIN: CHAIN,
      },
    },
    {
      name: 'xxx_task_' + CHAIN,
      script: 'task.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: NODE_ENV,
        chain: CHAIN,
      },
    },
    {
      name: 'xxx_loader_' + CHAIN,
      script: 'task/scanEventAuto.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: NODE_ENV,
        chain: CHAIN,
      },
    },
  ],
}
