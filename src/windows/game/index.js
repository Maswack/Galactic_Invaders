import { keyController } from "./keyController.js"

window.addEventListener("load", (event) => {
    //Get settings and other data
    //Also set everything up
    window.electronAPI.sendSettings( (event, data) => {
        console.log(data)

        //For key Handling
        document.addEventListener('keydown', keyController.setupControls(data.settings.controls))
    })
})