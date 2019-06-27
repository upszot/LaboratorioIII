var vec = [4, 5, 6, 8, 9];

console.log(vec.map(function (valor) {
    return valor * 2;
}
));


var persona = [
    {
        nombre : "juan",
        edad : 20,
    },
    {
        nombre : "pedro",
        edad : 20,
    },
    {
        nombre : "laura",
        edad : 20,
    }
];

var nombre = persona.map( function(nombre)
{
    return nombre.nombre;
});

console.log(nombre);
