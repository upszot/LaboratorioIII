var boton;
window.addEventListener('load', function() {
    boton = document.getElementById('btRun');
    boton.addEventListener('click', ejecutar, false);
}, false);

function ejecutar() {
    var div = document.getElementById('miDiv');
    var primerHijo = div.firstElementChild;
    var ultimoHijo = div.lastElementChild;
    //var hermano = primerHijo.nextElementSibling;

    /*     while (primerHijo) {
            console.log(primerHijo);
            console.log(primerHijo.childNodes[0].nodeValue); //nodeValue solamente se puede usar en nodos de tipo texto
            console.log(primerHijo.textContent); //Valor del nodo de tipo texto que depende del nodo de tipo elemento
            primerHijo = primerHijo.nextElementSibling;
        } */
    while (ultimoHijo) {
        //console.log(ultimoHijo.textContent);
        ultimoHijo.textContent = ultimoHijo.textContent + ".";
        ultimoHijo = ultimoHijo.previousElementSibling;
    }

}