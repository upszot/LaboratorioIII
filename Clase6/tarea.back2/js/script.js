var boton, boton2;
var tr;
var personaElegida = null;

/////////////////BUSCAR FORIN


window.addEventListener('load', asignarManejadores, false);

function asignarManejadores() {

    /*     document.forms[0].addEventListener('submit', function(e) {
            e.preventDefault(); // evita lo q iba a hacer y toma el cargo de las acciones del form
            manejarSubmit();
        }); */

    boton = document.getElementById("btnCargar");
    boton.addEventListener('click', ejecutar, false);

}


window.addEventListener('load', function() {
    boton = document.getElementById("btnCargar");
    boton.addEventListener('click', ejecutar, false);

}, false);


function crearFormulario(key, valor) {
    if (key != 'id' || valor != null) {
        var div = document.getElementById("info");
        var label = document.createElement('label');
        var input = document.createElement('input');

        label.setAttribute('for', key);
        var textLabel = document.createTextNode(key);

        input.setAttribute('type', "text");
        input.setAttribute('id', "txt" + key);

        if (valor != null) {
            input.setAttribute('value', valor);
        }

        label.appendChild(textLabel);

        //bajo un renglon
        var salto = document.createElement('br');
        label.appendChild(salto);

        label.appendChild(input);

        var salto = document.createElement('p');
        div.appendChild(salto);

        div.appendChild(label);
    }
}

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

        if (personaElegida == null) {
            crearFormulario(key);
        }
    }

    tabla.appendChild(header);

    for (var fila in personas) {

        var tr = document.createElement('tr');

        for (var columna in personas[fila]) {
            var th = document.createElement('td');
            var texto = document.createTextNode(personas[fila][columna]);
            th.setAttribute('id', fila);
            th.addEventListener('click', cargarFormularioSeleccionado, false); //escuchador a la celda
            th.appendChild(texto);
            tr.appendChild(th);
        }

        tabla.appendChild(tr);

    }

    div.appendChild(tabla);

}

function cargarFormularioSeleccionado() {

    id = this['id']; //buscar elemento y cargar, tenemos el id
    /*     this.classList.add('blue'); */

    for (var fila in personas) //recorre el array y busca el elemento del id
    {
        if (fila == id) {

            //si lo encuntra, instancia a la persona elegida y la cargar en un array

            personaElegida = {

                id: personas[fila]["id"],
                nombre: personas[fila]["first_name"],
                apellido: personas[fila]["last_name"],
                edad: personas[fila]["email"],
                genero: personas[fila]["gender"]
            }

            info.innerHTML = " "; //limpia el div

            for (var key in personaElegida) // arma el formulario y lo completa
            {
                crearFormulario(key, personaElegida[key]); //crea de nuevo el formulario, reutiliza codigo
            }
            break;
        }
    }

    console.log("persona elegida" + personaToString(personaElegida));

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