
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBUm91ISX7r3E0e4GQPHlX6vwe-GT03uWQ",
  authDomain: "project-one-52a15.firebaseapp.com",
  databaseURL: "https://project-one-52a15.firebaseio.com",
  projectId: "project-one-52a15",
  storageBucket: "project-one-52a15.appspot.com",
  messagingSenderId: "653933644732"
};
firebase.initializeApp(config);

// adding some change to check if branch is working
var query;
$(document).on("click", "#location-submit", function(e) {
  e.preventDefault();
  query = $("#location-query").val();
  console.log(query);
  
  var latitude;
  var longitude;
  var state;
  var country;
  var formatted;
  
  
  
  //opencage (latitude longitude) API
  $.ajax({
    url: "https://api.opencagedata.com/geocode/v1/json?q="+query+"&key=7f6166b91c1343faac23e99b69da427a",
    method:"GET"
    
  }).then(function(response) {
    console.log(response);
    latitude = response.results[0].geometry.lat;
    longitude = response.results[0].geometry.lng;
    state=response.results[0].components.state;
    country=response.results[0].components.country;
    formatted=response.results[0].formatted;
// darksky api
$("#summary").empty();
var $h=$("<h1>");
$h.text("Want a different place? Maybe you meant one of these!");
$("#summary").append($h);
for (var i=1; i<response.results.length; i++) {
  var $a=$("<a href='#' class='text-primary others-notbs'>");
  $a.attr("data-latitude", response.results[i].geometry.lat);
  $a.attr("data-longitude", response.results[i].geometry.lng);
  $a.text(response.results[i].formatted);
  $("#summary").append($a);
  var br=$("<br>");
  $("#summary").append(br);
}
$.ajax({
  url:"https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c896d15d2a8926d09cc36230360c18f8/"+latitude+","+longitude,
  method: "GET"
}).then(function(response){
  console.log(response);
  // console.log(response);
  var obj=response;
  // $("#summary").empty();
 

  for (var i=6; i>=0;i--) {
    var $p = $("<p class='text-success'>");
    var dum = i+1;
    $p.text("Day " + dum + ": " + obj.daily.data[i].summary);
    $("#summary").prepend($p);
  }
  var $h1=$("<h1>");
  $h1.text("Weather Results for: " + formatted);
  $("#summary").prepend($h1);

})

  })
})



//////////////////////key for dark sky weather api//////////////////////////
///example: https://api.darksky.net/forecast/[key]/[latitude],[longitude]/////

//https://api.darksky.net/forecast/cd72cdbc3d4d03dd64ac2163dc4395b9/37.8267,-122.4233//

//////////////////////key for dark sky weather api//////////////////////////

$(document).on("click", ".others-notbs", function() {
  var latitudeFromHere=$(this).attr("data-latitude");
  var longitudeFromHere=$(this).attr("data-longitude");
  var place =$(this).text();
$.ajax({
  url:"https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c896d15d2a8926d09cc36230360c18f8/"+latitudeFromHere+","+longitudeFromHere,
  method: "GET"

}).then(function(response){
  var obj=response;
  $("#summary").empty();
 var $hhh=$("<h1>");
 $hhh.text("Weather Results for: " + place);
 for (var i=6; i>=0;i--) {
  var $p = $("<p class='text-success'>");
  var dum = i+1;
  $p.text("Day " + dum + ": " + obj.daily.data[i].summary);
  // var $icon = $("	<canvas id='"+obj.daily.data[i].icon+"' width='64' height='64'></canvas>");
  // $p.append($icon);
  $("#summary").prepend($p);
}
$("#summary").prepend($hhh);
});
});


// ROAD CONDITIONS
    console.log('test01');
$(document).on('click', '#route-submit', function(event){
  event.preventDefault();  
    console.log('onclick');
  
    var routeList = $('#route-list');
    console.log(routeList);
    for (var i = 0; i < routeList[0].length; i++){
      var index = routeList[0][i].selected;
      if(index === true){

      var selectedRoute = routeList[0][i].value;
      }
    }
    
    console.log(selectedRoute);
    // $("#display-conditions").empty();
    $('#display-conditions').load('https://cors-anywhere.herokuapp.com/http://www.dot.ca.gov/hq/roadinfo/' + selectedRoute);

  });

 
 //CAMPGROUND API Key: CV62R4AWQVP6W4Z6ZWS5XWT4
$(document).on('click', '#campground-submit', function(){
  event.preventDefault();
  var proxy = 'https://cors-anywhere.herokuapp.com/';

  var parkName = '';
  $.ajax({
    url: proxy + 'http://api.amp.active.com/camping/campgrounds/?pstate=CA&pname=' + parkName + '&api_key=cv62r4awqvp6w4z6zws5xwt4',
    method: 'GET'
  }).then(function(response){
    console.log(xmlToJson(response));
  })


  $('#display-campground').text(response);

})

// Changes XML to JSON
function xmlToJson(xml) {
	
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};