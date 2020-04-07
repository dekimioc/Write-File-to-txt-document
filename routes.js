const fs = require('fs');

const routesHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", 'text/html');
        res.write("<form action='/message' method='POST'><input type='text' name='message'/><button>SEND</button</form>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        })
    }

    res.setHeader("Content-Type", 'text/html');
    res.write("<h1>Hello from my Node.js Server!</h1>");
    res.end();
}

module.exports.routesHandler = routesHandler; 