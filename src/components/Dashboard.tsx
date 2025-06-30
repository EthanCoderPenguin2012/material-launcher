import React, { useState, useEffect } from 'react'
import { Box, Grid, Card, CardContent, Typography, IconButton, Chip, LinearProgress, Avatar, List, ListItem, Divider } from '@mui/material'
import { TrendingUp, Schedule, Notifications, Memory, Storage, Speed } from '@mui/icons-material'

const Dashboard: React.FC = () => {
  const systemInfo = {
    memory: 67,
    storage: 45,
    cpu: 23
  }

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { title: 'Tasks Today', value: '12', change: '+3', color: 'primary', progress: 75 },
    { title: 'Completed', value: '8', change: '+2', color: 'success', progress: 67 },
    { title: 'Focus Time', value: '4.2h', change: '+0.5h', color: 'info', progress: 84 },
    { title: 'Productivity', value: '92%', change: '+5%', color: 'warning', progress: 92 },
  ]

  const quickStats = [
    { icon: <Memory />, label: 'Memory', value: `${systemInfo.memory}%`, color: systemInfo.memory > 80 ? 'error' : 'info' },
    { icon: <Storage />, label: 'Storage', value: `${systemInfo.storage}%`, color: 'primary' },
    { icon: <Speed />, label: 'CPU', value: `${systemInfo.cpu}%`, color: 'secondary' },
  ]

  const recentActivity = [
    { action: 'Completed "Review project proposal"', time: '2 min ago', type: 'task' },
    { action: 'Added meeting to calendar', time: '15 min ago', type: 'calendar' },
    { action: 'Updated shopping list', time: '1 hour ago', type: 'shopping' },
    { action: 'Created new note', time: '2 hours ago', type: 'note' },
    { action: 'Weather alert received', time: '3 hours ago', type: 'weather' },
  ]

  return (
    <Box>
      {/* Header with Time */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
          {new Date().getDate()}
        </Avatar>
      </Box>

      {/* Main Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: `${stat.color}.main` }}>
                    {stat.value}
                  </Typography>
                  <Chip 
                    label={stat.change} 
                    size="small" 
                    color={stat.change.startsWith('+') ? 'success' : 'error'}
                    icon={<TrendingUp />}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stat.progress} 
                  sx={{ height: 6, borderRadius: 3 }}
                  color={stat.color as any}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* System Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>System Status</Typography>
              {quickStats.map((stat, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton size="small" sx={{ mr: 2, color: `${stat.color}.main` }}>
                    {stat.icon}
                  </IconButton>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">{stat.label}</Typography>
                    <Typography variant="h6" color={`${stat.color}.main`}>{stat.value}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Recent Activity</Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                        <Notifications sx={{ fontSize: 16, color: 'text.secondary', mr: 2, mt: 0.5 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2">{activity.action}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Schedule sx={{ fontSize: 12, color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                            <Chip 
                              label={activity.type} 
                              size="small" 
                              variant="outlined" 
                              sx={{ ml: 1, height: 20 }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard