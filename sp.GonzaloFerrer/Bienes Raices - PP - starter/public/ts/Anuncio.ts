class Anuncio
{
    protected titulo:string;
    protected descripcion:string;
//    protected transaccion:string;
    protected precio:number;
    protected numwc:number;
    protected numdormitorio:number;
    protected numestacionamiento:number;
    protected id:any;

    //constructor(id:any,titulo:string,descripcion:string,transaccion:string,precio:number,numwc:number,numdormitorio:number,numestacionamiento:number) {
    constructor(id:any,titulo:string,descripcion:string,precio:number,numwc:number,numdormitorio:number,numestacionamiento:number) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
  //      this.transaccion = transaccion;
        this.precio = precio;
        this.numwc = numwc;
        this.numdormitorio = numdormitorio;
        this.numestacionamiento= numestacionamiento;
    }

    // Setters & Getters

    set Titulo(e:string){this.titulo = e};
    get Titulo():string{return this.titulo;};

    set Descripcion(e:string){this.descripcion = e};
    get Descripcion():string{return this.descripcion;};

//    set Transaccion(e:string){this.transaccion = e};
//    get Transaccion():string{return this.transaccion;};

    set Precio(e:number){this.precio = e};
    get Precio():number{return this.precio;};

    set Numwc(e:number){this.numwc = e};
    get Numwc():number{return this.numwc;};

    set Numdormitorio(e:number){this.numdormitorio = e};
    get Numdormitorio():number{return this.numdormitorio;};

    set Numestacionamiento(e:number){this.numestacionamiento = e};
    get Numestacionamiento():number{return this.numestacionamiento;};

}

enum ETransaccion{
    Alquiler,
    Venta
}