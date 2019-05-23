var boton;
window.addEventListener('load', function() {
    boton = document.getElementById('btRun');
    boton.addEventListener('click', ejecutar, false);
}, false);

function ejecutar() {
    //alert("hola mundo");
    var parrafo = document.getElementsByTagName("p")[0];
    //   console.log(parrafo);
    var padre = parrafo.parentNode;
    //console.log(padre);
    padre.style.backgroundColor = "blue";

}