//Segue a função para "pular/matar" nos inimigos (física p2).

//Função que gerencia o que vai acontecer ao encostar no inimigo
matandoInimigo: function(jog, ini) {

	//Chama a função que mata o inimigo
    this.killInimigo(ini);

    // Verifica se pulou em cima do inimigo
    if (this.touchingUp(ini)){
        jog.velocity.y = -530;
    }
	
},

//Função para matar o inimigo
killInimigo: function(ini){
    ini.sprite.damage(10);
    ini.moveUp(20);
    ini.clearCollision(true,true);
    ini.data.gravityScale=1;
    ini.angularVelocity=10;
},

//Função touchingUp
touchingUp: function(parametro) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === parametro.data || c.bodyB === parametro.data)        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === parametro.data) d *= -1;
            if (d < -0.5) result = true;
        }
    } return result;
},