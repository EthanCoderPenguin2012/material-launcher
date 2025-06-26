import React from 'react'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

const Calendar: React.FC = () => {
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {format(today, 'MMMM yyyy')}
      </Typography>
      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs key={day}>
            <Typography variant="body2" align="center" sx={{ fontWeight: 'bold', p: 1 }}>
              {day}
            </Typography>
          </Grid>
        ))}
        {days.map(day => (
          <Grid item xs key={day.toString()}>
            <Card 
              sx={{ 
                minHeight: 40,
                backgroundColor: isToday(day) ? 'primary.main' : 'background.paper',
                color: isToday(day) ? 'white' : 'text.primary'
              }}
            >
              <CardContent sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="body2">
                  {format(day, 'd')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Calendar