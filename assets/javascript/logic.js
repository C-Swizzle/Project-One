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




  //////////////////////key for dark sky weather api//////////////////////////
  ///example: https://api.darksky.net/forecast/[key]/[latitude],[longitude]/////
  
  //https://api.darksky.net/forecast/cd72cdbc3d4d03dd64ac2163dc4395b9/37.8267,-122.4233//

  //////////////////////key for dark sky weather api//////////////////////////


