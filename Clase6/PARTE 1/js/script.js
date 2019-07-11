var boton, boton2;
var contador = 0;

window.addEventListener('load', function() {
    boton = document.getElementById("btnRun");
    boton.addEventListener('click', ejecutar, false);

    boton2 = document.getElementById("btnBorrar");
    boton2.addEventListener('click', ejecutar2, false);

}, false);

function ejecutar() {
    //  alert("estas");

    var lista = document.getElementById('lista');
    ////////////parte 1 BUSCAR LOS HIJOS
    /*  
    console.log(lista.childNodes.length);
    console.log(lista.childElementCount);
    console.log(lista.children);
    */

    /*
    var hijos = lista.childNodes;
    for (var i = 0; i < hijos.length; i++) {
        if (hijos[i].nodeType == Node.ELEMENT_NODE) {
            console.log(hijos[i]);
        }
  
    console.log(lista.children[1]);
      */


    ///////////////parte 2 BUSCAR LOS PADRES
    /*   
    var parrafo = document.getElementsByTagName('p')[0];

       console.log(parrafo);

       var padre = parrafo.parentNode; //referencia al padre del parrafo

       console.log(padre);
       padre.style.backgroundColor = 'blue' ; //CAMBIAR ESTILO DEL PADRE
    */

    /////////////////parte 3 OBTENER PRIMER Y ULTIMO HIJO
    /*     var div = document.getElementById("midiv");
        var primerHijo = div.firstElementChild;
        var ultimoHijo = div.lastElementChild;

        var hermano = primerHijo.nextElementSibling
     */
    /* 
     console.log(primerHijo);
     console.log(ultimoHijo);
     console.log(hermano);*/

    /*   console.log(primerHijo.childNodes[0].nodeValue); //obtener el texto 
    console.log(primerHijo.textContent) //la version disney de lo anterior
 */
    /*  
        while (primerHijo) 
        {
           console.log(primerHijo);
           primerHijo = primerHijo.nextElementSibling;
        }
    */

    ////////////// PARTE 4

    var parrafo = document.getElementById("p1");

    var nodoTexto = document.createTextNode("Hola Mundo" + contador);
    contador++;

    parrafo.appendChild(nodoTexto);


}

function ejecutar2() {
    var parrafo2 = document.getElementById("p1");
    if (parrafo2.hasChildNodes()) {
        parrafo2.removeChild(parrafo2.firstChild);
    } else {
        console.log("NO HAY NADA");
    }

}