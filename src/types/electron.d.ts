declare global {
  interface Window {
    electronAPI?: {
      getSystemInfo: () => Promise<any>
      runOllamaModel: (modelName: string) => Promise<{success: boolean, error?: string}>
      sendToOllama: (message: string) => Promise<{success: boolean, response?: string, error?: string}>
      startRemoteServer: (port: number) => Promise<{success: boolean, code?: string, error?: string}>
      stopRemoteServer: () => Promise<{success: boolean}>
      connectToRemote: (host: string) => Promise<{success: boolean, error?: string}>
    }
  }
}

export {}