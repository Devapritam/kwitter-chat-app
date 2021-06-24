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
document.getElementById("display_username").innerHTML = "Welcome " + username + "!";

function addRoom() {
      roomName = document.getElementById("room_name").value;
      firebase.database().ref('/').child(roomName).update({
            purpose: "to add a room name entered by the user"
      });
      localStorage.setItem('RoomName', roomName);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>" + "#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem('RoomName', name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('RoomName');
      window.location = "index.html";     
}