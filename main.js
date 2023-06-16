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
            devTools: true
        }
    })

    mainWindow.loadFile('render/index.html')

    ipcMain.on('close', () => {
      mainWindow.close();
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

    ipcMain.on('toggleRatio', (evt, data) => {
      let ratio = 0;
      if (data == 'unlocked') {
        ratio = 0;
      } else if (data == '169') {
        ratio = (16/9);
      } else if (data == '1610') {
        ratio = (16/10);
      }
      mainWindow.setAspectRatio(ratio);
    })

    // Remove This When Complete
    ipcMain.on('gpustatus', () => {
      console.dir(app.getGPUFeatureStatus());
    })

    // Lock the Aspect Ratio
    mainWindow.setAspectRatio(16/9);

}

// Toggle, set or don't
//app.disableHardwareAcceleration();

// App Is Starting
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// App Is Stopping
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
