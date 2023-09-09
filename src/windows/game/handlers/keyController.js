import { gameInput } from '../gameCode/gameInput.js'

class keyController {
    //Decoder for gameInputState
    static keys = ["moveUp", "moveLeft", "moveDown", "moveRight"]
    static keyDecoder = {}

    static setDecoder(keyS) {
        this.keyDecoder = {}

        this.keys.forEach( (k) => {
            this.keyDecoder[keyS[k]] = k 
        })
    }

    static setupControls(keySetup) {

        //Set Decoder before using it
        this.setDecoder(keySetup)
        
        console.log(keySetup)
        
        function setControlsState(eventKey, keyD, value) {  
            const link = keyD[eventKey] + "Pressed"       
            
            gameInput.setGameInputState(link, value)
        }

        function openMenu(eventKey) {
            if (eventKey == keySetup.menuButton) {
                gameInput.setMenuState();
            }
        }
        

        document.onkeydown = (event) => {
            setControlsState(event.key, this.keyDecoder, true)
            openMenu(event.key);
        }

        document.onkeyup = (event) => {
            setControlsState(event.key, this.keyDecoder, false)
        }
    }
}

export { keyController }