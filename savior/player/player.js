import { EnemyDeal } from "../enemy/enemy.js";
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};
let enterBattle = false;


const LoadPlayer = (canvas) => {
  const c = canvas.getContext("2d");
  const playerImage = new Image();

  const speed = 2;

  const playerWidth = 287;
  const playerHeight = 137;

  const initFrameX = playerWidth / 4;
  const initFrameY = playerHeight / 2;

  let frameX = initFrameX;
  let frameY = initFrameY;


  const enemy = new Image();

  enemy.src = "./enemy/minimonster.png";
  let enemyPosition = {
    x: -650,
    y: -140
  };

  const fire1 = new Image();
  fire1.src = "./assets/fire_1.png";


  class Sprite{
    constructor({ position, speed, img}){
      this.position = position;
      this.img = img;
    }
    draw(){
      console.log(this.position)
      c.drawImage(this.img,this.position.x,this.position.y)

    }
  }

  playerImage.src = "./player/player.png";

  const mapImg = new Image();
  mapImg.src = "./map/map.png"

  let currentFrame = 2
  let currentFrameLine = 1

  const map = new Sprite(
    {
      position: {
        x: -170,
        y: -140
      },
      speed,
      img: mapImg
    }
  )
  let requestAnimation;
  c.drawImage(fire1,-450,-180)
  console.log(fire1)
  const animate = () => {
    requestAnimation = window.requestAnimationFrame(animate)
    c.drawImage(
      fire1,
      0,
      0,
      30,
      40,
      -450,
      -180,
      30,
      40
    )
    map.draw();

    c.drawImage(
      playerImage,
      currentFrame*frameX,
      currentFrameLine*frameY,
      frameX,
      frameY,
      canvas.width / 2,
      canvas.height / 2 - playerImage.height /2,
      playerWidth / 4,
      playerHeight /2
    )

//    c.clearRect(800,600)
    if (keys.w){
      map.position.y += 20;
      currentFrame = 1;
      currentFrameLine = 0;

    }
    if (keys.s){
      map.position.y -= 20
      currentFrame = 2 ;
      currentFrameLine = 0;
    }
    if (keys.a){
      map.position.x += 20
      currentFrame = 1 ;
      currentFrameLine = 1;
    }
    if (keys.d){
      map.position.x -= 20
      currentFrame = 2 ;
      currentFrameLine = 1;
    }
  if (map.position.x >= -780 && map.position.x <= -630 && map.position.y <= -80 && map.position.y >= -140){
   // enterBattle = true;
    cancelAnimationFrame(requestAnimation);
    EnemyDeal()
    return
  }

  };
  animate();

  PlayerMovement();
}

const PlayerMovement = () => {
  window.addEventListener("keydown",(e) => {
    console.log(keys)
    switch (e.key) {
      case "w":
        keys.w = true;
        break;
      case "a":
        keys.a = true;
        break;
      case "s":
        keys.s = true;
        break;
      case "d":
        keys.d = true;
        break;
    }


  })
  window.addEventListener("keyup",(e) => {
    switch (e.key) {
      case "w":
        keys.w = false;
        break;
      case "a":
        keys.a = false;
        break;
      case "s":
        keys.s = false;
        break;
      case "d":
        keys.d = false;
        break;
    }

})
}


export { LoadPlayer };
