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
