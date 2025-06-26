import React, { useState } from 'react'
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemButton, Checkbox, IconButton, Typography } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { Task } from '../types'

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

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
      <Typography variant="h6" gutterBottom>Daily Tasks</Typography>
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