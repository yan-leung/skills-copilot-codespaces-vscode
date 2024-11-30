// Create a web server  
var http = require('http');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res) {
    //parse the url
    var url = req.url;
    var method = req.method;
    var filePath = '.' + url;
    //console.log('url: ' + url);
    //console.log('filePath: ' + filePath);
    if (filePath == './') {
        filePath = './index.html';
    }
    //console.log('filePath: ' + filePath);
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }
    if (extname == '.json') {
        fs.readFile(filePath, function(err, data) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } else {
        fs.readFile(filePath, 'utf-8', function(err, data) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
    if (method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            //console.log('body: ' + body);
            var comment = JSON.parse(body);
            comments.push(comment);
            //console.log('comment: ' + comment);
            res.end(JSON.stringify(comments));
        });
    }
});
server.listen(3000);
console.log('Server is running at http://localhost:3000');



