const redis = require('redis');
const logger = console

const CONFIG = ENVConfig.redis

const getConnect = async () => {
  try {
    const client = redis.createClient({
      host: CONFIG.host,
      port: CONFIG.port,
      password: CONFIG.password,
      database: CONFIG.database,
    })
    await client.connect()
    return client
  } catch (e) {
    logger.error('Error get redis client connection')
    throw e
  }
}

const get = async (key) => {
  const client = await getConnect()
  try {
    return await client.get(key)
  } catch (e) {
    logger.error(`Error get redis key: ${key}`, e)
    throw e
  } finally {
    client?.quit()
  }
}

const set = async (key, value, option) => {
  const client = await getConnect()
  try {
    return await client.set(key, value, option)
  } catch (e) {
    logger.error(`Error set redis key: ${key}`, e)
    throw e
  } finally {
    client?.quit()
  }
}

const del = async (key, value, option) => {
  const client = await getConnect()
  try {
    return await client.del(key)
  } catch (e) {
    logger.error(`Error del redis key: ${key}`, e)
    throw e
  } finally {
    client?.quit()
  }
}

module.exports = {
  getConnect: getConnect,
  get: get,
  set: set,
  del: del,
}
