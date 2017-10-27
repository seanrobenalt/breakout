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

// brick dimensions
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//hold the score
var score = 0;
var max = 750;

//total lives
var lives = 3;

// set up the bricks
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (var r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {x: 0, y:0, status: 1};
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// c = column; r = row;
function drawBricks() {
	for(var c = 0; c < brickColumnCount; c++) {
		for(var r = 0; r < brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				context.beginPath();
				context.rect(brickX, brickY, brickWidth, brickHeight);
				context.fillStyle = "#0095DD";
				context.fill();
				context.closePath();
			}
		}
	}
}

// control the arrow keys for moving paddle
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

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth &&
            y < b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              score += 50;
              if (score == max) {
                document.getElementById('game-over').innerHTML = 'You won! Reloading...';
								setTimeout(function() {document.location.reload();}, 3000);
              }
        }
      }
    }
  }
}

function drawScore() {
  context.font = '16px Arial';
  context.fillStyle = '#0095dd';
  context.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  context.font = '16px Arial';
  context.fillStyle = '#0095dd';
  context.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  context.clearRect(0,0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  // prevent ball from leaving canvas
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if(!lives) {
        document.getElementById('game-over').innerHTML = 'Game over. Reloading...';
        setTimeout(function() {document.location.reload();}, 3000);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -1;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
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
  requestAnimationFrame(draw);
}

draw();
