function init(){
    localStorage.setItem("Anuncios", JSON.stringify(datos));
    return JSON.parse(localStorage.getItem("Anuncios"));
}

function altaAnuncio(nuevoAnuncio) {
    arrayAnuncios.push(nuevoAnuncio);
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    cargarTabla(arrayAnuncios);
}
    
function modificarAnuncio(anuncio){
    for(i = 0; i < arrayAnuncios.length; i++)
    {
        if(arrayAnuncios[i].id === anuncio.id)
        {
            arrayAnuncios.splice(i, 2, anuncio);
        }
    }
    
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    limpiarForm();
    cargarTabla(arrayAnuncios);
}

function borrarAnuncio(){
    let id = obtenerId(frm);
    
    for(i = 0; i < arrayAnuncios.length; i++)
    {
        if(arrayAnuncios[i].id === id)
        {
            arrayAnuncios.splice(i, 1);
        }
    }
    
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    limpiarForm();
    cargarTabla(arrayAnuncios);
}


function cargarTabla(array) {
    let tabla = $("#divTabla");
    tabla.html("");
    $('tbody', tabla);

    if (primeraVez === true) {
        crearBoxes(array, "divChk");
        primeraVez = false;
    }
    tabla.append(crearTabla(array));
    let tds = $("td");
    tds.on("click", setValues);
}