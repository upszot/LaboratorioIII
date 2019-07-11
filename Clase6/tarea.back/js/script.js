var boton, boton2;
var tr;

/////////////////BUSCAR FORIN

window.addEventListener('load', function() {
    boton = document.getElementById("btnCargar");
    boton.addEventListener('click', ejecutar, false);

}, false);

function ejecutar() {

    var div = document.getElementById("info");

    document.getElementById("btnCargar").disabled = true; //desactva boton

    var header = document.createElement('tr');
    var tabla = document.createElement('table');

    for (var key in personas[0]) {
        var th = document.createElement('th');
        var texto = document.createTextNode(key);
        th.appendChild(texto);
        header.appendChild(th);
    }

    tabla.appendChild(header);


    for (var fila in personas) {

        var tr = document.createElement('tr');

        for (var columna in personas[fila]) {
            var th = document.createElement('td');
            var texto = document.createTextNode(personas[fila][columna]);
            th.setAttribute('id', fila);
            th.addEventListener('click', cargarFormulario, false);
            console.log("llego hasta aca ");


            th.appendChild(texto);
            tr.appendChild(th);

        }

        tabla.appendChild(tr);

    }

    div.appendChild(tabla);

}

function cargarFormulario() {

    console.log("el id es" + this['id']);
    //funcion que carga la informacion instanciada en el formulario
}