const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('body-parser');
var personas = require('./personas.json');
var arrayPersonas = [];
var id = 20000;
var puerto = 3000;

var persona = {
    "nombre": "Raul",
    "apellido": "Perez",
    "edad": 40
};

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(parser.urlencoded({ extended: true }));

app.get("/enviarDatos", function(request, response) {
    console.log("Get: " + request.query.nombre + ' ' + request.query.apellido); /* This prints the  JSON document received (if it is a JSON document) */
    response.send(request.query.nombre + ' ' + request.query.apellido);
});

app.get("/traerJSON", function(request, response) {
    console.log("Enviando persona");
    setTimeout(function() {
        response.send(JSON.stringify(persona));
    }, 200);

});

app.get("/traerPersonas", function(request, response) {
    console.log("Enviando personas");
    //console.log(personas);
    setTimeout(function() {
        response.send(JSON.stringify(personas));
    }, 200);

});

app.get("/traerPersonasArray", function(request, response) {
    console.log("Enviando personas");
    //console.log(personas);
    setTimeout(function() {
        response.send(JSON.stringify(arrayPersonas));
    }, 200);

});

app.post('/enviarDatos', (request, response) => {
    console.log("Post: " + request.body.nombre + ' ' + request.body.apellido); /* This prints the  JSON document received (if it is a JSON document) */
    response.send(request.body.nombre + ' ' + request.body.apellido);

});

app.post('/altaPersona', (request, response) => {
    console.log(request.body);
    var persona = {};
    persona.id = id;
    persona.nombre = request.body.nombre;
    persona.apellido = request.body.apellido;
    id++;
    arrayPersonas.push(persona);

    setTimeout(function() {
        response.send(JSON.stringify(persona));
    }, 200);
});

const server = app.listen(puerto, () => {
    console.log('Servidor web iniciado en el puerto ' + puerto);
});