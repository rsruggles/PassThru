const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    appMinimize: () => ipcRenderer.invoke('app-minimize'),
    appFullScreen: (data) => ipcRenderer.invoke('app-fullscreen', data),
    appClose: () => ipcRenderer.invoke('app-close'),
    appAspectRatio: (data) => ipcRenderer.invoke('app-aspect-ratio', data),
    appGpuStatus: () => ipcRenderer.invoke('gpustatus')
})