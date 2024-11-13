const BattlePlayer = (canvas, isHit) => {
  const c = canvas.getContext("2d");
  const playerImage = new Image();
  
  playerImage.src = isHit ? "../images/humanFightmal2.png" : "../images/humanfightsmal.png";

  const playerPosition =  { x: 30, y: 45 };
  
  playerImage.onload = () => {
    c.drawImage(playerImage, playerPosition.x, playerPosition.y, 350, 350);
  };
};

export { BattlePlayer };
