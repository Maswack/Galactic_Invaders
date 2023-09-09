

class gameSystemsSettings {
    static fps = 60;
    static fTimeout = Math.round(1000/this.fps);
    
    //Event System for gameSystemSetting
    static listeners = {}

    static emit(str, data) {
        this.listeners[str](data);
    }
    static on(str, fn) {
        this.listeners[str] = fn;
    }
}

export { gameSystemsSettings }
