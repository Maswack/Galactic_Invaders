import { gameInput } from "./gameInput.js";
import { gameMenu } from "./gameMenu.js";


window.addEventListener('load', (event) => {
    //Initialize and set everything thats needed

    gameInput.on('menuStateChange', (state) => {
        gameMenu.setMenuState(state)
    })
})