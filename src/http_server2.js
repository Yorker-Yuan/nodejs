const http = require('http'),
    fs = require('fs');
http.createServer((req, res) => {
    fs.writeFile(__dirname + 'header01.json',
        JSON.stringify(req.headers),
        error => {
            if (error) {
                console.log(error);
                return;
            }
            res.end('OK')
        }
    )
});
server.listen(3000);