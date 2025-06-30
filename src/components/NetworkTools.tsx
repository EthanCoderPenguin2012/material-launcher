import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button, List, ListItem, ListItemText, Chip, Grid, LinearProgress } from '@mui/material'
import { NetworkCheck, Speed, Wifi, Router, Public, Security } from '@mui/icons-material'

const NetworkTools: React.FC = () => {
  const [pingHost, setPingHost] = useState('google.com')
  const [pingResults, setPingResults] = useState<string[]>([])
  const [speedTest, setSpeedTest] = useState({ download: 0, upload: 0, ping: 0, running: false })
  const [networkInfo] = useState({
    ip: '192.168.1.100',
    gateway: '192.168.1.1',
    dns: ['8.8.8.8', '8.8.4.4'],
    mac: '00:1B:44:11:3A:B7',
    ssid: 'Home-WiFi',
    signal: 85
  })

  const runPing = () => {
    // Simulate ping results
    const results = [
      `PING ${pingHost} (142.250.191.14): 56 data bytes`,
      `64 bytes from 142.250.191.14: icmp_seq=0 ttl=118 time=12.345 ms`,
      `64 bytes from 142.250.191.14: icmp_seq=1 ttl=118 time=11.234 ms`,
      `64 bytes from 142.250.191.14: icmp_seq=2 ttl=118 time=13.456 ms`,
      `--- ${pingHost} ping statistics ---`,
      `3 packets transmitted, 3 received, 0% packet loss`,
      `round-trip min/avg/max/stddev = 11.234/12.345/13.456/0.911 ms`
    ]
    setPingResults(results)
  }

  const runSpeedTest = () => {
    setSpeedTest({ ...speedTest, running: true })
    
    // Simulate speed test
    setTimeout(() => {
      setSpeedTest({
        download: Math.random() * 100 + 50,
        upload: Math.random() * 50 + 20,
        ping: Math.random() * 20 + 10,
        running: false
      })
    }, 3000)
  }

  const networkStats = [
    { label: 'IP Address', value: networkInfo.ip, icon: <Public /> },
    { label: 'Gateway', value: networkInfo.gateway, icon: <Router /> },
    { label: 'WiFi SSID', value: networkInfo.ssid, icon: <Wifi /> },
    { label: 'Signal Strength', value: `${networkInfo.signal}%`, icon: <NetworkCheck /> },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Network Tools</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {networkStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, color: 'primary.main' }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Ping Test</Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Host"
                  value={pingHost}
                  onChange={(e) => setPingHost(e.target.value)}
                  size="small"
                />
                <Button variant="contained" onClick={runPing}>Ping</Button>
              </Box>
              <Box sx={{ 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: 1, 
                fontFamily: 'monospace', 
                fontSize: '12px',
                maxHeight: 200,
                overflow: 'auto'
              }}>
                {pingResults.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Speed Test</Typography>
              <Button 
                variant="contained" 
                onClick={runSpeedTest} 
                disabled={speedTest.running}
                sx={{ mb: 2 }}
                fullWidth
              >
                {speedTest.running ? 'Testing...' : 'Run Speed Test'}
              </Button>
              
              {speedTest.running && <LinearProgress sx={{ mb: 2 }} />}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Download:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {speedTest.download.toFixed(1)} Mbps
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Upload:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {speedTest.upload.toFixed(1)} Mbps
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Ping:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {speedTest.ping.toFixed(1)} ms
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>DNS Servers</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {networkInfo.dns.map((dns, index) => (
                  <Chip key={index} label={dns} variant="outlined" />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                MAC Address: {networkInfo.mac}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default NetworkTools