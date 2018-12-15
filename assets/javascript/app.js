function calNextArrival(firstTrainTime, frequency) {
    var currentime = moment()
    var FirstTrainFormatted = moment(firstTrainTime, 'HH:mm').format('X');
    var timedifference = currentime.diff(moment.unix(FirstTrainFormatted), "minutes");
    var timeLeft = timedifference % frequency;
    var mins = moment(frequency - timeLeft, "mm").format('mm');
    var nextTrain = currentime.add(mins, "m").format("hh:mm A");
    return nextTrain
}
function calMinutesAway(firstTrainTime, frequency) {
    var currentime = moment()
    var FirstTrainFormatted = moment(firstTrainTime, 'HH:mm').format('X');
    var timedifference = currentime.diff(moment.unix(FirstTrainFormatted), "minutes");
    var timeLeft = timedifference % frequency;
    var mins = moment(frequency - timeLeft, "mm").format('mm');
    console.log(mins);
    return mins
}

$(document).ready(function () {
    //firebase setup
    var config = {
        apiKey: "AIzaSyC_PJKJZAk3SPEiwy2ZVpU5XxahXzSKLkc",
        authDomain: "api-project-945373129108.firebaseapp.com",
        databaseURL: "https://api-project-945373129108.firebaseio.com",
        projectId: "api-project-945373129108",
        storageBucket: "",
        messagingSenderId: "945373129108"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // var nextTrain
    // var minutes

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

    })

    database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
        var sv = snapshot.val();

        var nextArrival = calNextArrival(sv.firstTrain, sv.frequency);
        var minutes = calMinutesAway(sv.firstTrain, sv.frequency);
        var myTD = `<tr>
        <td>${sv.name}</td>
        <td>${sv.destination}</td>
             <td>${sv.frequency}</td>
             <td>${nextArrival}</td>
             <td>${minutes}</td></tr>`
        $("tbody").append(myTD);

    },


    )

});

