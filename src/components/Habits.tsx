import React, { useState } from 'react'
import { Box, Card, CardContent, Typography, Button, Checkbox, LinearProgress, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip } from '@mui/material'
import { Add, TrendingUp, LocalFireDepartment, CheckCircle } from '@mui/icons-material'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Habit {
  id: string
  name: string
  description: string
  streak: number
  completedToday: boolean
  completedDates: string[]
  category: string
  target: number
  color: string
}

const Habits: React.FC = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', [])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newHabit, setNewHabit] = useState({ name: '', description: '', category: 'health', target: 1 })

  const categories = [
    { name: 'health', color: '#4CAF50', icon: '💪' },
    { name: 'learning', color: '#2196F3', icon: '📚' },
    { name: 'productivity', color: '#FF9800', icon: '⚡' },
    { name: 'mindfulness', color: '#9C27B0', icon: '🧘' },
    { name: 'social', color: '#F44336', icon: '👥' },
  ]

  const toggleHabit = (habitId: string) => {
    const today = new Date().toDateString()
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completedToday
        const newCompletedDates = wasCompleted 
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today]
        
        return {
          ...habit,
          completedToday: !wasCompleted,
          completedDates: newCompletedDates,
          streak: !wasCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        }
      }
      return habit
    }))
  }

  const addHabit = () => {
    const category = categories.find(c => c.name === newHabit.category)!
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      streak: 0,
      completedToday: false,
      completedDates: [],
      category: newHabit.category,
      target: newHabit.target,
      color: category.color
    }
    setHabits([...habits, habit])
    setNewHabit({ name: '', description: '', category: 'health', target: 1 })
    setShowAddDialog(false)
  }

  const totalCompleted = habits.filter(h => h.completedToday).length
  const completionRate = habits.length > 0 ? (totalCompleted / habits.length) * 100 : 0
  const longestStreak = Math.max(...habits.map(h => h.streak), 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Habit Tracker</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setShowAddDialog(true)}>
          Add Habit
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalCompleted}</Typography>
              <Typography variant="body2" color="text.secondary">Completed Today</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalFireDepartment sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{longestStreak}</Typography>
              <Typography variant="body2" color="text.secondary">Longest Streak</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{Math.round(completionRate)}%</Typography>
              <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Habits List */}
      <Grid container spacing={2}>
        {habits.map((habit) => {
          const category = categories.find(c => c.name === habit.category)!
          return (
            <Grid item xs={12} sm={6} md={4} key={habit.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Checkbox
                      checked={habit.completedToday}
                      onChange={() => toggleHabit(habit.id)}
                      sx={{ p: 0, mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {habit.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {habit.description}
                      </Typography>
                      <Chip 
                        label={`${category.icon} ${category.name}`}
                        size="small"
                        sx={{ bgcolor: category.color, color: 'white', mb: 2 }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocalFireDepartment sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                    <Typography variant="body2">
                      {habit.streak} day streak
                    </Typography>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={habit.completedToday ? 100 : 0}
                    sx={{ height: 6, borderRadius: 3 }}
                    color={habit.completedToday ? 'success' : 'inherit'}
                  />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Add Habit Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Habit</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Habit Name"
            value={newHabit.name}
            onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newHabit.description}
            onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Category</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category.name}
                  label={`${category.icon} ${category.name}`}
                  onClick={() => setNewHabit({...newHabit, category: category.name})}
                  color={newHabit.category === category.name ? 'primary' : 'default'}
                  variant={newHabit.category === category.name ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={addHabit} variant="contained" disabled={!newHabit.name}>
            Add Habit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Habits