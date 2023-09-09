class gameMenu {
    static setMenuState(state) {
        const converter = {
            true: "visible",
            false: "hidden"
        } 

        const menu = document.getElementById('gameSettings');
        menu.style.visibility = converter[state];
    }
}

export { gameMenu }