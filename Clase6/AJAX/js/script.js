var boton, boton2;
var contador = 0;

window.addEventListener('load', function() {
    boton = document.getElementById("btnEjecutar");
    boton.addEventListener('click', ejecutar, false);

}, false);

function ejecutar() {

    var xhr = new XMLHttpRequest(); //alguno lo llaman peticion instancion un xml http request

    xhr.onreadystatechange = function() //evento que cada vez que cambia el estado, tiene q valer 4 CUAL VA A SER EL MANEJADOR DEL EVENTOif
        {
            // cada vez que cambia el estado ejecuta esta fuincion
            if (this.readyState == XMLHttpRequest.DONE /*4*/ ) {
                if (this.status == 200) //200 es que no tiene error
                {
                    //obtener referecnia al div info
                    document.getElementById('info').innerHTML = xhr.responseText; //inner html inserta el codigo
                    /* PROGRAMADO EL MANEJADOR */
                }
            }
        };

    xhr.open('GET', 'http://localhost:3000/lista.txt', true); //abre la conexion( metodo , URL, que sea asincronico y no se quede esperando el retorno)
    xhr.send(); //mirar el netqwork de f12 para ver todo lo q pidio

}