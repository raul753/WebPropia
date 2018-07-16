window.onload = inicializar;

function inicializar(){
	inicializarFirebase();
  var animecito = document.getElementsByClassName("rss");
  for (var i = 0; i < animecito.length; i++){
    animecito[i].addEventListener("click", mostrarRSS)
  }
}

function mostrarRSS(){
  crearRSS();
}

function crearRSS(){

  var refRss = firebase.database().ref().child("mensajes");
  refRss.once("value", mostrarAnimes);
}


function mostrarAnimes(snapshot) {
  var datos = snapshot.val();
  var documentoRSS = '<?xml version="1.0" encoding="UTF-8"?>';
  documentoRSS += '<rss version="2.0">';
  documentoRSS += '<channel>';
  documentoRSS += '<title>Ranime - Rss</title>';
  documentoRSS += '<link>index.html</link>';
  documentoRSS += '<description>Elige tus Animes para leer.</description>';
  for (var key in datos){
    documentoRSS += '<item>';
    documentoRSS += '<title>' + datos[key].titulo + '</title>';
    documentoRSS += '<description>' + datos[key].Genero + '</description>';
    documentoRSS += '<link>' + datos[key].Email + '</link>';
    documentoRSS += '</item>';
  }
  documentoRSS += '</channel>';
  documentoRSS += '</rss>';

  window.open('data:text/xml,' + encodeURIComponent(documentoRSS),
  "Test", "width=300,height=300,scrollbars=1,resizable=1");
}

function inicializarFirebase() {
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
