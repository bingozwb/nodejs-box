const chain = 'eth'

module.exports = {
  apps: [
    {
      name: 'xxx_admin_eth',
      script: 'admin.js',
      args: '',
      instances: 10,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
        chain: chain,
      },
    },
    {
      name: 'xxx_app_eth',
      script: 'app.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'production',
        chain: chain,
      },
    },
    {
      name: 'xxx_task_eth',
      script: 'task.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'production',
        chain: chain,
      },
    },
    {
      name: 'xxx_loader_eth',
      script: 'task/scanEventAuto.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'production',
        chain: chain,
      },
    },
  ],
}
