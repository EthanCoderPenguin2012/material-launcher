import React, { useState } from 'react'
import { Box, Container, Paper, Typography, Tabs, Tab, IconButton } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import TaskManager from './components/TaskManager'
import ShoppingList from './components/ShoppingList'
import Weather from './components/Weather'
import Calendar from './components/Calendar'
import AIAssistant from './components/AIAssistant'
import Notes from './components/Notes'
import QuickActions from './components/QuickActions'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [themeMode, setThemeMode] = useLocalStorage<'light' | 'dark'>('theme-mode', 'light')

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
    window.location.reload() // Simple theme switch - in production use context
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <QuickActions />
      case 1: return <TaskManager />
      case 2: return <ShoppingList />
      case 3: return <Weather />
      case 4: return <Calendar />
      case 5: return <AIAssistant />
      case 6: return <Notes />
      default: return <QuickActions />
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Material Launcher
        </Typography>
        <IconButton onClick={toggleTheme} color="primary">
          {themeMode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>
      
      <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Dashboard" />
          <Tab label="Tasks" />
          <Tab label="Shopping" />
          <Tab label="Weather" />
          <Tab label="Calendar" />
          <Tab label="AI Assistant" />
          <Tab label="Notes" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {renderTabContent()}
        </Box>
      </Paper>
    </Container>
  )
}

export default App