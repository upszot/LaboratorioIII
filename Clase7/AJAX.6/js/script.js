window.addEventListener('load', asignarManejadores, false);

function asignarManejadores() {

    document.getElementById('getPersonas').addEventListener('click', traerPersonas, false);

    document.forms[0].addEventListener('submit', e => {
        e.preventDefault();
        agregarPersona(newPersona());
    }, false);



}

function agregarPersona(persona) {
    var info = document.getElementById('hr');

    var personaRta;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personaRta = JSON.parse(xhr.responseText);

                console.log(personaRta);

                document.getElementById('id').value = personaRta.id;
                document.getElementById('nombre').value = personaRta.nombre;
                document.getElementById('apellido').value = personaRta.apellido;
                document.getElementById('edad').value = personaRta.edad;

                info.innerHTML = "";

                traerPersonas();

            } else {
                console.log("error: " + xhr.status);
            }

        } else {

            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('POST', 'http://localhost:3000/altaPersona', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));

    // con POST LOS DATOS PASAR POR SEND
}


function eliminarPersona(persona) {
    var info = document.getElementById('hr');

    var personaRta;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personaRta = JSON.parse(xhr.responseText);

                console.log(personaRta);

                document.getElementById('id').value = personaRta.id;

                info.innerHTML = "";

                traerPersonas();

            } else {
                console.log("error: " + xhr.status);
            }

        } else {

            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('POST', 'http://localhost:3000/altaPersona', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));

    // con POST LOS DATOS PASAR POR SEND
}


function newPersona(formulario) {
    console.log(formulario);
    var persona = {};
    persona.nombre = document.getElementById('txtNombre').value;
    persona.apellido = document.getElementById('txtApellido').value;
    persona.edad = document.getElementById('txtEdad').value;
    return persona;
}

function traerPersonas() {

    var personas = [];

    var info = document.getElementById('info');
    var xhr = new XMLHttpRequest();
    info.innerHTML = "";

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



/**
 * 
 * @param {*} key 
 * @param {*} valor 
 */
function crearFormulario(key, valor) {
    var div = document.getElementById("info");

    if (key != 'id' || valor != null) {
        var label = document.createElement('label');
        var input = document.createElement('input');

        label.setAttribute('for', key);
        label.setAttribute('id', "textoEtiqueta");
        var textLabel = document.createTextNode(key);

        label.appendChild(textLabel);

        //bajo un renglon
        label.appendChild(agregarSalto());

        input.setAttribute('type', "text");
        input.setAttribute('class', "campo");
        input.setAttribute('id', "txt" + key);
        if (valor != null) {

            input.setAttribute('value', valor);

        }
        label.appendChild(input);

        div.appendChild(agregarSalto());
        div.appendChild(label);
    }
}








function personaToString(persona) {
    var cadena = '';
    for (var prop in persona) {
        cadena += "<b>" + prop + "</b> : " + persona[prop] + " ";
    }
    return cadena;
}



function ponerSpinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', 'imagenes/spinner.gif');
    spinner.setAttribute('alt', 'spinner');

    return spinner;
}