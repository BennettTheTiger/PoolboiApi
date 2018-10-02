const http = require('http');
const url = require('url');
const pageRequests = require('./responses.js');
const dataRequests = require('./data.js');


const urlStruct = {
  '/': pageRequests.getIndex,
  '/styles.css': pageRequests.getStyles,
  index: pageRequests.getIndex,
  '/bundle.js': pageRequests.getScript,
  '/wave.js': pageRequests.getWave,
  '/addData': dataRequests.addData,
};
// get a port to serve on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  // console.log(parsedUrl.pathname);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res);
  } else if (parsedUrl.pathname === '/addData') {
    dataRequests.addData(req, res, parsedUrl);
  } else if (parsedUrl.pathname === '/getData') {
    dataRequests.getData(req, res, parsedUrl.query);
  } else {
    pageRequests.unknown(req, res);
  }
};

http.createServer(onRequest).listen(port);

// console.log('listening at localhost:' + `${port}`);
