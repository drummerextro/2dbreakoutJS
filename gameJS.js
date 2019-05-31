document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

//bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//paddle
var paddleWidth = 75;
var paddleHeight = 15;
var paddleX = (canvas.width-paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

//ball
var x = canvas.width / 2;
var y = canvas.height - 60;

//movement
var dx = 4;
var dy = -4;

//adding ball radius
var ballRadius = 10;

//score
var score = 0;

//give lives
var lives = 5;

var bricks = [];
  for(var c = 0; c < brickColumnCount; c++)
  {
    bricks[c] = [];
      for(var r = 0; r < brickRowCount; r++)
      {
        bricks[c][r] = {x: 0, y: 0, status: 1 };
      }
  }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e)
{
  if(e.key == "Right" || e.key == "ArrowRight")
  {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft")
  {
    leftPressed = true;
  }
}

function mouseMoveHandler(e)
{
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width)
  {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyUpHandler(e)
{
  if(e.key == "Right" || e.key == "ArrowRight")
  {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft")
  {
    leftPressed = false;
  }
}

function collisionDetection()
{
  for(var c = 0; c < brickColumnCount; c++)
  {
    for(var r = 0; r < brickRowCount; r++)
    {
      var b = bricks[c][r];
      if(b.status == 1)
      {
      //calculations
      if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
        {
        dy = -dy;
        b.status = 0;
        score++;
        if(score == brickRowCount * brickColumnCount)
          {
            alert("YOU WIN! CONGLATURLATIONS!");
            document.location.reload();
            //clearInterval(interval); //cause chrome needs it
          }
        }
      }
    }
  }
}

function drawScore()
{
  ctx.font = "16px firaSans";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives()
{
  ctx.font = "16px firaSans";
  ctx.fillStyle = "#000000";
  ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}

function drawBall()
{
  ctx.beginPath();
  ctx.arc(x, y, 10, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#00ff00";
  ctx.fill();
  ctx.closePath();
}

//draw the paddle
function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks()
{
  for(var c = 0; c < brickColumnCount; c++)
  {
    for (var r = 0; r < brickRowCount; r++)
        {
          if (bricks[c][r].status == 1)
          {
          var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function draw()
{
  // to get a circle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  drawBricks();

  //bounce off the sides
  if( x + dx > canvas.width - ballRadius || x + dx < ballRadius )
 {
     dx = -dx;
 }

  //bounce off the top
  if( y + dy < ballRadius )
  {
      dy = -dy;
  }
  else if ( y + dy > canvas.height-ballRadius )
  {
    if(x > paddleX && x < paddleX + paddleWidth)
    {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives){
          alert("GAME OVER");
          document.location.reload();
        //  clearInterval(interval); // needed for chrome to end the game
        }
        else {
              x = canvas.width / 2;
              y = canvas.height - 30;
              dx = 4;
              dy = -4;
              paddleX = (canvas.width-paddleWidth / 2);
      }
    }
  }


if(rightPressed && paddleX < canvas.width - paddleWidth )
{
  paddleX += 8;
}
else if(leftPressed && paddleX > 0 )
{
  paddleX -= 8;
}

  x += dx;
  y += dy;

requestAnimationFrame(draw);

}

draw();
//var interval = setInterval(draw, 10);
}
