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

    var nextArrival
    var minutesAway

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var startTime = $("#startTime").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

    })
    
    database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
        var sv = snapshot.val();


        //Next time is the the combination of startTime with frequency.. comparing with the current time
        nextArrival = nextTime(snapshot.val().startTime, snapshot.val().frequency);
        minutesAway = moment(nextArrival, "mm").fromNow(true);  


        //template literals
        var myTD = `<tr>
        <td>${sv.name}</td>
        <td>${sv.destination}</td>
             <td>${sv.frequency}</td>
             <td>${nextArrival}</td>
             <td>${minutesAway}</td></tr>`
        $("tbody").append(myTD);
    })


});
function nextTime(startTime, frequency) {
    nextArrival = moment(startTime, "HH:mm").format('LT');
    console.log(nextArrival);
    if (moment().isBefore(nextArrival)) {
        console.log(`time is in the past ${moment()}`);
        return nextArrival;
    } else {
        while (moment().isAfter(nextArrival)) {
            nextArrival = nextArrival.add(frequency, "m");
        }
    }
    return nextArrival;
}
