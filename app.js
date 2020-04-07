const http = require("http");
const routes = require('./routes');

const server = http.createServer(routes.routesHandler);


server.listen(5000);