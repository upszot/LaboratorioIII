function Saludar() {
    //alert("Hola"); //funcion de windows
    document.write("<h1>Hola</h1>");
}

function Saludar2() {
    //alert("Hola"); //funcion de windows
    document.getElementById("p1").innerHTML = "hola mundo";
}

function Saludar3() {
    //alert("Hola"); //funcion de windows
    console.log("hola mundo en consola");
}

function VerTiposDatos() {
    var cadena = "hola";
    //cadena = true; //Ojo con el inteligent que despues de esta linea si le pones cadena. 
    //sigue pensando que tiene un string y en realidad tiene un boolean    
    console.log("Posicion[0]: " + cadena.charAt(0));
    console.log("Tipo de dato-> cadena: " + typeof cadena); //devuelve el tipo de la cadena

    var x = 23; // tipo de dato number
    var pi = 3.14; // tipo de dato number
    var array = new Array(); //Array mediante constructor
    var array2 = []; //Array literal
    var objeto = {}; // Objeto literal
    var persona = { nombre: "juan", edad: 34 };
    var fecha = new Date();
    var variable_vacia = null; //tipo objeto
    var f = function sumar() {
            return 20;
        } //tipo funcion
    var variable_undefined; //mientras no se haya inicializado es de tipo undefined

    console.log("Tipo de dato-> x: " + typeof x); //devuelve el tipo de la cadena
    console.log("Tipo de dato-> pi: " + typeof pi); //devuelve el tipo de la cadena
    console.log("Tipo de dato-> array: " + typeof array);
    console.log("Tipo de dato-> array2: " + typeof array2);
    console.log("Tipo de dato-> Objeto: " + typeof objeto);
    console.log("Tipo de dato-> persona: " + typeof persona);
    console.log("Tipo de dato-> fecha: " + typeof fecha);
    console.log("Tipo de dato-> variable_vacia: " + typeof variable_vacia);
    console.log("Tipo de dato-> f: " + typeof f);
    console.log("Tipo de dato-> variable_undefined: " + typeof variable_undefined);
}

function unaFuncion(nombre) {
    alert("Hola " + nombre);
}
var x = unaFuncion; // X= es un delegado -> Tiene la direccion de memoria de una funcion

var y = function(nombre) {
    //funcion anonima
    alert("Hola " + nombre);
};

(function(nombre) { console.log("Hola " + nombre); })('julio'); //funcion autoInvocada

//esto es lo mismo que lo de arriba pero sin abreviar
var z = function(nombre) {
    //funcion anonima
    console.log("Hola " + nombre);
};
z('lala');

//Funcion constructora
var funcion2 = new Function("a", "b", "return a+b")
console.log(funcion2(6, 7));

//
function funcion3(a, b) {
    //    if (!b) { //si b == undefined pasa por false
    if (typeof b !== 'number') {
        b = 1;
    }
    return a * b;
}
console.log(funcion3(4));
console.log(funcion3(4, 5));
console.log(funcion3(4, 5, 2)); //muestra 20 y no le da bola al parametro que le mandaste de mas..

var num1 = 1;
var letra = "1";
console.log("num1 == letra: " + (num1 == letra));
console.log("num1 === letra: " + (num1 === letra));

//Lectura de arguments de una funcion
function funcion4() {
    console.log(arguments.length);
    console.log(arguments[1]);
    console.log(arguments);
}
funcion4(1, "juan", 3, 4, 5, 6);

//
function funcion5() {
    console.clear();
    // var persona1 = {};
    // var persona2 = new Object();
    // persona1.nombre = "juan";
    // persona1.saludar = function() { return "Hola soy " + this.nombre; };
    // var persona3 = { nombre: "juan", apellido: "perez" };
    //console.log(persona1.saludar());
    //console.log(persona3.apellido);

    function Persona(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    var p1 = new Persona("Ana", "gomez", 20);
    var p2 = new Persona("Analia", "suarez", 30);
    var p3 = new Persona("Juan", "Perez", 10);
    //console.log("p1.nombre: " + p1.nombre);
    //console.log(p3[propiedad]);

    for (propiedad in p2) {
        console.log(propiedad + " :" + p2[propiedad]);
    }
    console.log("Cantidad de propiedades " + (Object.keys(p2).length));
    p1.localidad = "lla";
    Persona.prototype.localidad = "Avellaneda"; //modifico el prototipo y le agrego la propiedad localidad para todos los Obj tipo Persona
    console.log(p1.localidad + " " + p2.localidad);
}

//esto no seria muy correcto tampoco pq vas por la etiqueta...
// var parrafo = document.getElementsByTagName('p')[2];
// parrafo.onclick = cambiarTexto;

// function cambiarTexto(aQuien) {
//     aQuien.innerHTML = "otro texto";
// }

//Esta mejor pero es la forma vieja.. no standarizada
// window.onload = function() {
//     var parrafo = document.getElementsByTagName('p')[1];
//     parrafo.onclick = function(e) {
//         e.target.innerHTML = 'otro texto';
//     }
// }



//======== FORMA CORRECTA ===================
var parrafo;

//window.addEventListener() ..Es lo mismo que addEventListener()... el windows esta implicito
addEventListener('load', asignarManejadores, false); //3 parametros... 
//evento, 
//funcion,
//Encadenamiento de eventos naturales(true), si es false (default) lo deja pasar.. y se ejecuta cuando sube (burbujero)

function asignarManejadores() {
    parrafo = document.getElementById('p2');
    parrafo.addEventListener('click', cambiarTextoCorrecta, false);
}

function cambiarTextoCorrecta(e) {
    e.target.innerHTML = "otro texto";
}

// --------------------------------
// forma acotada
//---------------------
addEventListener('load', () => {
    parrafo = document.getElementById('p3');
    parrafo.addEventListener('click', (e) => {
        e.target.innerHTML = "otro texto";
    }, false);
}, false);
//=====================================================