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

    //var monthsWorkd = "test"
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

        
        nextArrival = moment(sv.startTime).format("LT")
        console.log(startTime);


        //template literals
        var myTD = `<tr>
        <td>${sv.name}</td>
        <td>${sv.destination}</td>
             <td>${frequency}</td>
             <td>${nextArrival}</td>
             <td>${minutesAway}</td></tr>`
        $("tbody").append(myTD);
    })






});