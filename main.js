const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 768,
    height: 432,
    icon: 'icon.ico',
    frame: false,
    webPreferences:{
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: true
    }
  })

  mainWindow.loadFile('render/index.html')

  ipcMain.handle('app-minimize', () => {
    mainWindow.minimize();
  })

  ipcMain.handle('app-fullscreen', (evt, fullScreen) => {
    if (fullScreen) {
      mainWindow.setFullScreen(true)
    } else {
      mainWindow.setFullScreen(false)
    }
  })

  ipcMain.handle('app-close', () => {
    mainWindow.close();
  })

  ipcMain.handle('app-aspect-ratio', (evt, ratio) => {
    if (ratio == "unlocked") {
      ratio = 0
    } else if (ratio == "16/10") {
      ratio = 16/10
    } else if (ratio == "16/9") {
      ratio = 16/9
    } else if (ratio == "43/18") {
      ratio = 43/18
    }
    mainWindow.setAspectRatio(ratio);
  })

  // Remove This When Complete
  ipcMain.handle('gpustatus', () => {
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
});

// App Is Stasis (Mac OS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// App Is Stopping
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
