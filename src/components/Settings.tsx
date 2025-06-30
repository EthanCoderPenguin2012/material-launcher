import React from 'react'
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button } from '@mui/material'
import { Palette, Storage, Notifications } from '@mui/icons-material'

interface SettingsProps {
  themeMode: 'light' | 'dark'
  themeColor: string
  onThemeModeChange: (mode: 'light' | 'dark') => void
  onThemeColorChange: (color: string) => void
}

const Settings: React.FC<SettingsProps> = ({ themeMode, themeColor, onThemeModeChange, onThemeColorChange }) => {
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