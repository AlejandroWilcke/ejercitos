class Caballero extends Unidad {
    constructor(){
        super();
        this.poder = 20;
    }
}

Caballero.prototype.poder_mejora = 10;

Caballero.prototype.costo_mejora = 30;

Caballero.prototype.posiblesTransformaciones = [];