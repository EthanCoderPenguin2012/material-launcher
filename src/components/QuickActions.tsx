import React from 'react'
import { Box, Grid, Card, CardContent, Typography, IconButton, Paper, LinearProgress, Chip } from '@mui/material'
import { Add, CheckCircle, ShoppingCart, WbSunny, Event, Psychology, TrendingUp, Schedule, Notifications } from '@mui/icons-material'

const QuickActions: React.FC = () => {
  const stats = [
    { title: 'Tasks Today', value: '8', change: '+2', color: 'primary' },
    { title: 'Completed', value: '5', change: '+1', color: 'success' },
    { title: 'Shopping Items', value: '12', change: '-3', color: 'warning' },
    { title: 'Notes', value: '24', change: '+4', color: 'info' },
  ]

  const quickActions = [
    { title: 'Add Task', icon: <Add />, color: 'primary.main', description: 'Create a new task' },
    { title: 'Complete Task', icon: <CheckCircle />, color: 'success.main', description: 'Mark tasks as done' },
    { title: 'Shopping List', icon: <ShoppingCart />, color: 'warning.main', description: 'Manage your shopping' },
    { title: 'Check Weather', icon: <WbSunny />, color: 'info.main', description: 'View weather forecast' },
    { title: 'Calendar', icon: <Event />, color: 'secondary.main', description: 'Schedule events' },
    { title: 'AI Assistant', icon: <Psychology />, color: 'error.main', description: 'Get AI help' },
  ]

  const recentActivity = [
    { action: 'Completed "Review project proposal"', time: '2 minutes ago' },
    { action: 'Added "Buy groceries" to shopping list', time: '15 minutes ago' },
    { action: 'Created new note "Meeting notes"', time: '1 hour ago' },
    { action: 'Scheduled "Team meeting" for tomorrow', time: '2 hours ago' },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>Dashboard</Typography>
      
      {/* Stats Overview */}
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
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.random() * 100} 
                  sx={{ mt: 1, height: 4, borderRadius: 2 }}
                  color={stat.color as any}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Quick Actions</Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <IconButton 
                      sx={{ 
                        bgcolor: action.color,
                        color: 'white',
                        mr: 2,
                        '&:hover': { bgcolor: action.color }
                      }}
                      size="large"
                    >
                      {action.icon}
                    </IconButton>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Recent Activity</Typography>
          <Paper sx={{ p: 2 }}>
            {recentActivity.map((activity, index) => (
              <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < recentActivity.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Notifications sx={{ fontSize: 16, color: 'text.secondary', mr: 1, mt: 0.5 }} />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {activity.action}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                  <Schedule sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuickActions