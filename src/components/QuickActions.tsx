import React from 'react'
import { Box, Card, CardContent, Typography, Grid, IconButton } from '@mui/material'
import { Task, Note, Event, Settings, Backup, Analytics } from '@mui/icons-material'

const QuickActions: React.FC = () => {
  const actions = [
    { icon: <Task />, label: 'Quick Task', color: '#6750A4' },
    { icon: <Note />, label: 'New Note', color: '#625B71' },
    { icon: <Event />, label: 'Add Event', color: '#7C4DFF' },
    { icon: <Analytics />, label: 'Analytics', color: '#00BCD4' },
    { icon: <Backup />, label: 'Backup', color: '#4CAF50' },
    { icon: <Settings />, label: 'Settings', color: '#FF9800' },
  ]

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Quick Actions</Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card sx={{ 
              cursor: 'pointer', 
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}>
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <IconButton sx={{ color: action.color, mb: 1 }}>
                  {action.icon}
                </IconButton>
                <Typography variant="caption" display="block">
                  {action.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default QuickActions