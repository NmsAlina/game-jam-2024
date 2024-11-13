import { BattlePlayer } from "../battle/battle_player.js";
import { BattleEnemy } from "./battle_enemy.js";
let summoned = false

const battleScreenWidth = 800;
const battleScreenHeight = 600;
const buttonHeight = 150;

let enemyHP = 100; // Initial enemy HP
let enemyMaxHP = 100; // Maximum enemy HP
let heroHP = 100; // Initial hero HP
let heroMaxHP = 100; // Maximum hero HP

let isMonsterVisible = false; // State to track monster visibility

const InitBattleScreen = (canvas) => {
  const ctx = canvas.getContext("2d");

  // Resize canvas to the battle screen dimensions
  canvas.width = battleScreenWidth;
  canvas.height = battleScreenHeight;

  // Draw the battle screen components
  drawBattleScreen(ctx, canvas);

  // Add event listener for attack button
  canvas.addEventListener("click", (event) => handleCanvasClick(event, ctx, canvas));
};

const drawBattleScreen = (ctx, canvas) => {
  checkHP();
  drawBackground(ctx);
  drawPanel(ctx);

  BattlePlayer(canvas);
  BattleEnemy(canvas);

  if (isMonsterVisible) {
    drawMonster(ctx);
  }
};

const checkHP = () => {
  if (enemyHP <= 0) {
    document.getElementById("map").remove()
    const winBlock = document.createElement("div")
    winBlock.id = "win"
    document.getElementById("game").appendChild(winBlock)

    const creditBlock = document.createElement("div")
    creditBlock.id = "credits"
    document.getElementById("game").appendChild(creditBlock)
    return;
  }
  if (heroHP <= 0){

    document.getElementById("map").remove()
    const overBlock = document.createElement("div")
    overBlock.id = "gameover"
    document.getElementById("game").appendChild(overBlock)


    const creditBlock = document.createElement("div")
    creditBlock.id = "credits"
    document.getElementById("game").appendChild(creditBlock)
    return
  }
};

const drawBackground = (ctx) => {
  const backgroundImage = new Image();
  backgroundImage.src = "../images/battle_arena.png";

  backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, 0, -100);
    drawEnemyInfoBox(ctx);
  };
};

const drawEnemyInfoBox = (ctx) => {
  const infoBoxWidth = 250;
  const infoBoxHeight = 150;
  const infoBoxX = battleScreenWidth - infoBoxWidth - 10; // Positioned in the top right corner with a 10px margin
  const infoBoxY = 10;

  // Load the enemy image
  const enemyImage = new Image();
  enemyImage.src = "../images/topHpBox.png"; // Replace with the actual path to your enemy image

  enemyImage.onload = () => {
    // Draw the enemy image as the background
    ctx.drawImage(enemyImage, infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight);

    // Draw the enemy info box overlay
    ctx.fillStyle = "rgba(128, 128, 128, 0)"; // Grey with 50% opacity to allow the background to show through
    ctx.fillRect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight);

    // Draw the HP bar background
    const hpBarWidth = 80;
    const hpBarHeight = 10;
    const hpBarX = infoBoxX + 95; // Centered horizontally within info box
    const hpBarY = infoBoxY + 70;

    // Draw the current HP bar
    const currentHpBarWidth = (enemyHP / enemyMaxHP) * hpBarWidth; // Scale current HP to the width of the bar
    ctx.fillStyle = "green";
    ctx.fillRect(hpBarX, hpBarY, currentHpBarWidth, hpBarHeight);
  };
};

const drawPanel = (ctx) => {
  const battleImage = new Image();
  battleImage.src = "../images/battle_panel/stati [Recovered].png"; // Change this to the correct path of your image

  battleImage.onload = () => {
    // Draw the panel image as the background
    ctx.drawImage(battleImage, 0, battleScreenHeight - 180, battleScreenWidth, 150);

    // Draw the rest of the panel elements after the image has loaded
    drawPanelElements(ctx);
  };
};

