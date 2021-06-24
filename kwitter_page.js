var firebaseConfig = {
    apiKey: "AIzaSyCxHU6teyo3Lp2rptrFYR3pJ_2oqKQVdMs",
    authDomain: "kwitter-f9302.firebaseapp.com",
    databaseURL: "https://kwitter-f9302-default-rtdb.firebaseio.com",
    projectId: "kwitter-f9302",
    storageBucket: "kwitter-f9302.appspot.com",
    messagingSenderId: "1071723728293",
    appId: "1:1071723728293:web:a8a73602581c8d7e502c4c"
}
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem('username');
room_name = localStorage.getItem('RoomName');

function send() {
    message = document.getElementById("message").value;
    firebase.database().ref(room_name).push({
        username: username,
        message: message,
        like: 0
    });

    document.getElementById("message").innerHTML = "";
}

function getData() {
    firebase.database().ref("/"+room_name).on('value',function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();

            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['username'];
                message = message_data['message'];
                like = message_data['like'];
                name_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
                message_tag = "<h4 class='message_h4'>"+message+"</h4>";
                like_tag = "<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
                span_tag = "<span><i class='fa fa-thumbs-o-up'></i>&nbsp;Like: "+like+"</span></button><hr>";

                row = name_tag + message_tag + like_tag + span_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}

getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('RoomName');
    window.location.replace('index.html');
}