import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button, TextField, Alert, Divider } from '@mui/material'
import { Palette, Storage, Notifications, Psychology, SmartToy } from '@mui/icons-material'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface SettingsProps {
  themeMode: 'light' | 'dark'
  themeColor: string
  onThemeModeChange: (mode: 'light' | 'dark') => void
  onThemeColorChange: (color: string) => void
}

const Settings: React.FC<SettingsProps> = ({ themeMode, themeColor, onThemeModeChange, onThemeColorChange }) => {
  const [apiKey, setApiKey] = useLocalStorage('openai-api-key', '')
  const [ollamaEnabled, setOllamaEnabled] = useLocalStorage('ollama-enabled', false)
  const [ollamaModel, setOllamaModel] = useLocalStorage('ollama-model', 'llama2')
  const [showApiKey, setShowApiKey] = useState(false)
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'available' | 'unavailable'>('checking')

  React.useEffect(() => {
    checkOllamaStatus()
  }, [])

  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags')
      setOllamaStatus(response.ok ? 'available' : 'unavailable')
    } catch {
      setOllamaStatus('unavailable')
    }
  }

  const installOllama = () => {
    window.open('https://ollama.ai/download', '_blank')
  }
  const themeColors = [
    { name: 'Purple', value: 'purple', color: '#6750A4' },
    { name: 'Blue', value: 'blue', color: '#1976D2' },
    { name: 'Green', value: 'green', color: '#388E3C' },
    { name: 'Orange', value: 'orange', color: '#F57C00' },
    { name: 'Red', value: 'red', color: '#D32F2F' },
    { name: 'Teal', value: 'teal', color: '#00796B' },
  ]

  const clearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>Settings</Typography>
      
      {/* AI Configuration */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Psychology sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">AI Configuration</Typography>
          </Box>
          
          <TextField
            fullWidth
            label="OpenAI API Key"
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Enter your OpenAI API key to use AI features"
          />
          
          <Button
            variant="text"
            size="small"
            onClick={() => setShowApiKey(!showApiKey)}
            sx={{ mb: 3 }}
          >
            {showApiKey ? 'Hide' : 'Show'} API Key
          </Button>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmartToy sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6">Ollama (Local AI)</Typography>
          </Box>
          
          {ollamaStatus === 'unavailable' && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Ollama is not installed or running. 
              <Button size="small" onClick={installOllama} sx={{ ml: 1 }}>
                Install Ollama
              </Button>
            </Alert>
          )}
          
          {ollamaStatus === 'available' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Ollama is running and available
            </Alert>
          )}
          
          <FormControlLabel
            control={
              <Switch
                checked={ollamaEnabled && ollamaStatus === 'available'}
                onChange={(e) => setOllamaEnabled(e.target.checked)}
                disabled={ollamaStatus !== 'available'}
              />
            }
            label="Use Ollama for AI features"
            sx={{ mb: 2 }}
          />
          
          {ollamaEnabled && ollamaStatus === 'available' && (
            <Box>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Ollama Model</InputLabel>
                <Select
                  value={ollamaModel}
                  label="Ollama Model"
                  onChange={(e) => setOllamaModel(e.target.value)}
                >
                  <MenuItem value="llama2">Llama 2</MenuItem>
                  <MenuItem value="codellama">Code Llama</MenuItem>
                  <MenuItem value="mistral">Mistral</MenuItem>
                  <MenuItem value="neural-chat">Neural Chat</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                onClick={async () => {
                  if (window.electronAPI) {
                    const result = await window.electronAPI.runOllamaModel(ollamaModel)
                    if (result.success) {
                      alert(`Started ${ollamaModel} in background terminal`)
                    } else {
                      alert(`Failed to start model: ${result.error}`)
                    }
                  }
                }}
              >
                Start Model in Background
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Palette sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Appearance</Typography>
          </Box>
          
          <FormControlLabel
            control={
              <Switch
                checked={themeMode === 'dark'}
                onChange={(e) => onThemeModeChange(e.target.checked ? 'dark' : 'light')}
              />
            }
            label="Dark Mode"
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth>
            <InputLabel>Theme Color</InputLabel>
            <Select
              value={themeColor}
              label="Theme Color"
              onChange={(e) => onThemeColorChange(e.target.value)}
            >
              {themeColors.map((color) => (
                <MenuItem key={color.value} value={color.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: color.color,
                        mr: 2
                      }}
                    />
                    {color.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Notifications sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Notifications</Typography>
          </Box>
          
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Task Reminders"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Calendar Events"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Switch />}
            label="Shopping List Updates"
          />
        </CardContent>
      </Card>

      {/* Data & Storage */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Storage sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Data & Storage</Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            All data is stored locally on your device
          </Typography>
          
          <Button
            variant="outlined"
            color="error"
            onClick={clearData}
            sx={{ mr: 2 }}
          >
            Clear All Data
          </Button>
          
          <Button variant="outlined">
            Export Data
          </Button>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>About Material Launcher</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Version 1.0.0
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A modern productivity suite built with Material Design 3
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Settings