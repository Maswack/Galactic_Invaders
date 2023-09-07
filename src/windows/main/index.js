//import NavControler file
import { navHandler } from './handlers/navControler.js'
import { canvasController } from "./handlers/canvasControler.js"


//important setup
const canvasCon = new canvasController(document.getElementById('canvas'))

//Listeners Section
window.addEventListener("load", (event) => {
    const navDiv = document.querySelectorAll("nav div")
    const insertId = "settingsFrame"

    canvasCon.init()

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

//Prevents possibility of selecting text
document.onselectstart = (event) => {
    event.preventDefault()
}


document.onkeydown = (event) => {

    if (event.key == "w") {
        console.log(event.key)
    }
}
