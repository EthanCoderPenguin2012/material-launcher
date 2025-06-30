import React, { useState } from 'react'
import { Box, Typography, TextField, List, ListItem, ListItemIcon, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Card, CardContent } from '@mui/material'
import { Search, Launch, Add, Apps, Computer, Web, Settings as SettingsIcon } from '@mui/icons-material'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface App {
  id: string
  name: string
  path: string
  icon: string
  category: string
}

const QuickLauncher: React.FC = () => {
  const [apps, setApps] = useLocalStorage<App[]>('quick-apps', [
    { id: '1', name: 'Calculator', path: 'calc.exe', icon: '🧮', category: 'system' },
    { id: '2', name: 'Notepad', path: 'notepad.exe', icon: '📝', category: 'system' },
    { id: '3', name: 'Chrome', path: 'chrome.exe', icon: '🌐', category: 'web' },
    { id: '4', name: 'VS Code', path: 'code.exe', icon: '💻', category: 'dev' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newApp, setNewApp] = useState({ name: '', path: '', icon: '📱', category: 'other' })

  const categories = ['all', 'system', 'web', 'dev', 'games', 'media', 'other']
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const launchApp = (path: string) => {
    // In a real app, this would launch the application
    console.log(`Launching: ${path}`)
  }

  const addApp = () => {
    const app: App = {
      id: Date.now().toString(),
      ...newApp
    }
    setApps([...apps, app])
    setNewApp({ name: '', path: '', icon: '📱', category: 'other' })
    setShowAddDialog(false)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Quick Launcher</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
        />
        <Button variant="contained" startIcon={<Add />} onClick={() => setShowAddDialog(true)}>
          Add App
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(category)}
            sx={{ mr: 1, mb: 1, textTransform: 'capitalize' }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        {filteredApps.map((app) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
            <Card sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.02)' } }} onClick={() => launchApp(app.path)}>
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>{app.icon}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{app.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {app.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Application</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Application Name"
            value={newApp.name}
            onChange={(e) => setNewApp({...newApp, name: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Path/Command"
            value={newApp.path}
            onChange={(e) => setNewApp({...newApp, path: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Icon (Emoji)"
            value={newApp.icon}
            onChange={(e) => setNewApp({...newApp, icon: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={newApp.category}
            onChange={(e) => setNewApp({...newApp, category: e.target.value})}
            SelectProps={{ native: true }}
          >
            {categories.slice(1).map(category => (
              <option key={category} value={category} style={{ textTransform: 'capitalize' }}>
                {category}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={addApp} variant="contained">Add App</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default QuickLauncher