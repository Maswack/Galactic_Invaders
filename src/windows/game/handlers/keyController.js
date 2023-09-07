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
      
        
        function setControlsState(eventKey, keyD, value) {  
            const link = keyD[eventKey] + "Pressed"       
            
            gameInput.setGameInputState(link, value)

            console.log(gameInput.Horizontal())
        }
        

        document.onkeydown = (event) => {
            setControlsState(event.key, this.keyDecoder, true)
        }

        document.onkeyup = (event) => {
            setControlsState(event.key, this.keyDecoder, false)
        }
    }
}

export { keyController }