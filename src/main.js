const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

//const data = fs.readFileSync('./data/gameData.json')

const createWindow = () => {
    //If some operations will be useful regarding
    //devices screen
    const { screen } = require('electron')


    const menuWindow = new BrowserWindow({
        width: 840,
        height: 680,
        maximizable: false,
        resizable: false,
        icon: path.join(__dirname, 'assets/gfx/icon.ico'),

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
            
        }
    })   

    menuWindow.loadFile("src/windows/main/index.html")
}

ipcMain.on("start-game", (event) => {
    const gameWindow = new BrowserWindow({
        show: false,
        fullscreen: false,
        resizable: false,
        width: 960,
        height: 680,
        icon: path.join(__dirname, 'assets/gfx/icon.ico'),

        webPreferences: {
            preload: path.join(__dirname, 'windows/game/preload.js'),
            nodeIntegration: true
        }
    })

    gameWindow.loadFile("src/windows/game/index.html")


    gameWindow.once('ready-to-show', () => {
        gameWindow.show()

        const oldWindow = BrowserWindow.fromId(1)
        oldWindow.close()
    })
})

ipcMain.on('update-settings', (event, value, id, type) => {
    console.log('update_settings')
    console.log(value + "_" +  id + "_" + type)
})


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('browser-window-created', (event, window) => {
    //turns off debug menu
    //window.setMenu(null)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


