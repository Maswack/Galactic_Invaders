//import NavControler file
import { navHandler } from './handlers/navControler.js'
import { canvasController } from "./handlers/canvasControler.js"


//important setup
const canvasCon = new canvasController(document.getElementById('canvas'))

//Listeners Section
window.addEventListener("load", (event) => {
    const navDiv = document.querySelectorAll("nav div")

    canvasCon.init()

    navDiv.forEach((div) => {
        //Click event
        div.addEventListener("click", (event) => {
            navHandler.click(event)
        })

        //Mouse entering nav Div
        div.addEventListener("mouseenter", (event) => {
            navHandler.mouseEnter(event)
        })

        //Mouse leaving nav Div
        div.addEventListener("mouseleave", (event) => {
            navHandler.mouseLeave(event)
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
