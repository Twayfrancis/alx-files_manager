const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    this.db = null;

    // connect to MongoDB client
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Successfully connected to MongoDB');
      })
      .catch((err) => console.error('Connection to MongoDB failed', err));
  }

  // check if conn to MongoDB is alive
  isAlive() {
    return !!this.db;
  }

  //  get the num of doc in users collection
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  // get num of doc in the files collection
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

// export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
