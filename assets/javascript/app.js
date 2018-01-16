// Initialize Firebase
var config = {
    apiKey: "AIzaSyDPmJajj0pgDRc8SNqO9LyUTC-Sf0gpX1A",
    authDomain: "test-project-48f2e.firebaseapp.com",
    databaseURL: "https://test-project-48f2e.firebaseio.com",
    projectId: "test-project-48f2e",
    storageBucket: "test-project-48f2e.appspot.com",
    messagingSenderId: "702231570917"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";


  // Capture Button Click
  $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#ftt-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
          Train: trainName,
          Destination: destination,
          "First Train Time": firstTrainTime,
          Frequency: frequency
      });
  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      console.log(snapshot.val());
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Change the HTML to reflect
      $("#trainName-display").text(sv.Train);
      $("#destination-display").text(sv.Destination);
      $("#frequency-display").text(sv.Frequency);
    //   $("#nextArrival-display").text(sv.nextArrival);
    //   $("#minutesAway-display").text()
  })
