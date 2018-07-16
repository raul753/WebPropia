window.onload = inicializar;

function inicializar(){

inicializarfirebase();

  var formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', validar);

  var formLogin = document.getElementById("form-login");
  formLogin.addEventListener("submit", doLogin);
  var logOutButton = document.getElementById("logout");
  logOutButton.addEventListener("click", logOut);
  document.getElementById("btn-admin").addEventListener("click", Admin);
  document.getElementById("btn-user").addEventListener("click", User);

document.getElementById('options').innerText = null

checkLogInStatus();
}

function Admin() {
  window.location='Recomendaciones.html';
}

function User() {
  window.location='index.html';
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);

      var usuarioID = firebase.auth().currentUser.uid;

      console.log(usuarioID);
      if (usuarioID == 'AK99bT4wYpUKW48A9DQbiL6ihop2') {
        document.getElementById("btn-admin").style.display = "block";
        document.getElementById("btn-user").style.display = "block";
      } else {
        document.getElementById("btn-user").style.display = "block";
        document.getElementById("btn-admin").style.display = "none";
      }

      document.getElementById("form-login").style.display = "none";
      document.getElementById("logout").style.display = "block";
      document.getElementById('sesion').style.display = "none";

    } else {
      // No user is signed in.
      document.getElementById("form-login").style.display = "block";
      document.getElementById("logout").style.display = "none";
      document.getElementById("btn-user").style.display = "none";
      document.getElementById("btn-admin").style.display = "none";
      document.getElementById("sesion").style.display = "block";

      document.getElementById("form-login").reset();
    }
  });
}

function validar(event){

  var formulario = event.target;
  if (formulario.contra.value != formulario.repetir.value){
    event.preventDefault()
    document.getElementById('error-contra').style.display = 'block';
  } else {
    document.getElementById('error-contra').style.display = 'none';
  }

  if (formulario.blanci.value == ""){
    event.preventDefault()
    document.getElementById('error-select').style.display = 'block';
  } else {
    document.getElementById('error-select').style.display = 'none';
  }

    if (formulario.nombre.value == ""){
      event.preventDefault()
      document.getElementById('error-nombre').style.display = 'block';
    } else {
      document.getElementById('error-nombre').style.display = 'none';
    }

    if (formulario.edad.value == ""){
      event.preventDefault()
      document.getElementById('error-edad').style.display = 'block';
    } else if (formulario.edad.value > "60") {
      event.preventDefault()
        document.getElementById('error-edad').style.display = 'none';
      document.getElementById('error-edad2').style.display = 'block';
    } else if (formulario.edad.value < "13") {
      event.preventDefault()
        document.getElementById('error-edad').style.display = 'none';
      document.getElementById('error-edad2').style.display = 'block';
    } else {
      document.getElementById('error-edad').style.display = 'none';
      document.getElementById('error-edad2').style.display = 'none';
    }

    if (formulario.contra.value == ""){
      event.preventDefault()
      document.getElementById('error-2').style.display = 'block';
    } else {
      document.getElementById('error-2').style.display = 'none';
    }

    if (formulario.Email.value == ""){
      event.preventDefault()
      document.getElementById('error-email').style.display = 'block';
    }else {
      document.getElementById('error-email').style.display = 'none';
    }

    if (document.getElementById('varon').checked == false && document.getElementById('mujer').checked == false){
      event.preventDefault();
      document.getElementById('error-sexo').style.display = 'block';
    } else {
      document.getElementById('error-sexo').style.display = 'none';
    }

    if (document.getElementById('cajita').checked == false) {
      event.preventDefault();
      document.getElementById('error-caja').style.display = 'block';
    }else {
      document.getElementById('error-caja').style.display = 'none';
    }
}

function doLogin(event) {
  event.preventDefault();
  var formLogin = event.target;
  var email = formLogin.email.value;
  var password = formLogin.pwd.value;
  firebase.auth().signInWithEmailAndPassword(email, password).
  catch(function(error) {
    //Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function logOut() {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

}

function inicializarfirebase() {
  var config = {
    apiKey: "AIzaSyBWqpxM_8K0W5Gz801mk70lu88asfvkQpg",
    authDomain: "chat-3a11a.firebaseapp.com",
    databaseURL: "https://chat-3a11a.firebaseio.com",
    projectId: "chat-3a11a",
    storageBucket: "chat-3a11a.appspot.com",
    messagingSenderId: "807454242864"
  };
  firebase.initializeApp(config);
}
