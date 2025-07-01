const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const os = require('os')
const fs = require('fs')
const net = require('net')
const http = require('http')
const WebSocket = require('ws')
const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    autoHideMenuBar: true,
    show: false
  })

  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, 'dist/index.html')}`
  
  mainWindow.loadURL(startUrl)
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('get-system-info', async () => {
  try {
    const cpus = os.cpus()
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    
    return {
      cpu: {
        usage: Math.random() * 100,
        temp: 45,
        cores: cpus.length
      },
      memory: {
        used: Math.round(usedMem / 1024 / 1024 / 1024 * 10) / 10,
        total: Math.round(totalMem / 1024 / 1024 / 1024 * 10) / 10,
        usage: Math.round((usedMem / totalMem) * 100)
      },
      storage: {
        used: 250,
        total: 500,
        usage: 50
      },
      network: {
        download: 0,
        upload: 0
      },
      battery: {
        level: 100,
        status: 'Full'
      },
      processes: []
    }
  } catch (error) {
    console.error('Error getting system info:', error)
    return null
  }
})

let ollamaProcess = null
let remoteServer = null
let wsServer = null

ipcMain.handle('run-ollama-model', async (event, modelName) => {
  const { spawn } = require('child_process')
  try {
    ollamaProcess = spawn('ollama', ['run', modelName], {
      stdio: ['pipe', 'pipe', 'pipe']
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('send-to-ollama', async (event, message) => {
  if (!ollamaProcess) {
    return { success: false, error: 'No Ollama process running' }
  }
  
  try {
    ollamaProcess.stdin.write(message + '\n')
    
    return new Promise((resolve) => {
      let output = ''
      const timeout = setTimeout(() => {
        resolve({ success: true, response: output || 'No response received' })
      }, 10000)
      
      ollamaProcess.stdout.on('data', (data) => {
        output += data.toString()
        if (output.includes('>>>')) {
          clearTimeout(timeout)
          resolve({ success: true, response: output.replace(/>>>/g, '').trim() })
        }
      })
    })
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('start-remote-server', async (event, port) => {
  try {
    const server = http.createServer()
    wsServer = new WebSocket.Server({ server })
    
    wsServer.on('connection', (ws) => {
      ws.on('message', (message) => {
        wsServer.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message)
          }
        })
      })
    })
    
    server.listen(port, () => {
      remoteServer = server
    })
    
    const connectionCode = `${os.hostname()}:${port}`
    return { success: true, code: connectionCode }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('stop-remote-server', async () => {
  if (remoteServer) {
    remoteServer.close()
    remoteServer = null
  }
  if (wsServer) {
    wsServer.close()
    wsServer = null
  }
  return { success: true }
})

ipcMain.handle('connect-to-remote', async (event, host) => {
  try {
    const ws = new WebSocket(`ws://${host}`)
    return new Promise((resolve) => {
      ws.on('open', () => {
        resolve({ success: true })
      })
      ws.on('error', (error) => {
        resolve({ success: false, error: error.message })
      })
    })
  } catch (error) {
    return { success: false, error: error.message }
  }
})