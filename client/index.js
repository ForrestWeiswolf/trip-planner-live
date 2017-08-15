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
