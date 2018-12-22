

// Initialize Firebase


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDs5FHWjCbjLC1zcCa9I4sISYLt2HyeyJ4",
    authDomain: "trains-67bb9.firebaseapp.com",
    databaseURL: "https://trains-67bb9.firebaseio.com",
    projectId: "trains-67bb9",
    storageBucket: "trains-67bb9.appspot.com",
    messagingSenderId: "308041600379"
};
firebase.initializeApp(config);
var database = firebase.database();
// var trainName = "";
// var destination = "";
// var frequency = "";
// var nextArrival = "";
// var trainTime
// var minAway = "";

$("#add-user").on("click", function (event) {

    event.preventDefault();

    var trainName = $(`#name-input`).val().trim();
    var destination = $(`#dest-input`).val().trim();
    var frequency = $(`#frequency-input`).val().trim();
    var trnTime = $(`#time-input`).val().trim();

    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        trainTime: trnTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


// database.ref().on("child_added", function (snapshot) {
//     var sv = snapshot.val();
//     var firstTimeConverted = moment(parseInt(snapshot.val().time), "HH:mm").subtract(1, "years");
//     var currentTime = moment();
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     var tRemainder = diffTime % snapshot.val().freq;
//     var tMinutesTillTrain = snapshot.val().freq - tRemainder;
//     var tName = $(`<p>`).text(sv.name);
//     var tDest = $(`<p>`).text(sv.destination);
//     var tfreq = $(`<p>`).text(sv.frequency);
//     var tarrival = $(`<p>`).text(sv.arrival);
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     var arrival = moment(nextTrain).format("hh:mm")
//     var row = $('<tr>' +
//         '<td scope="col-lg">' + snapshot.val().name + '</td>' +
//         '<td scope="col-lg">' + snapshot.val().destination + '</td>' +
//         '<td scope="col-lg">' + snapshot.val().frequency + '</td>' +
//         '<td scope="col-lg">' + snapshot.val().arrival + '</td>' +
//         '<td scope= "col-lg>' + snapshot.val().tMinutesTillTrain + '</td>' +
//         '<td scope="col-lg">' + tMinutesTillTrain + '</td>' +
//         '</tr>');
//     $("#tbody").append(row)

//     $("#trainName").append(tName);
//     $("#destination").append(tDest);
//     $("#frequency").append(tfreq);
//     $(`#arrival`).append(tarrival);
//     $(`#minutes`).append(arrival);

//     //Create Error Handling
// },
//     function (errorObject) {
//         console.log("The read failed: " + errorObject.code);

//     }
// });
database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    // Change the HTML to reflect
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(parseInt(snapshot.val().time), "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % snapshot.val().freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = snapshot.val().freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var arrival = moment(nextTrain).format("hh:mm")

    var row = $('<tr>' +
        '<td scope="col-lg">' + snapshot.val().name + '</td>' +
        '<td scope="col-lg">' + snapshot.val().destination + '</td>' +
        '<td scope="col-lg">' + snapshot.val().frequency + '</td>' +
        '<td scope="col-lg">' + snapshot.val().trainTime + '</td>' +
        '<td scope="col-lg">' + arrival + '</td>' +
        '<td scope="col-lg">' + tMinutesTillTrain + '</td>' +
        '</tr>');
    $("#tbody").append(row)
    console.log(parseInt(snapshot.val().time))
});