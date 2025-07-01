import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, Button, TextField, Alert, List, ListItem, ListItemText, Switch, FormControlLabel } from '@mui/material'
import { Computer, Share, Link } from '@mui/icons-material'

const RemoteAccess: React.FC = () => {
  const [serverRunning, setServerRunning] = useState(false)
  const [serverPort, setServerPort] = useState('3000')
  const [connectionCode, setConnectionCode] = useState('')
  const [remoteHost, setRemoteHost] = useState('')
  const [connections, setConnections] = useState<string[]>([])

  const startServer = async () => {
    if (window.electronAPI?.startRemoteServer) {
      const result = await window.electronAPI.startRemoteServer(parseInt(serverPort))
      if (result.success) {
        setServerRunning(true)
        setConnectionCode(result.code)
      }
    }
  }

  const stopServer = async () => {
    if (window.electronAPI?.stopRemoteServer) {
      await window.electronAPI.stopRemoteServer()
      setServerRunning(false)
      setConnectionCode('')
    }
  }

  const connectToRemote = async () => {
    if (window.electronAPI?.connectToRemote && remoteHost) {
      const result = await window.electronAPI.connectToRemote(remoteHost)
      if (result.success) {
        alert('Connected successfully!')
      } else {
        alert('Connection failed: ' + result.error)
      }
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Remote Access</Typography>
      
      <Alert severity="warning" sx={{ mb: 3 }}>
        Warning: This feature provides unencrypted remote access. Use only on trusted networks.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Share sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Share This Computer</Typography>
          </Box>
          
          <TextField
            label="Server Port"
            value={serverPort}
            onChange={(e) => setServerPort(e.target.value)}
            sx={{ mb: 2, mr: 2 }}
            size="small"
            disabled={serverRunning}
          />
          
          <Button
            variant={serverRunning ? "outlined" : "contained"}
            onClick={serverRunning ? stopServer : startServer}
            color={serverRunning ? "error" : "primary"}
          >
            {serverRunning ? 'Stop Server' : 'Start Server'}
          </Button>
          
          {serverRunning && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Server running on port {serverPort}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                Connection Code: {connectionCode}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Computer sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6">Connect to Remote Computer</Typography>
          </Box>
          
          <TextField
            fullWidth
            label="Remote Host (IP:Port or Connection Code)"
            value={remoteHost}
            onChange={(e) => setRemoteHost(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="192.168.1.100:3000"
          />
          
          <Button
            variant="contained"
            onClick={connectToRemote}
            disabled={!remoteHost}
          >
            Connect
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Active Connections</Typography>
          <List>
            {connections.length === 0 ? (
              <ListItem>
                <ListItemText primary="No active connections" />
              </ListItem>
            ) : (
              connections.map((conn, index) => (
                <ListItem key={index}>
                  <ListItemText primary={conn} />
                </ListItem>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RemoteAccess