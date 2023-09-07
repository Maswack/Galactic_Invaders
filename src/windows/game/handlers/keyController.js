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
        //Something wrong with key Setup
        //After some time it executes absurd amount of times
        console.log(keySetup)

        //Set Decoder before using it
        this.setDecoder(keySetup)

        
        function setControlsState(eventKey, keyD, value) {  
            const link = keyD[eventKey] + "Pressed"       
            
            gameInput.setGameInputState(link, value)

            console.log(gameInput.Horizontal())
        }

        document.addEventListener('keydown', event => {
            setControlsState(event.key, this.keyDecoder, true)
        })

        document.addEventListener('keyup', event => {
            setControlsState(event.key, this.keyDecoder, false)
        })
    }
}

export { keyController }