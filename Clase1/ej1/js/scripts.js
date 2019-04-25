//window.onload = inicializarEventos;
window.addEventListener('load',inicializarEventos );
function cambiarColor(){
    var h1= document.getElementById('miH1');
    h1.style.color="blue";
}

function cambiarColor2(){
    var h2= document.getElementById('miH2');
    h2.style.color="blue";
}

function inicializarEventos()
{
   var imagen = document.getElementsByTagName('img')[0];

    imagen.addEventListener('mouseover',function (e) {
        e.target.setAttribute('src','./images/favicon.jpg'); 
    });
 
}
    
