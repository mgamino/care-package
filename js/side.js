// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
$( document ).ready(function() {
  // js goes in here.

  // when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
  // not supported in all browsers though and sometimes needs a prefix, so we need a shim
  // window.requestAnimFrame = ( function() {
  // 	return window.requestAnimationFrame ||
  // 				window.webkitRequestAnimationFrame ||
  // 				window.mozRequestAnimationFrame ||
  // 				function( callback ) {
  // 					window.setTimeout( callback, 1000 / 60 );
  // 				};
  // })();
  //
  // // now we will setup our basic variables for the demo
  // var canvas = document.getElementById( 'canvas' ),
  // 		ctx = canvas.getContext( '2d' ),
  // 		// full screen dimensions
  // 		cw = window.innerWidth,
  // 		ch = window.innerHeight,
  // 		// firework collection
  // 		fireworks = [],
  // 		// particle collection
  // 		particles = [],
  // 		// starting hue
  // 		hue = 120,
  // 		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
  // 		limiterTotal = 5,
  // 		limiterTick = 0,
  // 		// this will time the auto launches of fireworks, one launch per 80 loop ticks
  // 		timerTotal = 80,
  // 		timerTick = 0,
  // 		mousedown = false,
  // 		// mouse x coordinate,
  // 		mx,
  // 		// mouse y coordinate
  // 		my;
  //
  // // set canvas dimensions
  // canvas.width = cw;
  // canvas.height = ch;
  //
  // // now we are going to setup our function placeholders for the entire demo
  //
  // // get a random number within a range
  // function random( min, max ) {
  // 	return Math.random() * ( max - min ) + min;
  // }
  //
  // // calculate the distance between two points
  // function calculateDistance( p1x, p1y, p2x, p2y ) {
  // 	var xDistance = p1x - p2x,
  // 			yDistance = p1y - p2y;
  // 	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
  // }
  //
  // // create firework
  // function Firework( sx, sy, tx, ty ) {
  // 	// actual coordinates
  // 	this.x = sx;
  // 	this.y = sy;
  // 	// starting coordinates
  // 	this.sx = sx;
  // 	this.sy = sy;
  // 	// target coordinates
  // 	this.tx = tx;
  // 	this.ty = ty;
  // 	// distance from starting point to target
  // 	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
  // 	this.distanceTraveled = 0;
  // 	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
  // 	this.coordinates = [];
  // 	this.coordinateCount = 3;
  // 	// populate initial coordinate collection with the current coordinates
  // 	while( this.coordinateCount-- ) {
  // 		this.coordinates.push( [ this.x, this.y ] );
  // 	}
  // 	this.angle = Math.atan2( ty - sy, tx - sx );
  // 	this.speed = 2;
  // 	this.acceleration = 1.05;
  // 	this.brightness = random( 50, 70 );
  // 	// circle target indicator radius
  // 	this.targetRadius = 1;
  // }
  //
  // // update firework
  // Firework.prototype.update = function( index ) {
  // 	// remove last item in coordinates array
  // 	this.coordinates.pop();
  // 	// add current coordinates to the start of the array
  // 	this.coordinates.unshift( [ this.x, this.y ] );
  //
  // 	// cycle the circle target indicator radius
  // 	if( this.targetRadius < 8 ) {
  // 		this.targetRadius += 0.3;
  // 	} else {
  // 		this.targetRadius = 1;
  // 	}
  //
  // 	// speed up the firework
  // 	this.speed *= this.acceleration;
  //
  // 	// get the current velocities based on angle and speed
  // 	var vx = Math.cos( this.angle ) * this.speed,
  // 			vy = Math.sin( this.angle ) * this.speed;
  // 	// how far will the firework have traveled with velocities applied?
  // 	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
  //
  // 	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
  // 	if( this.distanceTraveled >= this.distanceToTarget ) {
  // 		createParticles( this.tx, this.ty );
  // 		// remove the firework, use the index passed into the update function to determine which to remove
  // 		fireworks.splice( index, 1 );
  // 	} else {
  // 		// target not reached, keep traveling
  // 		this.x += vx;
  // 		this.y += vy;
  // 	}
  // }
  //
  // // draw firework
  // Firework.prototype.draw = function() {
  // 	ctx.beginPath();
  // 	// move to the last tracked coordinate in the set, then draw a line to the current x and y
  // 	ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
  // 	ctx.lineTo( this.x, this.y );
  // 	ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
  // 	ctx.stroke();
  //
  // 	ctx.beginPath();
  // 	// draw the target for this firework with a pulsing circle
  // 	ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
  // 	ctx.stroke();
  // }
  //
  // // create particle
  // function Particle( x, y ) {
  // 	this.x = x;
  // 	this.y = y;
  // 	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
  // 	this.coordinates = [];
  // 	this.coordinateCount = 5;
  // 	while( this.coordinateCount-- ) {
  // 		this.coordinates.push( [ this.x, this.y ] );
  // 	}
  // 	// set a random angle in all possible directions, in radians
  // 	this.angle = random( 0, Math.PI * 2 );
  // 	this.speed = random( 1, 10 );
  // 	// friction will slow the particle down
  // 	this.friction = 0.95;
  // 	// gravity will be applied and pull the particle down
  // 	this.gravity = 1;
  // 	// set the hue to a random number +-50 of the overall hue variable
  // 	this.hue = random( hue - 50, hue + 50 );
  // 	this.brightness = random( 50, 80 );
  // 	this.alpha = 1;
  // 	// set how fast the particle fades out
  // 	this.decay = random( 0.015, 0.03 );
  // }
  //
  // // update particle
  // Particle.prototype.update = function( index ) {
  // 	// remove last item in coordinates array
  // 	this.coordinates.pop();
  // 	// add current coordinates to the start of the array
  // 	this.coordinates.unshift( [ this.x, this.y ] );
  // 	// slow down the particle
  // 	this.speed *= this.friction;
  // 	// apply velocity
  // 	this.x += Math.cos( this.angle ) * this.speed;
  // 	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
  // 	// fade out the particle
  // 	this.alpha -= this.decay;
  //
  // 	// remove the particle once the alpha is low enough, based on the passed in index
  // 	if( this.alpha <= this.decay ) {
  // 		particles.splice( index, 1 );
  // 	}
  // }
  //
  // // draw particle
  // Particle.prototype.draw = function() {
  // 	ctx. beginPath();
  // 	// move to the last tracked coordinates in the set, then draw a line to the current x and y
  // 	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
  // 	ctx.lineTo( this.x, this.y );
  // 	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
  // 	ctx.stroke();
  // }
  //
  // // create particle group/explosion
  // function createParticles( x, y ) {
  // 	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  // 	var particleCount = 30;
  // 	while( particleCount-- ) {
  // 		particles.push( new Particle( x, y ) );
  // 	}
  // }
  //
  // // main demo loop
  // function loop() {
  // 	// this function will run endlessly with requestAnimationFrame
  // 	requestAnimFrame( loop );
  //
  // 	// increase the hue to get different colored fireworks over time
  // 	//hue += 0.5;
  //
  //   // create random color
  //   hue= random(0, 360 );
  //
  // 	// normally, clearRect() would be used to clear the canvas
  // 	// we want to create a trailing effect though
  // 	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
  // 	ctx.globalCompositeOperation = 'destination-out';
  // 	// decrease the alpha property to create more prominent trails
  // 	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  // 	ctx.fillRect( 0, 0, cw, ch );
  // 	// change the composite operation back to our main mode
  // 	// lighter creates bright highlight points as the fireworks and particles overlap each other
  // 	ctx.globalCompositeOperation = 'lighter';
  //
  // 	// loop over each firework, draw it, update it
  // 	var i = fireworks.length;
  // 	while( i-- ) {
  // 		fireworks[ i ].draw();
  // 		fireworks[ i ].update( i );
  // 	}
  //
  // 	// loop over each particle, draw it, update it
  // 	var i = particles.length;
  // 	while( i-- ) {
  // 		particles[ i ].draw();
  // 		particles[ i ].update( i );
  // 	}
  //
  // 	// launch fireworks automatically to random coordinates, when the mouse isn't down
  // 	if( timerTick >= timerTotal ) {
  // 		if( !mousedown ) {
  // 			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
  // 			fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
  // 			timerTick = 0;
  // 		}
  // 	} else {
  // 		timerTick++;
  // 	}
  //
  // 	// limit the rate at which fireworks get launched when mouse is down
  // 	if( limiterTick >= limiterTotal ) {
  // 		if( mousedown ) {
  // 			// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
  // 			fireworks.push( new Firework( cw / 2, ch, mx, my ) );
  // 			limiterTick = 0;
  // 		}
  // 	} else {
  // 		limiterTick++;
  // 	}
  // }
  //
  // // mouse event bindings
  // // update the mouse coordinates on mousemove
  // canvas.addEventListener( 'mousemove', function( e ) {
  // 	mx = e.pageX - canvas.offsetLeft;
  // 	my = e.pageY - canvas.offsetTop;
  // });
  //
  // // toggle mousedown state and prevent canvas from being selected
  // canvas.addEventListener( 'mousedown', function( e ) {
  // 	e.preventDefault();
  // 	mousedown = true;
  // });
  //
  // canvas.addEventListener( 'mouseup', function( e ) {
  // 	e.preventDefault();
  // 	mousedown = false;
  // });
  //
  // // once the window loads, we are ready for some fireworks!
  // window.onload = loop;

  var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mousePos = {
        x: 400,
        y: 300
    },

    // create canvas
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    rockets = [],
    MAX_PARTICLES = 400,
    colorCode = 0;

// init
$(document).ready(function() {
    document.body.appendChild(canvas);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    setInterval(launch, 800);
    setInterval(loop, 1000 / 50);
});

// update mouse position
$(document).mousemove(function(e) {
    e.preventDefault();
    mousePos = {
        x: e.clientX,
        y: e.clientY
    };
});

// launch more rockets!!!
$(document).mousedown(function(e) {
    for (var i = 0; i < 5; i++) {
        launchFrom(Math.random() * SCREEN_WIDTH * 2 / 3 + SCREEN_WIDTH / 6);
    }
});

function launch() {
    launchFrom(mousePos.x);
}

function launchFrom(x) {
    if (rockets.length < 10) {
        var rocket = new Rocket(x);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 6 - 3;
        rocket.size = 8;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rockets.push(rocket);
    }
}

function loop() {
    // update screen size
    if (SCREEN_WIDTH != window.innerWidth) {
        canvas.width = SCREEN_WIDTH = window.innerWidth;
    }
    if (SCREEN_HEIGHT != window.innerHeight) {
        canvas.height = SCREEN_HEIGHT = window.innerHeight;
    }

    // clear canvas
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    var existingRockets = [];

    for (var i = 0; i < rockets.length; i++) {
        // update and render
        rockets[i].update();
        rockets[i].render(context);

        // calculate distance with Pythagoras
        var distance = Math.sqrt(Math.pow(mousePos.x - rockets[i].pos.x, 2) + Math.pow(mousePos.y - rockets[i].pos.y, 2));

        // random chance of 1% if rockets is above the middle
        var randomChance = rockets[i].pos.y < (SCREEN_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false;

/* Explosion rules
             - 80% of screen
            - going down
            - close to the mouse
            - 1% chance of random explosion
        */
        if (rockets[i].pos.y < SCREEN_HEIGHT / 5 || rockets[i].vel.y >= 0 || distance < 50 || randomChance) {
            rockets[i].explode();
        } else {
            existingRockets.push(rockets[i]);
        }
    }

    rockets = existingRockets;

    var existingParticles = [];

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();

        // render and save particles that can be rendered
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }

    // update array with existing particles - old particles should be garbage collected
    particles = existingParticles;

    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
}

function Particle(pos) {
    this.pos = {
        x: pos ? pos.x : 0,
        y: pos ? pos.y : 0
    };
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = .97;
    this.size = 2;

    this.resistance = 1;
    this.gravity = 0;

    this.flick = false;

    this.alpha = 1;
    this.fade = 0;
    this.color = 0;
}

Particle.prototype.update = function() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    // gravity down
    this.vel.y += this.gravity;

    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // shrink
    this.size *= this.shrink;

    // fade out
    this.alpha -= this.fade;
};

Particle.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};

Particle.prototype.exists = function() {
    return this.alpha >= 0.1 && this.size >= 1;
};

function Rocket(x) {
    Particle.apply(this, [{
        x: x,
        y: SCREEN_HEIGHT}]);

    this.explosionColor = 0;
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

Rocket.prototype.explode = function() {
    var count = Math.random() * 10 + 80;

    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 10;

        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = Math.random() * 0.05 + 0.93;

        particle.flick = true;
        particle.color = this.explosionColor;

        particles.push(particle);
    }
};

Rocket.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};


});
