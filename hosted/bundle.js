'use strict';

//water data model
var waterData = {
    date: 'today',
    ph: 0,
    chlorine: 0,
    alkalinity: 0,
    hardness: 0,
    cyanuricAcid: 0,
    solids: 0,
    notes: 'none',
    temp: 0

    //when a water data form input changes edit the data... The id of the form item matches a 'key' in the data
};var handleChange = function handleChange(event) {
    var field = event.target.id;
    field = field.toLowerCase();
    waterData[field] = event.target.value;
};

//Make a POST Request
var addData = function addData() {
    waterData.date = Date.now();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addData');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('Accept', 'application/json');
    var sendData = JSON.stringify(waterData);
    var formData = 'water=' + sendData + '&type=' + document.querySelector('#waterbody').value;

    //send our request with the data
    xhr.send(formData);
};
//Make a GET Request
var getData = function getData() {
    var waterType = document.querySelector('#waterBodyGet').value;
    var xhr = new XMLHttpRequest();
    var queryUrl = '/getData?kind=' + waterType;
    xhr.open('GET', queryUrl);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function () {
        return handleData(xhr);
    };
    xhr.send();
};

//builds a table element for each water entry
var buildTable = function buildTable(data, type) {
    var container = document.querySelector('#results');
    var block = document.createElement('div');
    block.className = 'waterDataBlurb';
    var key = Object.keys(data);
    //add the type
    var item = document.createElement('div');
    var title = document.createElement('p');
    title.innerHTML = 'Type :' + type;
    item.appendChild(title);
    block.appendChild(item);
    //add all the data fields
    for (var field in Object.keys(data)) {
        var _item = document.createElement('div');
        var _title = document.createElement('p');
        _title.innerHTML = key[field] + ":" + data[key[field]];
        _item.appendChild(_title);
        block.appendChild(_item);

        container.appendChild(block);
    }
    block.appendChild(document.createElement('hr'));
};

//handles the response
var handleData = function handleData(xhr) {
    //console.log(xhr.status);
    document.querySelector('#results').innerHTML = '';
    //204 responses have no body so it cant parse it out
    if (xhr.status === 204) {
        document.querySelector('#results').innerHTML = 'Opps there is no data!';
        return;
    }
    var obj = JSON.parse(xhr.response);
    //console.dir(obj);
    for (var i = 0; i < Object.keys(obj).length; i++) {
        var entry = obj[Object.keys(obj)[i]];
        var waterDetails = JSON.parse(entry.water);
        //console.dir(waterDetails);
        buildTable(waterDetails, entry.type);
    }
};

//get all the forms current data
var initData = function initData() {
    var form = document.getElementById('waterResults').elements;
    for (var i = 1; i < 9; i++) {
        var field = form[i].id.toLowerCase();
        waterData[field] = form[i].value;
    }
};

//Setup the page
window.onload = function () {
    initData(); //populate the data model
    //wire up the submit data button
    var form = document.querySelector('#waterResults');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addData();
    });

    var getWater = document.querySelector('#getData');
    getWater.addEventListener('click', function (e) {
        e.preventDefault();
        getData();
    });

    //alert('The data entered into this page is public and will be deleted when the server sleeps');
};
