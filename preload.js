const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  runOllamaModel: (modelName) => ipcRenderer.invoke('run-ollama-model', modelName),
  sendToOllama: (message) => ipcRenderer.invoke('send-to-ollama', message),
  startRemoteServer: (port) => ipcRenderer.invoke('start-remote-server', port),
  stopRemoteServer: () => ipcRenderer.invoke('stop-remote-server'),
  connectToRemote: (host) => ipcRenderer.invoke('connect-to-remote', host)
})