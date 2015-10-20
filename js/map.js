// Function to draw your map
var drawMap = function() {

  // Create map and set view
	var map = L.map('container').setView([28, -95], 4);

  // Create a tile layer variable using the appropriate url
 	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

  // Add the layer to your map
 	layer.addTo(map)

  // Execute your function to get data
  getData(map)
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
  	url:'data/response.json',
  	type: 'get',
  	dataType: 'json',
  	// When your request is successful, call your customBuild function
  	success: function(data){
  	customBuild(data, map);
  }
})
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map
	var unknown = new L.LayerGroup([]);
	var unknownKilled= new L.LayerGroup([]);
	var white = new L.LayerGroup([]);
	var whiteKilled = new L.LayerGroup([]);
	var black = new L.LayerGroup([]);
	var blackKilled = new L.LayerGroup([]);
	var asian = new L.LayerGroup([]);
	var asianKilled = new L.LayerGroup([]);
	var indian = new L.LayerGroup([]);
	var indianKilled = new L.LayerGroup([]);
	var hawaiian = new L.LayerGroup([]);
	var hawaiianKilled = new L.LayerGroup([]);
	var whiteHitNum = 0;
	var whiteKilledNum = 0;
	var blackHitNum = 0;
	var blackKilledNum = 0;
	for (var i = data.length - 1; i >= 0; i--) {
		var circle = new L.circleMarker([data[i].lat, data[i].lng], {fillColor :'gray'})
		circle.bindPopup(data[i].Summary);

		// Adding to layer based on race
		var race = data[i].Race;
		var killed = data[i]['Hit or Killed?']== "Killed";
		if(race == "Unknown"){
			if(killed){
				circle.setStyle({fillColor:'red'});
				circle.addTo(unknownKilled);
			} else {
				circle.addTo(unknown);
			}
		}

		if(race == "White"){
			if(killed){
				circle.setStyle({fillColor:'red'});
				circle.addTo(whiteKilled);
				whiteKilledNum++;
			} else {
				circle.addTo(white)
				whiteHitNum++;
			}
		}

		if(race == "Black or African American"){
			if(killed){
				circle.setStyle({fillColor:'red'});
				circle.addTo(blackKilled);
				blackKilledNum++;
			} else {
				circle.addTo(black);
				blackHitNum++;
			}
		}

		if(race == "Asian"){
			if(killed){
				circle.setStyle({fillColor:'red'});
				circle.addTo(asianKilled);
			} else {
	
				circle.addTo(asian);
			}
		}

		if(race == "American Indian or Alaska Native"){
			if(killed){
				circle.setStyle({fillColor:'red'});
				circle.addTo(indianKilled);
			} else {
				circle.addTo(indian);
			}
		}

		if(race == ("Native Hawaiian or Other Pacific Islander")){

			if(killed){
				circle.setStyle({fillColor:'red'});
				circle.addTo(hawaiianKilled);
			} else {
	
				circle.addTo(hawaiian);
			}
		}
		//Add hover text
	}

	var overlayMaps = {
		"Unknown & Hit" : unknown,
		"Unknown & Killed" : unknownKilled,
		"White & Hit" : white,
		"White & Killed" : whiteKilled,
		"Black or African American & Hit" : black,
		"Black or African American & Killed" : blackKilled,
		"Asian & Hit" : asian,
		"Asian & Killed" : asianKilled,
		"American Indian or Alaska Native & Hit" : indian,
		"American Indian or Alaska Native & Killed" : indianKilled,
		"Native Hawaiian or Other Pacific Islander & Hit" : hawaiian,
		"Native Hawaiian or Other Pacific Islander & Killed" : hawaiianKilled,
	};

	
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  	L.control.layers(null,overlayMaps).addTo(map);

  	//set attribute of number for index.html
  	$('#whiteKilled').text(whiteKilledNum);
  	$('#whiteHit').text(whiteHitNum);
  	$('#blackKilled').text(blackKilledNum);
  	$('#blackHit').text(blackHitNum);
}

var getNum = function(str){

}
