var database = firebase.database();

function writeUserData(name, daabi) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    daabi: daabi
    //some more user data
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("userIn").style.display = "block";
    document.getElementById("start").style.display = "none";


    var user = firebase.auth().currentUser;

    if(user != null){
      var email_id = user.email;
    

    }

  } else {
    // No user is signed in.

    document.getElementById("userIn").style.display = "none";
    document.getElementById("start").style.display = "block";
	
  }
});

function login_logged(){

  var userEmail = document.getElementById("email_field_logged").value;
  var userPass = document.getElementById("password_field_logged").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}


function logout_logged(){
  firebase.auth().signOut();

}

/////////////////////////////////Sign .Js ////////////////////////////////////////////////////////////////

var database = firebase.database();


function passenger(){ 

  var Email = document.getElementById("email-passenger").value;
  var Pass = document.getElementById("pass-passenger").value;

  firebase.auth().createUserWithEmailAndPassword(Email, Pass)
  .then(function(response){
    console.log("success");
    window.alert("You have been successfully signed up.Scroll up to click 'Back to home page' to return to page");
    console.log(response);

    firebase.database().ref('Passenger/' + firebase.auth().currentUser.uid).push({
      PName : 1,
      PuserId : firebase.auth().currentUser.uid,
      Pemail : firebase.auth().currentUser.email
    })
    firebase.auth().signOut();
    document.getElementById('email-passenger').value = "";
    document.getElementById('pass-passenger').value = "";
  })
  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("passenger").style.display = "none";
      document.getElementById("bus").style.display = "none";
      document.getElementById("logged-sign").style.display = "block";
      document.getElementById("option").style.display = "none";
  
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
        var email_id = user.email;
        
  
      }
  
    } else {
      // No user is signed in.
      
  
      document.getElementById("bus").style.display = "block";
      document.getElementById("passenger").style.display = "block";
      document.getElementById("logged-sign").style.display = "none";
      document.getElementById("opton").style.display = "block";
    }
  });
  

}

function bus(){ 

  var Email = document.getElementById("email-bus").value;
  var Pass = document.getElementById("pass-bus").value;

  firebase.auth().createUserWithEmailAndPassword(Email, Pass)
  .then(function(response){
    console.log("success");
    console.log(response);

    firebase.database().ref('Bus').push({
      BusName : document.getElementById('name-bus').value,
      LcBus : document.getElementById('lc-bus').value,
      BusSeat : document.getElementById('seat-bus').value,
      userId : firebase.auth().currentUser.uid,
      email : firebase.auth().currentUser.email
    })
    firebase.auth().signOut();
    document.getElementById('name-bus').value = "";
    document.getElementById('lc-bus').value = "";
    document.getElementById('pass-bus').value = "";
    document.getElementById('email-bus').value = "";
    document.getElementById('seat-bus').value = "";
  })
  
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("passenger").style.display = "none";
      document.getElementById("bus").style.display = "none";
      document.getElementById("logged-sign").style.display = "block";
      document.getElementById("option").style.display = "none";
  
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
        var email_id = user.email;
      
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("bus").style.display = "block";
      document.getElementById("passenger").style.display = "block";
      document.getElementById("logged-sign").style.display = "none";
      document.getElementById("opton").style.display = "block";
  
  
    
    }
  });
  

}
//////////////////////////////////////////Find Geo Location////////////////////////////////////////////////
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {

    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log(mapLink.textContent);
    var lat1 = latitude;
    var long1 = longitude;
    firebase.database().ref('Bus').push({
      GeoLat : latitude,
      geoLong : longitude
    })

    firebase.database().ref('Passenger/' + firebase.auth().currentUser.uid).push({
      GeoLat : latitude,
      geoLong : longitude
    })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
   

firebase.database().ref('Bus').on("value" , getBusData, errData);

function getBusData(data){
  console.log("200 ok!");
  console.log(data);

  var list  = data.val();
  var keys  = Object.keys(list);

  for(var i = 0; i < keys.length; i++){
    console.log("i", i);
    var key = keys[i];
    console.log(key);
    document.getElementById("testi").innerHTML += key;
    var dbLat, dbLong;

    var x = 0;
    var seat = 0;

    dbLat = list[key].GeoLat;
    dbLong = list[key].geoLong;
    dbSeat = list[key].BusSeat;
   
    console.log(dbLat);
    console.log(dbLat, dbLong);

    var dis = dist(lat1, long1, dbLat, dbLong);
    console.log("key Length", keys.length)
  console.log(dis);

  if(dis < 2){
    document.getElementById('dist').innerHTML = "You have  vehicle(s) of "  +Math.floor(dis) +" KM near you";}

        if(dis > 2 && x > i){
      document.getElementById('ystatus').innerHTML = "You dropped off. You have been charged" + document.getElementById('rate-bus').value * x
      window.alert("You dropped off. You have been charged" + document.getElementById('rate-bus').value * x);
      seat = seat -1 ;
    } 

      if(dis < 0.03){
      document.getElementById('ystatus').innerHTML = "You are onboard and being charged with " + seat + "<br> passengers";
      if (dbSeat > 50){
        document.getElementById('danger').innerHTML = "Danger! You are in a over populated vehicle!";
      }
      x = x+1;
      seat = seat + 1;
    }

  } 
}

function errData(err){
  console.log(err);
}

  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }


}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

function distanceBetween(lat1, lon1, lat2, lon2, unit) {
    var rlat1 = Math.PI * lat1 / 180
    var rlat2 = Math.PI * lat2 / 180
    var rlon1 = Math.PI * lon1 / 180
    var rlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var rtheta = Math.PI * theta / 180
    var dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist;
  }
function dist(lat1, long1, lat2, long2){
  var distance = distanceBetween(lat1, long1, lat2, long2, "K");
  console.log("geo dis: " + distance);
  return distance;
 // $("#dis").html("<h4>" + distance + "Km</h4>");
}


