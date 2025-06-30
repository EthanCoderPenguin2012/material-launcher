import React, { useState } from 'react'
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemButton, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment } from '@mui/material'
import { Add, Edit, Delete, Search } from '@mui/icons-material'
import ReactMarkdown from 'react-markdown'
import { Note } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Notes: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', [])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '# New Note\n\nStart writing your markdown content here...',
      updatedAt: new Date()
    }
    setNotes([...notes, newNote])
    setSelectedNote(newNote)
    openEditor(newNote)
  }

  const openEditor = (note: Note) => {
    setEditTitle(note.title)
    setEditContent(note.content)
    setIsEditing(true)
  }

  const saveNote = () => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        title: editTitle,
        content: editContent,
        updatedAt: new Date()
      }
      setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note))
      setSelectedNote(updatedNote)
    }
    setIsEditing(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
    }
  }

  return (
    <Box sx={{ display: 'flex', height: 500, gap: 2 }}>
      <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', pr: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Notes</Typography>
          <Button variant="contained" size="small" onClick={createNote} startIcon={<Add />}>
            New
          </Button>
        </Box>
        <TextField
          fullWidth
          size="small"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <List>
          {filteredNotes.map((note) => (
            <ListItem key={note.id} disablePadding>
              <ListItemButton 
                selected={selectedNote?.id === note.id}
                onClick={() => setSelectedNote(note)}
              >
                <ListItemText 
                  primary={note.title}
                  secondary={note.updatedAt.toLocaleDateString()}
                />
              </ListItemButton>
              <IconButton onClick={() => openEditor(note)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteNote(note.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Box sx={{ flex: 1, pl: 2 }}>
        {selectedNote ? (
          <Box>
            <Typography variant="h6" gutterBottom>{selectedNote.title}</Typography>
            <Box sx={{ 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1, 
              p: 2, 
              height: 400, 
              overflow: 'auto',
              '& h1': { fontSize: '2rem', fontWeight: 700, mb: 2 },
              '& h2': { fontSize: '1.5rem', fontWeight: 600, mb: 1.5 },
              '& h3': { fontSize: '1.25rem', fontWeight: 600, mb: 1 },
              '& p': { mb: 1, lineHeight: 1.6 },
              '& ul, & ol': { pl: 2, mb: 1 },
              '& li': { mb: 0.5 },
              '& code': { 
                bgcolor: 'grey.100', 
                p: 0.5, 
                borderRadius: 1, 
                fontFamily: 'monospace' 
              },
              '& pre': { 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: 1, 
                overflow: 'auto',
                '& code': { bgcolor: 'transparent', p: 0 }
              },
              '& blockquote': {
                borderLeft: 4,
                borderColor: 'primary.main',
                pl: 2,
                ml: 0,
                fontStyle: 'italic'
              }
            }}>
              <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Select a note to view or create a new one
          </Typography>
        )}
      </Box>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={15}
            label="Content (Markdown)"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={saveNote} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Notes