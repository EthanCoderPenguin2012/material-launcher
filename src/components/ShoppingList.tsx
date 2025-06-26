import React, { useState } from 'react'
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemButton, Checkbox, IconButton, Typography, Chip } from '@mui/material'
import { Add, Delete, ShoppingCart } from '@mui/icons-material'
import { ShoppingItem } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ShoppingList: React.FC = () => {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping-items', [])
  const [newItem, setNewItem] = useState('')

  const remainingCount = items.filter(item => !item.completed).length

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Shopping List</Typography>
        <Chip 
          icon={<ShoppingCart />} 
          label={`${remainingCount} items`} 
          color="primary"
          size="small"
        />
      </Box>
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