import React, { useState } from 'react'
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemButton, Checkbox, IconButton, Typography, Chip } from '@mui/material'
import { Add, Delete, CheckCircle } from '@mui/icons-material'
import { Task } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [newTask, setNewTask] = useState('')

  const completedCount = tasks.filter(task => task.completed).length

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        createdAt: new Date()
      }
      setTasks([...tasks, task])
      setNewTask('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Daily Tasks</Typography>
        <Chip 
          icon={<CheckCircle />} 
          label={`${completedCount}/${tasks.length}`} 
          color={completedCount === tasks.length && tasks.length > 0 ? 'success' : 'default'}
          size="small"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button variant="contained" onClick={addTask} startIcon={<Add />}>
          Add
        </Button>
      </Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemButton onClick={() => toggleTask(task.id)}>
              <Checkbox checked={task.completed} />
              <ListItemText 
                primary={task.text}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
            </ListItemButton>
            <IconButton onClick={() => deleteTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default TaskManager