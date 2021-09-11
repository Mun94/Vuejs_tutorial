const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
    let url = req.url;

    if(url === '/') {
        url = '/main.html'
    };

    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

app.listen(5000);