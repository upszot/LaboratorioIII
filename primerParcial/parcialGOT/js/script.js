var boton, botonAlta;
var tr;
var personaElegida = null;
var personas = [];



 $(document).ready(asignarManejadores);
// window.addEventListener('load', asignarManejadores, false);

function asignarManejadores() {
    traerPersonas();
}

function ordenarAsc(p_array_json, p_key) 
{
    p_array_json.sort(function(a, b) {
        return ( a[p_key] - b[p_key] ); //para ordenar Nros es con - para ordenar letras >     
    });  
 }

function newDatoGOT() {
    return dato = {
        id: null,
        nombre: null,
        apellido: null,
        edad: null,
        casa: null,
        traidor: false
    };
} 


function getHeaderTabla(cabecera)
{
    var header = document.createElement('tr');
    for (const key in cabecera) {
        var th = document.createElement('th');
        var texto = document.createTextNode(key.toUpperCase());
        th.appendChild(texto);
        header.appendChild(th);
    }
    return header;
}

function cargaFilasTabla_ConListener(tabla,arrayJSON,evento,funcion)
{
    for(var fila in arrayJSON){
        var tr = document.createElement('tr');
        tr.addEventListener(evento, funcion, false); //escuchador a la celda
        for (var columna in arrayJSON[fila]) {  
            var td = document.createElement('td');
            var texto = document.createTextNode(arrayJSON[fila][columna]);
            td.appendChild(texto);
            tr.appendChild(td);
          }
          tabla.appendChild(tr);
    }
    return tabla;
}

function crearTabla() {
    
     var div = document.getElementById("info");    
     div.innerHTML = "";//borra todo lo anterior

    var tabla = document.createElement('table');
    tabla.setAttribute("id", "tablaListado");    

    if (personas.length == 0)    
    {//si el array esta vacio, inventa uno para dar de base al formulario dinamico, pero no lo guarda
        personas.push(newDatoGOT());
    }   
    else 
    { //si el array tiene algo crea la tabla dinamicamente
        tabla.appendChild(getHeaderTabla(personas[0])); //Agrega el header de la tabla       
        ordenarAsc(personas, "id"); //ordeno el ArrayJSON por clave en forma ascendente.
        tabla=cargaFilasTabla_ConListener(tabla,personas,'click',cargarFormularioSeleccionado);//Agrego filas a tabla
    }
    div.appendChild(tabla);

    //AGREGA BOTONES
    div.appendChild(agregarSalto());
    var btnAlta = agregarBotonListener("Alta",armarAlta);
    div.appendChild(btnAlta);
}


function armarAlta() {
    var div = document.getElementById("info");
    div.innerHTML = "";

    var formulario = document.createElement('form');    
    formulario.className = 'frmAlta';
    var tabla = document.createElement('table');
    tabla.setAttribute('class', 'alta');

    console.log("entro en armarAlta");
    for (var key in personas[0]) 
    {
        var tr = document.createElement('tr');

        if (personaElegida == null) {
            tr.appendChild(crearFormulario(key));
        }
        tabla.appendChild(tr);

    }
   
    var btnAceptar = agregarBotonListener("aceptar",agregarPersona);
    var btnCancelar = agregarBotonListener("cancelar",volverInicio);
 
    tabla.appendChild(agregarSalto());
    tabla.appendChild(btnAceptar);
    tabla.appendChild(btnCancelar);

    formulario.appendChild(tabla);

    div.appendChild(formulario);
    //div.appendChild(agregarSalto());     

}


/**
 * 
 * @param {*} key 
 * @param {*} valor 
 */
function crearFormulario(key, valor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'altaForm');
    // div.appendChild(agregarSalto());

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
            // div.appendChild(agregarSalto());
            break;
    }
    return div;
}

function getJsonFiltradoXKey(arrayJSON,key,valor)
{// devuelve 1 fila cuando coincida el valor de la key
    var retorno=null;
    for (var fila in arrayJSON) 
    {
        if (arrayJSON[fila][key] == valor)
        {
            retorno=arrayJSON[fila];
            break;
        }
    }
    return retorno;
}

function cargarFormularioSeleccionado() {

    id = this.firstChild.textContent; //Obtengo el id del elemento seleccionado de la fila
    var div = document.getElementById("info");
    personaElegida=getJsonFiltradoXKey(personas,"id",id);
        
    if (personaElegida!= null) 
    { 
        div.innerHTML = " ";
        var formulario = document.createElement('form');
        formulario.className = 'frmAlta';
        var tabla = document.createElement('table');
        tabla.setAttribute('class', 'alta');

        for (var key in personaElegida) 
        {
            var tr = document.createElement('tr');           
            tr.appendChild(crearFormulario(key, personaElegida[key]));
            tabla.appendChild(tr);
        }

        var btnModificar = agregarBotonListener("MODIFICAR",function() {
            var persona01 = newPersona(true);
            modificarPersona(persona01);
        }   );

        tr.appendChild(btnModificar);

        var btnEliminar = agregarBotonListener("Eliminar",function() {
            eliminarPersona(personaElegida);
        } );

            //si lo pongo asi no funciona bien
        // var btnEliminar = agregarBotonListener("Eliminar",eliminarPersona(personaElegida) );

        tr.appendChild(btnEliminar);
        tabla.appendChild(tr);

        formulario.appendChild(tabla);
        div.appendChild(formulario);
        div.appendChild(agregarSalto());   
    }
}


/* ---------- CONSTRUCTORES DE INPUT Y COSAS  ---------- */

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


// function agregarBoton(texto) {
//     var armarTextoID = "btn" + texto;
//     var btn = document.createElement('input');
//     btn.setAttribute('type', 'button');
//     btn.setAttribute('class', 'btn');
//     btn.setAttribute('value', texto);
//     btn.setAttribute('id', armarTextoID);
//     return btn;
// }


function agregarBotonListener(texto,funcion) {
    var armarTextoID = "btn" + texto;
    var btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn');
    btn.setAttribute('value', texto);
    btn.setAttribute('id', armarTextoID);
    btn.addEventListener('click', funcion, false);     
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

function ponerSpinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', 'imagenes/spinner.gif');
    spinner.setAttribute('class', 'spinner');
    spinner.setAttribute('alt', 'spinner');
    return spinner;
}

/* -------------- CONSTRUCTOR PERSONA -------------- */


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



/* -------------- NODE.JS -------------- */

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

    console.log("id: " + persona.id);
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
                // console.log("personas " + personas);

                info.innerHTML = " ";
                spinner.innerHTML = "";
                crearTabla();

            } else {
                spinner.innerHTML = " ";
                console.log("error: " + xhr.status);
            }

        } else {
            spinner.appendChild(ponerSpinner()); //mientras no responde positivo muestra manejador
        }

    };

    xhr.open('GET', 'http://localhost:3000/traerPersonajes', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    xhr.send(); // con POST LOS DATOS PASAR POR SEND
}