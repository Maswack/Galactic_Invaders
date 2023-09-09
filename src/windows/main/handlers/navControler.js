import { panelHandler } from "./panelHandler.js"

class navHandler {
    
    //Control of the whole menu
    static click(e, insertId) {
        const settingsFrame = document.getElementById(insertId)

        function play() {
            window.electronAPI.startGame()
        }
        function video() {
            panelHandler.loadHtmlFile(settingsFrame, "video_link")
        }
        function audio() {
            panelHandler.loadHtmlFile(settingsFrame, "audio_link")
        }
        function controls() {
            panelHandler.loadHtmlFile(settingsFrame, "controls_link")
        }
        function quit() {
            window.close()
        }

        const navAction = {
            "navd0":  play,
            "navd1":  video,
            "navd2":  audio,
            "navd3":  controls,
            "navd4":  quit
        }


        let navDiv = e.target

        //Check if click event actually
        //selected the nav Div
        if (navDiv.tagName != "DIV") {
            navDiv = navDiv.parentElement
        }

        const tag = navDiv.className
        navAction[tag]()
    }

    //On enter change astetic of button
    static mouseEnter(e) {
        const eventDiv = e.target
            
        eventDiv.style.cursor = "pointer"
        eventDiv.style.border = "1px solid rgba(255, 0, 0, 0.5)"
        eventDiv.style.backgroundColor = "rgb(36, 36, 36)"
    }

    //On leave return to normal state
    static mouseLeave(e) {
        const eventDiv = e.target
            
        eventDiv.style.border = "0px"
        eventDiv.style.backgroundColor = "rgb(32, 32, 32)"
    }

}


export { navHandler }