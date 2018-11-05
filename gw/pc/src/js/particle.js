function Particle( x, y, radius ) {
    this.init( x, y, radius );
}

Particle.prototype = {

    init: function( x, y, radius ) {

        this.alive = true;

        this.radius = radius || 20;
        this.wander = 0.15;
        this.theta = random( TWO_PI );
        this.drag = 0.99;
        this.color = '#ba63c5';

        this.x = x || 0.0;
        this.y = y || 0.0;

        this.vx = 0.0;
        this.vy = 0.0;
    },

    move: function() {

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.theta += random( -0.5, 0.5 ) * this.wander;
        this.vx += sin( this.theta ) * 0.1;
        this.vy += cos( this.theta ) * 0.1;

        this.radius *= 0.96;
        this.alive = this.radius > 0.5;
    },

    drawYuanQuan: function( ctx ) {

        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    //星星图
    draw: function( ctx ) {
        var r = this.radius*2;
        var R = this.radius *1.5;
        var rot = 0;
        // ctx.beginPath();
        // ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        // ctx.fillStyle = this.color;
        // ctx.fill();
        ctx.lineWidth = 0;
        ctx.fillStyle = this.color;
        ctx.strokeStyle= this.color;
        ctx.beginPath();
        for(var i = 0; i < 3; i++){
            ctx.lineTo(Math.cos((65+i*115)/160*Math.PI)*R+this.x, -Math.sin((65+i*115-rot)/160*Math.PI)*R+this.y);
            ctx.lineTo(Math.cos((105+i*115)/160*Math.PI)*r+this.x, -Math.sin((105+i*115-rot)/160*Math.PI)*r+this.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
};

// ----------------------------------------
// Example
// ----------------------------------------

var MAX_PARTICLES = 40;//图案数量
var COLOURS = [ '#80238c', '#994ca3', '#e0abab', '#ad57b8', '#f5cece', '#ba63c5', '#fde5e5' ];
// var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

var particles = [];
var pool = [];

var demo = Sketch.create({
    container: document.getElementById( 'wrapper' )
    // container: document.getElementById( 'container' )
});

demo.setup = function() {

    // Set off some initial particles.
    var i, x, y;

    for ( i = 0; i < 20; i++ ) {
        x = ( demo.width * 0.5 ) + random( -100, 100 );
        y = ( demo.height * 0.8 ) + random( -100, 100 );
        demo.spawn( x, y );
    }
};

demo.spawn = function( x, y ) {
    if ( particles.length >= MAX_PARTICLES )
        pool.push( particles.shift() );
    particle = pool.length ? pool.pop() : new Particle();
    particle.init( x, y, random( 3, 9 ) );

    particle.wander = random( 0.5, 2.0 );
    particle.color = random( COLOURS );
    particle.drag = random( 0.9, 0.99 );

    theta = random( TWO_PI );
    force = random( 2, 9 );

    particle.vx = sin( theta ) * force;
    particle.vy = cos( theta ) * force;

    particles.push( particle );
}

demo.update = function() {

    var i, particle;

    for ( i = particles.length - 1; i >= 0; i-- ) {

        particle = particles[i];

        if ( particle.alive ) particle.move();
        else pool.push( particles.splice( i, 1 )[0] );
    }
};

demo.draw = function() {

    demo.globalCompositeOperation  = 'lighter';

    for ( var i = particles.length - 1; i >= 0; i-- ) {
        particles[i].draw( demo );
    }
};

demo.mousemove = function() {

    var particle, theta, force, touch, max, i, j, n;

    for ( i = 0, n = demo.touches.length; i < n; i++ ) {

        touch = demo.touches[i], max = random( 1, 4 );
        for ( j = 0; j < max; j++ ) demo.spawn( touch.x, touch.y );
    }
};
