class gameRenderer {
    static settings = {
        height: 1080,
        width: 1920,

        canvas: null,
    }
    
    static init() {
        //Get needed data
        const canvas = document.querySelector('.game');

        //Set that data
        this.settings.canvas = canvas
    }
}

export { gameRenderer }