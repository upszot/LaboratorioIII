var boton, botonAlta;
var tr;
var personaElegida = null;
var personas = [];


window.addEventListener('load', asignarManejadores, false);

function asignarManejadores() {
    traerPersonas();
}


/////////////// COSAS DINAMICAS

function armarListado() {

    var div = document.getElementById("info");

    document.getElementById('info').innerHTML = " "; //borra todo lo anterior

    var header = document.createElement('tr');
    var tabla = document.createElement('table');
    tabla.setAttribute("id", "tablaListado");

    if (personas.length == 0)
    //si el array esta vacio, inventa uno 
    //para dar de base al formulario
    //dinamico, pero no lo guarda
    {
        datos = {

            //cambia para adaptar/////////////////////////////
            id: 2000,
            nombre: "Sansa",
            apellido: "Stark",
            edad: 15,
            casa: "stark",
            traidor: true,
        }

        personas.push(datos);
    }

    //si el array tiene algo crea la tabla dinamicamente
    else {
        for (var key in personas[0]) {
            var th = document.createElement('th');
            var texto = document.createTextNode(key);
            th.appendChild(texto);
            header.appendChild(th);
        }

        tabla.appendChild(header);

        for (var fila in personas) {

            var tr = document.createElement('tr');
            tr.addEventListener('click', cargarFormularioSeleccionado, false); //escuchador a la celda

            for (var columna in personas[fila]) {
                var th = document.createElement('td');
                var texto = document.createTextNode(personas[fila][columna]);
                th.appendChild(texto);
                tr.appendChild(th);
            }

            tabla.appendChild(tr);
        }

    }
    div.appendChild(tabla);

    //AGREGA BOTONES
    div.appendChild(agregarSalto());
    var btnCancelar = agregarBoton("Alta");
    btnCancelar.addEventListener('click', armarAlta, false);
    div.appendChild(btnCancelar);

}


function armarAlta() {
    var div = document.getElementById("info");

    div.innerHTML = "";

    var formulario = document.createElement('form');
    var formulario = document.createElement('form');
    formulario.className = 'frmAlta';
    var tabla = document.createElement('table');
    tabla.setAttribute('class', 'alta');

    for (var key in personas[0]) {
        var tr = document.createElement('tr');

        if (personaElegida == null) {

            tr.appendChild(crearFormulario(key));
        }
        tabla.appendChild(tr);

    }

    var btnAceptar = agregarBoton("aceptar");
    btnAceptar.addEventListener('click', agregarPersona, false);

    var btnCancelar = agregarBoton("cancelar");
    btnCancelar.addEventListener('click', volverInicio, false);

    tabla.appendChild(agregarSalto());
    tabla.appendChild(btnAceptar);
    tabla.appendChild(btnCancelar);

    formulario.appendChild(tabla);

    div.appendChild(formulario);
    div.appendChild(agregarSalto());

}


/**
 * 
 * @param {*} key 
 * @param {*} valor 
 */
function crearFormulario(key, valor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'altaForm');
    div.appendChild(agregarSalto());

    //cambia para adaptar
    switch (key) {
        case "nombre":
        case "apellido":
        case "edad":
            div.appendChild(agregarTextInput(key, valor));
            break;
        case "id":
            if (valor != null) {
                div.appendChild(agregarTextInput(key, valor));
            }
            break;
        case "casa":
            var tr = document.createElement('tr');
            tr.appendChild(agregarRadioButtons("stark", true, valor, "casa"));
            tr.append(agregarRadioButtons("targaryen", false, valor, "casa"));
            tr.append(agregarRadioButtons("lanister", false, valor, "casa"));
            div.appendChild(tr);
            break;
        case "traidor":
            var tr = document.createElement('tr');
            tr.appendChild(agregarCheckBox("traidor", valor));
            div.appendChild(tr);
            div.appendChild(agregarSalto());
            break;
    }
    return div;
}


function cargarFormularioSeleccionado() {

    id = this.firstChild.textContent;
    //buscar elemento y cargar, tenemos el id
    var div = document.getElementById("info");

    for (var fila in personas) //recorre el array y busca el elemento del id
    {
        if (personas[fila]["id"] == id) {

            //si lo encuntra, instancia a la persona elegida y la cargar en un array

            personaElegida = {

                //cambia para adaptar
                id: personas[fila]["id"],
                nombre: personas[fila]["nombre"],
                apellido: personas[fila]["apellido"],
                edad: personas[fila]["edad"],
                casa: personas[fila]["casa"],
                traidor: personas[fila]["traidor"],
            }

            div.innerHTML = " ";

            var formulario = document.createElement('form');
            formulario.className = 'frmAlta';
            var tabla = document.createElement('table');
            tabla.setAttribute('class', 'alta');

            for (var key in personaElegida) {
                var tr = document.createElement('tr');

                if (personaElegida != null) {
                    tr.appendChild(crearFormulario(key, personaElegida[key]));
                }
                tabla.appendChild(tr);

            }


            var btnModificar = agregarBoton("MODIFICAR");
            btnModificar.addEventListener('click', function() {
                var persona01 = newPersona(true);
                modificarPersona(persona01);
            }, false);
            tr.appendChild(btnModificar);

            var btnEliminar = agregarBoton("Eliminar");
            btnEliminar.addEventListener('click', function() {
                eliminarPersona(personaElegida);
            }, false);

            tr.appendChild(btnEliminar);
            tabla.appendChild(tr);

            formulario.appendChild(tabla);
            div.appendChild(formulario);
            div.appendChild(agregarSalto());

            break;
        }
    }


}

