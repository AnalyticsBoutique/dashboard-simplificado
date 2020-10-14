// MAP Stations

//*************************************************************//
// MAPPING:  
//*************************************************************//

function mapping(data, Coordenadas) {
  //console.log([ parseFloat(data.data[0].lat) , parseFloat(data.data[0].lng) ]);
  //console.log(data.data);
  //console.log(Coordenadas);
  //console.log( getKilometros(Coordenadas[0], Coordenadas[1], parseFloat(data.data[0].lat), parseFloat(data.data[0].lng) ));

  var stationMarkers = [];
  var Regular = [];
  var Premium = [];
  var Diesel = [];
    
  // For each station, create a marker and bind a popup with the station's name
  for (var index = 0; index < data.data.length; index++) {
    if ( getKilometros(Coordenadas[1], Coordenadas[0], parseFloat(data.data[index].lat), parseFloat(data.data[index].lng) ) <= 5 ){
      var stationMarker = L.marker([data.data[index].lat, data.data[index].lng]).bindPopup("<h4>" 
                          + data.data[index].name + "<h4><h4>Franquicia: " 
                          + data.data[index].Franquicia_Marca + "<h4><h4>Permiso: " 
                          + data.data[index].cre_id + "<h4><hr><h4>Precios: </h4><p>Magna: " 
                          + data.data[index].regular + "<p><p>Premium: " 
                          + data.data[index].premium + "<p><p>Diésel: " 
                          + data.data[index].diesel + "<p>");
    // Add the marker to the stationMarkers, gas an diesel arrays
    stationMarkers.push(stationMarker);
    Regular.push(data.data[index].regular);
    Premium.push(data.data[index].premium);
    Diesel.push(data.data[index].diesel);
    };
  };
  // Llamamos a la función de crear mapa 
  createMap(L.layerGroup(stationMarkers));
  
  // Create base street-map:
  function createMap(stationMarkers) {
    // Create the tile layer that will be the background of our map
//    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//          attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//          maxZoom: 20,
//          id: "mapbox.light",
//          accessToken: API_KEY
//          });
    var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: 'mapbox/light-v10',
          accessToken: API_KEY
          });
  
        // Create a baseMaps object to hold the lightmap layer
        var baseMaps = { "Light Map": lightmap };
  
        // Create an overlayMaps object to hold the bikeStations layer
        var overlayMaps = { "Gas Stations": stationMarkers };
  
        // Create the map object with options
        var map = L.map("map", {
          center: [Coordenadas[1], Coordenadas[0]],
          zoom: 13,
          layers: [lightmap, stationMarkers]
          });
    
        // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
    }).addTo(map);
  };

  // Rellenamos los datos de precios promedio en la zona
  // Regular
  var currentGas87 = Regular.filter(function (el) { return el != null });
  var currentGas87Mean = d3.mean(currentGas87);
  document.getElementById("text1").innerHTML = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentGas87Mean);
  // Premium
  var currentGas91 = Premium.filter(function (el) { return el != null });
  var currentGas91Mean = d3.mean(currentGas91);
  document.getElementById("text2").innerHTML = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentGas91Mean);
  // Diesel
  var currentDiesel = Diesel.filter(function (el) { return el != null });
  var currentDieselMean = d3.mean(currentDiesel);
  document.getElementById("text3").innerHTML = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentDieselMean);
};

//*************************************************************//
// GET KILOMETERS:  
//*************************************************************//

function getKilometros(lat1,lon1,lat2,lon2) {
  rad = function(x) {return x*Math.PI/180;};
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d.toFixed(3); //Retorna tres decimales
};
//console.log(getKilometros(19.466418, -99.183525, 19.43275,-99.1536137));

//*************************************************************//
// MODELO GENERAL:  
//*************************************************************//

d3.json("Data/Price_Stations.json").then(function(data) {
  //*************************************************************//
  // Data Init:
  //*************************************************************//
  mapping(data, [ -99.12766 , 19.42847 ]); // Iniciamos en CDMX
});

//*************************************************************//
// Response to Submit, Data CHANGE, UPDATE MAPPING:  
//*************************************************************//
function updateData() {

  var inputcity = document.getElementById("inputcity").value;
  var accessToken = API_KEY;
    
  d3.json(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputcity}.json?access_token=${accessToken}`).then(function(data) {
    
  //console.log(data.features[0].center);
  var lon = data.features[0].center[0]
  var lat = data.features[0].center[1]
  //console.log(lon);
        
  // Revisamos que coordenadas esten en México
  if ((lat > 11.4) && (lat < 32.9) && (lon > -118.7) && (lon < -83.3)) {
    
    // Removemos textos y mapas segun se van actualizando
    d3.select("#message").remove();

    d3.select("#map").remove();

    d3.select("#NewMap").html("<div id=\"map\" style = \"width: 700px; height: 500px\"></div>");

    d3.json("Data/Price_Stations.json").then(function(data) {
    
      mapping( data, [ lon, lat ] );

    });

  } else {

    d3.select("#message").remove();

    d3.select("#NewMessage").html("<h4 id=\"message\" align=\"center\" style=\"color: red\"><strong> Please be more specific about the location or consider only locations in Mexico </strong></h4>");

  };
  });
};
