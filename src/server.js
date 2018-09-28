const http = require('http');
const url = require('url');
const pageRequests = require('./responses.js');


const urlStruct = {
    '/': pageRequests.getIndex,
    '/style.css': pageRequests.getStyles,
    index: pageRequests.getIndex,
    '/bundle.js': pageRequests.getScript,
  };
//get a port to serve on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req,res) =>{
    const parsedUrl = url.parse(req.url);
    console.log(parsedUrl);
    pageRequests.getIndex(req,res);
}

http.createServer(onRequest).listen(port);

console.log('listening at localhost:' + `${port}`);
