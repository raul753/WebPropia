window.onload = inicializar
var refmensajes;
var refmensajes3;
var refmensajes2;
var comprobacion;
var comprobacion3;
var comprobacion2;
var refmensajeaeditar;
var refmensajeaeditar2;
var refmensajeaeditar3;
const AGREGAR = "1"

const EDITAR = "2"

var modo = AGREGAR;


var Nombre_de_la_Imagen2;
var url2;


function inicializar() {

  inicializarfirebase();

  mostrarmensajes();

  mostrarmensajes2();

  mostrarmensajes3();

  var formulari = document.getElementById("formulari");
  formulari.addEventListener("submit", enviarDatos);

  var formulari3 = document.getElementById("formulari3");
  formulari3.addEventListener("submit", enviarDatos3);

  var formulari2 = document.getElementById("formulari2");
  formulari2.addEventListener("submit", enviarDatos2);
  imagen = document.getElementById("imagen2");
  imagen.addEventListener("change", upload2);
  storageRef = firebase.storage().ref();
  imagenesRef = firebase.database().ref().child("Manga");

  document.getElementById('options').innerText = "Selecciona"
  document.getElementById('options2').innerText = "Selecciona"
//  document.getElementById('options3').innerText = "Selecciona"
  checkLogInStatus();
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);

      var usuarioID = firebase.auth().currentUser.uid;

      console.log(usuarioID);
      if (usuarioID == 'AK99bT4wYpUKW48A9DQbiL6ihop2') {
      } else {
        accesoRestringido();
      }

    } else {
      // No user is signed in.
      accesoRestringido();
    }
  });
}

function accesoRestringido() {
  window.location="index.html";
}

function upload2(snapshot) {
  var imagenParaSubir = imagen.files[0];

  var uploadTask = storageRef.child('imagenes/' + imagenParaSubir.name).put(imagenParaSubir);

  document.getElementById("progreso2").className = "";
  //Se va mostrando el progreso de subida
  uploadTask.on('state_changed',
    function(snapshot){
      //Si se produce un error
      var barraProgreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("barra-de-progreso2").style.width = barraProgreso + "%";
    }, function(error) {
      document.getElementById("upload2").src = "img/cross.png";
    }, function() {
      //Si se sube con exito
      document.getElementById("upload2").src = "img/tick.png";
      var downloadURL = uploadTask.snapshot.downloadURL;
      url2 = downloadURL;
      document.getElementById("progreso2").className = "hidden";
    });
}



function borrarmensaje(event) {
  var clave = this.getAttribute("data-identificador");
  var refmensajes = firebase.database().ref().child("mensajes").child(clave);
  refmensajes.remove();
}

function borrarmensaje3(event) {
  var clave = this.getAttribute("data-identificador");
  var refmensajes = firebase.database().ref().child("mensajesito").child(clave);
  refmensajes.remove();
}


function borrarmensaje2(event) {
  var clave = this.getAttribute("data-identificador");
  var refmensajes = firebase.database().ref().child("Manga").child(clave);
  refmensajes.remove();
  refmensajes.on("value", ObtenerNombreImagen);
  var imagenRef = storageRef.child("imagenes/" + Nombre_de_la_Imagen2);
  imagenRef.delete().then(function() {
  }).catch(function(error) {
  });
}

function editarmensaje3(event) {
  var clave = event.target.getAttribute("data-identificador")
  refmensajeaeditar3 = firebase.database().ref().child("mensajesito").child(clave);
  refmensajeaeditar3.once("value", function(snapshot) {
    var datos = snapshot.val();
    document.getElementById('formulari3');
    formulari3.name3.value = datos.titulo;
    formulari3.edad3.value = datos.Salida;

    modo = EDITAR;
  });
}

