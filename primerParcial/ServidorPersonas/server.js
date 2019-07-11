const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('body-parser');
/* var personas = require('./personas.json'); */
var arrayPersonas = [{
    id: 19999,
    "nombre": "sansa",
    apellido: "stark",
    edad: 15,
    casa: "stark",
    traidor: "finger"
}];
var id = 20000;
var puerto = 3000;
var todoOk;

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(parser.urlencoded({ extended: true }));

//--------------Traer Personas-----------------------------------

app.get("/traerPersonas", function(request, response) {
    console.log("Enviando personas");
    //console.log(personas);
    setTimeout(function() {
        response.send(JSON.stringify(arrayPersonas));
    }, 1000);

});

//------------Alta Persona----------------------------------------

app.post('/altaPersona', (request, response) => {

    var nuevaPersona = request.body;
    var persona = {};

    if (validarPersona(nuevaPersona)) {
        persona.id = id;
        persona.nombre = nuevaPersona.nombre;
        persona.apellido = nuevaPersona.apellido;
        persona.edad = nuevaPersona.edad;
        id++;

        arrayPersonas.push(persona);
        console.log("Alta");
    } else {
        console.log("Persona Invalida");
    }
    setTimeout(function() {
        response.send(JSON.stringify(persona));
    }, 1000);
});

//----------Baja Persona--------------------------------------------

app.post('/bajaPersona', (request, response) => {
    var respuesta = {};
    var id = request.body.id;

    var index = arrayPersonas.findIndex((per) => {
        return per.id == id;
    });

    console.log(index);

    if (index != -1) {
        arrayPersonas.splice(index, 1);
        respuesta.todoOk = 1;
        console.log("Borrado");
    } else {
        respuesta.todoOk = 0;
        console.log("Sin cambios");
    }

    setTimeout(() => {
        response.send(respuesta);
    }, 1000);

});

//-----------------Modificar Persona-------------------------------

app.post('/modificarPersona', (request, response) => {

    var respuesta = { "todoOk": 0 };
    var persona = request.body;
    var personaModificada = request.body;

    if (validarPersona(persona, true)) {
        var index = arrayPersonas.findIndex((per) => {
            return per.id == persona.id;
        });

        if (index != -1) {
            /*       arrayPersonas.splice(index, 1);
                  arrayPersonas.push(persona); */
            arrayPersonas[index] = persona;
            console.log("Modificado");
            respuesta.todoOk = 1;
        } else {
            console.log("Sin cambios");
        }
    } else {
        console.log("Persona invalida");
    }

    setTimeout(function() {
        response.send(respuesta);
    }, 1000);
});

//-----------------------------------------------------------------


const server = app.listen(puerto, () => {
    console.log('Servidor web iniciado en el puerto ' + puerto);
});

// ---------------------Validar Persona---------------------------------------
// pasar objeto persona y true si tiene id (modificacion) o false si no (alta)
function validarPersona(persona, full) {

    var esValida = false;

    if (full) {
        if (persona.hasOwnProperty('id') && persona.hasOwnProperty('nombre') && persona.hasOwnProperty('apellido') && persona.hasOwnProperty('edad')) {
            esValida = true;
        }
    } else {
        if (persona.hasOwnProperty('nombre') && persona.hasOwnProperty('apellido') && persona.hasOwnProperty('edad')) {
            esValida = true;
        }

    }

    return esValida;

}