const { v4: uuidv4 } = require('uuid');
const sha1 = require('sha1');

const DBClient = require('../utils/db');

const UsersController = {
  // POST /users endpoint
  async postNew(req, res) {
    try {
      const { email, password } = req.body;

      // check if email and pass are provided
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      // check if email exist in DB
      const existingUser = await DBClient.db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // hash password
      const hashedPassword = sha1(password);

      // create new user obj
      const newUser = {
        email,
        password: hashedPassword,
        id: uuidv4(), // generate uuid for the user ID
      };

      // insert new user into db
      await DBClient.db.collection('users').insertOne(newUser);

      // return new user
      return res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      console.error('Error creating new user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UsersController;
