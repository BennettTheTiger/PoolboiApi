'use strict';

var form = document.querySelector('#waterResults');

var handleChange = function handleChange(event) {
    console.log(event.target.id + 'has changed');
    field = event.target.id;
    waterData.field = event.target.value;
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    waterData.date = Date.now();
    addData();
});

var waterData = {
    date: 'today',
    ph: 0,
    chlorine: 0,
    alkalinity: 0,
    hardness: 0,
    cyanuricAcid: 0,
    solids: 0,
    notes: 'none'
};

var addData = function addData() {
    console.log('called data submit');
};
