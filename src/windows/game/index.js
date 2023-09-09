import { navHandler } from "../main/handlers/navControler.js"

import { keyController } from "./handlers/keyController.js"
import { gameInput } from "./gameCode/gameInput.js"

window.addEventListener("load", (event) => {
    //Setup Controls for player Input
    window.electronAPI.sendSettings( (event, data) => {
        document.addEventListener('keydown', keyController.setupControls(data.settings.controls))
    })

    //Load settings
    window.electronAPI.loadSettings();
    

    //Every element in navigation
    const navDiv = document.querySelectorAll("nav div")
    const insertId = "gameSettings"

    
    navDiv.forEach((div) => {
        //Click event
        div.addEventListener("click", (event) => {
            navHandler.click(event, insertId)
        })

        //Mouse entering nav Div
        div.addEventListener("mouseenter", (event) => {
            navHandler.mouseEnter(event, insertId)
        })

        //Mouse leaving nav Div
        div.addEventListener("mouseleave", (event) => {
            navHandler.mouseLeave(event, insertId)
        })
    })
})