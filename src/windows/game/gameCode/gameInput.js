class gameInput {
    //State Data
    static gameInputState = {
        moveUpPressed: false,
        moveLeftPressed: false,
        moveDownPressed: false,
        moveRightPressed: false
    }

    static setGameInputState(link, value) {
        this.gameInputState[link] = value
    }
    
    //Functions meant to only perform operations
    static toInt(bool) {
        return (bool ? 1 : 0)
    }

    static Horizontal() {
        return (this.toInt(this.gameInputState.moveRightPressed) - this.toInt(this.gameInputState.moveLeftPressed))
    }
    static Vertical() {
        return (this.toInt(this.gameInputState.moveUpPressed) - this.toInt(this.gameInputState.moveDownPressed))
    }
}

export { gameInput }