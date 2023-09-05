const { contextBridge, ipcRenderer } = require('electron')

//So that the app knows the game has begun
//And also other stuff that can't controlled
//through webpage
contextBridge.exposeInMainWorld('electronAPI', {
    startGame: () => { ipcRenderer.send('start-game') },
    
    //Settings section
    sendSettings: (data) => { ipcRenderer.on('send-settings', data) },
    loadSettings: () => { ipcRenderer.send('load-settings') },
    updateSettings: (value, id, type) => { ipcRenderer.send('update-settings', value, id, type) },
})




window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)

        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.version[dependency])
    }
})

