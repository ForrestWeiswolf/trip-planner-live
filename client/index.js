const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

/*
 * Instantiate the Map
 */

const center = [-74.0, 40.731]

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9ycmVzdHdlaXN3b2xmIiwiYSI6ImNqNjgzbzZidTBicXYzMnBsd2Vib3dyMDIifQ.QoJCtUmn8qbtM9iosPGlhA';
const map = new mapboxgl.Map({
  container: 'map-canvas',
  center: center,
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: 'mapbox://styles/mapbox/streets-v10'
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

var coordinates = {}

function populate(elementID, attractions) {
  var parentElement = document.getElementById(elementID);

  attractions.forEach(function(attraction) {
    var optionElement = document.createElement('option')

    optionElement.append(attraction.name)
    parentElement.append(optionElement)
    coordinates[attraction.name] = attraction.place.location
  })
}

['hotels', 'restaurants', 'activities'].forEach((attractionType) => {
  document.getElementById(attractionType + '-add').addEventListener('click', function() {
    var typeID = document.getElementById(attractionType + '-choices');
    var selectedOption = typeID.options[typeID.selectedIndex].value;
    var listElement = document.getElementById(attractionType + '-list');
    var newListItem = document.createElement('li');

    var newButton = document.createElement('button');
    newButton.classList.add('btn-danger', 'btn-circle', 'pull-right');
    newButton.append('x');

    newListItem.append(selectedOption);
    listElement.append(newListItem);
    newListItem.append(newButton);

    const marker = buildMarker(attractionType, coordinates[selectedOption])
    marker._element.id = selectedOption
    marker.addTo(map);

    map.flyTo({center: coordinates[selectedOption], zoom: 15})
  })
})

document.getElementById('itinerary').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON'){
    var parent = event.target.parentNode;

    var marker = document.getElementById(parent.innerHTML.replace(/<.+/, '').replace('&amp;', '&'))
    parent.remove()

    map.flyTo({center: center, zoom: 12.5})
  }
})
