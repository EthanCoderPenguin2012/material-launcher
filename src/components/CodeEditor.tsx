import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Tabs, Tab } from '@mui/material'
import { PlayArrow, Save, FolderOpen } from '@mui/icons-material'

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`// Welcome to Code Editor
function hello() {
  console.log("Hello, World!");
}

hello();`)
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
  ]

  const runCode = () => {
    try {
      if (language === 'javascript') {
        const result = eval(code)
        setOutput(result ? String(result) : 'Code executed successfully')
      } else {
        setOutput(`${language} execution not supported in browser`)
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
  }

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language === 'javascript' ? 'js' : language}`
    a.click()
  }

  const templates = {
    javascript: `// JavaScript Template
function main() {
  console.log("Hello, JavaScript!");
}

main();`,
    python: `# Python Template
def main():
    print("Hello, Python!")

if __name__ == "__main__":
    main()`,
    html: `<!DOCTYPE html>
<html>
<head>
    <title>HTML Template</title>
</head>
<body>
    <h1>Hello, HTML!</h1>
</body>
</html>`,
    css: `/* CSS Template */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}`,
    json: `{
  "name": "JSON Template",
  "version": "1.0.0",
  "description": "A sample JSON file",
  "data": {
    "message": "Hello, JSON!"
  }
}`
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>Code Editor</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={(e) => {
              setLanguage(e.target.value)
              setCode(templates[e.target.value as keyof typeof templates])
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button variant="contained" startIcon={<PlayArrow />} onClick={runCode}>
          Run
        </Button>
        <Button variant="outlined" startIcon={<Save />} onClick={saveCode}>
          Save
        </Button>
        <Button variant="outlined" startIcon={<FolderOpen />}>
          Open
        </Button>
      </Box>

      <Card sx={{ height: 600 }}>
        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
          <Tab label="Editor" />
          <Tab label="Output" />
        </Tabs>
        
        <CardContent sx={{ height: 'calc(100% - 48px)', p: 0 }}>
          {activeTab === 0 ? (
            <TextField
              fullWidth
              multiline
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              sx={{
                height: '100%',
                '& .MuiInputBase-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                },
                '& .MuiInputBase-input': {
                  height: '100% !important',
                  overflow: 'auto !important'
                }
              }}
              InputProps={{
                sx: { p: 2 }
              }}
            />
          ) : (
            <Box sx={{ p: 2, height: '100%', overflow: 'auto', bgcolor: 'grey.100' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Output:</Typography>
              <Box sx={{ 
                fontFamily: 'monospace', 
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                bgcolor: 'black',
                color: 'green',
                p: 2,
                borderRadius: 1,
                minHeight: 200
              }}>
                {output || 'No output yet. Run your code to see results.'}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default CodeEditor