///////CONSTRUCTORES DE INPUT Y COSAS

function agregarTextInput(key, valor) {

    var input = document.createElement('input');
    var label = agregarLabel(key);

    input.setAttribute('type', "text");
    input.setAttribute('class', "campo");
    input.setAttribute('id', key);

    if (key == 'id') // pasar a css
    {
        input.setAttribute("readonly", true);
        input.setAttribute('style', ' background-color: lightskyblue');
    }

    if (valor != null) {
        input.setAttribute('value', valor);
    }
    label.appendChild(input);

    return label;
}

function agregarLabel(key) {
    var label = document.createElement('label');
    var textLabel = document.createTextNode(key);
    label.appendChild(textLabel);
    label.setAttribute('for', key);
    label.setAttribute('id', "textoEtiqueta");
    return label;
}



function agregarRadioButtons(valor, activo, nombre, name) {
    var td = document.createElement('td');
    td.setAttribute('id', "textoEtiqueta");
    var input = document.createElement('input');
    input.setAttribute("type", "radio");
    input.setAttribute("name", name);
    input.setAttribute("value", valor);
    input.setAttribute("id", valor);
    if (valor == nombre) {
        input.checked = true;
    } else if (activo) {
        input.checked = true;
    }
    td.appendChild(input);
    td.appendChild(agregarLabel(valor));
    return td;
}

function agregarCheckBox(valor, activo) {
    var td = document.createElement('td');
    td.appendChild(agregarLabel(valor));
    td.setAttribute('id', "textoEtiqueta");
    var input = document.createElement('input');
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", valor);

    if (valor != null && activo == true) {
        input.checked = true;

    }
    td.appendChild(input);
    return td;
}




function agregarBoton(texto) {
    var armarTextoID = "btn" + texto;
    var btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn');
    btn.setAttribute('value', texto);
    btn.setAttribute('id', armarTextoID);
    return btn;

}

function agregarSalto() {
    //bajo un renglon
    var salto = document.createElement('p');
    return salto;

}


function volverInicio() {
    personas = [];
    personaElegida = null;
    asignarManejadores();

}





/////////////// CONSTRUCTOR PERSONA


function newPersona(tieneID) {
    var persona = {};
    if (tieneID) {
        persona.id = document.getElementById('id').value;
    }
    persona.nombre = document.getElementById('nombre').value;
    persona.apellido = document.getElementById('apellido').value;
    persona.edad = document.getElementById('edad').value;

    //cambia para adaptar///////////////////////////////////////
    var resp = document.getElementById("stark").checked;
    var resp2 = document.getElementById("targaryen").checked;
    var resp3 = document.getElementById("lanister").checked;

    if (resp == true) {
        persona.casa = "stark";
    } else if (resp2 == true) {
        persona.casa = "targaryen";
    } else {
        persona.casa = "lanister";
    }

    var resp = document.getElementById('traidor').checked;
    if (resp) {
        persona.traidor = true;
    } else {
        persona.traidor = false;
    }
    return persona;
}



/////////////// NODE.JS 

function ponerSpinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', 'imagenes/spinner.gif');
    spinner.setAttribute('class', 'spinner');
    spinner.setAttribute('alt', 'spinner');

    return spinner;
}



function agregarPersona() {

    var persona = newPersona(false);

    var info = document.getElementById('info');
    var spinner = document.getElementById('spinner');

    var personaRta;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personaRta = JSON.parse(xhr.responseText);

                for (var key in personaRta) // arma el formulario y lo completa
                {
                    crearFormulario(key, personaRta[key]); //crea de nuevo el formulario, reutiliza codigo
                }

                info.innerHTML = "";
                spinner.innerHTML = "";

                traerPersonas();

            } else {
                console.log("error: " + xhr.status);
            }

        } else {
            spinner.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('POST', 'http://localhost:3000/altaPersonaje', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));

    // con POST LOS DATOS PASAR POR SEND
}





function eliminarPersona(persona) {

    var info = document.getElementById('info');

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {

                info.innerHTML = "";

                volverInicio();

            } else {
                console.log("error: " + xhr.status);
            }

        } else {

            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('POST', 'http://localhost:3000/bajaPersonaje', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona)); // con POST LOS DATOS PASAR POR SEND
}



function modificarPersona(persona) {

    console.log("id" + persona.id);
    var info = document.getElementById('info');

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {

                info.innerHTML = "";
                volverInicio();

            } else {
                console.log("error: " + xhr.status);
            }

        } else {
            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('POST', 'http://localhost:3000/modificarPersonaje', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));

    // con POST LOS DATOS PASAR POR SEND
}



function traerPersonas() {

    var spinner = document.getElementById('spinner');
    var info = document.getElementById('info');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personas = JSON.parse(xhr.responseText);
                console.log("personas " + personas);


                info.innerHTML = " ";
                spinner.innerHTML = "";
                armarListado();

            } else {
                spinner.innerHTML = " ";
                console.log("error: " + xhr.status);
            }

        } else {
            spinner.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('GET', 'http://localhost:3000/traerPersonajes', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    /* xhr.open('GET', 'http://192.168.0.77:3000/traerPersonajes', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno) */
    xhr.send(); // con POST LOS DATOS PASAR POR SEND


}