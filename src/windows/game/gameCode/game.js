import { gameMenu } from "./gameMenu.js";

import { gameInput } from "./gameInput.js";
import { gameRenderer } from "./gameRenderer.js";
import { gameSystemsSettings } from "./gameSystemSettings.js";

window.addEventListener('load', (event) => {
    //Initialize and set everything thats needed

    gameInput.on('menuStateChange', (state) => {
        gameMenu.setMenuState(state)
    })

    init();
})

function init() {
    gameRenderer.init();

    runtime();
}

function runtime() {

    setTimeout(runtime, gameSystemsSettings.fTimeout);
}