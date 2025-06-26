import React, { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Tabs, Tab } from '@mui/material'
import TaskManager from './components/TaskManager'
import ShoppingList from './components/ShoppingList'
import Weather from './components/Weather'
import Calendar from './components/Calendar'
import AIAssistant from './components/AIAssistant'
import Notes from './components/Notes'

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <TaskManager />
      case 1: return <ShoppingList />
      case 2: return <Weather />
      case 3: return <Calendar />
      case 4: return <AIAssistant />
      case 5: return <Notes />
      default: return <TaskManager />
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Material Launcher
      </Typography>
      
      <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
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