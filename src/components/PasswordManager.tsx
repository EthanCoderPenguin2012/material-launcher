import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button, IconButton, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Chip, InputAdornment } from '@mui/material'
import { Add, Visibility, VisibilityOff, Edit, Delete, ContentCopy, AutoFixHigh } from '@mui/icons-material'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Password {
  id: string
  title: string
  username: string
  password: string
  website: string
  category: string
  strength: 'weak' | 'medium' | 'strong'
}

const PasswordManager: React.FC = () => {
  const [passwords, setPasswords] = useLocalStorage<Password[]>('passwords', [])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})
  const [newPassword, setNewPassword] = useState({
    title: '', username: '', password: '', website: '', category: 'general'
  })

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewPassword({...newPassword, password: result})
  }

  const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 8) return 'weak'
    if (password.length < 12 && !/[!@#$%^&*]/.test(password)) return 'medium'
    return 'strong'
  }

  const addPassword = () => {
    const password: Password = {
      id: Date.now().toString(),
      ...newPassword,
      strength: getPasswordStrength(newPassword.password)
    }
    setPasswords([...passwords, password])
    setNewPassword({ title: '', username: '', password: '', website: '', category: 'general' })
    setShowAddDialog(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Password Manager</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setShowAddDialog(true)}>
          Add Password
        </Button>
      </Box>

      <List>
        {passwords.map((pwd) => (
          <Card key={pwd.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6">{pwd.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{pwd.website}</Typography>
                </Box>
                <Chip 
                  label={pwd.strength} 
                  color={pwd.strength === 'strong' ? 'success' : pwd.strength === 'medium' ? 'warning' : 'error'}
                  size="small"
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 80 }}>Username:</Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>{pwd.username}</Typography>
                <IconButton size="small" onClick={() => copyToClipboard(pwd.username)}>
                  <ContentCopy />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ minWidth: 80 }}>Password:</Typography>
                <Typography variant="body2" sx={{ flex: 1, fontFamily: 'monospace' }}>
                  {showPasswords[pwd.id] ? pwd.password : '••••••••••••'}
                </Typography>
                <IconButton size="small" onClick={() => togglePasswordVisibility(pwd.id)}>
                  {showPasswords[pwd.id] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton size="small" onClick={() => copyToClipboard(pwd.password)}>
                  <ContentCopy />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton size="small"><Edit /></IconButton>
                <IconButton size="small"><Delete /></IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </List>

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newPassword.title}
            onChange={(e) => setNewPassword({...newPassword, title: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Website"
            value={newPassword.website}
            onChange={(e) => setNewPassword({...newPassword, website: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Username"
            value={newPassword.username}
            onChange={(e) => setNewPassword({...newPassword, username: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPasswords['new'] ? 'text' : 'password'}
            value={newPassword.password}
            onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility('new')}>
                    {showPasswords['new'] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <IconButton onClick={generatePassword}>
                    <AutoFixHigh />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={addPassword} variant="contained">Add Password</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PasswordManager