const fs = require('fs');
// THIS IS BAD ONLY USE FOR THIS PROJECT!
const index = fs.readFileSync(`${__dirname}/../hosted/index.html`);
const _404 = fs.readFileSync(`${__dirname}/../hosted/404.html`);
const style = fs.readFileSync(`${__dirname}/../hosted/styles.css`);
const clientJs = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);// this is the babel es5 compiled js
const waveJs = fs.readFileSync(`${__dirname}/../hosted/wave.js`);

const getIndex = (req, res) => {
  res.writeHead(200, { 'Conent-Type': 'text/html; charset=utf-8' });
  res.write(index);
  res.end();
};

const getScript = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  res.write(clientJs);
  res.end();
};
const getWave = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  res.write(waveJs);
  res.end();
};


const getStyles = (req, res) => {
  res.writeHead(200, { 'Content-Type': ' text/css' });
  res.write(style);
  res.end();
};

const unknown = (req, res) => {
  res.writeHead(404, { 'Conent-Type': 'text/html; charset=utf-8' });
  res.write(_404);
  res.end();
};


module.exports = {
  getIndex,
  unknown,
  getScript,
  getWave,
  getStyles,
};
