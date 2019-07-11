var formulario;

window.addEventListener('load',inicializarEventos);

/*
function inicializarEventos()
{
    //formulario = document.forms[0];
    //formulario.addEventListener('submit');
    
    document.forms[0].addEventListener('submit',(e)=>{
    //document.forms[0].addEventListener('submit',function(e){
        console.log(document.forms[0]);
        e.preventDefault(); //bloquea comportamiento por defecto de un evento

    });
}
*/
function inicializarEventos()
{    
    document.forms[0].addEventListener('submit',manejarSubmit);
}

function manejarSubmit(e)
{
    //console.log(document.forms[0]);
    e.preventDefault(); //bloquea comportamiento por defecto de un evento
    var informacion="";
    informacion+="Nombre: " + document.getElementById('txtNombre').value + "<br>";
    informacion+="Password: " + document.getElementById('txtClave').value + "<br>";

    var rdoSexoM=document.getElementById('rdoMasculino');
    var rdoSexoF=document.getElementById('rdoFemenino');

    if (document.getElementById('chkCss').checked) //si checked es true es que está chequeado.
    {
        informacion += "<br>Sabe CSS";
    }
    else
    {
        informacion += "<br>No sabe CSS";
    }

    if (document.getElementById('chkJs').checked) //si checked es true es que está chequeado.
    {
        informacion += "<br>Sabe JS";
    }
    else
    {
        informacion += "<br>No sabe JS";
    }

    if (document.getElementById('chkHtml').checked) //si checked es true es que está chequeado.
    {
        informacion += "<br>Sabe HTML";
    }
    else
    {
        informacion += "<br>No sabe HTML";
    }

    if (rdoSexoM.checked) //si checked es true es que está chequeado.
    {
        informacion += "<br>Sexo : " + rdoSexoM.value;
    }
    else
    {
        informacion += "<br>Sexo : " + rdoSexoF.value;
    }


    document.getElementById('info').innerHTML=informacion;

}
