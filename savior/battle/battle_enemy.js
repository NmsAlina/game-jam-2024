const BattleEnemy = (canvas) => {
  const c = canvas.getContext("2d");

  const enemyImage = new Image();
  enemyImage.src = "../images/monster1.png";

  enemyImage.onload = () => {
    const enemyPosition = { x: 380, y: 150 };
    const imageWidth = 150;
    const imageHeight = 150;

    // Draw the shadow
    c.beginPath();
    const shadowGradient = c.createRadialGradient(
      enemyPosition.x + imageWidth / 2, // X coordinate of the shadow center
      enemyPosition.y + imageHeight + 35,    // Y coordinate of the shadow center (below the image)
      0,                                // Inner radius of the shadow
      enemyPosition.x + imageWidth / 2, // X coordinate of the shadow center
      enemyPosition.y + imageHeight +35,    // Y coordinate of the shadow center (below the image)
      imageWidth / 2                    // Outer radius of the shadow (equal to half the width of the image)
    );
    shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.4)"); // Inner color of the shadow
    shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");   // Outer color of the shadow
    c.fillStyle = shadowGradient;
    c.ellipse(
      enemyPosition.x + imageWidth / 2, // X coordinate of the center of the ellipse
      enemyPosition.y + imageHeight +35,    // Y coordinate of the center of the ellipse
      imageWidth / 2,                   // Radius of the ellipse in the horizontal direction
      imageWidth / 6,                   // Radius of the ellipse in the vertical direction
      0,                                // Rotation of the ellipse (always 0 for a circle)
      0,                                // Start angle (always 0 for a full ellipse)
      Math.PI * 2                      // End angle (always a full circle)
    );
    c.fill();
    c.closePath();

    // Draw the enemy image
    c.drawImage(enemyImage, enemyPosition.x, enemyPosition.y, imageWidth, imageHeight);
  };
};

export { BattleEnemy };
