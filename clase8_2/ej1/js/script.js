$(document).ready(inicializarManejadores);

function inicializarManejadores() {
    $("#miH1").click(function () {
        //alert("hola mundo");    
        
        //referencia al origen del evento... lo q en js es con e
        $(this).css("color","blue");

        var h1=$(this);
        h1.text("otro texto");
        alert(h1.text());


    });


    var parrafos= $("p");

    parrafos.click(cambiarTexto); // es como si hubiera realizado el foreach y asignado el evento  para cada elemento del array
    $("#p3").attr("class","rojo");
    
    var elementoRojos=$(".rojo");
    elementoRojos.click(function ( ) {
        $(this).css("color","red")
    });

    $("div").html("<input type='text'>");

    alert( $("#p1").attr("id")  );

}


function cambiarTexto() {
    $(this).text("me cambiaron");

}
