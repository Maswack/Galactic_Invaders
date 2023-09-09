class gameInput {
    //State Data
    static gameInputState = {
        moveUpPressed: false,
        moveLeftPressed: false,
        moveDownPressed: false,
        moveRightPressed: false
    }
    static menuOpened = false;

    //For emitin states and events    
    static listeners = {};

    static on(str, fn) {
        this.listeners[str] = fn;
    }

    static emit(str, data) {
        this.listeners[str](data);
    }


    static setGameInputState(link, value) {
        this.gameInputState[link] = value;
    }
    static setMenuState() {
        this.menuOpened = !this.menuOpened;

        this.emit('menuStateChange', this.menuOpened);
    }
    
    //Functions meant to only perform operations
    static toInt(bool) {
        return (bool ? 1 : 0);
    }

    static Horizontal() {
        return (this.toInt(this.gameInputState.moveRightPressed) - this.toInt(this.gameInputState.moveLeftPressed));
    }
    static Vertical() {
        return (this.toInt(this.gameInputState.moveUpPressed) - this.toInt(this.gameInputState.moveDownPressed));
    }
}

export { gameInput }