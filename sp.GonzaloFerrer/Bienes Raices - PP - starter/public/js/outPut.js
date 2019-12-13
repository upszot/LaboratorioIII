"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Anuncio = /** @class */ (function () {
    //constructor(id:any,titulo:string,descripcion:string,transaccion:string,precio:number,numwc:number,numdormitorio:number,numestacionamiento:number) {
    function Anuncio(id, titulo, descripcion, precio, numwc, numdormitorio, numestacionamiento) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        //      this.transaccion = transaccion;
        this.precio = precio;
        this.numwc = numwc;
        this.numdormitorio = numdormitorio;
        this.numestacionamiento = numestacionamiento;
    }
    Object.defineProperty(Anuncio.prototype, "Titulo", {
        get: function () { return this.titulo; },
        // Setters & Getters
        set: function (e) { this.titulo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Descripcion", {
        get: function () { return this.descripcion; },
        set: function (e) { this.descripcion = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Precio", {
        get: function () { return this.precio; },
        //    set Transaccion(e:string){this.transaccion = e};
        //    get Transaccion():string{return this.transaccion;};
        set: function (e) { this.precio = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Numwc", {
        get: function () { return this.numwc; },
        set: function (e) { this.numwc = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Numdormitorio", {
        get: function () { return this.numdormitorio; },
        set: function (e) { this.numdormitorio = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Numestacionamiento", {
        get: function () { return this.numestacionamiento; },
        set: function (e) { this.numestacionamiento = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Anuncio;
}());
var ETransaccion;
(function (ETransaccion) {
    ETransaccion[ETransaccion["Alquiler"] = 0] = "Alquiler";
    ETransaccion[ETransaccion["Venta"] = 1] = "Venta";
})(ETransaccion || (ETransaccion = {}));
/// <reference path="anuncio.ts" />
var BienRaiz = /** @class */ (function (_super) {
    __extends(BienRaiz, _super);
    function BienRaiz(id, titulo, transaccion, descripcion, precio, numwc, numdormitorio, numestacionamiento) {
        var _this = _super.call(this, id, titulo, descripcion, precio, numwc, numdormitorio, numestacionamiento) || this;
        _this.transaccion = transaccion;
        return _this;
    }
    Object.defineProperty(BienRaiz.prototype, "Transaccion", {
        get: function () { return this.transaccion; },
        set: function (e) { this.transaccion = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return BienRaiz;
}(Anuncio));
//# sourceMappingURL=outPut.js.map