var boton;
window.addEventListener('load', function() {
    boton = document.getElementById('btRun');
    boton.addEventListener('click', ejecutar, false);
}, false);

function ejecutar() {
    //alert("hola mundo");
    var lista = document.getElementById('lista');
    //console.log(lista.childNodes.length); // 7 elementos... trae los retornos 
    //console.log(lista.childElementCount); // muestra 3
    //console.log(lista.children); // trae solo los nodos elementos (los 3 li)
    var hijos = lista.childNodes;
    for (var i = 0; i < hijos.length; i++) {

        if (hijos[i].nodeType == Node.ELEMENT_NODE) {
            console.log(hijos[i]);
        }

    }

}