function editarmensaje(event) {
  var clave = event.target.getAttribute("data-identificador")
  refmensajeaeditar = firebase.database().ref().child("mensajes").child(clave);
  refmensajeaeditar.once("value", function(snapshot) {
    var datos = snapshot.val();
    document.getElementById('formulari');
    formulari.name.value = datos.titulo;
    formulari.menssajes.value = datos.autor;
    formulari.email.value = datos.Email;
    formulari.edad.value = datos.Salida;
    formulari.blanci.value = datos.Genero;
    formulari.radiocito.value = datos.Recomendado;

    modo = EDITAR;
  });
}

function editarmensaje2(event) {
  var clave = event.target.getAttribute("data-identificador")
  refmensajeaeditar2 = firebase.database().ref().child("Manga").child(clave);
  refmensajeaeditar2.once("value", function(snapshot) {
    var datos = snapshot.val();
    document.getElementById('formulari2');
    formulari2.name2.value = datos.titulo;
    formulari2.menssajes2.value = datos.autor;
    formulari2.edad2.value = datos.Salida;
    formulari2.blanci2.value = datos.Genero;
    formulari2.radiocito2.value = datos.Recomendado;
    formulari2.email2.value = datos.Email;

    modo = EDITAR;
  });
}

function enviarDatos3(event) {
  comprobacion3 = 0;
  event.preventDefault();
  var formulari3 = event.target;

  if (formulari3.edad3.value == ""){
    event.preventDefault();
    document.getElementById('error-edad33').style.display = 'block';
  } else if (formulari3.edad3.value < 1) {
    event.preventDefault();
    document.getElementById('error-edad33').style.display = 'none';
    document.getElementById('error-edad333').style.display = 'block';
  } else if (formulari3.edad3.value > 10) {
    event.preventDefault();
    document.getElementById('error-edad33').style.display = 'none';
    document.getElementById('error-edad333').style.display = 'block';
  } else {
    comprobacion3++;
    document.getElementById('error-edad33').style.display = 'none';
    document.getElementById('error-edad333').style.display = 'none';
  }

  if (formulari3.name3.value == ""){
    event.preventDefault();
    document.getElementById('error-titulo3').style.display = 'block';
  } else {
    comprobacion3++;
    document.getElementById('error-titulo3').style.display = 'none';
  }




if (comprobacion3 == 2) {



  if (modo == AGREGAR) {
    refmensajes3.push(
      {
        Salida: formulari3.edad3.value,
        titulo: formulari3.name3.value
      }
    );
  } else if (modo == EDITAR) {
    refmensajeaeditar3.update(
      {
        Salida: formulari3.edad3.value,
        titulo: formulari3.name3.value
      }
    );
}


    modo = AGREGAR;


  }
}

function enviarDatos(event) {
  comprobacion = 0;
  event.preventDefault();
  var formulari = event.target;

  if (document.getElementById('varon').checked == false && document.getElementById('mujer').checked == false){
    event.preventDefault();
    document.getElementById('error-sexo').style.display = 'block';
  } else {
    document.getElementById('error-sexo').style.display = 'none';
    comprobacion++;
  }

  if (formulari.email.value == "") {
    event.preventDefault();
    document.getElementById('error-email').style.display = 'block';
  }else {
    document.getElementById('error-email').style.display = 'none';
    comprobacion++;
  }

  if (formulari.blanci.value == "Selecciona"){
    event.preventDefault();
    document.getElementById('error-select').style.display = 'block';
  } else {
    comprobacion++;
    document.getElementById('error-select').style.display = 'none';
  }

  if (formulari.edad.value == ""){
    event.preventDefault();
    document.getElementById('error-edad').style.display = 'block';
  } else if (formulari.edad.value < 1864) {
    event.preventDefault();
    document.getElementById('error-edad').style.display = 'none';
    document.getElementById('error-edad2').style.display = 'block';
  } else if (formulari.edad.value > 2018) {
    event.preventDefault();
    document.getElementById('error-edad').style.display = 'none';
    document.getElementById('error-edad2').style.display = 'block';
  } else {
    comprobacion++;
    document.getElementById('error-edad').style.display = 'none';
    document.getElementById('error-edad2').style.display = 'none';
  }

  if (formulari.name.value == ""){
    event.preventDefault();
    document.getElementById('error-titulo').style.display = 'block';
  } else {
    comprobacion++;
    document.getElementById('error-titulo').style.display = 'none';
  }

  if (formulari.menssajes.value == ""){
    event.preventDefault();
    document.getElementById('error-autor').style.display = 'block';
  } else {
    comprobacion++;
    document.getElementById('error-autor').style.display = 'none';
  }



if (comprobacion == 6) {



  if (modo == AGREGAR) {
    refmensajes.push(
      {
        titulo: formulari.name.value,
        autor: formulari.menssajes.value,
        Salida: formulari.edad.value,
        Genero: formulari.blanci.value,
        Recomendado: formulari.radiocito.value,
        Email: formulari.email.value
      }
    );
  } else if (modo == EDITAR) {
    refmensajeaeditar.update(
      {
        titulo: formulari.name.value,
        autor: formulari.menssajes.value,
        Salida: formulari.edad.value,
        Genero: formulari.blanci.value,
        Recomendado: formulari.radiocito.value,
        Email: formulari.email.value
      }
    );
}


    modo = AGREGAR;


  }
}

