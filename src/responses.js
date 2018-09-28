const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../hosted/index.html`);
const clientJs = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);//this is the babel es5 compiled js

const getIndex = (req,res) =>{
    res.writeHead(200,{'Conent-Type':'text/html; charset=utf-8'});
    res.write(index);
    res.end();
}

const getScript = (req,res) =>{
    console.log('sending' + `${clientJs}`);
    res.writeHead(200,{'Content-Type':'application/javascript'});
    res.write(clientJs);
    res.end();
}

const unknown = (req,res) =>{
    res.writeHead(404);
    res.end();
}



module.exports = {
    getIndex,
    unknown,
    getScript,
}