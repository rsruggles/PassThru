const {app, BrowserWindow, ipcMain} = require('electron')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 768,
        height: 432,
        icon: 'icon.ico',
        frame: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    })



    mainWindow.loadFile('index.html')

    ipcMain.on('msg', (e, data)=>{
        console.warn(data)
    })
    ipcMain.on('close', () => {
        app.quit()
    })
    ipcMain.on('fullScreen', () => {
        mainWindow.setFullScreen(true);
    })
    ipcMain.on('windowScreen', () => {
        mainWindow.setFullScreen(false);
    })
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    })


    mainWindow.setAspectRatio(16/9);

}



app.whenReady().then(createWindow)

