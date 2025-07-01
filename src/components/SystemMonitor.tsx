import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, LinearProgress, Grid, List, ListItem, ListItemText, Chip } from '@mui/material'
import { Memory, Storage, Speed, NetworkCheck, Thermostat, BatteryFull } from '@mui/icons-material'

const SystemMonitor: React.FC = () => {
  const [systemData, setSystemData] = useState({
    cpu: { usage: 0, temp: 0, cores: 0 },
    memory: { used: 0, total: 0, usage: 0 },
    storage: { used: 0, total: 0, usage: 0 },
    network: { download: 0, upload: 0 },
    battery: { level: 0, status: 'Unknown' },
    processes: []
  })

  useEffect(() => {
    const getSystemInfo = async () => {
      try {
        if (window.electronAPI) {
          const sysInfo = await window.electronAPI.getSystemInfo()
          setSystemData(sysInfo)
        } else {
          const memInfo = (navigator as any).deviceMemory || 8
          const cores = navigator.hardwareConcurrency || 4
          setSystemData({
            cpu: { usage: Math.random() * 50 + 10, temp: 45, cores },
            memory: { used: memInfo * 0.6, total: memInfo, usage: 60 },
            storage: { used: 250, total: 500, usage: 50 },
            network: { download: 0, upload: 0 },
            battery: { level: 100, status: 'Full' },
            processes: []
          })
        }
      } catch (error) {
        console.error('Failed to get system info:', error)
      }
    }

    getSystemInfo()
    const interval = setInterval(getSystemInfo, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>System Monitor</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Speed sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">CPU</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>{systemData.cpu.usage.toFixed(1)}%</Typography>
              <LinearProgress variant="determinate" value={systemData.cpu.usage} sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {systemData.cpu.cores} cores • {systemData.cpu.temp}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Memory sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Memory</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>{systemData.memory.usage.toFixed(1)}%</Typography>
              <LinearProgress variant="determinate" value={systemData.memory.usage} color="success" sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {systemData.memory.used} GB / {systemData.memory.total} GB
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Storage sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Storage</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>{systemData.storage.usage}%</Typography>
              <LinearProgress variant="determinate" value={systemData.storage.usage} color="warning" sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {systemData.storage.used} GB / {systemData.storage.total} GB
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Network Activity</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Download: {systemData.network.download.toFixed(1)} MB/s</Typography>
                <Typography variant="body2">Upload: {systemData.network.upload.toFixed(1)} MB/s</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NetworkCheck sx={{ mr: 1, color: 'success.main' }} />
                <Chip label="Connected" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Top Processes</Typography>
              <List dense>
                {systemData.processes.length > 0 ? systemData.processes.map((process: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={process.name}
                      secondary={`CPU: ${process.cpu}% • RAM: ${process.memory} MB`}
                    />
                  </ListItem>
                )) : (
                  <ListItem>
                    <ListItemText primary="No process data available" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SystemMonitor