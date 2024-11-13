const canvasWidth = 800;
const canvasHeight = 600;

import { LoadPlayer } from "../player/player.js";

let mainAudioTheme

const InitCanvas = () => {
  document.getElementById("menu").remove()
  document.getElementById("bottom_panel").classList.remove("hidden")

  const canvas = document.querySelector("canvas");
  canvas.id="map"

  const c = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  mainAudioTheme = new Audio("../audio/deathcore.mp3")
  mainAudioTheme.play()

//  const mapImg = new Image();
//  mapImg.src = "./map/map.png";
//  console.log(mapImg)
//  c.drawImage(mapImg, 0, 0);

  LoadPlayer(canvas);
}

export { InitCanvas, mainAudioTheme };
