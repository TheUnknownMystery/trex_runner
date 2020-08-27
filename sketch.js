//variables
var trex, trex_running, trex_collided, edges, game_over, game_end, symbol_r, symbol;

var ground, invisibleGround, groundImage, invisible_wall, cloud_1, cloud_img, o_1, o_2, o_3, o_4, o_5, o_6, obs_1, player_score = 0;


var jump, die, high_score;
//variables for groups and game States

var cloud_group, obstacles_group, gameState = "play";

//adding image to a variable

function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloud_img = loadImage("cloud_img.png");
  o_1 = loadImage("obstacle1.png");
  o_2 = loadImage("obstacle2.png");
  o_3 = loadImage("obstacle3.png");
  o_4 = loadImage("obstacle4.png");
  o_5 = loadImage("obstacle5.png");
  o_6 = loadImage("obstacle6.png");
  game_over = loadImage("gameOver.png");
  symbol_r = loadImage("restart.png");
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3");
  high_score = loadSound("checkPoint.mp3");
}

function setup() {
  //canvas setup
  createCanvas(400, 400);

  //create a trex sprite 

  //sprite object  
  trex = createSprite(50, 380, 20, 50);
  //image displayed 
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided)
  //adding scale and position to trex
  trex.scale = 0.5

  game_end = createSprite(200, 270, 40, 40);
  game_end.addImage("game_end", game_over);
  game_end.scale = 0.6

  symbol = createSprite(200, 298, 30, 30)
  symbol.addImage("restart", symbol_r);
  symbol.scale = 0.4

  // trex.debug=true;
  //  set collision radius fot terex
  //  trex.setCollider("rectangle", 0, 0, //400,trex.height);

  //wall(invisible)not visible.

  invisible_wall = createSprite(200, 390, 800, 10);
  invisible_wall.visible = false;

  //create ground sprite
  ground = createSprite(200, 380, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  //groups for clouds and obstacles
  cloud_group = new Group();
  obstacle_group = new Group();
}

function draw() {

  if (gameState === "play") {
  //hiding symbols and text
    game_end.visible = false;
    symbol.visible = false;
//displaying clouds and obstacles every 80 or 60 frames
    if (World.frameCount % 80 === 0) {
      clouds();
    }
    if (World.frameCount % 60 === 0) {
      ob_1();

    }

    //score  
    player_score = player_score + Math.round(getFrameRate() / 60)
    //jump
  //trex should jump only when touching ground
    if (keyDown("space") && trex.y > 361) {
      trex.velocityY = -18
      jump.play();

    }
    //makes ground move

    ground.velocityX = -(9 + (player_score / 100))
    //  makes gravity

    trex.velocityY = trex.velocityY + 0.8


    //if the player is touching the cactus


    if (obstacle_group.isTouching(trex)) {
      //    trex.velocityY=-9
      //    
      die.play();
      gameState = "gameOver"
    

    }
    //sound for highscore
    //every hundred frame    
    if (player_score % 100 === 0 && player_score > 0) {
      high_score.play();

    }

  } else if (gameState === "gameOver") {
//the cactus will not move
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0)
    game_end.visible = true;
    symbol.visible = true;
      trex.changeAnimation("collide",trex_collided) 
//restarting game
    if (mousePressedOver(symbol)) {

      restartGame();


    }

    ground.velocityX = 0
    trex.velocityY = 0
    //    die.play();
  //it will stay forever
    cloud_group.setLifetimeEach(-1);
    obstacle_group.setLifetimeEach(-1)

  }
  
  //reset ground add background
  background("white");
  if (ground.x < 0) {
    ground.x = 200;
  }
  // console.log (Math.round(getFrameRate()/60))
  text("score " + player_score, 300, 60);
  edges = createEdgeSprites

  //(stop trex from falling down )

  trex.collide(invisible_wall);


  drawSprites();
}


//createClouds
function clouds() {
  cloud_1 = createSprite(300, 30, 30, 30);
  cloud_1.scale = .8
  cloud_1.y = Math.round(random(280, 300));
  cloud_1.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud_1.lifetime = 600 / 7
  cloud_1.velocityX = -7
  cloud_1.addImage("floating_clouds", cloud_img);
  cloud_group.add(cloud_1)
}

//restart game (function)
function restartGame() {
  gameState = "play"
  player_score = 0;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  symbol.visible = false;
  game_end.visible = false;
  trex.changeAnimation("running", trex_running);



}

function ob_1() {

  obs = createSprite(400, 353, 10, 10);
  obs.velocityX = -(9 + (player_score / 100))
  obs.scale = 0.7
  obs.lifetime = 400 / 9;
//random obstacle generation
  var random_number = Math.round(random(1, 6));

  switch (random_number) {

    case 1:
      obs.addImage(o_1);
      break;

    case 2:
      obs.addImage(o_2);

      break;

    case 3:
      obs.addImage(o_3);

      break;

    case 4:
      obs.addImage(o_4);

      break;

    case 5:
      obs.addImage(o_5);

      break;

    case 6:
      obs.addImage(o_6);

      break;

    default:
      break;




  }
  
  //adding each obstacle to obstacle group
  obstacle_group.add(obs)



}