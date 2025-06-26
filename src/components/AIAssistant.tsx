import React, { useState } from 'react'
import { Box, TextField, Button, Paper, Typography, List, ListItem } from '@mui/material'
import { Send, SmartToy } from '@mui/icons-material'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        isUser: true,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, userMessage])
      
      // Mock AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `I understand you said: "${input}". This is a mock AI response. In production, integrate with your preferred AI service.`,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
      
      setInput('')
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SmartToy /> AI Assistant
      </Typography>
      
      <Paper sx={{ height: 400, overflow: 'auto', mb: 2, p: 1 }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ 
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              px: 0
            }}>
              <Paper 
                sx={{ 
                  p: 2, 
                  maxWidth: '70%',
                  backgroundColor: message.isUser ? 'primary.main' : 'grey.100',
                  color: message.isUser ? 'white' : 'text.primary'
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage} startIcon={<Send />}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default AIAssistant