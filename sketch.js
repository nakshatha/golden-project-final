var fuel=100
var gamestates="play"
function preload(){
  space1image=loadImage("pg1.jpeg")
  rocketimage=loadImage("rocket.png")
  obstacle1image=loadImage("comet1.png")
  obstacle2image=loadImage("comet2.png")
  obstacle3image=loadImage("comet3.png")
  gameoverimage=loadImage("gameover.png")
  hydrogenImage=loadImage("hydrogen bubble.png")
  rocketsound=loadSound("rocketsound.mp3")
  explosionsound=loadSound("explosion2.mp3")
  fueloversound=loadSound("siren.mp3")
}
function setup() {
  createCanvas(500, 600);
  backround=createSprite(150,100)
  backround.addImage(space1image)
  backround.scale=1.5
  rocket=createSprite(250,500)
  rocket.addImage(rocketimage)
  rocket.scale=0.5
  //rocket.debug=true
  rocket.setCollider("rectangle",0,0,120,320)
  invisibleleft=createSprite(10,500,10,200)
  invisibleright=createSprite(490,500,10,200)
  invisibleleft.visible=false
  invisibleright.visible=false
  hydrogenBubblegroup=createGroup()
  obstaclegroup=createGroup()
  //rocketsound.loop()

  
}

function draw() {
  background(0);
  if(gamestates==="play"){
  backround.velocityY=3
  if(backround.y>600){
    backround.y= backround.height/2
  }
    //console.log("i am inside if")
  if(keyDown("right")){
    rocket.x = rocket.x+4
    rocketsound.play()
  }
  if(keyDown("left")){
    rocket.x=rocket.x-4
    rocketsound.play()
  }
  rocket.collide(invisibleright)
  rocket.collide(invisibleleft)
  
  if(frameCount%100==0){
    fuel=fuel-2
  }
  if(hydrogenBubblegroup.isTouching(rocket)){
    fuel=fuel+20
    hydrogenBubblegroup.destroyEach()
  }
  if(obstaclegroup.isTouching(rocket)){
    fuel=fuel-25
    obstaclegroup.destroyEach()
  }
  console.log (backround.height)
  spawnobstacles()
  spawnfuel()

  }
    drawSprites()
  stroke("black")
  fill("white")
  textSize(20)
  text("fuel remaining:"+fuel+"%",50,50)
  if(fuel<0){
    gamestates="endstate"
    fueloversound.play()
    
  }
  if(fuel>100){
    gamestates="blaststate"
    explosionsound.play()
    
  }
  if(gamestates==="blaststate"){
    text("your engine blasted , too much fuel",100,400)
    rocket.addImage(gameoverimage)
    rocket.x=200
    rocket.y=300
    rocket.scale=2
    backround.velocityY=0
    fuel=101
    rocketsound.stop()
    
  }
  if(gamestates==="endstate"){
    
    backround.velocityY=0
    rocket.addImage(gameoverimage)
    rocket.x=250
    rocket.y=300
    rocket.scale=1
    fuel=0
    text("FUEL OVER",200,500)
    rocketsound.stop()
    
  }
  
  
}
function spawnobstacles(){
  if(frameCount%80==0){
    obstacle=createSprite(Math.round(random(100,400)),Math.round(random(50,150)))
    
    obstacle.velocityY=12
     var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1image);
              break;
      case 2: obstacle.addImage(obstacle2image);
              break;
      case 3: obstacle.addImage(obstacle3image);
              break;
      default: break;
    }
    obstacle.scale=0.2
    obstacle.lifetime=200
    obstaclegroup.add(obstacle)
  }
     
}
function spawnfuel(){
   if(frameCount%400==0){
    hydrogen=createSprite(Math.round(random(100,400)),Math.round(random(50,150)))
     hydrogen.addImage(hydrogenImage)
     hydrogen.velocityY=10 
     var rand=Math.round(random(1,2))
     if(rand==1){
        hydrogen.velocityX=-4
     }else
     {
       hydrogen.velocityX=4
     }
     hydrogen.scale=0.1
     hydrogen.lifetime=200
      hydrogenBubblegroup.add(hydrogen)
    
  }
}
