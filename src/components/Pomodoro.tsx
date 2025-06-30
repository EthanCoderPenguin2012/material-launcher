import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, Button, IconButton, LinearProgress, Chip, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Grid } from '@mui/material'
import { PlayArrow, Pause, Stop, History, Timer } from '@mui/icons-material'

const Pomodoro: React.FC = () => {
  const [time, setTime] = useState(25 * 60) // 25 minutes
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work')
  const [sessions, setSessions] = useState(0)
  const [showHistory, setShowHistory] = useState(false)

  const modes = {
    work: { duration: 25 * 60, label: 'Focus Time', color: 'error' },
    break: { duration: 5 * 60, label: 'Short Break', color: 'success' },
    longBreak: { duration: 15 * 60, label: 'Long Break', color: 'info' }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (time === 0) {
      // Timer finished
      setIsActive(false)
      if (mode === 'work') {
        setSessions(s => s + 1)
        setMode(sessions % 4 === 3 ? 'longBreak' : 'break')
      } else {
        setMode('work')
      }
      setTime(modes[mode === 'work' ? (sessions % 4 === 3 ? 'longBreak' : 'break') : 'work'].duration)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, mode, sessions])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((modes[mode].duration - time) / modes[mode].duration) * 100

  const resetTimer = () => {
    setIsActive(false)
    setTime(modes[mode].duration)
  }

  const switchMode = (newMode: 'work' | 'break' | 'longBreak') => {
    setMode(newMode)
    setTime(modes[newMode].duration)
    setIsActive(false)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>Pomodoro Timer</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <CardContent>
              <Chip 
                label={modes[mode].label} 
                color={modes[mode].color as any}
                sx={{ mb: 3, fontSize: '1rem', px: 2, py: 1 }}
              />
              
              <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, fontFamily: 'monospace' }}>
                {formatTime(time)}
              </Typography>
              
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ mb: 4, height: 8, borderRadius: 4 }}
                color={modes[mode].color as any}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setIsActive(!isActive)}
                  startIcon={isActive ? <Pause /> : <PlayArrow />}
                  color={modes[mode].color as any}
                >
                  {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={resetTimer}
                  startIcon={<Stop />}
                >
                  Reset
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button 
                  variant={mode === 'work' ? 'contained' : 'outlined'}
                  onClick={() => switchMode('work')}
                  size="small"
                >
                  Focus
                </Button>
                <Button 
                  variant={mode === 'break' ? 'contained' : 'outlined'}
                  onClick={() => switchMode('break')}
                  size="small"
                >
                  Break
                </Button>
                <Button 
                  variant={mode === 'longBreak' ? 'contained' : 'outlined'}
                  onClick={() => switchMode('longBreak')}
                  size="small"
                >
                  Long Break
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Today's Progress</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timer sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {sessions}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  sessions completed
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(sessions / 8) * 100} 
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                Goal: 8 sessions per day
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Statistics</Typography>
                <IconButton onClick={() => setShowHistory(true)}>
                  <History />
                </IconButton>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">This Week</Typography>
                <Typography variant="h6">32 sessions</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Focus Time</Typography>
                <Typography variant="h6">13.3 hours</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Streak</Typography>
                <Typography variant="h6">5 days</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={showHistory} onClose={() => setShowHistory(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Session History</DialogTitle>
        <DialogContent>
          <List>
            {Array.from({ length: 5 }, (_, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Focus Session ${i + 1}`}
                  secondary={`${25} minutes - ${new Date(Date.now() - i * 30 * 60 * 1000).toLocaleTimeString()}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Pomodoro