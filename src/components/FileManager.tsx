import React, { useState } from 'react'
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Breadcrumbs, Link, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Folder, InsertDriveFile, ArrowBack, Search, CreateNewFolder, Upload, Download, Delete, Edit } from '@mui/icons-material'

const FileManager: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('C:\\')
  const [files, setFiles] = useState([
    { name: 'Documents', type: 'folder', size: '', modified: '2024-01-15' },
    { name: 'Downloads', type: 'folder', size: '', modified: '2024-01-14' },
    { name: 'Pictures', type: 'folder', size: '', modified: '2024-01-13' },
    { name: 'example.txt', type: 'file', size: '1.2 KB', modified: '2024-01-12' },
    { name: 'data.json', type: 'file', size: '856 B', modified: '2024-01-11' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const createFolder = () => {
    if (newFolderName.trim()) {
      setFiles([...files, { name: newFolderName, type: 'folder', size: '', modified: new Date().toISOString().split('T')[0] }])
      setNewFolderName('')
      setShowNewFolder(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>File Manager</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <IconButton><ArrowBack /></IconButton>
        <Breadcrumbs>
          <Link href="#" onClick={() => setCurrentPath('C:\\')}>C:</Link>
          <Typography color="text.primary">Current Folder</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
          size="small"
          sx={{ flex: 1 }}
        />
        <IconButton onClick={() => setShowNewFolder(true)}><CreateNewFolder /></IconButton>
        <IconButton><Upload /></IconButton>
      </Box>

      <List>
        {filteredFiles.map((file, index) => (
          <ListItem key={index} secondaryAction={
            <Box>
              <IconButton size="small"><Download /></IconButton>
              <IconButton size="small"><Edit /></IconButton>
              <IconButton size="small"><Delete /></IconButton>
            </Box>
          }>
            <ListItemIcon>
              {file.type === 'folder' ? <Folder color="primary" /> : <InsertDriveFile />}
            </ListItemIcon>
            <ListItemText 
              primary={file.name}
              secondary={`${file.size} • Modified: ${file.modified}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={showNewFolder} onClose={() => setShowNewFolder(false)}>
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewFolder(false)}>Cancel</Button>
          <Button onClick={createFolder} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FileManager