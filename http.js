const express = require('express');
const http = require('http');
const { routerInit } = require('./routes/config_routes');
require('./DB/mongoConnect');

const app = express();
app.use(express.json());

routerInit(app);
const server = http.createServer(app);

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});