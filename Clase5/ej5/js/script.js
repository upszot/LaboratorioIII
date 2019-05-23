var boton;
var boton2;
var boton3;

var contador = 0;

window.addEventListener('load', function() {
    boton = document.getElementById('btRun');
    boton.addEventListener('click', ejecutar, false);

    boton2 = document.getElementById('btRun2');
    boton2.addEventListener('click', ejecutar2, false);

    boton3 = document.getElementById('btRun3');
    boton3.addEventListener('click', ejecutar3, false);

}, false);



function ejecutar() {
    var div = document.getElementById('miDiv');
    var parrafo = document.createElement('p'); // se le pasa la etiqueta del elemento que queres agregar
    var nodoTexto = document.createTextNode("Esto es un parrafo dinamico");
    parrafo.appendChild(nodoTexto);
    div.appendChild(parrafo);
}

function ejecutar2() {
    var div = document.getElementById('miDiv');
    var enlace = document.createElement('a'); // se le pasa la etiqueta del elemento que queres agregar
    var nodoTexto = document.createTextNode("Ir a google");
    enlace.appendChild(nodoTexto);
    enlace.setAttribute('href', 'http://www.google.com');
    enlace.setAttribute('id', 'a' + contador);
    contador++;
    enlace.setAttribute('target', '_blank'); // black para que se abra en otra pestaña
    enlace.setAttribute('class', 'white  blue '); // le ponemos las 2 classes 


    console.log(enlace.getAttribute('href'));
    div.appendChild(enlace);
}

function ejecutar3() {
    var enlace = document.getElementById('a1');
    console.log("Atributo antes: " + enlace.getAttribute('href'));
    if (document.getElementById('a1').hasAttribute('href')) {
        document.getElementById('a1').removeAttribute('href');
    }

    var enlaces = document.getElementsByTagName('a');
    for (i = 0; i < enlaces.length; i++) {
        enlaces.classList.toggle('red'); // si tiene esta clase se la saca y si no la tiene se la pone

    }
    console.log("Atributo Despues: " + enlace.getAttribute('href'));
}