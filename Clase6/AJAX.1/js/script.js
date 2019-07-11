var boton, boton2;
var contador = 0;


window.addEventListener('load', asignarManejadores
    /* function() {
    boton = document.getElementById("btnEjecutar");
    boton.addEventListener('click', ejecutar, false);

}, */
    , false);

function asignarManejadores() {

    document.forms[0].addEventListener('submit', function(e) {
        e.preventDefault(); // evita lo q iba a hacer y toma el cargo de las acciones del form
        manejarSubmit();
    });

    //   console.log(document.forms[0]);

}

function manejarSubmit() {

    var info = document.getElementById('info');

    var spinner = document.createElement('img');

    spinner.setAttribute('src', 'imagenes/spinner.gif');

    spinner.setAttribute('alt', 'spinner');


    var nombre = document.getElementById('txtNombre').value;
    var apellido = document.getElementById('txtApellido').value;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                info.innerHTML = xhr.responseText;
                //spinner mienstra se espera q vuelva la indo
            } else {
                console.log("error: " + xhr.status);
            }

        } else {
            info.appendChild(spinner); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('GET', 'http://localhost:3000/enviarDatos?nombre=' + nombre + "&apellido=" + apellido, true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    xhr.send();


}