const RedisClient = require('../utils/redis');
const DBClient = require('../utils/db');

const AppController = {
  // GET / status endpoint
  async getStatus(req, res) {
    const redisAlive = RedisClient.isAlive();
    const dbAlive = DBClient.isAlive();

    res.status(200).son({ redis: redisAlive, db: dbAlive });
  },

  // GET /stats endpoint
  async getStats(req, res) {
    try {
      const usersCount = await DBClient.nbUsers();
      const filesCount = await DBClient.nbFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error('Error retrieving stats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
