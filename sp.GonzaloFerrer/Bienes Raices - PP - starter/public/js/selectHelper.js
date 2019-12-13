let selTransaccion;

window.addEventListener('load', function() {
    selTransaccion = document.getElementById("selTransaccion");
    cargarSelect(selTransaccion, obtenerTransacciones(datos));
    selTransaccion.addEventListener('change', filtrarDatos);

});

function obtenerTransacciones(arr) {
    return arr.map(obj => obj.transaccion)
        .unique()
        .sort();
}

function cargarSelect(sel, arr) {
    limpiarSelect(sel);
    let option = document.createElement('option');
    option.value = "Todos";
    option.textContent = "Todos";
    sel.appendChild(option);
    arr.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        sel.appendChild(option);
    });
}

function limpiarSelect(sel) {
    //sel.options.length = 0;
    while (sel.hasChildNodes()) {
        sel.removeChild(sel.firstElementChild);
    }
}

Array.prototype.unique = function() {
    return [...new Set(this)];
}