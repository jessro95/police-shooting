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

	for (var i = data.length - 1; i >= 0; i--) {
		var circle = new L.circleMarker([data[i].lat, data[i].lng], {fillColor :'gray'})
		circle.bindPopup(data[i].Summary);

		// Adding to layer based on race
		var race = data[i].Race;
		if(race == "Unknown"){
			circle.addTo(unknown)
		}

		if(race == "White"){
			circle.addTo(white)
		}

		if(race == "Black or African American"){
			circle.addTo(black)
		}

		if(race == "Asian"){
			circle.addTo(asian)
		}

		if(race == "American Indian or Alaska Native"){
			circle.addTo(indian)
		}

		if(race == ("Native Hawaiian or Other Pacific Islander")){
			circle.addTo(hawaiian)
		}

		//changing color according to Killed or not. Killed = red
		if(race == ("Killed")){
			$circle.attr('fillColor', 'red')

		}

		//Add hover text
	}

	var overlayMaps = {
		"Unknown" : unknown,
		"White" : white,
		"Black or African American" : black,
		"Asian" : asian,
		"American Indian or Alaska Native" : indian,
		"Native Hawaiian or Other Pacific Islander" : hawaiian
	};

	
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  	L.control.layers(null,overlayMaps).addTo(map);
}
