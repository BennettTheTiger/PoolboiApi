const query = require('querystring');

const allData = {};
const updateData = (req, res, newData) => {
  const date = new Date();
  const time = date.getTime();
  const code = `${newData.type}/${time}`;
  // console.log(code);// key for data so pool/1334512344242
  // console.log(newData);
  allData[code] = newData;
  res.writeHead(201);
  res.end();
};

// No data respond 204 No Content
const noData = (req, res) => {
  res.writeHead(204);
  res.end();
};

const addData = (req, res) => {
  // uploads come in as a byte stream that we need
  // to reassemble once it's all arrived
  const body = [];

  // if the upload stream errors out, just throw a
  // a bad request and send it back
  req.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  // on 'data' is for each byte of data that comes in
  // from the upload. We will add it to our byte array.
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  // on end of upload stream.
  req.on('end', () => {
    // combine our byte array (using Buffer.concat)
    // and convert it to a string value (in this instance)
    const bodyString = Buffer.concat(body).toString();
    // since we are getting x-www-form-urlencoded data
    // the format will be the same as querystrings
    // Parse the string into an object by field name
    const bodyParams = query.parse(bodyString);
    // console.dir(bodyParams);
    updateData(req, res, bodyParams);
  });
};

const sendAllData = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(allData));
  res.end();
};

const sendSpaData = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const spaData = {};
  const key = Object.keys(allData);
  for (let i = 0; i < Object.keys(allData).length; i++) {
    // add the element to spaData object with the date as the key
    if (allData[key[i]].type === 'spa') spaData[i] = allData[key[i]];
  }
  // If there is no spa data then call noData
  if (Object.keys(spaData).length === 0) {
    noData(req, res);
    return;
  }
  res.write(JSON.stringify(spaData));
  res.end();
};

const sendPoolData = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const poolData = {};
  const key = Object.keys(allData);
  for (let i = 0; i < Object.keys(allData).length; i++) {
    // add that element to pool data object with the date as the key
    if (allData[key[i]].type === 'pool') poolData[i] = allData[key[i]];
  }
  // If there is no pool data respond noData
  if (Object.keys(poolData).length === 0) {
    noData(req, res);
    return;
  }
  res.write(JSON.stringify(poolData));
  res.end();
};

const getData = (req, res, params) => {
  if (Object.keys(allData).length === 0) {
    noData(req, res);
    return;
  }// if there is no data return 204 No content
  const dataType = query.parse(params);
  if (dataType.kind === 'pool') {
    sendPoolData(req, res);
  } else if (dataType.kind === 'spa') {
    sendSpaData(req, res);
  } else if (dataType.kind === 'all') {
    sendAllData(req, res);
  } else {
    // assume the request was bad
    res.writeHead(400);
    res.end();
  }
};


module.exports = {
  addData,
  getData,
};
