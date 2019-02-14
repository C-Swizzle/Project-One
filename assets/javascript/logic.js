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
      $("#summary").css("display","inline-block");  
    
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
  var airURL = "https://cors-anywhere.herokuapp.com/https://api.airbnb.com/v2/explore_tabs?key="+apikey+"&refinement_paths%5B%5D=%2Fhomes&lat="+latitude+"&lng="+longitude;
  
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
      // crossOrigin: true,
    url: airURL,
    // dataType: "json",
    method: "GET",
  }) .then(function(response) {
  var results = response;
  console.log(results);

  // Clear airbnb row before displaying results
  $("#display-air").empty();
  $("#section3").attr("id", "section3a");

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
      console.log(results.explore_tabs[0].sections[0][lType]);
  for (var li = 0; li < listingsIndex.length; li++) {
    var airSec = results.explore_tabs[0].sections[si];
   
    // Shorten links into vars
    var listName = airSec[lType][li].listing.name;
    var bedrooms = airSec[lType][li].listing.bedroom_label;
    var listCity = airSec[lType][li].listing.city;
    var listSumm = airSec[lType][li].listing.summary;
    var lImg = airSec[lType][li].listing.picture_url;
    var rateStart = airSec[lType][li].pricing_quote.price_string;
    var linkID = airSec[lType][li].listing.id;
    var airLink = "https://www.airbnb.com/rooms/"+linkID;

    // possible $$rate per freq display instead of starting rate(future use)
    var rate = results.explore_tabs[0].sections[si][lType][li].pricing_quote.rate.amount_formatted;
    var freq = results.explore_tabs[0].sections[si][lType][li].pricing_quote.rate_type;

    // create outer div for each listing
    var $div1 = $("<div>");
    // $div1.attr("id", linkID);
    $div1.attr("style", "margin: 5px; padding: 5px; display: inline-block;width: 150px;");

    // create inner div for image and title
    var $div2 = $("<div>");
    $div2.attr("class", "airListing");
     
    // set temporary styling to apply background listing image
    $div2.attr("style", "height: 150px; width: 150px; color: #FFF; text-shadow: -1px -1px 10px #000, 1px -1px 10px #000, -1px 1px 10px #000, 1px 1px 10px #000; background: url("+lImg+"); background-repeat: no-repeat; background-position: center; background-size: cover; vertical-align: bottom;");
    var $img = $("<img>");
    $img.attr("src", "./assets/images/blank_spacer.png");
    $img.attr("height", "150px");
    $img.attr("width", "150px");
    var $ancor = $("<a>");
    $ancor.attr("href", airLink);
    $ancor.attr("target", "_blank");
    $ancor.attr("class", "linkTitle");
    $ancor.attr("summary", listName+"<br>"+bedrooms);
    $ancor.append($img);
    $div2.append($ancor);
    $div1.append($div2);
    $div1.append("<a class=\"airLink\" target=\"_blank\" href='"+airLink+"'>"+rateStart+"</a>");
    $div1.append("<br><a class=\"airLink\" target=\"_blank\" href='"+airLink+"'>"+listCity+"</a>");
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
    ///////user input validation, must be filled before submission works/////
    


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
    $("#submitContact").on("submit", function(event){
      //keep the page from refreshing
      event.preventDefault();
      //create variables to store the values of each input from the form 
      var name = $("#name").val().trim();
      var email = $("#email").val().trim();
      var message = $("#message").val().trim();
      
      
      //add the stored values to the linked Firebase database 
      projectDatabase.ref().child("contactFormInfo").push({
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
        $("#highwayResults").css("display", "inline-block"); 
        $('#display-conditions').load('https://cors-anywhere.herokuapp.com/http://www.dot.ca.gov/hq/roadinfo/' + selectedRoute);
    
      });
    /////////////////////////////////END ROAD CONDITIONS///////////////////////////
    
    
     //////////////////////////////////////////////////
      ///// CAMPGROUND STARTS HERE /////////////////////////
      //////////////////////////////////////////////////
      var campLat;
      var campLong;
      var campName;
      var campImage;
      var campPets;
      var campWater;
      var campSewer;
    
      $(document).on('click', '#campground-submit', function(){
        event.preventDefault();
        var apikey = 'CV62R4AWQVP6W4Z6ZWS5XWT4';
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        parkName = $("#park-search").val();
        parkName = parkName.replace(' ', '+');
        console.log(parkName);
    
        var activeURL = 'https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?pstate=CA&pname=' + parkName + '&api_key=cv62r4awqvp6w4z6zws5xwt4'
        console.log(activeURL);
     
        
        var facilityPhotoURL =  'http://www.reserveamerica.com'
    
      $.ajax({
        crossOrigin: 'true',
        url: activeURL,
        method: 'GET'
      }).then(function(response){
        // console.log(response);
        console.log(xmlToJson(response));
        
        var campObject = (xmlToJson(response));
        campObject = campObject.resultset.result;
        if (!Array.isArray(campObject)) {
          campObject = [campObject];
        }
        console.log('campObject', campObject);
      
        $("#display-campground").empty();
        for (var index = 0; index < campObject.length; index++){
          
          campName = campObject[index]['@attributes'].facilityName;
          campPhoto = facilityPhotoURL + campObject[index]['@attributes'].faciltyPhoto;
          campPets = campObject[index]['@attributes'].sitesWithPetsAllowed;
          campWater = campObject[index]['@attributes'].sitesWithWaterHookup;
          campSewer = campObject[index]['@attributes'].sitesWithSewerHookup;
          
    
          var campInfoDiv = $('<div id="camp-info">');
          $('#display-campground').append(campInfoDiv);
          var $displayName = ('<p> Campground Name:' + campName + '</p>');
          var $displayImage = ('<img src="' + campPhoto + '">');
          var $displayPets = ('<p>Are Pets allowed?:' + campPets + '</p>');
          var $displayWater = ('<p> Water Hookup?:' + campWater + '</p>');
          var $displaySewer = ('<p> Sewer Hookup?:' + campSewer + '</p>');
         
          $(campInfoDiv).append($displayName);
          $(campInfoDiv).append($displayImage);
          $(campInfoDiv).append($displayPets);
          $(campInfoDiv).append($displayWater);
          $(campInfoDiv).append($displaySewer);
          $(campInfoDiv).append('<hr>');
        }
    
      })
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
    ///////////////////////////
    
    // });
    
    });