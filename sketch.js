let playerSprite;
let floor;
let jumpSwitch = false;
let backgroundImg;
let plataformas;
let gravity = 500;
let key;
let uWin;
let winSwitch = false;
let obstacles;
let obstaclesSwitch = false;
let heart;
let lives = 3;
let gameOver;
let gameOverSwitch = false;

function preload(){
backgroundImg = loadImage("assets/fondo.jpg");
uWin = loadImage("assets/win.png");
heart = loadImage("assets/corazon.png");
gameOver = loadImage("assets/gameover.png");
}

function setup() {
    new Canvas(windowWidth, windowHeight);
    playerSprite = new Sprite();
    playerSprite.addAni('standing', 'assets/de frente.png');
    playerSprite.addAni('left','assets/caminata izq1.png','assets/caminata izq2.png');
    playerSprite.addAni('right','assets/caminata der1.png','assets/caminata der2.png')
    playerSprite.addAni('jumping', 'assets/saltando.png');
    playerSprite.width = 60;
    playerSprite.debug = false;
    playerSprite.scale = 3;
    playerSprite.x = 900;
    //playerSprite.gravityScale = 0.5;
    playerSprite.mass = 1;
    floor = new Sprite(width/2,windowHeight+10,windowWidth,50,STATIC);
    floor.opacity = 0;
    world.gravity.y = gravity;
    key = new Sprite();
    key.addAni('key','assets/llave.png');
    key.x = 80;
    key.y = 100;
    key.static = true;
    key.scale = 0.3;

    plataformas = new Group();
    plataformas.color = 'red';
   
    while (plataformas.length < 3) {
        let plataforma = new plataformas.Sprite();
        plataforma.x = plataformas.length * 200;
        plataforma.y = plataformas.length * 120+200;
        plataforma.addAni('plataforma','assets/plataforma.png');
        plataforma.scale = 0.5;
        plataforma.debug = false;
        plataforma.width = 100;
        plataforma.static = true;
    }

    obstacles = new Group();
    while (obstacles.length < 3){

        let obstacle = new obstacles.Sprite();
        obstacle.x = obstacles.length * 250;
        obstacle.y = -800 * obstacles.length;
        obstacle.scale = 0.5;
        obstacle.addAni('obstaculo','assets/obstaculo.png');
        obstacle.static = true;
        obstacle.gravityScale = 0.1;
    }

    obstacles[0].x = 470;
    obstacles[1].x = 320;
    obstacles[2].x = 110;
    print(obstacles[0]);
}

function update() {
   image(backgroundImg,0,0,windowWidth,windowHeight);
      playerSprite.rotation = 0;

//Sistema de Vidas
   if(lives == 3){
       image(heart,width-100,50,50,50);
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 2){
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 1){
       image(heart,width-200,50,50,50);
   }

   if(playerSprite.collides(obstacles)){
       lives -= 1;
   }

   if(lives == 0){
       gameOverSwitch = true;
   }

//sistema de Colisiones

    if (playerSprite.collides(floor)||playerSprite.collides(plataformas)) {
        //playerSprite.velocity.y = 0;
        jumpSwitch = true;
    }

    if(playerSprite.collides(plataformas[2])){
        plataformas[2].position.x += random(-5,5);
   
    }
    if(playerSprite.collides(plataformas[1])){
        plataformas[1].position.x += random(-5,5);
       
    }
    if(playerSprite.collides(plataformas[0])){
        plataformas[0].position.x += random(-5,5);
       
    }


    if(playerSprite.collides(plataformas)){
        obstaclesSwitch = true;
    }else{
        obstaclesSwitch = false;
    }

    if(obstaclesSwitch == true){
        obstacles[0].static = false;
        obstacles[1].static = false;
        obstacles[2].static = false;
    }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(floor)){
            obstacles[i].y = -800;
        }
    }


    //key Interaction

    if(playerSprite.collides(key)){
        //print("Encontraste la llave!");
        winSwitch = true;
       
    }
    if(winSwitch){
        image(uWin,0,0,width,height);
        for(var i = 0;i<3;i++){
            plataformas[i].position.x = -500;
            obstacles[i].position.x = -1000;
        }
        key.position.x = -500;
    }
    //playerSprite.speed = 3;

    if (kb.released('d')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('a')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('w')) {
        playerSprite.changeAni('standing');
    }

    if (kb.pressing('w')&&jumpSwitch==true) {
        playerSprite.velocity.y = -50;
        playerSprite.changeAni('jumping');
        jumpSwitch = false;
       
    }  else if (kb.pressing('a')) {
        playerSprite.velocity.x = -10;
        playerSprite.changeAni('left');
    } else if (kb.pressing('d')) {
        playerSprite.velocity.x = 10;
        playerSprite.changeAni('right');
    } else {
      playerSprite.speed = 0;
    }

//Mecánica final del juego
    if(gameOverSwitch){
       image(gameOver,0,0,width,height);
       plataformas[0].x = -1000;
       plataformas[1].x = -1000;
       plataformas[2].x = -1000;
       key.x = -1000;
       obstacles[0].x = -1000;
       obstacles[1].x = -1000;
       obstacles[2].x = -1000;
   }
}