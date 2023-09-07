import { keyController } from "./handlers/keyController.js"
import { navHandler } from "../main/handlers/navControler.js"

window.addEventListener("load", (event) => {
    //Get settings and other data
    //Also set everything up
    window.electronAPI.sendSettings( (event, data) => {
        //console.log(data)

        //For key Handling
        //Is Sent whenever any settings panel is open
        document.addEventListener('keydown', keyController.setupControls(data.settings.controls))
    })

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