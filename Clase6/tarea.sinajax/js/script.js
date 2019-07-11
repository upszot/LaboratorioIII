var boton, botonAlta;
var tr;
var personaElegida = null;


/////////////////BUSCAR FORIN


window.addEventListener('load', asignarManejadores, false);

function asignarManejadores() {

    botonAlta = document.getElementById("btnAlta");
    botonAlta.addEventListener('click', armarAlta, false);
    /*   document.forms[0].addEventListener('submit', function(e) {
        e.preventDefault(); // evita lo q iba a hacer y toma el cargo de las acciones del form
        manejarSubmit();
    });
 */
    boton = document.getElementById("btnCargar");
    boton.addEventListener('click', ejecutar, false);
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
    var btnAceptar = document.createElement('input');
    btnAceptar.setAttribute('type', 'button');
    btnAceptar.setAttribute('value', 'Aceptar');
    btnAceptar.setAttribute('id', 'btnAceptar');
    btnAceptar.addEventListener('click', traerPersona, false);

    var btnCancelar = document.createElement('input');
    btnCancelar.setAttribute('type', 'button');
    btnCancelar.setAttribute('value', 'Cancelar');
    btnCancelar.setAttribute('id', 'btnCancelar');
    btnCancelar.addEventListener('click', () => {
        div.innerHTML = "";
    }, false);

    //bajo un renglon
    var salto = document.createElement('br');

    div.appendChild(document.createElement('br'));
    div.appendChild(salto);
    div.appendChild(btnAceptar);
    div.appendChild(btnCancelar);

    botonAlta = document.getElementById("btnAlta").disabled = true;

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
        var salto = document.createElement('br');
        label.appendChild(salto);


        input.setAttribute('type', "text");
        input.setAttribute('id', "txt" + key);
        if (valor != null) {
            input.setAttribute('value', valor);
        }
        label.appendChild(input);

        var salto = document.createElement('p');
        div.appendChild(salto);
        div.appendChild(label);
    }
}


/**
 * 
 */
function ejecutar() {
    var div = document.getElementById("info");

    document.getElementById("btnCargar").disabled = true; //desactva boton
    document.getElementById('info').innerHTML = " "; //borra todo lo anterior

    var header = document.createElement('tr');
    var tabla = document.createElement('table');

    for (var key in personas[0]) {
        var th = document.createElement('th');
        var texto = document.createTextNode(key);
        th.appendChild(texto);
        header.appendChild(th);

        /*        if (personaElegida == null) {
                   crearFormulario(key);
               } */
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


    //AGREGA BOTONES
    var btnCancelar = agregarBotonCancelar();
    btnCancelar.addEventListener('click', () => {
        div.innerHTML = "";
    }, false);
    div.appendChild(btnCancelar);

}

function agregarBotonCancelar() {
    var btnCancelar = document.createElement('input');
    btnCancelar.setAttribute('type', 'button');
    btnCancelar.setAttribute('value', 'Volver');
    btnCancelar.setAttribute('id', 'btnCancelar');
    return btnCancelar;

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

        id: (personas[personas.length - 1]['id'] + 1),
        nombre: document.getElementById('txtfirst_name').value,
        apellido: document.getElementById('txtlast_name').value,
        email: document.getElementById('txtemail').value,
        gender: document.getElementById('txtgender').value
    }

    personas.push(datos);

    ejecutar();
}