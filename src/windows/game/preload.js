const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {

    //Settings Section
    sendSettings: (data) => { ipcRenderer.on('send-settings', data) },
    loadSettings: () => { ipcRenderer.send('load-settings') },
    updateSettings: (value, id, type) => { ipcRenderer.send('update-settings', value, id, type) },
})