function enviarDatos2(event) {
  comprobacion2 = 0;
  event.preventDefault();
  var formulari2 = event.target;

  if (document.getElementById('varon2').checked == false && document.getElementById('mujer2').checked == false){
    event.preventDefault();
    document.getElementById('error-sexo2').style.display = 'block';
  } else {
    document.getElementById('error-sexo2').style.display = 'none';
    comprobacion2++;
  }

  if (formulari2.email2.value == "") {
    event.preventDefault();
    document.getElementById('error-email2').style.display = 'block';
  }else {
    document.getElementById('error-email2').style.display = 'none';
    comprobacion2++;
  }

  if (formulari2.blanci2.value == "Selecciona"){
    event.preventDefault();
    document.getElementById('error-select2').style.display = 'block';
  } else {
    comprobacion2++;
    document.getElementById('error-select2').style.display = 'none';
  }
  if (formulari2.edad2.value == ""){
    event.preventDefault();
    document.getElementById('error-edad222').style.display = 'block';
  } else if (formulari2.edad2.value < 1864) {
    event.preventDefault();
    document.getElementById('error-edad222').style.display = 'none';
    document.getElementById('error-edad22').style.display = 'block';
  } else if (formulari2.edad2.value > 2018) {
    event.preventDefault();
    document.getElementById('error-edad222').style.display = 'none';
    document.getElementById('error-edad22').style.display = 'block';
  } else {
    comprobacion2++;
    document.getElementById('error-edad222').style.display = 'none';
    document.getElementById('error-edad22').style.display = 'none';
  }

  if (formulari2.name2.value == ""){
    event.preventDefault();
    document.getElementById('error-titulo2').style.display = 'block';
  } else {
    comprobacion2++;
    document.getElementById('error-titulo2').style.display = 'none';
  }

  if (formulari2.menssajes2.value == ""){
    event.preventDefault();
    document.getElementById('error-autor2').style.display = 'block';
  } else {
    comprobacion2++;
    document.getElementById('error-autor2').style.display = 'none';
  }

  if(formulari2.imagen2.value == "") {
      event.preventDefault();
      document.getElementById("error-image2").style.display = "block";
    } else if(formulari2.imagen2.value != "") {
      comprobacion2++;
      document.getElementById("error-image2").style.display = "none";
    }

if (comprobacion2 == 7) {

  var nombreImagen = document.getElementById("imagen2").value;
    nombreImagen = nombreImagen.replace(/^.*[\\\/]/, '');

  if (modo == AGREGAR) {
    refmensajes2.push(
      {
        titulo: formulari2.name2.value,
        autor: formulari2.menssajes2.value,
        Salida: formulari2.edad2.value,
        Genero: formulari2.blanci2.value,
        Recomendado: formulari2.radiocito2.value,
        Email: formulari2.email2.value,
        Imagen: url2
      }
    );
  } else if (modo == EDITAR) {
    refmensajeaeditar2.update(
      {
        titulo: formulari2.name2.value,
        autor: formulari2.menssajes2.value,
        Salida: formulari2.edad2.value,
        Genero: formulari2.blanci2.value,
        Recomendado: formulari2.radiocito2.value,
        Email: formulari2.email2.value,
        Imagen: url2
      }
    );
}


    modo = AGREGAR;


  }
}

