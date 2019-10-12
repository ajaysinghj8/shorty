require('dotenv');

const server = require('./src/server');

server.listen(process.env.PORT || 8000);
