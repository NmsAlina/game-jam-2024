import { InitBattleScreen } from "../battle/battle_screen.js";
import { mainAudioTheme } from "../canvas/canvas.js"

const EnemyDeal = () => {
  ShowOptions()
}

const dialog = document.getElementById("dialog") 
const battle = document.getElementById("battle") 

const ShowOptions=()=>{
  dialog.classList.remove("hidden")
  dialog.addEventListener("click",()=>{
    if (document.getElementById("dialogBox") != null){
      document.getElementById("dialogBox").remove()
      return
    }

    const dialogBox = document.createElement("div");
    dialogBox.id = "dialogBox";
    const game = document.getElementById("game")
    game.prepend(dialogBox)
  })

  mainAudioTheme.volume = 0.2

  battle.classList.remove("hidden")

  battle.addEventListener("click",()=>{

  let audio = new Audio('../audio/switch.m4a');
  audio.play();
  setTimeout(()=>{

  document.getElementById("bottom_panel").remove()
   const dialog=document.getElementById("dialogBox")
   if (dialog != null){
     dialog.remove()
   }

   const canvas = document.querySelector("canvas");
   const c = canvas.getContext("2d");
   canvas.width = 800;
   canvas.height = 600;


   InitBattleScreen(canvas)


  }, 1000)

 
  })
}


export { EnemyDeal };