const drawPanelElements = (ctx) => {
  ctx.fillStyle = "transparent";
  ctx.fillRect(10, battleScreenHeight - 190, 190, 180); // HP box

  const currentHpBarWidth = (heroHP / heroMaxHP) * 70; // Scale current HP to the width of the bar
  ctx.fillStyle = "green";
  ctx.fillRect(80, battleScreenHeight - 90, currentHpBarWidth, 10); // HP bar (scaled value)

  // Draw action buttons
  const actions = [
    { name: "Ball" },
    { name: "Attack" },
    { name: "Defend" },
  ];
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  actions.forEach((action, index) => {
    const buttonX = 200 + (index * 200);
    const buttonY = battleScreenHeight - 170;
    const buttonWidth = 190;

    // Draw button background
    ctx.fillStyle = "transparent";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  });
};

const handleCanvasClick = (event, ctx, canvas) => {
  // Calculate the position of the click
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Check if the click is within the "Attack" button area
  const attackButtonX = 400;
  const attackButtonY = battleScreenHeight - 170;
  const attackButtonWidth = 190;
  const attackButtonHeight = buttonHeight;

  if (
    x >= attackButtonX &&
    x <= attackButtonX + attackButtonWidth &&
    y >= attackButtonY &&
    y <= attackButtonY + attackButtonHeight
  ) {
    // Handle attack
    handleAttack(ctx, canvas);
  }

  // Check if the click is within the "Ball" button area
  const ballButtonX = 200;
  const ballButtonY = battleScreenHeight - 170;
  const ballButtonWidth = 190;
  const ballButtonHeight = buttonHeight;

  if (
    x >= ballButtonX &&
    x <= ballButtonX + ballButtonWidth &&
    y >= ballButtonY &&
    y <= ballButtonY + ballButtonHeight
  ) {
    // Toggle monster visibility
    isMonsterVisible = !isMonsterVisible;

    // Redraw the battle screen to update the monster visibility
    drawBattleScreen(ctx, canvas);
  }
};

const handleAttack = (ctx, canvas) => {

  if (summoned){
    const summonAudio = new Audio("../audio/summon.mp3")
    summonAudio.play()
    summoned = true
  }
  const damage = Math.floor(Math.random() * 4) + 1;
  // Update enemy HP
  enemyHP = Math.max(0, enemyHP - damage * 10);

  // After hero attack, initiate enemy attack
  setTimeout(() => {
    ctx.clearRect(0, 0, 800, 600);

    // Call BattlePlayer with the "isHit" parameter set to true to switch to the hit image
    drawBackground(ctx);
    BattlePlayer(canvas, true);

    drawPanel(ctx);
    BattleEnemy(canvas);
    drawEnemyInfoBox(ctx);

    handleEnemyAttack(ctx, canvas);
  }, 500);
};

const handleEnemyAttack = (ctx, canvas) => {
  // Calculate random damage (0 to 1)
  const damage = Math.floor(Math.random() * 2) + 1;

  // Update hero HP
  heroHP = Math.max(0, heroHP - damage * 10);

  // Update the hero's HP bar
  updateHeroHPBar(ctx);

  // Remove the damage message after a short duration
  setTimeout(() => {
    ctx.clearRect(0, 0, battleScreenWidth, battleScreenHeight);
    drawBattleScreen(ctx, canvas);
  }, 1000);
};

const updateHeroHPBar = (ctx) => {
  // Clear the previous hero HP bar
  ctx.clearRect(30, battleScreenHeight - 115, 100, 40);

  // Draw the updated hero HP bar
  const currentHpBarWidth = (heroHP / heroMaxHP) * 70; // Scale current HP to the width of the bar
  ctx.fillStyle = "green";
  ctx.fillRect(30, battleScreenHeight - 115, currentHpBarWidth, 40); // HP bar (scaled value)
};

const drawMonster = (ctx) => {
  const monsterImage = new Image();
  monsterImage.src = "../images/monsterfriend.png"; // Replace with the actual path to your monster image

  monsterImage.onload = () => {
    const monsterX = 100;
    const monsterY = 240;
    const monsterWidth = 200;
    const monsterHeight = 200;
    ctx.drawImage(monsterImage, monsterX, monsterY, monsterWidth, monsterHeight);
    if (!summoned){
      const summonAudio = new Audio("../audio/summon.mp3")
      summonAudio.play()
      summoned = true
    }

  };
};

export { InitBattleScreen };
