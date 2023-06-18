const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const fs = require('fs')

var appSettings = loadJSON(path.join(__dirname, "render/settings.json"))

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

  ipcMain.handle('app-close', (evt, data) => {
    saveJSON(path.join(__dirname, "render/settings.json"), data)
    //console.log('Data Type: ' + typeof(data))
    mainWindow.close();
  })

  ipcMain.handle('app-aspect-ratio', (evt, ratio) => {
    mainWindow.setAspectRatio(parseRatio(ratio));
  })

  // Remove This When Complete
  ipcMain.handle('gpustatus', () => {
    console.dir(app.getGPUFeatureStatus());
  })

  // Load Settings
  ipcMain.handle('reqSettings', () => {
    mainWindow.webContents.send('resSettings', appSettings)
  })

  // Request MessageBox
  ipcMain.handle('restart-warning', (evt, data) => {
    console.log('call dialog')
    dialog.showMessageBox(null, {
      type: 'none',
      buttons: ['Not Right Now', 'Restart PassThru'],
      defaultId: 0,
      title: 'PassThru',
      message: 'Hardware Acceleration',
      detail: 'Changes made to hardware acceleration will not be applied until PassThru has Restarted. Restart PassThru now?'
    })
    .then(result => {
      // User Wants to Restart
      if (result.response === 1) {
        saveJSON(path.join(__dirname, "render/settings.json"), data)
        app.relaunch()
        mainWindow.close();
      }
    })
  })

  // Lock the Aspect Ratio
  mainWindow.setAspectRatio(parseRatio(appSettings.videoRatio) || 0);
}

// Check Settings for hwAccelleration
if (!appSettings.hwAccelleration) {
  app.disableHardwareAcceleration()
}

// App Is Starting
app.whenReady().then(() => {
  createWindow()
});

// App Wake From Stasis (Mac OS)
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

function parseRatio(ratio) {
  if (ratio == "unlocked") {
    return  0
  } else if (ratio == "16/10") {
    return  16/10
  } else if (ratio == "16/9") {
    return  16/9
  } else if (ratio == "43/18") {
    return  43/18
  }
}

//////////////////////
//   FILE STORAGE   //
//////////////////////

// Load JSON
function loadJSON(filename = '') {
  return JSON.parse(
    fs.existsSync(filename)
      ? fs.readFileSync(filename).toString()
      : '""'
  )
}

// Save JSON
function saveJSON(filename = '', json = '""') {
  return fs.writeFileSync(
    filename,
    JSON.stringify(
      json,
      null,
      2
    )
  )
}