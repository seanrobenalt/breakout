var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// ball placement
var x = canvas.width/2;
var y = canvas.height - 30;
// radius of the ball
var ballRadius = 10;

// move ball by these measurements
var dx = 2;
var dy = -2;

// paddle dimensions
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// helpers for controlling paddle events
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

// add ball to canvas
function drawBall() {
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI*2);
  context.fillStyle = "#0095dd";
  context.fill();
  context.closePath();
}

// add paddle to canvas
function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = "#0095dd";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  // prevent ball from leaving canvas
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      document.getElementById('game-over').innerHTML = 'Game over. Reloading...';
      setTimeout(function() {document.location.reload();}, 3000);
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // check if right or left keys pressed
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

// call draw function every 10 milliseconds
setInterval(draw, 10);
