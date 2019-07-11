const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('body-parser');

var arrayPersonajes = [];
var id = 40000;
var puerto = 3000;
var todoOk;

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(parser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

  setTimeout(function () {

    next();
  }, 2000);

});

//--------------Traer Personajes-----------------------------------

app.get("/traerPersonajes", function (request, response) {
  console.log("Enviando Personajes");

  response.send(JSON.stringify(arrayPersonajes));


});

//------------Alta Personaje----------------------------------------

app.post('/altaPersonaje', (request, response) => {

  var nuevoPersonaje = request.body;
  var personaje = {};

  if (validarPersonaje(nuevoPersonaje)) {
    personaje.id = id;
    personaje.nombre = nuevoPersonaje.nombre;
    personaje.apellido = nuevoPersonaje.apellido;
    personaje.edad = nuevoPersonaje.edad;
    personaje.casa = nuevoPersonaje.casa;
    personaje.traidor = nuevoPersonaje.traidor;
    personaje.temporada = nuevoPersonaje.temporada;
    personaje.caracteristicas = nuevoPersonaje.caracteristicas;
    id++;
    arrayPersonajes.push(personaje);
    console.log("Alta");
  }
  else {
    console.error("Personaje Invalido");
  }
  response.send(JSON.stringify(personaje));

});

//----------Baja Personaje--------------------------------------------

app.post('/bajaPersonaje', (request, response) => {
  var respuesta = {};
  var id = request.body.id;

  var index = arrayPersonajes.findIndex((per) => {
    return per.id == id;
  });

  //console.log(index);

  if (index != -1) {
    arrayPersonajes.splice(index, 1);
    respuesta.todoOk = 1;
    console.log("Borrado");
  }
  else {
    respuesta.todoOk = 0;
    console.log("Sin cambios");
  }
  response.send(respuesta);

});

//-----------------Modificar Personaje-------------------------------

app.post('/modificarPersonaje', (request, response) => {

  var respuesta = { "todoOk": 0 };
 
  var personajeModificado = request.body;

  if (validarPersonaje(personajeModificado, true)) {
    var index = arrayPersonajes.findIndex((per) => {
      return per.id == personajeModificado.id;
    });

    if (index != -1) {
      arrayPersonajes.splice(index, 1);
      arrayPersonajes.push(personajeModificado);
      console.log("Modificado");
      respuesta.todoOk = 1;
    }
    else {
      console.log("Sin cambios");
    }
  }
  else {
    console.error("personaje invalido");
  }
  response.send(respuesta);

});

//-----------------------------------------------------------------


const server = app.listen(puerto, () => {
  console.log('Servidor web iniciado en el puerto ' + puerto);
});

// ---------------------Validar Personaje---------------------------------------
// pasar objeto personaje y true si tiene id (modificacion) o false si no (alta)
function validarPersonaje(personaje, full) {

  var esValida = false;

  if (full) {
    if (personaje.hasOwnProperty('id') && personaje.hasOwnProperty('nombre') && personaje.hasOwnProperty('apellido') && personaje.hasOwnProperty('edad') && personaje.hasOwnProperty('casa') && personaje.hasOwnProperty('traidor') && personaje.hasOwnProperty('temporada') && personaje.hasOwnProperty('caracteristicas')) {
      esValida = true;
    }
  }
  else {
    if (personaje.hasOwnProperty('nombre') && personaje.hasOwnProperty('apellido') && personaje.hasOwnProperty('edad') && personaje.hasOwnProperty('casa') && personaje.hasOwnProperty('traidor') && personaje.hasOwnProperty('temporada') && personaje.hasOwnProperty('caracteristicas')) {
      esValida = true;
    }

  }

  return esValida;

}


