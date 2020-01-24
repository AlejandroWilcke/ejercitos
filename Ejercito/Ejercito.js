class Ejercito {
    constructor(){
        this.unidades   = [];
        this.historial  = [];
        this.monedas    = 1000;
    }
}

Ejercito.prototype.totalPuntos = function(){
    let totalPuntos = 0;
    this.unidades.forEach( unidad => totalPuntos += unidad.poder );
    return totalPuntos;
}

Ejercito.prototype.eliminarUnidadesMasFuertes = function(cantidad){
    this.unidades.sort( ( a, b ) => a.poder - b.poder )
    for( let i = 0; i < cantidad; i++ ){
        this.unidades.splice( this.unidades.length - 1, 1 );
    }
}

Ejercito.prototype.eliminarUnidadesPorTipo = function(cantidad, unidad){
    //La ordeno de menor a mayor poder para eliminar a las menos entrenadas.
    this.unidades.sort( ( a, b ) => a.poder - b.poder )
    var countEliminados = 0;
    for( let i = 0; i < this.unidades.length; i++ ){
        if( this.unidades[i].constructor.name === unidad ){
            this.unidades.splice( i, 1 );
            countEliminados++;
            i-- //Reindexación por splice
        }
        if( countEliminados === cantidad ){
            break;
        }
    }
    if( countEliminados > 0 ){
        return true;
    }else{
        return false;
    }
}

Ejercito.prototype.obtenerClaseDeUnidad = function(unidad){
    // unidad         = el string "Arquero".
    // ClaseUnidad    = la clase Arquero.
    var ClaseUnidad;
    try{
        ClaseUnidad = eval(unidad);
    }catch(err){
        console.log(`No existe la clase de unidad: ${unidad}`);
        return false;
    }
    return ClaseUnidad;
}

Ejercito.prototype.atacar = function(ejercitoDefensor){
    
    let diferenciaDePuntos = this.totalPuntos() - ejercitoDefensor.totalPuntos();

    var mensajeAtacante = "";
    var mensajeDefensor = "";

    if( diferenciaDePuntos > 0 ){ //Vence atacante

        this.monedas += 100;
        ejercitoDefensor.eliminarUnidadesMasFuertes(2);
        mensajeAtacante = "VICTORIA";
        mensajeDefensor = "DERROTA";

    }else if( diferenciaDePuntos < 0 ){ //Vence defensor

        ejercitoDefensor.monedas += 100;
        this.eliminarUnidadesMasFuertes(2);
        mensajeAtacante = "DERROTA";
        mensajeDefensor = "VICTORIA";

    }else{ //Empate

        this.eliminarUnidadesMasFuertes(1);
        ejercitoDefensor.eliminarUnidadesMasFuertes(1);
        mensajeAtacante = "EMPATE";
        mensajeDefensor = "EMPATE";
    
    }

    mensajeAtacante += " | " + ejercitoDefensor.constructor.name;
    mensajeDefensor += " | " + this.constructor.name;

    let historialAtacante   = new Historial(mensajeAtacante);
    let historialDefensor   = new Historial(mensajeDefensor);

    this.historial.push(historialAtacante);
    ejercitoDefensor.historial.push(historialDefensor);

}

Ejercito.prototype.entrenarUnidad = function(unidad){

    var ClaseUnidad = this.obtenerClaseDeUnidad(unidad);

    if( ClaseUnidad && this.monedas >= ClaseUnidad.prototype.costo_mejora ){

        this.monedas -= ClaseUnidad.prototype.costo_mejora;

        //Obtengo los indices de las unidades que son del tipo a entrenar,
        //ya que decidí juntar todas en un array común.
        let indicesUnidades = [];

        this.unidades.forEach( ( uni, index ) => {
            if( uni.constructor.name === unidad ){
                indicesUnidades.push(index);
            }
        });

        //Entreno una unidad aleatoria, podría sino entrenarlas de forma lineal y pareja... pero lo veo más divertido y sencillo.
        let randomIndex = Math.round( Math.random() * indicesUnidades.length - 1 );
        
        this.unidades[randomIndex].entrenar();

    }
    
}

Ejercito.prototype.transformarUnidad = function(unidadOriginal, unidadConvertida){

    var ClaseUnidadOriginal     = this.obtenerClaseDeUnidad(unidadOriginal);
    var ClaseUnidadConvertida   = this.obtenerClaseDeUnidad(unidadConvertida);

    if( ClaseUnidadOriginal && ClaseUnidadConvertida ){
        let posiblesTransformaciones = ClaseUnidadOriginal.prototype.posiblesTransformaciones;
        for( let i = 0; i < posiblesTransformaciones.length; i++ ){
            if( posiblesTransformaciones[i].clase === unidadConvertida ){
                
                if( this.monedas >= posiblesTransformaciones[i].costo ){
                    this.monedas -= posiblesTransformaciones[i].costo;
                    let eliminoUnaUnidad = this.eliminarUnidadesPorTipo(1, unidadOriginal );
                    if( eliminoUnaUnidad ){
                        this.unidades.push( new ClaseUnidadConvertida() );
                    }
                }

                break;
            }
        }
    }
}

Ejercito.prototype.instanciarUnidades = function(){

    /* 
        Este método se invoca cada vez que se instancia una nueva civilización,
        pero siento que debería invocarse desde la instancia de Ejercito
        debido a la redundancia de escribirlo en cada civilización.

        El problema es que no puedo hacerlo ya que la cantidad de unidades a crear las determina la civilización,
        y esa cantidad no existe previamente. Por lo tanto si lo invoco en la instancia de Ejercito,
        las cantidades no existirían aún. No se me ocurrió una mejora a esto.
    */

    for( let i = 0; i < this.cantidad_inicial_piqueros; i++ ){
        this.unidades.push( new Piquero() );
    }

    for( let i = 0; i < this.cantidad_inicial_arqueros; i++ ){
        this.unidades.push( new Arquero() );
    }

    for( let i = 0; i < this.cantidad_inicial_caballeros; i++ ){
        this.unidades.push( new Caballero() );
    }

}