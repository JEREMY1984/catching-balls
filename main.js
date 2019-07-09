let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// get random number between x,y
let random = function(x,y){
    return Math.floor(Math.random()*(y-x+1)+x);
}
//  get random color 
let randomColor = function(){
    return 'rgb(' + random(0,255) +','+ random(0,255) + ','+ random(0,255) + ')';
}

// Ball constructor ---- x = axis-x, y=axis-y,velX= x moving space,velY= y moving space, size = radius of ball, color = ball's color
function Ball(x,y,velX,velY,size,color){
    this.x = x;
    this.y = y;
    this.velY= velY;
    this.velX= velX;
    this.size = size;
    this.color = color;
}

//  Ball's prototype.draw --- draw the ball in ctx
Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
}

// Ball's prototype.update ---- moving ball by update this.x and this.y by adding or minus velX and VelY
Ball.prototype.update = function(){
    if (this.x + this.size >= width){
        this.velX = -(this.velX);
    }
    if (this.x - this.size <= 0){
        this.velX = -(this.velX);
    }
    if (this.y + this.size >= height){
        this.velY = -(this.velY);
    }
    if (this.y - this.size <= 0){
        this.velY = -(this.velY);
    }
    this.x += this.velX;            // update this.x so it move
    this.y += this.velY;            // update this.y so it move
}


// instances Balls objects to contain ballssss
let balls = [];

while (balls.length < 50){
    let size = random(0,8);
    let ball = new Ball(random(size,width-size),random(size,height-size),random(1,4),random(1,4),size,randomColor());
    balls.push(ball);
}

// draw every balls in canvas by loop
// for(i=0;i<balls.length;i++){
//     balls[i].draw();
// }

// draw and animate each balls by -- loops each balls in animate function and loop animate function by requestAnimationFrame()
function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.25)';   // create this to delete previos screenshot by fade out, 0.2 opacity, black background
    ctx.fillRect(0,0,width,height);        // fill style by rectangle for whole screen
    for(i=0;i<balls.length;i++){
        balls[i].draw();                // draw each ball in balls
        balls[i].update();              // move the balls 

    }
    requestAnimationFrame(animate);     // keep animate function load,
}

animate();
