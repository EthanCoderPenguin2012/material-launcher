import React, { useState, useRef, useEffect } from 'react'
import { Box, Card, CardContent, Typography, TextField, Button, List, ListItem, Avatar, Chip, CircularProgress, Alert } from '@mui/material'
import { Psychology, Send, Person } from '@mui/icons-material'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m your AI assistant powered by OpenAI. I can help you with tasks, answer questions, provide suggestions, and more. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai-api-key') || '')
  const [ollamaEnabled, setOllamaEnabled] = useState(localStorage.getItem('ollama-enabled') === 'true')
  const [ollamaModel, setOllamaModel] = useState(localStorage.getItem('ollama-model') || 'llama2')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    if (!ollamaEnabled && !apiKey.trim()) {
      alert('Please configure AI settings first (OpenAI API key or enable Ollama)')
      return
    }

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      let response
      
      if (ollamaEnabled) {
        // Use Ollama via terminal process
        if (window.electronAPI) {
          const result = await window.electronAPI.sendToOllama(input)
          if (result.success && result.response) {
            const aiResponse: Message = {
              id: Date.now() + 1,
              text: result.response,
              sender: 'ai',
              timestamp: new Date()
            }
            setMessages(prev => [...prev, aiResponse])
            setLoading(false)
            return
          } else {
            throw new Error(result.error || 'Failed to communicate with Ollama')
          }
        }
      } else {
        // Use OpenAI
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful AI assistant integrated into a productivity app called Material Launcher. Be concise but helpful.' },
              ...messages.slice(-10).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
              })),
              { role: 'user', content: input }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        })
      }

      if (response && !response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      if (response) {
        const data = await response.json()
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: data.choices[0].message.content,
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>AI Assistant</Typography>
      
      {!ollamaEnabled && !apiKey && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Configure AI settings in Settings tab (OpenAI API key or Ollama)
        </Alert>
      )}
      
      {ollamaEnabled && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Using Ollama ({ollamaModel}) for AI conversations
        </Alert>
      )}
      
      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
        <CardContent sx={{ flex: 1, overflow: 'auto', p: 0 }}>
          <List sx={{ p: 2 }}>
            {messages.map((message) => (
              <ListItem key={message.id} sx={{ alignItems: 'flex-start', px: 0, mb: 2 }}>
                <Avatar sx={{ 
                  mr: 2, 
                  bgcolor: message.sender === 'ai' ? 'primary.main' : 'secondary.main',
                  width: 40,
                  height: 40
                }}>
                  {message.sender === 'ai' ? <Psychology /> : <Person />}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip 
                      label={message.sender === 'ai' ? (ollamaEnabled ? `Ollama (${ollamaModel})` : 'OpenAI') : 'You'} 
                      size="small" 
                      color={message.sender === 'ai' ? 'primary' : 'secondary'}
                      variant="outlined"
                    />
                    <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.text}
                  </Typography>
                </Box>
              </ListItem>
            ))}
            {loading && (
              <ListItem sx={{ alignItems: 'center', px: 0 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 40, height: 40 }}>
                  <Psychology />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    AI is thinking...
                  </Typography>
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </CardContent>
        
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={loading}
              multiline
              maxRows={3}
            />
            <Button 
              variant="contained" 
              onClick={handleSend} 
              disabled={loading || !input.trim()}
              sx={{ minWidth: 'auto', px: 3 }}
            >
              <Send />
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default AIAssistant