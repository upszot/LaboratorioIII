var boton;

//var contador = 0;

window.addEventListener('load', function() {
    boton = document.getElementById('btnCargar');
    boton.addEventListener('click', cargarJsonTabla, false);
}, false);



function cargarJsonTabla() {
    /* Armar una talba con datos del array del  json  */
    /* 5 columnas */
    /* 1 fila con th para los titulos */
    /* un tr por cada fila, y un td por cada columna */

    var div = document.getElementById('info');
    var tabla = document.createElement('table');
    //var titulos = document.createElement('th th th th th ');

    var parrafo = document.createElement('p'); // se le pasa la etiqueta del elemento que queres agregar
    var nodoTexto = document.createTextNode("Esto es un parrafo dinamico");
    parrafo.appendChild(nodoTexto);
    div.appendChild(parrafo);
}