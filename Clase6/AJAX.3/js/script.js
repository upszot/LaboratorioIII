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

    var persona;


    var info = document.getElementById('info');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                persona = JSON.parse(xhr.responseText);

                datos.nombre.value = persona.nombre; //asignos los valores del json en el servidor al los valores de form
                datos.apellido.value = persona.apellido;
                datos.edad.value = persona.edad;
                info.innerHTML = " "; // para sacar el spinner

            } else {
                console.log("error: " + xhr.status);
            }

        } else {
            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('GET', 'http://localhost:3000/traerJSON', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    xhr.send(); // con POST LOS DATOS PASAR POR SEND


}

function ponerSpinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', 'imagenes/spinner.gif');
    spinner.setAttribute('alt', 'spinner');

    return spinner;
}