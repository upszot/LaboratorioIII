/// <reference path="anuncio.ts" />

class BienRaiz extends Anuncio{

    private transaccion:ETransaccion;

    constructor(id:any,titulo:string,transaccion:ETransaccion,descripcion:string,precio:number,
        numwc:number,numdormitorio:number,numestacionamiento:number){
            
        super(id,titulo,descripcion,precio,numwc,numdormitorio,numestacionamiento);

        this.transaccion = transaccion;
    }

    get Transaccion():ETransaccion{return this.transaccion;};
    set Transaccion(e:ETransaccion){this.transaccion = e};
}