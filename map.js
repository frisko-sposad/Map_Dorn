var image = 'map';
var width = 6144;
var height = 3761;
var maxLevel = 5;
var minLevel = 2;
var orgLevel = 5;

// Some weird calculations to fit the image to the initial position
// Leaflet has some bugs there. The fitBounds method is not correct for large scale bounds
var tileWidth = 256 * Math.pow(2, orgLevel);
var radius = tileWidth / 2 / Math.PI;
var rx = width - tileWidth / 2;
var ry = -height + tileWidth / 2;

var west = -180;
var east = (180 / Math.PI) * (rx / radius);
var north = 85.05;
var south = (360 / Math.PI) * (Math.atan(Math.exp(ry / radius)) - Math.PI / 4);
var rc = (tileWidth / 2 + ry) / 2;

var bounds = [
  [south, west],
  [north, east],
];

var map = new L.Map('map', { maxBounds: bounds });

L.tileLayer(image + '/{z}-{x}-{y}.jpg', {
  maxZoom: maxLevel,
  minZoom: minLevel,
  opacity: 1.0,
  zIndex: 1,
  noWrap: true,
  attribution: '<a href="https://vpi-app.netlify.app/map">vpi-app</a>',
}).addTo(map);

var zoom = 4;
var center = new L.latLng(90, -45);

map.setView(center, zoom);

//remember last position
var rememberLat = document.getElementById('latitude').value;
var rememberLong = document.getElementById('longitude').value;
if (!rememberLat || !rememberLong) {
  rememberLat = 0;
  rememberLong = 0;
}
