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
  jwtsecret: 'adminwebjwt',
  product: false,
  redis: {
    host: '127.0.0.1:6379',
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
