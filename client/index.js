const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker");

/*
  * Instantiate the Map
  */

mapboxgl.accessToken = "pk.eyJ1IjoiZm9ycmVzdHdlaXN3b2xmIiwiYSI6ImNqNjgzbzZidTBicXYzMnBsd2Vib3dyMDIifQ.QoJCtUmn8qbtM9iosPGlhA";
const map = new mapboxgl.Map({
  container: "map-canvas",
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: "mapbox://styles/mapbox/streets-v10"
});


/*
  * Fetch data from API
  */

fetch('/api')
.then(result => result.json())
.then(function(data) {
  populate('hotels-choices', data[0])
  populate('restaurants-choices', data[1])
  populate('activities-choices', data[2])
})

function populate(elementID, attractions) {
  var parentElement = document.getElementById(elementID);

  attractions.forEach(function(attraction){
    var optionElement = document.createElement('option')
    var name = attraction.name

    optionElement.append(name)
    parentElement.append(optionElement)
  })
}

document.getElementById('hotels-add').addEventListener('click',function(){
  var hotelID = document.getElementById('hotels-choices');
  var selectedOption = hotelID.options[hotelID.selectedIndex].value;
  
  var listElement = document.getElementById('hotels-list');
  var newItem = document.createElement('li');
  
  var newButton = document.createElement('button');
  newButton.classList.add('btn-danger','btn-circle','pull-right');
  newButton.setAttribute('id','hotels-remove');
  newButton.append('x');

  newItem.append(selectedOption);
  listElement.append(newItem);
  listElement.append(newButton);
  
})

document.getElementById('restaurants-add').addEventListener('click',function(){
  var restaurantID = document.getElementById('restaurants-choices');
  var selectedOption = restaurantID.options[restaurantID.selectedIndex].value;
  var listElement = document.getElementById('restaurants-list');
  var newItem = document.createElement('li');
  
  var newButton = document.createElement('button');
  newButton.classList.add('btn-danger','btn-circle','pull-right');
  newButton.append('x');

  newItem.append(selectedOption);
  listElement.append(newItem);
  listElement.append(newButton);

})

document.getElementById('activities-add').addEventListener('click',function(){
  var activityID = document.getElementById('activities-choices');
  var selectedOption = activityID.options[activityID.selectedIndex].value;
  var listElement = document.getElementById('activities-list');
  var newItem = document.createElement('li');

  var newButton = document.createElement('button');
  newButton.classList.add('btn-danger','btn-circle','pull-right');
  newButton.append('x');

  newItem.append(selectedOption);
  listElement.append(newItem);
  listElement.append(newButton);
})

document.getElementById('itinerary').addEventListener('click',function(button){
  var parent = button.target.parentNode;
  console.log(parent);
  parent.parentNode.removeChild(parent);
})






// document.getElementById('restaurants-add').addEventListener('click',console.log('hotels'))
// document.getElementById('activities-add').addEventListener('click',console.log('hotels'))

