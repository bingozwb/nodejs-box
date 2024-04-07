const chain = 'example'

module.exports = {
  apps: [
    {
      name: 'xxx_admin_example',
      script: 'admin.js',
      args: '',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'development',
        chain: chain,
      },
    },
    {
      name: 'xxx_app_example',
      script: 'app.js',
      args: '',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'development',
        chain: chain,
      },
    },
    {
      name: 'xxx_task_example',
      script: 'task.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'development',
        chain: chain,
      },
    },
    {
      name: 'xxx_loader_example',
      script: 'task/scanEventAuto.js',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        ENV_MODE: 'development',
        chain: chain,
      },
    },
  ],
}
