const form = document.querySelector('#waterResults');

const handleChange = (event) =>{
    console.log(event.target.id + 'has changed');
    field = event.target.id;
    waterData.field = event.target.value; 
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    waterData.date = Date.now();
    addData()
})

let waterData = {
    date:'today',
    ph: 0,
    chlorine:0,
    alkalinity:0,
    hardness:0,
    cyanuricAcid:0,
    solids:0,
    notes:'none'
}

const addData = () =>{
    console.log('called data submit');

}
