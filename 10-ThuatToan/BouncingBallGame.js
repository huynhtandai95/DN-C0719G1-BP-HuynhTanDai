var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var radius = 10;
var paddleWidth = 70;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var start = new Date().getTime();
var score = '0';

function drawScore(){
    var time = new Date().getTime() - start;
    score = Math.floor(time / 1000);
    ctx.font = "16px Georgia";
    ctx.fillStyle = "#0d1a00";
    ctx.fillText("Score: "+score, 6, 18);
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function getRandomHex() {
    return Math.floor(Math.random()*255);
}

function getRandomColor(){
    var red = getRandomHex();
    var green = getRandomHex();
    var blue = getRandomHex();
    return "rgb(" +red+","+blue+","+green+")";
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x ,y ,radius ,0,2*Math.PI);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,290,paddleWidth,paddleHeight);
    ctx.fillStyle = "#4d9900";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();


    if(x> canvas.width - radius || x< radius){
        dx = -dx;
    }
    
    if(y< radius ){
        dy = -dy;
    }else if(y > canvas.height - radius){
        if(x > paddleX && x < paddleX+paddleWidth ){
            dy = -dy;
        }else {
            alert("You lose!");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if(rightPressed ){
        paddleX += 5;
    }
    if(leftPressed){
        paddleX -= 5
    }

    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);