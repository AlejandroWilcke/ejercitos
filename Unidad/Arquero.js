class Arquero extends Unidad {
    constructor(){
        super();
        this.poder = 10;
    }
}

Arquero.prototype.poder_mejora = 7;

Arquero.prototype.costo_mejora = 20;

Arquero.prototype.posiblesTransformaciones = 
[
    { clase: 'Caballero', costo: 40 }
]