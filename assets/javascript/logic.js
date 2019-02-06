 //Active Search API Key: SAXTH2D7NCRDMQYTH4Q2ACYK
 //Campground API Key: CV62R4AWQVP6W4Z6ZWS5XWT4
 
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


  //opencage (latitude longitude) API
  $.ajax({
    url: "https://api.opencagedata.com/geocode/v1/json?q="+query+"&key=7f6166b91c1343faac23e99b69da427a",
    method:"GET"

  }).then(function(response) {
    console.log(response);
    latitude = response.results[0].geometry.lat;
    longitude = response.results[0].geometry.lng;
    
// darksky api
$.ajax({
  crossOrigin: true,
  datatype: "jsonp",
  url:"https://api.darksky.net/forecast/c896d15d2a8926d09cc36230360c18f8/"+latitude+","+longitude,
  method: "GET"
}).then(function(response){
  console.log(JSON.parse(response));
  var obj=JSON.parse(response);
  for (var i=0; i<7;i++) {
    $p = $("<p>");
    var dum = i+1;
    $p.text("Day " + dum + ": " + obj.daily.data[i].summary);
    $("#summary").append($p);
  }

})

  })
})



  //////////////////////key for dark sky weather api//////////////////////////
  ///example: https://api.darksky.net/forecast/[key]/[latitude],[longitude]/////
  
  //https://api.darksky.net/forecast/cd72cdbc3d4d03dd64ac2163dc4395b9/37.8267,-122.4233//

  //////////////////////key for dark sky weather api//////////////////////////


