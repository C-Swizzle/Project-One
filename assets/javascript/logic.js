 //Active Search API Key: SAXTH2D7NCRDMQYTH4Q2ACYK
 //Campground API Key: CV62R4AWQVP6W4Z6ZWS5XWT4
 // Initialize Firebase
//  var config = {
//     apiKey: "AIzaSyBUm91ISX7r3E0e4GQPHlX6vwe-GT03uWQ",
//     authDomain: "project-one-52a15.firebaseapp.com",
//     databaseURL: "https://project-one-52a15.firebaseio.com",
//     projectId: "project-one-52a15",
//     storageBucket: "project-one-52a15.appspot.com",
//     messagingSenderId: "653933644732"
//   };
//   firebase.initializeApp(config);

  // adding some change to check if branch is working


$(document).ready(function(){

  
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

//////////////////////////////////////////////////
  ///// AIRBNB STARTS HERE /////////////////////////
  //////////////////////////////////////////////////
  // Inside "onClick" function

  var apikey = "d306zoyjsyarp7ifhu67rjxn52tv0t20"; // Public apiKey
  // var airURL = "https://api.airbnb.com/v2/explore_tabs?key="+apikey+"&_format=for_explore_search_web&lng="+longitude+"&lat="+latitude;
  var airURL = "https://api.airbnb.com/v2/explore_tabs?key="+apikey+"&refinement_paths%5B%5D=%2Fhomes&lat="+latitude+"&lng="+longitude;
  // var airURL = "https://api.airbnb.com/v2/explore_tabs?key="+apikey+"&refinement_paths%5B%5D=%2Fhomes&adults=0&children=0&infants=0&guests=0&allow_override%5B%5D=&map_toggle=true&zoom=10&search_by_map=true&sw_lat=38.80296766606032&sw_lng=-120.33803406967935&ne_lat=39.37878982432351&ne_lng=-119.70971404198677&s_tag=X6EQHTxB";
  // var airURL = "https://www.airbnb.com/s/Las-Vegas--NV--United-States/homes?refinement_paths%5B%5D=%2Fhomes&query=Las%20Vegas%2C%20NV%2C%20United%20States&adults=0&children=0&infants=0&guests=0&allow_override%5B%5D=&map_toggle=true&zoom=10&search_by_map=true&sw_lat=38.80296766606032&sw_lng=-120.33803406967935&ne_lat=39.37878982432351&ne_lng=-119.70971404198677&s_tag=X6EQHTxB";
  
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
      crossOrigin: true,
    url: airURL,
    dataType: "json",
  //   method: "GET",
  }) .then(function(response) {
  var results = JSON.parse(response);
  // console.log(results);

  // Clear airbnb row before displaying results
  $("#display-air").empty();

  // loop through available "sections" array, each containing multiple listings
  var sectionIndex = results.explore_tabs[0].sections;
  for (var si = 0; si < sectionIndex.length; si++) {
    // console.log(results.explore_tabs[0].sections[si]);
    var listTypes= results.explore_tabs[0].sections[si].result_type;
    // console.log(action);
  
    if (listTypes=== "listings") {
      var lType = "listings";
      // loop through only rental listing inside each "section"
      var listingsIndex = results.explore_tabs[0].sections[si][lType];
      // console.log(results.explore_tabs[0].sections[0][lType][li]);
  for (var li = 1; li < listingsIndex.length; li++) {
   
    var listName = results.explore_tabs[0].sections[si][lType][li].listing.name;
    var listCity = results.explore_tabs[0].sections[si][lType][li].listing.city;
    var lImg = results.explore_tabs[0].sections[si][lType][li].listing.picture_url;
    var rateStart = results.explore_tabs[0].sections[si][lType][li].pricing_quote.price_string;

    // possible $$rate per freq display instead of starting rate(future use)
    var rate = results.explore_tabs[0].sections[si][lType][li].pricing_quote.rate.amount_formatted;
    var freq = results.explore_tabs[0].sections[si][lType][li].pricing_quote.rate_type;

    // create outer div for each listing
    var $div1 = $("<div>");
    $div1.attr("style", "margin: 5px; padding: 5px; display: inline-block;width: 150px;");

    // create inner div for image and title
    var $div2 = $("<div>");

    // set temporary styling to apply background listing image
    $div2.attr("style", "height: 150px; color: #0000FF; width: 150px; background: url("+lImg+"); background-repeat: no-repeat; background-position: center; background-size: cover; vertical-align: bottom;");
    var $img = $("<img>");
    $div1.append($div2);
    $div2.append(listName);
    $div1.append(rateStart);
    $div1.append("<br>"+listCity);
    $("#display-air").append($div1);
  }  
    // for future listings of other airbnb activities
    } else if (listTypes=== "experiences") {
      var lType = "trip_templates"; 
    } else if (listTypes=== "refinements") {
      var lType = "refinements";
    } else {
      var lType = "";
    }
  // console.log(aList[lType]);
  }
})
  ////////////////////////////////////////////////
  ///// AIRBNB ENDS HERE /////////////////////////
  ////////////////////////////////////////////////

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


///////////////capture contact form info, save in firebase/////////////


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDaeMIfhGLcG0QfVToRlYSYIBW4LeVBoXI",
    authDomain: "groupproject1-ef4fd.firebaseapp.com",
    databaseURL: "https://groupproject1-ef4fd.firebaseio.com",
    projectId: "groupproject1-ef4fd",
    storageBucket: "groupproject1-ef4fd.appspot.com",
    messagingSenderId: "414755737460"
  };
  firebase.initializeApp(config);

var projectDatabase = firebase.database();

//onclick event when the submit button is clicked
$("#submitContact").on("click", function(event){
  //keep the page from refreshing
  event.preventDefault();
  //create variables to store the values of each input from the form 
  var name = $("#name").val().trim();
  var email = $("#email").val().trim();
  var message = $("#message").val().trim();
  
  
  //add the stored values to the linked Firebase database 
  projectDatabase.ref().child("project1").push({
      name: name,
      email: email,
      message: message,
  });
  // console.log(database);

   //clear the text boxes to prepare for the next entry
   $("#name").val("");
   $("#email").val("");
   $("#message").val("");
   
});


/////////////////////////////////mt contact firebase end///////////////////////////
    console.log('test01');
$(document).on('click', '#route-submit', function(event){
  event.preventDefault();  
    console.log('clicked');
  
    var routeList = $('#route-list');
    console.log(routeList);
    for (var i = 0; i < routeList[0].length; i++){
      var index = routeList[0][i].selected;
      if(index === true){

      var selectedRoute = routeList[0][i].value;
      }
    }
    // var selectedRoute = routeList.options[routeList.selectedIndex].value;
    console.log(selectedRoute);
    // $("#display-conditions").empty();
    $('#display-conditions').load('https://cors-anywhere.herokuapp.com/http://www.dot.ca.gov/hq/roadinfo/' + selectedRoute);

  });


// });

});