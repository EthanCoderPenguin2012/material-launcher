import React, { useState } from 'react'
import { Box, Card, CardContent, Typography, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Chip, Avatar } from '@mui/material'
import { Add, Launch, Delete, Bookmark } from '@mui/icons-material'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface BookmarkItem {
  id: string
  title: string
  url: string
  description: string
  category: string
  favicon?: string
}

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkItem[]>('bookmarks', [])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newBookmark, setNewBookmark] = useState({ title: '', url: '', description: '', category: 'general' })
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['general', 'work', 'social', 'news', 'entertainment', 'tools', 'learning']

  const addBookmark = () => {
    const bookmark: BookmarkItem = {
      id: Date.now().toString(),
      ...newBookmark,
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(newBookmark.url).hostname}`
    }
    setBookmarks([...bookmarks, bookmark])
    setNewBookmark({ title: '', url: '', description: '', category: 'general' })
    setShowAddDialog(false)
  }

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  const openBookmark = (url: string) => {
    window.open(url, '_blank')
  }

  const filteredBookmarks = selectedCategory === 'all' 
    ? bookmarks 
    : bookmarks.filter(b => b.category === selectedCategory)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Bookmarks</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setShowAddDialog(true)}>
          Add Bookmark
        </Button>
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <Chip
          label="All"
          onClick={() => setSelectedCategory('all')}
          color={selectedCategory === 'all' ? 'primary' : 'default'}
          sx={{ mr: 1, mb: 1 }}
        />
        {categories.map(category => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1, textTransform: 'capitalize' }}
          />
        ))}
      </Box>

      {/* Bookmarks Grid */}
      <Grid container spacing={2}>
        {filteredBookmarks.map((bookmark) => (
          <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => openBookmark(bookmark.url)}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar
                    src={bookmark.favicon}
                    sx={{ width: 24, height: 24, mr: 2, mt: 0.5 }}
                  >
                    <Bookmark />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {bookmark.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {bookmark.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {bookmark.url}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); openBookmark(bookmark.url) }}>
                      <Launch />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); deleteBookmark(bookmark.id) }}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <Chip 
                  label={bookmark.category} 
                  size="small" 
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Bookmark Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Bookmark</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newBookmark.title}
            onChange={(e) => setNewBookmark({...newBookmark, title: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="URL"
            value={newBookmark.url}
            onChange={(e) => setNewBookmark({...newBookmark, url: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newBookmark.description}
            onChange={(e) => setNewBookmark({...newBookmark, description: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={newBookmark.category}
            onChange={(e) => setNewBookmark({...newBookmark, category: e.target.value})}
            SelectProps={{ native: true }}
          >
            {categories.map(category => (
              <option key={category} value={category} style={{ textTransform: 'capitalize' }}>
                {category}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={addBookmark} variant="contained" disabled={!newBookmark.title || !newBookmark.url}>
            Add Bookmark
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Bookmarks