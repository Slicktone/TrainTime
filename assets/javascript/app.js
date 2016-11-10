// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAU_Vk3wCzoKNsjLctNGYjAZtZGQnAL2Ww",
    authDomain: "traintime-1024b.firebaseapp.com",
    databaseURL: "https://traintime-1024b.firebaseio.com",
    storageBucket: "traintime-1024b.appspot.com",
    messagingSenderId: "217298775920"
  };
    firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();
var nextTrain;
var minsToNext;

$("#addBtn").on("click", function(){
   //Grab user input
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainfrequencyinMinutes = $("#frequencyinMinutes").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();

    //temporary object for train data
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        frequency: trainfrequencyinMinutes,
        firstTrain: firstTrainTime
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
        // uploads train data
    database.ref().push(newTrain);
    // **************************************************************************************************
    // Start moment.JS
   
    var cleanTime = moment(time, "hh:mm").subtract(1, "years");
    console.log(cleanTime);

    // Displays Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Time Difference
    var diffTime = moment().diff(moment(cleanTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Remainder of time (frequency)
    var timeRemaining = diffTime % frequency;
    console.log(timeRemaining);

    // Minutes until arrival
    var minsToNext = frequency - timeRemaining;
    console.log("MINUTES UNTIL TRAIN: " +minsToNext);

    // Next Train
    var nextTrain = moment().add(minsToNext, "minutes")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);

    alert("TRAIN ADDED");

    //clears all text boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#frequencyinMinutes").val("");
    $("#firstTrainTime").val("");


    //prevents page from reloading
    return false;

});

// firebase event for adding trains to database and row in html when user adds entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){
 console.log(childSnapshot.val());

 $(".added-table").append("<tr>+<td>"+childSnapshot.val().trainName+"<td>"+childSnapshot.val().trainDestination+"<td>"+childSnapshot.val().trainfrequencyinMinutes+"<td>"+nextTrain+"<td>"+minsToNext);


    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainfrequencyinMinutes);
    // console.log(firstTrainTime);
});




