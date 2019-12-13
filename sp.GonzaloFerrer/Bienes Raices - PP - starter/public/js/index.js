let frm;
let primeraVez = true;
var arrayAnuncios;

$(function() {
    inicializarManejadores();
})

function inicializarManejadores() {
    frm = document.forms[0];
    $("#frm").submit(manejadorAlta);
    $("#btnBorrar").click(borrarAnuncio);
    $("#btnCancelar").click(limpiarForm);
    $("#idAnuncio").hide();
    $("#lblId").hide();
    $("#btnBorrar").hide();
    $("#btnCancelar").hide();
    
    arrayAnuncios = init();

    calcularPrecio(arrayAnuncios);

    cargarTabla(arrayAnuncios);
}

function manejadorAlta(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    altaAnuncio(nuevoAnuncio);
    limpiarForm();
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    modificarAnuncio(anuncio);
}

function filtrarDatos() {
    
    let opciones = ['id'];

    $('.box input:checked').each(function() {
        opciones.push($(this).val());
    });
    
    let transaccion = $('#selTransaccion').val();
    let datosFiltradosSelect = arrayAnuncios;
    
    if (transaccion !== "Todos") {
        datosFiltradosSelect = datosFiltradosSelect.filter(obj => obj.transaccion === transaccion);
    }
    calcularPrecio(datosFiltradosSelect);

   
    let datosFiltradosCheckbox = datosFiltradosSelect.map(function(dato) {
        
        let retorno = new Object();
        
        opciones.forEach(elemento => {
            retorno[elemento] = dato[elemento];
        });
        return retorno;
    });
    
    cargarTabla(datosFiltradosCheckbox);
}

function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let numwc;
    let numestacionamiento;
    let numdormitorio;
    let transaccion;
    let id;
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "numwc":
                numwc = element.value;
                break;
            case "numestacionamiento":
                numestacionamiento = element.value;
                break;
            case "numdormitorio":
                numdormitorio = element.value;
                break;
            case "transaccion":
                if (element.checked === true) {
                    transaccion = element.value;
                }
                break;
            case "idAnuncio":
                if (tieneId === true) {
                    id = element.value;
                } else {
                    ids = datos.map(element => element.id).sort(function (a, b) { return a - b; });
                    ultimoId = ids[ids.length - 1];
                    ultimoId++;
                    id = ultimoId.toString();
                }
                break;
        }
    }
                                 //(id, titulo, transaccion, descripcion, precio, numwc, numdormitorio, numestacionamiento)  
    let nuevoAnuncio = new BienRaiz(id, titulo, transaccion, descripcion, precio, numwc, numdormitorio, numestacionamiento);
    return nuevoAnuncio;
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayAnuncios.filter(obj => obj.id === nodos[0].innerText); //obtengo el dato por id, pregunto si el id de la tr que seleccione es igual a algun id del arrayAnuncios 

    $("#idAnuncio").val(dato[0].id);
    $("#idAnuncio").show();
    $("#lblId").show();

    $("#titulo").val(dato[0].titulo);

    if (dato[0].transaccion == "Venta") {
        $('#transaccionVenta').prop('checked', true);
    } else {
        $('#transaccionAlquiler').prop('checked', true);
    }

    $("#descripcion").val(dato[0].descripcion);
    $("#precio").val(dato[0].precio);
    $("#numwc").val(dato[0].numwc);
    $("#numestacionamiento").val(dato[0].numestacionamiento);
    $("#numdormitorio").val(dato[0].numdormitorio);

    $("#btnCrearModificar").text("Modificar");
    $("#btnBorrar").show();
    $("#frm").off('submit', manejadorAlta);
    $("#frm").submit(manejadorModificar);
    $("#btnCancelar").show();
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return element.value;
        }
    }
}

function limpiarForm() {

    let checkboxs = $('.box input');
    checkboxs.prop("checked", true);
    
    $("#idAnuncio").hide();
    $("#lblId").hide()
    $("#descripcion").val("");
    $("#titulo").val("");
    $("#precio").val("");
    $("#numwc").val("");
    $("#numestacionamiento").val("");
    $("#numdormitorio").val("");
    $('#transaccionVenta').prop('checked', false);
    $('#transaccionAlquiler').prop('checked', false);

    $("#btnCrearModificar").text("Crear");
    $("#btnCancelar").hide();
    $("#btnBorrar").hide();
    $("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorAlta);

    cargarTabla(arrayAnuncios);

}


function calcularPrecio(array) {
    let promedio = array.map(obj => parseInt(obj.precio))
        .reduce((prev, curr) => (prev + curr))/array.length;
    $('#txtInfoPrecio').val(promedio.toFixed(2));
}