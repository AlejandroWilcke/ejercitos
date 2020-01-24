class Bizantinos extends Ejercito {
    constructor(){
        super();
        this.instanciarUnidades();
    }
}

Bizantinos.prototype.cantidad_inicial_piqueros      = 5;
Bizantinos.prototype.cantidad_inicial_arqueros      = 8;
Bizantinos.prototype.cantidad_inicial_caballeros    = 15;