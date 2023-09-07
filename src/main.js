const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')


//const data = fs.readFileSync('./data/gameData.json')
const game_data_link = path.join(__dirname, 'data/gameData.json')

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
    const gameData = JSON.parse(fs.readFileSync(game_data_link))
    const videoData = gameData.game.settings.video
    
    //Consist of resolution for screen
    const videoRes = videoData.resolution.split("x")


    const gameWindow = new BrowserWindow({
        show: false,
        fullscreen: videoData.fullscreen,
        resizable: true,
        width: parseInt(videoRes[0]),
        height: parseInt(videoRes[1]),
        icon: path.join(__dirname, 'assets/gfx/icon.ico'),

        webPreferences: {
            preload: path.join(__dirname, 'windows/game/preload.js'),
            nodeIntegration: true
        }
    })

    gameWindow.loadFile("src/windows/game/game.html")


    gameWindow.once('ready-to-show', () => {
        gameWindow.show()

        const oldWindow = BrowserWindow.fromId(1)
        oldWindow.close()

        //Send Settings
        gameWindow.webContents.send('send-settings', gameData.game)
    })
})

ipcMain.on('update-settings', (event, value, id, type) => {
    //Check values
    //console.log(value + "_" +  id + "_" + type)

    //Read json file with game data
    const game_data = JSON.parse(fs.readFileSync(game_data_link))

    //update value
    game_data.game.settings[type][id] = value

    //write to file
    fs.writeFileSync(game_data_link, JSON.stringify(game_data))
    
})
ipcMain.on('load-settings', () => {
    //Read json file with game data
    const game_data = JSON.parse(fs.readFileSync(game_data_link))
    const window = BrowserWindow.getFocusedWindow()

    window.webContents.send('send-settings', game_data.game)
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


