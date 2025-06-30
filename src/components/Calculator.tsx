import React, { useState } from 'react'
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material'

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '×': return firstValue * secondValue
      case '÷': return firstValue / secondValue
      case '=': return secondValue
      default: return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ]

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>Calculator</Typography>
      
      <Card>
        <CardContent>
          <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, textAlign: 'right' }}>
            <Typography variant="h4" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {display}
            </Typography>
          </Box>
          
          <Grid container spacing={1}>
            {buttons.map((row, rowIndex) => (
              row.map((btn, colIndex) => (
                <Grid item xs={btn === '0' ? 6 : 3} key={`${rowIndex}-${colIndex}`}>
                  <Button
                    fullWidth
                    variant={['÷', '×', '-', '+', '='].includes(btn) ? 'contained' : 'outlined'}
                    color={btn === 'C' ? 'error' : ['÷', '×', '-', '+', '='].includes(btn) ? 'primary' : 'inherit'}
                    sx={{ height: 60, fontSize: '1.2rem' }}
                    onClick={() => {
                      if (btn === 'C') clear()
                      else if (btn === '=') performCalculation()
                      else if (['÷', '×', '-', '+'].includes(btn)) inputOperation(btn)
                      else inputNumber(btn)
                    }}
                  >
                    {btn}
                  </Button>
                </Grid>
              ))
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Calculator