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
  var state;
  var country;
  var formatted;
  
  
  
  //opencage (latitude longitude) API
  $.ajax({
    crossOrigin: true,
    url: "https://api.opencagedata.com/geocode/v1/json?q="+query+"&key=7f6166b91c1343faac23e99b69da427a",
    method:"GET"
    
  }).then(function(response) {
    console.log(response);
    latitude = response.results[0].geometry.lat;
    longitude = response.results[0].geometry.lng;
    state=response.results[0].components.state;
    country=response.results[0].components.country;
    formatted=response.results[0].formatted;
    console.log(latitude);
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
    var ppp = "https://api.darksky.net/forecast/c896d15d2a8926d09cc36230360c18f8/"+latitude+","+longitude;
    console.log('ppp',ppp);
    // $.ajax({
    //   crossOrigin: true,
    //   datatype: "jsonp",
    //   url: ppp,
    //   method: "GET"
    // }).then(function(response){
    //   console.log(JSON.parse(response));
    //   // console.log(response);
    //   var obj=JSON.parse(response);
    //   // $("#summary").empty();
      
      
    //   for (var i=6; i>=0;i--) {
    //     var $p = $("<p class='text-success'>");
    //     var dum = i+1;
    //     $p.text("Day " + dum + ": " + obj.daily.data[i].summary);
    //     // var $icon = $("	<canvas id='"+obj.daily.data[i].icon+"' width='64' height='64'></canvas>");
    //     // $p.append($icon);
    //     $("#summary").prepend($p);
    //   }
    //   var $h1=$("<h1>");
    //   $h1.text("Weather Results for: " + formatted);
    //   $("#summary").prepend($h1);
      
    // })
    
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
    crossOrigin: true,
    datatype: "jsonp",
    url:"https://api.darksky.net/forecast/c896d15d2a8926d09cc36230360c18f8/"+latitudeFromHere+","+longitudeFromHere,
    method: "GET"
    
  }).then(function(response){
    var obj=JSON.parse(response);
    $("#summary").empty();
    var $hhh=$("<h1>");
    $hhh.text("Weather Results for: " + place);
    
    for (var i=6; i>=0;i--) {
      var $p = $("<p class='text-success'>");
      var dum = i+1;
      $p.text("Day " + dum + ": " + obj.daily.data[i].summary);
      $("#summary").prepend($p);
    }
    $("#summary").prepend($hhh);
  });
});



    console.log('test01');
$(document).on('click', '#traffic-submit', function(event){
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
    // var selectedRoute = routeList.options[routeList.selectedIndex].value;
    console.log(selectedRoute);
    // $("#display-traffic").empty();
    $('#display-traffic').load('http://www.dot.ca.gov/hq/roadinfo/' + selectedRoute);

  });
  //     for (var i=1; i<301; i++) {
  //       var SR=$("<option>");
  //       SR.text("SR*" + i);
  //       var SRvalue="sr" + i;
  //       SR.attr("value", SRvalue);
  //       $("#route-list").append(SR[0]);
  //       console.log(SR);
  //      }

