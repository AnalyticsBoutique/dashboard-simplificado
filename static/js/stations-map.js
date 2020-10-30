// MAP Stations

//*************************************************************//
// MAPPING:  
//*************************************************************//

var blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-gold.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-orange.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-yellow.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-violet.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greyIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-grey.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

function mapping(data, Coordenadas) {
  //console.log([ parseFloat(data.data[0].lat) , parseFloat(data.data[0].lng) ]);
  //console.log(data.data);
  //console.log(Coordenadas);
  //console.log( getKilometros(Coordenadas[0], Coordenadas[1], parseFloat(data.data[0].lat), parseFloat(data.data[0].lng) ));

  var stationMarkers = [];
  var Regular = [];
  var Premium = [];
  var Diesel = [];
  var stationMarkerregs = [];
  var stationMarkerpres = [];
  var stationMarkerdies = [];
    
  // For each station, create a marker and bind a popup with the station's name
  for (var index = 0; index < data.data.length; index++) {
    if ( getKilometros(Coordenadas[1], Coordenadas[0], parseFloat(data.data[index].lat), parseFloat(data.data[index].lng) ) <= 5 ){
      var stationMarker = L.marker([data.data[index].lat, data.data[index].lng],{icon: greenIcon}).bindPopup("<h4>" 
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

  console.log(stationMarkers);
  console.log(Regular);
  console.log(Premium);
  console.log(Diesel);

  var regularfloat = Regular.map(v=> parseFloat(v,10));
  var premiumfloat = Premium.map(v=> parseFloat(v,10));
  var dieselfloat  = Diesel.map(v=> parseFloat(v,10));
  const regularfloat1 = regularfloat.filter(x => !Number.isNaN(x));
  const premiumfloat1 = premiumfloat.filter(x => !Number.isNaN(x));
  const dieselfloat1 = dieselfloat.filter(x => !Number.isNaN(x));
  console.log(regularfloat1);
  console.log(premiumfloat1);
  console.log(dieselfloat1);

  regularfloat1.sort();
  var lenreg =  regularfloat1.length;
  var per25reg =  Math.floor(lenreg*.25) - 1;
  var per75reg =  Math.floor(lenreg*.75) - 1;
  var per25reg1=  regularfloat1[per25reg];
  var per75reg1=  regularfloat1[per75reg];

  console.log(per25reg1);
  console.log(per75reg1);

  premiumfloat1.sort();
  var lenpre =  premiumfloat1.length;
  var per25pre =  Math.floor(lenpre*.25) - 1;
  var per75pre =  Math.floor(lenpre*.75) - 1;
  var per25pre1=  premiumfloat1[per25pre];
  var per75pre1=  premiumfloat1[per75pre];

  console.log(per25pre1);
  console.log(per75pre1);
  

  dieselfloat1.sort();
  var lendie =  dieselfloat1.length;
  var per25die =  Math.floor(lendie*.25) - 1;
  var per75die =  Math.floor(lendie*.75) - 1;
  var per25die1=  premiumfloat1[per25die];
  var per75die1=  premiumfloat1[per75die];

  console.log(per25die1);
  console.log(per75die1);

  for (var index = 0; index < data.data.length; index++) {
    if ( getKilometros(Coordenadas[1], Coordenadas[0], parseFloat(data.data[index].lat), parseFloat(data.data[index].lng) ) <= 5 ){
        console.log(data.data[index].regular);
        var stationMarkerreg = L.marker([data.data[index].lat, data.data[index].lng],{icon: icon_color(data.data[index].regular, per25reg1, per75reg1)}).bindPopup("<h4>" 
                          + data.data[index].name + "<h4><h4>Franquicia: " 
                          + data.data[index].Franquicia_Marca + "<h4><h4>Permiso: " 
                          + data.data[index].cre_id + "<h4><hr><h4>Precios: </h4><p>Magna: " 
                          + data.data[index].regular);
        stationMarkerregs.push(stationMarkerreg);

        var stationMarkerpre = L.marker([data.data[index].lat, data.data[index].lng],{icon: icon_color(data.data[index].premium, per25pre1, per75pre1)}).bindPopup("<h4>" 
                          + data.data[index].name + "<h4><h4>Franquicia: " 
                          + data.data[index].Franquicia_Marca + "<h4><h4>Permiso: " 
                          + data.data[index].cre_id 
                          + "<p><p>Premium: " 
                          + data.data[index].premium );
        stationMarkerpres.push(stationMarkerpre);

        var stationMarkerdie = L.marker([data.data[index].lat, data.data[index].lng],{icon: icon_color(data.data[index].diesel, per25die1, per75die1)}).bindPopup("<h4>" 
                          + data.data[index].name + "<h4><h4>Franquicia: " 
                          + data.data[index].Franquicia_Marca + "<h4><h4>Permiso: " 
                          + data.data[index].cre_id
                          + "<p><p>Diésel: " 
                          + data.data[index].diesel + "<p>");
        stationMarkerdies.push(stationMarkerdie);
    };
  };
  console.log(stationMarkerregs);
  console.log(stationMarkerpres);
  console.log(stationMarkerdies);


  
  function icon_color(d, min, max) {
    console.log(d);
    if (d >0 && d <= min) {return greenIcon};
    if (d >min && d <= max) {return goldIcon};
    if (d > max) {return redIcon};
    if (d == null) {return greyIcon};
  };

  
  // Llamamos a la función de crear mapa 
  createMap(L.layerGroup(stationMarkerregs), L.layerGroup(stationMarkerpres), L.layerGroup(stationMarkerdies));
  
  
  // Create base street-map:
  function createMap(stationMarkerregs, stationMarkerpres, stationMarkerdies) {
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
        var baseMaps = {  "Regular": stationMarkerregs, "Premium": stationMarkerpres, "Diesel": stationMarkerdies };
  
        // Create an overlayMaps object to hold the bikeStations layer
        var overlayMaps = { "Light Map": lightmap };
  
        // Create the map object with options
        var map = L.map("map", {
          center: [Coordenadas[1], Coordenadas[0]],
          zoom: 13,
          layers: [lightmap, stationMarkerregs, stationMarkerpres, stationMarkerdies]
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
