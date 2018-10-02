
//water data model
let waterData = {
    date:'today',
    ph: 0,
    chlorine:0,
    alkalinity:0,
    hardness:0,
    cyanuricAcid:0,
    solids:0,
    notes:'none',
    temp:0
}

//when a water data form input changes edit the data... The id of the form item matches a 'key' in the data
const handleChange = (event) =>{
    let field = event.target.id;
    field = field.toLowerCase();
    waterData[field] = event.target.value; 
}


//Make a POST Request
const addData = () =>{
    waterData.date = Date.now();
    const xhr = new XMLHttpRequest();
    xhr.open('POST','/addData');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader ('Accept', 'application/json');
    const sendData = JSON.stringify(waterData);
    const formData = `water=${sendData}&type=${document.querySelector('#waterbody').value}`;
      
    //send our request with the data
    xhr.send(formData);
}
//Make a GET Request
const getData = () =>{    
    const waterType = document.querySelector('#waterBodyGet').value;
    const xhr = new XMLHttpRequest();
    const queryUrl = `/getData?kind=${waterType}`;
    xhr.open('GET',queryUrl);
    xhr.setRequestHeader ('Accept', 'application/json');
    xhr.onload = () => handleData(xhr);
    xhr.send();
}

//builds a table element for each water entry
const buildTable = (data,type) => {
    const container = document.querySelector('#results');
    const block = document.createElement('div');
    block.className = 'waterDataBlurb';
    let key = Object.keys(data);
    //add the type
    let item = document.createElement('div');
    let title = document.createElement('p');
    title.innerHTML = `Type :${type}`;
    item.appendChild(title);
    block.appendChild(item);
    //add all the data fields
    for(let field in Object.keys(data)){ 
        let item = document.createElement('div');
        let title = document.createElement('p');   
        title.innerHTML = key[field] + ":" + data[key[field]];
        item.appendChild(title);
        block.appendChild(item);
        
        container.appendChild(block);
    }
    block.appendChild(document.createElement('hr'));

}


//handles the response
const handleData = (xhr) =>{
    //console.log(xhr.status);
    document.querySelector('#results').innerHTML = '';
    //204 responses have no body so it cant parse it out
    if(xhr.status === 204){
        document.querySelector('#results').innerHTML = 'Opps there is no data!';
        return;
    }
    const obj = JSON.parse(xhr.response);
    //console.dir(obj);
    for(let i = 0; i < Object.keys(obj).length; i++){
        let entry = obj[Object.keys(obj)[i]];
        let waterDetails = (JSON.parse(entry.water));
        //console.dir(waterDetails);
        buildTable(waterDetails,entry.type);
    } 

}

//get all the forms current data
const initData = () =>{
    let form = document.getElementById('waterResults').elements;
   for(let i = 1; i < 9; i++){
       let field = form[i].id.toLowerCase();
       waterData[field] = form[i].value; 
   }
   
}

//Setup the page
window.onload = () =>{
    initData();//populate the data model
    //wire up the submit data button
    const form = document.querySelector('#waterResults');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        addData();
    });

    const getWater = document.querySelector('#getData');
    getWater.addEventListener('click',function(e){
        e.preventDefault();
        getData();
    })

    //alert('The data entered into this page is public and will be deleted when the server sleeps');
}
