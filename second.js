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
    return  'rgb(' + random(0,255) +','+ random(0,255) + ','+ random(0,255) + ')';
}

// Ball constructor ---- x = axis-x, y=axis-y,velX= x moving space,velY= y moving space, size = radius of ball, color = ball's color
function Shape(x,y,velX,velY,exists){
    this.x = x;
    this.y = y;
    this.velY= velY;
    this.velX= velX;
    this.exists = exists;
}

function Ball(x,y,velX,velY,exists,size,color){
    Shape.call(this,x,y,velX,velY,exists,size,color);
    this.color = color;
    this.size = size;
}

Object.defineProperty(Ball.prototype,'constructor',{
    value: Ball,
    enumerable : false,
    writable: true
});


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

// Ball's prototype collisionDetect 
Ball.prototype.collisionDetect = function(){
    for(j=0;j<balls.length;j++){
        if(this !== balls[j]){
            let dx = this.x - balls[j].x;
            let dy = this.y- balls[j].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < this.size *2){
                this.color = balls[j].color = randomColor();
            }
        }
    }
}

// EvilCircle() constructor
function EvilCircle(x,y,velX,velY,exists,size,color){
    Shape.call(this,x,y,velX,velY,exists,size,color);
    this.size =size;
    this.color =color;
}

Object.defineProperty(EvilCircle.prototype,'constructor',{
    value: EvilCircle,
    enumerable: false,
    writable: true
});

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.stroke();
}
EvilCircle.prototype.checkBounds = function(){
    if(this.x + this.size >= width){
        this.x -= 1;
    }
    if(this.x -this.size <=0){
        this.x += 1;
    }
    if(this.y + this.size >=height){
        this.y -= 1;
    }
    if(this.y - this.size <=0){
        this.y += 1;
    }
}

EvilCircle.prototype.setControl = function(){
    let _this = this;
    window.onkeydown = function(e){
        if(e.keyCode === 37){
            _this.x -= _this.velX;
        } else if(e.keyCode === 38){
            _this.y -= _this.velY;
        } else if (e.keyCode === 39){
            _this.x += _this.velX;
        } else if (e.keyCode === 40){
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function(){
    for(let j=0; j<balls.length; j++){
        if(balls[j].exists === true){
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx*dx+dy*dy);
            if(distance <= this.size + balls[j].size){
                balls[j].exists = false;
                balls.splice(j,1);
                let score = balls.length;
                let para = document.querySelector('p');
                let newScore = 'Counting Balls: ' + score ;
                para.textContent = newScore;
                if(para.textContent === 'Counting Balls: 0'){
                    alert('You Win! WELL DONE!');
                }
            }
        }
    }
}

let evilCircle = new EvilCircle(random(10,width-10),random(10,height-10),20,20,true,10,'white');
// instances Balls objects to contain ballssss
let balls = [];


while (balls.length < 50){
    let size = random(2,8);
    let ball = new Ball(random(size,width-size),random(size,height-size),random(1,4),random(1,4),true,size,randomColor());
    balls.push(ball);
}


// draw every balls in canvas by loop
// for(i=0;i<balls.length;i++){
//     balls[i].draw();
// }

// draw and animate each balls by -- loops each balls in animate function and loop animate function by requestAnimationFrame()
function loop(){
    ctx.fillStyle = 'rgba(0,0,0,0.25)';   // create this to delete previos screenshot by fade out, 0.2 opacity, black background
    ctx.fillRect(0,0,width,height);        // fill style by rectangle for whole screen
    for(i=0;i<balls.length;i++){
        if(balls[i].exists === true){
        balls[i].draw();                // draw each ball in balls
        balls[i].update();              // move the balls 
        balls[i].collisionDetect();
        }
        evilCircle.draw();
        evilCircle.setControl();
        evilCircle.checkBounds();
        evilCircle.collisionDetect();
    }
    requestAnimationFrame(loop);     // keep animate function load,
}

loop();

let score = balls.length;
let para = document.querySelector('p');
let newScore = 'Counting Balls: ' + score ;
para.textContent = newScore;

