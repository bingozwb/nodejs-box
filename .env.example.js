const addr = {
  // example

}

module.exports = {
  NODE_ENV: 'development',
  addr: addr,
  pk: '',
  provider: 'http://localhost:8545',
  provider_scan: 'http://localhost:8545',
  chain_id: 0,
  after_block_height: 6,
  // block scan interval time (ms)
  block_interval_time: 5000,
  // block amount to scan per loop
  block_scan_gap: 1000,
  // block scan delay for rpc_url rate limit (ms)
  block_scan_delay: 10,
  IGNORE_ABI: ['ERC20Token'],
  IGNORE_EVENT: ['Initialized', 'Upgraded', 'AdminWithdrawToken', 'AdminWithdrawNFT', 'AdminWithdraw', 'SetAdmin', 'SetAuth', 'SetIsPaused'],

  db: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    passwd: '123456',
    database: 'example',
    debug: false,
    show_sql: true,
    multipleStatements: true,
  },
  failure_time: 24 * 60 * 60,
  jwt_secret: 'adminwebjwt',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
    database: 0,
  },
  admin: {
    port: 3002,
    baseurl: '',
  },
  app: {
    port: 3001,
    baseurl: '',
  },
}
