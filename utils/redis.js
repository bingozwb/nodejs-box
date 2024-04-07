const redis = require('redis');

const CONFIG = ENVConfig.redis

const getClient = () => {
  return redis.createClient({
    url: CONFIG.url,
    username: CONFIG.username,
    password: CONFIG.password,
    database: CONFIG.database,
  })
}

const getConnect = () => {
  const client = redis.createClient({
    host: CONFIG.host,
    port: CONFIG.port,
    password: CONFIG.password,
    database: CONFIG.database,
  })
  client.connect()
  return client
}

module.exports = {
  getClient: getClient,
  getConnect: getConnect,
}
