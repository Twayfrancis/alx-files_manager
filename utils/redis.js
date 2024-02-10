// import the Redis library
const redis = require('redis');

class RedisClient {
  constructor() {
    // create a Redis client
    this.client = redis.createClient();

    // error handling
    this.client.on('error', (error) => console.error(`Redis client error: ${error}`));

    // successful conn
    this.client.on('connect', () => console.log('Redis client connected'));

    // reconn
    this.client.on('reconnecting', () => console.log('Redis client reconnecting'));
  }

  // check if the client is conn and ready
  isAlive() {
    return this.client.connected;
  }

  // get value by key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // set value with key and expiration
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // delete a key
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
