var boton;
var boton2;

var contador = 0;

window.addEventListener('load', function() {
    boton = document.getElementById('btRun');
    boton.addEventListener('click', ejecutar, false);

    boton2 = document.getElementById('btRun2');
    boton2.addEventListener('click', ejecutar2, false);

}, false);



function ejecutar() {
    var parrafo = document.getElementById('p1');
    contador++;
    //    console.log(parrafo.childNodes.length);

    var nodoTexto = document.createTextNode("Hola mundo");
    parrafo.appendChild(nodoTexto);
}

function ejecutar2() {
    var parrafo = document.getElementById('p1');
    if (parrafo.hasChildNodes()) {
        parrafo.removeChild(parrafo.firstChild);
    } else {
        console.log("Nada mas para borrar");
    }
}