function mostrarmensajes() {
  refmensajes = firebase.database().ref().child("mensajes");
  refmensajes.on("value", mostrardatos)
}

function mostrarmensajes2() {
  refmensajes2 = firebase.database().ref().child("Manga");
  refmensajes2.on("value", mostrardatos2)
}

function mostrarmensajes3() {
  refmensajes3 = firebase.database().ref().child("mensajesito");
  refmensajes3.on("value", mostrardatos3)
}

function mostrardatos3(snapshot) {
  var datos = snapshot.val();

  var todoslosmensajes = "";
  var todoslosmensajesSelect = '<option value="">Seleccione un título</option>';
  for (var key in datos){
    todoslosmensajes += '<tr class="amargo"><td>' + '<img src="IMG/borrar.png" class="borrar" alt="borrar" data-identificador="' + key +'"/>' +
     '<img src="IMG/editar.png" class="editar" alt="editar" data-identificador="' + key +'"/>' + '</td><td>' + datos[key].titulo + '</td><td>' + datos[key].Salida + '</td></tr>';
     todoslosmensajesSelect += '<option value="' + datos[key].titulo + '">' + datos[key].titulo + '</option>';
  }
  document.getElementById('mensajesito').innerHTML = todoslosmensajes;
  document.getElementById('name').innerHTML = todoslosmensajesSelect;

  var imagenes = document.getElementsByClassName("borrar");
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", borrarmensaje3);
  }

  var imagenes = document.getElementsByClassName("editar");
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", editarmensaje3);
  }
}

function mostrardatos(snapshot) {
  var datos = snapshot.val();

  var todoslosmensajes = "";
  for (var key in datos){
    todoslosmensajes += '<tr class="amargo"><td>' + '<img src="IMG/borrar.png" class="borrar" alt="borrar" data-identificador="' + key +'"/>' +
     '<img src="IMG/editar.png" class="editar" alt="editar" data-identificador="' + key +'"/>' + '</td><td>' + datos[key].titulo + '</td><td>'
     + datos[key].autor + '</td><td>' + datos[key].Salida + '</td><td>' + datos[key].Genero + '</td><td>' + datos[key].Recomendado + '</td><td>' + datos[key].Email + '</td></tr>';
  }
  document.getElementById('mensajes').innerHTML = todoslosmensajes;

  var imagenes = document.getElementsByClassName("borrar");
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", borrarmensaje);
  }

  var imagenes = document.getElementsByClassName("editar");
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", editarmensaje);
  }
}

function mostrardatos2(snapshot) {
  var datos = snapshot.val();

  var todoslosmensajes = "";
  for (var key in datos){
    todoslosmensajes += '<tr class="amargo"><td>' + '<img src="IMG/borrar.png" class="borrar" alt="borrar" data-identificador="' + key +'"/>' +
     '<img src="IMG/editar.png" class="editar" alt="editar" data-identificador="' + key +'"/>' + '</td><td>' + datos[key].titulo + '</td><td>'
     + datos[key].autor + '</td><td>' + datos[key].Salida + '</td><td>' + datos[key].Genero + '</td><td>' + datos[key].Recomendado + '</td><td>' + datos[key].Email + '</td><td>' + '<img width="150" class="img-thumbnail" src="' + datos[key].Imagen + '"/>' + '</td></tr>';
  }
  document.getElementById('mensajes2').innerHTML = todoslosmensajes;

  var imagenes = document.getElementsByClassName("borrar");
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", borrarmensaje2);
  }

  var imagenes = document.getElementsByClassName("editar");
  for (var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", editarmensaje2);
  }
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
