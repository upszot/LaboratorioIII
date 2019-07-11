window.addEventListener('load', asignarManejadores, false);

function asignarManejadores() {
    document.getElementById("btnPersona").addEventListener('click', traerPersona, false)
}

function traerPersona() {

    var datos = {
        nombre: document.getElementById('txtNombre'),
        apellido: document.getElementById('txtApellido'),
        edad: document.getElementById('txtEdad')
    }

    var personas = [];
    var lista = " ";


    var info = document.getElementById('info');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personas = JSON.parse(xhr.responseText);

                info.innerHTML = "";
                for (var i in personas) {
                    info.innerHTML += "<p>" + personaToString(personas[i]) + "</p>";
                }

            } else {
                console.log("error: " + xhr.status);
            }

        } else {
            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('GET', 'http://localhost:3000/traerPersonas', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    xhr.send(); // con POST LOS DATOS PASAR POR SEND


}

function ponerSpinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', 'imagenes/spinner.gif');
    spinner.setAttribute('alt', 'spinner');

    return spinner;
}


function personaToString(persona) {
    var cadena = '';
    for (var prop in persona) {
        cadena += "<b>" + prop + "</b> : " + persona[prop] + " ";
    }
    return cadena;

}