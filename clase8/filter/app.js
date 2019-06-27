var vec = [4, 5, 6, 7, 8, 4, 2, 2, 4, 5, 6, 8, 9];
var pares = [];
pares = (vec.filter(function (valor) {
    return valor % 2 != 0;
}
));

console.log (pares);
//el filter devuelve true o false

var persona = [
    {
        nombre: "juan",
        edad: 20,
    },
    {
        nombre: "pedro",
        edad: 25,
    },
    {
        nombre: "laura",
        edad: 20,
    }
];

var nombre = persona.filter(function (nombre) {
    4
    return nombre.edad == 20;
});

console.log(nombre.map(function(valor){
    return valor.nombre;
}));
