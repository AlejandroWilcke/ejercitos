class Piquero extends Unidad {
    constructor(){
        super();
        this.poder = 5;
    }
}

Piquero.prototype.poder_mejora = 3;

Piquero.prototype.costo_mejora = 10;

Piquero.prototype.posiblesTransformaciones = 
[
    { clase: 'Arquero', costo: 30 }
]