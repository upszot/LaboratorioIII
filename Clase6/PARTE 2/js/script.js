var boton, boton2;
var contador = 0;
var enlace;

window.addEventListener('load', function() {
    boton = document.getElementById("btnRun");
    boton.addEventListener('click', ejecutar, false);

    boton2 = document.getElementById("btnremover");
    boton2.addEventListener('click', ejecutar2, false);

}, false);

function ejecutar() {

    var div = document.getElementById("idDiv");

    enlace = document.createElement('a');

    var nodoTexto = document.createTextNode(' ir a google')

    enlace.appendChild(nodoTexto);

    enlace.setAttribute('href', 'http://www.google.com');
    enlace.setAttribute('target', '_blank');
    enlace.setAttribute('id', 'A1');
    //  enlace.setAttribute('class', 'red');
    //  enlace.setAttribute('class', 'blue');

    enlace.classList.add('blue');
    enlace.classList.add('red');
    // enlace.classList.toggle('blue'); //si no la tiene se la agrega y si la tiene se la saca

    console.log(enlace.getAttribute('href'));

    div.appendChild(enlace);

    /*     var div = document.getElementById("idDiv");

        var parrafo = document.createElement('p');

        var nodoTexto = document.createTextNode(' Esto es un parrafo dinamico')

        parrafo.appendChild(nodoTexto);

        div.appendChild(parrafo);
     */
}

function ejecutar2() {
    /*    if (document.getElementById("A1").hasAttribute('href')) 
       {
           document.getElementById("A1").removeAttribute('href');
           document.getElementById("A1").removeAttribute('class');

           enlace.setAttribute('class', 'blue');
       }
    */
    enlace.classList.toggle('blue');

}