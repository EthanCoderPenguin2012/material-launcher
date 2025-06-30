import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import TaskManager from './TaskManager'

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('TaskManager', () => {
  test('renders task input and add button', () => {
    renderWithTheme(<TaskManager />)
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  test('adds a new task when form is submitted', () => {
    renderWithTheme(<TaskManager />)
    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Test task' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Test task')).toBeInTheDocument()
  })
})