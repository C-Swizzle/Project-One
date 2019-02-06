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

  $(document).on("click", "#location-submit", function(e) {
    e.preventDefault();
    var query = $("#location-query").val();
    console.log(query);
  })