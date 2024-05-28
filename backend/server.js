// File: MyCMS/backend/server.js

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5005; // Updated port to 5005

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
