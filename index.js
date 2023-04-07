require('dotenv').config();

const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});
