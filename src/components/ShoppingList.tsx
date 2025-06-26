import React, { useState } from 'react'
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemButton, Checkbox, IconButton, Typography } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { ShoppingItem } from '../types'

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim()) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem,
        completed: false
      }
      setItems([...items, item])
      setNewItem('')
    }
  }

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Shopping List</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add shopping item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <Button variant="contained" onClick={addItem} startIcon={<Add />}>
          Add
        </Button>
      </Box>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => toggleItem(item.id)}>
              <Checkbox checked={item.completed} />
              <ListItemText 
                primary={item.name}
                sx={{ textDecoration: item.completed ? 'line-through' : 'none' }}
              />
            </ListItemButton>
            <IconButton onClick={() => deleteItem(item.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ShoppingList