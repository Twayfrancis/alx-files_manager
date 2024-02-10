const express = require('express');
const routes = require('./routes');

// create express app
const app = express();

// set port from env var or default to 5000
const PORT = process.env.PORT || 5000;

// load routes from routes/index.js
app.use('/', routes);

// start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
