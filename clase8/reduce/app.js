/* var vec = [4, 5, 6, 7, 8, 4, 2, 2, 4, 5, 6, 8, 9];
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
 */

contador = 0;

var vec = [4, 5, 6, 7, 8, 4, 2];
var total = 0;

//EMPIEZA POR EL INDICE UNO

/* total = (vec.reduce(function (previo, actual, indice) {
    console.log(" previo: " + previo + " actual : " + actual + " indice: " + indice); */
    /*   return actual; */
/*     return previo + actual

}, 0));

console.log("total" + total); */

/////////////////////////////////////////


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

/* var totalEdad = persona.reduce(function (previo, actual, indice) {
     previo.total += actual.edad;
     return previo;
}, { total: 0 });

console.log (totalEdad); */
console.log(persona);

persona.forEach(function(elemento){
    elemento.edad *= 2;
})

//console.log(persona);
console.log(
    pe.filter(p=> p.edad <30)
    .map(p=>p.nombre)
    .reduce((x,a)=> x+=a.length,0)
);

