var boton, botonAlta;
var tr;
var personaElegida = null;
var personas = [];


/////////////////BUSCAR FORIN 


window.addEventListener('load', asignarManejadores, false);



function asignarManejadores() {

    botonAlta = document.getElementById("btnAlta");
    botonAlta.addEventListener('click', leerPersonas, false);

    boton = document.getElementById("btnCargar");
    boton.addEventListener('click', traerPersonas, false);
    /*    boton.addEventListener('click', armarListado, false); */
}


/**
 * 
 */
function armarAlta() {

    var div = document.getElementById("info");

    for (var key in personas[0]) {
        if (personaElegida == null) {
            crearFormulario(key);
        }

    }

    //AGREGA BOTONES
    var btnAceptar = agregarBoton("aceptar");
    btnAceptar.addEventListener('click', agregarPersonadelFormulario, false);

    var btnCancelar = agregarBoton("cancelar");
    btnCancelar.addEventListener('click', volverInicio, false);


    div.appendChild(agregarSalto());
    div.appendChild(btnAceptar);
    div.appendChild(btnCancelar);

    /*  botonAlta = document.getElementById("btnAlta").disabled = true; */

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
        if (key == 'id') {
            console.log("tuevieja");
            input.setAttribute("readonly", true);
            input.setAttribute('style', ' background-color: lightskyblue');

        }

        if (valor != null) {

            input.setAttribute('value', valor);


        }
        label.appendChild(input);

        div.appendChild(agregarSalto());
        div.appendChild(label);
    }
}


/**
 * 
 */
function armarListado() {

    var div = document.getElementById("info");

    document.getElementById('info').innerHTML = " "; //borra todo lo anterior

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
        tr.addEventListener('click', cargarFormularioSeleccionado, false); //escuchador a la celda

        for (var columna in personas[fila]) {
            var th = document.createElement('td');
            var texto = document.createTextNode(personas[fila][columna]);
            th.appendChild(texto);
            tr.appendChild(th);
        }

        tabla.appendChild(tr);

    }

    div.appendChild(tabla);

    //AGREGA BOTONES
    var btnCancelar = agregarBoton("Volver");
    btnCancelar.addEventListener('click', volverInicio, false);
    div.appendChild(btnCancelar);

}

function agregarBoton(texto) {
    var armarTextoID = "btn" + texto;
    var btnCancelar = document.createElement('input');
    btnCancelar.setAttribute('type', 'button');
    btnCancelar.setAttribute('class', 'btn');
    btnCancelar.setAttribute('value', texto);
    btnCancelar.setAttribute('id', armarTextoID);
    return btnCancelar;

}

function agregarSalto() {
    //bajo un renglon
    var salto = document.createElement('p');
    return salto;

}


function volverInicio() {

    var div = document.getElementById("info");
    div.innerHTML = " ";


    boton = document.createElement('input');
    boton.setAttribute('type', 'button');
    boton.setAttribute('class', 'btn');
    boton.setAttribute('value', "CargarPersonas");
    boton.setAttribute('id', "btnCargar");

    botonAlta = document.createElement('input');
    botonAlta.setAttribute('type', 'button');
    botonAlta.setAttribute('class', 'btn');
    botonAlta.setAttribute('value', "Alta");
    botonAlta.setAttribute('id', "btnAlta");

    div.appendChild(boton);
    div.appendChild(botonAlta);

    div.appendChild(agregarSalto());

    personas = [];
    personaElegida = null;
    asignarManejadores();

}




function cargarFormularioSeleccionado() {

    id = this.firstChild.textContent; //buscar elemento y cargar, tenemos el id
    /*     this.classList.add('blue'); */

    console.log(id);

    for (var fila in personas) //recorre el array y busca el elemento del id
    {
        if (personas[fila]["id"] == id) {

            //si lo encuntra, instancia a la persona elegida y la cargar en un array

            personaElegida = {

                id: personas[fila]["id"],
                first_name: personas[fila]["first_name"],
                last_name: personas[fila]["last_name"],
                email: personas[fila]["email"],
                gender: personas[fila]["gender"]
            }

            info.innerHTML = " ";

            for (var key in personaElegida) // arma el formulario y lo completa
            {
                crearFormulario(key, personaElegida[key]); //crea de nuevo el formulario, reutiliza codigo
            }

            var div = document.getElementById("info");
            div.appendChild(agregarSalto());

            var btnModificar = agregarBoton("MODIFICAR");
            btnModificar.addEventListener('click', volverInicio, false);
            div.appendChild(btnModificar);

            var btnEliminar = agregarBoton("Eliminar");
            btnEliminar.addEventListener('click', volverInicio, false);

            div.appendChild(btnEliminar);

            break;
        }
    }


}


function agregarPersonadelFormulario() {

    var datos = {
        id: (personas[personas.length - 1]['id'] + 1),
        first_name: document.getElementById('txtfirst_name').value,
        last_name: document.getElementById('txtlast_name').value,
        email: document.getElementById('txtemail').value,
        gender: document.getElementById('txtgender').value
    }

    personas.push(datos);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                /*  info.innerHTML = xhr.responseText; */
            } else {
                console.log("error: " + xhr.status);
            }

        } else {
            info.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('GET', 'http://localhost:3000/enviarDatos?first_name=' + datos.first_name +
        "&last_name=" + datos.last_name +
        "&email=" + datos.email +
        "&gender=" + datos.gender

        , true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    xhr.send();

    armarListado();
}

function traerPersonas() {

    var info = document.getElementById('info');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personas = JSON.parse(xhr.responseText); /*  personas.push(datos); */

                info.innerHTML = " ";
                armarListado();

            } else {
                spinner.innerHTML = " ";
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
    spinner.setAttribute('class', 'logo');
    spinner.setAttribute('alt', 'spinner');

    return spinner;
}

function leerPersonas() {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                personas = JSON.parse(xhr.responseText); /*  personas.push(datos); */
                info.innerHTML = "";
                armarAlta();

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