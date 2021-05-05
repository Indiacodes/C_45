var player, playerImage, playerJumpImage, bg, bgimage, startPlatform, coin, coinImage;
var groupPath, groupCoin;
var collideCount = 0;
var pressedFlag = 0;
var flag = 0;
var score = 0;

function preload(){
  bgimage = loadImage("Images/SkyBlue.jpg");
  playerImage = loadImage("Images/Slime1.png");
  playerJumpImage = loadImage("Images/Slime2.png");
  coinImage = loadImage("Images/Coin.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight - 200);

  player = createSprite(displayWidth/3 - 250, displayHeight/2 - 100, 50, 50);
  player.addImage(playerImage);

  groupPath = new Group();
  groupCoin = new Group();

  startPlatform = createSprite(player.x, player.y + 100, 80, 10);
}

function draw() {
  background(255,255,255);
  image(bgimage, 0, -displayHeight*2, displayWidth*10, displayHeight*3);

  //debug mode
  player.debug = true;

  //score 
  textSize(35);
  text("Score: "+score, player.x + 900, player.y - 400);

  //camera
  camera.position.x = player.x + 500;
  camera.position.y = player.y - 100;
  
  //jump and gravity
  if(keyIsDown(32)){
      player.velocityY = -10;
      pressedFlag = 1;
      player.addImage(playerJumpImage);
  } else{
    player.addImage(playerImage);
  }

  //camera
  camera.position.x = player.x + 600;

  //gravity
  player.velocityY = player.velocityY + 0.4;

  createPath();

  //logic to destoy paths
  for(var i = 0;i<groupPath.maxDepth();i++){
    var pathSprite = groupPath.get(i);

    if(pathSprite != null && pathSprite.x < (player.x - 100)){
      pathSprite.destroy();
    }
  }

  //game end 
  if(flag == 0 && pressedFlag == 1){
    collideCount++;
    flag = 1;
  }

  console.log(collideCount);

  if(player.isTouching(groupPath)){
    pressedFlag = 0;
  }

  //collide paths
  player.collide(groupPath);
  player.collide(startPlatform);

  drawSprites();
}

function createPath(){
  var count = Math.round(random(40, 90));
  var yPos = Math.round(random(player.y - 50, player.y));

  if(frameCount%count==0){
    objPath = new Path(displayWidth + 50, yPos);
    objPath.path.velocityX = -5;
    groupPath.add(objPath.path);
    var randomCoin = Math.round(random(0,3));

    if(frameCount%randomCoin==0){
      coin = createSprite(objPath.x, objPath.y - 30, 20, 20);
      coin.velocityX = -5;
      coin.addImage(coinImage);
      coin.scale = 0.05;
      groupCoin.add(coin);
    }
  }

}